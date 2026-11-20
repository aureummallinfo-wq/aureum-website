import { SITE } from '@/lib/site';
import { JsonLd } from './JsonLd';

export type VideoSchemaItem = {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration?: string;
};

export function VideoSchema({ videos }: { videos: readonly VideoSchemaItem[] }) {
  if (!videos.length) return null;

  if (videos.length === 1) {
    const v = videos[0];
    return (
      <JsonLd
        id="video-schema"
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: v.name,
          description: v.description,
          thumbnailUrl: v.thumbnailUrl.startsWith('/') ? `${SITE.url}${v.thumbnailUrl}` : v.thumbnailUrl,
          contentUrl: v.contentUrl.startsWith('/') ? `${SITE.url}${v.contentUrl}` : v.contentUrl,
          uploadDate: v.uploadDate,
          ...(v.duration ? { duration: v.duration } : {}),
        }}
      />
    );
  }

  return (
    <JsonLd
      id="video-schema"
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: videos.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'VideoObject',
            name: v.name,
            description: v.description,
            thumbnailUrl: v.thumbnailUrl.startsWith('/') ? `${SITE.url}${v.thumbnailUrl}` : v.thumbnailUrl,
            contentUrl: v.contentUrl.startsWith('/') ? `${SITE.url}${v.contentUrl}` : v.contentUrl,
            uploadDate: v.uploadDate,
            ...(v.duration ? { duration: v.duration } : {}),
          },
        })),
      }}
    />
  );
}
