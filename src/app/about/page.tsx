import { WordPressAboutPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';

export const metadata = createRouteMetadata('/about');

export default function AboutPage() {
  return <><BreadcrumbSchema route="/about" /><WordPressAboutPage /></>;
}
