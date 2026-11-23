
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Images,
  ExternalLink,
} from "lucide-react";
import type { NewsAsset } from "@/lib/news-types";

export function PressGallery({
  assets,
}: {
  assets: NewsAsset[];
}) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const reducedMotion = useReducedMotion();

  const images = useMemo(
    () => assets.filter((item) => item.type === "image"),
    [assets]
  );

  const pdfs = useMemo(
    () => assets.filter((item) => item.type === "pdf"),
    [assets]
  );

  const active =
    activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null
            ? null
            : (index + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null
            ? null
            : (index - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <div>
      {images.length > 0 && (
        <section id="press-images" className="scroll-mt-28">
          <div className="flex items-center gap-2 mb-4">
            <Images size={17} className="text-red-600" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-red-600">
              Original Image Archive
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {images.map((item, index) => (
              <motion.button
                key={item.url}
                type="button"
                whileHover={
                  reducedMotion ? undefined : { y: -4 }
                }
                onClick={() => setActiveIndex(index)}
                className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white text-left hover:shadow-xl hover:border-red-300 transition-all cursor-zoom-in"
                aria-label={`Open ${item.title}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain group-hover:scale-[1.025] transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs text-neutral-700 line-clamp-2 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {pdfs.length > 0 && (
        <section
          id="press-documents"
          className="mt-14 pt-10 border-t border-neutral-200 scroll-mt-28"
        >
          <div className="flex items-center gap-2 mb-5">
            <FileText size={17} className="text-red-600" />
            <h2 className="text-xl sm:text-2xl font-semibold">
              Press Documents & PDFs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pdfs.map((item) => (
              <div
                key={item.url}
                className="rounded-xl bg-white border border-neutral-200 p-5"
              >
                <div className="flex gap-3 items-start">
                  <span className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <FileText size={20} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold break-words">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      PDF document
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs hover:bg-neutral-100 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Preview
                  </a>

                  <a
                    href={item.url}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-4 py-2 text-xs hover:bg-red-500 transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Media viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#050608]/95 backdrop-blur-xl p-4 sm:p-7 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close media viewer"
              className="absolute inset-0 w-full h-full cursor-default"
            />

            <div className="absolute z-20 top-4 sm:top-7 left-4 right-4 sm:left-8 sm:right-8 flex items-center justify-between gap-4">
              <p className="text-white text-xs sm:text-sm font-medium truncate max-w-[55%]">
                {active.title}
              </p>

              <div className="flex gap-2">
                <a
                  href={active.url}
                  download
                  aria-label="Download original image"
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Download size={17} />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <motion.div
              key={active.url}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.97 }
              }
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 w-full max-w-6xl h-[72vh] sm:h-[78vh] pointer-events-none"
            >
              <Image
                src={active.url}
                alt={active.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null
                        ? null
                        : (i - 1 + images.length) % images.length
                    )
                  }
                  aria-label="Previous image"
                  className="absolute z-20 left-3 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null
                        ? null
                        : (i + 1) % images.length
                    )
                  }
                  aria-label="Next image"
                  className="absolute z-20 right-3 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PressGallery;
