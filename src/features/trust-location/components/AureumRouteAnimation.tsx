'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { LOCATION_MAP } from '@/features/project-showcase/images';
import styles from './AureumRouteAnimation.module.css';

interface Waypoint {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  progress: number;
  image: string;
}

const SAT = '/assets/aureum/approved/location/satellite';

const WAYPOINTS: Waypoint[] = [
  {
    id: 'airport',
    label: 'Airport',
    title: 'LAHORE\nAIRPORT',
    subtitle: 'Where the drive begins. Allama Iqbal International Airport, direct onto Ring Road.',
    progress: 0.0,
    image: `${SAT}/01_Airport_Wide.webp`,
  },
  {
    id: 'dha',
    label: 'DHA',
    title: 'DHA\nLAHORE',
    subtitle: 'Ten minutes from the airport, the route joins Lahore Ring Road toward Bahria Town.',
    progress: 0.33,
    image: `${SAT}/03_DHA_Phase5_Interchange.webp`,
  },
  {
    id: 'interchange',
    label: 'Bahria Town',
    title: 'BAHRIA TOWN\nINTERCHANGE',
    subtitle: 'Dedicated interchange exit descending into Bahria Town Main Boulevard.',
    progress: 0.66,
    image: `${SAT}/07_Bahria_Interchange_Wide.webp`,
  },
  {
    id: 'aureum',
    label: 'Aureum',
    title: 'AUREUM MALL\n& RESIDENCES',
    subtitle: 'Bahria Town Ring Road Interchange, Lahore.',
    progress: 1.0,
    image: LOCATION_MAP.src,
  },
];

export function AureumRouteAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);

  const jumpTo = useCallback((idx: number) => {
    targetRef.current = WAYPOINTS[idx].progress;
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const dist = rect.height - window.innerHeight;
      window.scrollTo({ top: top + WAYPOINTS[idx].progress * dist, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    let raf: number;

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      if (dist <= 0) return;
      targetRef.current = Math.max(0, Math.min(1, -rect.top / dist));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const loop = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.06;
      const p = Math.max(0, Math.min(1, currentRef.current));
      setProgress(p);

      let idx = 0;
      for (let i = WAYPOINTS.length - 1; i >= 0; i--) {
        if (p >= WAYPOINTS[i].progress - 0.08) { idx = i; break; }
      }
      setActiveIdx(idx);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const wp = WAYPOINTS[activeIdx];
  const titleLines = wp.title.split('\n');

  return (
    <section
      id="location-route-animation"
      ref={sectionRef}
      className={styles.section}
      aria-label="Route from Lahore Airport to Aureum Mall"
    >
      <div className={styles.sticky}>
        {/* Satellite image layers — crossfade on scroll */}
        <div className={styles.bg}>
          {WAYPOINTS.map((w, i) => (
            <Image
              key={w.id}
              src={w.image}
              alt={w.id === 'aureum' ? 'Premium aerial location map of Aureum Mall & Residences' : `Satellite view: ${w.label}`}
              fill
              sizes="100vw"
              priority={i === 0}
              className={`${styles.satLayer} ${i === activeIdx ? styles.satActive : ''}`}
            />
          ))}
          <div className={styles.vignette} />
        </div>

        {/* Skip link */}
        <a href="#trust-location-workspace" className={styles.skip}>SKIP THE DRIVE</a>

        {/* Intro text — only at the very start */}
        <div className={`${styles.intro} ${progress > 0.06 ? styles.introHidden : ''}`}>
          <h2 className={styles.introTitle}>15 MINUTES FROM<br />LAHORE AIRPORT</h2>
          <p className={styles.introSub}>Along Ring Road, to the gates of Bahria Town.</p>
          <span className={styles.scrollHint}>SCROLL</span>
        </div>

        {/* Active waypoint text — Harsukh style large serif text */}
        <div className={`${styles.waypointText} ${progress < 0.06 ? styles.waypointHidden : ''}`}>
          <span className={styles.waypointNum}>{String(activeIdx + 1).padStart(2, '0')}</span>
          <h3 className={styles.waypointTitle}>
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>{line}{i < titleLines.length - 1 && <br />}</React.Fragment>
            ))}
          </h3>
          <p className={styles.waypointSub}>{wp.subtitle}</p>
        </div>

        {/* Bottom nav — Harsukh style: simple labels with progress dots */}
        <nav className={styles.bottomNav} aria-label="Route waypoints">
          <div className={styles.navTrack}>
            {WAYPOINTS.map((w, i) => {
              const passed = progress >= w.progress - 0.05;
              const active = i === activeIdx;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={`${styles.navDot} ${passed ? styles.navPassed : ''} ${active ? styles.navActive : ''}`}
                  aria-current={active ? 'step' : undefined}
                >
                  <span className={styles.dot} />
                  <span className={styles.navLabel}>{w.label}</span>
                </button>
              );
            })}
            <div className={styles.navLine} />
            <div className={styles.navLineFill} style={{ width: `${progress * 100}%` }} />
          </div>
        </nav>

        {/* Attribution */}
        <p className={styles.attribution}>
          Route imagery is illustrative and the route line is indicative. Renders are artist&apos;s impressions.
        </p>
      </div>
    </section>
  );
}
