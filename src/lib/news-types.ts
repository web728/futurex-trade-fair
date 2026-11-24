
export type NewsCategory =
  | "Announcement"
  | "Media Coverage"
  | "Event Update";

/**
 * External newspaper or media publication link.
 */
export type MediaLink = {
  publisher: string;
  title: string;
  url: string;
};

/**
 * Automatically discovered image or PDF.
 */
export type NewsAsset = {
  title: string;
  url: string;
  type: "image" | "pdf";
};

/**
 * News article generated from
 * public/news/[folder]/article.json
 */
export type NewsItem = {
  slug: string;
  folder: string;

  title: string;
  excerpt: string;
  date: string;

  category: NewsCategory;

  event: string;
  country: string;
  edition: string;

  featured?: boolean;

  // Automatically selected cover image.
  image?: string;

  eventUrl?: string;

  paragraphs: string[];

  dignitaries?: string[];

  // Parsed from links.json
  mediaLinks: MediaLink[];

  // All images and PDFs found in the folder.
  assets: NewsAsset[];
};

/**
 * Media gallery for an exhibition folder.
 *
 * Folders without article.json still appear
 * as media collections when assets exist.
 */
export type NewsCollection = {
  folder: string;
  title: string;

  image?: string;

  assets: NewsAsset[];

  articleSlug?: string;
};
