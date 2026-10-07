# Repository guidance

Build a durable personal technical home for Niklas Dittmann (`neeklass`).
Let genuine writing and real work provide its substance.

- The homepage is intentionally minimal: its main content is only the name
  `Niklas Dittmann` in one `h1`, in both languages. Do not add positioning copy,
  portfolio sections, project placeholders, experience placeholders or biography
  until real content and a deliberate content decision exist. Preserve functional
  site chrome and neutral locale-aware metadata.

- `neeklass.dev` is intentionally a single Astro application. Blog, projects,
  about and CV are sections of the same site. Do not split them into separate
  applications or deployments without an explicit future architecture decision.
- Keep one repository, one static build and one GitHub Pages deployment. Blog
  lives at `/blog` and `/en/blog`; the future CV lives at `/cv` and `/en/cv`.
  Do not configure subdomain redirects or DNS as part of application work.
- Use English for source code, identifiers, comments and technical documentation.
- German is the default public language. English pages live under `/en`.
- Keep route names English (`/projects`, `/about`). Link real translations
  explicitly; never redirect based on browser language or translate at runtime.
- Preserve the minimal editorial design, system fonts and system light/dark theme.
- Keep the visual language restrained and editorial. Use text for primary
  navigation and icons only for utilities or external profiles. Avoid generic
  AI/SaaS aesthetics, excessive cards, gradients, glass effects, terminal
  simulations and unnecessary animation.
- Keep palette values in the shared CSS. Appearance defaults to System; manual
  Light/Dark choices persist locally. The theme control is the only client-side
  script. Maintain its pre-paint initialization and no-JavaScript system fallback.
- Keep Astro, TypeScript, plain CSS and static output. Prefer HTML and avoid
  client-side JavaScript unless it provides meaningful functionality.
- Do not add a frontend framework, CMS, database or dependencies without a
  concrete technical reason. Extract components only when they are reusable.
- Keep blog posts in Astro Content Collections as Markdown, with optional nearby
  images. MDX needs a real component or interaction use case.
- Link blog translations through `translationKey`. Use the shared published-post
  query for listings, RSS and future homepage writing sections. Drafts may render
  by direct URL in development, but must never appear in listings, feeds or the
  production build. Keep implementation examples marked as drafts.
- Keep editorial translations as actual content, separate from shared UI labels.
- Never invent career details, project evidence, contact information or articles.
  Add routes and navigation destinations only when meaningful content exists.
- Maintain semantic HTML, heading hierarchy, keyboard navigation, visible focus,
  skip links, contrast, alt text, document language and reduced-motion support.
- Keep changes incremental and deployment simple through GitHub Actions/Pages.
  Domain and URL handling must remain portable to other static hosting.
- Run `npm run check` and `npm run build` before completing implementation work.

The README records current scope, locale conventions and the next phases.
