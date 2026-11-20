'use client';

import { useEffect, useState } from 'react';

const VIDEO_SRC = '/assets/aureum/approved/video/hand-made-sketch-final-2.mp4';

/** Defer the large hero film until the first paint has completed. The poster remains visible immediately. */
export function HeroVideo({ poster }: { poster: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const start = () => setIsReady(true);

    const requestIdle = window.requestIdleCallback;
    if (typeof requestIdle === 'function') {
      const idleId = window.requestIdleCallback(start, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    timer = window.setTimeout(start, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <video
      className="heroCinemaVideo"
      autoPlay={isReady}
      muted
      loop
      playsInline
      preload={isReady ? 'metadata' : 'none'}
      poster={poster}
      aria-label="Hand-drawn architectural reveal of Aureum Mall and Residences"
    >
      {isReady ? <source src={VIDEO_SRC} type="video/mp4" /> : null}
    </video>
  );
}

