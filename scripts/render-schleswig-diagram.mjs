// Renders the Schleswig MCP architecture diagram in German and English, for the
// light and dark theme, from one layout definition.
//
//   node scripts/render-schleswig-diagram.mjs
//
// Follows docs/brand-system.md ("Diagram"): labels in the page's language and in
// sentence case, Interface typeface, thin strokes, no numbered tiers, no branding
// text, one accent for what matters (the live connection), Ice/Apricot/Lavender
// only to separate concepts. Output is committed; nothing runs at build time.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT = new URL('../public/images/projects/schleswig-mcp/', import.meta.url);

const THEMES = {
  light: {
    background: '#EEE5E9', surface: '#F8F5F6', foreground: '#383D3B', muted: '#56625D',
    border: '#CEC5CA', accent: '#0B6972', clients: '#5FA9B4', interfaces: '#9077AA', data: '#C8874D',
  },
  dark: {
    background: '#252B29', surface: '#383D3B', foreground: '#EEE5E9', muted: '#B5BEB9',
    border: '#515A56', accent: '#52DEE5', clients: '#92DCE5', interfaces: '#B5A0D2', data: '#E6A76B',
  },
};

// German labels are a proposal and need Niklas's approval before publishing.
const LABELS = {
  en: {
    title: 'Schleswig MCP system architecture',
    desc: 'Web applications use the REST API and AI assistants use the MCP server. Both share application logic, data processing and validation. Five curated open-data snapshots feed structured data; an external API provides the live water level.',
    groups: { clients: 'Clients', platform: 'Schleswig MCP', data: 'Public open data' },
    web: ['Web apps and services', 'HTTP / JSON'],
    ai: ['AI assistants and agents', 'MCP-capable clients'],
    rest: ['REST API', 'HTTP endpoints · OpenAPI'],
    mcp: ['MCP server', 'Six read-only tools'],
    logic: ['Shared application logic', 'Shared domain functions'],
    processing: ['Data processing and validation', 'Providers · models · checks'],
    structured: ['Structured data', 'Five curated snapshots'],
    datasets: ['Open data datasets', 'Curated source files'],
    external: ['External API', 'Live water level'],
    edges: { http: 'HTTP / JSON', mcp: 'Model Context Protocol', preparation: 'Data preparation', live: 'Live request' },
  },
  de: {
    title: 'Systemarchitektur von Schleswig MCP',
    desc: 'Webanwendungen nutzen die REST-API, KI-Assistenten den MCP-Server. Beide verwenden gemeinsame Anwendungslogik, Datenverarbeitung und Validierung. Fünf aufbereitete Open-Data-Snapshots liefern strukturierte Daten; eine externe API liefert den Live-Wasserstand.',
    groups: { clients: 'Clients', platform: 'Schleswig MCP', data: 'Öffentliche offene Daten' },
    web: ['Webanwendungen und Dienste', 'HTTP / JSON'],
    ai: ['KI-Assistenten und Agenten', 'MCP-fähige Clients'],
    rest: ['REST-API', 'HTTP-Endpunkte · OpenAPI'],
    mcp: ['MCP-Server', 'Sechs Tools, nur lesend'],
    logic: ['Gemeinsame Anwendungslogik', 'Gemeinsame Domänenfunktionen'],
    processing: ['Datenverarbeitung und Validierung', 'Provider · Modelle · Prüfungen'],
    structured: ['Strukturierte Daten', 'Fünf aufbereitete Snapshots'],
    datasets: ['Open-Data-Datensätze', 'Aufbereitete Quelldateien'],
    external: ['Externe API', 'Live-Wasserstand'],
    edges: { http: 'HTTP / JSON', mcp: 'Model Context Protocol', preparation: 'Datenaufbereitung', live: 'Live-Abfrage' },
  },
};

const FONT = 'Familjen Grotesk, Arial, sans-serif';
const W = 1100;
const H = 1310;

