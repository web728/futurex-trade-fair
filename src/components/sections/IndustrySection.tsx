"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import { IndustryGrid } from '@/components/industries/IndustryGrid';
import Image from 'next/image';

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
            {/* Headline & Badge */}
                     <div className="max-w-2xl">
                       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-700 mb-3.5 shadow-2xs">
                     
                             <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                                         <Image
                                           src="/logos/svg/logo-arrow.png"
                                           alt="Icon"
                                           fill
                                           className="object-contain"
                                         />
                                       </div>
                         <span className="font-semibold text-neutral-800">Industries</span>
                       </div>
           
                   <h2
             id="upcoming-events-title"
             className="text-3xl sm:text-5xl lg:text-[50px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
           >
             <span className="whitespace-nowrap">
              The Industries Behind Our
             </span>
             <br />
             <span className="font-serif italic font-normal text-neutral-500">
               Exhibition Portfolio.
             </span>
           </h2>
                     </div>

         

            <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
              Futurex Group’s exhibitions are shaped around that—bringing together the products, buyers, suppliers and industry networks that matter in each sector.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link
              href="/industries"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-white hover:bg-[#0A0D12]
                         border border-neutral-300 hover:border-[#0A0D12]
                         text-xs font-mono tracking-wider uppercase
                         transition-all duration-300
                         shadow-2xs hover:shadow-md
                         active:scale-95"
            >
              <span className="text-neutral-800 transition-colors duration-300 group-hover:text-white">
                VIEW ALL INDUSTRIES
              </span>

              <ArrowUpRight
                size={14}
                className="text-neutral-400 transition-all duration-300
                           group-hover:text-white
                           group-hover:translate-x-0.5
                           group-hover:-translate-y-0.5"
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