'use client';

import { useEffect, useRef, useState } from 'react';

function parseNumeric(text: string): { prefix: string; number: number; suffix: string } | null {
  const match = text.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], number: parseFloat(match[2].replace(/,/g, '')), suffix: match[3] };
}

export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parsed = parseNumeric(value);
    if (!parsed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();
        const target = parsed.number;
        const isInteger = Number.isInteger(target);

        function step(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          const current = eased * target;
          const formatted = isInteger
            ? Math.round(current).toLocaleString()
            : current.toFixed(1);
          setDisplay(`${parsed!.prefix}${formatted}${parsed!.suffix}`);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <strong ref={ref} className={className}>{display}</strong>;
}