const esc = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(x, y, value, { size = 15, weight = 400, fill, anchor = 'middle' }) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-family="${FONT}" font-weight="${weight}" font-size="${size}">${esc(value)}</text>`;
}

function node(c, { x, y, w, h, stroke }, [title, detail]) {
  const cx = x + w / 2;
  return [
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c.background}" stroke="${stroke}" stroke-width="1.5"/>`,
    text(cx, y + h / 2 - 4, title, { size: 21, weight: 600, fill: c.foreground }),
    text(cx, y + h / 2 + 22, detail, { size: 15, fill: c.muted }),
  ].join('\n');
}

function group(c, { y, h }, label) {
  return [
    `<rect x="65" y="${y}" width="970" height="${h}" rx="4" fill="none" stroke="${c.border}" stroke-width="1"/>`,
    text(93, y + 36, label, { size: 16, weight: 600, fill: c.muted, anchor: 'start' }),
  ].join('\n');
}

function edgeLabel(c, cx, y, value) {
  const w = Math.round(value.length * 8.2 + 32);
  return [
    `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="30" rx="4" fill="${c.background}" stroke="${c.border}" stroke-width="1"/>`,
    text(cx, y + 20, value, { size: 14, fill: c.foreground }),
  ].join('\n');
}

const line = (d, stroke, extra = '') =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;

export function render(language, theme) {
  const c = THEMES[theme];
  const l = LABELS[language];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="diagram-title diagram-desc">
<title id="diagram-title">${esc(l.title)}</title>
<desc id="diagram-desc">${esc(l.desc)}</desc>
<rect width="${W}" height="${H}" fill="${c.background}"/>
<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${c.foreground}"/></marker>
<marker id="accent-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${c.accent}"/></marker>
</defs>
${group(c, { y: 52, h: 235 }, l.groups.clients)}
${group(c, { y: 334, h: 714 }, l.groups.platform)}
${group(c, { y: 1090, h: 180 }, l.groups.data)}
${line('M299 231V418', c.foreground, 'marker-end="url(#arrow)"')}
${line('M801 231V418', c.foreground, 'marker-end="url(#arrow)"')}
${line('M299 516V555H519V605', c.foreground, 'marker-end="url(#arrow)"')}
${line('M801 516V555H681V605', c.foreground, 'marker-end="url(#arrow)"')}
${line('M600 703V750', c.foreground, 'marker-end="url(#arrow)"')}
${line('M520 848V880H327V913', c.foreground, 'marker-end="url(#arrow)"')}
${line('M299 1152V1013', c.muted, 'stroke-dasharray="7 6" marker-end="url(#arrow)"')}
${line('M688 848V1046H816V1150', c.accent, 'marker-end="url(#accent-arrow)"')}
${node(c, { x: 129, y: 132, w: 340, h: 99, stroke: c.clients }, l.web)}
${node(c, { x: 631, y: 132, w: 340, h: 99, stroke: c.clients }, l.ai)}
${node(c, { x: 139, y: 420, w: 320, h: 96, stroke: c.interfaces }, l.rest)}
${node(c, { x: 641, y: 420, w: 320, h: 96, stroke: c.interfaces }, l.mcp)}
${node(c, { x: 410, y: 607, w: 380, h: 96, stroke: c.foreground }, l.logic)}
${node(c, { x: 410, y: 752, w: 380, h: 96, stroke: c.foreground }, l.processing)}
${node(c, { x: 167, y: 915, w: 320, h: 96, stroke: c.data }, l.structured)}
${node(c, { x: 139, y: 1152, w: 320, h: 88, stroke: c.data }, l.datasets)}
${node(c, { x: 641, y: 1152, w: 320, h: 88, stroke: c.data }, l.external)}
${edgeLabel(c, 299, 290, l.edges.http)}
${edgeLabel(c, 801, 290, l.edges.mcp)}
${edgeLabel(c, 299, 1056, l.edges.preparation)}
${edgeLabel(c, 816, 1056, l.edges.live)}
</svg>
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const language of ['de', 'en']) {
    for (const theme of ['light', 'dark']) {
      const file = new URL(`architecture-${language}-${theme}.svg`, OUT);
      await writeFile(file, render(language, theme));
      console.log(`wrote ${fileURLToPath(file)}`);
    }
  }
}
