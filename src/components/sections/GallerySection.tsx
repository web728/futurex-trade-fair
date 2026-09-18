'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Download, X, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { galleryItems, GALLERY_ITEMS_PER_PAGE } from '@/data/gallery';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: easeEditorial } 
  }
};

// Premium Curated Categories (All Archives removed, refined labels)
const TABS = [
  { id: 'Exhibitions', label: 'Trade Exhibitions' },
  { id: 'Media Coverage', label: 'Media Coverage' },
  { id: 'Conference', label: 'Conferences' },
  { id: 'Webinar', label: 'Digital Webinars' },
  { id: 'Virtual Platform', label: 'Virtual Platforms' },
] as const;

export function GallerySection({ full = false }: { full?: boolean }) {
  // Prioritize Exhibitions tab by default
  const [activeTab, setActiveTab] = useState<string>('Exhibitions');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[number] | null>(null);

  // Filter items based on active tab category
  const filteredItems = useMemo(() => {
    const raw = galleryItems || [];
    if (activeTab === 'ALL') return raw;
    return raw.filter(item => item.category?.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredItems.length / GALLERY_ITEMS_PER_PAGE);
  
  const paginatedItems = useMemo(() => {
    if (!full) return filteredItems.slice(0, 6); // Homepage preview limit (6 items)
    const start = (currentPage - 1) * GALLERY_ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + GALLERY_ITEMS_PER_PAGE);
  }, [filteredItems, currentPage, full]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="gallery-section-heading"
    >
      {/* Background Architectural Grid Pattern matching other sections */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ========================================================================= */}
        {/* SIDE-BY-SIDE BALANCED HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-neutral-200 mb-10 sm:mb-14">
          <div className="max-w-2xl">
          

            <h2 
              id="gallery-section-heading"
              className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
            >
              Visual Moments From <br />
              <span className="font-serif italic font-normal text-neutral-500">
                The Trade Floor & Exhibitions
              </span>
              <span className="text-red-600 font-sans">.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
              Explore curated photographic records from international trade exhibitions, high-level pavilions, and global commercial platforms.
            </p>
          </div>

          {/* Optional Action / Link button if preview mode */}
          {!full && (
            <div className="flex items-center gap-4 self-start md:self-end">
              <a
                href="/gallery"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#0A0D12] border border-neutral-300 hover:border-[#0A0D12] text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-2xs hover:shadow-md active:scale-95 cursor-pointer"
              >
                <span className="text-neutral-800 transition-colors duration-300 group-hover:text-white">
                  View Full Gallery
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-neutral-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PREMIUM ULTRA-REFINED CATEGORY PILL TABS (Without All Archives) */}
        {/* ========================================================================= */}
        {full && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 sm:mb-18">
            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  type="button"
                  className={`group relative px-6 py-3 rounded-full text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'text-white font-medium shadow-md scale-105' 
                      : 'text-neutral-600 hover:text-neutral-950 bg-white/80 backdrop-blur-md border border-neutral-200/90 hover:border-neutral-400 hover:bg-white shadow-2xs'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeLightGalleryTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#0A0D12] to-neutral-800 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    {isSelected &&     <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                                              <Image
                                                src="/logos/svg/logo-arrow-white.png"
                                                alt="Icon"
                                                fill
                                                className="object-contain"
                                              />
                                            </div>}
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* UNIFORM GRID WITH CRISP LIGHT MODE CARDS */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeTab}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
         {paginatedItems.map((item, index) => (
  <motion.button 
    key={item.id || index} 
    type="button" 
    variants={itemVariants}
    onClick={() => setSelectedImage(item)}
    className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden text-left bg-neutral-100 border border-neutral-200/90 hover:border-neutral-400 shadow-2xs hover:shadow-xl transition-all duration-400 ease-[0.16,1,0.3,1] cursor-pointer sm:cursor-zoom-in active:scale-[0.99]"
    aria-label="View Fullscreen Asset"
  >
    {/* Top Red Accent Line on Hover */}
    <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-30 pointer-events-none" />

    {/* High Quality Image with Smooth Hover Zoom */}
    <div className="relative w-full h-full overflow-hidden">
      <Image 
        src={item.image} 
        alt={item.title || "Futurex Gallery Asset"} 
        fill 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
      />
    </div>
  </motion.button>
))}
          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* PAGINATION CONTROLS */}
        {/* ========================================================================= */}
        {full && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-14 sm:mt-18">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-mono shadow-2xs">
              <span className="font-bold text-neutral-900">{currentPage}</span>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-600">{totalPages}</span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
              aria-label="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX WITH DOWNLOAD BUTTON */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[#050608]/90 backdrop-blur-xl cursor-pointer"
            />

            {/* Lightbox Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-neutral-950 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top Bar with Category & Download */}
              <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
                <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
                  {selectedImage.category || 'Exhibition'}
                </span>

                <div className="flex items-center gap-3">
                  {/* Download Button */}
                  <a
                    href={selectedImage.image}
                    download="Futurex-Media-Asset.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-red-600 text-neutral-900 hover:text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close Lightbox"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Large Image View */}
              <div className="relative w-full h-[75vh] flex items-center justify-center p-4">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title || "Expanded Media Asset"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;