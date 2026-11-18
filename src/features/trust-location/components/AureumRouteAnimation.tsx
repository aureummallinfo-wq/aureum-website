'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AureumRouteAnimation.module.css';

export interface RouteMilestone {
  id: string;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  driveTime: string;
  description: string;
  progress: number; // 0.0 to 1.0 along the route
  coordinates: { x: number; y: number }; // Screen-percentage relative to map
}

export const AUREUM_ROUTE_MILESTONES: readonly RouteMilestone[] = [
  {
    id: 'airport',
    number: '01',
    icon: '✈',
    title: 'Allama Iqbal Int’l Airport',
    subtitle: 'Lahore Airport Departure',
    driveTime: '10-Min Drive',
    description: 'Direct signal-free departure onto the Lahore Ring Road (L-20). The fastest express route connecting international travelers straight to Aureum Mall.',
    progress: 0.05,
    coordinates: { x: 74, y: 12 },
  },
  {
    id: 'dha',
    number: '02',
    icon: '🏛',
    title: 'DHA Lahore',
    subtitle: 'Defence Housing Authority',
    driveTime: '8-Min Drive',
    description: 'Swift transit bypassing central city traffic via the eastern ring expressway, linking DHA Phase 5, Phase 6, Phase 7, and Phase 8.',
    progress: 0.28,
    coordinates: { x: 46, y: 18 },
  },
  {
    id: 'kalma-chowk',
    number: '03',
    icon: '🗼',
    title: 'Kalma Chowk',
    subtitle: 'Central Urban Hub',
    driveTime: '5-Min Drive',
    description: 'Immediate connectivity to Gulberg business districts, Ferozepur Road, and Liberty commercial centres via rapid Ring Road flyovers.',
    progress: 0.52,
    coordinates: { x: 34, y: 41 },
  },
  {
    id: 'adda-plot',
    number: '04',
    icon: '📍',
    title: 'Adda Plot',
    subtitle: 'Raiwind Junction',
    driveTime: '2-Min Drive',
    description: 'The entrance to Southern Loop SL-3, elevating transit speeds and unlocking seamless movement toward Bahria Town.',
    progress: 0.73,
    coordinates: { x: 42, y: 55 },
  },
  {
    id: 'interchange',
    number: '05',
    icon: '🛣',
    title: 'Bahria Town Interchange Exit',
    subtitle: 'Ring Road SL-3 Interchange',
    driveTime: '0-Min Drive',
    description: 'Dedicated modern interchange exit providing direct, congestion-free ramp descent straight into Bahria Town Main Boulevard.',
    progress: 0.90,
    coordinates: { x: 55, y: 72 },
  },
  {
    id: 'aureum-mall',
    number: '06',
    icon: '🏢',
    title: 'Aureum Mall & Residences',
    subtitle: 'Arrived at Destination',
    driveTime: '0-Min · On Site',
    description: 'Premier landmark destination at Bahria Town Interchange featuring luxury retail, corporate office suites, fine dining, and serviced residences.',
    progress: 1.0,
    coordinates: { x: 67, y: 84 },
  },
] as const;

