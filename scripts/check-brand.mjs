// Enforces the mechanical rules of docs/brand-system.md so humans and agents
// get the same feedback. Dependency-free; runs before every build and in CI.
//
//   node scripts/check-brand.mjs        check the repository, exit 1 on violations
//
// Rules that need judgement (is this label useful? does the page get worse?)
// stay in the decision checklist; only unambiguous "Never" items live here.

import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The only file that may define raw colour values (see "Tokens"). */
export const TOKEN_FILE = 'src/styles/global.css';

const STYLE_RULES = [
  {
    id: 'raw-colour',
    message: 'Raw colour value; use a token from src/styles/global.css',
    pattern: /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|lab|lch)\(/i,
    appliesTo: (file) => file !== TOKEN_FILE,
  },
  {
    id: 'no-shadow',
    message: 'Shadows are not part of the system',
    pattern: /\b(?:box|text)-shadow\s*:\s*(?!\s*none\b)/i,
  },
  { id: 'no-gradient', message: 'Gradients are not part of the system', pattern: /gradient\(/i },
  { id: 'no-glass', message: 'Blur and glass effects are not part of the system', pattern: /backdrop-filter|\bblur\(/i },
  {
    id: 'no-uppercase-label',
    message: 'No uppercase labels; use sentence case',
    pattern: /text-transform\s*:\s*uppercase/i,
  },
];

const MARKUP_RULES = [
  { id: 'no-fig-label', message: 'Use "Abb. n" / "Fig. n" captions, not "FIG."', pattern: /\bFIG\./ },
  {
    id: 'no-numbered-label',
    message: 'No numbered labels such as "01 —" or "02 /"',
    pattern: /(?:^|[\s>"'])0\d\s*[—–/]\s/,
  },
];

const DIAGRAM_RULES = [
  ...MARKUP_RULES,
  {
    id: 'no-mono-in-diagram',
    message: 'Diagram labels use the Interface typeface, not IBM Plex Mono',
    pattern: /IBM Plex Mono/,
  },
];

function toPosix(path) {
  return path.split(sep).join('/');
}

/** Returns [startLine, text] chunks of CSS inside an Astro file's <style> blocks. */
function styleBlocks(content) {
  const blocks = [];
  const regex = /<style\b[^>]*>([\s\S]*?)<\/style>/g;
  for (const match of content.matchAll(regex)) {
    const before = content.slice(0, match.index + match[0].indexOf('>') + 1);
    blocks.push([before.split('\n').length, match[1]]);
  }
  return blocks;
}

function withoutStyleBlocks(content) {
  // Keep line numbers stable by replacing style content with blank lines.
  return content.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, body, close) =>
    open + body.replace(/[^\n]/g, '') + close,
  );
}

function scan(file, startLine, text, rules) {
  const violations = [];
  text.split('\n').forEach((line, index) => {
    const code = line.replace(/\/\*.*?\*\//g, '');
    for (const rule of rules) {
      if (rule.appliesTo && !rule.appliesTo(file)) continue;
      if (rule.pattern.test(code)) {
        violations.push({ file, line: startLine + index, rule: rule.id, message: rule.message, text: line.trim() });
      }
    }
  });
  return violations;
}

/**
 * Checks one file. `file` is a repository-relative POSIX path.
 * Pure function: no file system access, so it is easy to test.
 */
export function checkFile(file, content) {
  const extension = extname(file);
  if (extension === '.css') return scan(file, 1, content, STYLE_RULES);
  if (extension === '.astro') {
    return [
      ...styleBlocks(content).flatMap(([line, css]) => scan(file, line, css, STYLE_RULES)),
      ...scan(file, 1, withoutStyleBlocks(content), MARKUP_RULES),
    ];
  }
  if (extension === '.md') return scan(file, 1, content, MARKUP_RULES);
  if (extension === '.svg' && file.startsWith('public/images/')) return scan(file, 1, content, DIAGRAM_RULES);
  return [];
}

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

export async function checkRepository(root) {
  const violations = [];
  for (const top of ['src', 'public/images']) {
    for await (const path of walk(join(root, top))) {
      if (!['.css', '.astro', '.md', '.svg'].includes(extname(path))) continue;
      const file = toPosix(relative(root, path));
      violations.push(...checkFile(file, await readFile(path, 'utf8')));
    }
  }
  return violations;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const violations = await checkRepository(root);
  for (const v of violations) {
    console.error(`${v.file}:${v.line}  ${v.rule}  ${v.message}\n    ${v.text}`);
  }
  if (violations.length > 0) {
    console.error(`\n${violations.length} brand rule violation(s). See docs/brand-system.md.`);
    process.exit(1);
  }
  console.log('Brand check passed.');
}
