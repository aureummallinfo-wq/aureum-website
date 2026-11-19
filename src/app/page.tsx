import { Hero } from '@/components/Hero';
import { AureumRouteAnimation } from '@/features/trust-location/components/AureumRouteAnimation';
import { WordPressHomeExperience } from '@/features/wordpress-conversion/components/WordPressHomeExperience';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AureumRouteAnimation />
      <WordPressHomeExperience />
    </>
  );
}
