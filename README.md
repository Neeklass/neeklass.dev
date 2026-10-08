# neeklass.dev

Niklas Dittmann’s personal technical home. A bilingual, static Astro site built with
TypeScript and plain CSS. A small inline script handles appearance preferences;
there are no external fonts or analytics. Light and dark themes default to the
visitor’s system preference.
German is the default at `/`; the English homepage is at `/en/`.

Both homepages intentionally contain only `Niklas Dittmann` in a single `h1`
inside `main`, with generous whitespace and the shared navigation and footer.
Do not add positioning copy, portfolio sections, project placeholders, experience
placeholders or biography until real content and a deliberate content decision
exist. The site should gain substance through genuine writing and real work;
the blog is ready for that content but temporarily hidden from the shared UI.
Homepage metadata remains neutral and locale-aware.

## Architecture

**One personal website, one Astro app, one deployment, multiple areas.**

`https://neeklass.dev` is canonical. This is intentionally one Git repository,
one Astro application, one static build, one shared design and locale system,
and one GitHub Pages deployment. Blog, projects, about and CV are sections of
the same site. Do not split them into separate applications or deployments
without an explicit future architecture decision. No monorepo, workspaces,
server, CMS, database or hosting migration is needed.

| Area | German | English | Status |
| --- | --- | --- | --- |
| Home | `/` | `/en/` | Implemented |
| Blog | `/blog/` | `/en/blog/` | Implemented; temporarily hidden from shared UI |
| Article | `/blog/[slug]/` | `/en/blog/[slug]/` | Generated from Markdown |
| RSS | `/blog/rss.xml` | `/en/blog/rss.xml` | Implemented |
| Projects | `/projects/`, `/projects/[slug]/` | `/en/projects/`, `/en/projects/[slug]/` | Planned |
| About | `/about/` | `/en/about/` | Planned |
| CV | `/cv/` | `/en/cv/` | Planned |

Directory routes use trailing slashes, matching the static HTML generated for
GitHub Pages. Only implemented destinations appear in navigation. The blog has
an honest empty state until real articles are published; test drafts are hidden.

`BLOG_VISIBLE` in `src/lib/features.ts` is currently `false`. Set it to `true`
and rebuild when real articles are published to restore the header Blog link,
footer RSS icon and RSS autodiscovery. Routes, article generation, translations,
draft handling and feeds remain intact and directly accessible in either state.

`blog.neeklass.dev` and `cv.neeklass.dev` may someday be vanity redirects to
`/blog/` and `/cv/`. They are not required sites or deployments. No redirects or
DNS changes are configured by this implementation.

## Local development

Use Node.js 24 (also specified in `.nvmrc`) and npm.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build runs Astro’s TypeScript checks before generating `dist/`. Run
`npm run check` for checks alone. The lockfile is tracked; CI uses `npm ci`.
The footer year is generated at build time, so rebuild to update it each year.

`npm run test:blog` builds an isolated temporary copy with synthetic content and
verifies published routes, different translation slugs, missing/draft counterparts,
feed languages and escaping, ordering, duplicate translation keys, default drafts,
and exclusion of draft pages and images. It leaves real content and `dist/` alone.

## Project structure

```text
.github/workflows/deploy.yml  GitHub Pages build and deployment
public/                      Favicon, robots.txt and domain declaration
src/content.config.ts        Markdown blog schema and loader
src/content/blog/{de,en}/    Language-specific article folders with index.md
src/components/BlogIndex.astro Shared index presentation
src/i18n/                    Shared UI labels, locale types and section paths
src/lib/blog.ts              Published-post queries, route and translation resolution
src/lib/rss.ts               Shared static feed generation
src/lib/features.ts          Blog visibility in the shared UI
src/layouts/BaseLayout.astro  Document metadata and shared page shell
src/layouts/ArticleLayout.astro Article metadata and Markdown body
src/pages/index.astro        German homepage content
src/pages/en/index.astro     English homepage content
src/pages/404.astro          Bilingual GitHub Pages error page
src/pages/{blog,en/blog}/    Blog indexes, article routes and RSS endpoints
src/styles/global.css       Tokens, layout and light/dark/system themes
src/styles/blog.css          Reading layout, Markdown and code styles
astro.config.mjs             Static output and production URL
```

