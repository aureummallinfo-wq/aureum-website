import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import styles from './HomeHero.module.css';

const HERO_IMAGE = '/assets/aureum/approved/renders/aureum-exterior-evening.jpg';

export function Hero() {
  return (
    <section className={`heroCinema ${styles.editorial}`} data-blended-navigation aria-labelledby="hero-title">
      <Image className="heroCinemaImage" src={HERO_IMAGE} alt="Aureum Mall and Residences in the evening, showing the glass atrium entrance and residences tower" fill preload sizes="(max-width: 760px) 135vh, 100vw" />
      <video
        className="heroCinemaVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_IMAGE}
        aria-label="Hand-drawn architectural reveal of Aureum Mall and Residences"
      >
        <source src="/assets/aureum/approved/video/hand-made-sketch-final-2.mp4" type="video/mp4" />
      </video>
      <div className="heroCinemaShade" aria-hidden="true" />
      <div className="container heroCinemaInner">
        <p className="heroCinemaKicker">Bahria Town � Ring Road Interchange � Lahore</p>
        <h1 id="hero-title">Aureum Mall <span>&amp; Residences</span></h1>
        <p className="heroCinemaLead">A 16 kanal landmark of shopping, dining, workplaces, a luxury hotel and residences.</p>
        <div className="actions">
          <ButtonLink href="/about">Discover Aureum <span aria-hidden="true"></span></ButtonLink>
          <ButtonLink href="/apartments">Explore residences <span aria-hidden="true"></span></ButtonLink>
          <ButtonLink href="/payment-plans">View payment plans <span aria-hidden="true"></span></ButtonLink>
        </div>
      </div>
      <div className="container heroCinemaFoot">
        <dl className="heroCinemaFacts" aria-label="Project information">
          <div><dt>Site</dt><dd>16 kanal</dd></div>
          <div><dt>Bahria Town</dt><dd>0 min</dd></div>
          <div><dt>Lahore airport</dt><dd>15 min</dd></div>
        </dl>
        <span className="heroCinemaNote">Artist's impression</span>
      </div>
      <a className={styles.nextTeaser} href="#location-route-animation">
        <span>NEXT</span>
        <span className={styles.nextDivider} aria-hidden="true" />
        <span>15 MINUTES FROM LAHORE AIRPORT</span>
        <span aria-hidden="true"></span>
      </a>
    </section>
  );
}

