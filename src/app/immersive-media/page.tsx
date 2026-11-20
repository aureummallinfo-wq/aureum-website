import { ImmersiveMediaExperience } from '@/features/immersive-media/components/ImmersiveMediaExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';

export const metadata = createRouteMetadata('/immersive-media');

export default function ImmersiveMediaPage() {
  return <><BreadcrumbSchema route="/immersive-media" /><ImmersiveMediaExperience /></>;
}
