#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { check, config, configBytes, deps, hash, inspect, json, load, npm, order, plan, registryReader, safeAsset, safeId, sameContent, sleep, write } from './lib.mjs';

const run = (command, args, cwd) => execFileSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trim();
const gh = args => run('gh', args);

export async function pack(sdkRoot, out, id, distTag) {
  sdkRoot = path.resolve(sdkRoot); out = path.resolve(out); safeId(id);
  check(config.distTags.includes(distTag), 'Use an approved dist-tag');
  check(!fs.existsSync(out), `Output directory must be new: ${out}`);
  const selected = new Map();
  function collect(name) {
    if (selected.has(name)) return;
    check(Object.hasOwn(config.packages, name), `Unapproved package: ${name}`);
    const dir = path.join(sdkRoot, 'packages', config.packages[name], 'dist');
    check(fs.existsSync(path.join(dir, 'package.json')), `Missing dist for ${name}`);
    const pkg = json(path.join(dir, 'package.json'));
    check(pkg.name === name, `Wrong package at ${dir}: ${pkg.name}`);
    selected.set(name, { ...pkg, dir });
    for (const name of Object.keys(deps(pkg))) if (Object.hasOwn(config.packages, name)) {
      // Missing split packages may be reused from npm, but availability must pass
      // the public registry plan and consumer verification before approval.
      const child = path.join(sdkRoot, 'packages', config.packages[name], 'dist', 'package.json');
      if (fs.existsSync(child)) collect(name);
    }
  }
  collect(config.main);
  const sourceCommit = run('git', ['rev-parse', 'HEAD'], sdkRoot);
  check(/^[a-f0-9]{40}$/.test(sourceCommit), 'Full source SHA required');
  const m = {
    schemaVersion: 1, releaseId: id, releaseTag: `npm-${id}`, repository: config.repository,
    configSha256: hash(configBytes), distTag,
    source: { repository: 'webrtc/rtcn.js', commit: sourceCommit, ref: process.env.BUILD_BRANCH || run('git', ['symbolic-ref', '--short', '-q', 'HEAD'], sdkRoot) },
    build: { url: process.env.BUILD_URL, node: process.env.SDK_BUILD_NODE, pnpm: process.env.SDK_BUILD_PNPM, packNode: process.version, packNpm: npm(['--version']).trim(), lockSha256: hash(fs.readFileSync(process.env.RELEASE_LOCK_FILE || path.join(sdkRoot, 'pnpm-lock.yaml'))) },
    qa: { url: process.env.QA_REPORT_URL }, packages: []
  };
  fs.mkdirSync(out, { recursive: true });
  for (const pkg of order([...selected.values()])) {
    const result = JSON.parse(npm(['pack', '--json', '--ignore-scripts', '--pack-destination', out], { cwd: pkg.dir }));
    check(result.length === 1, 'Unexpected npm pack result');
    const asset = safeAsset(result[0].filename), file = path.join(out, asset);
    await inspect(file);
    const data = fs.readFileSync(file);
    m.packages.push({ name: pkg.name, version: pkg.version, asset, size: data.length, sha256: hash(data), integrity: `sha512-${hash(data, 'sha512', 'base64')}` });
  }
  write(path.join(out, 'manifest.json'), m);
  await load(path.join(out, 'manifest.json'), out);
  console.log(`Packed ${m.packages.length} packages. Copy manifest.json to .release/${id}.json in the publication repository and review it.`);
  return m;
}

export async function download(id, dir) {
  safeId(id);
  check(process.env.GITHUB_REPOSITORY === config.repository && process.env.GITHUB_REF === 'refs/heads/main', 'Production release validation must run in upstream main');
  const manifestFile = `.release/${id}.json`;
  const m = json(manifestFile);
  check(m.releaseId === id && m.releaseTag === `npm-${id}`, 'Manifest ID mismatch');
  const release = JSON.parse(gh(['api', `repos/${config.repository}/releases/tags/${m.releaseTag}`]));
  check(!release.draft && release.immutable === true, 'Publish an immutable GitHub Release before validation');
  const tagCommit = run('git', ['rev-parse', `${m.releaseTag}^{commit}`]);
  run('git', ['merge-base', '--is-ancestor', tagCommit, process.env.GITHUB_SHA]);
  check(run('git', ['show', `${tagCommit}:${manifestFile}`]) === fs.readFileSync(manifestFile, 'utf8').trim(), 'Release tag manifest differs from reviewed main');
  const wanted = ['manifest.json', ...m.packages.map(p => safeAsset(p.asset))];
  check(new Set(wanted).size === wanted.length, 'Duplicate asset');
  for (const name of wanted) check(release.assets.filter(a => a.name === name).length === 1, `Missing/duplicate Release asset: ${name}`);
  check(!fs.existsSync(dir), 'Download directory must be new');
  fs.mkdirSync(dir, { recursive: true });
  for (const name of wanted) gh(['release', 'download', m.releaseTag, '--repo', config.repository, '--pattern', name, '--dir', dir]);
  check(hash(fs.readFileSync(path.join(dir, 'manifest.json'))) === hash(fs.readFileSync(manifestFile)), 'Uploaded manifest differs from reviewed manifest');
  const loaded = await load(manifestFile, dir);
  write(path.join(dir, 'release-evidence.json'), { releaseId: release.id, tagCommit, workflowCommit: process.env.GITHUB_SHA, assets: release.assets.filter(a => wanted.includes(a.name)).map(a => ({ id: a.id, name: a.name, size: a.size })), manifestSha256: loaded.digest });
  return loaded;
}

