
import "server-only";

import fs from "node:fs";
import path from "node:path";
import type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

export type {
  NewsAsset,
  NewsCategory,
  NewsCollection,
  NewsItem,
  MediaLink,
} from "./news-types";

const NEWS_DIR = path.join(process.cwd(), "public", "news");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const PDF_EXT = new Set([".pdf"]);

const CATEGORIES: NewsCategory[] = [
  "Announcement",
  "Media Coverage",
  "Event Update",
];

type ArticleConfig = {
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  event: string;
  country: string;
  edition: string;
  featured?: boolean;
  cover?: string;
  eventUrl?: string;
  paragraphs: string[];
  dignitaries?: string[];
};

function validFolder(folder: string): boolean {
  return folder === "general" ||
    /^[a-z0-9][a-z0-9-]*$/.test(folder);
}

function niceTitle(value: string): string {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function encodedFileUrl(folder: string, file: string): string {
  const filename = encodeURIComponent(file);

  return folder === "general"
    ? `/news/${filename}`
    : `/news/${folder}/${filename}`;
}

function safeReadDir(directory: string): fs.Dirent[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."));
}

function readJson<T>(filename: string): T | null {
  if (!fs.existsSync(filename)) return null;

  try {
    return JSON.parse(
      fs.readFileSync(filename, "utf8")
    ) as T;
  } catch (error) {
    console.error(`Invalid JSON: ${filename}`, error);
    return null;
  }
}

function getDirectory(folder: string): string {
  return folder === "general"
    ? NEWS_DIR
    : path.join(NEWS_DIR, folder);
}

function getAssets(folder: string): NewsAsset[] {
  const directory = getDirectory(folder);

  return safeReadDir(directory)
    .filter((entry) => entry.isFile())
    .filter((entry) => {
      const ext = path.extname(entry.name).toLowerCase();
      return IMAGE_EXT.has(ext) || PDF_EXT.has(ext);
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
      })
    )
    .map((entry) => {
      const ext = path.extname(entry.name).toLowerCase();

      return {
        title: niceTitle(entry.name),
        url: encodedFileUrl(folder, entry.name),
        type: PDF_EXT.has(ext) ? "pdf" : "image",
      };
    });
}

function getLinks(folder: string): MediaLink[] {
  const filename = path.join(
    getDirectory(folder),
    "links.json"
  );

  const data = readJson<unknown>(filename);

  if (!Array.isArray(data)) return [];

  const links: MediaLink[] = [];

  for (const entry of data) {
    if (!entry || typeof entry !== "object") continue;

    const item = entry as Partial<MediaLink>;

    if (
      typeof item.publisher !== "string" ||
      typeof item.title !== "string" ||
      typeof item.url !== "string"
    ) {
      continue;
    }

    try {
      const url = new URL(item.url);
      if (!["https:", "http:"].includes(url.protocol)) {
        continue;
      }

      links.push({
        publisher: item.publisher,
        title: item.title,
        url: item.url,
      });
    } catch {
      continue;
    }
  }

  return Array.from(
    new Map(links.map((item) => [item.url, item])).values()
  );
}

function getArticleConfig(
  folder: string
): ArticleConfig | null {
  const filename = path.join(
    getDirectory(folder),
    "article.json"
  );

  const data = readJson<Partial<ArticleConfig>>(filename);

  if (
    !data ||
    typeof data.title !== "string" ||
    typeof data.excerpt !== "string" ||
    typeof data.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !CATEGORIES.includes(data.category as NewsCategory) ||
    typeof data.event !== "string" ||
    typeof data.country !== "string" ||
    typeof data.edition !== "string" ||
    !Array.isArray(data.paragraphs)
  ) {
    return null;
  }

  return data as ArticleConfig;
}

function getCover(
  folder: string,
  assets: NewsAsset[],
  requested?: string
): string | undefined {
  const images = assets.filter(
    (asset) => asset.type === "image"
  );

  if (requested) {
    const expected = encodedFileUrl(folder, requested);
    const matched = images.find(
      (image) => image.url === expected
    );
    if (matched) return matched.url;
  }

  return images[0]?.url;
}

export function getNewsCollections(): NewsCollection[] {
  const folders = safeReadDir(NEWS_DIR)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(validFolder)
    .sort();

  // Files directly inside public/news are the General library.
  const allFolders = ["general", ...folders];

  return allFolders
    .map((folder): NewsCollection => {
      const assets = getAssets(folder);
      const config =
        folder === "general"
          ? null
          : getArticleConfig(folder);

      return {
        folder,
        title:
          folder === "general"
            ? "General Press & Media"
            : config?.event || niceTitle(folder),
        image: getCover(folder, assets, config?.cover),
        assets,
        articleSlug: config?.slug || (
          config ? folder : undefined
        ),
      };
    })
    .filter((collection) => collection.assets.length > 0);
}

export function getAllNews(): NewsItem[] {
  const folders = safeReadDir(NEWS_DIR)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(validFolder);

  const articles = folders.flatMap((folder): NewsItem[] => {
    const config = getArticleConfig(folder);
    if (!config) return [];

    const slug = config.slug || folder;
    if (!validFolder(slug)) return [];

    const assets = getAssets(folder);

    return [{
      slug,
      folder,
      title: config.title,
      excerpt: config.excerpt,
      date: config.date,
      category: config.category,
      event: config.event,
      country: config.country,
      edition: config.edition,
      featured: config.featured === true,
      image: getCover(folder, assets, config.cover),
      eventUrl: config.eventUrl,
      paragraphs: config.paragraphs,
      dignitaries: config.dignitaries,
      mediaLinks: getLinks(folder),
      assets,
    }];
  });

  return articles.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      a.title.localeCompare(b.title)
  );
}

export function getNewsBySlug(
  slug: string
): NewsItem | undefined {
  return getAllNews().find((item) => item.slug === slug);
}

export function getNewsCollection(
  folder: string
): NewsCollection | undefined {
  if (!validFolder(folder)) return undefined;

  return getNewsCollections().find(
    (item) => item.folder === folder
  );
}

export function formatNewsDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
