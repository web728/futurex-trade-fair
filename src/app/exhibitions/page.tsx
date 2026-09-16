import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/PageHero';
import { ExhibitionFilters } from '@/components/exhibitions/ExhibitionFilters';
import { EXHIBITIONS, groupExhibitionsByYear } from '@/data/exhibitions';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Exhibitions', 
  'Discover Futurex Group international B2B exhibitions portfolio.', 
  '/exhibitions'
);

export default function ExhibitionsPage() {
  const groupedEvents = groupExhibitionsByYear(EXHIBITIONS || []);

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* MEDIUM VISIBLE BACKGROUND ARCHITECTURAL SVGs (ZIGZAG PLACEMENT) */}
      {/* ========================================================================= */}
      <div className="absolute top-28 left-8 pointer-events-none opacity-[0.09] z-0 hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="110" cy="110" r="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="110" y1="0" x2="110" y2="220" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="110" cy="110" r="6" fill="#dc2626" />
        </svg>
      </div>

      <div className="absolute top-[45%] right-10 pointer-events-none opacity-[0.08] z-0 hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          <rect x="20" y="20" width="200" height="200" rx="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="120" cy="120" r="65" stroke="currentColor" strokeWidth="1.5" />
          <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-[75%] left-10 pointer-events-none opacity-[0.08] z-0 hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <polygon points="110,15 205,205 15,205" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="110" cy="140" r="40" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="110" cy="140" r="6" fill="#dc2626" />
        </svg>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="EXHIBITION DIRECTORY" 
          title={
            <>
              Trade Portfolios. <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Key Industrial Summits
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Browse Futurex Group verified international trade fair series across South Asia and East Africa." 
        />
      </div>

      {/* Gallery Section */}
      <section className="relative z-10 py-16 sm:py-24 bg-[#FBFBFD]" id="event-discovery">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <ExhibitionFilters groupedEvents={groupedEvents} />
        </div>
      </section>
    </main>
  );
}