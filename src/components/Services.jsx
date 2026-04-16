import { motion } from 'framer-motion';
import {
  GraduationCap,
  Hammer,
  PlugZap,
  RefreshCcw,
  ShoppingCart,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const services = [
  {
    title: 'System Design & Engineering',
    icon: <PlugZap className="h-5 w-5" />,
    details:
      'Site assessment, load profiling, PV sizing, electrical design, protection, and documentation.'
  },
  {
    title: 'Supply & Procurement',
    icon: <ShoppingCart className="h-5 w-5" />,
    details:
      'Reliable sourcing of panels, inverters, batteries, BOS components, and accessories with traceability.'
  },
  {
    title: 'Installation & Commissioning',
    icon: <Hammer className="h-5 w-5" />,
    details:
      'Professional installation, testing, commissioning, and handover for grid-tie and off-grid systems.'
  },
  {
    title: 'Preventive Maintenance',
    icon: <Wrench className="h-5 w-5" />,
    details:
      'Routine inspections, performance checks, cleaning, firmware updates, and issue prevention.'
  },
  {
    title: 'System Upgrades',
    icon: <RefreshCcw className="h-5 w-5" />,
    details:
      'Battery expansions, inverter upgrades, monitoring add-ons, and performance optimization.'
  },
  {
    title: 'Technical Training',
    icon: <GraduationCap className="h-5 w-5" />,
    details:
      'Training for operators and technicians to ensure safe operation and long-term reliability.'
  }
];

export default function Services() {
  return (
    <section className="relative" id="services">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Everything you need for a successful solar deployment."
              subtitle="Interactive service cards with clear deliverables — optimized for scanning and conversion."
            />
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-950"
            >
              View all services
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (
              <motion.article
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(70%_60%_at_20%_20%,rgba(253,184,19,0.25),transparent_60%),radial-gradient(70%_60%_at_80%_20%,rgba(0,168,150,0.18),transparent_60%)]"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-secondary dark:text-primary">
                      {s.icon}
                    </div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Enersource
                    </div>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-extrabold text-slate-950 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                    {s.details}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-secondary dark:text-primary">
                    Learn more
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

