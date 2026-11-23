
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  X,
} from "lucide-react";

import { PageHero } from "@/components/hero/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { participantsData } from "@/data/participants";
import type { PastParticipant } from "@/lib/past-participants";

type Category =
  | "Our Partners"
  | "Supporting Associations"
  | "Participants"
  | "Past Participants"
  | "Our Associates";

type DirectoryItem = {
  id: string;
  name: string;
  logo: string;
  category: Category;
};

type Props = {
  pastParticipants: PastParticipant[];
};

const ITEMS_PER_PAGE = 24;

const tabs: Array<{
  id: Category;
  label: string;
}> = [
  { id: "Our Partners", label: "Our Partners" },
  {
    id: "Supporting Associations",
    label: "Supporting Associations",
  },
  { id: "Participants", label: "Participants" },
  {
    id: "Past Participants",
    label: "Past Participants",
  },
  {
    id: "Our Associates",
    label: "Media Partners",
  },
];

const easeEditorial = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeEditorial,
    },
  },
};

export function ParticipantsDirectory({
  pastParticipants,
}: Props) {
  const reducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] =
    useState<Category>("Our Partners");

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLogo, setSelectedLogo] =
    useState<DirectoryItem | null>(null);

  const allItems = useMemo<DirectoryItem[]>(() => {
    const existing: DirectoryItem[] = participantsData.map(
      (item) => ({
        id: String(item.id),
        name: item.name,
        logo: item.logo,
        category: item.category as Category,
      })
    );

    const previous: DirectoryItem[] =
      pastParticipants.map((item) => ({
        id: `past-${item.id}`,
        name: item.name,
        logo: item.logo,
        category: "Past Participants",
      }));

    return [...existing, ...previous];
  }, [pastParticipants]);

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase();

    return allItems.filter(
      (item) =>
        item.category === activeTab &&
        (!search ||
          item.name.toLowerCase().includes(search))
    );
  }, [allItems, activeTab, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changeTab = (category: Category) => {
    setActiveTab(category);
    setCurrentPage(1);
    setQuery("");
  };

  useEffect(() => {
    if (!selectedLogo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLogo(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedLogo]);

  return (
    <div className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Existing Futurex Hero */}
      <PageHero
        eyebrow="GLOBAL NETWORK & ACCREDITATION"
        title={
          <>
            Trusted By Industry Leaders,
            <br />
            <span className="font-serif italic font-normal text-neutral-400">
              Associations & Exhibitors
            </span>
            <span className="text-red-600 font-sans">.</span>
          </>
        }
        description="Explore our corporate partners, trade associations, participating manufacturers, past exhibitors and media organisations across Futurex events."
        backgroundImage="/gallery/pictures/exhibition/Nepal-Buildcon-2019.webp"
      />

      {/* Directory */}
      <section
        id="participants-directory"
        aria-labelledby="participants-heading"
        className="relative py-20 sm:py-24 lg:py-28 border-b border-neutral-200/80"
      >
        {/* Architectural background grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Heading */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              ease: easeEditorial,
            }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-neutral-200 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Futurex Network Directory
            </div>

            <h2
              id="participants-heading"
              className="mt-5 text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.04em] leading-[1.1]"
            >
              Our Industry
              <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Collaboration Network
              </span>
              <span className="text-red-600">.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-500 leading-[1.8] max-w-2xl mx-auto">
              Discover the organisations participating in
              Futurex exhibitions, including our past
              exhibitors, partners and supporting
              associations.
            </p>
          </motion.div>

          {/* Category navigation */}
          <div className="mt-12 sm:mt-14 border-y border-neutral-200/80 py-5">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {tabs.map((tab) => {
                const selected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => changeTab(tab.id)}
                    aria-pressed={selected}
                    className={`relative isolate inline-flex items-center justify-center px-5 py-3 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] border transition-all duration-300 ${
                      selected
                        ? "text-white border-[#0A0D12]"
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="activeParticipantTab"
                        className="absolute inset-0 -z-10 rounded-full bg-[#0A0D12]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                {tabs.find((tab) => tab.id === activeTab)
                  ?.label}
                <span className="text-red-600">.</span>
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Browse original corporate logos
              </p>
            </div>

            <label className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-4 py-3 w-full sm:max-w-xs focus-within:border-red-500 transition-colors">
              <Search
                size={16}
                className="text-neutral-400 shrink-0"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search organisations..."
                aria-label="Search organisations"
                className="w-full min-w-0 bg-transparent outline-none text-sm text-neutral-900 placeholder:text-neutral-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          {/* Logo grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentPage}-${query}`}
              variants={
                reducedMotion
                  ? undefined
                  : containerVariants
              }
              initial={
                reducedMotion ? false : "hidden"
              }
              animate="visible"
              exit={{ opacity: 0 }}
              className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
            >
              {paginatedItems.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  variants={
                    reducedMotion
                      ? undefined
                      : itemVariants
                  }
                  onClick={() => setSelectedLogo(item)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white hover:border-red-300 hover:shadow-xl transition-all duration-300 text-left cursor-zoom-in"
                  aria-label={`View ${item.name} logo`}
                >
                  <span className="absolute left-0 right-0 top-0 h-[2px] bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />

                  <div className="relative aspect-[4/3] w-full bg-white overflow-hidden">
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-5 sm:p-7 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
 
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="mt-9 py-20 text-center border border-neutral-200 rounded-2xl bg-white">
              <Building2
                size={30}
                className="mx-auto text-neutral-300"
              />
              <h3 className="mt-4 text-lg font-semibold">
                No logos found
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {query
                  ? "Try another organisation name."
                  : "Add logo images to the corresponding directory."}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                aria-label="Previous page"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center disabled:opacity-30 hover:border-red-300 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-mono text-neutral-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Next page"
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center disabled:opacity-30 hover:border-red-300 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen logo viewer */}
      <AnimatePresence>
        {selectedLogo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedLogo.name} logo preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          >
            <motion.button
              type="button"
              aria-label="Close logo viewer"
              onClick={() => setSelectedLogo(null)}
              className="absolute inset-0 bg-[#050608]/95 backdrop-blur-xl"
            />

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.95, y: 12 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.3,
                ease: easeEditorial,
              }}
              className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-2xl"
            >
              <div className="bg-[#0A0D12] flex items-center justify-between gap-4 p-4 sm:px-6">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
                  <Building2
                    size={15}
                    className="text-red-500"
                  />
                  {selectedLogo.category}
                </span>

                <div className="flex gap-2">
                  <a
                    href={selectedLogo.logo}
                    download
                    aria-label="Download original logo"
                    className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-red-600 flex items-center justify-center transition-colors"
                  >
                    <Download size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedLogo(null)}
                    aria-label="Close"
                    className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[40vh] sm:h-[55vh] bg-white">
                <Image
                  src={selectedLogo.logo}
                  alt={`${selectedLogo.name} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain p-8 sm:p-14"
                />
              </div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}

export default ParticipantsDirectory;
