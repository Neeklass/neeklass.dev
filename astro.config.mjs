import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://neeklass.dev',
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [{
        pre(node) {
          // Make horizontally scrollable code blocks reachable by keyboard.
          node.properties.tabindex = 0;
        },
      }],
    },
  },
  vite: {
    css: {
      // Keep parent-directory PostCSS configurations out of this standalone site.
      postcss: { plugins: [] },
    },
  },
});
