import { WordPressPropertyPage } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { FOOD_COURT_IMAGE, LEISURE_IMAGES, MALL_IMAGES } from '@/features/project-showcase/images';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = createRouteMetadata('/commercial-shops');

export default function Page() {
  return (
    <WordPressPropertyPage
      eyebrow="Commercial / retail and food court"
      title="Room to make an impression."
      intro="Three retail levels around a central atrium, with tall ceilings, wide passages and a glass facade visible from Ring Road. Shops from 172 sq ft and PKR 8,600,000."
      image={MALL_IMAGES[0]}
      payment={{ href: "/payment-plans", label: "Compare payment plans" }}
      features={['Ceiling heights of 26 ft (ground) and 18 ft (first and second)', 'A 15,224 sq ft grocery store, travelators and kiosks', 'Separate commercial entrance and 2 dedicated elevators', 'Food court beside an 11,948 sq ft playland and trampoline park']}
      destinations={[
        { href: '/commercial-shops/ground-floor', title: 'Ground floor', description: 'Showroom and large-format retail. Pricing on request.' },
        { href: '/commercial-shops/first-floor', title: 'First floor', description: 'Shops around the atrium and the planned grocery store.' },
        { href: '/payment-plans/second-floor-shops', title: 'Second floor', description: 'Open the available sizes, prices and payment schedule.' },
        { href: '/food-court', title: 'Third floor · Food Court', description: 'Dining next to the planned playland.' },
      ]}
      interest="commercial_shop"
      registerLabel="Commercial enquiry"
    >
      <section className="section showcaseSection">
        <div className="container">
          <SectionHeading eyebrow="Shopping at Aureum" title="Display. Welcome. Inspire." description="Retail, dining and leisure that give families more reasons to visit and stay." />
          <ShowcaseGallery images={[...MALL_IMAGES, FOOD_COURT_IMAGE, ...LEISURE_IMAGES.slice(0, 2)]} branded />
        </div>
      </section>
      <BrochureDownloads only={['commercial']} />
    </WordPressPropertyPage>
  );
}
