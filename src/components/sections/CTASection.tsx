"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CTASection() {
  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] text-white py-20 sm:py-24 lg:py-28 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="cta-heading"
    >
      {/* Ambient Red Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-red-600/[0.12] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center z-10">
        
        {/* Micro Live Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeEditorial }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-6"
        >
         <div className="relative w-3.5 h-3.5 flex items-center justify-center">
               <Image
                 src="/logos/svg/logo-arrow-white.png"
                 alt="Icon"
                 fill
                 className="object-contain"
               />
             </div>
          <span>Exhibitor Registrations 2026 — 2027</span>
        </motion.div>

        {/* Big Crisp Editorial Heading */}
        <motion.h2 
          id="cta-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05, ease: easeEditorial }}
          className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.08] mb-5"
        >
          Put your business where <br />
          <span className="font-serif italic font-normal text-neutral-400">global trade transpires</span>
          <span className="text-red-500 font-sans">.</span>
        </motion.h2>

        {/* 1 Short Clean Sentence */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeEditorial }}
          className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10"
        >
          Connect with high-intent buyers, secure country pavilion space, and expand across South Asia & East Africa.
        </motion.p>

        {/* 2 Clean Magnetic Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeEditorial }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
        >
          <Link
            href="/participants#exhibitor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(220,38,38,0.35)] hover:shadow-[0_0_32px_rgba(220,38,38,0.5)] active:scale-95"
          >
            <span>Book Your Stall</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.1] hover:border-white/20 text-xs font-mono tracking-wider uppercase rounded-full transition-all duration-300 active:scale-95"
          >
            <span>Contact Desk</span>
            <ArrowUpRight size={14} className="text-neutral-400" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default CTASection;