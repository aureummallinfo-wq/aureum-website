import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { LegalPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/privacy-policy');
export default function Page() { return <><BreadcrumbSchema route="/privacy-policy" /><LegalPage kind="privacy" /></>; }
