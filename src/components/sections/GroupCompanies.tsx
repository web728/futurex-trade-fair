'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Palette, Layers, Activity } from 'lucide-react';

interface GroupCompanyItem {
  id: string;
  name: string;
  tagline: string;
  role: string;
  description: string;
  url: string;
  logo?: string;
  icon: any;
  accentColor: string;
}

const companiesData: GroupCompanyItem[] = [
  {
    id: 'studio',
    name: 'Futurex Studio',
    tagline: 'World-Class Exhibition Stand Solutions',
    role: 'EXHIBITION DESIGN & STAND BUILD',
 description:
  'A world-class exhibition stand builder delivering end-to-end solutions across design, production, setup, and execution of premium exhibition stands.',
url: 'https://futurexstudio.com/',
logo: '/gallery/images-event/2026/Futurex-Studio-Logo.png',
    icon: Palette,
    accentColor: 'text-red-600'
  },
  {
    id: 'fdma',
    name: 'FDMA (Futurex Digital)',
    tagline: 'Full-Service Digital Marketing Company',
    role: 'DIGITAL MARKETING & TRANSFORMATION',
    description:
      'A full-service digital marketing company merging imagination and technology to help brands thrive in the era of digital transformation.',
    url: 'https://futurexpr.com/',
    logo: '/gallery/images-event/2026/fdma.png',
    icon: Layers,
    accentColor: 'text-sky-600'
  },
  {
    id: 'healthcare',
    name: 'Futurex Healthcare',
    tagline: 'Healthcare Infrastructure & Execution',
    role: 'HEALTHCARE INFRASTRUCTURE',
    description:
      'A young subsidiary of the Futurex Healthcare Group of Companies, recognized for building India’s largest Covid Care ICU in Mumbai in record time.',
    url: 'https://www.futurexhealth.com/',
    logo: '/gallery/images-event/2026/healthcare.png',
    icon: Activity,
    accentColor: 'text-emerald-600'
  }
];

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: easeEditorial } 
  }
};

export function GroupCompanies() {
  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="group-companies-heading"
    >
      {/* Subtle Top Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-neutral-200">
          <div className="max-w-2xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-neutral-200/90 text-[11px] font-mono tracking-widest uppercase text-neutral-600 mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>Futurex Group</span>
            </div>

            <h2 
              id="group-companies-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
            >
              Specialist Businesses. <br />
              <span className="font-serif italic font-normal text-neutral-500">One Unified Network</span>
              <span className="text-red-600 font-sans">.</span>
            </h2>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CORPORATE SUBSIDIARY CARDS */}
        {/* ========================================================================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-10 sm:mt-12"
        >
          {companiesData.map((company, index) => {
            const Icon = company.icon;
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <motion.article 
                key={company.id} 
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.35, ease: easeEditorial } }}
                className="group relative flex flex-col justify-between h-full bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl p-7 sm:p-8 transition-shadow duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Subtle Red Top Laser Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left z-20" />

                <div>
                  {/* Top Metadata Strip: Index & Division Tag */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-xs font-semibold text-neutral-400 tracking-wider uppercase group-hover:text-red-600 transition-colors">
                      {formattedIndex}
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-wider uppercase text-neutral-600">
                      {company.role}
                    </span>
                  </div>

                  {/* ========================================================================= */}
                  {/* LARGE PROMINENT CENTERED LOGO SHOWCASE BOX */}
                  {/* ========================================================================= */}
                  <div className="relative w-full h-32 sm:h-36 rounded-2xl bg-gradient-to-b from-[#FBFBFD] to-[#F3F4F6] border border-neutral-200/80 flex items-center justify-center p-6 mb-6 overflow-hidden group-hover:border-neutral-300 transition-all">
                    {company.logo ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          fill
                          sizes="280px"
                          className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:scale-105"
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Icon className={`w-8 h-8 ${company.accentColor}`} />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Futurex Subsidiary</span>
                      </div>
                    )}
                  </div>

                  {/* Company Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#0A0D12] tracking-tight leading-snug group-hover:text-red-600 transition-colors duration-200">
                      {company.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono mt-1">
                      {company.tagline}
                    </p>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-[13.5px] text-neutral-600 font-normal leading-[1.75] mb-6">
                    {company.description}
                  </p>
                </div>

                {/* Footer Action: Direct External Site Outlink */}
                <div className="pt-5 border-t border-neutral-100 flex items-center justify-between mt-auto">
                  <Link
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.14em] uppercase text-neutral-800 group-hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    <span>Visit Website</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-400 group-hover:text-red-600" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default GroupCompanies;