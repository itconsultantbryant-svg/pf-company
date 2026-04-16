import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Hospital, Landmark, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const projects = [
  {
    title: 'JFK Medical Center',
    icon: <Hospital className="h-5 w-5" />,
    year: '2024',
    location: 'Monrovia, Liberia',
    capacity: '250 kW (est.)',
    value: 'Confidential',
    summary: 'Critical-facility solar deployment designed for resilience and uptime.',
    highlights: ['Safety-first commissioning', 'Documentation + handover', 'Maintenance plan']
  },
  {
    title: 'Bloom Bank Solarization',
    icon: <Building2 className="h-5 w-5" />,
    year: '2023',
    location: 'Liberia',
    capacity: '120 kW (est.)',
    value: 'Confidential',
    summary: 'Commercial solar integration focused on efficiency, monitoring, and uptime.',
    highlights: ['Hybrid-ready design', 'Performance monitoring', 'Preventive maintenance']
  },
  {
    title: 'ECOWAS Installations',
    icon: <Landmark className="h-5 w-5" />,
    year: '2022–2025',
    location: 'Liberia',
    capacity: 'Multi-site (1–50 kW)',
    value: 'Confidential',
    summary: 'A set of institutional deployments delivered across multiple sites.',
    highlights: ['Site assessments', 'Standardized components', 'Training + support']
  }
];

export default function Projects() {
  return (
    <section className="relative overflow-hidden">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Projects & milestones"
              title="Proof through delivery."
              subtitle="A snapshot of deployments and milestones that demonstrate capability, safety, and results."
            />
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-950"
            >
              View projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-white/15 sm:block lg:left-1/2"
            />

            <div className="grid gap-6">
              {projects.map((p, idx) => {
                const isRight = idx % 2 === 1;
                return (
                  <motion.article
                    key={p.title}
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
                  >
                    <div className="grid gap-4 lg:grid-cols-2 lg:gap-10">
                      <div className={isRight ? 'hidden lg:block' : ''} />

                      <div
                        className={[
                          'relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5',
                          isRight ? 'lg:col-start-2' : 'lg:col-start-1'
                        ].join(' ')}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_60%_at_20%_20%,rgba(11,60,93,0.16),transparent_60%),radial-gradient(60%_60%_at_80%_20%,rgba(253,184,19,0.18),transparent_60%)]"
                        />

                        <div className="relative">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-secondary dark:text-primary">
                                {p.icon}
                              </div>
                              <div>
                                <h3 className="font-heading text-lg font-extrabold text-slate-950 dark:text-white">
                                  {p.title}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                                    {p.location}
                                  </span>
                                  <span className="inline-flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
                                    {p.capacity}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-extrabold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                              {p.year}
                            </div>
                          </div>

                          <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                            {p.summary}
                          </p>

                          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/40">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Project value
                              </dt>
                              <dd className="mt-1 text-sm font-extrabold text-slate-950 dark:text-white">
                                {p.value}
                              </dd>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/40">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Highlights
                              </dt>
                              <dd className="mt-1">
                                <ul className="grid gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  {p.highlights.map((h) => (
                                    <li key={h} className="flex gap-2">
                                      <span
                                        className="mt-2 h-1.5 w-1.5 rounded-full bg-primary"
                                        aria-hidden="true"
                                      />
                                      {h}
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-8 hidden -translate-x-1/2 sm:block lg:left-1/2"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

