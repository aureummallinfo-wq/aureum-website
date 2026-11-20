import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { calcHref, formatPKR, formatSqFt, unitsForTables } from '@/features/payment-plans/units';
import { ShowcaseFigure, ShowcaseGallery, type ShowcaseImage } from '@/features/project-showcase/components/ProjectShowcase';
import { CUTAWAY_IMAGES, ONE_BEDROOM_VIRTUAL_TOUR, RESIDENCE_IMAGES, STUDIO_VIRTUAL_TOUR } from '@/features/project-showcase/images';
import styles from './apartment-detail.module.css';

const layouts = {
  studio: {
    name: 'Studio',
    title: 'An open-plan studio.',
    intro: 'Sleeping and living share an open room, with a kitchenette, a separate bathroom and a balcony in the representative layout.',
    hero: RESIDENCE_IMAGES[0],
    plan: CUTAWAY_IMAGES[0],
    images: [RESIDENCE_IMAGES[3], RESIDENCE_IMAGES[2]],
    types: ['Studio'],
  },
  '1-bed': {
    name: '1 Bed',
    title: 'A room of your own.',
    intro: 'A separate bedroom and living area give these Inner and Outer apartments distinct spaces for resting and entertaining.',
    hero: RESIDENCE_IMAGES[1],
    plan: {
      src: '/assets/aureum/approved/floor-plans/aureum-1-bed-apartment-floor-plan.webp',
      alt: '658 sq ft one-bedroom plan with lounge, kitchen, bathroom and balcony',
      label: '658 sq ft · one-bedroom floor plan',
      note: 'Subject to final approved drawings',
    },
    images: [RESIDENCE_IMAGES[4], RESIDENCE_IMAGES[0]],
    types: ['1 Bedroom'],
  },
  '2-bed': {
    name: '2 Bed',
    title: 'Room for family life.',
    intro: 'Two bedrooms sit off an open living and dining area. One of the priced layouts includes a separate servant quarter.',
    hero: RESIDENCE_IMAGES[3],
    plan: CUTAWAY_IMAGES[1],
    images: [RESIDENCE_IMAGES[1], RESIDENCE_IMAGES[5]],
    types: ['2 Bedrooms', '2 Bedrooms + Servant Quarter'],
  },
} satisfies Record<string, {
  name: string;
  title: string;
  intro: string;
  hero: ShowcaseImage;
  plan: ShowcaseImage;
  images: readonly ShowcaseImage[];
  types: readonly string[];
}>;

export function ApartmentDetail({ type }: { type: keyof typeof layouts }) {
  const layout = layouts[type];
  const units = unitsForTables(['apartments']).filter(({ row }) => layout.types.some((name) => name === row.type));
  const virtualTour = type === '1-bed' ? ONE_BEDROOM_VIRTUAL_TOUR : type === 'studio' ? STUDIO_VIRTUAL_TOUR : null;

  return (
    <div className={styles.detail}>
      <section className={styles.hero} aria-labelledby="unit-title">
        <div className={`container ${styles.split}`}>
          <div>
            <Link className={styles.back} href="/apartments#apartment-types-heading">← Compare all apartments</Link>
            <Eyebrow>Aureum Residences · {layout.name}</Eyebrow>
            <h1 id="unit-title">{layout.title}</h1>
            <p>{layout.intro}</p>
            <div className={styles.links}>
              <ButtonLink href="#unit-options" variant="dark">Explore sizes and prices</ButtonLink>
              <Link href="#unit-layout">View the layout ↓</Link>
            </div>
          </div>
          <figure>
            <div className={styles.heroImage}>
              <Image src={layout.hero.src} alt={layout.hero.alt} fill preload sizes="(max-width: 760px) 94vw, 55vw" />
            </div>
            <figcaption>Aureum residential interior · Artist’s impression</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.plan} aria-labelledby="unit-layout">
        <div className={`container ${styles.split}`}>
          <div>
            <Eyebrow>{layout.name}</Eyebrow>
            <h2 id="unit-layout">Inside the layout.</h2>
            <p>{type === '1-bed'
              ? 'The drawing shows the 658 sq ft configuration. Ask the sales team for the 622 sq ft plan and the Inner category availability.'
              : 'Explore the representative cutaway. Ask the sales team for the final plan and dimensions for your chosen unit.'}</p>
            <Link href="/floor-plans">Explore building floor plans →</Link>
          </div>
          <ShowcaseFigure className={styles.planImage} image={layout.plan} zoomable sizes="(max-width: 760px) 94vw, 55vw" />
        </div>
      </section>

      {virtualTour ? (
        <section className={styles.video} aria-labelledby="residential-tour">
          <div className="container">
            <Eyebrow>Residential walkthrough</Eyebrow>
            <h2 id="residential-tour">{type === 'studio' ? 'Walk through the studio home.' : 'Step inside the 1-bedroom home.'}</h2>
            <p>Take a short virtual tour of the living space, presented as an artist’s impression.</p>
            <video className={styles.videoPlayer} controls playsInline preload="none" poster={virtualTour.poster} aria-label={virtualTour.label}>
              <source src={virtualTour.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </section>
      ) : null}

      <section className={`container ${styles.options}`} aria-labelledby="unit-options">
        <h2 id="unit-options">Sizes and payment plans.</h2>
        <p>Indicative possession is 3.5 years. Confirm availability, pricing and handover timing with the Aureum sales team.</p>
        <ul>
          {units.map(({ id, row, table }) => (
            <li key={id}>
              <div>
                <h3>{formatSqFt(row.sizeSqFt)}</h3>
                <p>{row.type} · {row.unitCategory}</p>
              </div>
              <dl>
                <div><dt>Base price</dt><dd>{formatPKR(row.totalPrice)}</dd></div>
                <div><dt>Booking · 10%</dt><dd>{formatPKR(row.booking)}</dd></div>
                <div><dt>Confirmation · 15%</dt><dd>{formatPKR(row.confirmation)}</dd></div>
                <div><dt>Monthly · {table.monthlyCount} payments</dt><dd>{formatPKR(row.monthlyInstallment)}</dd></div>
              </dl>
              <Link href={`/payment-plans/apartments${calcHref(id)}`}>
                Payment plan for {formatSqFt(row.sizeSqFt)} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        {type === '2-bed' && <Link href="/apartments#apt-signature-glass">Explore Signature Glass Apartments →</Link>}
      </section>

      <section className={`container ${styles.interiors}`} aria-labelledby="unit-interiors">
        <h2 id="unit-interiors">Aureum interiors.</h2>
        <ShowcaseGallery images={layout.images} />
      </section>

      <section className={styles.enquiry} id="enquiry" aria-labelledby="unit-enquiry">
        <div className="container">
          <h2 id="unit-enquiry">Talk through your options.</h2>
          <div className={styles.links}>
            <ButtonLink href="/contact?interest=apartment#enquiry" variant="dark">Request details</ButtonLink>
            <Link href="/apartments#brochures">Find the Residential Collection →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
