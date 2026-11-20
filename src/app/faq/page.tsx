import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { FaqPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/faq');
export default function Page() { return <><BreadcrumbSchema route="/faq" /><FaqPage /></>; }
