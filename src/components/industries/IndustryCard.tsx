"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import type { Industry } from '@/types/content';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: easeEditorial } 
  }
};

export function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div 
      variants={cardItemVariants} 
      whileHover={{ y: -5, transition: { duration: 0.3, ease: easeEditorial } }}
      className="h-full"
    >
      <Link 
        href={`/industries/${industry.slug}`} 
        className="group relative flex flex-col justify-between h-full bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-xl overflow-hidden select-none"
      >
        {/* Laser Red Hairline Reveal on Hover */}
        <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

        <div>
          {/* Card Top Metadata */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-red-600 transition-colors duration-200">
              {formattedIndex}
            </span>

            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 shadow-2xs">
              <ArrowUpRight 
                size={14} 
                aria-hidden="true" 
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              />
            </div>
          </div>

          {/* Industry Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug mb-3 group-hover:text-red-600 transition-colors duration-200">
            {industry.name}
          </h3>

          {/* Industry Description with Open Line Height */}
          <p className="text-xs sm:text-[13.5px] text-neutral-500 font-normal leading-[1.75] line-clamp-3 mb-8">
            {industry.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="tracking-wide uppercase">Explore Exhibitions</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-red-600 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

export default IndustryCard;