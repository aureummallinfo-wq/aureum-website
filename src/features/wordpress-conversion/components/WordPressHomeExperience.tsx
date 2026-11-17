import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BuildingExplorer } from '@/features/building-explorer/components/BuildingExplorer';
import { VirtualTourEmbed } from '@/features/immersive-media/components/VirtualTourEmbed';
import { LiveMap } from '@/features/trust-location/components/LiveMap';
import { SiteUpdates } from '@/features/trust-location/components/SiteUpdates';
import { PriceCalculator } from '@/features/payment-plans/components/PriceCalculator';
import { AMENITIES, DEVELOPER, PROJECT_STATS } from '@/lib/project-facts';
import { ShowcaseFigure } from '@/features/project-showcase/components/ProjectShowcase';
import { EXTERIOR_NIGHT_WIDE, FOOD_COURT_IMAGE, GLASS_ATRIUM_AERIAL, GLASS_ATRIUM_CLOSE, MALL_IMAGES, MAIN_ROAD_VIEW, OFFICE_IMAGES, RESIDENCE_IMAGES, RING_ROAD_SUNSET } from '@/features/project-showcase/images';

import { ResidenceGallery } from '@/app/apartments/ResidenceGallery';
import { ResidenceSequence } from '@/app/apartments/ResidenceSequence';
import styles from './WordPressHomeExperience.module.css';

const architecture = [
  { label: 'The exterior', title: 'A landmark on Ring Road.', copy: 'Aureum brings shopping, dining, work and residences to the Bahria Town Ring Road Interchange.', image: EXTERIOR_NIGHT_WIDE },
  { label: 'The atrium', title: 'Three levels around one atrium.', copy: 'Escalators connect the retail levels around a central space for arrival and circulation.', image: MALL_IMAGES[0] },
  { label: 'The residences', title: 'Living spaces above the mall.', copy: 'A separate residential entrance and dedicated lifts lead to the apartment levels.', image: RESIDENCE_IMAGES[0] },
];

