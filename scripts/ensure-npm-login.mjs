import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const packagePath = resolve(process.cwd(), 'package.json');
const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
const registry = pkg.publishConfig?.registry || 'https://registry.npmjs.org/';

function runNpm(args, options = {}) {
  return spawnSync('npm', args, {
    stdio: options.stdio || 'pipe',
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });
}

const whoami = runNpm(['whoami', `--registry=${registry}`]);

if (whoami.status === 0) {
  console.log(`npm logged in as ${whoami.stdout.trim()} (${registry})`);
  process.exit(0);
}

console.log(`npm is not logged in for ${registry}. Starting npm login...`);
const login = runNpm(['login', `--registry=${registry}`], { stdio: 'inherit' });

if (login.status !== 0) {
  process.exit(login.status || 1);
}

const verify = runNpm(['whoami', `--registry=${registry}`]);
if (verify.status !== 0) {
  console.error('npm login finished, but login status could not be verified.');
  process.exit(1);
}

console.log(`npm logged in as ${verify.stdout.trim()} (${registry})`);
