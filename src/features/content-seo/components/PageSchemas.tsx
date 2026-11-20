import { BreadcrumbSchema } from './BreadcrumbSchema';
import { FaqSchema, type FaqItem } from './FaqSchema';
import { OfferSchema } from './OfferSchema';
import { VideoSchema, type VideoSchemaItem } from './VideoSchema';

type Props = {
  route: string;
  tableIds?: readonly string[];
  faqs?: readonly FaqItem[];
  videos?: readonly VideoSchemaItem[];
};

export function PageSchemas({ route, tableIds, faqs, videos }: Props) {
  return (
    <>
      <BreadcrumbSchema route={route} />
      {tableIds && <OfferSchema tableIds={tableIds} />}
      {faqs && <FaqSchema items={faqs} />}
      {videos && <VideoSchema videos={videos} />}
    </>
  );
}
