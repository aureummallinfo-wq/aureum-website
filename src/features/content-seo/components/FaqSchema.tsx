import { JsonLd } from './JsonLd';

export type FaqItem = { question: string; answer: string };

export function FaqSchema({ items }: { items: readonly FaqItem[] }) {
  if (!items.length) return null;
  return (
    <JsonLd
      id="faq-schema"
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}
