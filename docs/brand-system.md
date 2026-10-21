# neeklass Brand & Design System

Version 2.0 (October 2026). The single source of truth for how neeklass.dev
looks and behaves. It replaces version 1.0. Content rules (what goes where,
when a project is ready, how texts are structured) live in
[the content guide](content-guide.md).

## How to use this document

Work through it in this order whenever something visible changes:

1. **Find a component.** Check [Components](#components). If one fits, use it
   unchanged, even if it is not a perfect match.
2. **Run the checklist.** If nothing fits, answer the
   [decision checklist](#decision-checklist). Most new ideas end here.
3. **Extend the system first.** If a new component or token is really needed,
   add it to this document, then implement it. Never the other way round.

Precedence: Niklas's explicit decision > this document > existing code >
general taste. Public copy (German and English) is written by Niklas. Tools
may propose structure and use `[placeholders]`, but never write final copy.

## Principles

These six rules decide every case the rest of the document does not cover.

1. **Content sets the structure.** Headings, numbers, labels and dates appear
   only when they say something true about the content. A list of two projects
   is not a numbered sequence.
2. **One element, one job.** No decorative duplicates: no section numbers, no
   status dots, no icon next to a text link that already says the same.
3. **Type and space do the work.** Hierarchy comes from typeface, size,
   weight, spacing and thin rules, not from cards, colour fields or shadows.
4. **The dot is the signature.** The teal/cyan dot appears only in the
   wordmark, the monogram, the favicon and the core of the Glyph's ear module.
5. **Quiet by default, personal in one place.** The Protogen Glyph is an easter
   egg (footer, 404). It never appears in the header, a hero or a CV.
6. **Nothing that ages visibly.** No dates on overview pages, no effects tied
   to a design trend, no claims that need constant updating. Exception: the
   blog index and article headers show publication dates, because for writing
   the date is real information.

## Identity elements

| Element | Role | Used in | Never |
| --- | --- | --- | --- |
| Wordmark `neeklass.` | Sender: whose site is this? | Site header, project covers, link previews | As avatar or favicon (too wide) |
| Monogram `n.` | Short form of the wordmark | Favicon; resting state of the Glyph | Next to the wordmark |
| Favicon | Recognise the tab | Browser tabs, bookmarks | Any other mark than the monogram |
| Glyph (Protogen) | Persona, easter egg | Footer (52 px), 404 (180 px), community avatars | Header, hero, navigation, CV, LinkedIn |

### Wordmark and monogram

- Vector outlines derived from **Epunda Slab Regular (400)** with the `ss01`
  single-storey *a*. Canonical files: `public/brand/wordmark-{light,dark}.svg`,
  `monogram-{light,dark}.svg`. Use the files; never type the wordmark in a web
  font.
- Light artwork: Graphite letters, Dark Teal dot. Dark artwork: Pearl letters,
  Cyan dot.
- Do not stretch, outline, animate, add gradients, glow or shadow. Keep quiet
  space around the mark. Monochrome versions may be derived for one-colour use.
- The wordmark has no hover effect and no alias text. The name connection is
  explained once in the homepage copy instead.

### Favicon

- The monogram on a rounded square: Pearl `n`, Cyan dot, ground `#252B29`.
- Needs a dedicated 16 px drawing: slightly heavier `n`, larger dot, and a thin
  light outline on the tile so it stays visible on dark browser tab bars.
  Larger sizes use the regular artwork.

### Glyph (Protogen)

A geometric Protogen in profile, facing right: dark visor with a happy LED
face, lynx-like ears, round ear module with a backward spike. Built as solid
shapes without outlines; parts are separated by a background-coloured gap.

Construction (viewBox `0 0 480 480`, glyph coordinates):

| Part | Geometry | Fill |
| --- | --- | --- |
| Back ear | `M262 186 L304 40 L346 196 Z`, 10 px round-join stroke in the same colour | `--glyph-ink` |
| Front ear | `M162 250 L130 44 L252 202 Z`, same stroke | `--glyph-ink` |
| Visor | circle `cx 292, cy 282, r 112` | `--glyph-visor` (dark theme adds a 6 px `--glyph-rim` stroke) |
| Spike | `M134 254 L82 282 L134 310 Z`, 12 px gap stroke | `--glyph-ink` |
| Ear module | circle `cx 172, cy 282, r 46`, 12 px gap stroke | `--glyph-ink` |
| Module core (the dot) | circle `cx 172, cy 282, r 22` | `--accent` |
| Eye | `M282 252 Q304 222 328 250`, 18 px round stroke | `--glyph-led` |
| Mouth | `M306 334 L322 322 L338 334 L354 322 L370 334 Q386 334 398 316`, 11 px, miter joins | `--glyph-led` |

Eye and mouth are clipped to the visor (circle radius 109). The "gap stroke"
uses the colour of the surface behind the glyph.

Resting state: the monogram `n.` (letter path from the monogram, placed with
`translate(80 385) scale(.6)`; dot at `cx 405, cy 367, r 24`).

**Animation (open):**

| Start | Duration | What happens |
| --- | --- | --- |
| 0 ms | 180 ms | `n` fades out |
| 0 ms | 560 ms | The dot moves to the ear module and becomes its core |
| 200 ms | 360 ms | Module ring scales up from the dot, slight overshoot |
| 240 ms | 480 ms | Visor grows forward out of the module, slight overshoot |
| 300 ms | 300 ms | Spike extends backwards |
| 380 ms | 380 ms | Ears rise behind the visor |
| 640 ms | 200 ms | Face lights up (opacity and vertical scale, like a blink) |

Easing: `cubic-bezier(.25,.72,.2,1)` for movement,
`cubic-bezier(.3,1.25,.5,1)` for the two overshoots. Closing: everything
returns at once in 240 ms. With `prefers-reduced-motion: reduce` there is no
transition; the interaction stays the same. The animation never changes page
layout.

Interaction: mouse hover opens and leaving closes (unless keyboard focus
remains). Keyboard focus opens; Enter and Space toggle; Escape closes without
moving focus. Touch taps toggle. An outside press closes. The element is a
`<button>` with a stable localised name and `aria-pressed`; the SVG is hidden
from assistive technology. Without JavaScript the static monogram is shown.

Sizes: 52 px in the footer, 180 px on the 404 page, no frame on the website.
Community avatars use the open glyph inside a round frame (same stroke weight
as the module gap), because platforms crop avatars round.

## Tokens

All values live in `src/styles/global.css`. Do not introduce colours, fonts,
sizes, radii or shadows outside this list.

### Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#EEE5E9` Pearl | `#252B29` | Page ground |
| `--surface` | `#F8F5F6` | `#383D3B` | Code blocks, figure backgrounds |
| `--foreground` | `#383D3B` Graphite | `#EEE5E9` | Text, strong rules |
| `--muted` | `#56625D` | `#B5BEB9` | Metadata, captions, secondary text |
| `--border` | `#CEC5CA` | `#515A56` | Thin rules |
| `--accent` | `#0B6972` Dark Teal | `#52DEE5` Cyan | Links, focus, the dot |
| `--glyph-ink` | `--foreground` | `--foreground` | Glyph ears, module, spike |
| `--glyph-visor` | `#1B201F` | `#121615` | Glyph visor |
| `--glyph-led` | `#52DEE5` | `#52DEE5` | Glyph face |
| `--glyph-rim` | none | `#4A524F` | Glyph visor edge in dark theme |

Ice `#92DCE5`, Apricot `#E6A76B` and Lavender `#B5A0D2` are reserved for
diagrams, where they distinguish different concepts. Cyan on Pearl fails text
contrast; use Dark Teal for text and interactive elements in the light theme.

### Typography

| Role | Typeface | Size / line height | Used for |
| --- | --- | --- | --- |
| Display | Literata 500, tracking −0.02em | `clamp(2.25rem, 5vw, 3.5rem)` / 1.15 | Page title (`h1`) |
| Section | Literata 500 | `clamp(1.5rem, 3vw, 2rem)` / 1.3 | `h2` |
| Subsection | Literata 500 | `1.25rem` / 1.4 | `h3` |
| Lead | Literata 400 | `clamp(1.1875rem, 2.2vw, 1.375rem)` / 1.6 | First paragraph under a title |
| Reading | Literata 400 | `1.125rem` / 1.75 | All long-form text: project pages, articles |
| Interface | Familjen Grotesk 400/600 | `0.9375rem` / 1.6 | Navigation, list descriptions, tables, buttons, footer |
| Small | Familjen Grotesk 400 | `0.875rem` / 1.6, `--muted` | Metadata, captions, dates |
| Code | IBM Plex Mono 400 | `0.875em` / 1.7 | Code, commands, file names, literal values |

Rules: two text families on a page (Literata and Familjen Grotesk); Mono only
for code. No uppercase labels with letter-spacing. Sentence case for headings
and labels. Long-form text has a measure of at most `40rem`.

### Space, lines, shape

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | `0.5rem` | Inside a component |
| `--space-2` | `1rem` | Between related lines |
| `--space-3` | `1.5rem` | Between paragraphs and list items |
| `--space-4` | `2rem` | Between blocks inside a section |
| `--space-6` | `3rem` | Before a figure or new subsection |
| `--space-8` | `clamp(3rem, 7vw, 5rem)` | Between page sections |
| `--content-width` | `66rem` | Site shell |
| `--reading-width` | `40rem` | Text column |
| `--figure-width` | `52rem` | Figures and diagrams |
| Rule | `1px solid var(--border)` | Separating items and sections |
| Strong rule | `1px solid var(--foreground)` | Top of a list (homepage project list) |
| Radius | `4px` | Code blocks and controls only |

No shadows, gradients, blur or glass. Focus: `2px solid var(--accent)` with
`outline-offset: 3px`.

### Motion

Only two kinds: colour changes on hover (150 ms) and the Glyph. Nothing moves
on scroll or page load.

## Components

Each component lists what is fixed and what varies. Fixed parts are not
adjusted per page.

### Site header

- Fixed: wordmark left; text navigation and language switch right; theme
  control as an icon button; one thin rule below.
- Navigation: `Projekte` / `Projects`; `Blog` only once at least one article is
  published. At most three items.
- Language switch: `DE EN` in Interface type, current language in 600 weight.
- Never: icons in the navigation, numbered items, a hover alias on the
  wordmark.

### Site footer

- Fixed: left the Glyph followed by `© {year} Niklas Dittmann`; right the
  contact links as plain text: `GitHub · LinkedIn · mail@neeklass.dev`
  (plus `RSS` while the blog is visible). One thin rule above.
- The e-mail address is written out so it can be copied.
- External links carry no arrow or icon. The Glyph sits with the signature,
  not in the link row, so it is not read as one of the links.

### Homepage intro

- `h1` with the full name, then the intro text in Lead type (Niklas's copy,
  roughly 80–120 words), then one short line in Small type explaining the name
  `neeklass`.
- No portrait, no positioning slogan, no list of skills.

### Project list (homepage)

- Strong rule on top with a plain heading (`Ausgewählte Projekte`).
- Each item: title in Literata (Section size on the homepage), one sentence in
  Interface type. Add a short role note only when it differs from "own
  project", for example `Ehrenamtlich im Team`.
- No dates, no status, no tags, no thumbnails. Up to four items; with more,
  show four and link to the project index.

### Project index item

- Like the homepage item, plus one Small line: `Zeitraum · Rolle · Themen`.

### Project header

- Back link, `h1`, Lead paragraph stating the problem.
- Facts as a definition list in Small type: `Zeitraum`, `Rolle`, `Technik`.
- Links in one line: `Projekt öffnen · Quellcode · Dokumentation` (only those
  that exist). Availability is shown by these links, never by a status word.

### Project section

- `h2` in Literata, body in Reading type, separated by a thin rule and
  `--space-8`.
- Standard order: Problem → Ansatz → Entscheidungen → Grenzen → Was ich
  gelernt habe → Wie es weitergeht (optional). See the content guide.
- No eyebrow labels, no numbers in front of headings.

### Figure

- Image or diagram, then a caption in Small type:
  `Abb. 1  Short title. One or two sentences of explanation.`
  (`Fig. 1` in English). Numbering per page.
- Screenshots stay unaltered; never crop away source notes. Diagrams provide
  light and dark variants and a full-size link.

### Diagram

- Explain a real mechanism; label things in the page's language, in sentence
  case, in Interface type. No numbered tiers, no uppercase labels, no
  branding text inside the diagram.
- Thin strokes, one accent for the thing that matters (for example the live
  connection), Ice/Apricot/Lavender only to separate different concepts.
- Must be readable at 360 px width or offer horizontal scrolling plus a
  full-size link.

### Code block

- Surface background, thin border, 4 px radius, Code type, horizontal scroll.
- Optional caption naming the file path.

### Sources and licences

- A `<details>` element titled `Quellen und Lizenzen` at the end of a project
  page. Complete, but collapsed.

### Update note

- `Beschreibung aktualisiert: {Monat Jahr}` in Small type at the end of a
  project page, only while the project is still being worked on. No dates on
  the homepage or the project index.

### Article header

- Back link, `h1`, Lead, then one Small line:
  `{Datum} · {n} Min. Lesezeit · Projekt: {Name}` (project only when related;
  `Aktualisiert {Datum}` when updated).

### Links and emphasis

- Inline links: `--accent`, underlined. No arrows or icons for external links.
- A caveat inside running text is a sentence with a bold lead-in, not a
  coloured box.

### 404 page

- Glyph at 180 px, no frame, beside the bilingual message and a link home.

## Decision checklist

Answer before adding anything visible. One "no" at steps 2–6 means: do not add
it in that form.

1. Is there already a component for it? Then use that one.
2. Does it work with existing tokens only (no new colour, font, size, radius,
   shadow)?
3. If it adds a label, number, icon, badge or date: would a reader lose real
   information without it?
4. If you removed it, would the page get worse?
5. Is it readable at 360 px width, in dark mode and with the keyboard?
6. Would it still look appropriate in five years?

## Never

- Numbered labels (`01 /`, `02 —`), `FIG.`, uppercase micro-labels.
- Status dots or badges, progress bars, "currently building" banners.
- Cards with shadows, bento grids, gradients, glass, glow, neon.
- Terminal mock-ups, typewriter effects, cursor effects, scroll animations.
- Icons for primary navigation; icon rows of social logos.
- The Protogen in the header, a hero, the favicon or application documents.
- Invented content: projects, numbers, testimonials or skill levels.

## Page recipes

| Page | Components, in order |
| --- | --- |
| Home | Header · Homepage intro · Project list · Footer |
| Projects | Header · `h1` · Project index items · Footer |
| Project | Header · Project header · Project sections (with figures, code) · Sources · Update note · Footer |
| Blog index | Header · `h1` · list of articles (title, one sentence, date in Small type) · Footer |
| Article | Header · Article header · Reading text · back link · Footer |
| 404 | Header · 404 content · Footer |

## Implementation status

| Rule | Status |
| --- | --- |
| Palette and theme switching | Implemented |
| Literata for all long-form text | Implemented |
| Remove `01 —` labels and `FIG.` | Implemented on pages and `ProjectFigure`; diagram SVGs: to change |
| Language switch and metadata in Interface type instead of Mono | Implemented |
| Wordmark without hover alias | Implemented |
| Footer with text links and Glyph as signature | Implemented; LinkedIn link waiting for the profile URL |
| Glyph replaces the v8 Hidden Signature | Implemented; v8 component removed |
| Favicon 16 px drawing and dark-tab outline | To design |
| Homepage intro and project list | Waiting for copy |
| Project header with Zeitraum, Rolle, Technik | To implement |
