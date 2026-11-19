import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { createRouteMetadata } from '@/features/content-seo/metadata';
import { MediaOpening } from '@/features/immersive-media/components/MediaOpening';
import { AccessSection, ShowcaseFigure } from '@/features/project-showcase/components/ProjectShowcase';
import { AMENITIES_VIDEO, FOOD_COURT_IMAGE, LEISURE_IMAGES } from '@/features/project-showcase/images';
import type { AMENITIES } from '@/lib/project-facts';
import styles from './amenities.module.css';

export const metadata = createRouteMetadata('/amenities');

const themes = [
  { title: 'Wellness', amenities: ['Swimming Pool', 'Gym', 'Spa', 'Sauna', 'Steam Room', 'Yoga Centre'] },
  { title: 'Family and dining', amenities: ['Food Court', 'Cinema', 'Kids Club', 'Indoor Sports', 'Gaming Zone', 'Trampoline Park', 'Rooftop Restaurant'] },
  { title: 'Work and reflection', amenities: ['Business Centre', 'Conference Hall', 'Libraries', 'Masjid'] },
  { title: 'Everyday services', amenities: ['24/7 Security', 'High-Speed Elevators', 'Power Backup'] },
] satisfies readonly { title: string; amenities: readonly (typeof AMENITIES)[number][] }[];

export default function Page() {
  return (
    <>
      <MediaOpening
        eyebrow="Aureum amenities"
        title="More to your day."
        image={FOOD_COURT_IMAGE}
        links={[
          { href: '#family-at-aureum', label: 'Family and dining' },
          { href: '#planned-amenities', label: 'Planned amenities' },
          { href: '#amenity-access', label: 'Access and membership' },
        ]}
      />
      <section className={styles.story} id="family-at-aureum" aria-labelledby="family-heading">
        <div className={`container ${styles.storyGrid}`}>
          <div>
            <Eyebrow>Dining and play</Eyebrow>
            <h2 id="family-heading">Time together, on one level.</h2>
            <p>The third-floor food court is planned beside the playland and trampoline park, with dining and family entertainment on the same level.</p>
            <Link href="/food-court">Explore the Food Court →</Link>
          </div>
          <ShowcaseFigure image={LEISURE_IMAGES[0]} sizes="(max-width: 780px) 94vw, 60vw" />
        </div>
      </section>
      <section className={styles.video} aria-labelledby="amenities-video-heading">
        <div className={`container ${styles.videoGrid}`}>
          <div>
            <Eyebrow>See the experience</Eyebrow>
            <h2 id="amenities-video-heading">A closer look at life at Aureum.</h2>
            <p>Explore a short visual preview of the planned amenities and shared spaces.</p>
          </div>
          <video className={styles.videoPlayer} controls playsInline preload="metadata" poster={AMENITIES_VIDEO.poster} aria-label={AMENITIES_VIDEO.label}>
            <source src={AMENITIES_VIDEO.src} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </section>
      <section className={styles.directory} id="planned-amenities" aria-labelledby="amenities-heading">
        <div className="container">
          <Eyebrow>Planned amenities</Eyebrow>
          <h2 id="amenities-heading">Find what fits your day.</h2>
          <p>Aureum plans these facilities for the development. Access and membership terms vary and should be confirmed with the sales team.</p>
          <div className={styles.themes}>
            {themes.map((theme) => (
              <section key={theme.title} aria-label={theme.title}>
                <h3>{theme.title}</h3>
                <ul>{theme.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>
      <div id="amenity-access" className={styles.access}>
        <AccessSection />
        <div className={`container ${styles.membership}`}>
          <Link href="/corporate-offices">About the office amenities membership →</Link>
          <Link href="/contact#enquiry">Ask about amenity access →</Link>
        </div>
      </div>
    </>
  );
}
