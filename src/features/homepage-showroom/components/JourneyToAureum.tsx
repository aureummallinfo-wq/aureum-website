'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { JOURNEY_TO_AUREUM } from '../data';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function JourneyToAureum() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pausedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const updateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section || pausedRef.current) return;
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const rawProgress = clamp(-section.getBoundingClientRect().top / scrollable, 0, 1);
    setProgress(rawProgress);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mediaQuery.removeEventListener?.('change', updateMotionPreference);
    };
  }, [updateProgress]);

  const position = progress * (JOURNEY_TO_AUREUM.length - 1);
  const activeIndex = clamp(Math.round(position), 0, JOURNEY_TO_AUREUM.length - 1);
  const activeStop = JOURNEY_TO_AUREUM[activeIndex];

  const railStyle = useMemo(() => ({ '--journey-progress': `${progress * 100}%` }) as CSSProperties, [progress]);

  function togglePaused() {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    if (!next) updateProgress();
  }

  function goToStop(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const target = window.scrollY + section.getBoundingClientRect().top + scrollable * (index / (JOURNEY_TO_AUREUM.length - 1));
    window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <section ref={sectionRef} className="journeySection" style={{ '--journey-stops': JOURNEY_TO_AUREUM.length } as CSSProperties} aria-labelledby="journey-heading">
      <div className="journeySticky">
        <div className="journeyVisual" aria-hidden="true">
          {JOURNEY_TO_AUREUM.map((stop, index) => {
            const distance = Math.abs(position - index);
            const opacity = Math.max(0, 1 - distance);
            const scale = 1.02 + Math.max(0, 0.025 - distance * 0.025);
            return <Image key={stop.id} className="journeyImage" src={stop.image} alt="" fill priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'} sizes="100vw" style={{ opacity, transform: `scale(${scale})` }} />;
          })}
          <div className="journeyShade" />
        </div>

        <div className="journeyRail" style={railStyle} aria-label="Journey to Aureum stops">
          <div className="journeyRailLine" aria-hidden="true" />
          <ol>
            {JOURNEY_TO_AUREUM.map((stop, index) => (
              <li key={stop.id} className={index === activeIndex ? 'isActive' : ''}>
                <button type="button" onClick={() => goToStop(index)} aria-label={`Go to ${stop.label}`} aria-current={index === activeIndex ? 'step' : undefined}>
                  <span className="journeyRailDot" aria-hidden="true" />
                  <span>{stop.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="container journeyCopy">
          <p className="journeyStep">{activeStop.step} / {String(JOURNEY_TO_AUREUM.length).padStart(2, '0')}</p>
          <p className="journeyEyebrow">{activeStop.eyebrow}</p>
          <h2 id="journey-heading" aria-live="polite">{activeStop.title}</h2>
          <p className="journeyDescription">{activeStop.description}</p>
          <p className="journeyMeta">{activeStop.meta}</p>
          <div className="journeyActions">
            <ButtonLink href="/location" variant="secondary">Explore the location <span aria-hidden="true">↗</span></ButtonLink>
            <button type="button" className="journeyPause" onClick={togglePaused} aria-pressed={paused}>{paused ? 'Resume movement' : 'Pause movement'}</button>
          </div>
        </div>

        <p className="journeyDisclaimer">Artist&apos;s impression. Location, access and building details are subject to final developer confirmation.</p>
      </div>

      <div className="container journeyFallback" aria-label="Journey to Aureum overview">
        <p className="journeyFallbackIntro">Scroll through the route, or read the four stops below.</p>
        <ol>
          {JOURNEY_TO_AUREUM.map((stop) => <li key={stop.id}><span>{stop.step}</span><div><strong>{stop.label}</strong><p>{stop.description}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
