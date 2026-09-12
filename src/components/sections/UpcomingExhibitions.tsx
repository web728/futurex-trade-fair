"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { getUpcomingEvents, type ExhibitionEvent } from '@/data/exhibitions';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeEditorial,
    },
  },
};

const filterTabs = [
  { id: 'all', label: 'All Upcoming' },
  { id: 'India', label: 'India' },
  { id: 'Nepal', label: 'Nepal' },
  { id: 'Bangladesh', label: 'Bangladesh' },
  { id: 'East Africa', label: 'East Africa' }
] as const;

export function UpcomingExhibitions() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const upcomingEvents: ExhibitionEvent[] = getUpcomingEvents(16);

  const filteredEvents = upcomingEvents.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'East Africa') {
      return ['Kenya', 'Uganda', 'Tanzania'].includes(item.venue?.country);
    }
    return item.venue?.country?.toLowerCase() === activeTab.toLowerCase();
  });

  const visibleEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  return (
    <section 
      className="relative z-20 w-full bg-[#FBFBFD] text-[#0A0D12] py-20 sm:py-28 lg:py-32 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="upcoming-exhibitions-title"
    >
      {/* Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* HEADER BAR */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeEditorial }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-neutral-200/80"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>Official Trade Calendar • 2026—2027</span>
            </div>

            <h2 
              id="upcoming-exhibitions-title"
              className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
            >
              Upcoming Global <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-neutral-500">Trade Exhibitions</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-600 font-normal leading-[1.85] max-w-xl">
              Verified international industrial expos, concurrent B2B summits, and manufacturer delegations organized across high-growth international trade corridors.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <Link 
              href="/exhibitions" 
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#0A0D12] border border-neutral-200 hover:border-[#0A0D12] text-xs font-mono tracking-[0.14em] uppercase text-neutral-800 hover:text-white transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer"
            >
              <span>Full Directory</span>
              <ArrowUpRight 
                size={14} 
                className="text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              />
            </Link>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CORRIDOR FILTER TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 overflow-x-auto pt-8 pb-10 scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowAll(false);
                }}
                type="button"
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'text-white font-medium' 
                    : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200/80 hover:border-neutral-300 shadow-2xs'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 bg-[#0A0D12] rounded-full -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* EXHIBITION CARDS GRID (MINIMALIST & CLEAN) */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${showAll}`}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            {visibleEvents.map((event) => {
              const eventImg = event.heroImage || event.image || '/images/placeholder.jpg';
              const mailSubject = encodeURIComponent(`Stall Booking Inquiry: ${event.name}`);
              const mailHref = event.socials?.email 
                ? `mailto:${event.socials.email}?subject=${mailSubject}`
                : `mailto:admin@futurextrade.com?subject=${mailSubject}`;

              return (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: easeEditorial } 
                  }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:border-neutral-300 overflow-hidden"
                >
                  {/* Subtle Red Top Laser Reveal */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      {/* Top Metadata Strip */}
                      <div className="flex items-center justify-between gap-3 mb-5 text-[11px] font-mono">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-medium tracking-wide">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span>{event.venue?.city}, {event.venue?.country}</span>
                        </span>

                        <span className="text-neutral-400 font-normal tracking-tight">
                          {event.edition || 'Official Edition'}
                        </span>
                      </div>

                      {/* Card Thumbnail */}
                      <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-100">
                        <Image
                          src={eventImg}
                          alt={event.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
                        />

                        {event.industry && (
                          <div className="absolute bottom-3 left-3 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10.5px] font-mono text-white tracking-wide">
                            {event.industry}
                          </div>
                        )}
                      </div>

                      {/* Title (No Description Clutter) */}
                      <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug group-hover:text-red-600 transition-colors duration-200">
                        {event.name}
                      </h3>
                    </div>

                    {/* Card Footer: Dates & Premium Interactive Actions */}
                    <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-neutral-600 font-mono text-[11.5px]">
                        <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="tracking-wide">{event.dates?.display || 'Upcoming'}</span>
                      </div>

                      {/* Premium Action Buttons */}
                      <div className="flex items-center gap-2">
                        {event.socials?.website && (
                          <Link
                            href={event.socials.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Official Website"
                            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                          >
                            <Globe size={13} />
                          </Link>
                        )}
                        {event.socials?.linkedin && (
                          <Link
                            href={event.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-[#0A66C2] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                          >
                            <Linkedin size={13} />
                          </Link>
                        )}
                        <Link
                          href={mailHref}
                          title="Inquire / Book Stall"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Expand Editions Button */}
        {filteredEvents.length > 6 && (
          <div className="flex justify-center mt-14 sm:mt-18">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-xs font-mono tracking-[0.14em] uppercase text-neutral-800 transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
            >
              <span>{showAll ? 'Collapse Schedule' : `View All ${filteredEvents.length} Upcoming Editions`}</span>
              {showAll ? (
                <ChevronUp size={14} className="text-neutral-500 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown size={14} className="text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CORRIDOR INQUIRY BANNER */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="relative mt-16 sm:mt-24 bg-[#07080A] text-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-white/[0.08] overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex items-start gap-4 sm:gap-5 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-red-500 shrink-0 mt-1">
              <Building2 size={22} />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
                  Trade Corridor Inquiries
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-[-0.02em] leading-snug">
                Planning stalls across India, Nepal, Bangladesh, or Kenya?
              </h3>
              
              <p className="text-neutral-400 text-xs sm:text-sm leading-[1.8] mt-3 font-normal max-w-xl">
                Access certified floor layouts, verified buyer demographic profiles, and direct stall reservation portals across all scheduled commercial editions.
              </p>
            </div>
          </div>

          <Link
            href="/exhibitions"
            className="relative z-10 w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-medium text-xs tracking-[0.14em] uppercase rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(220,38,38,0.3)] hover:shadow-[0_0_32px_rgba(220,38,38,0.5)] active:scale-95 cursor-pointer"
          >
            <span>Explore Complete Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default UpcomingExhibitions;