export async function publish(loaded, assetsDir, approvedPlan, reportFile) {
  check(process.env.GITHUB_REPOSITORY === config.repository && process.env.GITHUB_REF === 'refs/heads/main' && process.env.GITHUB_EVENT_NAME === 'workflow_dispatch', 'Publish only through upstream main workflow_dispatch');
  check(process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN, 'Missing GitHub OIDC identity');
  check(npm(['--version']).trim() === '11.21.0' && process.version === 'v22.15.0', 'Unexpected publishing toolchain');
  const fresh = await plan(loaded, assetsDir);
  check(approvedPlan.manifestSha256 === fresh.manifestSha256, 'Approved manifest changed');
  // A failed request may already have written a package. Such a package is reused
  // only after plan() has confirmed its exact bytes. Other tag drift needs review.
  for (const action of fresh.actions) {
    const approved = approvedPlan.actions.find(a => a.name === action.name);
    check(approved && approved.version === action.version && (approved.currentTag === action.currentTag || action.currentTag === action.version), `Registry tag changed since approval: ${action.name}`);
  }
  check(JSON.stringify(fresh.external) === JSON.stringify(approvedPlan.external), 'External resolution changed since validation; rerun the complete workflow');
  const report = { ...fresh, workflowRun: process.env.GITHUB_RUN_ID, status: 'running', results: [] };
  write(reportFile, report);
  try {
    for (const action of fresh.actions) {
      const pkg = loaded.packages.find(p => p.name === action.name);
      const result = { ...action, status: action.action === 'reuse' ? 'reused' : 'publishing' };
      report.results.push(result); write(reportFile, report);
      if (action.action === 'publish') {
        try {
          npm(['publish', path.resolve(assetsDir, pkg.asset), '--registry', config.registry, '--access', 'public', '--tag', loaded.manifest.distTag, '--ignore-scripts', '--provenance=false']);
        } catch (error) {
          result.status = 'uncertain'; result.error = error.message; write(reportFile, report);
          // Stop on ambiguous writes; a complete rerun performs byte comparison.
          throw new Error(`npm publish failed for ${pkg.name}; inspect the report and rerun validation before resuming`);
        }
      }
      let confirmed = false;
      for (let attempt = 0; attempt < 8; attempt++) {
        const remote = await registryReader()(pkg.name);
        if (remote?.versions?.[pkg.version]) {
          await sameContent(remote.versions[pkg.version], pkg, assetsDir);
          if (action.action === 'publish' || pkg.name === config.main) check(remote['dist-tags'][loaded.manifest.distTag] === pkg.version, `Unexpected tag after publish: ${pkg.name}`);
          confirmed = true; break;
        }
        await sleep(2000);
      }
      check(confirmed, `Registry visibility timeout: ${pkg.name}`);
      result.status = action.action === 'reuse' ? 'reused' : 'published'; write(reportFile, report);
    }
    report.status = 'published';
  } catch (error) { report.status = 'failed-or-uncertain'; report.error = error.message; throw error; }
  finally { write(reportFile, report); }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'pack') { check(args.length === 4, 'pack <sdk-root> <new-output-dir> <release-id> <dist-tag>'); await pack(...args); return; }
  if (command === 'download') { check(args.length === 2, 'download <release-id> <new-output-dir>'); await download(...args); return; }
  if (command === 'stage') {
    check(args.length === 2, 'stage <manifest-file> <assets-dir>');
    const loaded = await load(...args), m = loaded.manifest;
    check(fs.readFileSync(args[0]).equals(fs.readFileSync(path.join(args[1], 'manifest.json'))), 'Upload manifest differs from reviewed file');
    const commit = run('git', ['rev-parse', 'HEAD']);
    const upstreamMain = gh(['api', `repos/${config.repository}/git/ref/heads/main`, '--jq', '.object.sha']);
    check(commit === upstreamMain, 'Stage only from synchronized upstream main');
    check(run('git', ['show', `HEAD:.release/${m.releaseId}.json`]) === fs.readFileSync(args[0], 'utf8').trim(), 'Commit the reviewed manifest first');
    gh(['release', 'create', m.releaseTag, '--repo', config.repository, '--target', commit, '--draft', '--title', `Web SDK ${loaded.packages.at(-1).version} (${m.releaseId})`, '--notes', `Jenkins: ${m.build.url}\nQA: ${m.qa.url}\nManifest SHA256: ${loaded.digest}`]);
    gh(['release', 'upload', m.releaseTag, '--repo', config.repository, ...['manifest.json', ...m.packages.map(p => p.asset)].map(name => path.resolve(args[1], name))]);
    console.log('Draft uploaded. Inspect all assets, then publish the Release with immutability enabled.'); return;
  }
  check(['check', 'plan', 'publish'].includes(command) && args.length >= 2, 'Commands: pack, check, plan, stage, download, publish');
  const loaded = await load(args[0], args[1]);
  if (command === 'check') console.log(`${loaded.digest}\n${loaded.packages.map(p => `${p.name}@${p.version}`).join('\n')}`);
  if (command === 'plan') { check(args[2], 'plan requires an output file'); const result = await plan(loaded, args[1]); write(args[2], result); console.log(JSON.stringify(result, null, 2)); }
  if (command === 'publish') { check(args[2] && args[3], 'publish requires approved-plan and report paths'); await publish(loaded, args[1], json(args[2]), args[3]); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.stack); process.exitCode = 1; });
