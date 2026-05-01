import { motion } from 'framer-motion';
import { ArrowRight, BatteryCharging, Factory, Home, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const solutionBlocks = [
  {
    title: 'Residential PV Systems',
    subtitle: '3kW - 20kW',
    points: ['On-grid and hybrid-ready', 'Battery integration support', 'Monitoring and support']
  },
  {
    title: 'Commercial PV Systems',
    subtitle: '100kW - 10MW',
    points: ['Scalable plant architecture', 'Peak demand reduction', 'Operational uptime focus']
  },
  {
    title: 'Energy Storage Systems',
    subtitle: '5kWh - 2MWh',
    points: ['LFP-based storage options', 'Load shifting and backup', 'Safety-first integration']
  }
];

const productCategories = [
  {
    icon: <BatteryCharging className="h-5 w-5" />,
    title: 'Battery ESS',
    text: 'Lithium storage systems for homes, businesses, and critical operations.'
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: 'Inverters & Hybrid Controls',
    text: 'Grid-tie and hybrid inverter platforms tailored to real load profiles.'
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: 'Complete Solar Packages',
    text: 'Panels, BOS, protection, and commissioning delivered as one reliable system.'
  }
];

const valueProps = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quality & compliance',
    text: 'High-standard engineering, safety processes, and robust commissioning.'
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: 'Technical support',
    text: 'Maintenance planning, troubleshooting, and long-term performance optimization.'
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'End-to-end delivery',
    text: 'From design and sourcing to deployment and after-sales support.'
  }
];

const kpis = [
  { label: 'Delivery range', value: '1kW - 10MW' },
  { label: 'Storage options', value: '5kWh - 2MWh' },
  { label: 'Support model', value: 'Design to SLA' },
  { label: 'Deployment focus', value: 'Liberia-wide' }
];

const caseTeasers = [
  {
    title: 'Healthcare backup resilience',
    text: 'Hybrid solar + storage architecture for mission-critical clinical loads and reduced diesel runtime.'
  },
  {
    title: 'Commercial cost stabilization',
    text: 'Peak shaving and daytime load offset strategies to control operating energy costs.'
  },
  {
    title: 'Institutional power continuity',
    text: 'Modular PV and battery upgrades for schools, campuses, and administrative facilities.'
  }
];

export default function HomeCommercialShowcase() {
  return (
    <section className="relative border-y border-primary/10 bg-white">
      <Container className="py-24">
        <div className="space-y-16">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-primary/15 bg-white p-2 shadow-sm">
            {[
              ['Solutions', '#solutions'],
              ['Product Categories', '#product-categories'],
              ['Why Enersource', '#why-enersource']
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-xl border border-primary/15 px-4 py-2 text-sm font-extrabold text-primary transition hover:bg-primary/10"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <SectionHeading
              eyebrow="Energy Solutions"
              title="Commercial-focused solar solutions, built for Liberia."
              subtitle="A solution-led home experience inspired by modern solar B2B platforms and adapted to Enersource's delivery model."
            />
            <div className="rounded-3xl border border-primary/15 bg-primary p-6 shadow-lg shadow-primary/20">
              <h3 className="font-heading text-lg font-extrabold text-white">
                Explore product categories
              </h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-white/90">
                Browse batteries, inverters, and complete solar packages with technical guidance and
                support from the Enersource team.
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/20"
              >
                View products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-3xl border border-primary/15 bg-primary p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white">
                <div className="text-xs font-extrabold uppercase tracking-wider text-white/80">
                  {item.label}
                </div>
                <div className="mt-2 font-heading text-xl font-extrabold">{item.value}</div>
              </div>
            ))}
          </div>

          <div id="solutions" className="grid gap-4 scroll-mt-24 lg:grid-cols-3">
            {solutionBlocks.map((block, idx) => (
              <motion.article
                key={block.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.04 }}
                className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm"
              >
                <div className="text-xs font-extrabold uppercase tracking-wider text-primary/70">
                  {block.subtitle}
                </div>
                <h3 className="mt-2 font-heading text-xl font-extrabold text-primary">{block.title}</h3>
                <ul className="mt-4 grid gap-2">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm font-semibold text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div id="product-categories" className="grid gap-4 scroll-mt-24 lg:grid-cols-3">
            {productCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.04 }}
                className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {cat.icon}
                </div>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-primary">{cat.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{cat.text}</p>
              </motion.div>
            ))}
          </div>

          <div
            id="why-enersource"
            className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm scroll-mt-24 lg:p-8"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {valueProps.map((item) => (
                <div key={item.title} className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="mt-3 font-heading text-base font-extrabold text-primary">{item.title}</h4>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-primary">
                  Deployment highlights
                </h3>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-slate-700">
                  Sample project patterns showing how Enersource structures solutions for reliability,
                  scalability, and long-term support.
                </p>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-primary px-4 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110"
              >
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {caseTeasers.map((item) => (
                <div key={item.title} className="rounded-2xl border border-primary/15 bg-white p-5">
                  <h4 className="font-heading text-base font-extrabold text-primary">{item.title}</h4>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
