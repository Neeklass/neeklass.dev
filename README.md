# neeklass.dev

Niklas Dittmann’s personal website. A small, static Astro homepage built with
TypeScript and plain CSS. No client-side JavaScript, external fonts or analytics.
Light and dark themes follow the visitor’s system preference.

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

## Project structure

```text
.github/workflows/deploy.yml  GitHub Pages build and deployment
public/                      Favicon, robots.txt and domain declaration
src/layouts/BaseLayout.astro  Document metadata and shared page shell
src/pages/index.astro        Homepage content
src/styles/global.css       Tokens, layout and system-preference themes
astro.config.mjs             Static output and production URL
```

Add routes in `src/pages/` when there is real content for `/blog`, `/projects`,
`/about`, `/cv` or `/lab`. Extract components when they become reusable.
For articles and project descriptions, use portable Markdown files in
`src/content/blog/` and `src/content/projects/`, with schemas and glob loaders in
`src/content.config.ts` using [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/).
Markdown support is built in. Add the official `@astrojs/mdx` integration only
when an article needs MDX. No unused collections or placeholder routes exist in v0.

## Deployment

Pushing to `main` automatically checks, builds and deploys `dist/` with official
GitHub Actions. You can also run **Deploy to GitHub Pages** manually from the
Actions tab on `main`. Deployment uses the `github-pages` environment and a
Pages artifact, without a `gh-pages` branch. Deployments are serialized.

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
