import { getCollection, type CollectionEntry } from 'astro:content';
import { blogPaths, type Locale, type PageTranslations } from '../i18n';

export type BlogPost = CollectionEntry<'blog'> & {
  locale: Locale;
  slug: string;
  url: string;
};

async function getPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blog');
  const translationKeys = new Set<string>();
  const posts = entries.map((entry) => {
    const [locale, slug] = entry.id.split('/') as [Locale, string];
    const key = `${locale}:${entry.data.translationKey}`;
    if (translationKeys.has(key)) {
      throw new Error(`Duplicate blog translationKey in ${locale}: ${entry.data.translationKey}`);
    }
    translationKeys.add(key);
    return { ...entry, locale, slug, url: `${blogPaths[locale]}${slug}/` };
  });
  return posts.sort((a, b) =>
    b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id),
  );
}

// All public listings, feeds and future homepage excerpts use this query.
export async function getPublishedPosts(locale: Locale): Promise<BlogPost[]> {
  return (await getPosts()).filter((post) => post.locale === locale && !post.data.draft);
}

export async function getBlogStaticPaths(locale: Locale) {
  const posts = (await getPosts()).filter((post) => import.meta.env.DEV || !post.data.draft);
  return posts.filter((post) => post.locale === locale).map((post) => {
    const translations: PageTranslations = {};
    for (const counterpart of posts) {
      if (counterpart.data.translationKey === post.data.translationKey) {
        translations[counterpart.locale] = counterpart.url;
      }
    }
    return { params: { slug: post.slug }, props: { post, translations } };
  });
}

export function formatPostDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}
