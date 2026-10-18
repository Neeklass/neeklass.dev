# neeklass Brand & Design System

Version: 1.0 (October 2026). Implementation reference for neeklass.dev.

## Brand identity

**Principle:** Editorial × Engineering. A personal publishing identity for real software work, data, AI, and technical writing; not a startup identity or a claim about projects that have not shipped.

**Tone:** quiet, personal, precise, readable, warm, considered. Favor technical evidence, diagrammatic explanations and actual work over decorative marketing. Influences: restrained editorial typography and personal, explanatory illustrations; never reproduce another creator's assets.

## Marks

- Primary wordmark: `neeklass.` (all lowercase, period required).
- Secondary monogram: `n.` (for avatars, favicons and discreet attribution).
- The marks are vector outlines derived from **Epunda Slab Regular (400)**, including the OpenType `ss01` *single-storey a*. Do not replace it with the IPA symbol `ɑ`.
- The Cyan signature dot is intentionally prominent, close to the letter; in the monogram it sits optically near the right foot of `n`. It is not a separate app icon.
- The canonical assets are `public/brand/wordmark-{light,dark}.svg`, `monogram-{light,dark}.svg` and `public/favicon.svg`. Use these instead of typing the wordmark in a web font.
- Light artwork: Graphite lettering + dark teal dot. Dark artwork: Pearl lettering + Cyan dot.
- Do not stretch, outline, add gradients, glow, shadow or animate the mark. Keep quiet surrounding space. Monochrome outputs may be derived for one-color printing.

## Palette

| Color | Hex | Function |
| --- | --- | --- |
| Graphite | `#383D3B` | Primary ink and structural lines |
| Pearl | `#EEE5E9` | Light background |
| Gray | `#7C7C7C` | Neutral graphic utility; not default body text |
| Cyan | `#52DEE5` | Signature accent on dark, graphics |
| Ice | `#92DCE5` | Secondary graphic/data color |
| Apricot | `#E6A76B` | Optional illustration accent |
| Lavender | `#B5A0D2` | Optional illustration accent |
| Dark teal | `#0B6972` | Accessible accent/link color on Pearl |

### Semantic themes

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#EEE5E9` | `#252B29` |
| Surface | `#F8F5F6` | `#383D3B` |
| Foreground | `#383D3B` | `#EEE5E9` |
| Secondary text | `#56625D` | `#B5BEB9` |
| Accent / links | `#0B6972` | `#52DEE5` |
| Border | `#CEC5CA` | `#515A56` |

The bright Cyan `#52DEE5` on Pearl does **not** meet normal-text contrast. Use dark teal for light-theme interactive text. Test final component colors and focus states with real contrast measurements. Theme preference remains System → Light → Dark and must work without client-side JavaScript.

## Typography roles

| Role | Typeface | Where |
| --- | --- | --- |
| Wordmark & monogram | Custom Epunda Slab outlines (400; `ss01`) | Logos only |
| UI & body | Familjen Grotesk (400–700) | Navigation, controls, descriptions, labels |
| Editorial | Literata (400–700) | Headlines, articles, quotations and cover titles |
| Technical | IBM Plex Mono 400 | Metadata, code, diagram labels, references |

Three website text families are self-hosted in `public/fonts/` with their original SIL OFL license files. The logo does not require web font downloads to appear correctly. Use fallback system fonts on failure. Avoid setting entire interfaces in monospace or serif.

## Composition

- Editorial hierarchy with generous whitespace and strong reading rhythm; favor rules and type over excessive card surfaces.
- Keep the homepage minimal: it intentionally contains only the name in the main area.
- Navigation is text-led; utility icons are okay.
- Avoid AI/SaaS tropes, glass effects, neon/glow, arbitrary gradients, fictitious work, stock heroes and busy animation.
- Accessibility: semantic HTML, keyboard focus, readable line lengths, reduced motion, text contrast, and coherent responsive breakpoints.

## Illustration system

- Treat diagrams as real information graphics: clearly indicate inputs, processing, interfaces, decisions, and trade-offs.
- Use fine strokes, purposeful arrows, short technical annotations (`FIG. 01`, `API`, `DATA`), and consistent caption spacing.
- Cyan is the signature; Ice, Apricot and Lavender can clarify *different* concepts, not color every object for decoration.
- Not every project should have the same four-node pipeline. A project-specific illustration is preferable to a diagram that misrepresents functionality.
- Label conceptual architecture as conceptual. Do not imply implementations or features that are not real.

## Reusable project cover

The source-controlled generator and neutral editable configuration live at:
- `scripts/render-project-cover.mjs`
- `templates/project-cover/example.json`
- `templates/project-cover/README.md`

The default canvas is **1200 × 630** for Open Graph and link previews. Each configuration produces light and dark SVGs. Review typography, thumbnail legibility and diagrams before publishing. Templates are development assets and are not automatically listed as projects on the website.

## Implementation & status

The SVG wordmark and monogram and the palette were approved visually. Typography/color integration and the first reusable cover generator are version 1 implementation, still subject to real-device QA. Fine details like long-title line breaking and 16-pixel favicon antialiasing should be revisited only with concrete test evidence.
