import type { Industry } from '@/types/content';
import { company } from './company';

const image = company.assets.exhibition;

export const industries: Industry[] = [
  { slug: 'building-construction', name: 'Building & Construction', description: 'Building materials, construction machinery, equipment, technologies and project solutions.', image },
  { slug: 'agriculture', name: 'Agriculture', description: 'Farm machinery, agricultural technology, inputs, processing and allied solutions.', image },
  { slug: 'wood-woodworking', name: 'Wood & Woodworking', description: 'Woodworking machinery, furniture production, materials, fittings and manufacturing technologies.', image },
  { slug: 'electric-vehicles', name: 'Electric Vehicles', description: 'Electric vehicles, batteries, charging infrastructure, components and mobility technologies.', image },
  { slug: 'power-energy', name: 'Power & Energy', description: 'Electrical equipment, power systems, solar, lighting and energy technologies.', image },
  { slug: 'mining-infrastructure', name: 'Mining & Infrastructure', description: 'Mining machinery, heavy equipment, mineral processing, infrastructure and supporting technologies.', image },
  { slug: 'pharmaceuticals', name: 'Pharmaceuticals', description: 'Professional B2B opportunities across healthcare and pharmaceutical markets.', image },
  { slug: 'home-appliances', name: 'Home Appliances', description: 'Business networking for appliance brands, suppliers and distribution partners.', image },
  { slug: 'garments', name: 'Garments', description: 'Trade platforms serving garment manufacturing and connected supply chains.', image },
  { slug: 'education', name: 'Education', description: 'Professional engagement across education markets, services and institutional networks.', image },
  { slug: 'printing-packaging', name: 'Printing & Packaging', description: 'Exhibitions for printing, corrugation, packaging and converting industries.', image }
];

export const getIndustry = (slug: string) => industries.find((item) => item.slug === slug);