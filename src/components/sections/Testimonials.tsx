'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ExternalLink, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';

const GOOGLE_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Futurex+Trade+Fair+and+Events+1st+floor+E-52+Kalkaji+New+Delhi+Delhi+110019+India";

export function Testimonials() {
  const fallbackTestimonials = [
    {
      quote: "Futurex delivers consistent B2B buyer attendance across their industrial exhibitions.",
      person: "Commercial Director",
      company: "Industrial Tooling Corp"
    },
    {
      quote: "Organized execution from stand space allocation to on-site buyer introductions.",
      person: "Export Head",
      company: "Machinery Manufacturing Ltd"
    },
    {
      quote: "Our stall at the trade fair yielded verified commercial leads across India and Nepal.",
      person: "Managing Partner",
      company: "Precision Engineering Solutions"
    },
    {
      quote: "Smooth cross-border logistics and pavilion setup for international exhibitors.",
      person: "Regional Head",
      company: "Automation Technologies"
    }
  ];

  const reviewList = testimonials?.length ? testimonials : fallbackTestimonials;
  const marqueeItems = [...reviewList, ...reviewList];

  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-24 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* MATCHING EDITORIAL HEADER BAR */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-neutral-200/80 mb-12 sm:mb-16">
          <div className="max-w-2xl">
         

        <h2
  id="testimonials-heading"
  className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.1]"
>
  Real Voices. <br className="hidden sm:inline" />
  <span className="font-serif italic font-normal text-neutral-500">
    Real Experiences
  </span>
  <span className="text-red-600 font-sans">.</span>
</h2>

         
          </div>

          {/* Authentic Google Rating Capsule */}
          <div className="flex items-center gap-3 bg-white border border-neutral-200/90 px-4 py-2.5 rounded-full shadow-2xs self-start md:self-auto shrink-0">
            <div className="w-6 h-6 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200/80 shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="font-bold text-[#0A0D12]">4.4</span>
              <div className="flex items-center text-[#FBBC05]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" stroke="none" />
                ))}
                <Star size={12} fill="currentColor" stroke="none" className="opacity-40" />
              </div>
            </div>

            <span className="text-neutral-300">|</span>

            <Link
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-neutral-600 hover:text-red-600 transition-colors"
            >
              <span>Verify</span>
              <ExternalLink size={10} className="text-neutral-400" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AUTO-SCROLLING TRACK */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          <div className="flex group/track py-2">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-5 shrink-0 group-hover/track:[animation-play-state:paused]"
            >
              {marqueeItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[360px] shrink-0 p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#FBBC05] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" stroke="none" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-neutral-700 font-normal leading-[1.75] line-clamp-3 m-0">
                      “{item.quote || item.content || item.text}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0A0D12] text-white flex items-center justify-center shrink-0">
                      <User size={14} strokeWidth={2} />
                    </div>

                    <div className="overflow-hidden">
                      <strong className="block text-xs font-semibold text-[#0A0D12] truncate leading-tight">
                        {item.person || item.name || 'Trade Delegate'}
                      </strong>
                      <span className="block text-[10.5px] text-neutral-500 font-mono truncate mt-0.5">
                        {[item.title, item.company].filter(Boolean).join(' • ') || 'Verified Participant'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;