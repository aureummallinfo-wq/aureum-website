import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESIDENCE_CLIPS, RESIDENCE_IMAGES } from '../images';

const posters = [RESIDENCE_IMAGES[2], RESIDENCE_IMAGES[5], RESIDENCE_IMAGES[5], RESIDENCE_IMAGES[0]];

export function ResidenceWalkthrough() {
  return (
    <section className="section walkthroughSection" aria-labelledby="walkthrough-heading">
      <div className="container">
        <SectionHeading id="walkthrough-heading" eyebrow="Step inside" title="From the corridor to your living room." description="Four short, silent interior clips. Choose a clip to play it." />
        <ol className="walkthroughGrid">
          {RESIDENCE_CLIPS.map((clip, index) => (
            <li key={clip.src} className="walkthroughItem">
              <div className="walkthroughMedia">
                <video src={clip.src} poster={posters[index].src} controls playsInline preload="none" aria-label={clip.label} />
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
