export const HOMEPAGE_PROPERTY_CHOICES = [
  {
    index: '01',
    eyebrow: 'Live / Residences',
    title: 'Apartments',
    description: 'A calm, considered home shaped around light, connection and everyday ease.',
    href: '/apartments',
  },
  {
    index: '02',
    eyebrow: 'Gather / Retail',
    title: 'Commercial Shops',
    description: 'A visible retail address for brands, makers and the moments people remember.',
    href: '/commercial-shops',
  },
  {
    index: '03',
    eyebrow: 'Work / Offices',
    title: 'Corporate Offices',
    description: 'A confident place to build the next chapter of your business.',
    href: '/corporate-offices',
  },
] as const;

export const PROJECT_SNAPSHOT = [
  {
    label: 'Setting',
    value: 'Bahria Town / Ring Road Interchange, Lahore',
    note: 'The current project location identity.',
  },
  {
    label: 'Format',
    value: 'Mixed-use destination',
    note: 'Residential, retail and office pathways in one experience.',
  },
  {
    label: 'Information standard',
    value: 'Evidence-first',
    note: 'Prices, sizes and approvals appear only after sign-off.',
  },
] as const;

/** The five-stop Airport-to-Aureum story immediately after the homepage hero. Images are approved local
 * WebP renders; the copy is deliberately about orientation and access rather than unverified travel-time promises. */
export const JOURNEY_TO_AUREUM = [
  {
    id: 'airport',
    step: '01',
    label: 'Lahore Airport',
    shortLabel: 'Airport',
    eyebrow: 'Start / Airport Access',
    title: "Begin at Lahore's city gateway.",
    description: 'From International Terminal Access, join Lahore Ring Road and follow the route toward Bahria Town.',
    meta: 'Airport Access · Lahore',
    mapX: 7,
    mapY: 73,
    image: '/assets/aureum/approved/renders/aureum-architecture-context.webp',
    alt: 'Aerial context view of Aureum Mall & Residences within Lahore',
  },
  {
    id: 'dha',
    step: '02',
    label: 'DHA Phase V–VI',
    shortLabel: 'DHA V–VI',
    eyebrow: 'The connection / Western Lahore',
    title: 'The city opens onto the Ring Road.',
    description: 'The airport corridor connects with Lahore’s established western districts before the route turns south.',
    meta: 'DHA Phase V–VI · Lahore',
    mapX: 28,
    mapY: 57,
    image: '/assets/aureum/approved/renders/aureum-exterior-day-view.webp',
    alt: 'Aureum Mall & Residences viewed from the Lahore city context',
  },
  {
    id: 'lake-city',
    step: '03',
    label: 'Lake City / Adda Plot',
    shortLabel: 'Lake City',
    eyebrow: 'The corridor / Southern Lahore',
    title: 'Through the city’s southern growth belt.',
    description: 'Lake City and Adda Plot mark the approach to the Bahria Town side of the Ring Road.',
    meta: 'Lake City / Adda Plot · Lahore',
    mapX: 53,
    mapY: 43,
    image: '/assets/aureum/approved/renders/aureum-exterior-ring-road-interchange.webp',
    alt: 'Aureum Mall & Residences at the Ring Road interchange',
  },
  {
    id: 'sl3',
    step: '04',
    label: 'Bahria Town / SL-3',
    shortLabel: 'SL-3',
    eyebrow: 'The arrival / Bahria Town Interchange',
    title: 'Exit at Aureum’s Ring Road gateway.',
    description: 'At SL-3, the route leaves Lahore Ring Road for the Sector C approach to Aureum.',
    meta: 'SL-3 Bahria Town Interchange · Lahore',
    mapX: 74,
    mapY: 30,
    image: '/assets/aureum/approved/renders/aureum-architecture-aerial.webp',
    alt: 'Aerial view of Aureum Mall & Residences, including the mall, hotel and residences',
  },
  {
    id: 'aureum',
    step: '05',
    label: 'Aureum Mall & Residencies',
    shortLabel: 'Aureum',
    eyebrow: 'The destination / Sector C',
    title: 'One address for what comes next.',
    description: 'Arrive at Aureum Mall & Residencies—then choose the pathway that fits you: mall, food court, offices, hotel or home.',
    meta: 'Sector C / 40 Feet Road · Bahria Town',
    mapX: 93,
    mapY: 17,
    image: '/assets/aureum/approved/renders/aureum-exterior-night-wide.webp',
    alt: 'Aureum Mall & Residencies illuminated at night',
  },
] as const;

export const FEATURED_RESIDENCES = [
  {
    index: '01',
    type: 'Studio',
    title: 'A focused beginning',
    description: 'A compact residential pathway for a life designed with intention.',
    href: '/apartments',
  },
  {
    index: '02',
    type: '1-Bed',
    title: 'Room to settle in',
    description: 'A balanced home experience for everyday living and quiet retreat.',
    href: '/apartments',
  },
  {
    index: '03',
    type: '2-Bed',
    title: 'More space to belong',
    description: 'A considered residential option for a fuller everyday rhythm.',
    href: '/apartments',
  },
] as const;

export const COMMERCIAL_DESTINATIONS = [
  {
    id: 'shops',
    label: 'Shops',
    eyebrow: 'Retail / visibility',
    title: 'A place for the next customer to find you.',
    description: 'Explore the commercial pathway and connect the right unit information once the approved register is loaded.',
    href: '/commercial-shops',
  },
  {
    id: 'food-court',
    label: 'Food Court',
    eyebrow: 'Gather / atmosphere',
    title: 'A shared destination built around moments.',
    description: 'Use this space for the approved food and lifestyle experience once the final project information is confirmed.',
    href: '/commercial-shops',
  },
  {
    id: 'offices',
    label: 'Offices',
    eyebrow: 'Work / presence',
    title: 'A professional address with presence.',
    description: 'Move directly to the office pathway without making business buyers search through residential content.',
    href: '/corporate-offices',
  },
] as const;

export const PAYMENT_STEPS = [
  { label: 'Booking', value: 'Official amount pending approval' },
  { label: 'Confirmation', value: 'Official amount pending approval' },
  { label: 'Installments', value: 'Schedule pending approval' },
  { label: 'Completion', value: 'Terms pending approval' },
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: 'What can I explore at Aureum?',
    answer: 'The website is organized around three clear pathways: apartments, commercial shops and corporate offices.',
  },
  {
    question: 'Where is Aureum located?',
    answer: 'The current site identity places Aureum in Bahria Town at the Ring Road Interchange in Lahore.',
  },
  {
    question: 'Where can I see the official payment plan?',
    answer: 'Use the Payment Plans page. The published schedule will be rendered from the approved source of truth rather than from an image-only upload.',
  },
  {
    question: 'Can I arrange a site visit?',
    answer: 'Use the contact form to request details. The final delivery workflow is intentionally not connected until it is approved.',
  },
] as const;
