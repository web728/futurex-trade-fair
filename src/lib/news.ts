
import "server-only";

import newsData from "@/data/auto-news.json";

import type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

// Re-export types for existing server-side imports.
export type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

// Compatibility alias.
export type NewsArticle = NewsItem;

/**
 * News data is generated before next dev / next build.
 *
 * Source:
 * public/news/[folder]/article.json
 * public/news/[folder]/links.json
 * public/news/[folder]/*.{jpg,jpeg,png,webp,avif,gif,pdf}
 *
 * Generated:
 * src/data/auto-news.json
 *
 * No runtime filesystem scanning is needed.
 */

const articles: NewsItem[] =
  newsData.articles as NewsItem[];

const collections: NewsCollection[] =
  newsData.collections as NewsCollection[];

/**
 * Return all news articles, newest first.
 */
export function getAllNews(): NewsItem[] {
  return articles;
}

/**
 * Return all automatically discovered
 * exhibition media collections.
 */
export function getNewsCollections(): NewsCollection[] {
  return collections;
}

/**
 * Find a news article by its URL slug.
 */
export function getNewsBySlug(
  slug: string
): NewsItem | undefined {
  return articles.find(
    (article) => article.slug === slug
  );
}

/**
 * Find an exhibition media gallery by folder name.
 */
export function getNewsCollection(
  folder: string
): NewsCollection | undefined {
  return collections.find(
    (collection) => collection.folder === folder
  );
}

/**
 * Optional exports for existing components.
 */
export const sortedNews: NewsItem[] = articles;

export const newsArticles: NewsItem[] = articles;

export const newsEvents: string[] = Array.from(
  new Set(
    articles.map((article) => article.event)
  )
);

/**
 * Format an article date:
 * 2026-11-23 -> 23 Nov 2026
 */
export function formatNewsDate(
  date: string
): string {
  const parsedDate = new Date(
    `${date}T12:00:00Z`
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}
