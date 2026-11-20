import { ButtonLink } from '@/components/ui/ButtonLink';
import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { FLOOR_PLAN_IMAGES, MALL_IMAGES } from '@/features/project-showcase/images';

export const metadata = createRouteMetadata('/commercial-shops/ground-floor');

export default function Page() {
  return (
    <>
    <BreadcrumbSchema route="/commercial-shops/ground-floor" />
    <WordPressPropertyPage
      eyebrow="Commercial / ground floor · 26 ft"
      title="Ground floor retail at Aureum Mall."
      intro="Large-format retail, a showroom and the central atrium beneath a 26 ft ceiling, with a glass facade facing Ring Road. Ground-floor prices are available on request."
      image={MALL_IMAGES[2]}
      payment={{ href: "#property-plans", label: "View the ground floor plan" }}
      features={['26 ft ceiling height', 'Large-format retail and a showroom', 'Central atrium and a 28 × 50 ft commercial lobby', 'Prices on request']}
      plans={[FLOOR_PLAN_IMAGES[0]]}
      interest="commercial_shop"
      registerLabel="Ground floor shops"
    >
      <section className="section showcaseSection"><div className="container"><ShowcaseGallery images={[MALL_IMAGES[0]]} branded /></div></section>
      <div className="container"><ButtonLink href="/commercial-shops#brochures" variant="dark">Find the Commercial & Food Court brochure</ButtonLink></div>
    </WordPressPropertyPage>
    </>
  );
}
