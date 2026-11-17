import Image from 'next/image';
import type { ImmersiveMediaAsset } from '../data';

type MediaAssetCardProps = {
  asset: ImmersiveMediaAsset;
  onOpen: () => void;
};

export function MediaAssetCard({ asset, onOpen }: MediaAssetCardProps) {
  return (
    <article className="mediaAssetCard">
      <button className="mediaAssetButton" type="button" aria-haspopup="dialog" onClick={onOpen}>
        <span className="mediaAssetVisual" data-kind={asset.kind} aria-hidden="true">
          <Image src={asset.src} alt="" fill sizes="(max-width: 760px) 94vw, (max-width: 1080px) 46vw, 390px" />
        </span>
        <span className="mediaAssetBody">
          <span className="eyebrow">{asset.label}</span>
          <strong>{asset.title}</strong>
          <span>{asset.description}</span>
        </span>
      </button>
      <p className="mediaAssetCaption">{asset.caption}</p>
    </article>
  );
}
