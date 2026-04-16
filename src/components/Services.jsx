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
      'Custom solar system design for off-grid and grid-tie applications, load assessments, and technical specification development.'
  },
  {
    title: 'Supply & Procurement',
    icon: <ShoppingCart className="h-5 w-5" />,
    details:
      'Sourcing of high-quality solar panels, inverters, batteries, and balance-of-system components from certified global manufacturers.'
  },
  {
    title: 'Installation & Commissioning',
    icon: <Hammer className="h-5 w-5" />,
    details:
      'Professional installation of solar PV systems from 1kW to 10MW capacity, including three-phase hybrid systems for critical facilities.'
  },
  {
    title: 'Preventive Maintenance & SLA',
    icon: <Wrench className="h-5 w-5" />,
    details:
      'Scheduled maintenance contracts, system monitoring, fault diagnosis, and performance optimization to ensure maximum uptime.'
  },
  {
    title: 'System Upgrades & Expansion',
    icon: <RefreshCcw className="h-5 w-5" />,
    details:
      'Assessment and upgrade of existing solar installations, battery bank replacements, and capacity expansion projects.'
  },
  {
    title: 'Technical Training',
    icon: <GraduationCap className="h-5 w-5" />,
    details:
      'Training of client technical staff on system operation, basic maintenance, and safety procedures post-commissioning.'
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
              subtitle="End-to-end solar energy solutions tailored to the unique energy needs of each client."
            />
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-slate-400/70 bg-slate-200/80 px-5 py-3 text-sm font-extrabold text-secondary transition-colors hover:bg-slate-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            >
              View all services
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (
              <motion.article
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
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
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                      {s.icon}
                    </div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Enersource
                    </div>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-extrabold text-slate-900 dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                    {s.details}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-secondary">
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

