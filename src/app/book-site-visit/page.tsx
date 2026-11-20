import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { SiteVisitPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/book-site-visit');
export default function Page() { return <><BreadcrumbSchema route="/book-site-visit" /><SiteVisitPage /></>; }
