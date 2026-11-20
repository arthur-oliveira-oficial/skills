#!/usr/bin/env node
// Validates every skill folder (a directory with a SKILL.md) under the repo root, or under the path given as the first argument.
// Usage: node scripts/check-skills.mjs [root]   — exit 0 when clean, 1 when any problem is found.
// Checks: frontmatter (name, description, limits), SKILL.md length, relative links (exist, stay inside the skill),
// reference files reachable from SKILL.md, a Contents section in long references, and a LICENSE per skill.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname, relative, sep } from 'node:path';

const root = resolve(process.argv[2] ?? join(dirname(new URL(import.meta.url).pathname), '..'));
const SKILL_LINE_LIMIT = 500; // Anthropic skill-authoring guidance: keep SKILL.md under 500 lines.
const CONTENTS_THRESHOLD = 100; // References over 100 lines start with a table of contents.
const DESCRIPTION_LIMIT = 1024;
const SKIP = new Set(['.git', 'node_modules']);

const normalise = (t) => t.replace(/^﻿/, '').replace(/\r\n?/g, '\n');

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    if (SKIP.has(n)) return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/); // top-level keys only; nested metadata is ignored
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^".*"$/.test(v)) v = JSON.parse(v);
    else if (/^'.*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'");
    fields[kv[1]] = v;
  }
  return fields;
}

// Link targets in prose, ignoring fenced and inline code.
function links(text) {
  const prose = text.replace(/^```[\s\S]*?^```/gm, '').replace(/`[^`\n]*`/g, '');
  return [...prose.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)].map((m) => m[1]);
}

function checkSkill(dir) {
  const problems = [];
  const folder = relative(root, dir) || '.';
  const skillMd = join(dir, 'SKILL.md');
  const text = normalise(readFileSync(skillMd, 'utf8'));
  const fm = frontmatter(text);
  if (!fm) return [`${folder}/SKILL.md: missing or malformed frontmatter`];
  const name = fm.name ?? '';
  const base = dir.split(sep).pop();
  if (name !== base) problems.push(`${folder}/SKILL.md: name "${name}" does not match folder "${base}"`);
  if (!/^[a-z0-9-]{1,64}$/.test(name)) problems.push(`${folder}/SKILL.md: name must be 1-64 chars of a-z, 0-9, -`);
  if (/anthropic|claude/.test(name)) problems.push(`${folder}/SKILL.md: name must not contain "anthropic" or "claude"`);
  const desc = fm.description ?? '';
  if (!desc) problems.push(`${folder}/SKILL.md: missing description`);
  if (desc.length > DESCRIPTION_LIMIT) problems.push(`${folder}/SKILL.md: description is ${desc.length} chars (limit ${DESCRIPTION_LIMIT})`);
  if (/[<>]/.test(desc)) problems.push(`${folder}/SKILL.md: description must not contain < or >`);
  const lines = text.replace(/\n$/, '').split('\n').length;
  if (lines >= SKILL_LINE_LIMIT) problems.push(`${folder}/SKILL.md: ${lines} lines (keep under ${SKILL_LINE_LIMIT})`);
  if (!existsSync(join(dir, 'LICENSE'))) problems.push(`${folder}: missing LICENSE`);

  const files = walk(dir).filter((f) => f.endsWith('.md'));
  const reachable = new Set([skillMd]);
  const queue = [skillMd];
  while (queue.length) {
    const file = queue.shift();
    const body = normalise(readFileSync(file, 'utf8'));
    for (const target of links(body)) {
      if (target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue; // anchors, URLs
      const abs = resolve(dirname(file), decodeURI(target.split('#')[0]));
      const rel = relative(root, file);
      if (!abs.startsWith(resolve(dir) + sep)) problems.push(`${rel}: link leaves the skill: ${target}`);
      else if (!existsSync(abs)) problems.push(`${rel}: broken link: ${target}`);
      else if (abs.endsWith('.md') && !reachable.has(abs)) { reachable.add(abs); queue.push(abs); }
    }
  }
  for (const f of files) {
    const rel = relative(root, f);
    if (!reachable.has(f)) problems.push(`${rel}: not linked from SKILL.md or any linked reference`);
    if (f === skillMd) continue;
    const body = normalise(readFileSync(f, 'utf8'));
    if (body.split('\n').length > CONTENTS_THRESHOLD && !/^## Contents$/m.test(body)) problems.push(`${rel}: over ${CONTENTS_THRESHOLD} lines without a "## Contents" section`);
  }
  return problems;
}

const skills = readdirSync(root)
  .map((n) => join(root, n))
  .filter((p) => !SKIP.has(p.split(sep).pop()) && statSync(p).isDirectory() && existsSync(join(p, 'SKILL.md')));
if (skills.length === 0) {
  console.log(`no skill folders found under ${root}`);
  process.exit(1);
}
const problems = skills.flatMap(checkSkill);
for (const p of problems) console.log(p);
console.log(problems.length ? `${problems.length} problem(s) in ${skills.length} skill(s)` : `ok: ${skills.length} skill(s)`);
process.exit(problems.length ? 1 : 0);
