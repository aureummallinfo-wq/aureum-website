import { ConstructionUpdatesSection } from '@/features/trust-location/components/TrustLocationExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { PageSchemas } from '@/features/content-seo/components/PageSchemas';
import { SITE_UPDATES } from '@/features/trust-location/site-updates';
import type { VideoSchemaItem } from '@/features/content-seo/components/VideoSchema';

export const metadata = createRouteMetadata('/construction-updates');

const siteVideos: VideoSchemaItem[] = SITE_UPDATES.map((update) => ({
  name: `Aureum Mall Construction Update: ${update.title}`,
  description: update.summary,
  thumbnailUrl: update.poster,
  contentUrl: update.video,
  uploadDate: update.date,
  duration: `PT${update.duration.replace(':', 'M')}S`,
}));

export default function Page(){return <><PageSchemas route="/construction-updates" videos={siteVideos} /><ConstructionUpdatesSection standalone /></>}
