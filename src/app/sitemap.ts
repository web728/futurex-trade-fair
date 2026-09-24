import type { MetadataRoute } from 'next';
import { EXHIBITIONS } from '@/data/exhibitions';
import { industries } from '@/data/industries';
import { absoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base domain enforced strictly to https://www.futurextrade.com
  const baseUrl = 'https://www.futurextrade.com';

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

  const staticMap = staticRoutes.map((route) => {
    // Ensuring exact URL mapping matching canonical preferences
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    const url = route === '' ? `${baseUrl}/` : `${baseUrl}${cleanRoute}`;
    
    return {
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.7,
    };
  });

  const exhibitionMap = (EXHIBITIONS || []).map((event) => ({
    url: `${baseUrl}/exhibitions/${event.id}`,
    lastModified: new Date(event.dates?.start || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const industryMap = (industries || []).map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticMap,
    ...exhibitionMap,
    ...industryMap,
  ];
}