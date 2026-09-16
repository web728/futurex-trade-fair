import type { Metadata } from 'next';
import { HeroSection } from '@/components/hero/HeroSection';
import { UpcomingExhibitions } from '@/components/sections/UpcomingExhibitions';
import { StatsSection } from '@/components/sections/StatsSection';
import { GlobalPresence } from '@/components/sections/GlobalPresence';
import { IndustrySection } from '@/components/sections/IndustrySection';
import { AboutStory } from '@/components/sections/AboutStory';
import  ServicesSection  from '@/components/services/ServicesSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { GallerySection } from '@/components/sections/GallerySection';
import { GroupCompanies } from '@/components/sections/GroupCompanies';
import { CTASection } from '@/components/sections/CTASection';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata(
  'Global B2B Exhibitions & Business Events',
  'Futurex Trade Fair & Events PVT. LTD. creates international exhibition platforms connecting manufacturers, buyers and industry professionals across global markets.',
  '/'
);

export default function HomePage() {
  return (
    <>
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
