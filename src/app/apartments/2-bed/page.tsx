import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ApartmentDetail } from '../ApartmentDetail';

export const metadata = createRouteMetadata('/apartments/2-bed');

export default function Page() {
  return <ApartmentDetail type="2-bed" />;
}
