import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './MediaEditorial.module.css';

type MediaOpeningProps = {
  eyebrow: string;
  title: string;
  image: { src: string; alt: string };
  links: readonly { href: string; label: string }[];
};

export function MediaOpening({ eyebrow, title, image, links }: MediaOpeningProps) {
  return (
    <section className={styles.opening} data-blended-navigation aria-labelledby="media-opening-title">
      <Image src={image.src} alt={image.alt} fill preload sizes="(max-width: 760px) 120vh, 100vw" />
      <div className={`container ${styles.openingCopy}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 id="media-opening-title">{title}</h1>
        <nav aria-label={`${eyebrow} sections`}>
          {links.map(({ href, label }) => <Link key={href} href={href}>{label} <span aria-hidden="true">↓</span></Link>)}
        </nav>
        <p className={styles.impression}>Artist’s impression</p>
      </div>
    </section>
  );
}
