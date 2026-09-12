"use client";

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Globe2, MapPin } from 'lucide-react';

interface Hub {
  code: string;
  city: string;
  country: string;
  role: string;
  metrics: string;
  address: string;
  keySectors: string[];
}

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const hubs: Hub[] = [
  {
    code: 'DEL',
    city: 'New Delhi',
    country: 'India',
    role: 'Global Headquarters',
    metrics: '14+ Annual Expos • 420K+ Buyers',
    address: 'E-52, 1st Floor, Kalkaji, New Delhi 110019',
    keySectors: ['Print & Packaging', 'Woodtech', 'Healthcare']
  },
  {
    code: 'BOM',
    city: 'Mumbai',
    country: 'India',
    role: 'Western Commercial Base',
    metrics: '8+ Annual Expos • 180K+ Buyers',
    address: 'Nesco & CIDCO Industrial Corridors',
    keySectors: ['Engineering', 'Automation', 'Plastics']
  },
  {
    code: 'DAC',
    city: 'Dhaka',
    country: 'Bangladesh',
    role: 'Regional Gateway Hub',
    metrics: '6+ Annual Expos • 140K+ Buyers',
    address: 'ICCB & BICC Trade Complexes',
    keySectors: ['Garment Machinery', 'Textiles', 'Paper']
  },
  {
    code: 'NBO',
    city: 'Nairobi',
    country: 'Kenya',
    role: 'East Africa Command',
    metrics: '4+ Annual Expos • 110K+ Buyers',
    address: 'Sarit Expo Centre & KICC',
    keySectors: ['Building & Infra', 'Agro-Tech', 'Pharma']
  },
  {
    code: 'CMB',
    city: 'Colombo',
    country: 'Sri Lanka',
    role: 'Island Trade Gateway',
    metrics: '5+ Annual Expos • 95K+ Buyers',
    address: 'BMICH & SLECC Halls',
    keySectors: ['Hospitality', 'Food Processing', 'Logistics']
  },
  {
    code: 'KTM',
    city: 'Kathmandu',
    country: 'Nepal',
    role: 'Himalayan Trade Base',
    metrics: '4+ Annual Expos • 80K+ Buyers',
    address: 'Bhrikutimandap Exhibition Ground',
    keySectors: ['Wood Machinery', 'Polymers', 'Consumer Tech']
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easeEditorial,
    },
  },
};

export function GlobalPresence() {
  return (
    <section 
      className="relative z-20 w-full bg-[#07080A] text-[#F3F4F6] py-20 sm:py-28 lg:py-32 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="global-presence-heading"
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

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest uppercase text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>International Infrastructure</span>
            </div>

            <h2 
              id="global-presence-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] text-white leading-[1.08]"
            >
              Permanent Offices. <br />
              <span className="text-neutral-400 font-normal">Cross-Border Execution.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/20 text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-all duration-300 active:scale-95"
            >
              <span>Contact Global Desks</span>
              <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 6-Column Clean Hairline Ledger Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-3xl overflow-hidden mt-10 sm:mt-12"
        >
          {hubs.map((hub) => (
            <motion.div
              key={hub.code}
              variants={cardVariants}
              className="group relative bg-[#07080A] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#0A0C10] transition-colors duration-300"
            >
              {/* Subtle Top Red Hairline on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left" />

              <div>
                {/* Meta Top: Code & Country */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-red-400">
                    {hub.code}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                    {hub.role}
                  </span>
                </div>

                {/* City & Country */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight group-hover:text-red-400 transition-colors duration-200">
                  {hub.city}
                  <span className="text-neutral-400 font-normal text-base ml-1.5">
                    / {hub.country}
                  </span>
                </h3>

                {/* Performance Scale */}
                <p className="mt-2 text-xs font-mono text-neutral-300 tracking-tight">
                  {hub.metrics}
                </p>

                {/* Physical Base Location */}
                <div className="flex items-start gap-2 mt-4 text-xs text-neutral-400 font-normal">
                  <MapPin size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hub.address}</span>
                </div>
              </div>

              {/* Priority Sector Pills */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {hub.keySectors.map((sector) => (
                    <span 
                      key={sector}
                      className="inline-block px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10.5px] font-mono text-neutral-300"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimal Bottom Assurance Strip */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 px-1">
          <div className="flex items-center gap-2">
            <Globe2 size={14} className="text-neutral-400" />
            <span>Unified Central Coordination via New Delhi (HQ)</span>
          </div>
          <span>Direct Customs, Logistics & Stall Operations Handled In-House</span>
        </div>

      </div>
    </section>
  );
}

export default GlobalPresence;