import { WordPressGalleryPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';

export const metadata = createRouteMetadata('/gallery');

export default function GalleryPage() {
  return <><BreadcrumbSchema route="/gallery" /><WordPressGalleryPage /></>;
}
