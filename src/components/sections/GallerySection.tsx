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

           
          </div>

         
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY FILTER (Optional for Full Page Mode) */}
        {/* ========================================================================= */}
        

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