import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/PageHero';
import { ExhibitionFilters } from '@/components/exhibitions/ExhibitionFilters';
import { EXHIBITIONS, groupExhibitionsByYear } from '@/data/exhibitions';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Exhibitions', 
  'Discover Futurex international B2B exhibitions portfolio.', 
  '/exhibitions'
);

export default function ExhibitionsPage() {
  const groupedEvents = groupExhibitionsByYear(EXHIBITIONS || []);

  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* MEDIUM STATIC ARCHITECTURAL SVGs (ZIGZAG CORNER ANCHORS) */}
      {/* ========================================================================= */}
      {/* Top Left Medium SVG */}
      <div className="absolute top-16 left-8 pointer-events-none opacity-[0.06] z-0 hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
          <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 6" />
          <circle cx="120" cy="120" r="60" stroke="currentColor" strokeWidth="1.2" />
          <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="120" cy="120" r="5" fill="#dc2626" />
        </svg>
      </div>

      {/* Mid Right Medium SVG */}
      <div className="absolute top-[38%] right-10 pointer-events-none opacity-[0.05] z-0 hidden lg:block">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
          <rect x="25" y="25" width="210" height="210" rx="20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 6" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="1.2" />
          <line x1="130" y1="10" x2="130" y2="250" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Lower Left Medium SVG */}
      <div className="absolute top-[72%] left-10 pointer-events-none opacity-[0.05] z-0 hidden lg:block">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none">
          <polygon points="125,15 235,225 15,225" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle cx="125" cy="150" r="45" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="125" cy="150" r="6" fill="#dc2626" />
        </svg>
      </div>

      {/* Hero Header */}
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
          description="Browse Futurex's verified international trade fair series across South Asia and East Africa." 
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