"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { PageHero } from '@/components/hero/PageHero';
import { GroupCompanies } from '@/components/sections/GroupCompanies';
import { CTASection } from '@/components/sections/CTASection';
import PillarsSection from '@/components/sections/PillarsSection';
import { company } from '@/data/company';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Globe2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: easeEditorial } 
  }
};

const strategicObjectives = [
  {
    id: "01",
    title: "Bilateral Buyer Matchmaking",
    desc: "Structured, high-intent meetings connecting sovereign procurement delegations with verified industrial equipment manufacturers.",
    icon: Users,
    tag: "DELEGATION MAPPING"
  },
  {
    id: "02",
    title: "Regional Brand Equity",
    desc: "Elevating corporate positioning across key industrial trade corridors with targeted high-density physical and digital exposure.",
    icon: TrendingUp,
    tag: "MARKET LEADERSHIP"
  },
  {
    id: "03",
    title: "Market Intelligence Summits",
    desc: "Curating concurrent technical forums, roundtables, and ministerial panels to decode policy shifts and macro demand.",
    icon: Eye,
    tag: "MACRO TELEMETRY"
  },
 {
  id: "04",
  title: "Capital Efficient Sourcing",
  desc: "Strategic exhibition infrastructure engineered to deliver verifiable enterprise ROI, distributor appointments, and vendor acquisition.",
  icon: ShieldCheck,
  tag: "COMMERCIAL IMPACT"
},
  {
    id: "05",
    title: "Floor Deal Velocity",
    desc: "Compressing sales cycles into live floor machinery demos, technical evaluations, spot negotiations, and on-site MoUs.",
    icon: Zap,
    tag: "CONTRACT CLOSURE"
  },
  {
    id: "06",
    title: "Cross-Border Gateways",
    desc: "Furnishing international country pavilions for global manufacturers entering emerging markets across South Asia and East Africa.",
    icon: Globe2,
    tag: "GLOBAL CORRIDORS"
  }
];

const stationData = [
  { city: "New Delhi", code: "DEL", role: "Global Headquarters", country: "India" },
  { city: "Mumbai", code: "BOM", role: "Western Commercial Desk", country: "India" },
  { city: "Dhaka", code: "DAC", role: "Eastern Regional Station", country: "Bangladesh" },
  { city: "Colombo", code: "CMB", role: "Island Operating Station", country: "Sri Lanka" },
  { city: "Kathmandu", code: "KTM", role: "Himalayan Trade Hub", country: "Nepal" }
];

