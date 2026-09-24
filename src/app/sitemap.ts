import type { MetadataRoute } from 'next';
import { EXHIBITIONS } from '@/data/exhibitions';
import { industries } from '@/data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
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
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;
    const url = route === '' ? `${baseUrl}/` : `${baseUrl}${cleanRoute}`;
    
    return {
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.7,
    };
  });

  // Safe mapping for exhibitions with robust date parsing and fallback
  const exhibitionMap = (EXHIBITIONS || []).map((event) => {
    let lastMod = new Date();
    try {
      if (event?.dates?.start) {
        const parsedDate = new Date(event.dates.start);
        if (!isNaN(parsedDate.getTime())) {
          lastMod = parsedDate;
        }
      }
    } catch {
      lastMod = new Date();
    }

    return {
      url: `${baseUrl}/exhibitions/${event?.id || ''}`,
      lastModified: lastMod,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  const industryMap = (industries || []).map((industry) => ({
    url: `${baseUrl}/industries/${industry?.slug || ''}`,
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