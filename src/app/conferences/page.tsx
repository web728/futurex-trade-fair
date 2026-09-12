import type { Metadata } from 'next';
import { MapPin, ArrowUpRight, Calendar, Building2 } from 'lucide-react';
import { PageHero } from '@/components/hero/PageHero';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { conferences } from '@/data/conferences';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Conferences', 
  'Futurex conference platforms for presentations, professional discussion and industry knowledge exchange.', 
  '/conferences'
);

export default function ConferencesPage() {
  const safeConferences = conferences || [];

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL PAGE HERO */}
      {/* ========================================================================= */}
      <div className="border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="CONFERENCE PLATFORMS" 
          title={
            <>
              Knowledge Shared In <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Focused Business Settings
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Futurex conferences bring presentations, professional discussion and industry exchange into concise formats." 
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. PLATFORM OVERVIEW SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-20 py-20 sm:py-24 bg-white border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>EXCHANGE FORMAT</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#0A0D12] leading-tight">
                Concise Presentations. <br />
                <span className="font-serif italic font-normal text-neutral-500">Relevant Discussion</span>
                <span className="text-red-600 font-sans">.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-neutral-600 text-sm sm:text-base font-normal leading-[1.85]">
                Futurex’s conference activity is built around expert presentations followed by structured roundtable discussions, with an emphasis on practical knowledge exchange and high-value industry dialogue.
              </p>
              <div>
                <Button 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0A0D12] hover:bg-red-600 text-white text-xs font-mono tracking-[0.14em] uppercase transition-all duration-300 shadow-sm"
                >
                  <span>Plan A Conference</span>
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PAST CONFERENCES CHRONOLOGICAL LEDGER */}
      {/* ========================================================================= */}
      <section className="relative z-20 py-20 sm:py-28 bg-[#FBFBFD] border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200/80 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[10.5px] font-mono tracking-[0.16em] uppercase text-neutral-600 mb-3 shadow-2xs">
                <span>ARCHIVED SUMMITS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.035em] text-[#0A0D12]">
                Past Conferences & <br />
                <span className="font-serif italic font-normal text-neutral-500">Industry Forums</span>
                <span className="text-red-600 font-sans">.</span>
              </h2>
            </div>
            <span className="text-xs font-mono tracking-[0.14em] uppercase text-neutral-400">
              {safeConferences.length} Sessions Cataloged
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeConferences.map((item, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <article 
                  key={`${item.title}-${item.date}`}
                  className="group relative bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-3xl p-7 sm:p-8 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Red Laser Hairline Accent on Hover */}
                  <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left z-20" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-red-600 transition-colors">
                        {formattedIndex}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-[10px] font-mono uppercase tracking-wider">
                        {item.series || 'Symposium'}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#0A0D12] mb-3 tracking-tight group-hover:text-red-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-neutral-700 font-medium">
                      <Calendar size={13} className="text-red-600" />
                      <span>{item.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-neutral-500 font-mono text-[11px]">
                      <MapPin size={13} className="text-neutral-400" />
                      <span>{item.city}, {item.region}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CTA SECTION */}
      {/* ========================================================================= */}
      <CTASection />

    </main>
  );
}