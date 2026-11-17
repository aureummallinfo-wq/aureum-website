'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ImmersiveMediaAsset } from '../data';

type MediaLightboxProps = {
  asset: ImmersiveMediaAsset;
  onClose: () => void;
};

function MediaSurface({ asset }: { asset: ImmersiveMediaAsset }) {
  if (asset.src) {
    return <Image className="mediaLightboxImage" src={asset.src} alt={asset.alt} width={asset.width ?? 1600} height={asset.height ?? 1000} priority />;
  }

  return <div className="mediaSurfaceFallback"><span>Project media</span><strong>The selected project media is not available in this format.</strong></div>;
}

export function MediaLightbox({ asset, onClose }: MediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      className="mediaLightbox"
      ref={dialogRef}
      aria-labelledby="media-lightbox-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="mediaLightboxPanel">
        <div className="mediaLightboxHeader">
          <div>
            <span className="eyebrow">{asset.label}</span>
            <h2 id="media-lightbox-title">{asset.title}</h2>
          </div>
          <button className="mediaCloseButton" type="button" onClick={onClose} aria-label="Close media viewer">Close</button>
        </div>
        <div className="mediaLightboxSurface"><MediaSurface asset={asset} /></div>
        <p className="mediaLightboxCaption">{asset.caption}</p>
      </div>
    </dialog>
  );
}
