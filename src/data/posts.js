export const posts = [
  {
    slug: 'solar-basics-liberia',
    title: 'Solar Basics in Liberia: What to Know Before You Buy',
    date: '2026-04-01',
    readingMinutes: 4,
    tags: ['Solar', 'Guides'],
    excerpt:
      'A quick, practical guide to system types, sizing, and what makes a quality installation—written for Liberian homes and businesses.',
    content: [
      'Solar works best when it’s sized to your real load. The first step is understanding your monthly energy use (kWh) and the appliances you want to power.',
      'In Liberia, many customers choose hybrid systems for reliability—solar + batteries with grid support when available. Grid-tie is great where grid uptime is strong, and off-grid is ideal for remote sites with no grid connection.',
      'A quality build is more than panels: cable sizing, protection devices, earthing, mounting, and commissioning matter for safety and longevity.',
      'If you want an accurate quote, we recommend a site assessment and a load list. Enersource can handle the full lifecycle from design to maintenance.'
    ]
  },
  {
    slug: 'maintenance-plan',
    title: 'Preventive Maintenance: Keep Your Solar Performing Year-Round',
    date: '2026-03-18',
    readingMinutes: 3,
    tags: ['Maintenance', 'Performance'],
    excerpt:
      'Learn what’s included in a solid maintenance plan and how small checks prevent big downtime.',
    content: [
      'Preventive maintenance improves uptime and extends component life. A standard plan includes inspections, cleaning, thermal checks (where applicable), and performance reviews.',
      'We also validate protection settings, check connections, update firmware, and review monitoring data for anomalies.',
      'The result: fewer unexpected failures and clearer visibility into system health.'
    ]
  },
  {
    slug: 'commercial-solar-roi',
    title: 'Commercial Solar ROI: Reducing Operating Costs with Clean Energy',
    date: '2026-02-28',
    readingMinutes: 5,
    tags: ['Commercial', 'ROI'],
    excerpt:
      'How businesses can reduce generator spend and stabilize power costs with the right solar + storage strategy.',
    content: [
      'For commercial sites, the biggest ROI drivers are load profile, generator usage, and peak demand.',
      'Hybrid systems can offset fuel costs by running daytime loads on solar and using batteries to reduce generator runtime.',
      'Accurate ROI modeling requires a load study and a design that matches operational constraints and uptime requirements.'
    ]
  }
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

