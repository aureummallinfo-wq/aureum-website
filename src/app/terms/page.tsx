import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { LegalPage } from '@/features/site-architecture/components/ArchitectureLanding';
export const metadata = createRouteMetadata('/terms');
export default function Page() { return <><BreadcrumbSchema route="/terms" /><LegalPage kind="terms" /></>; }
