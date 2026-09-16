import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/PageHero';
import { GallerySection } from '@/components/sections/GallerySection';
import { CTASection } from '@/components/sections/CTASection';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Gallery & Media Archive', 
  'Experience Futurex exhibitions, conferences, webinars, media coverage and virtual platform activity.', 
  '/gallery'
);

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-[#FBFBFD] text-[#0A0D12] selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* ========================================================================= */}
      {/* ARCHITECTURAL BACKGROUND SVGs (Matching Exhibitions & Premium Layouts) */}
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

      {/* ========================================================================= */}
      {/* PREMIUM PAGE HERO SECTION */}
      {/* ========================================================================= */}
      <div className="relative z-10 border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="GALLERY & MEDIA ARCHIVE" 
          title={
            <>
              Trade Floor Legacy. <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Visual Moments & Archives
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Browse through our comprehensive visual catalog of high-impact international trade exhibitions, B2B conferences, webinars, and global media highlights." 
        />
      </div>

      {/* Full Gallery Section with 2600+ Auto-Mapped Assets & Pagination */}
      <GallerySection full />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}