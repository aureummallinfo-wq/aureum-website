'use client';

import { useCallback, useMemo, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECT_MEDIA, MEDIA_PRINCIPLES, BRAND_FILM, type ImmersiveMediaAsset } from '../data';
import { MediaAssetCard } from './MediaAssetCard';
import { MediaLightbox } from './MediaLightbox';
import { BrandFilmSection } from './BrandFilm';
import { VirtualTourEmbed } from './VirtualTourEmbed';
import { MediaOpening } from './MediaOpening';

function MediaRegister({ assets, onOpen }: { assets: readonly ImmersiveMediaAsset[]; onOpen: (asset: ImmersiveMediaAsset) => void }) {
  return <div className="mediaGallery">{assets.map((asset) => <MediaAssetCard key={asset.id} asset={asset} onOpen={() => onOpen(asset)} />)}</div>;
}

export function ImmersiveMediaExperience() {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const selectedAsset = useMemo(() => PROJECT_MEDIA.find((asset) => asset.id === selectedAssetId), [selectedAssetId]);
  const visualAssets = useMemo(() => PROJECT_MEDIA.filter((asset) => asset.kind === 'image'), []);
  const floorPlans = useMemo(() => PROJECT_MEDIA.filter((asset) => asset.kind === 'floor-plan'), []);
  const closeViewer = useCallback(() => setSelectedAssetId(null), []);

  return (
    <>
      <MediaOpening
        eyebrow="Project media"
        title="Walk through Aureum."
        image={{ src: BRAND_FILM.poster, alt: BRAND_FILM.posterAlt }}
        links={[
          { href: '#virtual-tour', label: '360° tour' },
          { href: '#film-heading-immersive_media', label: 'Project film' },
          { href: '#media-workspace', label: 'Images' },
          { href: '#media-floor-plans', label: 'Floor plans' },
        ]}
      />

      <BrandFilmSection placement="immersive_media" />

      <section className="section tourSection" id="virtual-tour" aria-labelledby="tour-heading">
        <div className="container">
          <SectionHeading id="tour-heading" eyebrow="360° virtual tour" title="Look around before you visit." description="Drag or swipe to look in every direction, then follow the markers from the street-level arrival into the mall, residences and lifestyle spaces." />
          <VirtualTourEmbed placement="immersive_media" />
        </div>
      </section>

      <section className="section mediaWorkspace" id="media-workspace">
        <div className="container">
          <SectionHeading id="media-heading" eyebrow="Aureum project gallery" title="See the project clearly." description="Browse the project visuals and open any item for a larger view with its description and context." />
          <MediaRegister assets={visualAssets} onOpen={(asset) => setSelectedAssetId(asset.id)} />
        </div>
      </section>

      <section className="section mediaFloorPlans" id="media-floor-plans">
        <div className="container">
          <SectionHeading eyebrow="Floor plans" title="Explore the building dimensions." description="Review the available floor plans alongside their labels, then contact the team for current details." />
          <MediaRegister assets={floorPlans} onOpen={(asset) => setSelectedAssetId(asset.id)} />
        </div>
      </section>

      <section className="section mediaPrinciples">
        <div className="container mediaPrinciplesGrid">
          <div><Eyebrow>Project information</Eyebrow><h2>See more, understand more.</h2></div>
          <ul>{MEDIA_PRINCIPLES.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        </div>
      </section>

      {selectedAsset ? <MediaLightbox asset={selectedAsset} onClose={closeViewer} /> : null}
    </>
  );
}
