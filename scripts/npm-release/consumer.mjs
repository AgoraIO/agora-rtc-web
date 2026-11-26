#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import { chromium } from 'playwright';
import { check, config, hash, inspect, load, npmEnv, requestJSON, write } from './lib.mjs';
const exec = promisify(execFile);

// Only an installation mirror: no registry publish endpoint and no credentials.
// Candidate packuments contain only the submitted version, so npm cannot satisfy
// ^4.19.0 with a newer public SDK and accidentally test a different release.
export async function mirror(loaded, assetsDir) {
  const local = new Map();
  for (const p of loaded.packages) local.set(p.name, { ...p, pkg: (await inspect(path.join(assetsDir, p.asset))).pkg });
  let base;
  const server = http.createServer(async (req, res) => {
    try {
      check(req.method === 'GET', 'Read-only mirror');
      const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname.slice(1));
      const asset = loaded.packages.find(p => name === `tarballs/${p.asset}`);
      if (asset) { res.setHeader('content-type', 'application/octet-stream'); fs.createReadStream(path.join(assetsDir, asset.asset)).pipe(res); return; }
      if (/^(@[a-z0-9._-]+\/)?[a-z0-9._-]+\/-\/[a-z0-9._-]+\.tgz$/i.test(name)) {
        // npm may rewrite registry.npmjs.org tarball URLs to the mirror host.
        const response = await fetch(config.registry + name, { signal: AbortSignal.timeout(30000), redirect: 'error' });
        check(response.ok, `Public tarball read failed: ${response.status}`);
        res.setHeader('content-type', 'application/octet-stream');
        res.end(Buffer.from(await response.arrayBuffer())); return;
      }
      check(/^(@[a-z0-9._-]+\/)?[a-z0-9._-]+$/i.test(name), 'Invalid package request');
      const p = local.get(name);
      if (p) {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ name, 'dist-tags': { latest: p.version }, versions: { [p.version]: { ...p.pkg, dist: { integrity: p.integrity, tarball: `${base}tarballs/${p.asset}` } } } }));
      } else {
        const remote = await requestJSON(config.registry + encodeURIComponent(name), { allow404: true });
        if (!remote) { res.writeHead(404); res.end('{}'); return; }
        res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(remote));
      }
    } catch (error) { res.writeHead(502); res.end(JSON.stringify({ error: error.message })); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}/`;
  return { base, close: () => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }) };
}

async function verify(manifestFile, assetsDir, reportFile, mode) {
  check(['candidate', 'public'].includes(mode), 'Use candidate or public');
  const loaded = await load(manifestFile, assetsDir);
  const main = loaded.packages.find(p => p.name === config.main);
  const mainPackage = (await inspect(path.join(assetsDir, main.asset))).pkg;
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'websdk-consumer-'));
  let registry, browser;
  const report = { manifestSha256: loaded.digest, mode, status: 'running', entrypoints: [] };
  try {
    if (mode === 'candidate') registry = await mirror(loaded, assetsDir);
    fs.writeFileSync(path.join(temp, 'package.json'), JSON.stringify({ name: 'websdk-consumer', version: '1.0.0', private: true, type: 'module' }));
    await exec('npm', ['install', `${config.main}@${main.version}`, '--registry', registry?.base || config.registry, '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: temp, env: npmEnv(), maxBuffer: 16 * 1024 * 1024 });
    // Only the main SDK was requested. Every split package must have resolved
    // through its real published dependency declaration, at the intended version.
    for (const p of loaded.packages) {
      const installed = JSON.parse(fs.readFileSync(path.join(temp, 'node_modules', p.name, 'package.json')));
      if (mode === 'candidate' || p.name === config.main) check(installed.version === p.version, `Consumer resolved different candidate: ${p.name}@${installed.version}`);
      (report.resolvedPackages ||= []).push({name: p.name, version: installed.version});
    }
    const lock = fs.readFileSync(path.join(temp, 'package-lock.json'));
    report.consumerLockSha256 = hash(lock);
    fs.writeFileSync(reportFile.replace(/\.json$/, '') + '-consumer-lock.json', lock);
    let entries = ['.'];
    if (mainPackage.exports && typeof mainPackage.exports === 'object') {
      const subpaths = Object.keys(mainPackage.exports).filter(k => k.startsWith('.'));
      if (subpaths.length) entries = subpaths.filter(k => k !== './package.json');
    }
    check(entries.includes('.'), 'SDK must expose root entry');
    check(entries.every(e => /^\.(\/[a-zA-Z0-9_/-]+)?$/.test(e)), 'Wildcard/unrecognized export requires an explicit consumer contract');
    for (const [index, entry] of entries.entries()) {
      const specifier = config.main + (entry === '.' ? '' : entry.slice(1));
      const isSDK = ['.', './esm', './full', './min'].includes(entry);
      const importSDK = entry === './esm' ? `import * as SDK from ${JSON.stringify(specifier)};` : `import SDK from ${JSON.stringify(specifier)};`;
      const smoke = isSDK ? `${importSDK}\nconst client = SDK.createClient({mode: 'rtc', codec: 'vp8'});\nif (!client || typeof client.join !== 'function') throw new Error('Invalid SDK client');` : `import * as Service from ${JSON.stringify(specifier)};\nif (!Object.keys(Service).length) throw new Error('Empty service module');`;
      fs.writeFileSync(path.join(temp, `entry-${index}.ts`), smoke + `\nglobalThis.__sdkSmoke = 'passed';\n`);
    }
    const require = createRequire(import.meta.url);
    const tsconfig = { compilerOptions: { noEmit: true, strict: true, skipLibCheck: false, module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2020', lib: ['ES2020', 'DOM', 'DOM.Iterable'] }, include: ['entry-*.ts', 'smoke.d.ts'] };
    fs.writeFileSync(path.join(temp, 'tsconfig.json'), JSON.stringify(tsconfig));
    fs.writeFileSync(path.join(temp, 'smoke.d.ts'), 'declare var __sdkSmoke: string;\n');
    try {
      await exec(process.execPath, [require.resolve('typescript/bin/tsc'), '--project', path.join(temp, 'tsconfig.json')], { maxBuffer: 8 * 1024 * 1024 });
      report.types = 'passed';
    } catch (error) { report.types = 'failed'; report.typeErrors = error.stdout || error.message; }
    browser = await chromium.launch({ headless: true, ...(process.env.SMOKE_BROWSER_CHANNEL ? { channel: process.env.SMOKE_BROWSER_CHANNEL } : {}) });
    report.browserVersion = browser.version();
    for (const [index, entry] of entries.entries()) {
      const result = await build({ entryPoints: [path.join(temp, `entry-${index}.ts`)], bundle: true, platform: 'browser', format: 'iife', write: false });
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('http://localhost/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><body></body></html>' }));
      await page.goto('http://localhost/');
      await page.addScriptTag({ content: result.outputFiles[0].text });
      check(await page.evaluate(() => globalThis.__sdkSmoke) === 'passed' && errors.length === 0, `Browser smoke failed: ${entry}: ${errors}`);
      report.entrypoints.push({ entry, types: report.types, bundle: 'passed', browser: ['.', './esm', './full', './min'].includes(entry) ? 'createClient passed' : 'service import passed' });
      await page.close();
    }
    check(report.types === 'passed', 'Consumer TypeScript check failed; see report.typeErrors');
    report.status = 'passed';
  } catch (error) { report.status = 'failed'; report.error = error.stdout || error.stack; throw error; }
  finally {
    if (browser) await browser.close();
    if (registry) await registry.close();
    fs.rmSync(temp, { recursive: true, force: true });
    write(reportFile, report);
  }
}
const [manifestFile, assetsDir, reportFile, mode = 'candidate'] = process.argv.slice(2);
if (manifestFile) verify(manifestFile, assetsDir, reportFile, mode).catch(error => { console.error(error.stdout || error.stack); process.exitCode = 1; });
