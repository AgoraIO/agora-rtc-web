import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as tar from 'tar';
import semver from 'semver';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const configBytes = fs.readFileSync(path.join(here, 'config.json'));
export const config = JSON.parse(configBytes);
export const hash = (data, algorithm = 'sha256', encoding = 'hex') => crypto.createHash(algorithm).update(data).digest(encoding);
export const json = file => JSON.parse(fs.readFileSync(file, 'utf8'));
export const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n'); };
export const check = (condition, message) => { if (!condition) throw new Error(message); };
export const safeId = value => { check(typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(value), `Invalid release ID: ${value}`); return value; };
export const safeAsset = value => { check(typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,180}$/.test(value), `Invalid asset: ${value}`); return value; };
export const deps = pkg => ({ ...pkg.dependencies, ...pkg.optionalDependencies, ...pkg.peerDependencies });
// Optional dependencies override normal dependencies; peer requirements also
// apply even when the same name appears in runtime dependencies.
export const edges = pkg => [...Object.entries(pkg.dependencies || {}).filter(([name]) => !Object.hasOwn(pkg.optionalDependencies || {}, name)), ...Object.entries(pkg.optionalDependencies || {}), ...Object.entries(pkg.peerDependencies || {})];
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export function npmEnv() {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (/^npm_config_/i.test(key) || /^(NODE_AUTH_TOKEN|NPM_TOKEN)$/.test(key)) delete env[key];
  Object.assign(env, { NPM_CONFIG_REGISTRY: config.registry, NPM_CONFIG_USERCONFIG: '/dev/null', NPM_CONFIG_GLOBALCONFIG: path.join(here, 'empty.npmrc'), NPM_CONFIG_IGNORE_SCRIPTS: 'true', NPM_CONFIG_PROVENANCE: 'false' });
  return env;
}
export function npm(args, { cwd, capture = true } = {}) {
  const env = npmEnv();
  // No shell interpolation; OIDC runtime variables remain available to npm.
  return execFileSync('npm', args, { cwd, env, encoding: 'utf8', stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit', maxBuffer: 16 * 1024 * 1024 });
}

export async function inspect(file) {
  const contents = new Map();
  let total = 0, entryError;
  await tar.t({ file, strict: true, onReadEntry(entry) {
    try {
      const name = entry.path;
      check(name.startsWith('package/') && !name.includes('\\') && !name.split('/').includes('..'), `Unsafe tar path: ${name}`);
      check(['File', 'Directory'].includes(entry.type), `Links/special entries forbidden: ${name}`);
      if (entry.type === 'Directory') { entry.resume(); return; }
      check(!contents.has(name), `Duplicate tar entry: ${name}`);
      check(entry.size <= 100 * 1024 * 1024 && (total += entry.size) <= 500 * 1024 * 1024, 'Oversized tarball');
      check(!/(^|\/)(\.env[^/]*|\.npmrc|id_rsa|.*\.(pem|key))$/i.test(name), `Sensitive file: ${name}`);
      check(/\.(js|mjs|cjs|json|md|txt|d\.ts)$|\/(LICENSE|NOTICE|COPYING)(\.[^/]*)?$/i.test(name), `File outside public SDK allowlist: ${name}`);
      const chunks = []; contents.set(name, null);
      entry.on('data', chunk => chunks.push(chunk));
      entry.on('end', () => { contents.set(name, Buffer.concat(chunks)); });
    } catch (error) { entryError ||= error; entry.resume(); }
  } });
  if (entryError) throw entryError;
  check(contents.get('package/package.json'), 'Missing package/package.json');
  for (const [name, bytes] of contents) check(bytes && !bytes.includes(Buffer.from('-----BEGIN PRIVATE KEY-----')) && !bytes.includes(Buffer.from('-----BEGIN RSA PRIVATE KEY-----')), `Sensitive or incomplete content: ${name}`);
  const pkg = JSON.parse(contents.get('package/package.json').toString());
  check(Object.hasOwn(config.packages, pkg.name), `Package not approved: ${pkg.name}`);
  check(semver.valid(pkg.version) === pkg.version && !pkg.private, `Invalid version/private package: ${pkg.name}`);
  const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  check(['git+https://github.com/AgoraIO/agora-rtc-web.git', 'https://github.com/AgoraIO/agora-rtc-web.git', 'https://github.com/AgoraIO/agora-rtc-web'].includes(repo), `repository must match ${config.repository}: ${pkg.name}`);
  check(!Object.keys(pkg.scripts || {}).length, `Published package must not contain lifecycle scripts: ${pkg.name}`);
  if (pkg.publishConfig) {
    for (const [key, value] of Object.entries(pkg.publishConfig)) {
      check(['access', 'registry', 'provenance'].includes(key), `Unsupported publishConfig.${key}`);
      check(key !== 'registry' || value === config.registry || value === config.registry.slice(0, -1), 'Conflicting publishConfig.registry');
      check(key !== 'access' || value === 'public', 'Conflicting publishConfig.access');
      check(key !== 'provenance' || value === false, 'Conflicting publishConfig.provenance');
    }
  }
  for (const [name, range] of edges(pkg)) {
    check(/^(@[a-z0-9._-]+\/)?[a-z0-9][a-z0-9._-]*$/.test(name) && typeof range === 'string' && semver.validRange(range) !== null, `Non-public/invalid dependency: ${name}@${range}`);
    if (name.startsWith('@agora-js/')) check(Object.hasOwn(config.packages, name), `New internal dependency needs config + npm trust: ${name}`);
  }
  const exists = target => {
    check(typeof target === 'string', `Invalid entry: ${pkg.name}`);
    const relative = target.replace(/^\.\//, '');
    check(!relative.includes('..') && !relative.includes('*') && contents.has('package/' + relative), `Missing/unsupported entry ${pkg.name}: ${target}`);
  };
  for (const field of ['main', 'module', 'types', 'typings', 'unpkg', 'jsdelivr']) if (pkg[field]) exists(pkg[field]);
  if (typeof pkg.browser === 'string') exists(pkg.browser);
  if (pkg.browser && typeof pkg.browser === 'object') for (const target of Object.values(pkg.browser)) if (typeof target === 'string' && target.startsWith('.')) exists(target);
  const visit = value => {
    if (typeof value === 'string') exists(value);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  };
  visit(pkg.exports);
  check(pkg.main || pkg.exports, `No runtime entry: ${pkg.name}`);
  check(pkg.types || pkg.typings || JSON.stringify(pkg.exports || {}).includes('.d.ts'), `No declaration entry: ${pkg.name}`);
  if (pkg.name === config.main) {
    check(contents.has('package/AgoraRTC_N-production.js'), 'Missing standard UMD');
    if (contents.has('package/AgoraRTC_N-production.full.js')) check(pkg.exports?.['./full'], 'Full output needs ./full export');
    if (contents.has('package/AgoraRTC_N-production.min.js')) check(pkg.exports?.['./min'], 'Min output needs ./min export');
  }
  return { pkg, contents };
}

export function order(packages) {
  const byName = new Map(packages.map(p => [p.name, p]));
  check(byName.size === packages.length, 'Duplicate package name');
  check(byName.has(config.main), 'Missing main package');
  const result = [], active = new Set(), seen = new Set();
  function visit(pkg) {
    check(!active.has(pkg.name), `Dependency cycle at ${pkg.name}`);
    if (seen.has(pkg.name)) return;
    active.add(pkg.name);
    for (const [name, range] of edges(pkg)) if (byName.has(name)) {
      check(semver.satisfies(byName.get(name).version, range), `Unsatisfied in-batch dependency: ${pkg.name} -> ${name}@${range}`);
      visit(byName.get(name));
    }
    active.delete(pkg.name); seen.add(pkg.name); result.push(pkg);
  }
  visit(byName.get(config.main));
  check(seen.size === packages.length, 'Unrelated packages must not be published');
  return result;
}

export async function load(manifestFile, assetsDir) {
  const bytes = fs.readFileSync(manifestFile), m = JSON.parse(bytes);
  check(m.schemaVersion === 1 && m.repository === config.repository, 'Wrong manifest schema/repository');
  safeId(m.releaseId); check(m.releaseTag === `npm-${m.releaseId}`, 'Wrong release tag');
  check(m.configSha256 === hash(configBytes), 'Package policy changed: regenerate and review manifest');
  check(config.distTags.includes(m.distTag), 'Unapproved dist-tag');
  check(/^[a-f0-9]{40}$/.test(m.source?.commit) && m.source.repository === 'webrtc/rtcn.js' && typeof m.source.ref === 'string' && m.source.ref.length > 0, 'Missing source provenance');
  check(/^https:\/\/jenkins-api\.bj2\.agoralab\.co\/job\/QAE\/job\/webRTC\/job\/webRTC_Deploy\/job\/webNG_Release\/\d+\/$/.test(m.build?.url), 'Wrong Jenkins build URL');
  check(/^[a-f0-9]{64}$/.test(m.build.lockSha256) && typeof m.build.node === 'string' && /^v\d+\.\d+\.\d+$/.test(m.build.node) && typeof m.build.pnpm === 'string' && /^\d+\.\d+\.\d+$/.test(m.build.pnpm) && typeof m.build.packNode === 'string' && typeof m.build.packNpm === 'string', 'Missing toolchain/lock evidence');
  check(/^https:\/\//.test(m.qa?.url || ''), 'QA report URL required');
  check(Array.isArray(m.packages) && m.packages.length > 0, 'Empty release');
  const inspected = [], names = new Set();
  for (const p of m.packages) {
    check(Object.keys(p).every(key => ['name', 'version', 'asset', 'size', 'sha256', 'integrity'].includes(key)), 'Package metadata must come from tgz; unsupported manifest field');
    safeAsset(p.asset); check(p.asset.endsWith('.tgz') && !names.has(p.asset), 'Duplicate/invalid package asset'); names.add(p.asset);
    const file = path.join(assetsDir, p.asset), stat = fs.lstatSync(file);
    check(stat.isFile() && !stat.isSymbolicLink(), `Asset is not a regular file: ${p.asset}`);
    const data = fs.readFileSync(file);
    check(data.length === p.size && hash(data) === p.sha256 && `sha512-${hash(data, 'sha512', 'base64')}` === p.integrity, `Artifact hash mismatch: ${p.asset}`);
    const { pkg } = await inspect(file);
    check(pkg.name === p.name && pkg.version === p.version, `Manifest metadata mismatch: ${p.asset}`);
    check(m.distTag !== 'latest' || semver.prerelease(pkg.version) === null, 'Prerelease cannot use latest');
    inspected.push({ ...pkg, asset: p.asset, size: p.size, sha256: p.sha256, integrity: p.integrity });
  }
  const sorted = order(inspected);
  const actualNames = sorted.map(p => p.name);
  check(JSON.stringify(actualNames) === JSON.stringify(m.packages.map(p => p.name)), 'Manifest not in dependency order');
  return { manifest: m, packages: sorted, digest: hash(bytes) };
}

export async function requestJSON(url, { allow404 = false, fetcher = fetch } = {}) {
  for (let attempt = 0; ; attempt++) {
    let response;
    try { response = await fetcher(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(30000) }); }
    catch (error) { if (attempt < 2) { await sleep(250 * (attempt + 1)); continue; } throw error; }
    if ((response.status === 429 || response.status >= 500) && attempt < 2) { await sleep(250 * (attempt + 1)); continue; }
    if (response.status === 404 && allow404) return null;
    check(response.ok, `Registry read failed (${response.status}): ${url}`);
    return response.json();
  }
}
export function registryReader(registry = config.registry) {
  const cache = new Map();
  return async name => {
    if (!cache.has(name)) cache.set(name, await requestJSON(registry + encodeURIComponent(name), { allow404: true }));
    return cache.get(name);
  };
}
export async function sameContent(remote, local, assetsDir) {
  if (remote.dist?.integrity) {
    const data = fs.readFileSync(path.join(assetsDir, local.asset));
    const algorithms = ['sha512', 'sha384', 'sha256', 'sha1'];
    const supported = remote.dist.integrity.split(/\s+/).filter(s => /^(sha512|sha384|sha256|sha1)-/.test(s)).sort((a, b) => algorithms.indexOf(a.split('-')[0]) - algorithms.indexOf(b.split('-')[0]));
    check(supported.length, `Unrecognized remote integrity: ${local.name}`);
    check((() => { const [algorithm, digest] = supported[0].split('-'); return hash(data, algorithm, 'base64') === digest; })(), `Published bytes conflict: ${local.name}@${local.version}`);
    return;
  }
  const url = new URL(remote.dist?.tarball);
  check(url.protocol === 'https:' && url.hostname === 'registry.npmjs.org', 'Unsafe fallback tarball URL');
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'error' });
  check(response.ok, 'Cannot confirm existing tarball');
  check(hash(Buffer.from(await response.arrayBuffer())) === local.sha256, `Published bytes conflict: ${local.name}`);
}

export async function plan(loaded, assetsDir, read = registryReader()) {
  const { manifest: m, packages, digest } = loaded;
  const byName = new Map(packages.map(p => [p.name, p]));
  const actions = [], external = [];
  for (const p of packages) {
    const packument = await read(p.name);
    check(packument && packument.versions && packument['dist-tags'], `Package not initialized on public npm: ${p.name}`);
    const existing = packument.versions[p.version];
    if (existing) await sameContent(existing, p, assetsDir);
    const currentTag = packument['dist-tags'][m.distTag] || null;
    if (m.distTag === 'latest' && currentTag && (!existing || p.name === config.main)) check(semver.valid(currentTag) && semver.lte(currentTag, p.version), `Would move latest backwards: ${p.name} ${currentTag} -> ${p.version}; use a separate approved tag`);
    // Reused dependencies keep their existing tags. The entry package must already
    // have the requested tag; tag repair is an explicit maintainer operation.
    if (existing && p.name === config.main) check(currentTag === p.version, `Existing main version has a different ${m.distTag}; repair dist-tag explicitly before retry`);
    actions.push({ name: p.name, version: p.version, asset: p.asset, action: existing ? 'reuse' : 'publish', currentTag, targetTag: m.distTag });
    for (const [name, range] of edges(p)) if (!byName.has(name)) {
      const remote = await read(name);
      check(remote?.versions, `Unavailable public dependency: ${name}@${range}`);
      const version = semver.maxSatisfying(Object.keys(remote.versions), range);
      check(version && remote.versions[version].dist?.integrity, `Unresolved public dependency/integrity: ${name}@${range}`);
      external.push({ consumer: p.name, name, range, version, integrity: remote.versions[version].dist.integrity });
    }
  }
  return { manifestSha256: digest, source: m.source, build: m.build, qa: m.qa, registry: config.registry, distTag: m.distTag, actions, external };
}
