import { WordPressNewsPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { getNewsCards } from '@/features/news/posts';

export const metadata = createRouteMetadata('/news');

export default function NewsPage() {
  return <><BreadcrumbSchema route="/news" /><WordPressNewsPage items={getNewsCards()} /></>;
}
