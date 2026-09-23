import type { Service } from '@/types/content';
import { company } from './company';

const image = company.assets.hero;

export const services: Service[] = [
  { slug: 'trade-exhibition-management', name: 'Trade Exhibition Management', description: 'Show concept, positioning, exhibitor sales, visitor promotion, venue coordination and on-ground execution.', image },
  { slug: 'conferences-knowledge-programmes', name: 'Conferences & Knowledge Programmes', description: 'Sector-led conferences, panels and technical sessions planned around the exhibition audience.', image },
  { slug: 'corporate-industry-events', name: 'Corporate & Industry Events', description: 'Business meetings, product launches, networking formats and industry events built around a clear purpose.', image },
  { slug: 'exhibition-stand-design-build', name: 'Exhibition Stand Design & Build', description: 'Custom stand design, fabrication and installation delivered through Futurex Studio.', image },
  { slug: 'marketing-promotion', name: 'Marketing & Promotion', description: 'Digital campaigns, media outreach, databases, partnerships and market-specific promotion for exhibitors and visitors.', image },
  { slug: 'exhibitor-visitor-services', name: 'Exhibitor & Visitor Services', description: 'Registration, exhibitor coordination, visitor assistance and operational support before and during the show.', image }
];

export const getService = (slug: string) => services.find((item) => item.slug === slug);