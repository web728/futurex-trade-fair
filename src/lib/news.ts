import "server-only";

import newsData from "@/data/auto-news.json";

import type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

// Re-export existing types.
export type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

export type NewsArticle = NewsItem;

// Validate and sort generated articles.
const articles: NewsItem[] = Array.isArray(newsData.articles)
  ? [...(newsData.articles as NewsItem[])].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
  : [];

// Validate generated media collections.
const collections: NewsCollection[] = Array.isArray(
  newsData.collections
)
  ? (newsData.collections as NewsCollection[])
  : [];

// Server-side diagnostics.
console.log("[Futurex News] Environment:", process.env.NODE_ENV);
console.log("[Futurex News] Articles loaded:", articles.length);
console.log("[Futurex News] Collections loaded:", collections.length);

if (articles.length === 0) {
  console.warn(
    "[Futurex News] WARNING: auto-news.json contains no articles."
  );
}

// Return all news articles.
export function getAllNews(): NewsItem[] {
  return articles;
}

// Return all media collections.
export function getNewsCollections(): NewsCollection[] {
  return collections;
}

// Find article by slug.
export function getNewsBySlug(
  slug: string
): NewsItem | undefined {
  return articles.find(
    (article) => article.slug === slug
  );
}

// Find media collection by folder.
export function getNewsCollection(
  folder: string
): NewsCollection | undefined {
  return collections.find(
    (collection) => collection.folder === folder
  );
}

// Compatibility exports.
export const sortedNews: NewsItem[] = articles;

export const newsArticles: NewsItem[] = articles;

export const newsEvents: string[] = Array.from(
  new Set(
    articles.map((article) => article.event)
  )
);

// Safe date formatting.
export function formatNewsDate(date: string): string {
  const parsedDate = new Date(`${date}T12:00:00Z`);

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