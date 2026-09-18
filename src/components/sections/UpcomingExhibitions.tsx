"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  Calendar, 
  MapPin, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  X
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
  const [activeModalEvent, setActiveModalEvent] = useState<ExhibitionEvent | null>(null);

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
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
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
    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.18em] uppercase text-neutral-600 mb-4 shadow-2xs">
      {/* Custom PNG Icon Replaced Instead of Red Dot */}
      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
        <Image
          src="/logos/svg/logo-arrow.png"
          alt="Icon"
          fill
          className="object-contain"
        />
      </div>
      <span>Official Trade Calendar</span>
    </div>

    <h2 
      id="upcoming-exhibitions-title"
      className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
    >
      Upcoming Global <br className="hidden sm:inline" />
      <span className="font-serif italic font-normal text-neutral-500">Trade Exhibitions</span>
    </h2>
  </div>

  <div className="flex items-center gap-4 self-start md:self-end">
    <Link 
      href="/exhibitions" 
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#0A0D12] border border-neutral-200 hover:border-[#0A0D12] text-xs font-mono tracking-[0.14em] uppercase text-neutral-800 hover:text-white transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer"
    >
      <span className="text-neutral-800 transition-colors duration-300 group-hover:text-white">
        Full Directory
      </span>
      <ArrowUpRight 
        size={14} 
        className="text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
      />
    </Link>
  </div>
</motion.div>
    

        {/* ========================================================================= */}
        {/* EXHIBITION CARDS GRID */}
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
              const eventImg = event.heroImage || event.image;
              const mailSubject = encodeURIComponent(`Stall & Visitor Inquiry: ${event.name}`);
              const mailHref = event.socials?.email 
                ? `mailto:${event.socials.email}?subject=${mailSubject}`
                : `mailto:admin@futurextrade.com?subject=${mailSubject}`;

              return (
                <motion.article
                  key={event.id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: easeEditorial } 
                  }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-300 shadow-2xs hover:shadow-2xl transition-all duration-400 ease-[0.16,1,0.3,1] overflow-hidden select-none"
                >
                  {/* Top Red Laser Hairline Accent on Hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                  <div>
                    {/* Prominent Logo Canvas */}
                    <button
                      type="button"
                      onClick={() => setActiveModalEvent(event)}
                      className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-[#FBFBFD] to-[#F3F4F6] border-b border-neutral-200/80 flex items-center justify-center p-8 overflow-hidden cursor-zoom-in focus:outline-none w-full"
                    >
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.2) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}
                      />

                      {event.edition && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-neutral-900 text-[10px] font-mono tracking-widest uppercase shadow-2xs">
                            {event.edition}
                          </span>
                        </div>
                      )}

             <div className="relative z-10 w-full h-[180px] sm:h-[210px] flex items-center justify-center overflow-hidden rounded-xl transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-105 bg-neutral-100">
  {eventImg ? (
    <div className="relative w-full h-full">
      <Image
        src={eventImg}
        alt={event.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-contain p-4 filter transition-transform duration-700 group-hover:scale-105"
        priority={false}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2.5 text-neutral-400">
      <Building2 size={36} className="text-red-600" />
      <span className="font-mono text-[11px] tracking-widest uppercase">Futurex Platform</span>
    </div>
  )}
</div>
                    </button>

                    {/* Title & Metadata */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D12] tracking-[-0.02em] leading-snug group-hover:text-red-600 transition-colors duration-200 line-clamp-2 m-0">
                        {event.name}
                      </h3>

                      <div className="space-y-2.5 pt-3 border-t border-neutral-100 text-xs font-mono">
                        <div className="flex items-center gap-2.5 text-neutral-900 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="tracking-wide">{event.dates?.display || 'Upcoming 2026'}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-500">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{event.venue?.city}, {event.venue?.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer with 3D Floating Socials & Tooltips */}
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {event.socials?.linkedin && (
                        <div className="relative group/tooltip">
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white font-mono text-[9.5px] uppercase tracking-wider rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none shadow-md whitespace-nowrap z-30 translate-y-1 group-hover/tooltip:translate-y-0">
                            LinkedIn
                          </span>
                          <Link
                            href={event.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_8px_20px_rgba(10,102,194,0.25)] hover:bg-white"
                          >
                            <Linkedin size={13} className="transition-colors duration-200" />
                          </Link>
                        </div>
                      )}

                      {event.socials?.facebook && (
                        <div className="relative group/tooltip">
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white font-mono text-[9.5px] uppercase tracking-wider rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none shadow-md whitespace-nowrap z-30 translate-y-1 group-hover/tooltip:translate-y-0">
                            Facebook
                          </span>
                          <Link
                            href={event.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_8px_20px_rgba(24,119,242,0.25)] hover:bg-white"
                          >
                            <Facebook size={13} className="transition-colors duration-200" />
                          </Link>
                        </div>
                      )}

                      {event.socials?.instagram && (
                        <div className="relative group/tooltip">
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white font-mono text-[9.5px] uppercase tracking-wider rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none shadow-md whitespace-nowrap z-30 translate-y-1 group-hover/tooltip:translate-y-0">
                            Instagram
                          </span>
                          <Link
                            href={event.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_8px_20px_rgba(228,64,95,0.25)] hover:bg-white"
                          >
                            <Instagram size={13} className="transition-colors duration-200" />
                          </Link>
                        </div>
                      )}

                      {event.socials?.twitter && (
                        <div className="relative group/tooltip">
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-900 text-white font-mono text-[9.5px] uppercase tracking-wider rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none shadow-md whitespace-nowrap z-30 translate-y-1 group-hover/tooltip:translate-y-0">
                            Twitter
                          </span>
                          <Link
                            href={event.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:bg-white"
                          >
                            <Twitter size={13} className="transition-colors duration-200" />
                          </Link>
                        </div>
                      )}

                     {event.socials?.email && (
  <div className="relative">
    <Link
      href={mailHref}
      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 hover:bg-white hover:shadow-[0_8px_20px_rgba(220,38,38,0.25)]"
    >
      <Mail size={13} className="transition-colors duration-200" />
    </Link>
  </div>
)}
                    </div>

                    {/* Unified High-Contrast Portal Button */}
                    {event.socials?.website ? (
                      <Link
                        href={event.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                      >
                        <span className="text-white">Website</span>
                        <ArrowUpRight size={13} className="text-white" />
                      </Link>
                    ) : (
                      <Link
                        href={mailHref}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                      >
                        <span className="text-white">Inquire</span>
                        <ArrowUpRight size={13} className="text-white" />
                      </Link>
                    )}
                  </div>
                </motion.article>
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
              <span>{showAll ? 'Collapse Schedule' : `View All Upcoming Editions`}</span>
              {showAll ? (
                <ChevronUp size={14} className="text-neutral-500 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown size={14} className="text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalEvent(null)}
              className="absolute inset-0 bg-[#050608]/85 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 flex flex-col items-center justify-center select-none"
            >
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full h-64 sm:h-72 flex items-center justify-center mb-4">
                {(activeModalEvent.heroImage || activeModalEvent.image) ? (
                  <Image
                    src={(activeModalEvent.heroImage || activeModalEvent.image)!}
                    alt={activeModalEvent.name}
                    fill
                    sizes="500px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="text-neutral-500 font-mono text-sm uppercase">
                    {activeModalEvent.name}
                  </span>
                )}
              </div>
              <h4 className="text-center font-semibold text-neutral-900 text-base">
                {activeModalEvent.name}
              </h4>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default UpcomingExhibitions;