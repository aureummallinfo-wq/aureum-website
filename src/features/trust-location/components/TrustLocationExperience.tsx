import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/site';
import { MediaOpening } from '@/features/immersive-media/components/MediaOpening';
import { VIRTUAL_TOUR } from '@/features/immersive-media/data';
import { LOCATION_MAP } from '@/features/project-showcase/images';
import { LiveMap } from './LiveMap';
import { AureumRouteAnimation } from './AureumRouteAnimation';
import { SiteUpdates } from './SiteUpdates';
import { GROUNDBREAKING, SITE_UPDATES } from '../site-updates';
import styles from './LocationEditorial.module.css';

function LocationSection() {
  return (
    <section className={styles.location} id="trust-location-workspace" aria-labelledby="location-heading">
      <div className="container">
        <div className={styles.locationGrid}>
          <div>
            <Eyebrow>Bahria Town · Lahore</Eyebrow>
            <h2 id="location-heading">At the Ring Road interchange.</h2>
            <p>{SITE.location}. Lahore Airport is about 25 minutes away, depending on traffic.</p>
            <div className={styles.actions}>
              <ButtonLink href={SITE.directionsUrl} target="_blank" rel="noopener" variant="dark">Get directions ↗</ButtonLink>
              <Link href="/contact?intent=site_visit#enquiry">Book a site visit →</Link>
            </div>
          </div>
          <figure className="trustMapFigure">
            <a href={LOCATION_MAP.src} target="_blank" rel="noopener" aria-label="Open the full-size location map">
              <Image src={LOCATION_MAP.src} alt={LOCATION_MAP.alt} width={1448} height={1086} sizes="(max-width: 780px) 94vw, 60vw" />
            </a>
            <figcaption>{LOCATION_MAP.note}</figcaption>
          </figure>
        </div>
        <div className={styles.map} id="location-live-map">
          <h2>Find Aureum on the map.</h2>
          <LiveMap className="trustLiveMap" />
        </div>
      </div>
    </section>
  );
}

export function ConstructionUpdatesSection({ standalone = false }: { standalone?: boolean }) {
  const content = (
    <section className="section trustUpdatesSection" id="construction-register">
      <div className="container">
        <SectionHeading eyebrow="Site progress" title="The future takes shape." description="Dated video from the site, newest first. Tap any video to watch it with sound." />
        <SiteUpdates limit={standalone ? undefined : 3} />
        <div className="actions">
          {standalone ? null : <ButtonLink href="/construction-updates" variant="dark">See every site update</ButtonLink>}
          <ButtonLink href="/contact?intent=site_visit#enquiry" variant={standalone ? 'dark' : 'secondary'} className={standalone ? undefined : 'onLight'}>Book a site visit</ButtonLink>
        </div>
      </div>
    </section>
  );

  if (!standalone) return content;
  return <><section className="section trustHero"><div className="container trustHeroGrid"><div><Eyebrow>Project updates</Eyebrow><h1>Follow Aureum as it takes shape.</h1><p>Construction began on {GROUNDBREAKING.dateLabel}. Watch dated video from the site, then book a visit to see it for yourself.</p><ButtonLink href="#construction-register">Watch the latest update <span aria-hidden="true">↓</span></ButtonLink></div><div className="trustHeroStamp" aria-hidden="true"><span>Video updates from site</span><strong>{String(SITE_UPDATES.length).padStart(2, '0')}</strong></div></div></section>{content}</>;
}

function TrustFaqSection() {
  return <section className="section trustFaqSection"><div className="container"><SectionHeading eyebrow="Clear answers" title="Everything starts with the right information." description="Quick answers about the location, the spaces available and the payment plan." /><div className="trustFaqList"><details className="trustFaqItem"><summary>Where is Aureum located?<span aria-hidden="true">+</span></summary><p>{SITE.location}</p></details><details className="trustFaqItem"><summary>What can I explore at Aureum?<span aria-hidden="true">+</span></summary><p>Aureum brings together 1 &amp; 2 bed apartments, commercial shops, corporate offices, food courts, parking and everyday amenities.</p></details><details className="trustFaqItem"><summary>Where can I see the payment plan?<span aria-hidden="true">+</span></summary><p>Visit the <Link href="/payment-plans">Payment Plans</Link> page or contact the Aureum team for the latest details.</p></details></div></div></section>;
}

export function TrustLocationExperience() {
  return (
    <>
      <MediaOpening
        eyebrow="Location · Lahore"
        title="Where Aureum meets Ring Road."
        image={{ src: VIRTUAL_TOUR.poster, alt: VIRTUAL_TOUR.posterAlt }}
        links={[
          { href: '#location-route-animation', label: 'Ring Road route animation' },
          { href: '#trust-location-workspace', label: 'Location and directions' },
          { href: '#location-live-map', label: 'Live map' },
          { href: '#construction-register', label: 'Site progress' },
        ]}
      />
      <AureumRouteAnimation />
      <LocationSection />
      <ConstructionUpdatesSection />
      <TrustFaqSection />
    </>
  );
}
