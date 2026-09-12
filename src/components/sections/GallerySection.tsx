'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Maximize2, Aperture, Sparkles, Compass, Eye } from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import { Lightbox } from '@/components/ui/Lightbox';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.65, ease: easeEditorial } 
  }
};

export function GallerySection({ full = false }: { full?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const rawCategories = (galleryItems || []).map(item => item.category).filter(Boolean);
    return ['ALL', ...Array.from(new Set(rawCategories))];
  }, []);

  const filteredItems = useMemo(() => {
    const baseItems = full ? (galleryItems || []) : (galleryItems || []).slice(0, 5);
    if (activeCategory === 'ALL') return baseItems;
    return baseItems.filter(item => item.category?.toUpperCase() === activeCategory.toUpperCase());
  }, [full, activeCategory]);

  const [selected, setSelected] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-16 sm:py-20 lg:py-24 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="gallery-section-heading"
    >
      {/* Editorial Watermark Behind Header */}
      <div 
        className="absolute top-6 right-8 text-[120px] sm:text-[180px] font-black text-neutral-900/[0.02] tracking-tighter leading-none pointer-events-none select-none -z-0"
        aria-hidden="true"
      >
        EXPO
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ========================================================================= */}
        {/* 1. HIGH-END EDITORIAL HEADING BLOCK */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200/80 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            {/* Live Aperture Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-neutral-900 text-white text-[10.5px] font-mono tracking-widest uppercase mb-4 shadow-sm">
              <Aperture className="w-3.5 h-3.5 text-red-500 animate-[spin_10s_linear_infinite]" />
              <span>Visual Telemetry • On-Ground Archives</span>
              <span className="w-1 h-1 rounded-full bg-red-500" />
            </div>

            {/* Premium Editorial Title */}
            <h2 
              id="gallery-section-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.04em] text-[#0A0D12] leading-[1.05]"
            >
              Moments From The <br />
              <span className="font-serif italic font-normal text-neutral-500 hover:text-[#0A0D12] transition-colors duration-300">
                Commercial Trade Floor
              </span>
              <span className="text-red-600 font-sans">.</span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
              Photographic documentation of live industrial summits, ministerial ribbon-cuttings, and verified enterprise buyer interactions across South Asia & East Africa.
            </p>
          </div>

          {/* Right Header Stats & Telemetry */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-neutral-500 uppercase tracking-wider">ARCHIVE INDEX:</span>
              <strong className="text-neutral-900 font-bold">{filteredItems.length} MASTER PLATES</strong>
            </div>

            <span className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase">
              Curated Trade Fairs • 2026 — 2027
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY FILTER (Optional for Full Page Mode) */}
        {/* ========================================================================= */}
        {full && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected 
                      ? 'text-white font-medium' 
                      : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/90 shadow-2xs'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeLuxuryGalleryFilter"
                      className="absolute inset-0 bg-[#0A0D12] rounded-full -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. ARCHITECTURAL CONTACT-SHEET BENTO GRID */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[180px] sm:auto-rows-[210px]"
          >
            {filteredItems.map((item, index) => {
              const isFeatured = index === 0 && activeCategory === 'ALL';
              const frameCode = `FX-${String(index + 1).padStart(3, '0')}`;

              return (
                <motion.button 
                  key={item.id || index} 
                  type="button" 
                  variants={itemVariants}
                  onClick={() => setSelected(item)}
                  className={`group relative w-full h-full rounded-3xl overflow-hidden text-left bg-neutral-950 border border-neutral-200/90 hover:border-neutral-400 shadow-2xs hover:shadow-2xl transition-all duration-500 cursor-pointer active:scale-[0.99] ${
                    isFeatured ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-1'
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  {/* Top Laser Hairline on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left z-30" />

                  {/* Visual Photographic Asset */}
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    sizes={isFeatured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'} 
                    className="object-cover object-center transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 brightness-[0.82] contrast-[1.1]"
                  />

                  {/* Atmospheric Depth Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/95 via-[#07080A]/30 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

                  {/* Top Technical Metadata Bar */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9.5px] font-mono tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {item.category || 'EXHIBITION'}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/60 tracking-widest hidden sm:inline-block">
                        {frameCode}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                        <Maximize2 size={12} />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Caption & Architectural Identity */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-neutral-400">
                      <span>VERIFIED ASSET</span>
                      <span>•</span>
                      <span className="text-red-400">ON-SITE CAPTURE</span>
                    </div>

                    <h3 className={`font-semibold text-white tracking-tight leading-snug m-0 group-hover:text-red-400 transition-colors duration-200 ${
                      isFeatured ? 'text-xl sm:text-2xl lg:text-[26px]' : 'text-xs sm:text-sm line-clamp-1'
                    }`}>
                      {item.title}
                    </h3>

                    {isFeatured && (
                      <p className="text-neutral-300 text-xs sm:text-[13px] mt-2 line-clamp-2 font-normal hidden sm:block leading-relaxed max-w-lg">
                        High-resolution photographic capture of international buyer delegations, live machinery unveilings, and bilateral trade MoUs.
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Lightbox Popover */}
      {selected ? (
        <Lightbox 
          open 
          src={selected.image} 
          alt={selected.title} 
          category={selected.category}
          onClose={() => setSelected(null)} 
        />
      ) : null}
    </section>
  );
}

export default GallerySection;