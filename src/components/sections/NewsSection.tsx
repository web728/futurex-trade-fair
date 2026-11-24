import "server-only";

import Link from "next/link";
import { getAllNews } from "@/lib/news";
import { NewsSectionClient } from "./NewsSectionClient";

export function NewsSection() {
  const articles = getAllNews();

  console.log(
    "[Futurex Homepage] News articles:",
    articles.length
  );

  if (articles.length === 0) {
    console.warn(
      "[Futurex Homepage] No news articles available."
    );

    return (
      <section
        id="futurex-news"
        aria-labelledby="news-heading"
        className="relative overflow-hidden bg-[#090C11] text-white py-20 sm:py-24 lg:py-28 border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 bg-red-600 rounded-full" />

            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
              Futurex / News & Media
            </span>
          </div>

          <h2
            id="news-heading"
            className="font-heading text-[34px] sm:text-[46px] lg:text-[56px] font-semibold tracking-tight"
          >
            Making an impact.
            <br />

            <span className="font-serif italic font-normal text-neutral-500">
              Making headlines
            </span>

            <span className="text-red-600">.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm text-neutral-400 leading-relaxed">
            Explore exhibition milestones, industry updates
            and media recognition across Futurex Group.
          </p>

          <Link
            href="/news"
            className="inline-flex mt-8 px-6 py-3 rounded-full border border-white/20 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            Visit Newsroom
          </Link>
        </div>
      </section>
    );
  }

  return <NewsSectionClient articles={articles} />;
}

export default NewsSection;