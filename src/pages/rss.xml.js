import rss from '@astrojs/rss';
import { SITE } from '../site.config';

const items = [
  {
    title: 'Services — SOC 2, HIPAA, PCI DSS, Secure AI',
    pubDate: new Date('2026-08-07'),
    description:
      'Compliance and security services for small businesses: SOC 2 readiness, practical HIPAA safeguards, PCI DSS made simple, and secure AI adoption.',
    link: '/services/',
  },
  {
    title: 'About — 20+ years making technology calmer',
    pubDate: new Date('2026-08-07'),
    description:
      'Background and experience across healthcare, banking, MSP, and enterprise environments, plus certifications and skills.',
    link: '/about/',
  },
  {
    title: 'Security & trust — honest posture, privacy-first',
    pubDate: new Date('2026-08-07'),
    description:
      'How this site is secured: security headers, no cookies, no trackers, and an honest compliance posture.',
    link: '/security/',
  },
];

export function GET(context) {
  return rss({
    title: `${SITE.name} — Updates`,
    description: SITE.description,
    site: context.site,
    items: items.map((item) => ({
      ...item,
      link: new URL(item.link, context.site).toString(),
    })),
    customData: `<language>en-us</language>`,
  });
}
