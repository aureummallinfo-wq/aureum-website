'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Wraps content in a scroll-triggered fade-up reveal.
 * Uses IntersectionObserver — no external animation library needed.
 */
export function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div' }: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('isVisible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('isVisible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? ` revealDelay${delay}` : '';

  return (
    <Tag ref={(element: HTMLElement | null) => { ref.current = element; }} className={`reveal${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
