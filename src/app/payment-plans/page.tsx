import { PaymentPlansExperience } from '@/features/payment-plans/components/PaymentPlansExperience';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { PageSchemas } from '@/features/content-seo/components/PageSchemas';
import { PAYMENT_PLANS_FAQS } from '@/features/content-seo/faqs';

export const metadata = createRouteMetadata('/payment-plans');

export default function Page(){return <><PageSchemas route="/payment-plans" tableIds={['apartments', 'offices', 'first-floor-shops', 'second-floor-shops', 'food-court']} faqs={PAYMENT_PLANS_FAQS} /><PaymentPlansExperience /></>}
