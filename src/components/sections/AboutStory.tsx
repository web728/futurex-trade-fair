"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { 
  ArrowUpRight, 
  Globe2, 
  ShieldCheck, 
  Award, 
  Layers, 
  Briefcase,
  Compass
} from 'lucide-react';
import { company } from '@/data/company';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeEditorial },
  },
};

const blueprintPillars = [
  {
    index: '01',
    title: 'Platform Architecture',
    subtitle: 'B2B Trade Ecosystems',
    desc: 'Connecting industrial equipment makers with institutional trade buyers across South Asia & East Africa.',
    icon: Layers,
    accent: 'text-red-500',
    meta: '220+ Global Expos'
  },
  {
    index: '02',
    title: 'Cross-Border Execution',
    subtitle: 'Permanent Ground Desks',
    desc: 'Eliminating customs, logistics, and stall fabrication friction via active offices in 5 key capital hubs.',
    icon: Globe2,
    accent: 'text-sky-400',
    meta: '5 Regional Hubs'
  },
  {
    index: '03',
    title: 'Institutional Governance',
    subtitle: 'Audited Trade Standards',
    desc: 'Operating strictly under verified international exhibition guidelines with certified buyer demographics.',
    icon: ShieldCheck,
    accent: 'text-emerald-400',
    meta: 'CIEO Accredited'
  },
  {
    index: '04',
    title: 'Capital Sourcing',
    subtitle: 'Procurement Platforms',
    desc: 'Focused on high-growth sectors: Woodtech, Packaging, Clean Energy, Infra, Agro, and Pharma Machinery.',
    icon: Briefcase,
    accent: 'text-amber-400',
    meta: '1.2M+ Trade Visitors'
  }
];

