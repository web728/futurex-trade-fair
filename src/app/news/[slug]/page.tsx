
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Newspaper,
} from "lucide-react";
import {
  getAllNews,
  getNewsBySlug,
  formatNewsDate,
} from "@/lib/news";
import { PressGallery } from "@/components/news/PressGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNews().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.futurextrade.com/news/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: `${article.date}T00:00:00+05:30`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  const related = getAllNews()
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <article className="bg-[#FBFBFD] text-[#0A0D12] min-h-screen">
      <header className="relative bg-[#090C11] text-white pt-32 sm:pt-40 pb-14 sm:pb-20 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-red-600/[0.06] rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={15} />
            All News
          </Link>

          <div className="mt-10 max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/25 bg-red-600/10 text-red-400 font-mono text-[10px] uppercase tracking-wider">
              <Newspaper size={13} />
              {article.category}
            </span>

            <h1 className="mt-6 text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.1] tracking-[-0.04em] font-semibold">
              {article.title}
              <span className="text-red-600">.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm sm:text-lg leading-[1.8] text-neutral-400">
              {article.excerpt}
            </p>

            <div className="mt-9 pt-5 border-t border-white/10 flex flex-wrap items-center gap-5 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} className="text-red-500" />
                {formatNewsDate(article.date)}
              </span>
              <span>{article.event}</span>
              <span>{article.country}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <main className="lg:col-span-8 min-w-0">
            {article.image && (
              <figure className="mb-10">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-[11px] font-mono text-neutral-500">
                  Futurex Group / Original Event Media
                </figcaption>
              </figure>
            )}

            <div className="space-y-6">
              {article.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-[1.9] ${
                    index === 0
                      ? "text-lg font-medium text-neutral-900"
                      : "text-sm sm:text-base text-neutral-600"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {article.dignitaries &&
              article.dignitaries.length > 0 && (
                <section className="mt-12 pt-9 border-t border-neutral-200">
                  <h2 className="text-2xl font-semibold mb-6">
                    Distinguished Presence
                  </h2>

                  <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {article.dignitaries.map((person) => (
                      <div
                        key={person}
                        className="flex items-start gap-3 py-4 text-sm text-neutral-700 leading-[1.8]"
                      >
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-red-600 shrink-0" />
                        {person}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {article.assets.length > 0 && (
              <section className="mt-14 pt-10 border-t border-neutral-200">
                <h2 className="mb-7 text-2xl sm:text-3xl font-semibold">
                  Original Press & Media
                  <span className="text-red-600">.</span>
                </h2>
                <PressGallery assets={article.assets} />
              </section>
            )}

            {article.mediaLinks.length > 0 && (
              <section
                id="media-coverage"
                className="mt-14 pt-10 border-t border-neutral-200 scroll-mt-28"
              >
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Published Media Coverage
                  <span className="text-red-600">.</span>
                </h2>

                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                  Read coverage from original news publications.
                </p>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {article.mediaLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-xl bg-white border border-neutral-200 hover:border-red-300 hover:shadow-md p-5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-red-600">
                            {link.publisher}
                          </span>
                          <h3 className="mt-3 text-sm font-semibold leading-[1.65] text-neutral-800 group-hover:text-red-600 transition-colors">
                            {link.title}
                          </h3>
                        </div>

                        <ExternalLink
                          size={15}
                          className="shrink-0 text-neutral-400"
                        />
                      </div>

                      <span className="mt-5 pt-3 border-t border-neutral-100 text-[11px] font-mono uppercase text-neutral-500">
                        Read article
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-5">
              <div className="p-7 rounded-2xl bg-[#0A0D12] text-white">
                <span className="font-mono text-[10px] uppercase tracking-wider text-red-400">
                  Exhibition Dossier
                </span>

                <h2 className="text-xl font-semibold mt-4">
                  {article.event}
                </h2>

                <div className="mt-5 pt-5 border-t border-white/10 space-y-3 text-sm text-neutral-400">
                  <p>{article.edition}</p>
                  <p>{article.country}</p>
                </div>

                {article.eventUrl && (
                  <a
                    href={article.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-7 w-full rounded-full bg-red-600 hover:bg-red-500 py-3 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Official Exhibition
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <Link
                href={`/news/media/${article.folder}`}
                className="flex items-center justify-between rounded-xl p-5 bg-white border border-neutral-200 hover:border-red-300 transition-colors text-sm font-medium"
              >
                Browse all media assets
                <ArrowUpRight size={17} className="text-red-600" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              More News from Futurex
              <span className="text-red-600">.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group rounded-2xl border border-neutral-200 p-6 hover:border-red-300 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase text-red-600">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 mt-5 text-xs text-neutral-500">
                    Read Story <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
