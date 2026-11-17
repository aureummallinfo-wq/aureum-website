import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ApartmentDetail } from '../ApartmentDetail';

export const metadata = createRouteMetadata('/apartments/1-bed');

export default function Page() {
  return <ApartmentDetail type="1-bed" />;
}
