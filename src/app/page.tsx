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
import { SEOFAQSection } from '@/components/sections/SEOFAQSection'; // Added for PAA optimization

export const metadata: Metadata = {
  title: 'B2B Exhibition & Trade Fair Organizer in India | Futurex Group',
  description: 'Futurex Group organises sector-focused B2B trade exhibitions across India, South Asia and East Africa, connecting manufacturers, suppliers and trade buyers.',
  alternates: {
    canonical: 'https://www.futurextrade.com/',
  },
};

export default function HomePage() {
  // Structured Data (JSON-LD) for Homepage - WebSite name set to Futurex Group with alternateName
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Futurex Group',
    alternateName: 'Futurex Trade Fair & Events',
    url: 'https://www.futurextrade.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.futurextrade.com/exhibitions?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Futurex Group',
      legalName: 'Futurex Trade Fair & Events Private Limited',
      logo: 'https://www.futurextrade.com/logo.png',
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
      <SEOFAQSection /> {/* Naturally answers PAA queries for Google */}
      <CTASection />
    </>
  );
}