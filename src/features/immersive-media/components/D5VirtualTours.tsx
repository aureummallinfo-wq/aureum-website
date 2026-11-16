'use client';

import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { D5_VIRTUAL_TOURS } from '../data';

export function D5VirtualTours() {
  return (
    <section className="section d5ToursSection" aria-labelledby="d5-tours-heading">
      <div className="container">
        <div className="d5ToursIntro">
          <div>
            <Eyebrow>Approved D5 showreels</Eyebrow>
            <h2 id="d5-tours-heading">Go inside the spaces that bring Aureum to life.</h2>
          </div>
          <p>Open each interactive 360° experience in D5’s viewer. The tours load only after you choose one, keeping the website fast on mobile.</p>
        </div>
        <ul className="d5ToursGrid">
          {D5_VIRTUAL_TOURS.map((tour) => (
            <li key={tour.id} className="d5TourCard">
              <a
                className="d5TourPoster"
                href={tour.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(ANALYTICS_EVENTS.virtualTourOpen, { placement: 'd5_showreel', mode: tour.id })}
                aria-label={`Open ${tour.title} in a new tab`}
              >
                <Image src={tour.poster} alt={tour.posterAlt} fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 360px" />
                <span className="d5TourBadge">360° / D5</span>
                <span className="d5TourPlay" aria-hidden="true">↗</span>
              </a>
              <div className="d5TourCopy">
                <Eyebrow>{tour.label}</Eyebrow>
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <a className="d5TourLink" href={tour.url} target="_blank" rel="noopener noreferrer" onClick={() => track(ANALYTICS_EVENTS.virtualTourOpen, { placement: 'd5_showreel', mode: tour.id })}>Open 360° view <span aria-hidden="true">↗</span></a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
