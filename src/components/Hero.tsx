import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { BackgroundFilm } from '@/features/immersive-media/components/BrandFilm';

const HERO_IMAGE = '/assets/aureum/approved/renders/aureum-architecture-aerial.webp';
const HERO_MOBILE_IMAGE = '/assets/aureum/approved/renders/aureum-architecture-dusk.webp';

export function Hero() {
  return (
    <section className="heroCinema" aria-labelledby="hero-title">
      <Image className="heroCinemaImage heroCinemaImageDesktop" src={HERO_IMAGE} alt="Aureum Mall & Residences aerial exterior, showing the mall entrance, residences and hotel" fill priority sizes="100vw" />
      <Image className="heroCinemaImage heroCinemaImageMobile" src={HERO_MOBILE_IMAGE} alt="" aria-hidden="true" fill sizes="100vw" />
      <BackgroundFilm className="heroCinemaFilm" poster={HERO_IMAGE} sizes="100vw" />
      <div className="heroCinemaShade" aria-hidden="true" />
      <div className="container heroCinemaInner">
        <p className="heroCinemaKicker">Bahria Town · Ring Road Interchange · Lahore</p>
        <h1 id="hero-title">Aureum Mall <span>&amp; Residences</span></h1>
        <p className="heroCinemaLead">A landmark destination of shopping, dining, workplaces, a luxury hotel and residences — rising at the gateway to Bahria Town.</p>
        <div className="actions">
          <ButtonLink href="/about">Discover Aureum</ButtonLink>
          <ButtonLink href="/payment-plans" variant="secondary">Payment plans</ButtonLink>
        </div>
      </div>
      <div className="container heroCinemaFoot">
        <dl className="heroCinemaFacts" aria-label="Project information">
          <div><dt>Site</dt><dd>16 Kanal</dd></div>
          <div><dt>Bahria Town</dt><dd>0 min</dd></div>
          <div><dt>Airport</dt><dd>25 min</dd></div>
          <div><dt>Amenities</dt><dd>20+</dd></div>
        </dl>
        <span className="heroCinemaNote">Artist&apos;s impression</span>
      </div>
    </section>
  );
}
