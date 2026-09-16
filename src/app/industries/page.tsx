import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/PageHero';
import { IndustryGrid } from '@/components/industries/IndustryGrid';
import { CTASection } from '@/components/sections/CTASection';
import { industries } from '@/data/industries';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Industries', 
  'Explore the industrial sectors connected through Futurex Group exhibitions and business events.', 
  '/industries'
);

export default function IndustriesPage() {
  return (
    <main className="relative bg-[#FBFBFD] text-[#0A0D12] overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Editorial Page Hero */}
      <div className="border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="INDUSTRIAL DIRECTORY" 
          title={
            <>
              Sectors We <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Connect & Bridge
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Focused, high-impact exhibition platforms designed to bridge emerging technologies and business expansion across global markets." 
        />
      </div>

      {/* Main Grid Section */}
      <section className="relative z-20 py-20 sm:py-28 bg-[#FBFBFD] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <IndustryGrid industries={industries} />
        </div>
      </section>

      {/* Call To Action Section */}
      <CTASection />
    </main>
  );
}