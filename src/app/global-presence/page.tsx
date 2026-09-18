"use client";

import React from 'react';
import type { Metadata } from 'next';
import { motion, type Variants } from 'framer-motion';
import { PageHero } from '@/components/hero/PageHero';
import { GlobalPresence } from '@/components/sections/GlobalPresence';
import { StatsSection } from '@/components/sections/StatsSection';
import { CTASection } from '@/components/sections/CTASection';
import { markets } from '@/data/locations';
import { Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: easeEditorial } 
  }
};

export default function GlobalPresencePage() {
  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* MEDIUM STATIC ARCHITECTURAL SVGs (ZIGZAG CORNER ANCHORS) */}
      {/* ========================================================================= */}
      {/* Top Right Medium SVG */}
      <div className="absolute top-20 right-8 pointer-events-none opacity-[0.05] z-0 hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 6" />
          <circle cx="120" cy="120" r="60" stroke="currentColor" strokeWidth="1.2" />
          <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="120" cy="120" r="5" fill="#dc2626" />
        </svg>
      </div>

      {/* Mid Left Medium SVG */}
      <div className="absolute top-[52%] left-8 pointer-events-none opacity-[0.05] z-0 hidden lg:block">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
          <rect x="25" y="25" width="210" height="210" rx="20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 6" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="1.2" />
          <line x1="130" y1="10" x2="130" y2="250" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 1. EDITORIAL PAGE HERO */}
      {/* ========================================================================= */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="GLOBAL PRESENCE" 
          title={
            <>
              Markets Connected <br />
              <span className="font-serif italic font-normal text-neutral-500">
                By Opportunity
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Futurex’s exhibition portfolio spans premier industrial hubs across South Asia and East Africa." 
        />
      </div>

    
     {/* ========================================================================= */}
      {/* 3. REPRESENTED MARKETS GRID SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-20 py-20 sm:py-28 lg:py-32 bg-[#FBFBFD] border-t border-neutral-200/80 overflow-hidden select-none">
        
        {/* Ambient Subtle Volumetric Mist */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
          
          {/* Elevated Swiss Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-neutral-200/80 mb-14 sm:mb-18">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
           <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                          <Image
                            src="/logos/svg/logo-arrow.png"
                            alt="Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                <span>Regional Command Matrix</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]">
                Strategic Commercial <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-neutral-500">Corridors & Markets</span>
                <span className="text-red-600 font-sans">.</span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-neutral-600 font-normal leading-[1.85] max-w-xl">
                Established sovereign gateways and economic hubs connected seamlessly through Futurex high-density trade fair infrastructures.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.16em] uppercase">OPERATIONAL TERRITORIES</span>
              <span className="font-mono text-sm font-semibold text-[#0A0D12] mt-0.5">SOUTH ASIA & EAST AFRICA</span>
            </div>
          </div>

          {/* Grid Layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
          >
            {markets.map((market, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <motion.article 
                  key={market.code || index}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.35, ease: easeEditorial } }}
                  className="group relative bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl p-7 sm:p-8 shadow-2xs hover:shadow-2xl transition-all duration-400 ease-[0.16,1,0.3,1] flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Red Laser Hairline Accent on Hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-red-600 transition-colors tracking-wider">
                         {formattedIndex}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 shadow-2xs">
                        <Globe size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-[22px] font-semibold text-[#0A0D12] mb-3 tracking-[-0.02em] group-hover:text-red-600 transition-colors">
                      {market.name}
                    </h3>
                    
                    <p className="text-xs sm:text-[13.5px] text-neutral-500 font-normal leading-[1.75]">
                      Active economic territory represented in the Futurex international trade exhibition portfolio.
                    </p>
                  </div>

                  <div className="pt-5 mt-8 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-[10.5px] font-mono font-bold tracking-[0.16em] uppercase text-neutral-400 group-hover:text-neutral-700 transition-colors">
                      GATEWAY STATUS: ACTIVE
                    </span>
                    <div className="w-7 h-7 rounded-full bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-neutral-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                      <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>


        {/* ========================================================================= */}
      {/* 2. TACTICAL GLOBAL COMMAND CONSOLE */}
      {/* ========================================================================= */}
      <GlobalPresence />



      {/* ========================================================================= */}
      {/* 5. CTA FOOTER SECTION */}
      {/* ========================================================================= */}
      <CTASection />

    </main>
  );
}