/**
 * Central knowledge for the Enersource site assistant, products page, and PDF line items.
 * Indicative prices are estimates only; final pricing follows site survey and Enersource review.
 */

export const COMPANY = {
  name: 'EnerSource Inc. (Enersource)',
  legal: 'EnerSource Inc. is a Liberian-owned and operated engineering company.',
  founded: '2021',
  founders: 'Alfred V. Morris, Jr. and Jonetta Bijoux Morris',
  mission:
    'Clean, abundant, low-cost, distributed, and renewable energy alongside security and technology services for clients, communities, and Liberia.',
  address:
    'Adjacent City Shawarma, Rehab Juntion, Paynesville City, Monrovia, Liberia',
  email: 'info@enersourcelr.com',
  phones: ['+231-773-227-668', '+231-881-126-464'],
  whatsapp: '+231-881-126-464',
  social: {
    facebook: '@enersource',
    instagram: '@enersourcelr'
  },
  deliveryRange: 'Solar PV systems from 1 kW to 10 MW; grid-tie and off-grid configurations.',
  audiences:
    'NGOs, health facilities, government, commercial businesses, factories, schools, universities, churches, banking institutions — Montserrado and counties nationwide.',
  values: [
    'Ethics & moral — fair procurement, transparent delivery, respect for communities.',
    'Honesty — clear costs, timelines, and technical limits.',
    'Quality & safety — reliable components, disciplined engineering, safe commissioning.',
    'Responsibility — ownership from concept through maintenance.',
    'Humanity — solutions that improve daily life and resilience.',
    'Excellence — continuous improvement in design and service.'
  ]
};

/**
 * Solution packages (home “Energy Solutions” blocks + scalable offerings).
 */
export const PACKAGES = [
  {
    id: 'pkg-residential-pv',
    name: 'Residential PV Systems',
    subtitle: '3kW – 20kW',
    description:
      'Residential-scale solar for homes: on-grid and hybrid-ready with optional battery integration, monitoring, and support.',
    highlights: ['On-grid and hybrid-ready', 'Battery integration support', 'Monitoring and support'],
    indicativeUnitPrice: 8500,
    pricingNote: 'Indicative starting range for a typical hybrid-ready residential bundle; final price depends on roof, loads, and components.'
  },
  {
    id: 'pkg-commercial-pv',
    name: 'Commercial PV Systems',
    subtitle: '100kW – 10MW',
    description:
      'Commercial and industrial solar plants with scalable architecture, peak demand reduction, and uptime-focused delivery.',
    highlights: ['Scalable plant architecture', 'Peak demand reduction', 'Operational uptime focus'],
    indicativeUnitPrice: 95000,
    pricingNote: 'Indicative entry scale for mid commercial; large plants quoted per MW and site constraints.'
  },
  {
    id: 'pkg-energy-storage',
    name: 'Energy Storage Systems',
    subtitle: '5kWh – 2MWh',
    description:
      'LFP-based energy storage for load shifting, backup, and hybrid operation with safety-first integration.',
    highlights: ['LFP-based storage options', 'Load shifting and backup', 'Safety-first integration'],
    indicativeUnitPrice: 12000,
    pricingNote: 'Indicative per-project storage block; capacity and inverter pairing determine final pricing.'
  },
  {
    id: 'pkg-complete-solar',
    name: 'Complete Solar Package',
    subtitle: 'Panels + BOS + commissioning',
    description:
      'Full delivery: modules, balance-of-system, protection, and commissioning as one coordinated system.',
    highlights: ['Single accountable delivery', 'Engineering-to-commissioning', 'After-sales alignment'],
    indicativeUnitPrice: 15000,
    pricingNote: 'Bundle pricing varies strongly by kW size and site; treat as a planning estimate only.'
  }
];

export const SERVICES_CATALOG = [
  {
    id: 'svc-design',
    title: 'System Design & Engineering',
    details:
      'Custom solar system design for off-grid and grid-tie applications, load assessments, and technical specification development.',
    indicativeUnitPrice: 2500
  },
  {
    id: 'svc-supply',
    title: 'Supply & Procurement',
    details:
      'Sourcing of solar panels, inverters, batteries, and balance-of-system components from certified manufacturers.',
    indicativeUnitPrice: 1800
  },
  {
    id: 'svc-install',
    title: 'Installation & Commissioning',
    details:
      'Professional installation from 1kW to 10MW, including three-phase hybrid systems for critical facilities.',
    indicativeUnitPrice: 3500
  },
  {
    id: 'svc-maintenance',
    title: 'Preventive Maintenance & SLA',
    details:
      'Scheduled maintenance, monitoring, fault diagnosis, and performance optimization for maximum uptime.',
    indicativeUnitPrice: 1200
  },
  {
    id: 'svc-upgrade',
    title: 'System Upgrades & Expansion',
    details:
      'Assessment and upgrade of existing installations, battery replacements, and capacity expansion.',
    indicativeUnitPrice: 2200
  },
  {
    id: 'svc-training',
    title: 'Technical Training',
    details:
      'Training for client staff on operation, basic maintenance, and safety after commissioning.',
    indicativeUnitPrice: 900
  }
];

export function findPackageById(id) {
  return PACKAGES.find((x) => x.id === id) ?? null;
}

export function findServiceById(id) {
  return SERVICES_CATALOG.find((x) => x.id === id) ?? null;
}
