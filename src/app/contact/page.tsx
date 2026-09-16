import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactCard } from '@/components/forms/ContactCard';
import { MapSection } from '@/components/sections/MapSection';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Contact Us', 
  'Contact Futurex Trade Fair & Events PVT. LTD. in New Delhi for exhibition, visitor, sponsor, partnership and service enquiries.', 
  '/contact'
);

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ event?: string }> }) {
  const query = searchParams ? await searchParams : {};

  return (
    <main className="relative bg-[#FBFBFD] text-[#0A0D12] overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Editorial Hero Header */}
      <div className="border-b border-neutral-200/80 bg-white">
        <PageHero 
          eyebrow="CONTACT US" 
          title={
            <>
              Start A Business <br />
              <span className="font-serif italic font-normal text-neutral-500">
                Conversation
              </span>
              <span className="text-red-600 font-sans">.</span>
            </>
          } 
          description="Connect with Futurex Trade Fair & Events Pvt. Ltd. in New Delhi for global exhibitions and strategic partnerships." 
        />
      </div>

      {/* Main Layout Container */}
      <section className="relative z-20 py-20 sm:py-28 bg-[#FBFBFD] border-b border-neutral-200/80 select-none">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Right Contact Form (Crisp Light Sheet) — Appears FIRST on Mobile */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ContactForm defaultEvent={query.event || ''} />
            </div>

            {/* Left Contact Card (Ultra-Clean Dark Monolith) — Appears SECOND on Mobile */}
            <div className="lg:col-span-5 h-full order-2 lg:order-1">
              <ContactCard />
            </div>

          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <MapSection />
    </main>
  );
}