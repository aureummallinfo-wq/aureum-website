import { TrustLocationExperience } from '@/features/trust-location/components/TrustLocationExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { PageSchemas } from '@/features/content-seo/components/PageSchemas';
import { LOCATION_FAQS } from '@/features/content-seo/faqs';
export const metadata = createRouteMetadata('/location');
export default function Page(){return <><PageSchemas route="/location" faqs={LOCATION_FAQS} /><TrustLocationExperience /></>}
