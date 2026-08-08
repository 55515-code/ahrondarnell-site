import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BRAND, SITE } from '../site.config';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const updates = await getCollection('updates', ({ data }) => !data.draft);

  const blogItems = posts.map((p) => ({
    title: p.data.title,
    description: p.data.description,
    pubDate: p.data.pubDate,
    link: `/blog/${p.id.replace(/\.md$/, '')}`,
  }));

  const updateItems = updates.map((u) => ({
    title: u.data.title,
    description: u.data.description,
    pubDate: u.data.pubDate,
    link: `/updates/`,
  }));

  const staticItems = [
    {
      title: 'Services — SOC 2, HIPAA, PCI DSS, Secure AI',
      pubDate: new Date('2026-08-07'),
      description:
        'Compliance and security services for small businesses: SOC 2 readiness, practical HIPAA safeguards, PCI DSS made simple, and secure AI adoption.',
      link: '/services/',
    },
    {
      title: 'Security & trust — honest posture, privacy-first',
      pubDate: new Date('2026-08-07'),
      description:
        'How this site is secured: security headers, no cookies, no trackers, and an honest compliance posture.',
      link: '/security/',
    },
  ];

  const items = [...blogItems, ...updateItems, ...staticItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );

  return rss({
    title: `${BRAND.name} — ${SITE.name}`,
    description: SITE.description,
    site: context.site,
    items: items.map((item) => ({
      ...item,
      link: new URL(item.link, context.site).toString(),
    })),
    customData: `<language>en-us</language>`,
  });
}
