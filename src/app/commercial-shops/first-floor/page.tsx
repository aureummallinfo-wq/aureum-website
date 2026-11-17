import { ButtonLink } from '@/components/ui/ButtonLink';
import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { FLOOR_PLAN_IMAGES, MALL_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/commercial-shops/first-floor');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Commercial / first floor · 18 ft"
      title="First floor shops at Aureum Mall."
      intro="Shops from 172 to 707 sq ft around the central atrium, anchored by a 15,224 sq ft supermarket. From PKR 8,600,000 at PKR 50,000 per sq ft."
      image={MALL_IMAGES[1]}
      payment={{ href: "/payment-plans/first-floor-shops", label: "View the first-floor payment plan" }}
      features={['Shops from 172 to 707 sq ft', 'Anchored by a 15,224 sq ft grocery store', '3.5-year plan: 10% booking, 42 monthly + half-yearly installments', 'Indicative possession in 2.5 years']}
      plans={[FLOOR_PLAN_IMAGES[1]]}
      interest="commercial_shop"
      registerLabel="First floor shops"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[MALL_IMAGES[1], MALL_IMAGES[2]]} branded /></div></section>
      <div className="container"><ButtonLink href="/commercial-shops#brochures" variant="dark">Find the Commercial & Food Court brochure</ButtonLink></div>
    </WordPressPropertyPage>
  );
}
