import rss from '@astrojs/rss';
import { blogPaths, labels, type Locale } from '../i18n';
import { getPublishedPosts } from './blog';

export async function createBlogFeed(locale: Locale, site: URL | undefined) {
  if (!site) throw new Error('Set site in astro.config.mjs to generate canonical RSS URLs.');
  const posts = await getPublishedPosts(locale);
  return rss({
    title: `${labels[locale].blog} — neeklass`,
    description: labels[locale].blogDescription,
    site: new URL(blogPaths[locale], site),
    customData: `<language>${locale}</language>`,
    items: posts.map(({ data, url }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.publishedAt,
      categories: data.tags,
      link: new URL(url, site).href,
    })),
  });
}
