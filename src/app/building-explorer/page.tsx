import { BuildingExplorerExperience } from '@/features/building-explorer/components/BuildingExplorerExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';

export const metadata = createRouteMetadata('/building-explorer');

export default function BuildingExplorerPage() {
  return <><BreadcrumbSchema route="/building-explorer" /><BuildingExplorerExperience /></>;
}
