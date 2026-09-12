"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  Globe2,
  CheckCircle2,
  HeartHandshake,
  Clock,
  Flame
} from 'lucide-react';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
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

interface PillarsSectionProps {
  visionText?: string;
}

export function PillarsSection({ visionText }: PillarsSectionProps) {
  return (
    <section 
      className="relative z-20 w-full bg-[#050608] text-[#F3F4F6] py-16 sm:py-20 lg:py-24 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="pillars-heading"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VOLUMETRIC RED FOG & HORIZON LASER */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[260px] bg-red-600/[0.14] rounded-full blur-[140px]" />
        <div className="absolute -top-10 left-1/4 w-[380px] h-[180px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#050608]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ========================================================================= */}
        {/* 2. ELEVATED EDITORIAL HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08] mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-mono tracking-widest uppercase text-neutral-300 mb-4 backdrop-blur-md shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>CORE STRATEGY & FOUNDATION</span>
              <span className="w-1 h-1 rounded-full bg-red-500" />
            </div>

            <h3 
              id="pillars-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.04em] text-white leading-[1.08]"
            >
              Purpose, Vision & <br />
              <span className="font-serif italic font-normal text-neutral-400">
                Institutional Doctrine
              </span>
              <span className="text-red-500 font-sans">.</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 text-xs font-mono text-neutral-400 self-start lg:self-auto">
            <span className="text-white font-medium">ESTABLISHED 2011 • MULTI-REGIONAL</span>
            <span className="text-[11px] text-neutral-500">OPERATIONAL CHARTER // SAARC & AFRICA</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THREE-COLUMN ARCHITECTURAL MONOLITHS */}
        {/* ========================================================================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          
          {/* ======================= PILLAR 1: MISSION ======================= */}
          <motion.article 
            variants={cardVariants}
            className="group relative flex flex-col justify-between h-full bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl p-7 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden backdrop-blur-xl"
          >
            {/* Medium Static Blueprint Vector (Right Corner) */}
            <svg 
              className="absolute right-2 bottom-2 w-40 h-40 text-white/[0.05] group-hover:text-red-500/[0.12] transition-colors duration-400 pointer-events-none"
              viewBox="0 0 160 160" 
              fill="none"
              aria-hidden="true"
            >
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" />
              <circle cx="80" cy="80" r="44" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="150" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="1" />
              <circle cx="80" cy="80" r="3.5" fill="#dc2626" />
            </svg>

            {/* Top Red Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  <Target size={18} />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  EXECUTION MANDATE
                </span>
              </div>

              <span className="text-[10.5px] font-mono tracking-widest uppercase text-red-500 block mb-1.5 font-semibold">
                OUR MISSION
              </span>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-4 group-hover:text-red-400 transition-colors">
                Catalyzing Regional Trade
              </h3>

              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Futurex strives to excel in high-quality service delivery through trust, commitment, and perseverance across specialized trade exhibitions.
              </p>

              {/* Exact User Mission Points */}
              <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] p-0 m-0 list-none">
                {[
                  "Increase existing show standards and develop new shows according to demand.",
                  "Create business cooperation networking for commercial opportunities.",
                  "Expand our masterpiece shows around the region.",
                  "Organize the largest number of specialized trade fairs for promising industries.",
                  "Provide visitors with in-depth information about fields they are interested in."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[12px] text-neutral-300 font-normal leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span>OPERATIONAL CORE</span>
              <ArrowUpRight size={13} className="text-red-500" />
            </div>
          </motion.article>

          {/* ======================= PILLAR 2: VISION (FEATURED CENTER) ======================= */}
          <motion.article 
            variants={cardVariants}
            className="group relative flex flex-col justify-between h-full bg-gradient-to-b from-red-600/[0.09] to-white/[0.02] border border-red-500/30 hover:border-red-500/60 rounded-3xl p-7 sm:p-8 transition-all duration-300 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Medium Static Blueprint Vector (Right Corner) */}
            <svg 
              className="absolute right-2 bottom-2 w-44 h-44 text-red-500/[0.1] pointer-events-none" 
              viewBox="0 0 160 160" 
              fill="none"
              aria-hidden="true"
            >
              <rect x="25" y="25" width="110" height="110" rx="14" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="80" cy="80" r="38" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="15" x2="80" y2="145" stroke="currentColor" strokeWidth="1.2" />
              <line x1="15" y1="80" x2="145" y2="80" stroke="currentColor" strokeWidth="1.2" />
            </svg>

            {/* Permanent Top Red Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-[0_0_16px_rgba(220,38,38,0.5)]">
                  <Compass size={19} />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-red-300 uppercase">
                  PINNACLE DIRECTION
                </span>
              </div>

              <span className="text-[10.5px] font-mono tracking-widest uppercase text-red-400 block mb-1.5 font-semibold">
                OUR VISION
              </span>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">
                The Pinnacle B2B Platform
              </h3>

              <p className="text-xs sm:text-[13px] text-neutral-200 leading-[1.8] mb-5 font-normal">
                {visionText || "Exhibitions transcend mere spectacle; their true value lies in uniting like-minded business entities under exacting global standards. We lay the groundwork for effective business development, meaningful consumer engagement, seamless execution, and industry knowledge."}
              </p>

              {/* Exact Strategic Aims Capsule */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md mb-4">
                <div className="flex items-center gap-2 text-white font-mono text-[11px] mb-2">
                  <Globe2 size={13} className="text-red-500" />
                  <span className="uppercase tracking-wider">STRATEGIC AIMS SPECTRUM</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
                  <span>• Enhanced Networking</span>
                  <span>• Elevated Brand Visibility</span>
                  <span>• In-depth Insights</span>
                  <span>• Cost-Effective Guidance</span>
                  <span>• Instant Deal Closing</span>
                  <span>• Expansive Product Floor</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="tracking-wider">LONG RANGE HORIZON</span>
              <Sparkles size={13} className="text-red-500" />
            </div>
          </motion.article>

          {/* ======================= PILLAR 3: VALUES ======================= */}
          <motion.article 
            variants={cardVariants}
            className="group relative flex flex-col justify-between h-full bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl p-7 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden backdrop-blur-xl"
          >
            {/* Medium Static Blueprint Vector (Right Corner) */}
            <svg 
              className="absolute right-2 bottom-2 w-40 h-40 text-white/[0.05] group-hover:text-red-500/[0.12] transition-colors duration-400 pointer-events-none" 
              viewBox="0 0 160 160" 
              fill="none"
              aria-hidden="true"
            >
              <polygon points="80,20 140,135 20,135" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="80" cy="95" r="26" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="20" x2="80" y2="135" stroke="currentColor" strokeWidth="0.8" />
            </svg>

            {/* Top Red Laser Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  ETHICAL CODE
                </span>
              </div>

              <span className="text-[10.5px] font-mono tracking-widest uppercase text-red-500 block mb-1.5 font-semibold">
                OUR VALUES
              </span>

              <h3 className="text-xl font-semibold text-white tracking-tight mb-4 group-hover:text-red-400 transition-colors">
                Uncompromising Governance
              </h3>

              {/* Exact User Values (All 4 Preserved) */}
              <div className="space-y-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="block text-xs font-semibold text-white mb-0.5">
                    Business Ethics
                  </strong>
                  <p className="text-[11px] text-neutral-400 leading-relaxed m-0">
                    We seek to build a green image; our production processes are socially responsible.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="block text-xs font-semibold text-white mb-0.5">
                    Respect
                  </strong>
                  <p className="text-[11px] text-neutral-400 leading-relaxed m-0">
                    We respect our clients wishes and comply with them to bring about the highest satisfaction.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="block text-xs font-semibold text-white mb-0.5">
                    Integrity
                  </strong>
                  <p className="text-[11px] text-neutral-400 leading-relaxed m-0">
                    We commit ourselves to work with utmost sincerity and dedicate ourselves wholeheartedly.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="block text-xs font-semibold text-white mb-0.5">
                    Reliability
                  </strong>
                  <p className="text-[11px] text-neutral-400 leading-relaxed m-0">
                    We are flexible and we set clear deadlines, meeting them with precision.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span>AUDITED PRINCIPLES</span>
              <ArrowUpRight size={13} className="text-red-500" />
            </div>
          </motion.article>

        </motion.div>

      </div>
    </section>
  );
}

export default PillarsSection;