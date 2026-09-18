"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Layers, RotateCcw, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ExhibitionEvent } from '@/data/exhibitions';
import { ExhibitionCard } from './ExhibitionCard';

const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ExhibitionFiltersProps {
  groupedEvents: { year: string; events: ExhibitionEvent[] }[];
}

export function ExhibitionFilters({ groupedEvents }: ExhibitionFiltersProps) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState<ExhibitionEvent | null>(null);
  const [visibleLimit, setVisibleLimit] = useState(6);

  const allEvents = useMemo(() => groupedEvents.flatMap((g) => g.events), [groupedEvents]);

  const countries = useMemo(
    () => ['All', ...Array.from(new Set(allEvents.map((e) => e.venue?.country).filter(Boolean)))],
    [allEvents]
  );

  const industries = useMemo(
    () => ['All', ...Array.from(new Set(allEvents.map((e) => e.industry).filter(Boolean)))],
    [allEvents]
  );

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEvents.filter((event) => {
      const matchesQuery =
        !q ||
        [event.name, event.venue?.city, event.venue?.country, event.industry, event.dates?.display].some(
          (v) => v && v.toLowerCase().includes(q)
        );

      const matchesCountry = selectedCountry === 'All' || event.venue?.country === selectedCountry;
      const matchesIndustry = selectedIndustry === 'All' || event.industry === selectedIndustry;

      return matchesQuery && matchesCountry && matchesIndustry;
    });
  }, [allEvents, query, selectedCountry, selectedIndustry]);

  const filteredGrouped = useMemo(() => {
    let count = 0;
    const map = new Map<string, ExhibitionEvent[]>();

    for (const event of filteredEvents) {
      if (count >= visibleLimit && query === '' && selectedCountry === 'All' && selectedIndustry === 'All') {
        break;
      }
      const year = event.dates?.start?.slice(0, 4) || '2026';
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(event);
      count++;
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, events]) => ({
        year,
        events: events.sort((a, b) => a.dates.start.localeCompare(b.dates.start)),
      }));
  }, [filteredEvents, visibleLimit, query, selectedCountry, selectedIndustry]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCountry('All');
    setSelectedIndustry('All');
    setVisibleLimit(6);
  };

  const hasActiveFilters = query !== '' || selectedCountry !== 'All' || selectedIndustry !== 'All';
  const canLoadMore = !hasActiveFilters && visibleLimit < filteredEvents.length;

  return (
    <div className="space-y-12">
      
      {/* Minimal Filter Dock */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleLimit(100);
              }}
              placeholder="Search by exhibition, city, country, or sector..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#FBFBFD] border border-neutral-200/80 rounded-xl text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Region:</span>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setVisibleLimit(100);
                }}
                className="px-3 py-2 bg-[#FBFBFD] border border-neutral-200/80 rounded-xl text-xs font-mono text-neutral-800 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Sector:</span>
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value);
                  setVisibleLimit(100);
                }}
                className="px-3 py-2 bg-[#FBFBFD] border border-neutral-200/80 rounded-xl text-xs font-mono text-neutral-800 focus:outline-none focus:border-red-600 cursor-pointer max-w-[160px] truncate"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Chronological Year Sections with Elegant Minimal Dividers */}
      <div className="space-y-16">
        {filteredGrouped.map((group) => (
          <motion.div 
            key={group.year} 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: easeEditorial }}
            className="space-y-6"
          >
            {/* Low-profile, Elegant Year Header */}
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/90 shadow-2xs">
               <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                     <Image
                       src="/logos/svg/logo-arrow.png"
                       alt="Icon"
                       fill
                       className="object-contain"
                     />
                   </div>
                <span className="font-mono text-xs font-bold tracking-[0.16em] uppercase text-[#0A0D12]">
                  {group.year} SERIES
                </span>
              </div>
              <div className="flex-1 h-px bg-neutral-200/80" />
             
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.events.map((event) => (
                <ExhibitionCard
                  key={event.id || event.name}
                  event={event}
                  onSelect={(e) => setActiveModalEvent(e)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {canLoadMore && (
        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={() => setVisibleLimit((prev) => prev + 6)}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-900 border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-white font-mono text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer"
          >
            <span>Load More</span>
            <ChevronDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

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
    </div>
  );
}

export default ExhibitionFilters;