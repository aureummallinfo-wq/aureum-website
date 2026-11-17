import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { ApartmentTypesSection, ShowcaseFigure } from '@/features/project-showcase/components/ProjectShowcase';
import { ResidenceWalkthrough } from '@/features/project-showcase/components/ResidenceWalkthrough';
import { CUTAWAY_IMAGES, EXTERIOR_NIGHT_WIDE, FOOD_COURT_IMAGE, RESIDENCE_IMAGES } from '@/features/project-showcase/images';
import { PropertyEnquiry } from '@/features/wordpress-conversion/components/WordPressPageLayouts';
import { ResidenceGallery } from './ResidenceGallery';
import { ResidenceSequence } from './ResidenceSequence';
import styles from './residences.module.css';

export const metadata = createRouteMetadata('/apartments');

const chapters = [
  {
    label: 'Arrival',
    title: 'A private arrival',
    text: 'A dedicated residential entrance, a 28 × 50 ft lobby and three lifts serve the homes on the sixth through twelfth floors.',
    image: RESIDENCE_IMAGES[2],
  },
  {
    label: 'Light & space',
    title: 'Life around the courtyard',
    text: 'The apartments are arranged around an open-to-sky courtyard. In the living spaces, the interior renders show how glazing, seating and dining relate to one another.',
    image: RESIDENCE_IMAGES[3],
  },
  {
    label: 'Interior details',
    title: 'Closer to the details',
    text: 'Look closely at the grain of the wardrobe fronts, the upholstered headboard and the lighting in the bedroom render. These details illustrate the interior concept. Final finishes and fit-out are subject to confirmation.',
    image: RESIDENCE_IMAGES[1],
  },
];

export default function Page() {
  const exterior = '/assets/aureum/approved/renders/aureum-exterior-day-view.webp';
  const journal = [RESIDENCE_IMAGES[0], RESIDENCE_IMAGES[4], RESIDENCE_IMAGES[5], EXTERIOR_NIGHT_WIDE];
  return (
    <div className={styles.residences}>
      <section className={styles.hero} data-blended-navigation aria-labelledby="residence-title">
        <figure className={styles.heroFigure}>
          <div className={styles.heroImage}>
            <Image src={exterior} alt="The Aureum development with the residential floors above the mall" fill preload sizes="(max-width: 767px) max(100vw, 135vh), 100vw" />
          </div>
          <figcaption>Artist’s impression</figcaption>
        </figure>
        <div className={`container ${styles.heroCopy}`}>
          <Eyebrow>Aureum Residences · Bahria Town, Lahore</Eyebrow>
          <h1 id="residence-title"><span>A home above</span><span>the city.</span></h1>
          <div className={styles.heroLinks}>
            <a href="#residence-story">Experience the residences <span aria-hidden="true">↓</span></a>
            <a href="#apartment-types-heading">Explore apartments <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className={styles.editorial} aria-labelledby="residence-intro">
        <div className="container">
          <nav className={styles.sectionLinks} aria-label="Explore Aureum Residences">
            <a href="#residence-story">Inside Aureum</a>
            <a href="#apartment-types-heading">The apartments</a>
            <a href="#residence-amenities">Amenities</a>
            <a href="#residence-gallery">Gallery</a>
          </nav>
          <header className={styles.editorialIntro}>
            <Eyebrow>Aureum Residences</Eyebrow>
            <h2 id="residence-intro">Life above the bustle.</h2>
            <p>Studios, one- and two-bedroom homes and Signature Glass Apartments share a private arrival on the residential levels of Aureum.</p>
          </header>
          <div className={styles.journalLayout}>
            <ShowcaseFigure image={RESIDENCE_IMAGES[2]} sizes="(max-width: 899px) 45vw, 22vw" />
            <ResidenceGallery views={journal.map((view) => ({
              label: view.label ?? view.alt,
              figure: <ShowcaseFigure image={view} sizes="(max-width: 899px) 94vw, 56vw" />,
            }))} />
            <ShowcaseFigure image={RESIDENCE_IMAGES[1]} sizes="(max-width: 899px) 45vw, 22vw" />
          </div>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="residence-story">
        <div className="container">
          <header className={styles.storyLead}>
            <Eyebrow>From the lobby to your living room</Eyebrow>
            <h2 id="residence-story">Come inside.</h2>
            <a href="#residence-chapter-1">See the rooms <span aria-hidden="true">↓</span></a>
          </header>
          <ResidenceSequence scenes={chapters.map((chapter) => ({
            label: chapter.label,
            image: <ShowcaseFigure image={chapter.image} sizes="(max-width: 1320px) 94vw, 1240px" />,
            copy: <><h3>{chapter.title}</h3><p>{chapter.text}</p></>,
          }))} />
        </div>
      </section>

      <section className={styles.tour} aria-labelledby="residence-tour">
        <Image src={RESIDENCE_IMAGES[3].src} alt="" fill sizes="100vw" />
        <div className={`container ${styles.tourCopy}`}>
          <Eyebrow>Aureum interiors · Artist’s impression</Eyebrow>
          <h2 id="residence-tour">Take a closer look.</h2>
          <Link href="/immersive-media#virtual-tour">Open Aureum’s 360° tour <span aria-hidden="true">↗</span></Link>
          <a href="#walkthrough-heading">Watch the residential walkthrough <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <ResidenceWalkthrough />
      <ApartmentTypesSection editorial />

      <section className={styles.amenities} aria-labelledby="residence-amenities">
        <div className={`container ${styles.chapter}`}>
          <div className={styles.chapterCopy}>
            <Eyebrow>Planned amenities</Eyebrow>
            <h2 id="residence-amenities">An afternoon close to home.</h2>
            <p>Meet for a meal at the food court, take the family to the cinema or make time for the gym. These are among Aureum’s planned facilities for residents, office users and visitors.</p>
            <Link href="/amenities">Explore planned amenities <span aria-hidden="true">→</span></Link>
          </div>
          <ShowcaseFigure image={FOOD_COURT_IMAGE} sizes="(max-width: 760px) 94vw, 55vw" />
        </div>
      </section>

      <section className={`container ${styles.gallery}`} aria-labelledby="residence-gallery">
        <div className={styles.sectionIntro}>
          <h2 id="residence-gallery">The residences in pictures.</h2>
          <Link href="/gallery#residences">View the full gallery <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.galleryGrid}>
          {[...RESIDENCE_IMAGES.slice(4), ...CUTAWAY_IMAGES].map((image) => (
            <ShowcaseFigure key={image.src} image={image} zoomable sizes="(max-width: 760px) 94vw, 46vw" />
          ))}
        </div>
      </section>

      <BrochureDownloads only={['residential']} />
      <PropertyEnquiry interest="apartment" registerLabel="Apartment enquiry" />
    </div>
  );
}
