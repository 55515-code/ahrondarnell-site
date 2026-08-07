// Central site configuration — single source of truth.
// Change the domain here; canonical URLs, sitemap, schema, and feeds all derive from it.

const DEFAULT_URL = 'https://1pointo.com';
const SITE_URL = process.env.SITE_URL || DEFAULT_URL;

export const SITE = {
  // Set SITE_URL env var at build/deploy time to override (e.g. Cloudflare Pages previews)
  url: SITE_URL,
  name: 'Ahron Darnell',
  title: 'Ahron Darnell — Compliance, Security & Platform Operations',
  tagline: 'Making technology calmer, clearer, and more reliable for small businesses.',
  description:
    'Ahron Darnell is an IT, security, and compliance professional with 20+ years of experience across healthcare, banking, MSP, and enterprise environments. SOC 2, PCI DSS, and HIPAA guidance for small businesses — plus the work of digital artist Electrac Angel.',
  locale: 'en_US',
  defaultLocale: 'en',
  buildYear: '2026',
};

export const PERSON = {
  name: 'Ahron Darnell',
  givenName: 'Ahron',
  familyName: 'Darnell',
  jobTitle: 'IT, Security & Compliance Consultant',
  url: SITE_URL,
  sameAs: ['https://www.linkedin.com/in/centralsupport/'],
  image: '/og-image.png',
  alumniOf: [],
  knowsAbout: [
    'SOC 2',
    'PCI DSS',
    'HIPAA',
    'Microsoft 365',
    'Microsoft Entra ID',
    'Intune',
    'AWS',
    'Terraform',
    'Endpoint Security',
    'Identity and Access Management',
    'Compliance Evidence',
  ],
};

export const CONTACT = {
  email: 'hello@1pointo.com', // routed via Cloudflare Email Routing (catch-all -> ahronzombi@gmail.com)
  location: 'Williamsville / Buffalo, NY area',
  locationGeo: { latitude: 42.963, longitude: -78.739 },
  linkedin: 'https://www.linkedin.com/in/centralsupport/',
  hours: 'Mon-Fri, 9am-5pm ET',
  // Form backend endpoint. Empty = form falls back to mailto.
  // Works with Formspree/Basin free tiers or Netlify Forms on any static host.
  formEndpoint: '',
};

export const NAV = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/services', label: 'services' },
  { href: '/security', label: 'security' },
  { href: '/art', label: 'art' },
  { href: '/contact', label: 'contact' },
];

export const SERVICES = [
  {
    slug: 'soc2',
    title: 'SOC 2',
    path: '/services/soc2',
    summary:
      'Type I and Type II readiness, control design, and evidence workflows for service providers.',
  },
  {
    slug: 'hipaa',
    title: 'HIPAA',
    path: '/services/hipaa',
    summary:
      'Practical HIPAA safeguards for small practices — access control, encryption, training, and BAAs.',
  },
  {
    slug: 'pci',
    title: 'PCI DSS',
    path: '/services/pci',
    summary:
      'Know exactly which SAQ applies, minimize cardholder data scope, and stay compliant year after year.',
  },
  {
    slug: 'ai',
    title: 'Secure AI Adoption',
    path: '/services/ai',
    summary:
      'Adopt AI tools safely: clear policies, approved tool lists, and human review requirements.',
  },
];

export const ARTIST = {
  alias: 'Electrac Angel',
  aliases: ['Ahron Darnell', 'ClownBlock', 'Bear Dove'],
  essence: 'Electric, transformative, boundary-pushing digital art.',
};
