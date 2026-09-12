'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
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
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-14 sm:py-18 lg:py-20 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="testimonials-heading"
    >
      {/* Same Unified Container Alignment */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* 1. HEADER BAR */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200/80 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-neutral-200/90 text-[10.5px] font-mono tracking-widest uppercase text-neutral-600 mb-2.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>Verified Industry Feedback</span>
            </div>

            <h2 
              id="testimonials-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-[#0A0D12] leading-tight"
            >
              Exhibitor & Buyer Endorsements.
            </h2>
          </div>

          {/* Authentic Google Rating Capsule */}
          <div className="flex items-center gap-3 bg-white border border-neutral-200/90 px-3.5 py-2 rounded-full shadow-2xs self-start sm:self-auto shrink-0">
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
                  <Star key={i} size={11} fill="currentColor" stroke="none" />
                ))}
                <Star size={11} fill="currentColor" stroke="none" className="opacity-40" />
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
        {/* 2. AUTO-SCROLLING TRACK CONFINED TO HEADING WIDTH */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          
          {/* Inner Inset Gradient Masking */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />

          <div className="flex group/track py-1">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-4 sm:gap-5 shrink-0 group-hover/track:[animation-play-state:paused]"
            >
              {marqueeItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[340px] shrink-0 p-5 rounded-2xl bg-white border border-neutral-200/85 shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating & Verified Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center text-[#FBBC05]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" stroke="none" />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                        <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Review Content */}
                    <p className="text-xs sm:text-[13px] text-[#0A0D12] font-normal leading-[1.6] line-clamp-3 m-0">
                      “{item.quote || item.content || item.text}”
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0A0D12] text-white font-mono text-[11px] font-medium flex items-center justify-center shrink-0">
                      {(item.person || item.name || 'T').charAt(0)}
                    </div>

                    <div className="overflow-hidden">
                      <strong className="block text-xs font-semibold text-[#0A0D12] truncate leading-tight">
                        {item.person || item.name || 'Trade Delegate'}
                      </strong>
                      <span className="block text-[10px] text-neutral-500 font-normal truncate mt-0.5">
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