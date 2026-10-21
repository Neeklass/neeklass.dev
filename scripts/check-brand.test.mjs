import assert from 'node:assert/strict';
import test from 'node:test';
import { checkFile } from './check-brand.mjs';

const rules = (file, content) => checkFile(file, content).map((v) => v.rule);

test('raw colours are allowed only in the token file', () => {
  assert.deepEqual(rules('src/styles/global.css', ':root { --accent: #0b6972; }'), []);
  assert.deepEqual(rules('src/styles/projects.css', 'a { color: #0b6972; }'), ['raw-colour']);
  assert.deepEqual(rules('src/styles/projects.css', 'a { color: rgb(0 0 0); }'), ['raw-colour']);
  assert.deepEqual(rules('src/styles/projects.css', 'a { color: var(--accent); }'), []);
});

test('Astro style blocks are checked as CSS, markup is not', () => {
  const astro = '<a href="#main">Skip</a>\n<style>\n  .x { box-shadow: 0 1px 2px var(--border); }\n</style>';
  const result = checkFile('src/components/X.astro', astro);
  assert.deepEqual(result.map((v) => v.rule), ['no-shadow']);
  assert.equal(result[0].line, 3);
});

test('shadow none, gradients, glass and uppercase labels', () => {
  assert.deepEqual(rules('src/a.css', '.x { box-shadow: none; }'), []);
  assert.deepEqual(rules('src/a.css', '.x { background: linear-gradient(var(--accent), var(--border)); }'), ['no-gradient']);
  assert.deepEqual(rules('src/a.css', '.x { backdrop-filter: blur(4px); }'), ['no-glass']);
  assert.deepEqual(rules('src/a.css', '.x { text-transform: uppercase; }'), ['no-uppercase-label']);
});

test('numbered and FIG. labels in markup', () => {
  assert.deepEqual(rules('src/pages/a.astro', '<p class="meta">01 — Architektur</p>'), ['no-numbered-label']);
  assert.deepEqual(rules('src/pages/a.astro', '<span>FIG. 01</span>'), ['no-fig-label']);
  assert.deepEqual(rules('src/pages/a.astro', '<span>Abb. 1</span> Schleswig MCP — Überblick'), []);
  assert.deepEqual(rules('src/pages/a.astro', '<p>© 2026 Niklas Dittmann</p>'), []);
});

test('diagram SVGs: no mono labels, no FIG., no numbered tiers', () => {
  assert.deepEqual(rules('public/images/p/d.svg', '<text font-family="IBM Plex Mono">01 / CLIENTS</text>'), [
    'no-numbered-label',
    'no-mono-in-diagram',
  ]);
  assert.deepEqual(rules('public/images/p/d.svg', '<text font-family="Familjen Grotesk">Clients</text>'), []);
  // Brand artwork outside public/images is not a diagram.
  assert.deepEqual(rules('public/brand/x.svg', '<text font-family="IBM Plex Mono">01 / X</text>'), []);
});

test('CSS comments are ignored', () => {
  assert.deepEqual(rules('src/a.css', '/* no box-shadow: 0 0 1px here */ .x { color: inherit; }'), []);
});
