import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://neeklass.dev',
  output: 'static',
  vite: {
    css: {
      // Keep parent-directory PostCSS configurations out of this standalone site.
      postcss: { plugins: [] },
    },
  },
});
