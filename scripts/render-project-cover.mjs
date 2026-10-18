#!/usr/bin/env node
/**
 * Generate editable project-cover SVGs for both color themes.
 * Usage: node scripts/render-project-cover.mjs templates/project-cover/example.json [output-directory]
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';

const input = resolve(process.argv[2] ?? 'templates/project-cover/example.json');
const output = resolve(process.argv[3] ?? 'dist/project-covers');
const config = JSON.parse(await readFile(input, 'utf8'));
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const palettes = {
  light: { bg: '#EEE5E9', ink: '#383D3B', muted: '#56625D', line: '#CEC5CA', teal: '#0B6972', surface: '#F8F5F6' },
  dark: { bg: '#252B29', ink: '#EEE5E9', muted: '#B5BEB9', line: '#515A56', teal: '#52DEE5', surface: '#383D3B' }
};
const stages = Array.isArray(config.stages) ? config.stages : [];
if (stages.length !== 4 || stages.some(stage => !stage?.label)) {
  throw new Error('Provide exactly four named conceptual stages.');
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(config.slug ?? '')) {
  throw new Error('slug must be a lowercase kebab-case name.');
}
if (!config.title || String(config.title).length > 42) {
  throw new Error('Provide a project title no longer than 42 characters.');
}
const positions = [[654, 224], [916, 224], [916, 415], [654, 415]];
const fills = ['#92DCE5', '#E6A76B', '#B5A0D2', '#92DCE5'];
const fonts = {
  ui: 'Familjen Grotesk, sans-serif',
  editorial: 'Literata, Georgia, serif',
  technical: 'IBM Plex Mono, monospace'
};
const original = dirname(input);
const projectRoot = resolve('public/brand');
const logos = Object.fromEntries(await Promise.all(['light','dark'].map(async (theme) => [theme, await readFile(join(projectRoot, `wordmark-${theme}.svg`), 'utf8')])));

const imagePath = config.custom_illustration_svg ? resolve(original, config.custom_illustration_svg) : null;
// Custom SVG artwork is deliberately embedded as source-authored vector markup.
const customArt = imagePath ? await readFile(imagePath, 'utf8') : null;
function render(theme) {
  const c = palettes[theme];
  const title = escape(config.title);
  const subtitle = escape(config.subtitle ?? '');
  const categories = escape((config.categories ?? []).join(' / ').toUpperCase());
  const projectNo = escape(config.project_number ?? '001');
  const connectors = '<path d="M862 264H916M1020 300V415M916 453H862" fill="none" stroke="'+c.muted+'" stroke-width="1.5" stroke-dasharray="4 4"/>';
  const blocks = stages.map((stage,i)=>{
    const [x,y] = positions[i];
    return '<rect x="'+x+'" y="'+y+'" width="208" height="76" rx="9" fill="'+fills[i]+'" fill-opacity="'+(theme==='light'?'0.34':'0.10')+'" stroke="'+fills[i]+'"/>'+
      '<text x="'+(x+16)+'" y="'+(y+31)+'" fill="'+c.ink+'" font-family="'+fonts.ui+'" font-size="19" font-weight="600">'+escape(stage.label)+'</text>'+
      '<text x="'+(x+16)+'" y="'+(y+52)+'" fill="'+c.muted+'" font-family="'+fonts.technical+'" font-size="11">'+escape(stage.description??'')+'</text>';
  }).join('');
  const diagram = customArt ? '<svg x="630" y="199" width="520" height="315" viewBox="0 0 520 315">'+customArt.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'')+'</svg>' : connectors+blocks;
  const titleSize = config.title.length > 20 ? 43 : config.title.length > 14 ? 54 : 66;
  const wordmark = logos[theme].replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title[^>]*>.*?<\/title>/s, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
<title id="title">${title} — neeklass</title><desc id="description">${subtitle}; conceptual illustration.</desc>
<rect width="1200" height="630" fill="${c.bg}"/>
<svg x="56" y="40" width="180" height="58" viewBox="0 -765 3457 865">${wordmark}</svg>
<text x="1144" y="86" text-anchor="end" font-family="${fonts.technical}" font-size="13" fill="${c.muted}">PROJECT / ${projectNo}</text>
<path d="M56 133H1144M570 190V531M56 566H1144" fill="none" stroke="${c.line}" stroke-width="1"/>
<text x="57" y="207" font-family="${fonts.technical}" font-size="12" fill="${c.muted}">SELECTED WORK / ${projectNo}</text>
<text x="55" y="298" font-family="${fonts.editorial}" font-size="${titleSize}" fill="${c.ink}">${title}</text>
<text x="57" y="355" font-family="${fonts.technical}" font-size="12" fill="${c.muted}">${categories}</text>
<path d="M57 397H116" stroke="${c.teal}" stroke-width="3"/>
<text x="57" y="444" font-family="${fonts.ui}" font-size="21" fill="${c.ink}">${subtitle}</text>
<rect x="630" y="199" width="520" height="315" fill="none" stroke="${c.line}" stroke-dasharray="2 7"/>
${diagram}
<text x="630" y="545" font-family="${fonts.technical}" font-size="10" fill="${c.muted}">FIG. 01 — CONCEPTUAL SYSTEM OVERVIEW</text>
<text x="57" y="597" font-family="${fonts.technical}" font-size="11" fill="${c.muted}">NEEKLASS.DEV</text>
<text x="1144" y="597" text-anchor="end" font-family="${fonts.technical}" font-size="11" fill="${c.muted}">EDITORIAL × ENGINEERING</text>
</svg>`;
}
await mkdir(output, { recursive: true });
for (const theme of Object.keys(palettes)) {
  await writeFile(join(output,`${config.slug}-${theme}.svg`), render(theme), 'utf8');
}
console.log('Generated light and dark SVG covers in', output);
