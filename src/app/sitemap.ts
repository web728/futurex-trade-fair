import type { MetadataRoute } from 'next';
import { EXHIBITIONS } from '@/data/exhibitions';

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
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions'
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

  // Type safety ke liye (event: any) use kiya hai taaki TypeScript error na aaye
  const exhibitionMap = (EXHIBITIONS || [])
    .filter((event: any) => event && (event.id || event.slug))
    .map((event: any) => {
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

      // Slug ho toh slug use karein, nahi toh id
      const rawIdentifier = event.slug || event.id;
      const safeIdentifier = encodeURIComponent(String(rawIdentifier).trim());

      return {
        url: `${baseUrl}/exhibitions/${safeIdentifier}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  return [
    ...staticMap,
    ...exhibitionMap,
  ];
}