// The homepage tells the project in order: what it is, what is inside, where you fit, what it costs, then how to visit.
export function WordPressHomeExperience() {
  const views = [MALL_IMAGES[0], RESIDENCE_IMAGES[0], FOOD_COURT_IMAGE, OFFICE_IMAGES[0]];
  return (
    <>
      <section className={styles.editorial} aria-labelledby="wp-inside-heading">
        <div className="container">
          <header className={`${styles.editorialHeading} textReveal`}>
            <Eyebrow>Inside Aureum</Eyebrow>
            <h2 id="wp-inside-heading">One address. Many ways to spend the day.</h2>
            <p>At the Bahria Town Ring Road Interchange, shops and dining gather around the atrium, with workplaces and homes above.</p>
          </header>
          <div className={styles.collage}>
            <ShowcaseFigure image={MALL_IMAGES[1]} sizes="(max-width: 780px) 44vw, 23vw" />
            <div className={styles.collageLead}>
              <ResidenceGallery imageLabel="Aureum image" views={views.map((view) => ({
                label: view.label ?? view.alt,
                figure: <ShowcaseFigure image={view} sizes="(max-width: 780px) 94vw, 58vw" />,
              }))} />
            </div>
            <ShowcaseFigure image={RESIDENCE_IMAGES[2]} sizes="(max-width: 780px) 44vw, 23vw" />
          </div>
          <p className={styles.imageNote}>Brand signage is illustrative and does not indicate confirmed tenants.</p>
          <nav className={styles.spaceLinks} aria-label="Explore Aureum spaces">
            <ButtonLink href="#architecture" variant="dark">Explore the architecture</ButtonLink>
            <ButtonLink href="/apartments" variant="dark">Residences</ButtonLink>
            <ButtonLink href="/commercial-shops" variant="dark">Commercial Shops</ButtonLink>
            <ButtonLink href="/food-court" variant="dark">Food Court</ButtonLink>
            <ButtonLink href="/corporate-offices" variant="dark">Corporate Offices</ButtonLink>
            <ButtonLink href="/gallery" variant="dark">Open the full gallery</ButtonLink>
          </nav>
        </div>
      </section>

      <section className={styles.gateway} id="architecture" aria-labelledby="architecture-heading">
        <div className={styles.gatewayStage}>
          <p className={styles.gatewayWord} aria-hidden="true">Aureum</p>
          <figure className={styles.gatewayImage}>
            <Image src={EXTERIOR_NIGHT_WIDE.src} alt={EXTERIOR_NIGHT_WIDE.alt} fill sizes="100vw" />
          </figure>
          <div className={`container ${styles.gatewayCaption}`}>
            <div><Eyebrow>Aureum Mall &amp; Residences · Artist’s impression</Eyebrow><h2 id="architecture-heading">Explore the architecture.</h2></div>
            <Link href="#architecture-scenes">See the views <span aria-hidden="true">↓</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.architectureScenes} id="architecture-scenes" aria-label="Architecture views">
        <div className="container">
          <ResidenceSequence
            idPrefix="aureum-view"
            navigationLabel="Architecture views"
            scenes={architecture.map((scene) => ({
              label: scene.label,
              copy: <><h3>{scene.title}</h3><p>{scene.copy}</p></>,
              image: <ShowcaseFigure image={scene.image} sizes="(max-width: 1320px) 94vw, 1240px" />,
            }))}
          />
        </div>
      </section>

      <section className={styles.lifestyle} aria-labelledby="lifestyle-heading">
        <div className="container">
          <header className={`${styles.lifestyleHeading} textReveal`}>
            <Eyebrow>The destination</Eyebrow>
            <h2 id="lifestyle-heading">Every angle tells a story.</h2>
            <p>From Ring Road to the glass atrium entrance, Aureum is designed to be recognised from every approach.</p>
          </header>
          <div className={styles.lifestyleGrid}>
            <div className={styles.lifestyleCard}><ShowcaseFigure image={RING_ROAD_SUNSET} sizes="(max-width: 760px) 94vw, 33vw" /></div>
            <div className={styles.lifestyleCard}><ShowcaseFigure image={GLASS_ATRIUM_AERIAL} sizes="(max-width: 760px) 94vw, 33vw" /></div>
            <div className={styles.lifestyleCard}><ShowcaseFigure image={MAIN_ROAD_VIEW} sizes="(max-width: 760px) 94vw, 33vw" /></div>
          </div>
        </div>
      </section>

      <section className={styles.residences} aria-labelledby="home-residences-heading">
        <div className={`container ${styles.residencesGrid}`}>
          <ShowcaseFigure image={RESIDENCE_IMAGES[0]} sizes="(max-width: 760px) 94vw, (max-width: 1280px) 58vw, 760px" />
          <div className="textReveal">
            <Eyebrow>Aureum Residences</Eyebrow>
            <h2 id="home-residences-heading">A home above the city.</h2>
            <p>Come inside the residences, from the private arrival to the living spaces, and explore Studio, 1 Bed and 2 Bed layouts.</p>
            <ButtonLink href="/apartments" variant="dark">Experience the residences <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
      </section>

      <section className="wpIntroSection section">
        <div className="container wpIntroGrid">
          <div className="wpIntroCopy textReveal">
            <Eyebrow>The development</Eyebrow>
            <h2>Aureum at a glance.</h2>
            <p>Three retail levels, a food court and family entertainment, a luxury hotel, full-glass corporate offices and residences. Developed by {DEVELOPER.name} ({DEVELOPER.shortName}).</p>
            <ButtonLink href="/about" variant="dark">About the project</ButtonLink>
          </div>
          <div className="wpIntroStats" aria-label="Project statistics">
            {PROJECT_STATS.map(([value, label]) => <div className="wpStat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section explorerSection" id="explore-building" aria-labelledby="wp-explorer-heading">
        <div className="container">
          <SectionHeading id="wp-explorer-heading" eyebrow="Explore the building" title="Find your place, level by level." description="From the basements to the residences: choose a level to see what is there, its floor plan and the base price of every unit." />
          <BuildingExplorer />
        </div>
      </section>

      <section className="section calcSection" aria-labelledby="wp-prices-heading">
        <div className="container">
          <SectionHeading id="wp-prices-heading" eyebrow="Prices & payment plan" title="What it costs, in plain numbers." description="Choose a unit to see its base price and every instalment, from booking to possession." />
          <PriceCalculator />
          <ButtonLink href="/payment-plans" variant="dark">See every payment table</ButtonLink>
        </div>
      </section>

      <section className="section trustUpdatesSection" aria-labelledby="wp-site-heading">
        <div className="container">
          <SectionHeading id="wp-site-heading" eyebrow="On site now" title="Construction is under way." description="Dated video from the site since the groundbreaking on 1 October 2026. Tap to watch with sound." />
          <SiteUpdates limit={3} />
          <ButtonLink href="/construction-updates" variant="dark">See every site update</ButtonLink>
        </div>
      </section>

      <section className="wpTourSection section" aria-labelledby="wp-tour-heading">
        <div className="container wpTourGrid">
          <div>
            <SectionHeading id="wp-tour-heading" eyebrow="360° virtual tour" title="Walk through Aureum before you visit." description="Step inside an interactive 360° concept tour of the development: look around the arrival, the mall, the residences and lifestyle spaces." />
            <div className={styles.spaceLinks}>
              <ButtonLink href="/immersive-media#virtual-tour" variant="dark">See all project media</ButtonLink>
              <ButtonLink href="/immersive-media#film-heading-immersive_media" variant="dark">Watch the project film</ButtonLink>
            </div>
          </div>
          <VirtualTourEmbed placement="home" />
        </div>
      </section>

      <section className="wpAmenitiesSection section" aria-labelledby="wp-amenities-heading">
        <div className="container wpAmenitiesGrid">
          <div className="textReveal">
            <Eyebrow>Amenities</Eyebrow>
            <h2 id="wp-amenities-heading">Everything you need, under one roof.</h2>
            <p>Twenty planned amenities for residents, office users and visitors, from a swimming pool and gym to a cinema, masjid and rooftop restaurant.</p>
            <ButtonLink href="/amenities">See all amenities</ButtonLink>
          </div>
          <ul className="wpAmenitiesList">
            {AMENITIES.map((amenity, index) => <li key={amenity}><span>{String(index + 1).padStart(2, '0')}</span>{amenity}</li>)}
          </ul>
        </div>
      </section>

      <section className="wpLocationSection section" aria-labelledby="wp-location-heading">
        <div className="container wpLocationGrid">
          <LiveMap className="wpLiveMap" />
          <div className="textReveal">
            <Eyebrow>Location / Ring Road Interchange</Eyebrow>
            <h2 id="wp-location-heading">At the gateway to Bahria Town.</h2>
            <p>On the Ring Road Interchange, 0 minutes from Bahria Town and about 25 minutes from Lahore airport.</p>
            <ButtonLink href="/location">Explore the location</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