export default function AboutPage() {
  return (
    <div className="bg-[#FBFBFD] text-[#0A0D12] min-h-screen overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TIGHT EDITORIAL HERO (CRISP & UNCLUTTERED) */}
      {/* ========================================================================= */}
      <PageHero 
        eyebrow="INSTITUTIONAL DOSSIER" 
        // image="/gallery/images-event/2.webp"
        title={
          <>
            Where Industrial Capital <br />
            <span className="font-serif italic font-normal text-neutral-500">
              Meets Regional Scale
            </span>
            <span className="text-red-600 font-sans">.</span>
          </>
        }
     tagline="International Trade Fair & Exhibition Organizer."
        description="Connecting global manufacturers with sovereign buyers across South Asia and East Africa."
         backgroundImage="/gallery/images-event/slider/about-new.png"
      />

      {/* ========================================================================= */}
      {/* 2. CORPORATE NARRATIVE & ARCHITECTURAL STORY (FULL CONTENT) */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-neutral-200/80 bg-white overflow-hidden select-none">
        
        {/* Medium Static Blueprint Stamp (Top Right Corner) */}
        <svg 
          className="absolute -top-10 -right-10 w-72 h-72 text-neutral-900/[0.035] pointer-events-none" 
          viewBox="0 0 200 200" 
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.8" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="3" fill="#dc2626" />
        </svg>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          >
            {/* Left Sticky Identity Anchor */}
            <motion.div variants={itemVariants} className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-4">
               <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                     <Image
                       src="/logos/svg/logo-arrow.png"
                       alt="Icon"
                       fill
                       className="object-contain"
                     />
                   </div>
                <span>Established {company.established || "2011"} • New Delhi</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.1]">
                Architects of <br />
                <span className="font-serif italic font-normal text-neutral-500">
                  Global Trade Conclaves
                </span>
                <span className="text-red-600 font-sans">.</span>
              </h2>

              <div className="mt-6 pt-5 border-t border-neutral-200/80 space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.06em] text-neutral-500">
                  <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                  <span>CIEO Accredited Trade Organization</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.06em] text-neutral-500">
                  <Sparkles size={15} className="text-red-600 shrink-0" />
                  <span>220+ Industrial Summits & Pavilions Delivered</span>
                </div>
              </div>
            </motion.div>

            {/* Right Complete Editorial Story Narrative */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-5 text-neutral-600 text-xs sm:text-[13.5px] leading-[1.85] font-normal">
              <p className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFD] border border-neutral-200/80 text-neutral-800 leading-[1.8] shadow-2xs">
                Futurex Trade Fair and Events Private Limited is a specialized international trade exhibition organizer. Headquartered in New Delhi with dedicated operational stations across SAARC corridors, we bridge sovereign commercial policies with private industrial capital through verified, high-density exhibition platforms.
              </p>

              <p>
                Trade exhibitions are fundamental economic catalysts. Our multi-sector portfolios spanning Building Construction, Woodworking, Garments, Power, Electric Vehicles, and Packaging are engineered to solve systemic cross-border trade friction by bringing vetted importers, government procurement bodies, and equipment makers onto a single commercial floor.
              </p>

             <p>
  From shell-scheme fabrication and heavy machinery spatial logistics to
  bilateral VIP buyer delegations, Futurex Group handles the entire execution value
  chain. Our operations ensure every square meter of exhibition floor space
  drives verified business outcomes.
</p>

              <div className="pt-3 border-t border-neutral-200/60">
                <blockquote className="text-[11.5px] font-mono tracking-[0.12em] uppercase text-neutral-500 border-l-2 border-red-600 pl-4 py-0.5 leading-relaxed">
                  “Empowering industrial enterprises to establish regional market dominance through structured trade diplomacy.”
                </blockquote>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE DOCTRINE (DARK ATMOSPHERIC HORIZON) */}
      {/* ========================================================================= */}
      <PillarsSection />

      {/* ========================================================================= */}
      {/* 4. STRATEGIC DIRECTIVES & OBJECTIVES */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FBFBFD] border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-neutral-200/80 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-neutral-200/90 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-2 shadow-2xs">
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                      <Image
                        src="/logos/svg/logo-arrow.png"
                        alt="Icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                <span>Execution Framework</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.1]">
                Operating Directives & <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-neutral-500">
                  Industrial Platforms
                </span>
                <span className="text-red-600 font-sans">.</span>
              </h2>
            </div>

            <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-neutral-400 self-start sm:self-auto">
              Delivery Standards // 2026—2030
            </span>
          </div>

          {/* 6-Card Swiss Architectural Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {strategicObjectives.map((obj) => {
              const IconComponent = obj.icon;
              return (
                <motion.div 
                  key={obj.id} 
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.25, ease: easeEditorial } }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.16,1,0.3,1] origin-left" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-red-600 transition-colors">
                        {obj.id}
                      </span>
                      <span className="text-[9.5px] font-mono tracking-[0.16em] uppercase px-2 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/80 text-neutral-500">
                        {obj.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-[#0A0D12] group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors shrink-0">
                        <IconComponent size={14} />
                      </div>
                      <h3 className="text-base font-semibold text-[#0A0D12] tracking-tight group-hover:text-red-600 transition-colors m-0">
                        {obj.title}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-500 font-normal leading-[1.75] m-0 pl-9">
                      {obj.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

   

      {/* ========================================================================= */}
      {/* 6. REGIONAL STATIONS */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-neutral-200/80 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/90 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-2 shadow-2xs">
                  <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        <Image
                          src="/logos/svg/logo-arrow.png"
                          alt="Icon"
                          fill
                          className="object-contain"
                        />
                      </div>
                <span>Operating Stations</span>
              </div>
             <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.1]">
  Regional Support <br className="hidden sm:inline" />
  <span className="font-serif italic font-normal text-neutral-500">
    Station Network
  </span>
  <span className="font-sans text-red-600">.</span>
</h2> 
            </div>

            <span className="text-[11px] font-mono tracking-[0.14em] text-neutral-400 uppercase self-start sm:self-auto">
              5 Dedicated Desks Across Asia
            </span>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
          >
            {stationData.map((station, index) => (
              <motion.div 
                key={station.code} 
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="p-4 rounded-2xl bg-[#FBFBFD] border border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-2xs transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold text-neutral-400">
                      0{index + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 font-mono text-[9.5px] tracking-wider text-neutral-600 font-medium">
                      {station.code}
                    </span>
                  </div>

                  <strong className="block text-sm font-semibold text-[#0A0D12] tracking-tight">
                    {station.city}
                  </strong>
                  <span className="block text-xs text-neutral-500 font-normal mt-0.5">
                    {station.country}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[10px] font-mono tracking-wider text-neutral-400">
                  {station.role}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SUBSIDIARIES & TERMINAL CTA */}
      {/* ========================================================================= */}
      <GroupCompanies />
      <CTASection />

    </div>
  );
}