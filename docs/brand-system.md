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
- Do not stretch, outline, add gradients, glow or shadow to the mark. Animation is limited to the approved [Hidden Signature](#hidden-signature) below; the primary wordmark and favicon remain static. Keep quiet surrounding space. Monochrome outputs may be derived for one-color printing.

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

## Hidden Signature

The Hidden Signature is a quiet personal detail: the canonical `n.` monogram
reveals an approved geometric, Protogen-inspired symbol. It is not a replacement
for the primary wordmark or favicon. Keep homepage content, editorial typography,
navigation and existing utility links intact. Do not add captions or decoration.

### Approved artwork and placement

The supplied `neeklass-hidden-mark-v8` package is the artwork source of truth:
`HiddenMarkEasterEgg.astro`, `footer-preview.html` and `404-preview.html`.
Retain its vector letter, silhouette, coordinates, stroke widths and layer order.
Do not redraw the illustration or add detail.

- The shared footer uses a 52px square, simplified ears and a stronger eye stroke,
  without inner-ear shading or a mouth. It sits before the existing utility links.
- The bilingual 404 page uses a 180px square with both ear shading and the stepped
  mouth. It accompanies the existing text in a wrapping editorial layout.

Both instances reserve their dimensions before interaction; animation never
changes page layout. Buttons have a minimum 44px hit area. The SVG scales uniformly
within its square view box and fits the available width.

### SVG construction

The orb has center `(301, 281)` and radius `114`. One geometry definition drives
its fill, last-painted outline and concentric face clipping region, inset by `8`
units (radius `106`), exactly as in v8. The eye and mouth are children of that clip.
The entire group translates and scales uniformly from the original dot at
`(405, 367)`, radius `24`. Never scale its axes independently, morph it into a
polygon, or animate the facial details separately from the orb's coordinate space.

Closed ears and the reduced `<` bracket render behind the circular side module,
which sits below the ears and behind the main orb. The bracket closes underneath
the module's opaque fill, preserving the approved visible contour without exposed
endpoints. The eye and mouth intentionally remain clipped open strokes.
Each component instance receives a unique clip ID so both variants can coexist.

### Theme tokens

All palette values live in `src/styles/global.css`:

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#EEE5E9` | `#252B29` |
| `--foreground` | `#383D3B` | `#EEE5E9` |
| `--accent` | `#0B6972` | `#52DEE5` |
| `--brand-ice` (ear shading) | `#92DCE5` | `#92DCE5` |

The mark consumes these shared tokens; facial strokes use the background color.
Existing `color-scheme`, `light-dark()` and `data-theme` rules resolve System,
Light and Dark immediately. Keep pre-paint initialization and storage behavior
in `src/scripts/theme.js` unchanged. No component JavaScript detects theme state.

### Animation and accessibility

The letter fades over 180ms; the dot translates and uniformly enlarges over 560ms
with the approved restrained easing. Rear geometry begins after 80ms; the outline
and facial details appear last, completing at 570ms. Closing smoothly reverses
from the current interpolated values, with no opening delays. Reduced motion
removes all transitions while retaining every interaction.

Mouse entry reveals; exit restores the monogram unless keyboard focus remains.
Keyboard focus reveals; native Enter and Space activation toggle. Touch taps
toggle without synthetic hover. An outside pointer press or focus leaving closes;
Escape closes even while hovered and never removes keyboard focus. Re-entry or
activation can reveal again. The localized, stable button name and `aria-pressed`
describe the current reveal state, including hover and focus. The decorative SVG
is hidden from assistive technology. Visible focus remains available when closed.
Without JavaScript, a disabled button preserves the static monogram and dimensions.

### Reuse

```astro
---
import HiddenMarkEasterEgg from '../components/HiddenMarkEasterEgg.astro';
---
<HiddenMarkEasterEgg variant="footer" locale="en" />
<HiddenMarkEasterEgg variant="404" size={180} locale="de" />
```

`variant` is required; `size` defaults to 52 or 180 CSS pixels. `locale` defaults
to German. Pass the shared layout's locale to its footer. Current use is limited
to the shared footer and existing 404 page; do not introduce additional placements
without a deliberate content decision. No framework, dependency or runtime
network request is required.
