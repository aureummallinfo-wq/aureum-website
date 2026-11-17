import { Eyebrow } from '@/components/ui/Eyebrow';
import { BRAND_FILM } from '../data';

export function BrandFilmSection({ placement }: { placement: string }) {
  return (
    <section className="section filmSection" aria-labelledby={`film-heading-${placement}`}>
      <div className="container">
        <div className="filmIntro">
          <Eyebrow>The official film</Eyebrow>
          <h2 id={`film-heading-${placement}`}>See Aureum come to life.</h2>
        </div>
        <div className="filmFrame">
          <video controls playsInline preload="none" poster={BRAND_FILM.poster} aria-label={BRAND_FILM.title}>
            {BRAND_FILM.sources.map((source) => (
              <source key={source.src} src={source.src} type="video/mp4" media={'media' in source ? source.media : undefined} />
            ))}
          </video>
        </div>
      </div>
    </section>
  );
}
