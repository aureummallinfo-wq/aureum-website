import Image from 'next/image';
import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { NewsCardItem } from '@/features/news/posts';
import { IMAGE_DISCLAIMER, PROJECT_STATS } from '@/lib/project-facts';
import { AccessSection, BuildingLevelsSection, DeveloperSection, FloorPlanGallery, LeadershipSection, ProjectDisclaimers, ShowcaseGallery, ShowcaseFigure, TeamPreview, type ShowcaseImage } from '@/features/project-showcase/components/ProjectShowcase';
import { CUTAWAY_IMAGES, EXTERIOR_NIGHT, EXTERIOR_NIGHT_WIDE, FLOOR_PLAN_IMAGES, FOOD_COURT_IMAGE, LEISURE_IMAGES, MALL_IMAGES, PARKING_IMAGE, RESIDENCE_IMAGES } from '@/features/project-showcase/images';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { MediaOpening } from '@/features/immersive-media/components/MediaOpening';
import mediaStyles from '@/features/immersive-media/components/MediaEditorial.module.css';
import { NewsCardList } from './NewsCardList';
import styles from './PropertyPage.module.css';

type PropertyInterest = 'apartment' | 'commercial_shop' | 'corporate_office' | 'food_court';

type PropertyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: ShowcaseImage;
  features: readonly string[];
  interest: Exclude<PropertyInterest, 'apartment'>;
  registerLabel: string;
  payment: { href: string; label: string };
  plans?: readonly ShowcaseImage[];
  destinations?: readonly { href: string; title: string; description: string }[];
  children?: ReactNode;
};

