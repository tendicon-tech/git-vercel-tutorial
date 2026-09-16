export const languages = ['de', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'de';

export interface Part {
  /** Teil der Adresse, z. B. "teil-1" → /teil-1/ */
  slug: string;
  number: string;
  label: string;
}

export interface Site {
  /** Adresspräfix dieser Sprache: "" für Deutsch, "/en" für Englisch. */
  base: string;
  /** Datei der Startseite in der Inhaltssammlung, ohne Ordner. */
  home: string;
  /** Beschriftung im Sprachumschalter. */
  name: string;
  parts: Part[];
  ui: {
    wordmark: string;
    navLabel: string;
    langLabel: string;
    tocLabel: string;
    pagerLabel: string;
    prev: string;
    next: string;
    home: string;
    homeLong: string;
    done: string;
    lightbox: string;
    copy: string;
    copied: string;
    copyFailed: string;
    footer: string;
    source: string;
    heroTitle: [string, string];
  };
}

export const sites: Record<Language, Site> = {
  de: {
    base: '',
    home: 'startseite',
    name: 'Deutsch',
    parts: [
      { slug: 'teil-1', number: '01', label: 'Einrichtung' },
      { slug: 'teil-2', number: '02', label: 'Git' },
      { slug: 'teil-3', number: '03', label: 'Astro & Vercel' },
    ],
    ui: {
      wordmark: 'Das KI-Web-Tutorial',
      navLabel: 'Tutorial',
      langLabel: 'Sprache',
      tocLabel: 'Inhalt dieser Seite',
      pagerLabel: 'Weiter und zurück',
      prev: 'Zurück',
      next: 'Weiter',
      home: 'Startseite',
      homeLong: 'Zur Startseite',
      done: 'Geschafft',
      lightbox: 'Vergrößerter Screenshot',
      copy: 'Kopieren',
      copied: 'Kopiert',
      copyFailed: 'Nicht möglich',
      footer: 'Git & Vercel – vom ersten Commit zum Live-Deployment',
      source: 'Quellcode auf GitHub',
      heroTitle: ['Beschreib es.', 'Und es steht online.'],
    },
  },
  en: {
    base: '/en',
    home: 'home',
    name: 'English',
    parts: [
      { slug: 'part-1', number: '01', label: 'Setup' },
      { slug: 'part-2', number: '02', label: 'Git' },
      { slug: 'part-3', number: '03', label: 'Astro & Vercel' },
    ],
    ui: {
      wordmark: 'The AI Web Tutorial',
      navLabel: 'Tutorial',
      langLabel: 'Language',
      tocLabel: 'On this page',
      pagerLabel: 'Previous and next',
      prev: 'Back',
      next: 'Next',
      home: 'Home',
      homeLong: 'Back to the start',
      done: 'All done',
      lightbox: 'Enlarged screenshot',
      copy: 'Copy',
      copied: 'Copied',
      copyFailed: 'Not possible',
      footer: 'Git & Vercel – from your first commit to a live deployment',
      source: 'Source code on GitHub',
      heroTitle: ['Describe it.', 'And it\u2019s online.'],
    },
  },
};

/** Schlüssel für die im Umschalter gewählte Sprache (localStorage). */
export const LANGUAGE_STORAGE_KEY = 'tutorial-lang';

export const repositoryUrl = 'https://github.com/tendicon-tech/git-vercel-tutorial';

export function homeUrl(lang: Language): string {
  return `${sites[lang].base}/`;
}

export function partUrl(lang: Language, index: number): string {
  return `${sites[lang].base}/${sites[lang].parts[index].slug}/`;
}

/**
 * Die Adressen derselben Seite in allen Sprachen – für den Sprachumschalter
 * und die hreflang-Angaben. `index` ist die Position des Teils, `null` für die Startseite.
 */
export function alternateUrls(index: number | null): Record<Language, string> {
  const urls = {} as Record<Language, string>;
  for (const lang of languages) {
    urls[lang] = index === null ? homeUrl(lang) : partUrl(lang, index);
  }
  return urls;
}
