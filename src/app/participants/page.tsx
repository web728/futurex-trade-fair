'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, X, Download, Building2 } from 'lucide-react';
import { PageHero } from '@/components/hero/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { participantsData, PARTICIPANTS_PER_PAGE, type ParticipantItem } from '@/data/participants';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
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

// Single-Line Aligned Category Tabs
const TABS = [
  { id: 'Our Partners', label: 'Our Partners' },
  { id: 'Supporting Associations', label: 'Supporting Associations' },
  { id: 'Participants', label: 'Participants' },
  { id: 'Our Associates', label: 'Media Partners' },
] as const;

export default function ParticipantsPage() {
  const [activeTab, setActiveTab] = useState<string>('Our Partners');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLogo, setSelectedLogo] = useState<ParticipantItem | null>(null);

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    const raw = participantsData || [];
    return raw.filter(item => item.category === activeTab);
  }, [activeTab]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredItems.length / PARTICIPANTS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PARTICIPANTS_PER_PAGE;
    return filteredItems.slice(start, start + PARTICIPANTS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden select-none">
      
      {/* Background Architectural Grid Pattern */}
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

      {/* 1. Hero Section with Left-Foggy Background Image */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="GLOBAL NETWORK & ACCREDITATION" 
          title={
            <>
              Trusted By Industry Leaders, <br />
              <span className="font-serif italic font-normal text-neutral-400">
                Associations & Exhibitors
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Explore the prestigious network of corporate partners, supporting trade associations, participating manufacturers, and leading media organizations powering Futurex events." 
          backgroundImage="/gallery/pictures/exhibition/Nepal-Buildcon-2019.webp"
        />
      </div>

      {/* 2. Main Directory & Filter Section */}
      <section className="relative z-20 w-full py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Header & Single-Line Aligned Category Tabs */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto pb-12 sm:pb-16 border-b border-neutral-200/80 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
              <Sparkles size={12} className="text-red-600 animate-pulse" />
              <span>PARTICIPANT & PARTNER DIRECTORY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]">
              Collaboration Ecosystem<span className="text-red-600">.</span>
            </h2>

            <p className="mt-4 text-neutral-500 text-sm sm:text-base font-normal leading-[1.85] max-w-xl">
              Click on any organization logo below to view full-resolution corporate profiles and network archives.
            </p>

        {/* Single Line Aligned Category Tabs Container - Fixed */}
<div className="w-full overflow-x-auto pb-4 pt-8 scrollbar-none">
  <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 px-3 max-w-5xl mx-auto">
    {TABS.map((tab) => {
      const isSelected = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          type="button"
          className={`relative shrink-0 px-4 sm:px-6 py-3 rounded-full text-[11px] sm:text-xs font-mono tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
            isSelected
              ? "text-white font-medium shadow-md scale-105"
              : "text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-2xs"
          }`}
        >
          {isSelected && (
            <motion.div
              layoutId="activeParticipantTab"
              className="absolute inset-0 bg-[#0A0D12] rounded-full -z-10 shadow-xs"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
</div>
          </div>

          {/* Logo Grid Cards */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeTab}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7"
            >
              {paginatedItems.map((item, index) => (
                <motion.button 
                  key={item.id || index}
                  type="button"
                  variants={itemVariants}
                  onClick={() => setSelectedLogo(item)}
                  className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-2xs hover:shadow-xl p-6 flex flex-col items-center justify-center transition-all duration-400 ease-[0.16,1,0.3,1] cursor-zoom-in active:scale-[0.99]"
                >
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                      src={item.logo} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-contain p-4 filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
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
      </section>

      {/* 3. Fullscreen Lightbox Modal (Zoom Logo View) */}
      <AnimatePresence>
        {selectedLogo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLogo(null)}
              className="absolute inset-0 bg-[#050608]/90 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-neutral-950 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 bg-black/50">
                <div className="flex items-center gap-2.5">
                  <Building2 size={16} className="text-red-500" />
                  <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                    {selectedLogo.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedLogo.logo}
                    download="Futurex-Partner-Logo.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-red-600 text-neutral-900 hover:text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedLogo(null)}
                    aria-label="Close Lightbox"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[50vh] flex items-center justify-center p-8 bg-neutral-900/50">
                <Image
                  src={selectedLogo.logo}
                  alt={selectedLogo.name}
                  fill
                  sizes="100vw"
                  className="object-contain p-8"
                  priority
                />
              </div>

              <div className="p-5 bg-neutral-900 border-t border-white/10 text-center">
                <h3 className="text-white text-base font-medium tracking-wide">
                  {selectedLogo.name}
                </h3>
                <p className="text-neutral-400 text-xs font-mono mt-1 uppercase tracking-widest">
                  Verified Futurex Network Member
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. CTA Section */}
      <CTASection />

    </main>
  );
}