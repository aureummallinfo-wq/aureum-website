import { SITE } from '@/lib/site';
import { SOURCE_PAYMENT_TABLES, type SourcePaymentTable } from '@/features/payment-plans/data';
import { JsonLd } from './JsonLd';

function tableOffers(table: SourcePaymentTable) {
  return table.rows.map((row) => ({
    '@type': 'Offer',
    name: `${row.type}${row.unitCategory ? ` (${row.unitCategory})` : ''} — ${row.sizeSqFt.toLocaleString('en-PK')} sq ft`,
    description: `${row.type}${row.unitCategory ? ` ${row.unitCategory}` : ''} of ${row.sizeSqFt.toLocaleString('en-PK')} sq ft at PKR ${row.ratePerSqFt.toLocaleString('en-PK')} per sq ft`,
    price: row.totalPrice,
    priceCurrency: 'PKR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: row.ratePerSqFt,
      priceCurrency: 'PKR',
      unitText: 'sq ft',
    },
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${SITE.url}#organization` },
  }));
}

export function OfferSchema({ tableIds }: { tableIds: readonly string[] }) {
  const tables = SOURCE_PAYMENT_TABLES.filter((t) => tableIds.includes(t.id));
  if (!tables.length) return null;

  const offers = tables.flatMap(tableOffers);

  return (
    <JsonLd
      id="offer-schema"
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Aureum Mall & Residences',
        description: tables.map((t) => t.title).join(', '),
        brand: { '@type': 'Brand', name: 'Aureum' },
        offers: offers,
      }}
    />
  );
}
