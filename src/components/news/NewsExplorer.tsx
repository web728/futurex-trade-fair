
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  FolderOpen,
  Search,
  X,
  Newspaper,
} from "lucide-react";
import type {
  NewsItem,
  NewsCollection,
  NewsCategory,
} from "@/lib/news-types";

const categories: Array<"All" | NewsCategory> = [
  "All",
  "Announcement",
  "Media Coverage",
  "Event Update",
];

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function NewsExplorer({
  articles,
  collections,
}: {
  articles: NewsItem[];
  collections: NewsCollection[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<"All" | NewsCategory>("All");
  const [event, setEvent] = useState("all");

  const reducedMotion = useReducedMotion();

  const events = Array.from(
    new Set(articles.map((item) => item.event))
  );

  const filteredArticles = useMemo(() => {
    const q = query.toLowerCase().trim();

    return articles.filter((item) => {
      const text = [
        item.title,
        item.excerpt,
        item.event,
        item.country,
        item.edition,
      ].join(" ").toLowerCase();

      return (
        (category === "All" || item.category === category) &&
        (event === "all" || item.event === event) &&
        (!q || text.includes(q))
      );
    });
  }, [articles, query, category, event]);

  const filteredCollections = useMemo(() => {
    const q = query.toLowerCase().trim();

    return collections.filter((item) =>
      !q || item.title.toLowerCase().includes(q) ||
      item.folder.toLowerCase().includes(q)
    );
  }, [collections, query]);

  return (
    <div className="bg-[#FBFBFD] text-[#0A0D12]">
      <section
        id="news-archive"
        className="py-16 sm:py-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-600">
                Futurex / Editorial Archive
              </span>
              <h2 className="mt-3 text-3xl sm:text-[44px] font-semibold tracking-[-0.035em] leading-tight">
                News across{" "}
                <span className="font-serif italic font-normal text-neutral-500">
                  our exhibitions
                </span>
                <span className="text-red-600">.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-[1.8] text-neutral-500">
              Official updates, media recognition and exhibition
              developments from our international portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3">
            <label className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-5 py-4 focus-within:border-red-500 transition-colors">
              <Search size={17} className="text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news, expos or countries..."
                aria-label="Search Futurex news"
                className="min-w-0 flex-1 text-sm bg-transparent text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} className="text-neutral-500" />
                </button>
              )}
            </label>

            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              aria-label="Filter by exhibition"
              className="rounded-xl bg-white border border-neutral-200 text-sm text-neutral-800 px-4 py-4 outline-none focus:border-red-500"
            >
              <option value="all">All Exhibitions</option>
              {events.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={`px-4 py-2.5 rounded-full border text-[11px] font-mono uppercase tracking-wider transition-colors ${
                  value === category
                    ? "bg-[#0A0D12] border-[#0A0D12] text-white"
                    : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {value === "All" ? "All News" : value}
              </button>
            ))}
          </div>

          <div className="mt-9 border-t border-neutral-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${query}-${category}-${event}`}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-neutral-200"
              >
                {filteredArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-8 py-8 sm:py-10"
                  >
                    <div className="md:col-span-4">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#131820]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 35vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper
                              size={30}
                              className="text-red-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        <span className="text-red-600">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={12} />
                          {dateLabel(item.date)}
                        </span>
                        <span>{item.country}</span>
                      </div>

                      <h3 className="mt-3 text-[23px] sm:text-[30px] font-heading font-semibold tracking-tight leading-[1.2] group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-[1.8] text-neutral-500 line-clamp-3">
                        {item.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 mt-5 text-[11px] uppercase tracking-wider font-mono font-semibold">
                        Read full story
                        <ArrowUpRight size={15} />
                      </span>
                    </div>

                    <div className="hidden md:flex md:col-span-1 justify-end">
                      <ArrowUpRight
                        size={20}
                        className="group-hover:text-red-600 transition-colors"
                      />
                    </div>
                  </Link>
                ))}

                {filteredArticles.length === 0 && (
                  <p className="py-14 text-sm text-neutral-500">
                    No articles match your filters.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section
        id="press-coverage"
        className="relative bg-[#090C11] text-white py-16 sm:py-24 scroll-mt-24 overflow-hidden"
      >
        <div className="absolute -top-44 -right-44 w-[550px] h-[550px] rounded-full bg-red-600/[0.07] blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 text-red-400 mb-4">
            <FolderOpen size={18} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Exhibition Media Library
            </span>
          </div>

          <h2 className="text-3xl sm:text-[44px] font-semibold tracking-tight">
            Browse original{" "}
            <span className="font-serif italic font-normal text-neutral-500">
              press assets
            </span>
            <span className="text-red-600">.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm text-neutral-400 leading-[1.8]">
            Original newspaper clippings, exhibition photographs
            and press PDFs arranged by exhibition.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCollections.map((collection) => {
              const imageCount = collection.assets.filter(
                (asset) => asset.type === "image"
              ).length;

              return (
                <Link
                  key={collection.folder}
                  href={`/news/media/${collection.folder}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] hover:border-red-500/40 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#151A21]">
                    {collection.image ? (
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FolderOpen
                          size={35}
                          className="text-red-500"
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
 
                  </div>

                  <div className="flex items-center justify-between gap-3 p-5">
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-red-400 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        View complete media collection
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-neutral-400 shrink-0"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredCollections.length === 0 && (
            <p className="mt-8 text-sm text-neutral-400">
              No media collections matched your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
