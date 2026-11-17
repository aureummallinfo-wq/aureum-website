import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ApartmentDetail } from '../ApartmentDetail';

export const metadata = createRouteMetadata('/apartments/studio');

export default function Page() {
  return <ApartmentDetail type="studio" />;
}
