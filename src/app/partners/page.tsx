import { ButtonLink } from '@/components/ui/ButtonLink';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BreadcrumbSchema } from '@/features/content-seo/components/BreadcrumbSchema';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MALL_IMAGES } from '@/features/project-showcase/images';
import { ArchitectureLanding } from '@/features/site-architecture/components/ArchitectureLanding';

export const metadata = createRouteMetadata('/partners');

export default function Page() {
  return (
    <><BreadcrumbSchema route="/partners" />
    <ArchitectureLanding
      eyebrow="Sales partners / Aureum"
      title="Bring the right project information to your clients."
      intro="Approved sales materials, the current price list and a direct line to the Aureum team for partner enquiries."
      image={MALL_IMAGES[0]}
      ctaHref="/contact?interest=other#enquiry"
      ctaLabel="Contact the partner team"
      summaryTitle="Approved details, every time."
      summaryText="Find the current project catalogue and factsheet, and keep every client conversation anchored to the published prices and plans."
      summaryHref="/payment-plans"
      summaryLabel="See the current price list"
      points={['Current catalogue, collections and factsheet', 'Published price list and payment plans', 'Apartments, shops, food court and offices', 'Direct contact with the Aureum sales team']}
    >
      <div className="container"><ButtonLink href="/about#brochures" variant="dark">Find the Aureum Catalogue and factsheet</ButtonLink></div>
      <section className="section wpInquirySection" id="partner-enquiry">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Partner enquiry</Eyebrow><h2>Talk to the partner team.</h2><p>Tell us about your agency and the clients you are working with, and the Aureum team will get back to you with current availability and materials.</p></div>
          <div><ButtonLink href="/contact?interest=other#enquiry">Contact the partner team</ButtonLink></div>
        </div>
      </section>
    </ArchitectureLanding>
    </>
  );
}
