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

  // Filtered flat list
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

  // Re-group filtered events by year with pagination limit support
  const filteredGrouped = useMemo(() => {
    let count = 0;
    const map = new Map<string, ExhibitionEvent[]>();

    for (const event of filteredEvents) {
      if (count >= visibleLimit && query === '' && selectedCountry === 'All' && selectedIndustry === 'All') {
        break; // Stop once visible limit is reached for default view
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
      
      {/* FILTER CONTROL DOCK */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleLimit(100); // Show all during search
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

        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>CHRONOLOGICAL DIRECTORY</span>
          <span>SHOWING {Math.min(visibleLimit, filteredEvents.length)} OF {filteredEvents.length} EXHIBITIONS</span>
        </div>
      </div>

      {/* CHRONOLOGICAL YEAR DIVIDERS & CARDS */}
      <div className="space-y-16">
        {filteredGrouped.map((group) => (
          <motion.div 
            key={group.year} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: easeEditorial }}
            className="space-y-8"
          >
            {/* Prominent Premium Year Divider */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-[#0A0D12] text-white shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-heading text-lg sm:text-xl font-black tracking-tight text-white">
                  {group.year}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 pl-1 border-l border-white/20">
                  Edition Series
                </span>
              </div>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent" />
              <span className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider">
                {group.events.length} {group.events.length === 1 ? 'Event' : 'Events'}
              </span>
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
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-neutral-900 hover:bg-red-600 text-white font-mono text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Load More Editions</span>
            <ChevronDown size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 bg-white border border-neutral-200/80 rounded-3xl">
          <Layers className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-neutral-900 mb-1">No Exhibitions Found</h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-5 leading-relaxed">
            No exhibitions match your search parameters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 bg-red-600 text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-red-500 transition-colors shadow-2xs cursor-pointer"
          >
            Clear Filters
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