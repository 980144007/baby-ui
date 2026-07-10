import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const packagePath = resolve(process.cwd(), 'package.json');
const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
const registry = (pkg.publishConfig?.registry || 'https://registry.npmjs.org/').replace(/\/$/, '');

function parseVersion(version) {
  const match = String(version || '').trim().match(/^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/);
  if (!match) return null;
  return match.slice(1, 4).map(Number);
}

function formatVersion(version) {
  return version.join('.');
}

function compareVersion(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0;
}

function bumpPatch(version) {
  return `${version[0]}.${version[1]}.${version[2] + 1}`;
}

function getPackageUrl() {
  return `${registry}/${encodeURIComponent(pkg.name).replace('%2F', '%2f')}/latest`;
}

async function getRemoteVersion() {
  const response = await fetch(getPackageUrl());
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to query npm version: ${response.status} ${response.statusText}`);
  }

  const latest = await response.json();
  return parseVersion(latest.version);
}

const localVersion = parseVersion(pkg.version);
if (!localVersion) {
  throw new Error(`Invalid local package version: ${pkg.version}`);
}

const remoteVersion = await getRemoteVersion();
let nextVersion = pkg.version;

if (!remoteVersion) {
  nextVersion = bumpPatch(localVersion);
} else if (compareVersion(localVersion, remoteVersion) <= 0) {
  nextVersion = bumpPatch(remoteVersion);
}

const changed = nextVersion !== pkg.version;
if (changed) {
  pkg.version = nextVersion;
  writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
}

console.log(
  `${changed ? 'Version updated' : 'Version ready'}: ${nextVersion}${remoteVersion ? ` (npm latest: ${formatVersion(remoteVersion)})` : ' (npm package not found)'}`
);
