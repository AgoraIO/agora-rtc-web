#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { check, checksums, config, here, load, plan, readRegistry, safeAsset, safeTag, sameContent } from './lib.mjs';

const gh = args => execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
export function uploadArgs(dir, tag, loaded) {
  return ['release', 'create', safeTag(tag), ...['SHA256SUMS', ...loaded.assets].map(name => path.resolve(dir, name)), '--repo', config.repository, '--target', 'main', '--latest=false', '--title', tag, '--notes', 'QA-accepted Jenkins npm artifacts. npm publication is a separate workflow.'];
}
export function startArgs(tag, distTag, digest, dryRun) {
  check(config.distTags.includes(distTag) && /^[a-f0-9]{64}$/.test(digest), 'Invalid dist-tag/checksum');
  return ['workflow', 'run', 'publish-ng.yml', '--repo', config.repository, '--ref', 'main', '-f', `release_tag=${safeTag(tag)}`, '-f', `dist_tag=${distTag}`, '-f', `checksums_sha256=${digest}`, '-f', `dry_run=${dryRun}`];
}
export function npmEnv() {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (/^npm_config_/i.test(key) || /^(NODE_AUTH_TOKEN|NPM_TOKEN)$/.test(key)) delete env[key];
  return { ...env, NPM_CONFIG_REGISTRY: config.registry, NPM_CONFIG_USERCONFIG: '/dev/null', NPM_CONFIG_GLOBALCONFIG: path.join(here, 'empty.npmrc'), NPM_CONFIG_IGNORE_SCRIPTS: 'true', NPM_CONFIG_PROVENANCE: 'false' };
}
const npmPublish = pkg => execFileSync('npm', ['publish', path.resolve(pkg.file), '--registry', config.registry, '--access', 'public', '--tag', pkg.distTag, '--ignore-scripts', '--provenance=false'], { env: npmEnv(), stdio: 'inherit' });

export function releaseSummary(loaded, actions, tag, distTag, dryRun) {
  const base = `https://github.com/${config.repository}/releases`;
  const release = `${base}/tag/${safeTag(tag)}`;
  const asset = name => `${base}/download/${tag}/${encodeURIComponent(name)}`;
  return [
    '## Release review', '',
    `- Mode: **${dryRun ? 'DRY RUN — no npm publish' : 'REAL PUBLISH — after npm-production approval'}**`,
    `- GitHub Release: [${tag}](${release})`,
    `- npm dist-tag: **${distTag}**`,
    `- [SHA256SUMS](${asset('SHA256SUMS')}) SHA256: \`${loaded.digest}\``, '',
    '| Package | Version | Planned action | Tarball | SHA256 |',
    '| --- | --- | --- | --- | --- |',
    ...actions.map(pkg => `| ${pkg.name} | ${pkg.version} | ${pkg.action} | [${pkg.asset}](${asset(pkg.asset)}) | \`${pkg.sha256}\` |`), '',
    'publish = submit this version to npm; reuse = existing bytes verified, no upload.',
    'Open the tarball links or Release Assets to inspect the files before approving.', '',
  ].join('\n');
}

export async function publish(loaded, dir, distTag, dryRun, { read = readRegistry, send = npmPublish, pause = ms => new Promise(resolve => setTimeout(resolve, ms)), visibilityAttempts = 31, releaseTag, requestedDryRun = dryRun } = {}) {
  const actions = await plan(loaded, distTag, read);
  const summary = releaseTag ? releaseSummary(loaded, actions, releaseTag, distTag, requestedDryRun) : [`| Package | Version | Action (${dryRun ? 'dry run' : distTag}) |`, '| --- | --- | --- |', ...actions.map(pkg => `| ${pkg.name} | ${pkg.version} | ${pkg.action} |`)].join('\n') + '\n';
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  if (dryRun) return actions;
  for (const pkg of actions) {
    // Recheck local bytes before each write. Registry versions themselves are immutable.
    checksums(dir, loaded.digest);
    if (pkg.action === 'reuse') { console.log(`Reuse ${pkg.name}@${pkg.version}`); continue; }
    send({ ...pkg, file: path.join(dir, pkg.asset), distTag });
    let confirmed = false;
    for (let attempt = 0; attempt < visibilityAttempts; attempt++) {
      const remote = await read(pkg.name), version = remote?.versions?.[pkg.version];
      if (version) {
        await sameContent(version, pkg);
        check(remote['dist-tags'][distTag] === pkg.version, `Unexpected ${distTag}: ${pkg.name}`);
        confirmed = true; break;
      }
      if (attempt + 1 < visibilityAttempts) {
        console.log(`Waiting for npm visibility: ${pkg.name}@${pkg.version} (${attempt + 1}/${visibilityAttempts})`);
        await pause(10000);
      }
    }
    check(confirmed, `npm accepted ${pkg.name}@${pkg.version}, but visibility is not confirmed. Check npm processing status before retrying the same artifacts; remaining packages were not published`);
    console.log(`Published ${pkg.name}@${pkg.version}`);
  }
  return actions;
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'upload' || command === 'start') {
    const [dir, tag, distTag, option] = args;
    check(command === 'upload' ? args.length === 2 : (args.length === 3 || (args.length === 4 && option === '--dry-run')), `upload <npm-tgz-dir> <release-tag> | start <npm-tgz-dir> <release-tag> <${config.distTags.join('|')}> [--dry-run]`);
    const loaded = await load(dir);
    if (command === 'upload') console.log(gh(uploadArgs(dir, tag, loaded)));
    else console.log(gh(startArgs(tag, distTag, loaded.digest, option === '--dry-run')) || 'Workflow dispatched. Check Actions → Publish Web SDK to npm.');
    console.log(`SHA256SUMS SHA256: ${loaded.digest}`);
    return;
  }
  const reviewOnly = command === 'review';
  check((reviewOnly || command === 'run') && args.length === 4, 'review|run <release-tag> <dist-tag> <checksums-sha256> <true|false> (GitHub Actions only)');
  check(process.env.GITHUB_REPOSITORY === config.repository && process.env.GITHUB_REF === 'refs/heads/main' && process.env.GITHUB_EVENT_NAME === 'workflow_dispatch', 'Run only from the configured repository main workflow_dispatch');
  const [tag, distTag, digest, dryRun] = args;
  check(['true', 'false'].includes(dryRun), 'Invalid dry_run');
  if (!reviewOnly && dryRun === 'false') check(process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN, 'Missing GitHub OIDC identity');
  safeTag(tag);
  const release = JSON.parse(gh(['api', `repos/${config.repository}/releases/tags/${tag}`]));
  const assets = release.assets.filter(asset => asset.name === 'SHA256SUMS' || asset.name.endsWith('.tgz'));
  check(assets.filter(asset => asset.name === 'SHA256SUMS').length === 1, 'Missing SHA256SUMS Release asset');
  check(new Set(assets.map(asset => asset.name)).size === assets.length, 'Duplicate Release assets');
  const dir = fs.mkdtempSync(path.join(process.env.RUNNER_TEMP || '/tmp', 'npm-release-'));
  try {
    for (const asset of assets) {
      if (asset.name !== 'SHA256SUMS') safeAsset(asset.name);
      gh(['release', 'download', tag, '--repo', config.repository, '--pattern', asset.name, '--dir', dir]);
    }
    const loaded = await load(dir, digest);
    await publish(loaded, dir, distTag, reviewOnly || dryRun === 'true', { releaseTag: tag, requestedDryRun: dryRun === 'true' });
    if (reviewOnly && process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${loaded.packages.find(pkg => pkg.name === config.main).version}\n`);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error.message); process.exitCode = 1; });
