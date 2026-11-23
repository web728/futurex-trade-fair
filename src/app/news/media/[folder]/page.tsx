
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, FolderOpen } from "lucide-react";
import {
  getNewsCollection,
  getNewsCollections,
} from "@/lib/news";
import { PressGallery } from "@/components/news/PressGallery";

type Props = {
  params: Promise<{ folder: string }>;
};

export function generateStaticParams() {
  return getNewsCollections().map((item) => ({
    folder: item.folder,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { folder } = await params;
  const collection = getNewsCollection(folder);

  if (!collection) return { title: "Media Not Found" };

  return {
    title: `${collection.title} | Futurex Media Archive`,
    description:
      `Original photos, newspaper coverage and press assets for ${collection.title}.`,
  };
}

export default async function MediaCollectionPage({
  params,
}: Props) {
  const { folder } = await params;
  const collection = getNewsCollection(folder);

  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#0A0D12]">
      <header className="bg-[#090C11] text-white pt-32 sm:pt-40 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/news#press-coverage"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Newsroom
          </Link>

          <div className="flex items-center gap-3 mt-10 text-red-400">
            <FolderOpen size={18} />
            <span className="font-mono text-[11px] tracking-widest uppercase">
              Exhibition Media Archive
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-[60px] leading-[1.1] font-semibold tracking-[-0.04em]">
            {collection.title}
            <span className="text-red-600">.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base text-neutral-400 leading-[1.8]">
            Original news imagery, press clippings and
            downloadable media documents.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <PressGallery assets={collection.assets} />
      </main>
    </div>
  );
}
