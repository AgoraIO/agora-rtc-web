import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import * as tar from 'tar';
import { config, configBytes, hash, inspect, load, npmEnv, order, plan, registryReader, requestJSON, safeAsset, safeId, write } from '../lib.mjs';
import { mirror } from '../consumer.mjs';
import { pack } from '../release.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'release-tests-'));
let counter = 0;
const sdkPkg = (name = config.main, dependencies = {}, extra = {}) => ({ name, version: '4.30.0', main: name === config.main ? 'AgoraRTC_N-production.js' : 'index.js', types: 'index.d.ts', repository: { type: 'git', url: 'git+https://github.com/AgoraIO/agora-rtc-web.git' }, dependencies, ...extra });
async function fixture(pkg = sdkPkg(), files = {}) {
  const dir = path.join(root, String(++counter)); fs.mkdirSync(path.join(dir, 'package'), { recursive: true });
  const all = { 'index.js': 'module.exports = { createClient: () => ({join(){}}) };', 'index.d.ts': 'declare const SDK: { createClient(options: {mode: "rtc", codec: "vp8"}): {join(): void} }; export default SDK;', 'AgoraRTC_N-production.js': 'module.exports = { createClient: () => ({join(){}}) };', 'package.json': JSON.stringify(pkg), ...files };
  for (const [name, value] of Object.entries(all)) {
    if (value === null) continue;
    const file = path.join(dir, 'package', name); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value);
  }
  const asset = `package-${counter}.tgz`;
  await tar.c({ gzip: true, cwd: dir, file: path.join(root, asset) }, ['package']);
  const bytes = fs.readFileSync(path.join(root, asset));
  return { ...pkg, asset, size: bytes.length, sha256: hash(bytes), integrity: `sha512-${hash(bytes, 'sha512', 'base64')}` };
}
function manifest(packages) {
  const file = path.join(root, `manifest-${++counter}.json`);
  write(file, { schemaVersion: 1, releaseId: 'test-430', releaseTag: 'npm-test-430', repository: config.repository, configSha256: hash(configBytes), distTag: 'next', source: { repository: 'webrtc/rtcn.js', commit: 'a'.repeat(40), ref: 'release/4.30.0' }, build: { url: 'https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/999/', node: 'v18.16.0', pnpm: '8.6.4', packNode: 'v22.15.0', packNpm: '11.21.0', lockSha256: 'b'.repeat(64) }, qa: { url: 'https://qa.example.test/report/999' }, packages: packages.map(({ name, version, asset, size, sha256, integrity }) => ({ name, version, asset, size, sha256, integrity })) });
  return file;
}
async function registry(documents, callback) {
  const server = http.createServer((req, res) => {
    const name = decodeURIComponent(req.url.slice(1));
    const value = documents[name];
    res.writeHead(typeof value === 'number' ? value : value ? 200 : 404, { 'content-type': 'application/json' });
    res.end(JSON.stringify(typeof value === 'number' ? { error: 'failure' } : value || { error: 'Not found' }));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { return await callback(`http://127.0.0.1:${server.address().port}/`); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
const initialized = () => ({ versions: {}, 'dist-tags': {} });

test.after(() => fs.rmSync(root, { force: true, recursive: true }));
test('real tarballs: single package and 4/5 package graphs, with independent child versions', async () => {
  for (const split of [[], ['shared', 'report', 'media'], ['shared', 'report', 'media', 'protocol']]) {
    const children = [], dependencies = {};
    for (const suffix of split) {
      const name = `@agora-js/${suffix}`;
      children.push(await fixture(sdkPkg(name, {}, { version: '3.8.1' })));
      dependencies[name] = '^3.8.0';
    }
    const main = await fixture(sdkPkg(config.main, dependencies));
    const loaded = await load(manifest([...children, main]), root);
    assert.equal(loaded.packages.length, split.length + 1);
    assert.equal(loaded.packages.at(-1).name, config.main);
  }
});
test('reject missing files, lifecycle hooks, private source files, private registry and workspace references', async () => {
  for (const [pkg, files] of [
    [sdkPkg(config.main, {}, { main: 'missing.js' }), {}],
    [sdkPkg(config.main, {}, { exports: { '.': './dist/main.js' } }), {}],
    [sdkPkg(config.main, {}, { scripts: { postinstall: 'echo unsafe' } }), {}],
    [sdkPkg(config.main, {}, { publishConfig: { registry: 'http://private/' } }), {}],
    [sdkPkg(config.main, {}, { repository: 'https://github.com/some/fork' }), {}],
    [sdkPkg(config.main, { '@agora-js/shared': 'workspace:*' }), {}],
    [sdkPkg(config.main, { '@agora-js/new': '1.0.0' }), {}],
    [sdkPkg(), { '.env': 'SECRET=example' }],
    [sdkPkg(), { 'source.ts': 'private implementation' }],
    [sdkPkg(), { 'AgoraRTC_N-production.full.js': 'export default {}' }],
    [sdkPkg(), { 'readme.md': '-----BEGIN PRIVATE KEY-----' }]
  ]) {
    const f = await fixture(pkg, files);
    await assert.rejects(inspect(path.join(root, f.asset)));
  }
});
test('reject cycles, duplicate names, mismatched versions, unrelated package and zero main', () => {
  const child = sdkPkg('@agora-js/shared');
  assert.throws(() => order([]), /main/);
  assert.throws(() => order([sdkPkg(), sdkPkg()]), /Duplicate/);
  assert.throws(() => order([child, sdkPkg()]), /Unrelated/);
  assert.throws(() => order([sdkPkg(config.main, { [config.main]: '*' })]), /cycle/);
  assert.throws(() => order([child, sdkPkg(config.main, { [child.name]: '3.0.0' })]), /Unsatisfied/);
  assert.throws(() => order([child, sdkPkg(config.main, { [child.name]: '3.0.0' }, { peerDependencies: { [child.name]: '*' } })]), /Unsatisfied/);
  assert.throws(() => order([sdkPkg(config.main, { [child.name]: '*' }), sdkPkg(child.name, { [config.main]: '*' })]), /cycle/);
});
test('manifest rejects tampering, invalid IDs, unsafe asset paths and prerelease latest', async () => {
  const f = await fixture(); const file = manifest([f]);
  await load(file, root);
  const original = fs.readFileSync(path.join(root, f.asset));
  fs.appendFileSync(path.join(root, f.asset), 'tampered');
  await assert.rejects(load(file, root), /hash mismatch/);
  fs.writeFileSync(path.join(root, f.asset), original);
  const modified = JSON.parse(fs.readFileSync(file)); modified.packages[0].dependencies = {}; write(file, modified);
  await assert.rejects(load(file, root), /metadata must come from tgz/);
  for (const id of ['../escape', '$(id)', 'x\ny', '']) assert.throws(() => safeId(id));
  for (const name of ['../p.tgz', '--flag', 'a/b.tgz']) assert.throws(() => safeAsset(name));
  const pre = await fixture(sdkPkg(config.main, {}, { version: '4.30.0-1' }));
  const preFile = manifest([pre]); const m = JSON.parse(fs.readFileSync(preFile)); m.distTag = 'latest'; write(preFile, m);
  await assert.rejects(load(preFile, root), /Prerelease/);
});
test('HTTP registry: explicit missing version can publish; 403/503 and uninitialized packages block', async () => {
  const f = await fixture(), loaded = await load(manifest([f]), root);
  await registry({ [config.main]: initialized() }, async url => assert.equal((await plan(loaded, root, registryReader(url))).actions[0].action, 'publish'));
  for (const value of [403, 503, null]) await registry({ [config.main]: value }, async url => assert.rejects(plan(loaded, root, registryReader(url))));
});
test('HTTP registry: compare existing integrity, reject conflicts and unresolved external dependency', async () => {
  const f = await fixture(), loaded = await load(manifest([f]), root);
  const documents = { [config.main]: { versions: { [f.version]: { dist: { integrity: f.integrity } } }, 'dist-tags': { next: f.version } } };
  await registry(documents, async url => assert.equal((await plan(loaded, root, registryReader(url))).actions[0].action, 'reuse'));
  documents[config.main].versions[f.version].dist.integrity = 'sha512-wrong';
  await registry(documents, async url => assert.rejects(plan(loaded, root, registryReader(url)), /conflict/));
  const main = await fixture(sdkPkg(config.main, { 'example-external': '^2.0.0' }));
  await registry({ [config.main]: initialized() }, async url => assert.rejects(plan(await load(manifest([main]), root), root, registryReader(url)), /Unavailable public dependency/));
});
test('HTTP registry: external range resolution, latest downgrade, existing main with wrong tag', async () => {
  const f = await fixture(sdkPkg(config.main, { ext: '^2.0.0' })); const file = manifest([f]);
  const documents = { [config.main]: initialized(), ext: { versions: { '2.4.0': { dist: { integrity: 'sha512-example' } }, '3.0.0': { dist: { integrity: 'sha512-other' } } } } };
  await registry(documents, async url => assert.equal((await plan(await load(file, root), root, registryReader(url))).external[0].version, '2.4.0'));
  const m = JSON.parse(fs.readFileSync(file)); m.distTag = 'latest'; write(file, m);
  documents[config.main]['dist-tags'].latest = '5.0.0';
  await registry(documents, async url => assert.rejects(plan(await load(file, root), root, registryReader(url)), /backwards/));
  m.distTag = 'next'; write(file, m);
  documents[config.main].versions[f.version] = { dist: { integrity: f.integrity } };
  await registry(documents, async url => assert.rejects(plan(await load(file, root), root, registryReader(url)), /different next/));
});
test('real npm install requests only main and resolves split tgz through declared dependencies', async () => {
  const child = await fixture(sdkPkg('@agora-js/shared'));
  const main = await fixture(sdkPkg(config.main, { [child.name]: child.version }));
  const loaded = await load(manifest([child, main]), root), server = await mirror(loaded, root);
  const consumer = path.join(root, 'consumer'); fs.mkdirSync(consumer);
  write(path.join(consumer, 'package.json'), { name: 'isolated-consumer', version: '1.0.0', private: true });
  try {
    await promisify(execFile)('npm', ['install', `${config.main}@${main.version}`, '--registry', server.base, '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: consumer, env: npmEnv() });
    const p = JSON.parse(fs.readFileSync(path.join(consumer, 'node_modules/@agora-js/shared/package.json')));
    assert.equal(p.version, child.version);
    const rootPkg = JSON.parse(fs.readFileSync(path.join(consumer, 'package.json')));
    assert.deepEqual(Object.keys(rootPkg.dependencies), [config.main]);
  } finally { await server.close(); }
});
test('real npm pack operates in dist and dynamically includes reachable child only', async () => {
  const sdk = path.join(root, 'sdk'); fs.mkdirSync(sdk);
  execFileSync('git', ['init', '-q', sdk]);
  fs.writeFileSync(path.join(sdk, 'pnpm-lock.yaml'), 'lockfileVersion: 6.0\n');
  execFileSync('git', ['add', '.'], { cwd: sdk });
  execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.test', 'commit', '-qm', 'fixture'], { cwd: sdk });
  for (const [dir, pkg] of [['main', sdkPkg()], ['shared', sdkPkg('@agora-js/shared')]]) {
    const target = path.join(sdk, 'packages', dir, 'dist'); fs.mkdirSync(target, { recursive: true });
    write(path.join(target, 'package.json'), pkg);
    fs.writeFileSync(path.join(target, 'AgoraRTC_N-production.js'), 'module.exports = {};');
    fs.writeFileSync(path.join(target, 'index.js'), 'module.exports = {};');
    fs.writeFileSync(path.join(target, 'index.d.ts'), 'export {};');
  }
  process.env.BUILD_URL = 'https://jenkins-api.bj2.agoralab.co/job/QAE/job/webRTC/job/webRTC_Deploy/job/webNG_Release/999/';
  process.env.QA_REPORT_URL = 'https://qa.example.test/999';
  process.env.BUILD_BRANCH = 'release/4.30.0';
  process.env.SDK_BUILD_NODE = 'v18.16.0';
  process.env.SDK_BUILD_PNPM = '8.6.4';
  const m = await pack(sdk, path.join(root, 'packed'), 'fixture-430', 'next');
  assert.equal(m.packages.length, 1); assert.equal(m.packages[0].name, config.main);
});
test('complete consumer: clean main-only install, TypeScript, bundle and real browser createClient', async () => {
  const f = await fixture(), file = manifest([f]), report = path.join(root, 'browser-consumer.json');
  await promisify(execFile)(process.execPath, [new URL('../consumer.mjs', import.meta.url).pathname, file, root, report, 'candidate'], { env: process.env, maxBuffer: 8 * 1024 * 1024 });
  const evidence = JSON.parse(fs.readFileSync(report));
  assert.equal(evidence.status, 'passed');
  assert.equal(evidence.types, 'passed');
  assert.equal(evidence.entrypoints[0].browser, 'createClient passed');
});
test('partial release recovery plans reuse only confirmed bytes and publish remaining packages', async () => {
  const child = await fixture(sdkPkg('@agora-js/shared'));
  const main = await fixture(sdkPkg(config.main, { [child.name]: child.version }));
  const loaded = await load(manifest([child, main]), root);
  const documents = { [child.name]: initialized(), [main.name]: initialized() };
  await registry(documents, async url => {
    const before = await plan(loaded, root, registryReader(url));
    assert.deepEqual(before.actions.map(a => a.action), ['publish', 'publish']);
    documents[child.name].versions[child.version] = { dist: { integrity: child.integrity } };
    documents[child.name]['dist-tags'].next = child.version;
    const resumed = await plan(loaded, root, registryReader(url));
    assert.deepEqual(resumed.actions.map(a => a.action), ['reuse', 'publish']);
    documents[child.name].versions[child.version].dist.integrity = 'sha512-other';
    await assert.rejects(plan(loaded, root, registryReader(url)), /conflict/);
  });
});
