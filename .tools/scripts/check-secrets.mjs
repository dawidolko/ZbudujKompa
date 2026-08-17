/**
 * Scans the working tree for accidentally committed credentials.
 *
 *   node .tools/scripts/check-secrets.mjs
 *
 * The repository is public and the chat provider is configured with a real API
 * key, so the failure mode this guards against is concrete: a key pasted into
 * a tracked file instead of into `.env.local`, and pushed.
 *
 * It checks tracked files only. Anything gitignored — `.env.local` above all —
 * is by definition not going to be published, and flagging it would train
 * everyone to ignore the output.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/**
 * Key formats worth detecting, chosen because each has a distinctive prefix
 * that does not occur in ordinary prose or code.
 */
const patterns = [
  { name: 'Groq API key', regex: /\bgsk_[A-Za-z0-9]{20,}\b/ },
  { name: 'OpenAI API key', regex: /\bsk-[A-Za-z0-9]{20,}\b/ },
  { name: 'OpenRouter API key', regex: /\bsk-or-v1-[A-Za-z0-9]{20,}\b/ },
  { name: 'Cerebras API key', regex: /\bcsk-[A-Za-z0-9]{20,}\b/ },
  { name: 'Anthropic API key', regex: /\bsk-ant-[A-Za-z0-9-]{20,}\b/ },
  { name: 'GitHub token', regex: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/ },
  { name: 'AWS access key', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'Google API key', regex: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: 'Private key block', regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
];

/* Binary and generated files are skipped: they cannot meaningfully contain a
   pasted key, and scanning them is slow and noisy. */
const skipExtensions = /\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot|pdf|zip|gz|mp4|webm|lock)$/i;

const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((file) => !skipExtensions.test(file));

/* This script contains the patterns themselves, so scanning it would always
   report a match. */
const selfPath = '.tools/scripts/check-secrets.mjs';

const findings = [];

for (const file of files) {
  if (file === selfPath) continue;

  let contents;
  try {
    contents = readFileSync(file, 'utf8');
  } catch {
    continue; // Unreadable or binary despite the extension filter.
  }

  for (const pattern of patterns) {
    const match = pattern.regex.exec(contents);
    if (!match) continue;

    const line = contents.slice(0, match.index).split('\n').length;
    findings.push({ file, line, name: pattern.name, sample: match[0] });
  }
}

if (findings.length === 0) {
  console.log(`No credentials found in ${files.length} tracked files.`);
  process.exit(0);
}

console.error('Possible credentials found in tracked files:\n');
for (const finding of findings) {
  /* Only the first few characters are echoed. Printing the whole key would
     copy it into CI logs, which is the problem this script exists to prevent. */
  console.error(
    `  ${finding.file}:${finding.line}  ${finding.name} (${finding.sample.slice(0, 8)}…)`,
  );
}
console.error('\nMove the value into .env.local, which is gitignored, and rotate the key.');
process.exit(1);
