import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as tar from 'tar';
import semver from 'semver';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const config = JSON.parse(fs.readFileSync(path.join(here, 'config.json')));
export const check = (ok, message) => { if (!ok) throw new Error(message); };
export const hash = (bytes, algorithm = 'sha256', encoding = 'hex') => crypto.createHash(algorithm).update(bytes).digest(encoding);
export const safeTag = tag => { check(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(tag || ''), 'Invalid Release tag'); return tag; };
export const safeAsset = name => { check(/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.tgz$/.test(name), `Invalid tgz filename: ${name}`); return name; };
const edges = pkg => [...Object.entries(pkg.dependencies || {}).filter(([name]) => !Object.hasOwn(pkg.optionalDependencies || {}, name)), ...Object.entries(pkg.optionalDependencies || {}), ...Object.entries(pkg.peerDependencies || {})];

export function checksums(dir, expectedDigest) {
  const bytes = fs.readFileSync(path.join(dir, 'SHA256SUMS'));
  const digest = hash(bytes), assets = new Set();
  if (expectedDigest !== undefined) check(/^[a-f0-9]{64}$/.test(expectedDigest) && digest === expectedDigest, 'SHA256SUMS changed since dispatch; upload/start again after review');
  for (const line of bytes.toString().trim().split(/\r?\n/)) {
    const match = /^([a-f0-9]{64}) [ *](?:\.\/)?([a-zA-Z0-9][a-zA-Z0-9._-]*\.tgz)$/.exec(line);
    check(match, `Invalid SHA256SUMS line: ${line}`);
    const [, sum, name] = match;
    check(!assets.has(name), `Duplicate checksum: ${name}`); assets.add(name);
    const file = path.join(dir, name);
    check(fs.lstatSync(file).isFile() && hash(fs.readFileSync(file)) === sum, `tgz checksum mismatch: ${name}`);
  }
  check(assets.size > 0, 'No tgz files');
  const actual = fs.readdirSync(dir).filter(name => name.endsWith('.tgz'));
  check(actual.length === assets.size && actual.every(name => assets.has(name)), 'tgz files do not match SHA256SUMS');
  return { digest, assets: [...assets] };
}

export async function inspect(file) {
  let bytes, failure;
  await tar.t({ file, strict: true, onReadEntry(entry) {
    if (entry.path !== 'package/package.json') { entry.resume(); return; }
    if (bytes || entry.type !== 'File' || entry.size > 1024 * 1024) {
      failure = new Error('Invalid/duplicate package.json'); entry.resume(); return;
    }
    const chunks = []; bytes = chunks;
    entry.on('data', chunk => chunks.push(chunk));
  } });
  if (failure) throw failure;
  check(bytes, 'Missing package/package.json');
  const pkg = JSON.parse(Buffer.concat(bytes));
  check(config.packages.includes(pkg.name), `Package not approved in config.json: ${pkg.name}`);
  check(!pkg.private && semver.valid(pkg.version) === pkg.version, `Invalid/private package: ${pkg.name}`);
  const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  check(typeof repo === 'string' && repo.replace(/^git\+/, '').replace(/\.git$/, '').replace(/\/$/, '') === `https://github.com/${config.repository}`, `repository must match ${config.repository}: ${pkg.name}`);
  for (const [key, value] of Object.entries(pkg.publishConfig || {})) {
    check((key === 'registry' && value.replace(/\/$/, '') === config.registry.replace(/\/$/, '')) || (key === 'access' && value === 'public') || (key === 'provenance' && value === false), `Conflicting publishConfig.${key}: ${pkg.name}`);
  }
  for (const [name, range] of edges(pkg)) {
    check(typeof range === 'string' && semver.validRange(range) !== null, `Non-public dependency: ${name}@${range}`);
    if (name.startsWith('@agora-js/')) check(config.packages.includes(name), `Add new package to config.json and configure its npm Trusted Publisher: ${name}`);
  }
  return pkg;
}

