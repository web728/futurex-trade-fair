
export type NewsCategory =
  | "Announcement"
  | "Media Coverage"
  | "Event Update";

export type MediaLink = {
  publisher: string;
  title: string;
  url: string;
};

export type NewsAsset = {
  title: string;
  url: string;
  type: "image" | "pdf";
};

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
  image?: string;
  eventUrl?: string;
  paragraphs: string[];
  dignitaries?: string[];
  mediaLinks: MediaLink[];
  assets: NewsAsset[];
};

export type NewsCollection = {
  folder: string;
  title: string;
  image?: string;
  assets: NewsAsset[];
  articleSlug?: string;
};
