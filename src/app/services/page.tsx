'use client';

import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { 
  Building2, 
  Users2, 
  CalendarCheck, 
  Palette, 
  Megaphone, 
  Video, 
  Building,
  Target,
  Compass,
  Heart,
  Award,
  ArrowUpRight
} from 'lucide-react';

import { PageHero } from '@/components/hero/PageHero';
import { CTASection } from '@/components/sections/CTASection';
import { Testimonials } from '@/components/sections/Testimonials';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.55, ease: easeEditorial } 
  }
};

// ==================== DATA CONFIGURATION ====================
const services = [
  {
    id: 'exhibitions',
    icon: Building2,
    title: 'Exhibitions',
    description: 'Leading exhibition stand design, construction, and turnkey contracting across India and SAARC corridors with end-to-end display solutions.'
  },
  {
    id: 'conferences',
    icon: Users2,
    title: 'Conferences',
    description: 'Structured, high-impact business presentations, ministerial panels, and academic proceedings publication.'
  },
  {
    id: 'events',
    icon: CalendarCheck,
    title: 'Events',
    description: 'Purposeful meetings and corporate gatherings engineered with operational precision and memorable engagement.'
  },
  {
    id: 'designing-studio',
    icon: Palette,
    title: 'Designing Studio',
    description: 'Creative spatial architecture and exhibition booth design tailored to distinct industrial brand profiles.'
  },
  {
    id: 'branding-promotions',
    icon: Megaphone,
    title: 'Branding & Promotions',
    description: 'Comprehensive multi-channel campaigns spanning press media, digital seminars, outdoor publicity, and collateral design.'
  },
  {
    id: 'webinars',
    icon: Video,
    title: 'Webinars',
    description: 'Virtual and hybrid live event streaming connecting global enterprises with digital delegates in real-time.'
  }
];

const associationLogos = [
  { id: 1, name: 'BCCI', sub: 'Bhutan Chamber of Commerce', logo: '/logos/associations/bcci.png' },
  { id: 2, name: 'PHD Chamber', sub: 'PHD Chamber of Commerce', logo: '/logos/associations/phd.png' },
  { id: 3, name: 'CDC Events', sub: 'CDC Events & Travels', logo: '/logos/associations/cdc.png' },
  { id: 4, name: 'ASK Trade', sub: 'ASK Trade & Exhibitions', logo: '/logos/associations/ask.png' },
  { id: 5, name: 'Alumex PLC', sub: 'Alumex Industries PLC', logo: '/logos/associations/alumex.png' },
  { id: 6, name: 'JAT Holdings', sub: 'JAT Holdings Pvt. Ltd.', logo: '/logos/associations/jat.png' }
];