export function order(packages) {
  const byName = new Map(packages.map(pkg => [pkg.name, pkg]));
  check(byName.size === packages.length, 'Duplicate package name');
  check(byName.has(config.main), 'Missing main package');
  const result = [], active = new Set(), seen = new Set();
  function visit(pkg) {
    check(!active.has(pkg.name), `Dependency cycle: ${pkg.name}`);
    if (seen.has(pkg.name)) return;
    active.add(pkg.name);
    for (const [name, range] of edges(pkg)) if (byName.has(name)) {
      check(semver.satisfies(byName.get(name).version, range), `Unsatisfied dependency: ${pkg.name} -> ${name}@${range}`);
      visit(byName.get(name));
    }
    active.delete(pkg.name); seen.add(pkg.name); result.push(pkg);
  }
  visit(byName.get(config.main));
  check(seen.size === packages.length, 'Unrelated tgz in directory; use only this SDK release and its dependencies');
  return result;
}

export async function load(dir, expectedDigest) {
  const sums = checksums(dir, expectedDigest), packages = [];
  for (const asset of sums.assets) {
    const bytes = fs.readFileSync(path.join(dir, asset));
    packages.push({ ...await inspect(path.join(dir, asset)), asset, integrity: `sha512-${hash(bytes, 'sha512', 'base64')}`, sha256: hash(bytes) });
  }
  return { ...sums, packages: order(packages) };
}

export async function readRegistry(name) {
  const response = await fetch(config.registry + encodeURIComponent(name), { headers: { accept: 'application/vnd.npm.install-v1+json' }, signal: AbortSignal.timeout(30000) });
  if (response.status === 404) return null;
  check(response.ok, `npm registry HTTP ${response.status}: ${name}`);
  return response.json();
}
export async function sameContent(remote, local) {
  const integrity = remote.dist?.integrity?.split(/\s+/) || [];
  if (integrity.some(value => value.startsWith('sha512-'))) {
    check(integrity.includes(local.integrity), `Published bytes conflict: ${local.name}@${local.version}`);
    return;
  }
  const url = new URL(remote.dist?.tarball);
  check(url.protocol === 'https:' && url.hostname === 'registry.npmjs.org', `Cannot verify existing bytes: ${local.name}`);
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30000) });
  check(response.ok && hash(Buffer.from(await response.arrayBuffer())) === local.sha256, `Published bytes conflict: ${local.name}@${local.version}`);
}

export async function plan(loaded, distTag, read = readRegistry) {
  check(config.distTags.includes(distTag), 'Use latest, next or hotfix');
  const cache = new Map(), get = async name => { if (!cache.has(name)) cache.set(name, await read(name)); return cache.get(name); };
  const names = new Set(loaded.packages.map(pkg => pkg.name)), actions = [];
  for (const pkg of loaded.packages) {
    check(distTag !== 'latest' || !semver.prerelease(pkg.version), `Prerelease cannot use latest: ${pkg.name}`);
    const remote = await get(pkg.name);
    check(remote?.versions && remote['dist-tags'], `Initialize package on npm before OIDC: ${pkg.name}`);
    const existing = remote.versions[pkg.version], current = remote['dist-tags'][distTag];
    if (existing) await sameContent(existing, pkg);
    if (distTag === 'latest' && current && (!existing || pkg.name === config.main)) check(semver.valid(current) && semver.lte(current, pkg.version), `Would move latest backwards: ${pkg.name}`);
    if (existing && pkg.name === config.main) check(current === pkg.version, `Existing main version has a different ${distTag}; ask npm maintainer to correct dist-tag explicitly`);
    for (const [name, range] of edges(pkg)) if (config.packages.includes(name) && !names.has(name)) {
      const dependency = await get(name);
      check(dependency?.versions && semver.maxSatisfying(Object.keys(dependency.versions), range), `Missing internal dependency: ${name}@${range}; include its tgz or publish it first`);
    }
    actions.push({ ...pkg, action: existing ? 'reuse' : 'publish' });
  }
  return actions;
}
