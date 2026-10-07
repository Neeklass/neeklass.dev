import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const markdownLoader = glob({
  base: './src/content/blog',
  pattern: '**/index.md',
  generateId: ({ entry }) => {
    const id = entry.replaceAll('\\', '/').replace(/\/index\.md$/, '');
    if (!/^(de|en)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      throw new Error(`Invalid blog path: ${entry}. Use de|en/lowercase-slug/index.md.`);
    }
    return id;
  },
});

const blog = defineCollection({
  loader: {
    ...markdownLoader,
    async load(context) {
      await markdownLoader.load(context);
      // Remove drafts before Astro collects asset/module imports for the build.
      if (import.meta.env.PROD) {
        for (const [id, entry] of context.store.entries()) {
          if (entry.data.draft) context.store.delete(id);
        }
      }
    },
  },
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    draft: z.boolean().default(true),
    translationKey: z.string().trim().min(1),
  }).refine(
    (post) => !post.updatedAt || post.updatedAt >= post.publishedAt,
    { message: 'updatedAt must not precede publishedAt', path: ['updatedAt'] },
  ),
});

export const collections = { blog };
