'use client';

import { useState, type ReactNode } from 'react';
import styles from './residences.module.css';

export function ResidenceGallery({ views, imageLabel = 'residential image' }: { views: readonly { label: string; figure: ReactNode }[]; imageLabel?: string }) {
  const [current, setCurrent] = useState(0);

  function move(direction: number) {
    setCurrent((index) => (index + direction + views.length) % views.length);
  }

  return (
    <div className={styles.imageJournal} onKeyDown={(event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }}>
      <div className={styles.journalFrames}>
        {views.map((view, index) => (
          <div className={styles.journalFrame} data-current={current === index} aria-hidden={current !== index} key={view.label}>
            {view.figure}
          </div>
        ))}
      </div>
      <div className={styles.journalControls}>
        <p aria-live="polite">{current + 1} / {views.length} <span>{views[current].label}</span></p>
        <div>
          <button type="button" aria-label={`Previous ${imageLabel}`} onClick={() => move(-1)}>←</button>
          <button type="button" aria-label={`Next ${imageLabel}`} onClick={() => move(1)}>→</button>
        </div>
      </div>
    </div>
  );
}
