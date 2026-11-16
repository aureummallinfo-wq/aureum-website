import { Hero } from '@/components/Hero';
import { JourneyToAureum } from '@/features/homepage-showroom/components/JourneyToAureum';
import { WordPressHomeExperience } from '@/features/wordpress-conversion/components/WordPressHomeExperience';

export default function HomePage() {
  return <><Hero /><JourneyToAureum /><WordPressHomeExperience /></>;
}
