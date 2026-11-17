'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import styles from './residences.module.css';

type Scene = {
  label: string;
  copy: ReactNode;
  image: ReactNode;
};

export function ResidenceSequence({
  scenes,
  idPrefix = 'residence-chapter',
  navigationLabel = 'Residential story chapters',
}: {
  scenes: readonly Scene[];
  idPrefix?: string;
  navigationLabel?: string;
}) {
  const sequence = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = sequence.current;
    if (!element) return;

    const preference = window.matchMedia('(min-width: 900px) and (min-height: 550px) and (prefers-reduced-motion: no-preference)');
    function updatePreference() {
      setEnabled(preference.matches);
    }
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const element = sequence.current;
    if (!enabled || !element) return;

    const chapters = Array.from(element.querySelectorAll<HTMLElement>('[data-residence-chapter]'));
    let frame = 0;

    function update() {
      frame = 0;
      const readingLine = window.innerHeight * 0.45;
      const next = chapters.filter((chapter) => chapter.getBoundingClientRect().top <= readingLine).length - 1;
      setActive(Math.max(0, next));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function followHash() {
      const chapter = chapters.find((item) => `#${item.id}` === window.location.hash);
      chapter?.scrollIntoView({ behavior: 'instant', block: 'start' });
      schedule();
    }

    followHash();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('popstate', followHash);
    window.addEventListener('hashchange', followHash);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('popstate', followHash);
      window.removeEventListener('hashchange', followHash);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  function jump(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = event.currentTarget.hash;
    const chapter = document.getElementById(hash.slice(1));
    if (!chapter) return;
    event.preventDefault();
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    chapter.scrollIntoView({ behavior: 'instant', block: 'start' });
    setActive(index);
  }

  return (
    <div className={styles.sequence} data-enhanced={enabled || undefined} ref={sequence}>
      {enabled && (
        <div className={styles.stage}>
          <div className={styles.stageImages}>
            {scenes.map((scene, index) => (
              <div className={styles.stageImage} data-current={index === active} aria-hidden={index !== active} key={scene.label}>
                {scene.image}
                <div className={styles.stageCopy} aria-hidden="true">{scene.copy}</div>
              </div>
            ))}
          </div>
          <nav className={styles.chapterLinks} aria-label={navigationLabel}>
            {scenes.map((scene, index) => (
              <a href={`#${idPrefix}-${index + 1}`} aria-current={index === active ? 'step' : undefined} onClick={(event) => jump(event, index)} key={scene.label}>
                {scene.label}
              </a>
            ))}
          </nav>
        </div>
      )}
      <div className={styles.sequenceChapters}>
        {scenes.map((scene, index) => (
          <article
            className={styles.chapter}
            id={`${idPrefix}-${index + 1}`}
            data-residence-chapter
            data-current={index === active}
            key={scene.label}
          >
            <div className={styles.inlineImage}>{scene.image}</div>
            <div className={styles.chapterCopy}>{scene.copy}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
