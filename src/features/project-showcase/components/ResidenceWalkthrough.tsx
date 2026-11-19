import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESIDENCE_FEATURED_VIDEOS } from '../images';

export function ResidenceWalkthrough() {
  return (
    <section className="section walkthroughSection" aria-labelledby="walkthrough-heading">
      <div className="container">
        <SectionHeading id="walkthrough-heading" eyebrow="Step inside" title="Choose your residence walkthrough." description="Select one of the latest residential videos to preview a Studio or 1-bedroom home." />
        <ol className="walkthroughGrid">
          {RESIDENCE_FEATURED_VIDEOS.map((clip) => (
            <li key={clip.src} className="walkthroughItem">
              <div className="walkthroughMedia">
                <video src={clip.src} poster={clip.poster} controls playsInline preload="metadata" aria-label={clip.label} />
              </div>
              <h3>{clip.label}</h3>
              <p>{clip.detail}</p>
            </li>
          ))}
        </ol>
        <p className="showcaseNote">Interior impressions. Finishes, furniture and fit-out are illustrative.</p>
      </div>
    </section>
  );
}
