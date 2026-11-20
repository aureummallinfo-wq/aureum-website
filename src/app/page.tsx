import { Hero } from '@/components/Hero';
import { AureumRouteAnimation } from '@/features/trust-location/components/AureumRouteAnimation';
import { WordPressHomeExperience } from '@/features/wordpress-conversion/components/WordPressHomeExperience';
import { PageSchemas } from '@/features/content-seo/components/PageSchemas';
import { HOME_FAQS } from '@/features/content-seo/faqs';

export default function HomePage() {
  return (
    <>
      <PageSchemas route="/" faqs={HOME_FAQS} />
      <Hero />
      <AureumRouteAnimation />
      <WordPressHomeExperience />
    </>
  );
}
