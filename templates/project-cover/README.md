# Reusable project-cover template

The generator creates editable **1200 × 630** SVGs in light and dark mode. It is deliberately separate from live website content and must not imply that a project is deployed.

## Generate

```sh
node scripts/render-project-cover.mjs templates/project-cover/example.json output/project-covers
```

Edit `example.json` or create another configuration with a unique `slug`, real project title, short subtitle, categories, and **four conceptual stages**. The generator requires no npm packages beyond Node.js.

Use `custom_illustration_svg` relative to the configuration file for an original SVG artwork to replace the default diagram. Only use artwork you authored or trust. For portability, the resulting SVG references the canonical logo asset; when exporting it as a standalone file, bundle or inline the wordmark path and load the project's intended fonts.

The template is a **design starting point**, not a generic architecture to reuse for every application. Verify the arrows, stage descriptions and semantics against your actual system. Keep Apricot and Lavender purposeful, not decorative. Inspect generated files at thumbnail size and in both themes before sharing.
