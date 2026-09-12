"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Palette, Layers, Activity, Sparkles, Building2 } from 'lucide-react';

interface GroupCompanyItem {
  id: string;
  name: string;
  tagline: string;
  role: string;
  description: string;
  url: string;
  logo?: string;
  highlight?: string;
  icon: any;
  accentColor: string;
}

const companiesData: GroupCompanyItem[] = [
  {
    id: 'studio',
    name: 'Futurex Studio',
    tagline: 'Turnkey Exhibition Stand Architecture',
    role: 'STAND BUILD & FABRICATION',
    description:
      'Premier exhibition design studio engineering bespoke 3D stall concepts, structural timber fabrication, and turnkey on-site assembly across major global expo venues.',
    url: 'https://futurexstudio.com/',
    logo: '/images/group/futurex-studio.png',
    highlight: 'Turnkey Stand Architecture',
    icon: Palette,
    accentColor: 'text-red-600'
  },
  {
    id: 'fdma',
    name: 'FDMA (Futurex Digital)',
    tagline: 'Full-Service Industrial Growth Agency',
    role: 'DIGITAL TRANSFORMATION & PR',
    description:
      'Corporate digital marketing and communications wing empowering industrial manufacturers with high-intent B2B lead pipelines, SEO, and executive media relations.',
    url: 'https://futurexpr.com/',
    logo: '/images/group/fdma.png',
    highlight: 'Performance Media & PR',
    icon: Layers,
    accentColor: 'text-sky-600'
  },
  {
    id: 'healthcare',
    name: 'Futurex Healthcare',
    tagline: 'Critical Medical Infrastructure Systems',
    role: 'HEALTHCARE INFRASTRUCTURE',
    description:
      'Rapid-deployment medical infrastructure arm recognized for delivering mission-critical healthcare facilities, including India’s largest Covid Care ICU in record time.',
    url: 'https://www.futurexhealth.com/',
    logo: '/images/group/futurex-healthcare.png',
    highlight: 'Rapid Hospital Deployment',
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
              <span>Futurex Group Ecosystem</span>
            </div>

            <h2 
              id="group-companies-heading"
              className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
            >
              Specialist Businesses. <br />
              <span className="text-neutral-500 font-normal">One Unified Network.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 font-normal leading-[1.65] max-w-xl">
              An integrated conglomerate delivering turnkey exhibition design, cross-border digital growth, and mission-critical infrastructure solutions.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-500">
              Multinational MSME Conglomerate
            </span>
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
                className="group relative flex flex-col justify-between h-full bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-3xl p-7 sm:p-8 transition-shadow duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Subtle Red Top Laser Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left" />

                <div>
                  {/* Top Metadata Strip: Index & Division Tag */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-xs font-medium text-neutral-400 tracking-widest uppercase group-hover:text-red-600 transition-colors">
                      {formattedIndex}
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono tracking-wider uppercase text-neutral-600">
                      {company.role}
                    </span>
                  </div>

                  {/* Logo Display Module (With Graceful Fallback) */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                    <div className="relative w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center p-2 shrink-0 group-hover:border-neutral-300 transition-colors overflow-hidden">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          fill
                          sizes="56px"
                          className="object-contain p-2 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            // If logo path fails to load, switch to custom Icon
                            const target = e.currentTarget;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <Icon className={`w-6 h-6 ${company.accentColor}`} />
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-xl font-semibold text-[#0A0D12] tracking-tight leading-snug group-hover:text-red-600 transition-colors duration-200">
                        {company.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-normal truncate mt-0.5">
                        {company.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm text-neutral-600 font-normal leading-[1.7] mb-6 tracking-normal">
                    {company.description}
                  </p>

                  {/* Milestone Pill */}
                  {company.highlight && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200/80 text-[11px] font-mono text-neutral-700 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span>{company.highlight}</span>
                    </div>
                  )}
                </div>

                {/* Footer Action: Direct External Site Outlink */}
                <div className="pt-5 border-t border-neutral-100 flex items-center justify-between mt-auto">
                  <Link
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-800 group-hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    <span>Visit Domain</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45 text-neutral-400 group-hover:text-red-600" />
                  </Link>

                  <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                    Subsidiary
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Central Coordination Strip */}
        <div className="mt-12 pt-6 border-t border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-neutral-400" />
            <span>Unified Central Governance via Futurex New Delhi HQ</span>
          </div>
          <span>Cross-entity operational synergy across Asia & Africa</span>
        </div>

      </div>
    </section>
  );
}

export default GroupCompanies;