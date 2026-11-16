import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ImmersivePreview() {
  return (
    <section className="section immersiveSection" aria-labelledby="immersive-heading">
      <div className="container immersiveGrid">
        <div className="immersiveVisual" aria-hidden="true"><span>360° / EXPERIENCE SLOT</span><strong>Move through the idea of home.</strong><i /></div>
        <div className="immersiveCopy">
          <SectionHeading
            id="immersive-heading"
            eyebrow="An immersive next step"
            title="Let the space become familiar before the visit."
            description="Open the approved 360° experiences for the Play Land, Trampoline Park and full-glass offices, then explore the complete project media register."
          />
          <Eyebrow>Now available</Eyebrow>
          <ButtonLink href="/immersive-media#d5-tours-heading" variant="dark">Open virtual tours <span aria-hidden="true">↗</span></ButtonLink>
        </div>
      </div>
    </section>
  );
}
