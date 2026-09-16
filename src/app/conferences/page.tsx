'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, ArrowUpRight, Calendar, Sparkles, Layers } from 'lucide-react';
import { PageHero } from '@/components/hero/PageHero';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { conferences } from '@/data/conferences';
import { createMetadata } from '@/lib/metadata';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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

export default function ConferencesPage() {
  const safeConferences = conferences || [];

  // Helper to extract year from date string
  const getYear = (dateStr: string) => {
    const match = dateStr?.match(/\d{4}/);
    return match ? match[0] : '2026';
  };

  // Get unique sorted years descending (e.g. 2024, 2023, 2022...)
  const availableYears = useMemo(() => {
    const yearsSet = new Set(safeConferences.map(item => getYear(item.date)));
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, [safeConferences]);

  // Default selected year is the latest year
  const [selectedYear, setSelectedYear] = useState<string>(availableYears[0] || '2024');

  // Filter conferences based on selected year tab
  const filteredConferences = useMemo(() => {
    return safeConferences.filter(item => getYear(item.date) === selectedYear);
  }, [safeConferences, selectedYear]);

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden select-none">
      
      {/* Architectural Background SVGs */}
      <div className="absolute top-32 left-8 pointer-events-none opacity-[0.08] z-0 hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="110" cy="110" r="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="110" y1="0" x2="110" y2="220" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="110" cy="110" r="6" fill="#dc2626" />
        </svg>
      </div>

      <div className="absolute top-[48%] right-10 pointer-events-none opacity-[0.08] z-0 hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          <rect x="20" y="20" width="200" height="200" rx="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="120" cy="120" r="65" stroke="currentColor" strokeWidth="1.5" />
          <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 1. Editorial Page Hero with Background Image */}
      <div className="relative z-10 border-b border-neutral-200/80">
        <PageHero 
          eyebrow="CONFERENCE PLATFORMS & SUMMITS" 
          title={
            <>
              Knowledge Shared In <br />
              <span className="font-serif italic font-normal text-neutral-400">
                Focused Business Settings
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Futurex conferences bring expert presentations, high-level professional discussions, and EV industry exchange into concise, elite formats." 
          backgroundImage="/gallery/pictures/conference/Futurex-Conference1.webp"
        />
      </div>

      {/* 2. Platform Overview Section with Perfect Alignment */}
      <section className="relative z-20 py-20 sm:py-28 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-5 shadow-2xs">
                <Sparkles size={13} className="text-red-600 animate-pulse" />
                <span>EXCHANGE FORMAT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-[#0A0D12] leading-[1.12]">
                Concise Presentations.
                <br />
                <span className="font-serif italic font-normal text-neutral-500">
                  Relevant Dialogue
                </span>
                <span className="text-red-600 font-sans">.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start space-y-7">
              <p className="text-neutral-600 text-sm sm:text-base font-normal leading-[1.85] max-w-2xl">
                Futurex’s conference portfolio—featuring landmark events like{" "}
                <strong className="text-neutral-950 font-semibold">EV Dynamics</strong> across Chennai and Pune—is built around expert keynote presentations followed by structured roundtable discussions, emphasizing practical industry knowledge exchange.
              </p>

              <div>
                <Button
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 rounded-full bg-[#0A0D12] !text-white border border-[#0A0D12] text-xs font-mono font-medium tracking-[0.14em] uppercase shadow-[0_8px_25px_rgba(10,13,18,0.15)] transition-all duration-500 hover:bg-red-600 hover:border-red-600 hover:shadow-[0_10px_30px_rgba(220,38,38,0.22)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[120%]" />
                  <span className="relative z-10">Plan A Conference</span>
                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/15 transition-all duration-300 group-hover:bg-white group-hover:text-red-600 group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </span>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Conferences Ledger with Top Year Selection Tabs */}
      <section className="relative z-20 py-20 sm:py-32 bg-[#FBFBFD] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Header & Top Year Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-neutral-200/80 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-3 shadow-2xs">
                <Layers size={13} className="text-red-600" />
                <span>CHRONOLOGICAL SUMMITS CATALOG ({filteredConferences.length} SESSIONS)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-[-0.035em] text-[#0A0D12]">
                Conferences By <br />
                <span className="font-serif italic font-normal text-neutral-500">Operational Year</span>
                <span className="text-red-600 font-sans">.</span>
              </h2>
            </div>

            {/* Interactive Year Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {availableYears.map((year) => {
                const isSelected = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    type="button"
                    className={`relative px-6 py-2.5 rounded-full text-xs font-mono tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'text-white font-medium shadow-md scale-105' 
                        : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-2xs'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeConferenceYearTab"
                        className="absolute inset-0 bg-[#0A0D12] rounded-full -z-10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>YEAR {year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid for Selected Year */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedYear}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredConferences.map((item, index) => {
                const formattedIndex = String(index + 1).padStart(2, '0');
                return (
                  <motion.article 
                    key={`${item.title}-${item.date}-${index}`}
                    variants={itemVariants}
                    className="group relative bg-white border border-neutral-200/90 hover:border-neutral-400 rounded-3xl p-7 sm:p-8 shadow-2xs hover:shadow-xl transition-all duration-400 ease-[0.16,1,0.3,1] flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Red Laser Hairline Accent on Hover */}
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-red-600 transition-colors">
                          {selectedYear} / {formattedIndex}
                        </span>
                        <span className="px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-[10px] font-mono uppercase tracking-wider">
                          {item.series || 'EV Dynamics'}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-[#0A0D12] mb-3 tracking-tight group-hover:text-red-600 transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-neutral-700 font-medium">
                        <Calendar size={13} className="text-red-600" />
                        <span>{item.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-neutral-500 font-mono text-[11px]">
                        <MapPin size={13} className="text-neutral-400" />
                        <span>{item.city}, {item.region}</span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection />

    </main>
  );
}