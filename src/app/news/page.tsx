
import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import {
  getAllNews,
  getNewsCollections,
} from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Media Coverage | Futurex Group",
  description:
    "Official Futurex Group news, exhibition media coverage, press images and industry announcements.",
  alternates: {
    canonical: "https://www.futurextrade.com/news",
  },
};

export default function NewsPage() {
  const articles = getAllNews();
  const collections = getNewsCollections();

  return (
    <>
      <PageHero
        eyebrow="NEWS & MEDIA"
        title={
          <>
            Stories Shaping
            <br />
            <span className="font-serif italic font-normal text-neutral-500">
              Global Trade
            </span>
            <span className="text-red-600">.</span>
          </>
        }
        tagline="Futurex Group / Official Newsroom"
        description="Exhibition milestones, industry announcements, original press clippings and international media coverage."
      />

      <NewsExplorer
        articles={articles}
        collections={collections}
      />
    </>
  );
}
