
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Newspaper,
  Globe2,
} from "lucide-react";
import type { NewsItem } from "@/lib/news-types";

const ease = [0.16, 1, 0.3, 1] as const;

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function NewsSectionClient({
  articles,
}: {
  articles: NewsItem[];
}) {
  const reduceMotion = useReducedMotion();

  const featured =
    articles.find((item) => item.featured) ?? articles[0];

  if (!featured) return null;

  const latest = articles
    .filter((item) => item.slug !== featured.slug)
    .slice(0, 3);

  return (
    <section
      id="futurex-news"
      aria-labelledby="news-heading"
      className="relative isolate overflow-hidden bg-[#090C11] text-white py-20 sm:py-24 lg:py-28 border-y border-white/10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -right-40 -top-40 w-[650px] h-[650px] rounded-full bg-red-600/[0.06] blur-[120px]" />

        <svg
          viewBox="0 0 600 600"
          fill="none"
          className="absolute -right-40 -top-20 w-[650px] h-[650px] opacity-[0.09]"
        >
          <circle
            cx="300"
            cy="300"
            r="240"
            stroke="white"
            strokeWidth="0.8"
          />
          <circle
            cx="300"
            cy="300"
            r="180"
            stroke="white"
            strokeWidth="0.8"
            strokeDasharray="5 12"
          />
          <circle
            cx="300"
            cy="300"
            r="100"
            stroke="#DC2626"
            strokeWidth="1"
          />
          <path
            d="M300 0V600M0 300H600"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 1, y: 22 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 pb-9 border-b border-white/10"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
                Futurex / News & Media
              </span>
            </div>

            <h2
              id="news-heading"
              className="font-heading text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.08] tracking-[-0.04em] font-semibold"
            >
              Making an impact.
              <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Making headlines
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm sm:text-[15px] leading-[1.8] text-neutral-400">
              Exhibition milestones, original news reports
              and media recognition across Futurex Group's
              global trade portfolio.
            </p>
          </div>

          <Link
            href="/news"
            className="group inline-flex items-center justify-center gap-3 self-start lg:self-end px-6 py-3 rounded-full border border-white/20 text-[11px] font-mono uppercase tracking-wider hover:bg-white hover:text-[#090C11] transition-colors duration-300"
          >
            Visit Newsroom
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-10">
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 1, y: 25 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, ease }}
            className="lg:col-span-7"
          >
            <Link
              href={`/news/${featured.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/10] rounded-[22px] overflow-hidden bg-[#151A20] border border-white/10">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper
                      size={44}
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md px-4 py-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white">
                    Featured News
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <span className="text-[11px] font-mono uppercase text-white">
                    {featured.event}
                  </span>
                  <span className="w-11 h-11 flex items-center justify-center bg-white rounded-full text-black group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider">
                  <span className="text-red-400">
                    {featured.category}
                  </span>
                  <span className="text-neutral-500">
                    {dateLabel(featured.date)}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl sm:text-[30px] font-semibold tracking-tight leading-[1.2] group-hover:text-red-400 transition-colors">
                  {featured.title}
                </h3>

                <p className="mt-3 text-sm text-neutral-400 leading-[1.8]">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.aside
            initial={
              reduceMotion ? false : { opacity: 1, x: 20 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10"
          >
            <div className="flex items-center gap-2 pb-5 border-b border-white/10">
              <Globe2 size={16} className="text-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                Latest From Futurex
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {latest.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group flex gap-4 items-start py-6"
                >
                  <div className="relative w-[105px] sm:w-[120px] aspect-[4/3] rounded-xl bg-[#171C24] overflow-hidden shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-red-500">
                        <Newspaper size={22} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-red-400">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-sm sm:text-base font-semibold leading-snug group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[10px] font-mono text-neutral-500 uppercase">
                      {dateLabel(item.date)}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-neutral-500 group-hover:text-red-400 shrink-0"
                  />
                </Link>
              ))}
            </div>

            <Link
              href="/news#press-coverage"
              className="group mt-7 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-5 py-4 hover:bg-white/[0.07] transition-colors"
            >
              <div>
                <span className="block text-sm font-semibold">
                  Exhibition Media Library
                </span>
                <span className="block mt-1 text-xs text-neutral-500">
                  News images, press clippings and PDFs
                </span>
              </div>
              <ArrowUpRight
                size={19}
                className="group-hover:text-red-400"
              />
            </Link>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
