import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import * as tar from 'tar';
import { checksums, config, hash, inspect, load, order, plan, readRegistry, safeAsset, safeTag } from '../lib.mjs';
import { npmEnv, publish, startArgs, uploadArgs } from '../release.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'npm-publisher-test-'));
let counter = 0;
const pkg = (name = config.main, dependencies = {}, extra = {}) => ({ name, version: '4.30.0', repository: { type: 'git', url: `git+https://github.com/${config.repository}.git` }, dependencies, ...extra });
const initialized = () => ({ versions: {}, 'dist-tags': {} });
async function fixture(packages) {
  const dir = path.join(root, String(++counter)); fs.mkdirSync(dir);
  for (let i = 0; i < packages.length; i++) {
    const source = path.join(dir, 'source', String(i)); fs.mkdirSync(path.join(source, 'package'), { recursive: true });
    fs.writeFileSync(path.join(source, 'package/package.json'), JSON.stringify(packages[i]));
    fs.writeFileSync(path.join(source, 'package/index.js'), 'module.exports = {};');
    await tar.c({ cwd: source, file: path.join(dir, `sdk-${i}.tgz`), gzip: true }, ['package']);
  }
  fs.writeFileSync(path.join(dir, 'SHA256SUMS'), fs.readdirSync(dir).filter(name => name.endsWith('.tgz')).map(name => `${hash(fs.readFileSync(path.join(dir, name)))}  ./${name}\n`).join(''));
  return dir;
}
const read = docs => async name => structuredClone(docs[name] || null);
function versionRecord(local) { return { dist: { integrity: local.integrity } }; }
test.after(() => fs.rmSync(root, { recursive: true, force: true }));