Add routes in `src/pages/` when there is real content. Keep route names English:
`/projects`, `/about`, `/en/projects`, `/en/about`. Extract components when they
become reusable. The blog uses [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
and the built-in glob loader. Markdown and syntax highlighting are built in;
MDX is not installed. The only added dependency is
[`@astrojs/rss`](https://docs.astro.build/en/recipes/rss/) for static, correctly
escaped RSS XML. The blog itself requires no client-side scripts.

## Shared UI and appearance

The header contains the brand, available internal destinations as text, `DE EN`,
and a small appearance button. Language links use `Deutsch` / `English` accessible
names, no flags, and link only to existing counterparts. Future destinations are
added only when their pages contain real content. Small screens use wrapping.

The appearance button cycles **System → Light → Dark → System** (German:
**System → Hell → Dunkel**). Its translated accessible name and tooltip state
the current mode and next action; changes are also announced by a status region.
It supports keyboard activation with Enter or Space and a visible focus outline.

`src/scripts/theme.js` is the only client-side script. It runs inline in the head
to apply `data-theme` before first paint, then connects the control when the DOM
is ready. Manual `light` / `dark` choices use the `neeklass-theme` localStorage
key. Choosing System removes the key. System mode follows OS/browser changes
immediately through CSS, including code highlighting. Other open tabs synchronize
saved preferences. Invalid or inaccessible storage falls back to System; if
saving is blocked, switching still works for the current page. Without JavaScript,
the control stays hidden and CSS continues to follow the system preference.

The unchanged warm/green palette is centralized in `src/styles/global.css` using
[`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
and `color-scheme`. Syntax highlighting follows the same selected scheme.
No theme library, animation, network request or framework is involved.

Use text for primary navigation and icons only for utilities or external profiles.
GitHub and email (`mailto:mail@neeklass.dev`) are inline SVG footer links with
accessible labels, tooltips, `currentColor`, visible focus and 44px hit areas.
The current language's RSS icon appears after email when `BLOG_VISIBLE` is enabled.
Their small local components live in `src/components/icons/`. No icon library
is installed. Reuse `.editorial-meta` for quiet monospace metadata and use rules,
spacing and typography for hierarchy rather than cards or decorative elements.

## Locale conventions

Every page supplies `locale`, `title` and `description` to `BaseLayout`. Editorial
content stays in its language-specific page or Markdown file; `src/i18n/de.ts`
and `en.ts` contain shared interface labels only.

Supply `translations` as explicit paths to existing versions of the same page,
for example `{ de: '/projects/example/', en: '/en/projects/example/' }`. This
drives both the language switch and absolute `hreflang` URLs. The current page
always includes a self-reference. Omit unavailable translations; the switch must
never invent a counterpart or silently send readers to an unrelated homepage.
Blog posts resolve these paths through a shared `translationKey`, allowing
different article slugs in each language.

The layout sets document language, canonical URL, Open Graph locale and alternate
locales. `x-default` points to the German counterpart when one exists. Canonical
and alternate URLs use the configured production `site`, including in local
previews. The brand returns to the current language’s homepage; the footer links
to GitHub, email and, when enabled, the current language’s RSS feed.
Language selection uses ordinary HTML links without cookies, JavaScript,
automatic translation or browser-language redirects.

## Writing and publishing

Start with [the German article template](templates/blog/de.md) or
[the English article template](templates/blog/en.md). These files live outside
the content collection and are never built or published.

1. Create a new folder such as `src/content/blog/de/mein-artikel/` and copy
   `templates/blog/de.md` into it as `index.md`.
2. Replace the title, description, publication date and `translationKey`.
   Choose a unique, stable key such as `my-article`; retain `draft: true`.
3. Replace the writing prompts with your text. Rename or remove sections to
   suit the article; the outline is a suggestion, not a required format.
4. Run `npm run dev` and open `/blog/mein-artikel/` on the local URL printed
   by Astro. Drafts are reachable directly, not through the blog index.
5. For a translation, copy `templates/blog/en.md` into
   `src/content/blog/en/my-article/index.md`, write the actual English version,
   and use the same `translationKey`. Preview it at `/en/blog/my-article/`.

Keep images beside `index.md`. Use fenced code blocks with a language identifier
for syntax highlighting. When revising an already published post, optionally add
`updatedAt: YYYY-MM-DD` using a date on or after `publishedAt`.

The minimal file format is shown below; the rest of this section covers images,
drafts, publication and RSS.

Create a German post at `src/content/blog/de/mein-artikel/index.md`:

```markdown
---
title: "Titel des Artikels"
description: "Eine kurze Zusammenfassung."
publishedAt: 2026-10-07
tags:
  - software
draft: true
translationKey: my-article
---

Hier beginnt der eigene Text.

## Ein Abschnitt

Weitere Inhalte.
```

Use the actual publication date when publishing. Optional `updatedAt` uses the
same date format and appears only when later than `publishedAt`. Dates display
in the page language with a fixed UTC timezone. `tags` is optional. Omitting
`draft` defaults to `true`, so a new file cannot publish accidentally. The title,
description, publication date and translation key are required. Begin body
headings at `##`; the layout supplies the page's `h1`.

The folder name becomes the URL slug. Use lowercase ASCII words separated by
hyphens (for example, `mein-artikel`); no `slug` or `locale` frontmatter is needed.
Only `de/<slug>/index.md` and `en/<slug>/index.md` are accepted.

For an English translation, create `src/content/blog/en/my-article/index.md`
with actual English content and metadata, retaining `translationKey: my-article`.
The two folders may have different names. A translation key must be unique within
each language; duplicate keys fail validation when querying the collection.
Translations publish independently. Production language links and `hreflang`
include only published counterparts. An untranslated English article has no
German alternate or `x-default`; it never links to an unrelated homepage.

Run `npm run dev`, then open the direct draft URL `/blog/mein-artikel/` or
`/en/blog/my-article/`. Drafts have a visible notice and `noindex` metadata. They
never appear on blog indexes or in RSS, even during development. Production
loading removes drafts before collecting Markdown modules and image assets;
article routes also filter drafts. `npm run preview` previews production output
and therefore cannot display drafts.

Two clearly marked test drafts are included to exercise formatting, translations,
code, tables and images:

- `/blog/beispiel-entwurf/`
- `/en/blog/example-draft/`

Keep these fixtures unpublished. Create a separate folder for real writing.

To publish your own article, set `draft: false`, check its publication date,
run `npm run check` and `npm run build`, then review with `npm run preview`.
Commit and push when ready; the existing GitHub Actions workflow deploys it.
There is no scheduled publishing: `publishedAt` sorts articles, while `draft`
controls visibility. An English translation is optional.

### Images and code

Place article images next to `index.md` and use normal Markdown with useful alt
text: `![Beschreibung des Diagramms](./diagram.png)`. Astro handles local image
processing; generated images fit the reading column. SVG diagrams work too.
Translations can share an image using a relative path, as the example draft
does. Keep draft-only assets alongside content rather than in `public/`, which
is always copied to the production build. Hero images are not required.

Use fenced code blocks with a language identifier, such as `ts`, `python` or
`sh`. Astro's built-in Shiki produces static highlighting for system light/dark
themes. Long code lines scroll inside keyboard-focusable code blocks.

Reading time appears on articles and index entries as `N Min. Lesezeit` / `N min
read`. The local `src/lib/reading-time.ts` helper estimates 200 words per minute,
rounded up to at least one minute, at build time (on demand in development).
Comments, fenced code, images, HTML tags and inline link targets are omitted.
This is an approximate prose reading time, not an estimate of time to study code
or diagrams. There is no extra metadata, package or browser computation.

### RSS and homepage integration

- German: `https://neeklass.dev/blog/rss.xml`
- English: `https://neeklass.dev/en/blog/rss.xml`

Each feed contains only published posts in its language, with absolute canonical
article URLs, titles, descriptions, dates and tags. Feeds intentionally contain
summaries rather than full HTML bodies. They remain valid when empty. Each blog
index links to its feed; document heads expose RSS autodiscovery only when
`BLOG_VISIBLE` is enabled.

`getPublishedPosts(locale)` from `src/lib/blog.ts` returns newest-first posts with
resolved `locale`, `slug` and `url`, excluding drafts in all environments. It can
support future writing sections if deliberately requested. The homepage currently
shows only the name; do not add excerpts or placeholders automatically.

## Incremental roadmap

The bilingual foundation and blog/RSS are implemented. The homepage is
intentionally limited to the name; Blog is hidden from shared navigation until
real articles are published.

1. Keep the homepage minimal. Add content or areas only when real material and
   a deliberate content decision exist; expose navigation when destinations are
   available.
2. Add real technical writing to the existing blog collection as it is ready.
3. Add a project collection at `/projects/` and `/en/projects/`, an overview and
   case studies explaining problems,
   architecture, decisions, trade-offs and lessons with source links and useful
   diagrams/screenshots.
4. Build `/cv/` and `/en/cv/` in this same app with structured German/English data
   (for example `src/data/cv/de.ts` and `en.ts`), a living web CV, print CSS and a
   PDF workflow derived from the same content where practical.
5. Review accessibility and performance; add sitemap and structured metadata
   when the content exists. Add `/lab` or `/now` only when there is real material.

All areas share one identity, design system, locale system and static output.

## Deployment

Pushing to `main` automatically checks, builds and deploys `dist/` with official
GitHub Actions. You can also run **Deploy to GitHub Pages** manually from the
Actions tab on `main`. Deployment uses the `github-pages` environment and a
Pages artifact, without a `gh-pages` branch. Deployments are serialized.

`src/pages/404.astro` produces `dist/404.html`, the single custom error page used
by GitHub Pages for missing URLs. It reuses the shared layout, shows concise German
and English text with a link to `/`, and includes `noindex` metadata. It uses no
locale detection or additional JavaScript and is not linked from normal navigation.

### In this repository

`astro.config.mjs` sets `https://neeklass.dev` as the production URL with no
repository base path. Assets use root paths. `public/CNAME` declares the domain
for portability; GitHub Actions deployments do not use this file to configure
the custom domain. Set the domain in GitHub settings as described below.

### In GitHub repository settings

1. Open **Settings → Pages → Build and deployment** and select **GitHub Actions**
   as the **Source**. Do not select a branch-based source.
2. Under **Custom domain**, enter `neeklass.dev` and save. Configure this before
   pointing DNS at GitHub Pages.
3. Ensure Actions are enabled and any `github-pages` environment protection rules
   allow deployment from `main`. Push to `main` or run the workflow.
4. After DNS verification and certificate provisioning, enable **Enforce HTTPS**
   in **Settings → Pages**. The option may take time to become available.

### At your registrar / DNS provider

For the apex domain (`@` / `neeklass.dev`), add **A** records using **all current
GitHub Pages IPv4 addresses** from [GitHub’s official custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
For IPv6, also add the documented **AAAA** records. Obtain and verify the current
values there; this repository intentionally does not hardcode IP addresses.
If supported by your provider, an **ALIAS** or **ANAME** record pointing to
`Neeklass.github.io` is an alternative to A/AAAA records. This target follows the
current repository owner (`Neeklass`); update it if the repository is transferred.

Optionally configure `www` with a **CNAME** to `Neeklass.github.io`;
GitHub can redirect it to the configured apex domain. Avoid wildcard records
and remove conflicting website records for these hosts, preserving unrelated
mail and verification records. Allow DNS propagation before checking HTTPS.
You can also [verify domain ownership with GitHub’s TXT record](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
in your account or organization Pages settings.
