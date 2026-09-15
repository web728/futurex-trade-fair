import type { GalleryItem } from '@/types/content';
import autoGalleryData from './auto-gallery.json';

// Type casting the auto-generated JSON strictly to your types
export const galleryItems: GalleryItem[] = autoGalleryData as GalleryItem[];

// Pagination configuration (Set to 15 per page for optimal UX)
export const GALLERY_ITEMS_PER_PAGE = 15;