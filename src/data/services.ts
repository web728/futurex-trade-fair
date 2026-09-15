import type { Service } from '@/types/content';
import { company } from './company';

const image = company.assets.hero;

export const services: Service[] = [
  { slug: 'exhibitions', name: 'Exhibitions', description: 'International trade exhibitions designed to bring manufacturers, suppliers, buyers and decision-makers into focused B2B environments.', image },
  { slug: 'conferences', name: 'Conferences', description: 'Professional conference formats centered on concise presentations, discussion and practical sector knowledge exchange.', image },
  { slug: 'events', name: 'Events', description: 'Purposeful business meetings and events planned around logistics, engagement and measurable outcomes.', image },
  { slug: 'designing-studio', name: 'Designing Studio', description: 'Creative exhibition stand design and execution delivered through Futurex Studio.', image },
  { slug: 'branding-promotions', name: 'Branding & Promotions', description: 'Promotional support spanning media, presentations, digital communication and event visibility.', image },
  { slug: 'webinars', name: 'Webinars / Virtual Platform', description: 'Live online programming, webcasts and virtual exhibition experiences for distributed professional audiences.', image }
];

export const getService = (slug: string) => services.find((item) => item.slug === slug);
