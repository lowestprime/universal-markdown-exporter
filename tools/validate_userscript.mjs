#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const scriptPath = path.resolve(here, '../userscript/Universal_Markdown_Exporter.user.js');
const source = fs.readFileSync(scriptPath, 'utf8');
const failures = [];

const requireText = (needle, description) => {
  if (!source.includes(needle)) failures.push(`missing ${description}: ${needle}`);
};
const forbidText = (needle, description) => {
  if (source.includes(needle)) failures.push(`forbidden ${description}: ${needle}`);
};

const syntax = spawnSync(process.execPath, ['--check', scriptPath], { encoding: 'utf8' });
if (syntax.status !== 0) failures.push(`node --check failed:\n${syntax.stderr || syntax.stdout}`);

requireText('// @version           4.3.0', 'release version');
requireText('scripts/568581/Universal%20Markdown%20Exporter.user.js', 'correct Greasy Fork download URL');
requireText("const DR_PROTOCOL = 'ume.deep-research.v1';", 'versioned iframe protocol');
requireText('ev.source !== sourceWindow', 'iframe response source validation');
requireText('data.requestId !== requestId', 'iframe response request correlation');
requireText("button[aria-label=\"Sources and activity\"]", 'explicit Sources and activity selector');
requireText("const RUNTIME_ATTR = 'data-universal-markdown-exporter-runtime';", 'runtime singleton guard');
requireText("for (const type of ['pointerup', 'mouseup', 'click', 'auxclick', 'dblclick', 'contextmenu'])", 'complete activation suppression');
requireText("className: 'h2m-frame-shield'", 'cross-origin iframe picker shield');
requireText('presentMarkdown(fmtOut(', 'parent-owned modal presentation');
requireText("data-h2m-kind': 'export'", 'export modal singleton marker');
requireText('const iframe = getDRIframe();', 'active Deep Research frame selection');

forbidText('h2m-auto-export', 'broadcast auto-export control message');
forbidText('postMessageToDeepResearchIframes', 'broadcast-to-all-frame helper');
forbidText('sendToAllIframes', 'broadcast-to-all-frame wrapper');
forbidText('location.href =', 'direct page navigation assignment');
forbidText('window.location =', 'direct window navigation assignment');

const declared = new Map();
for (const match of source.matchAll(/\b(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
  const name = match[1];
  const line = source.slice(0, match.index).split('\n').length;
  const rows = declared.get(name) || [];
  rows.push(line);
  declared.set(name, rows);
}
for (const [name, lines] of declared) {
  if (name === 'walk') continue; // Separate nested helpers in distinct lexical scopes.
  if (lines.length > 1) failures.push(`duplicate function declaration ${name} at lines ${lines.join(', ')}`);
}

if (failures.length) {
  console.error('FAIL: Universal Markdown Exporter validation');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: syntax, metadata, routing, singleton, picker, and no-navigation invariants');
