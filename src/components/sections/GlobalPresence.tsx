"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Building2, 
  Users2, 
  AlertTriangle, 
  Layers
} from 'lucide-react';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const strategicPillars = [
  {
    id: '01',
    icon: ShieldCheck,
    title: 'Government & Institutional Platforms',
    description: 'Structured execution aligned with administrative frameworks and authority protocols.'
  },
  {
    id: '02',
    icon: Building2,
    title: 'Trade Fairs, Exhibitions & Conferences',
    description: 'Complete ecosystem management from planning to closure.'
  },
  {
    id: '03',
    icon: Users2,
    title: 'Public-Facing & High-Footfall Environments',
    description: 'Safety, dignity, and visitor experience management at scale.'
  },
  {
    id: '04',
    icon: AlertTriangle,
    title: 'Emergency & Time-Critical Execution',
    description: 'Zero-panic response with contingency-driven preparedness.'
  },
  {
    id: '05',
    icon: Layers,
    title: 'Multi-Phase & Long-Duration Projects',
    description: 'Sustained operations with continuity and control.'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeEditorial,
    },
  },
};

export function GlobalPresence() {
  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] text-[#F3F4F6] py-20 sm:py-28 lg:py-32 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="strategic-positioning-heading"
    >
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Volumetric Ambient Glow */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ========================================================================= */}
        {/* HOMEPAGE COMPACT HEADER (HEADING + ACTION LINK) */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>STRATEGIC POSITIONING</span>
            </div>

            <h2 
              id="strategic-positioning-heading"
              className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] text-white leading-[1.08]"
            >
              Executive Summary & <br />
              <span className="font-serif italic font-normal text-neutral-400">Strategic Role</span>
              <span className="text-red-500 font-sans">.</span>
            </h2>

            <p className="mt-5 text-neutral-300 text-sm sm:text-base font-normal leading-[1.85] max-w-2xl">
              Futurex Group operates at the intersection of execution, infrastructure, public interface, and institutional coordination—delivering disciplined execution and zero-failure accountability across high-impact projects.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link
              href="/global-presence"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 text-xs font-mono tracking-[0.14em] uppercase text-neutral-300 hover:text-white transition-all duration-300 active:scale-95"
            >
              <span>Explore Full Profile</span>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        <div>
          <div className="pt-14 sm:pt-18 mb-10 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-500 block">
              OPERATIONAL DOMAINS
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              05 Core Pillars
            </span>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {strategicPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3, ease: easeEditorial } }}
                  className="group relative bg-white/[0.02] border border-white/[0.07] hover:border-red-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Red Top Laser Hairline Accent on Hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-red-400 transition-colors">
                         {pillar.id}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.02em] leading-snug mb-3 group-hover:text-red-400 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-neutral-400 font-normal leading-[1.8]">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-mono text-neutral-500 uppercase tracking-widest">
                    <span>MANDATE VERIFIED</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-red-500 transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default GlobalPresence;