export function AureumRouteAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Target progress for smooth interpolation (lerp)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Sync ref with state
  isPlayingRef.current = isPlaying;

  // Jump or scrub to a specific milestone
  const jumpToMilestone = useCallback((index: number) => {
    const target = AUREUM_ROUTE_MILESTONES[index].progress;
    targetProgressRef.current = target;
    setIsPlaying(false);

    // If user clicked, scroll the page to match the milestone position in the track
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const scrollableDist = rect.height - window.innerHeight;
      const targetScrollY = containerTop + target * scrollableDist;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, []);

  // Native scroll tracking + Lerp animation loop (Same 0.08 smoothing used by theharsukh.com)
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (isPlayingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = -rect.top / scrollable;
      targetProgressRef.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const renderLoop = () => {
      // If auto-playing, advance progress gradually
      if (isPlayingRef.current) {
        targetProgressRef.current += 0.0035; // ~10 seconds full loop
        if (targetProgressRef.current >= 1) {
          targetProgressRef.current = 1;
          setIsPlaying(false);
        }
      }

      // Smooth lerp: current += (target - current) * 0.08
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;
      const prog = Math.max(0, Math.min(1, currentProgressRef.current));
      setCurrentProgress(prog);

      // Scrub the synchronized 4K video frame
      if (videoRef.current && videoRef.current.duration) {
        const targetTime = prog * videoRef.current.duration;
        // Only update if difference is noticeable to avoid browser decode thrashing
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.04) {
          videoRef.current.currentTime = targetTime;
        }
      }

      // Calculate active milestone
      let foundIdx = 0;
      for (let i = AUREUM_ROUTE_MILESTONES.length - 1; i >= 0; i--) {
        if (prog >= AUREUM_ROUTE_MILESTONES[i].progress - 0.06) {
          foundIdx = i;
          break;
        }
      }
      setActiveMilestoneIndex(foundIdx);

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const activeMilestone = AUREUM_ROUTE_MILESTONES[activeMilestoneIndex];

  return (
    <section
      id="location-route-animation"
      ref={containerRef}
      className={styles.routeSection}
      aria-label="Interactive Route from Lahore Airport to Aureum Mall"
    >
      <div className={styles.stickyStage}>
        {/* 1. Synchronized Video Background */}
        <div className={styles.mediaStage}>
          <video
            ref={videoRef}
            src="/video/aureum-route-animation.mp4"
            className={styles.routeVideo}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setIsVideoReady(true)}
          />
          {/* Fallback image while video loads or on low-power devices */}
          {!isVideoReady && (
            <Image
              src="/assets/aureum/approved/location/aureum-ring-road-route-map.jpg"
              alt="Lahore Airport to Aureum Mall Route Map"
              fill
              priority
              className={styles.fallbackPoster}
            />
          )}
          <div className={styles.vignetteOverlay} />
        </div>

        {/* 2. Top Header HUD with Airport Emphasis */}
        <header className={styles.topHud}>
          <div className={styles.routeBadge}>
            <span className={styles.pulseDot} />
            <span className={styles.badgeText}>RING ROAD EXPRESS ROUTE (SL-3)</span>
          </div>
          <h2 className={styles.mainTitle}>
            <span className={styles.titleSub}>LAHORE AIRPORT</span>
            <span className={styles.titleArrow}> → </span>
            <span className={styles.titleMain}>AUREUM MALL</span>
          </h2>
          <p className={styles.tagline}>
            Complete 10-Minute Signal-Free Drive from Allama Iqbal International Airport to Bahria Town
          </p>
        </header>

        {/* 3. Milestone Tabs Navigation (Quick Scrubbing) */}
        <nav className={styles.milestoneTabs} aria-label="Route Milestones">
          {AUREUM_ROUTE_MILESTONES.map((m, idx) => {
            const isActive = activeMilestoneIndex === idx;
            const isPassed = currentProgress >= m.progress - 0.02;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => jumpToMilestone(idx)}
                className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''} ${isPassed ? styles.tabPassed : ''}`}
                aria-current={isActive ? 'step' : undefined}
                title={`${m.number}. ${m.title} (${m.driveTime})`}
              >
                <span className={styles.tabIcon}>{m.icon}</span>
                <span className={styles.tabNum}>{m.number}</span>
                <span className={styles.tabTitle}>{m.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>

        {/* 4. Left Narrative Story Card (Harsukh Style) */}
        <aside className={styles.storyCard}>
          <div className={styles.cardTop}>
            <div className={styles.stepIndicator}>
              <span className={styles.stepNum}>{activeMilestone.number}</span>
              <span className={styles.stepTotal}>/ 06</span>
            </div>
            <div className={styles.driveBadge}>
              <span className={styles.clockIcon}>⏱</span>
              <span>{activeMilestone.driveTime}</span>
            </div>
          </div>

          <span className={styles.milestoneSubtitle}>{activeMilestone.subtitle}</span>
          <h3 className={styles.milestoneTitle}>{activeMilestone.title}</h3>
          <p className={styles.milestoneDesc}>{activeMilestone.description}</p>

          <div className={styles.highlightsBox}>
            <span className={styles.highlightsHeader}>Route Advantages</span>
            <ul className={styles.highlightsList}>
              <li>Direct Access via Ring Road (SL-3)</li>
              <li>Smooth &amp; Fastest Express Route</li>
              <li>Direct Connection to Bahria Town</li>
            </ul>
          </div>
        </aside>

        {/* 5. Destination 3D Reveal Card (Aureum Mall) */}
        <aside
          className={`${styles.destinationCard} ${currentProgress >= 0.86 ? styles.destinationVisible : ''}`}
          aria-hidden={currentProgress < 0.86}
        >
          <div className={styles.destinationImage}>
            <Image
              src="/assets/aureum/approved/renders/aureum-exterior-day-wide.jpg"
              alt="Aureum Mall & Residences 3D Architectural View"
              width={340}
              height={200}
              className={styles.mallImage}
            />
            <div className={styles.destinationTag}>Destination Arrived</div>
          </div>
          <div className={styles.destinationBody}>
            <h4>Aureum Mall &amp; Residences</h4>
            <p className={styles.destSub}>At Bahria Town Ring Road Interchange</p>
            <div className={styles.destinationMeta}>
              <span>Luxury Apartments</span>
              <span>Commercial Shops</span>
              <span>Offices &amp; Food Court</span>
            </div>
            <div className={styles.destinationActions}>
              <Link href="/book-site-visit" className={styles.primaryCta}>
                Book a Site Visit →
              </Link>
              <Link href="/contact" className={styles.secondaryCta}>
                Inquire Details
              </Link>
            </div>
          </div>
        </aside>

        {/* 6. Bottom Controls: Play/Pause, Progress Bar, and Skip Button */}
        <div className={styles.bottomControls}>
          <button
            type="button"
            onClick={() => {
              if (currentProgress >= 0.99) {
                targetProgressRef.current = 0;
                currentProgressRef.current = 0;
              }
              setIsPlaying(!isPlaying);
            }}
            className={styles.playBtn}
            aria-label={isPlaying ? 'Pause route animation' : 'Play route animation'}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play Route'}
          </button>

          {/* Interactive Progress Scrubber */}
          <div
            className={styles.scrubberTrack}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(currentProgress * 100)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              targetProgressRef.current = Math.max(0, Math.min(1, clickPos));
              setIsPlaying(false);
            }}
          >
            <div className={styles.scrubberFill} style={{ width: `${currentProgress * 100}%` }} />
            <div
              className={styles.scrubberThumb}
              style={{ left: `${currentProgress * 100}%` }}
              title={`Progress: ${Math.round(currentProgress * 100)}%`}
            />
          </div>

          <a href="#trust-location-workspace" className={styles.skipLink}>
            Scroll to Map Details ↓
          </a>
        </div>
      </div>
    </section>
  );
}
