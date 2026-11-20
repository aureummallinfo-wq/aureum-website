import { SITE } from '@/lib/site';
import { JsonLd } from './JsonLd';

type Crumb = { name: string; href: string };

const BREADCRUMB_MAP: Record<string, Crumb[]> = {
  '/about': [{ name: 'About', href: '/about' }],
  '/team': [{ name: 'About', href: '/about' }, { name: 'Team', href: '/team' }],
  '/apartments': [{ name: 'Apartments', href: '/apartments' }],
  '/apartments/studio': [{ name: 'Apartments', href: '/apartments' }, { name: 'Studio', href: '/apartments/studio' }],
  '/apartments/1-bed': [{ name: 'Apartments', href: '/apartments' }, { name: '1 Bed', href: '/apartments/1-bed' }],
  '/apartments/2-bed': [{ name: 'Apartments', href: '/apartments' }, { name: '2 Bed', href: '/apartments/2-bed' }],
  '/commercial-shops': [{ name: 'Commercial Shops', href: '/commercial-shops' }],
  '/commercial-shops/ground-floor': [{ name: 'Commercial Shops', href: '/commercial-shops' }, { name: 'Ground Floor', href: '/commercial-shops/ground-floor' }],
  '/commercial-shops/first-floor': [{ name: 'Commercial Shops', href: '/commercial-shops' }, { name: 'First Floor', href: '/commercial-shops/first-floor' }],
  '/food-court': [{ name: 'Commercial Shops', href: '/commercial-shops' }, { name: 'Food Court', href: '/food-court' }],
  '/corporate-offices': [{ name: 'Corporate Offices', href: '/corporate-offices' }],
  '/payment-plans': [{ name: 'Payment Plans', href: '/payment-plans' }],
  '/payment-plans/apartments': [{ name: 'Payment Plans', href: '/payment-plans' }, { name: 'Apartments', href: '/payment-plans/apartments' }],
  '/payment-plans/offices': [{ name: 'Payment Plans', href: '/payment-plans' }, { name: 'Offices', href: '/payment-plans/offices' }],
  '/payment-plans/first-floor-shops': [{ name: 'Payment Plans', href: '/payment-plans' }, { name: 'First Floor Shops', href: '/payment-plans/first-floor-shops' }],
  '/payment-plans/second-floor-shops': [{ name: 'Payment Plans', href: '/payment-plans' }, { name: 'Second Floor Shops', href: '/payment-plans/second-floor-shops' }],
  '/payment-plans/food-court': [{ name: 'Payment Plans', href: '/payment-plans' }, { name: 'Food Court', href: '/payment-plans/food-court' }],
  '/location': [{ name: 'Location', href: '/location' }],
  '/construction-updates': [{ name: 'Construction Updates', href: '/construction-updates' }],
  '/gallery': [{ name: 'Gallery', href: '/gallery' }],
  '/immersive-media': [{ name: 'Project Media', href: '/immersive-media' }],
  '/building-explorer': [{ name: 'Building Explorer', href: '/building-explorer' }],
  '/unit-finder': [{ name: 'Find Your Space', href: '/unit-finder' }],
  '/floor-plans': [{ name: 'Floor Plans', href: '/floor-plans' }],
  '/amenities': [{ name: 'Amenities', href: '/amenities' }],
  '/investment': [{ name: 'Investment', href: '/investment' }],
  '/overseas-buyers': [{ name: 'Overseas Buyers', href: '/overseas-buyers' }],
  '/faq': [{ name: 'FAQ', href: '/faq' }],
  '/news': [{ name: 'News', href: '/news' }],
  '/contact': [{ name: 'Contact', href: '/contact' }],
  '/book-site-visit': [{ name: 'Contact', href: '/contact' }, { name: 'Book a Site Visit', href: '/book-site-visit' }],
  '/partners': [{ name: 'Partners', href: '/partners' }],
  '/privacy-policy': [{ name: 'Privacy Policy', href: '/privacy-policy' }],
  '/terms': [{ name: 'Terms', href: '/terms' }],
};

export function BreadcrumbSchema({ route }: { route: string }) {
  const trail = BREADCRUMB_MAP[route];
  if (!trail) return null;

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    ...trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: crumb.name,
      item: `${SITE.url}${crumb.href}`,
    })),
  ];

  return (
    <JsonLd
      id="breadcrumb-schema"
      data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }}
    />
  );
}
