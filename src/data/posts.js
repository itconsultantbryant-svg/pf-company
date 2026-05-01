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
      'Buying solar in Liberia starts with one key question: what do you want to power, and for how long each day? Before you compare equipment brands, build a simple load list that includes your lights, fans, refrigerators, pumps, office devices, and any heavy appliances. This list helps estimate your daily energy demand and prevents overpaying for oversized systems.',
      'Next, choose the system type that matches your location and reliability needs. Grid-tied systems can lower daytime electricity bills where grid uptime is stable. Off-grid systems are designed for sites with no dependable grid access. Hybrid systems are most common for homes and businesses that want strong reliability, combining solar panels, battery storage, and generator or grid backup when needed.',
      'Panel wattage alone does not define quality. A strong installation includes correctly sized cables, reliable breakers and surge protection, proper earthing, weather-ready mounting, and a clean inverter layout. These details improve safety, reduce losses, and help your system perform consistently through heat, humidity, and heavy rains.',
      'Battery strategy is equally important. If your priority is night-time backup, your battery bank must be sized for critical loads and expected outage duration. Good designs separate essential and non-essential circuits so your battery supports what matters most during downtime.',
      'Always request a site assessment before final pricing. Roof orientation, shading from nearby trees, structural condition, and cable routing all affect output and cost. A professional survey plus a clear load profile gives you a realistic quote and a system that meets real-world expectations.',
      'Finally, ask what happens after installation. A reliable provider should offer commissioning tests, user training, monitoring guidance, and a maintenance plan. The goal is not just to install equipment, but to deliver long-term energy confidence for your home or business.'
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
      'Preventive maintenance is the difference between a system that survives and a system that performs. Solar installations in Liberia face dust, humidity, heat cycles, and occasional storms; without routine checks, small issues can reduce output quietly for months before they are noticed.',
      'A strong maintenance plan starts with scheduled visual inspections. Technicians check panel surfaces for dirt build-up, look for cracked seals, inspect mounting hardware, and confirm cable management remains secure. Cleaning schedules are adjusted by site conditions so panels stay efficient without unnecessary maintenance visits.',
      'Electrical checks are equally important. Teams verify breaker and protection device status, inspect terminations for signs of heat stress, and confirm grounding integrity. Where applicable, thermal checks help identify hotspots before they become failures. These steps lower risk and improve system safety.',
      'Performance review should be data-driven. Inverter logs and monitoring trends are compared against expected generation to catch underperformance early. Sudden drops can indicate shading changes, string issues, battery limitations, or inverter faults that should be corrected quickly.',
      'Battery health should never be ignored in hybrid systems. Maintenance includes checking battery temperature behavior, charge-discharge patterns, and backup readiness. Firmware and control settings are reviewed to keep battery operation aligned with your actual load priorities and outage scenarios.',
      'The business value is clear: fewer surprises, better uptime, and lower emergency repair costs. Small routine checks prevent major downtime, protect equipment life, and help your solar investment deliver stable savings all year.'
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
      'For many businesses, the biggest energy cost is not just utility power, it is generator fuel, servicing, and downtime risk. Commercial solar ROI improves fastest when systems are designed around real operating hours, daytime demand peaks, and backup requirements rather than generic panel targets.',
      'The first step is a load profile. Facilities should map when and how energy is consumed: offices, refrigeration, production equipment, pumps, and air conditioning often have different demand windows. This allows engineers to size solar capacity for maximum daytime offset while planning battery support for critical evening and outage periods.',
      'Generator displacement is where major savings happen. A hybrid setup can run high daytime loads directly from solar, then use batteries to reduce unnecessary generator starts and short run cycles. Lower runtime means less fuel use, fewer maintenance intervals, and better generator lifespan.',
      'Battery sizing should match business continuity goals. Not every load needs backup at all times. Separating mission-critical circuits from flexible loads can reduce battery capex while maintaining uptime for the operations that drive revenue. Smart control settings then prioritize solar production and battery dispatch for financial efficiency.',
      'A good ROI model includes more than hardware cost. It should account for fuel inflation, generator maintenance, replacement cycles, and estimated production losses during outages. When these factors are included, many businesses find that hybrid solar delivers both short-term operating relief and long-term cost stability.',
      'Implementation quality still matters: commissioning, monitoring, and ongoing optimization determine whether projected ROI is achieved in practice. With proper design and service support, commercial solar becomes a strategic infrastructure investment, not just an equipment purchase.'
    ]
  }
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