export function WordPressPropertyPage({
  eyebrow, title, intro, image, features, interest, registerLabel, payment, plans, destinations, children,
}: PropertyPageProps) {
  return (
    <>
      <section className={styles.hero} data-blended-navigation aria-labelledby="property-title">
        <figure>
          <Image src={image.src} alt={image.alt} fill preload sizes="(max-width: 780px) 135vh, 100vw" />
          <figcaption>{image.label} · Artist’s impression</figcaption>
        </figure>
        <div className={`container ${styles.heroCopy}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="property-title">{title}</h1>
          <div className={styles.actions}>
            <ButtonLink href={payment.href} className={styles.heroLink}>{payment.label} <span aria-hidden="true">→</span></ButtonLink>
            <ButtonLink href={`/contact?interest=${interest}#enquiry`} className={styles.heroLink}>
              Request details <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-labelledby="property-facts">
        <div className={`container ${styles.factGrid}`}>
          <div><h2 id="property-facts">At a glance.</h2><p>{intro}</p></div>
          <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </div>
      </section>

      {destinations && (
        <section className={`container ${styles.destinations}`} aria-labelledby="property-destinations">
          <h2 id="property-destinations">Explore by level.</h2>
          <ul>
            {destinations.map((destination) => (
              <li key={destination.href}>
                <ButtonLink href={destination.href} className={styles.enquiryLink}>
                  {destination.title} <span aria-hidden="true">→</span>
                </ButtonLink>
                <p>{destination.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {plans && (
        <section className={`container ${styles.plans}`} aria-labelledby="property-plans">
          <h2 id="property-plans">Floor plans.</h2>
          <p>Open the drawing at full size to see the layout.</p>
          <FloorPlanGallery plans={plans} />
        </section>
      )}

      {children}
      <PropertyEnquiry interest={interest} registerLabel={registerLabel} />
    </>
  );
}

export function PropertyEnquiry({ interest, registerLabel }: { interest: PropertyInterest; registerLabel: string }) {
  return (
    <section className="section wpInquirySection" id="enquiry">
      <div className="container wpInquiryGrid">
        <div><Eyebrow>{registerLabel}</Eyebrow><h2>Bring your plans into one conversation.</h2><p>Tell us which space you are exploring and the Aureum team will share the latest details with you.</p><div className="wpContactFacts"><span>Bahria Town, Ring Road Interchange, Lahore</span><a href="tel:+923225551121">(0322) 555 1121</a><a href="mailto:hello@aureummall.info">hello@aureummall.info</a></div></div><div><ButtonLink href={`/contact?interest=${interest}#enquiry`}>Contact the sales team <span aria-hidden="true">→</span></ButtonLink></div>
      </div>
    </section>
  );
}

export function WordPressAboutPage() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div><Eyebrow>About Aureum Mall &amp; Residences</Eyebrow><h1>A 16 kanal landmark at the Ring Road Interchange.</h1><p>Aureum brings together a shopping mall, premium dining and entertainment, corporate offices, a luxury hotel and residences, all in one landmark building in Bahria Town, Lahore.</p><ButtonLink href="/building-explorer">Explore the building <span aria-hidden="true">↗</span></ButtonLink></div>
          <div className="wpInternalHeroImage"><Image src={EXTERIOR_NIGHT.src} alt={EXTERIOR_NIGHT.alt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpAboutSection">
        <div className="container wpAboutGrid"><div><Eyebrow>The project / at a glance</Eyebrow><h2>Shop, dine, work, stay and live.</h2></div><div className="wpAboutCopy"><p><strong>Shop</strong> across three retail levels around a central atrium. <strong>Dine &amp; play</strong> at the food court, playland, trampoline park and rooftop dining.</p><p><strong>Work</strong> in full-glass offices facing Ring Road. <strong>Stay &amp; live</strong> in a luxury hotel, apartments and Signature Glass Apartments.</p></div></div>
      </section>
      <section className="section wpAboutStats"><div className="container"><div className="wpAboutStatsGrid">{PROJECT_STATS.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div></div></section>
      <DeveloperSection />
      <LeadershipSection />
      <TeamPreview />
      <BuildingLevelsSection image={MALL_IMAGES[0]} />
      <AccessSection />
      <BrochureDownloads only={['master-catalogue', 'factsheet']} />
      <ProjectDisclaimers />
    </>
  );
}

const GALLERY_GROUPS = [
  { id: 'exterior', eyebrow: 'The building', title: 'A landmark at the Ring Road Interchange.', images: [EXTERIOR_NIGHT_WIDE, EXTERIOR_NIGHT], branded: false },
  { id: 'mall', eyebrow: 'The mall', title: 'Three retail levels around a central atrium.', images: [...MALL_IMAGES, FOOD_COURT_IMAGE], branded: true },
  { id: 'leisure', eyebrow: 'Dining & leisure', title: 'Where every visit becomes a day out.', images: LEISURE_IMAGES, branded: true },
  { id: 'residences', eyebrow: 'The residences', title: 'Light, space and calm.', images: [...CUTAWAY_IMAGES, ...RESIDENCE_IMAGES], branded: false },
  { id: 'parking', eyebrow: 'Parking & access', title: 'Two basement parking levels.', images: [PARKING_IMAGE], branded: false },
] as const;

export function WordPressGalleryPage() {
  const links = [
    ...GALLERY_GROUPS.map((group) => ({ href: `#${group.id}`, label: group.eyebrow })),
    { href: '#plans', label: 'Floor plans' },
  ];

  return (
    <>
      <MediaOpening eyebrow="Aureum gallery" title="See Aureum up close." image={EXTERIOR_NIGHT_WIDE} links={links} />
      {GALLERY_GROUPS.map((group) => {
        const [featured, ...others] = group.images;
        return (
          <section className={mediaStyles.chapter} id={group.id} key={group.id}>
            <div className="container">
              <SectionHeading eyebrow={group.eyebrow} title={group.title} />
              <ShowcaseFigure className={mediaStyles.featured} image={featured} zoomable sizes="(max-width: 1320px) 94vw, 1240px" />
              {others.length > 0 && <ShowcaseGallery images={others} />}
              {group.branded && <p className="showcaseNote">{IMAGE_DISCLAIMER}</p>}
            </div>
          </section>
        );
      })}
      <section className={mediaStyles.chapter} id="plans">
        <div className="container">
          <SectionHeading eyebrow="Floor plans" title="Every level of the building." description="Open a drawing at full size to see the layout." />
          <FloorPlanGallery plans={FLOOR_PLAN_IMAGES} />
        </div>
      </section>
    </>
  );
}

export function WordPressNewsPage({ items }: { items: readonly NewsCardItem[] }) {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div><Eyebrow>Blogs / Aureum insights</Eyebrow><h1>News &amp; guides from Aureum.</h1><p>Follow Aureum Mall &amp; Residences through project updates, location information and payment-plan guidance.</p></div>
          <div className="wpInternalHeroImage"><Image src={MALL_IMAGES[0].src} alt={MALL_IMAGES[0].alt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>
      <section className="section wpNewsSection"><div className="container"><SectionHeading eyebrow="Latest from Aureum" title="Keep up with the project." description="Read the latest Aureum Mall &amp; Residences updates and useful information for your next step." /><NewsCardList items={items} /></div></section>
    </>
  );
}
