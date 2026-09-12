import type { MetadataRoute } from 'next';
import { EXHIBITIONS } from '@/data/exhibitions';
import { industries } from '@/data/industries';
import { absoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', 
    '/about', 
    '/exhibitions', 
    '/industries', 
    '/services', 
    '/global-presence', 
    '/participants', 
    '/gallery', 
    '/conferences', 
    '/webinars', 
    '/contact'
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...(EXHIBITIONS || []).map((event) => ({
      url: absoluteUrl(`/exhibitions/${event.id}`),
      lastModified: new Date(event.dates?.start || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...(industries || []).map((industry) => ({
      url: absoluteUrl(`/industries/${industry.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}