test('single/four/five/six-package batches use actual dependencies and independent versions', async () => {
  for (const children of [[], ['shared', 'report', 'media'], ['shared', 'report', 'media', 'protocol'], ['shared', 'report', 'media', 'protocol', 'future']]) {
    const previous = [...config.packages];
    try {
      if (children.includes('future')) config.packages.push('@agora-js/future');
      const deps = Object.fromEntries(children.map(name => [`@agora-js/${name}`, '^2.1.0']));
      const dir = await fixture([pkg(config.main, deps), ...children.map(name => pkg(`@agora-js/${name}`, {}, { version: '2.1.3' }))]);
      const loaded = await load(dir);
      assert.equal(loaded.packages.length, children.length + 1);
      assert.equal(loaded.packages.at(-1).name, config.main);
      const docs = Object.fromEntries(loaded.packages.map(p => [p.name, initialized()]));
      assert.ok((await plan(loaded, 'next', read(docs))).every(p => p.action === 'publish'));
    } finally { config.packages.splice(0, config.packages.length, ...previous); }
  }
});
test('transitive child dependencies publish first; cycles/duplicates/unrelated/mismatches fail', () => {
  const shared = pkg('@agora-js/shared'), media = pkg('@agora-js/media', { [shared.name]: shared.version });
  assert.deepEqual(order([pkg(config.main, { [media.name]: media.version }), media, shared]).map(p => p.name), [shared.name, media.name, config.main]);
  assert.throws(() => order([]), /main/);
  assert.throws(() => order([pkg(), pkg()]), /Duplicate/);
  assert.throws(() => order([pkg(), shared]), /Unrelated/);
  assert.throws(() => order([pkg(config.main, { [shared.name]: '2.0.0' }), shared]), /Unsatisfied/);
  assert.throws(() => order([pkg(config.main, { [config.main]: '*' })]), /cycle/);
  assert.throws(() => order([pkg(config.main, { [shared.name]: '*' }), pkg(shared.name, { [config.main]: '*' })]), /cycle/);
  assert.throws(() => order([pkg(config.main, { [shared.name]: '2.0.0' }, { peerDependencies: { [shared.name]: '*' } }), shared]), /Unsatisfied/);
});
test('checksum file detects changed/missing/unlisted/duplicate files and replacement after start', async () => {
  const dir = await fixture([pkg()]), loaded = await load(dir);
  const file = path.join(dir, loaded.assets[0]), sumsFile = path.join(dir, 'SHA256SUMS');
  const original = fs.readFileSync(file), sums = fs.readFileSync(sumsFile);
  fs.appendFileSync(file, 'changed'); assert.throws(() => checksums(dir), /mismatch/);
  fs.writeFileSync(file, original);
  fs.writeFileSync(sumsFile, sums.toString().replace('  ./', ' *')); assert.equal(checksums(dir).assets.length, 1);
  assert.throws(() => checksums(dir, loaded.digest), /changed since dispatch/);
  fs.writeFileSync(sumsFile, sums); fs.writeFileSync(path.join(dir, 'extra.tgz'), 'extra');
  assert.throws(() => checksums(dir), /do not match/); fs.unlinkSync(path.join(dir, 'extra.tgz'));
  fs.appendFileSync(sumsFile, sums); assert.throws(() => checksums(dir), /Duplicate/);
  fs.writeFileSync(sumsFile, 'a'.repeat(64) + '  ../escape.tgz\n'); assert.throws(() => checksums(dir), /Invalid/);
  fs.writeFileSync(sumsFile, sums); fs.unlinkSync(file); assert.throws(() => checksums(dir), /ENOENT/);
});
test('metadata requires explicit package approval, matching repository and public semver dependencies', async () => {
  for (const metadata of [
    pkg('unapproved'), pkg(config.main, {}, { repository: undefined }), pkg(config.main, {}, { repository: 'https://github.com/other/repo' }),
    pkg(config.main, {}, { private: true }), pkg(config.main, {}, { version: 'bad' }),
    pkg(config.main, { '@agora-js/future': '1.0.0' }), pkg(config.main, { '@agora-js/shared': 'workspace:*' }),
    pkg(config.main, {}, { publishConfig: { registry: 'https://private.invalid/' } }), pkg(config.main, {}, { publishConfig: { tag: 'latest' } })
  ]) {
    const dir = await fixture([metadata]);
    await assert.rejects(inspect(path.join(dir, 'sdk-0.tgz')));
  }
  for (const value of ['../x', '$(id)', '--flag', '', 'a\nb']) assert.throws(() => safeTag(value));
  for (const value of ['../x.tgz', '--flag.tgz', 'a/b.tgz', 'a*.tgz']) assert.throws(() => safeAsset(value));
});
test('upload batches exact artifacts; start binds checksum and passes safe structured gh arguments', async () => {
  const dir = await fixture([pkg()]), loaded = await load(dir);
  const upload = uploadArgs(dir, 'npm-430-b200', loaded);
  assert.deepEqual(upload.slice(0, 5), ['release', 'create', 'npm-430-b200', path.join(dir, 'SHA256SUMS'), path.join(dir, loaded.assets[0])]);
  assert.ok(upload.includes('--latest=false'));
  assert.ok(!upload.includes('--draft'));
  assert.ok(!upload.some(arg => arg.includes('*')));
  const start = startArgs('npm-430-b200', 'next', loaded.digest, true);
  assert.ok(start.includes(`checksums_sha256=${loaded.digest}`));
  assert.ok(start.includes('dry_run=true'));
  assert.ok(start.includes('publish-ng.yml'));
  assert.ok(start.includes(config.repository));
  assert.throws(() => startArgs('x', 'unapproved', loaded.digest, false));
});
test('registry distinguishes 404 from authorization and server errors', async () => {
  const server = http.createServer((req, res) => {
    const status = Number(req.url.slice(1));
    res.writeHead(status, { 'content-type': 'application/json' }); res.end(status === 200 ? '{"versions":{}}' : '{}');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const previous = config.registry;
  try {
    config.registry = `http://127.0.0.1:${server.address().port}/`;
    assert.equal(await readRegistry('404'), null);
    assert.deepEqual(await readRegistry('200'), { versions: {} });
    for (const status of [401, 403, 429, 503]) await assert.rejects(readRegistry(String(status)), new RegExp(`HTTP ${status}`));
  } finally { config.registry = previous; server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
test('preflight permits identical versions only and refuses latest downgrade, prerelease and wrong main channel', async () => {
  const loaded = await load(await fixture([pkg()])), local = loaded.packages[0];
  const docs = { [local.name]: initialized() };
  assert.equal((await plan(loaded, 'next', read(docs)))[0].action, 'publish');
  docs[local.name].versions[local.version] = versionRecord(local); docs[local.name]['dist-tags'].next = local.version;
  assert.equal((await plan(loaded, 'next', read(docs)))[0].action, 'reuse');
  docs[local.name].versions[local.version].dist.integrity = 'sha512-different';
  await assert.rejects(plan(loaded, 'next', read(docs)), /bytes conflict/);
  docs[local.name].versions = {}; docs[local.name]['dist-tags'].latest = '5.0.0';
  await assert.rejects(plan(loaded, 'latest', read(docs)), /backwards/);
  docs[local.name].versions[local.version] = versionRecord(local);
  docs[local.name]['dist-tags'].next = '4.0.0'; await assert.rejects(plan(loaded, 'next', read(docs)), /different next/);
  await assert.rejects(plan(await load(await fixture([pkg(config.main, {}, { version: '4.30.0-1' })])), 'latest', read(docs)), /Prerelease/);
  await assert.rejects(plan(loaded, 'next', read({})), /Initialize/);
});
test('missing internal child must already resolve on npm; new uninitialized child blocks whole batch', async () => {
  const main = pkg(config.main, { '@agora-js/shared': '^2.0.0' });
  const loaded = await load(await fixture([main]));
  await assert.rejects(plan(loaded, 'next', read({ [main.name]: initialized() })), /Missing internal/);
  assert.equal((await plan(loaded, 'next', read({ [main.name]: initialized(), '@agora-js/shared': { versions: { '2.1.0': {} } } })))[0].action, 'publish');
  const batch = await load(await fixture([pkg(config.main, { '@agora-js/shared': '4.30.0' }), pkg('@agora-js/shared')]));
  await assert.rejects(plan(batch, 'next', read({ [main.name]: initialized() })), /Initialize/);
});
test('dry run makes no writes; partial publish resumes without republishing already confirmed bytes', async () => {
  const dir = await fixture([pkg(config.main, { '@agora-js/shared': '4.30.0' }), pkg('@agora-js/shared')]), loaded = await load(dir);
  const docs = Object.fromEntries(loaded.packages.map(p => [p.name, initialized()]));
  const writes = [];
  const send = p => {
    writes.push(p.name);
    if (p.name === config.main && writes.length === 2) throw new Error('simulated timeout');
    docs[p.name].versions[p.version] = versionRecord(p); docs[p.name]['dist-tags'].next = p.version;
  };
  await publish(loaded, dir, 'next', true, { read: read(docs), send }); assert.deepEqual(writes, []);
  await assert.rejects(publish(loaded, dir, 'next', false, { read: read(docs), send }), /timeout/);
  const recovered = await publish(loaded, dir, 'next', false, { read: read(docs), send });
  assert.deepEqual(recovered.map(p => p.action), ['reuse', 'publish']);
  assert.deepEqual(writes, ['@agora-js/shared', config.main, config.main]);
  await publish(loaded, dir, 'next', false, { read: read(docs), send }); assert.equal(writes.length, 3);
});
test('post-publish checks exact bytes and dist-tag; preserves OIDC environment and drops token fallback', async () => {
  const dir = await fixture([pkg()]), loaded = await load(dir), docs = { [config.main]: initialized() };
  await assert.rejects(publish(loaded, dir, 'next', false, { read: read(docs), send: p => { docs[p.name].versions[p.version] = versionRecord(p); }, pause: async () => {} }), /Unexpected next/);
  const env = npmEnv();
  assert.equal(env.NODE_AUTH_TOKEN, undefined); assert.equal(env.NPM_TOKEN, undefined);
  assert.equal(env.ACTIONS_ID_TOKEN_REQUEST_URL, process.env.ACTIONS_ID_TOKEN_REQUEST_URL);
  assert.equal(env.NPM_CONFIG_REGISTRY, config.registry);
  assert.equal(env.NPM_CONFIG_PROVENANCE, 'false');
});
