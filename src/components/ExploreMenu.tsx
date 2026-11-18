'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { EXPLORE_NAV } from '@/lib/site';
import styles from './ExploreMenu.module.css';

export function ExploreMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef('');

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  function navigate() {
    setOpen(false);
    onNavigate();
  }

  return (
    <div
      className={`navMenu ${styles.dropdownWrapper}${open ? ` isOpen ${styles.isOpen}` : ''}`}
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return;
        setOpen(false);
        triggerRef.current?.focus();
      }}
    >
      <button
        ref={triggerRef}
        className="navMenuTrigger"
        type="button"
        aria-expanded={open}
        aria-controls="explore-menu-dropdown"
        onPointerDown={(event) => {
          lastPointer.current = event.pointerType;
        }}
        onClick={(event) => {
          const byMouse = event.detail > 0 && lastPointer.current === 'mouse';
          lastPointer.current = '';
          setOpen((value) => (byMouse ? true : !value));
        }}
      >
        Explore<span className="navMenuChevron" aria-hidden="true" />
      </button>

      <div
        className={styles.dropdownPanel}
        id="explore-menu-dropdown"
        role="region"
        aria-label="Explore Aureum pages"
      >
        <ul className={styles.dropdownList}>
          {EXPLORE_NAV.map((item) => (
            <li key={item.href} className={styles.dropdownItem}>
              <Link href={item.href} className={styles.dropdownLink} onClick={navigate}>
                <span className={styles.dropdownLinkContent}>
                  <strong className={styles.dropdownLinkLabel}>{item.label}</strong>
                  <span className={styles.dropdownLinkDetail}>{item.detail}</span>
                </span>
                <span className={styles.dropdownArrow} aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