export function AboutStory() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] text-[#F3F4F6] py-16 sm:py-20 lg:py-24 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="about-blueprint-heading"
    >
      {/* ========================================================================= */}
      {/* 1. STATIC CORNER ARCHITECTURAL RADIAN BEACON (NO ROTATION, CRISP CONTRAST) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        
        {/* Soft Controlled Red Ambient Glow focused behind corner beacon */}
        <div className="absolute -top-16 -right-16 w-[480px] h-[480px] bg-red-600/[0.12] rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 left-10 w-[380px] h-[380px] bg-blue-600/[0.05] rounded-full blur-[130px]" />

        {/* Static Corner Architectural Vector Arc */}
        <svg 
          viewBox="0 0 500 500" 
          className="absolute top-0 right-0 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] opacity-[0.42]"
          aria-hidden="true"
        >
          {/* Concentric Quarter Arcs radiating from Top-Right (500, 0) */}
          <path d="M 500,100 A 400,400 0 0,0 100,500" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <path d="M 500,180 A 320,320 0 0,0 180,500" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="4 8" />
          <path d="M 500,260 A 240,240 0 0,0 260,500" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="6 10" />
          <path d="M 500,340 A 160,160 0 0,0 340,500" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <path d="M 500,420 A 80,80 0 0,0 420,500" fill="none" stroke="#dc2626" strokeWidth="1.2" strokeOpacity="0.7" />

          {/* Precision Angular Radial Rays from origin (500, 0) */}
          <line x1="500" y1="0" x2="160" y2="460" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2 6" />
          <line x1="500" y1="0" x2="280" y2="490" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2 6" />
          <line x1="500" y1="0" x2="400" y2="500" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <line x1="500" y1="0" x2="100" y2="350" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

          {/* Anchor Node Marker Points on Arcs */}
          <circle cx="260" cy="500" r="3.5" fill="#dc2626" />
          <circle cx="340" cy="500" r="2.5" fill="#ffffff" />
          <circle cx="330" cy="270" r="3" fill="#ffffff" />
          <circle cx="410" cy="180" r="3.5" fill="#dc2626" />
        </svg>

        {/* Falloff Contrast Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/40" />
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION HEADER */}
      {/* ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 sm:pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-3">
              <Compass className="w-3.5 h-3.5 text-red-500" />
              <span>Futurex Group • Est. 2011 • New Delhi</span>
            </div>

            <h2 
              id="about-blueprint-heading"
              className="text-2xl sm:text-4xl lg:text-[46px] font-semibold tracking-[-0.035em] text-white leading-[1.1]"
            >
              The Architecture Behind <br />
              <span className="text-neutral-400 font-normal">220+ International Trade Fairs.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
               href="/documents/futurex-group-company-profile.pdf"
              target="_blank"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-all duration-300 active:scale-95"
            >
              <span>Company Profile</span>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. 4-PILLAR MATRIX & VISUAL COMMAND ANCHOR */}
        {/* ========================================================================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mt-8 sm:mt-10 items-stretch"
        >
          {/* Left Column: 4 Strategic Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {blueprintPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;

              return (
                <motion.div
                  key={pillar.index}
                  variants={itemVariants}
                  onMouseEnter={() => setActivePillar(idx)}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: easeEditorial } }}
                  className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-default backdrop-blur-md ${
                    isActive 
                      ? 'bg-white/[0.04] border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
                      : 'bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.14]'
                  }`}
                >
                  {/* Subtle Red Left Marker */}
                  <span 
                    className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-300 ${
                      isActive ? 'bg-red-500 scale-y-100' : 'bg-transparent scale-y-0'
                    }`}
                  />

                  <div>
                    {/* Index & Pillar Icon */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-[10.5px] tracking-widest text-neutral-400 font-medium">
                        PILLAR {pillar.index}
                      </span>
                      <div className={`p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] ${pillar.accent}`}>
                        <Icon size={15} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors duration-200">
                      {pillar.title}
                    </h3>

                    <span className="block text-[10px] font-mono text-neutral-400 mt-0.5 uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>

                    <p className="mt-2.5 text-xs text-neutral-400 font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Micro Metric Tag */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] font-mono">
                    <span className="text-neutral-500">Metric</span>
                    <span className="text-neutral-200 font-medium">{pillar.meta}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Central Institutional Command Anchor */}
          <motion.div 
            variants={itemVariants}
            className="group/card lg:col-span-5 relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl backdrop-blur-xl transition-all duration-300"
          >
            {/* Top Red Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 group-hover/card:shadow-[0_0_12px_rgba(220,38,38,0.7)] transition-all duration-300" />

          {/* Inner Blueprint Graphic Preview with Image Hover Zoom */}
<div>
  <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden bg-neutral-900 mb-5 border border-white/[0.08]">
    <Image
      src="/gallery/images-event/slider/about.png"
      alt="Futurex Trade Fair and Events"
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="object-cover object-center brightness-[0.75] contrast-[1.15] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover/card:scale-105 group-hover/card:brightness-[0.85]"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent" />

    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9.5px] font-mono text-white">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span>HQ: Kalkaji, New Delhi</span>
    </div>

   
  </div>

  {/* Verified Legal Identity */}
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Award size={15} className="text-red-500 shrink-0" />

      <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider font-semibold">
        CIEO Accredited Organizer
      </span>
    </div>

    <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug">
      Futurex Trade Fair and Events Private Limited
    </h4>

    <p className="text-xs text-neutral-400 font-normal leading-relaxed">
      Incorporated in 2011 to bridge global equipment manufacturers with
      verified enterprise buyers across Asia&apos;s key industrial sectors.
    </p>
  </div>
</div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <span className="text-[10.5px] font-mono text-neutral-400">
                15+ Years Commercial Leadership
              </span>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium tracking-wider uppercase rounded-full transition-all duration-300 shadow-[0_0_18px_rgba(220,38,38,0.28)] hover:shadow-[0_0_24px_rgba(220,38,38,0.45)] active:scale-95 shrink-0"
              >
                <span>Read Story</span>
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default AboutStory;