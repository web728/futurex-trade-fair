import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero/HeroSection';
import { UpcomingExhibitions } from '@/components/sections/UpcomingExhibitions';
import { StatsSection } from '@/components/sections/StatsSection';
import { GlobalPresence } from '@/components/sections/GlobalPresence';
import { IndustrySection } from '@/components/sections/IndustrySection';
import { AboutStory } from '@/components/sections/AboutStory';
import ServicesSection from '@/components/services/ServicesSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { GallerySection } from '@/components/sections/GallerySection';
import { GroupCompanies } from '@/components/sections/GroupCompanies';
import { CTASection } from '@/components/sections/CTASection';
import { createMetadata } from '@/lib/metadata';
import { company } from '@/data/company';

export const metadata: Metadata = createMetadata(
  'International Trade Fairs & B2B Exhibitions Organizer',
  'Futurex Trade Fair & Events is a premier international B2B exhibitions and trade show organizer in New Delhi, India, connecting global manufacturers, buyers, and industry leaders across 220+ successful industrial expos.',
  '/'
);

export default function HomePage() {
  // Structured Data (JSON-LD) for Homepage - Corporate Event Organizer & Exhibition Series
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Futurex Trade Fair & Events',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://futurextrade.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://futurextrade.com'}/exhibitions?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: company?.legalName || 'Futurex Trade Fair & Events Pvt. Ltd.',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://futurextrade.com'}/logo.png`,
    },
  };

  return (
    <>
      {/* SEO Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <HeroSection />
      <StatsSection />
      <UpcomingExhibitions />
      <AboutStory />
      <IndustrySection />
      <GlobalPresence />
      <ServicesSection />
      <Testimonials />
      <GallerySection />
      <GroupCompanies />
      <CTASection />
    </>
  );
}