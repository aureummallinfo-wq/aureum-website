import { UnitFinderExperience } from '@/features/unit-finder/components/UnitFinderExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';

export const metadata = createRouteMetadata('/unit-finder');

export default function UnitFinderPage() {
  return <><BreadcrumbSchema route="/unit-finder" /><UnitFinderExperience /></>;
}
