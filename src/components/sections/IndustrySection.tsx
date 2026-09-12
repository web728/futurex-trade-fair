"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import { IndustryGrid } from '@/components/industries/IndustryGrid';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeEditorial }
  }
};

export function IndustrySection() {
  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="industries-section-heading"
    >
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* Editorial Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-neutral-200"
        >
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-neutral-200/90 text-[11px] font-mono tracking-widest uppercase text-neutral-600 mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>Core Industry Portfolios</span>
            </div>

            <h2 
              id="industries-section-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
            >
              Focused Sectors. <br />
              <span className="text-neutral-500 font-normal">Direct Commercial Sourcing.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
              Futurex conceptualizes and executes large-scale B2B trade platforms across specialized industrial verticals, connecting global equipment manufacturers with institutional trade buyers.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link 
              href="/industries" 
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#0A0D12] border border-neutral-300 hover:border-[#0A0D12] text-xs font-mono tracking-wider uppercase text-neutral-800 hover:text-white transition-all duration-300 shadow-2xs active:scale-95"
            >
              <span>Explore All Sectors</span>
              <ArrowUpRight 
                size={14} 
                className="text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              />
            </Link>
          </div>
        </motion.div>

        {/* Dynamic Industry Grid with Stagger */}
        <div className="mt-10 sm:mt-12">
          <IndustryGrid industries={industries?.slice(0, 6) || []} />
        </div>

      </div>
    </section>
  );
}

export default IndustrySection;