export default function ServicesPage() {
  return (
    <main className="relative bg-[#FBFBFD] text-[#0A0D12] min-h-screen overflow-hidden selection:bg-red-600 selection:text-white">

      {/* ==================== 1. EDITORIAL PAGE HERO ==================== */}
      <div className="border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="INSTITUTIONAL SERVICES" 
          title={
            <>
              Business Experiences, <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Built End to End
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Exhibitions, conferences, events, creative production, promotion and virtual business experiences engineered for global scale." 
        />
      </div>

      {/* ==================== 2. OUR SERVICES GRID (SELF-CONTAINED) ==================== */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 border-b border-neutral-200/80 select-none">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.1]">
            Our Core <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-neutral-500">Services & Solutions</span>
            <span className="text-red-600 font-sans">.</span>
          </h2>
          <p className="mt-4 text-neutral-500 text-sm sm:text-base font-normal leading-[1.75] max-w-xl">
            Tailored trade show solutions, architecture, and marketing channels built for high-impact international enterprises.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: easeEditorial } }}
                className="group relative bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl p-7 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Red Laser Hairline Accent on Hover */}
                <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

                <div>
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 mb-5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A0D12] mb-2.5 tracking-tight group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-normal leading-[1.75]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase text-neutral-400">
                    DISCIPLINE SPEC
                  </span>
                  <div className="w-6 h-6 rounded-full bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-neutral-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ==================== 3. ASSOCIATIONS & ALLIANCES (REAL LOGO SLOTS) ==================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, ease: easeEditorial }}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-3">
              <span>STRATEGIC ALLIANCES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#0A0D12]">
              Our Key Associations<span className="text-red-600">.</span>
            </h2>
            <p className="text-neutral-500 text-xs sm:text-[13px] mt-2 font-normal">
              Proud partners and co-organizers with leading international chambers of commerce.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
          >
            {associationLogos.map((logo) => (
              <motion.div 
                key={logo.id} 
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="h-28 rounded-2xl bg-[#FBFBFD] border border-neutral-200/80 shadow-2xs flex flex-col items-center justify-center p-3.5 hover:border-neutral-300 hover:bg-white hover:shadow-sm transition-all group text-center"
              >
                {/* Association Logo Slot */}
                <div className="relative w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform shadow-2xs">
                  <Image 
                    src={logo.logo} 
                    alt={logo.name}
                    fill
                    sizes="40px"
                    className="object-contain p-1.5"
                    onError={(e) => {
                      // Fallback if image path is pending
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <Building className="w-4 h-4 text-neutral-400 absolute" />
                </div>
                
                <span className="text-xs font-semibold text-[#0A0D12] leading-tight block">
                  {logo.name}
                </span>
                <span className="text-[9.5px] text-neutral-400 font-mono line-clamp-1 mt-0.5">
                  {logo.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== 4. DARK FOUNDATIONAL PILLARS SECTION ==================== */}
      <section className="relative bg-[#07080A] text-white py-20 sm:py-28 my-8 overflow-hidden select-none">
        
        {/* Ambient Volumetric Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[10px] font-mono tracking-[0.18em] uppercase text-neutral-300 mb-3 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>FOUNDATIONAL DOCTRINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-tight">
              Guided By Purpose <br />
              <span className="font-serif italic font-normal text-neutral-400">& Excellence</span>
              <span className="text-red-500">.</span>
            </h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            {/* Mission */}
            <motion.div variants={itemVariants} className="bg-white/[0.025] border border-white/[0.08] rounded-3xl p-7 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center mb-5 text-red-500">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.18em] uppercase text-red-500 block mb-2 font-semibold">
                  MISSION
                </span>
                <p className="text-neutral-300 text-xs sm:text-[13.5px] leading-[1.75] mb-5 font-normal">
                  Organizing specialized trade fairs and serving promising industries with market-driven show standards across the SAARC region.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-neutral-300 text-xs font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>Market-driven show standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>SAARC Region expansion</span>
                </li>
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} className="bg-gradient-to-b from-red-600/[0.07] via-white/[0.03] to-white/[0.015] border border-red-500/30 rounded-3xl p-7 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-5 shadow-[0_0_16px_rgba(220,38,38,0.4)]">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.18em] uppercase text-red-400 block mb-2 font-semibold">
                  VISION
                </span>
                <p className="text-white text-sm sm:text-[14.5px] leading-[1.75] font-normal mb-5">
                  To be the most trusted international trade fair orchestrator across South Asia, delivering excellence through trust and perseverance.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] text-[11px] text-neutral-300 font-mono tracking-wide">
                Excellence in service delivery through structured perseverance.
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={itemVariants} className="bg-white/[0.025] border border-white/[0.08] rounded-3xl p-7 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center mb-5 text-red-500">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-[10.5px] font-mono tracking-[0.18em] uppercase text-red-500 block mb-2 font-semibold">
                  CORE VALUES
                </span>
                <p className="text-neutral-300 text-xs sm:text-[13.5px] leading-[1.75] mb-5 font-normal">
                  Uncompromising commitment to ethical business operations, reliability, and total client satisfaction.
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                {['Business Ethics', 'Reliability', 'Customer Satisfaction'].map((val) => (
                  <div key={val} className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-neutral-200 text-xs font-mono tracking-wider flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 5. TESTIMONIALS ==================== */}
      <Testimonials />

      {/* ==================== 6. CTA SECTION ==================== */}
      <CTASection />

    </main>
  );
}