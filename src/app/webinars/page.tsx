'use client';

import React, { useState, useMemo } from 'react';
import { PageHero } from '@/components/hero/PageHero';
import { webinars } from '@/data/webinars';
import { CTASection } from '@/components/sections/CTASection';
import { createMetadata } from '@/lib/metadata';
import { Calendar, Video, Sparkles, Radio } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';

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

const YEARS = [
  { id: 'ALL', label: 'All Broadcasts' },
  { id: '2021', label: '2021' },
  { id: '2020', label: '2020' },
] as const;

export default function WebinarsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  // Filter webinars based on selected year safely
  const filteredWebinars = useMemo(() => {
    const raw = webinars || [];
    if (selectedYear === 'ALL') return raw;
    return raw.filter((item: any) => item.date?.includes(selectedYear));
  }, [selectedYear]);

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
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

      {/* 1. Page Hero */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="VIRTUAL PROGRAMMING & WEBINARS" 
          title={
            <>
              Live business experiences, <br />
              <span className="font-serif italic font-normal text-neutral-500">
                delivered online
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Futurex hosts high-impact webinars, masterclasses, and virtual platform programming connecting global professional audiences with industry leaders." 
          backgroundImage="/gallery/webinars/futurex-webinar-1.webp"
        />
      </div>

      {/* 2. Modern Architectural Webinar Grid with Year Filter Tabs */}
      <section className="relative z-20 w-full py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
                  <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                                        <Image
                                          src="/logos/svg/logo-arrow.png"
                                          alt="Icon"
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                <span>BROADCAST ARCHIVE </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-semibold tracking-[-0.03em] text-[#0A0D12] leading-[1.08]">
                Scheduled Programming<span className="text-red-600">.</span>
              </h2>
            </div>
            
            {/* Year Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {YEARS.map((tab) => {
                const isSelected = selectedYear === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedYear(tab.id)}
                    type="button"
                    className={`relative px-5 py-2.5 rounded-full text-xs font-mono tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'text-white font-medium shadow-md scale-105' 
                        : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200/90 hover:border-neutral-400 shadow-2xs'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeWebinarYearTab"
                        className="absolute inset-0 bg-[#0A0D12] rounded-full -z-10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Webinar Grid Cards */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedYear}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredWebinars.map((item: any, index: number) => {
                const seriesName = item.series || item.category || 'Virtual Stream';
                return (
                  <motion.div 
                    key={`${item.title}-${index}`}
                    variants={itemVariants}
                    className="group relative bg-white border border-neutral-200/90 hover:border-neutral-400 rounded-3xl p-7 sm:p-8 shadow-2xs hover:shadow-xl transition-all duration-400 ease-[0.16,1,0.3,1] flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Red Laser Hairline on Hover */}
                    <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/60 text-neutral-700 font-mono text-[10.5px] uppercase tracking-wider">
                          <Calendar size={13} className="text-red-600 shrink-0" />
                          <span>{item.date}</span>
                        </span>
                        
                        <span className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-700 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                          <Video size={14} />
                        </span>
                      </div>

                      {/* Series Badge */}
                      <div className="mb-2">
                        <span className="text-[10px] font-mono tracking-widest text-red-600 uppercase font-semibold">
                          {seriesName}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug mb-4 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Radio size={12} className="text-neutral-400" />
                        <span>Futurex Virtual Platform</span>
                      </span>
                      <span className="text-red-600 font-semibold group-hover:translate-x-1 transition-transform">Stream →</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 3. CTA Section */}
      <CTASection />

    </main>
  );
}