import de from './de';
import en from './en';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export type PageTranslations = Partial<Record<Locale, string>>;

export const labels = { de, en };
export const homePaths = { de: '/', en: '/en/' } as const;
export const blogPaths = { de: '/blog/', en: '/en/blog/' } as const;
export const languageNames = { de: 'Deutsch', en: 'English' } as const;
export const openGraphLocales = { de: 'de_DE', en: 'en_US' } as const;
