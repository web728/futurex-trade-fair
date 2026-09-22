"use client";

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  X,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { EXHIBITIONS, type ExhibitionEvent } from '@/data/exhibitions';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeEditorial,
    },
  },
};

export function UpcomingExhibitions() {
  const [activeModalEvent, setActiveModalEvent] = useState<ExhibitionEvent | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // STRICT UPCOMING & ONGOING FILTER
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return EXHIBITIONS.filter((event) => {
      const endDateStr = event.dates.end || event.dates.start;
      const eventEndDate = new Date(endDateStr);
      eventEndDate.setHours(23, 59, 59, 999);

      return eventEndDate >= today;
    }).sort((a, b) => a.dates.start.localeCompare(b.dates.start));
  }, []);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(upcomingEvents.length / 3));
  }, [upcomingEvents]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      const progress = scrollLeft / maxScroll;
      const newIndex = Math.min(Math.round(progress * (totalPages - 1)), totalPages - 1);
      setActiveIndex(Math.max(0, newIndex));
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (maxScroll / Math.max(1, totalPages - 1)) * pageIndex;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIndex(pageIndex);
    }
  };

  const scrollLeft = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToPage(nextIndex);
  };

  const scrollRight = () => {
    const nextIndex = Math.min(totalPages - 1, activeIndex + 1);
    scrollToPage(nextIndex);
  };

  return (
    <section 
      className="relative z-20 w-full bg-[#FAFAFC] text-[#0A0D12] py-14 sm:py-20 md:py-28 border-b border-neutral-200/80 overflow-hidden select-none"
      aria-labelledby="upcoming-events-title"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PREMIUM HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-neutral-200/80"
        >
          {/* Headline & Badge */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-700 mb-3.5 shadow-2xs">
          
                  <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                              <Image
                                src="/logos/svg/logo-arrow.png"
                                alt="Icon"
                                fill
                                className="object-contain"
                              />
                            </div>
              <span className="font-semibold text-neutral-800">Official Trade Calendar</span>
            </div>

        <h2
  id="upcoming-events-title"
  className="text-3xl sm:text-5xl lg:text-[50px] font-semibold tracking-[-0.035em] text-[#0A0D12] leading-[1.08]"
>
  <span className="whitespace-nowrap">
    NEXT ON THE TRADE CALENDAR
  </span>
  <br />
  <span className="font-serif italic font-normal text-neutral-500">
    Upcoming Trade Exhibitions
  </span>
</h2>
          </div>

          {/* Action Area & View All Button */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          

            <Link
              href="/exhibitions"
              className="group relative inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#0A0D12] hover:bg-red-600 text-white font-mono text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-600/20 active:scale-95 cursor-pointer overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 text-white transition-colors duration-300">
                VIEW ALL EXHIBITIONS
              </span>

              <ArrowUpRight
                size={15}
                className="relative z-10 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
              />

              {/* Light reflection glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Link>
          </div>
        </motion.div>

        {/* CAROUSEL CONTAINER - PERFECT MOBILE CENTERING */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="mt-8 sm:mt-12 flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-8 pt-3 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-[calc(50vw-132.5px)] sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {upcomingEvents.length === 0 ? (
            <div className="w-full py-16 text-center text-neutral-500 font-mono text-sm bg-white rounded-3xl border border-neutral-200/80 shadow-2xs">
              No upcoming exhibitions scheduled at the moment.
            </div>
          ) : (
            upcomingEvents.map((event) => {
              const eventImg = event.heroImage || event.image;
              const mailSubject = encodeURIComponent(`Stall & Visitor Inquiry: ${event.name}`);
              const mailHref = event.socials?.email 
                ? `mailto:${event.socials.email}?subject=${mailSubject}`
                : `mailto:admin@futurextrade.com?subject=${mailSubject}`;

              let startDay = "01";
              let monthYearStr = "";

              if (event.dates?.start) {
                const startDateObj = new Date(event.dates.start);
                if (!isNaN(startDateObj.getTime())) {
                  startDay = startDateObj.getDate().toString().padStart(2, '0');
                  monthYearStr = startDateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  });
                }
              }

              if (!monthYearStr && event.dates?.display) {
                const dayMatch = event.dates.display.match(/\b(\d{1,2})\b/);
                if (dayMatch) startDay = dayMatch[1].padStart(2, '0');
                monthYearStr = event.dates.display.replace(dayMatch ? dayMatch[0] : '', '').replace(/^th|st|nd|rd/i, '').replace(/to\s+\d+(th|st|nd|rd)?/i, '').trim();
              }

              return (  
                <motion.article
                  key={event.id}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -6,
                    transition: { duration: 0.35, ease: easeEditorial } 
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-[265px] h-[400px] shrink-0 snap-center select-none cursor-pointer"
                  onClick={() => setActiveModalEvent(event)}
                >
                  {/* Top Red Accent Accent Line */}
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left z-30 pointer-events-none" />

                  {/* LOGO CONTAINER */}
                  <div className="relative w-full h-[180px] shrink-0 overflow-hidden bg-neutral-50/70 p-5 flex items-center justify-center border-b border-neutral-100">
                    {eventImg ? (
                      <div className="relative w-full h-full max-h-[125px] flex items-center justify-center">
                        <Image
                          src={eventImg}
                          alt={event.name}
                          fill
                          sizes="265px"
                          className="object-contain object-center transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-mono uppercase tracking-wider">No Image</div>
                    )}

                    {/* Edition Badge */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[8.5px] font-mono font-bold tracking-[0.14em] uppercase text-neutral-800 shadow-2xs">
                      {event.edition || 'GLOBAL EDITION'}
                    </div>
                  </div>

                  {/* CONTENT AREA */}
                  <div className="relative z-10 p-5 flex flex-col justify-between flex-grow bg-white">
                    <div className="pt-0.5">
                      <h3 className="text-[16px] font-bold tracking-tight leading-snug text-neutral-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 mb-3">
                        {event.name}
                      </h3>

                      {/* DATE & VENUE */}
                      <div className="flex items-center gap-3 pt-1 pb-1">
                        <span className="text-[38px] font-black font-mono tracking-tighter text-neutral-900 leading-none">
                          {startDay}
                        </span>
                        <div className="flex flex-col text-xs font-mono tracking-wide text-neutral-700 uppercase leading-snug">
                          <span className="font-bold text-neutral-900 text-xs tracking-wider">{monthYearStr}</span>
                          <span className="flex items-center gap-1 text-neutral-500 truncate max-w-[135px] mt-1 text-[11px] font-medium">
                            <MapPin size={11} className="text-red-600 shrink-0" />
                            <span className="truncate">{event.venue?.city || 'Global'}, {event.venue?.country || 'Venue'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ACTION TRAY - SOFT LIGHT GLOW ON HOVER */}
                    <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        
                        {/* LINKEDIN */}
                        {event.socials?.linkedin && (
                          <div className="relative group/tooltip">
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 transform translate-y-1 group-hover/tooltip:translate-y-0">
                              LinkedIn
                            </span>
                            <Link
                              href={event.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-sky-50 hover:text-[#0A66C2] hover:border hover:border-sky-200/80 hover:shadow-[0_4px_14px_rgba(10,102,194,0.18)]"
                              aria-label="LinkedIn"
                            >
                              <Linkedin size={12} />
                            </Link>
                          </div>
                        )}

                        {/* FACEBOOK */}
                        {event.socials?.facebook && (
                          <div className="relative group/tooltip">
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 transform translate-y-1 group-hover/tooltip:translate-y-0">
                              Facebook
                            </span>
                            <Link
                              href={event.socials.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-blue-50 hover:text-[#1877F2] hover:border hover:border-blue-200/80 hover:shadow-[0_4px_14px_rgba(24,119,242,0.18)]"
                              aria-label="Facebook"
                            >
                              <Facebook size={12} />
                            </Link>
                          </div>
                        )}

                        {/* INSTAGRAM */}
                        {event.socials?.instagram && (
                          <div className="relative group/tooltip">
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 transform translate-y-1 group-hover/tooltip:translate-y-0">
                              Instagram
                            </span>
                            <Link
                              href={event.socials.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-pink-50 hover:text-[#e1306c] hover:border hover:border-pink-200/80 hover:shadow-[0_4px_14px_rgba(225,48,108,0.18)]"
                              aria-label="Instagram"
                            >
                              <Instagram size={12} />
                            </Link>
                          </div>
                        )}

                        {/* EMAIL */}
                        {event.socials?.email && (
                          <div className="relative group/tooltip">
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 transform translate-y-1 group-hover/tooltip:translate-y-0">
                              Email
                            </span>
                            <Link
                              href={mailHref}
                              className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-600 hover:border hover:border-red-200/80 hover:shadow-[0_4px_14px_rgba(220,38,38,0.18)]"
                              aria-label="Email"
                            >
                              <Mail size={12} />
                            </Link>
                          </div>
                        )}

                      </div>

                      {/* VISIT / INQUIRE BUTTON */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <Link
                          href={event.socials?.website || mailHref}
                          target={event.socials?.website ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-red-600 text-white hover:text-white font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-2xs active:scale-95"
                        >
                          <span className="text-white"> 
                            {event.socials?.website ? "Visit" : "Inquire"}
                          </span>
                          <ArrowUpRight size={11} className="text-white" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {upcomingEvents.length > 0 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-10">
            <button
              type="button"
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className="p-2.5 sm:p-3 rounded-full bg-white border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:hover:border-neutral-300 transition-all duration-300 text-neutral-800 shadow-2xs cursor-pointer active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: totalPages }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToPage(dotIdx)}
                  aria-label={`Go to page ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === dotIdx 
                      ? 'w-7 sm:w-8 h-2 bg-red-600' 
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollRight}
              disabled={activeIndex === totalPages - 1}
              className="p-2.5 sm:p-3 rounded-full bg-white border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:hover:border-neutral-300 transition-all duration-300 text-neutral-800 shadow-2xs cursor-pointer active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalEvent(null)}
              className="absolute inset-0 bg-[#050608]/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-neutral-200 flex flex-col items-center justify-center select-none"
            >
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full h-44 sm:h-52 flex items-center justify-center mb-5 rounded-2xl overflow-hidden bg-neutral-50 p-4 border border-neutral-100">
                {(activeModalEvent.heroImage || activeModalEvent.image) ? (
                  <Image
                    src={(activeModalEvent.heroImage || activeModalEvent.image)!}
                    alt={activeModalEvent.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="text-neutral-400 font-mono text-xs uppercase">
                    {activeModalEvent.name}
                  </span>
                )}
              </div>
              
              <div className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
                {activeModalEvent.edition || 'Global Event'}
              </div>

              <h4 className="text-center font-bold text-neutral-900 text-lg sm:text-xl mb-2 leading-snug">
                {activeModalEvent.name}
              </h4>

              <p className="text-xs font-mono text-neutral-500 text-center mb-6">
                {activeModalEvent.venue?.city}, {activeModalEvent.venue?.country} • {activeModalEvent.dates?.display}
              </p>

              <div className="flex items-center gap-3">
                {activeModalEvent.socials?.website && (
                  <Link
                    href={activeModalEvent.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-mono uppercase font-bold tracking-wider hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <span className="text-white">Visit Website</span>
                    <ArrowUpRight size={14} className="text-white" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default UpcomingExhibitions;