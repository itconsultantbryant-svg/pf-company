import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Hospital, Landmark, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const projects = [
  {
    title: 'John F. Kennedy Medical Center (JFKMC)',
    icon: <Hospital className="h-5 w-5" />,
    year: 'January 2025 – January 2026 (Active)',
    location: '21st Street Sinkor, Tubman Boulevard, Monrovia, Liberia',
    capacity: '219.1kWp Solar PV | 595kWh Battery Storage (9 critical units)',
    value: 'USD $388,045',
    summary:
      'Solar Standalone System for 9 Critical Units at JFKMC (operating theaters, ICU, maternity wards, emergency units).',
    highlights: ['Final Phase — Battery Bank Installation', 'Testing, Commissioning & Staff Training']
  },
  {
    title: 'Bloom Bank Africa Liberia Limited',
    icon: <Building2 className="h-5 w-5" />,
    year: 'March 2025 – September (6 Months)',
    location: 'Ashmun Street, Clara Town, Buchanan City, Redlight, and 5th Street Sinkor',
    capacity: '202.8kWp Solar PV | 445kWh Battery Storage (16kW–100kW per location)',
    value: 'USD $316,110.60',
    summary: 'Installation of Hybrid Solar Energy System at Five Bloom Bank Branches.',
    highlights: ['Successfully Completed Ahead of Schedule (4.5 Months)']
  },
  {
    title: 'USAID GHSC-PSM / ECOWAS Commission',
    icon: <Landmark className="h-5 w-5" />,
    year: 'September 2023 – February 2024 (6 Months)',
    location:
      'Grand Gedeh, Bomi, Grand Bassa, Grand Cape Mount, Rivercess, River Gee, Nimba, Gbarpolu, Margibi, Montserrado, and Lofa Counties',
    capacity: '136kWp Solar PV | 255kWh Battery Storage (17 stations × 5kW systems)',
    value: 'USD $198,000',
    summary: 'Installation of 5kW Solar Hybrid Systems at 17 Community Radio Stations.',
    highlights: ['Successfully Completed — Currently Under Preventive Maintenance Contract']
  }
];

export default function Projects() {
  return (
    <section className="relative overflow-hidden" id="projects">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Projects & milestones"
              title="Client references (verified)."
              subtitle="Representative references from recent projects, reflecting execution standards and institutional relationships."
            />
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-400/70 bg-slate-200/80 px-5 py-3 text-sm font-extrabold text-secondary transition-colors hover:bg-slate-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            >
              View projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-red-200 to-transparent sm:block lg:left-1/2 dark:via-red-900/60"
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
                          'relative rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/60 dark:bg-red-950/70',
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
                              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                                {p.icon}
                              </div>
                              <div>
                                <h3 className="font-heading text-lg font-extrabold text-secondary dark:text-slate-100">
                                  {p.title}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
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

                            <div className="shrink-0 rounded-full border border-slate-400/60 bg-slate-200/80 px-3 py-1 text-xs font-extrabold text-slate-800 dark:border-slate-600 dark:bg-slate-700/80 dark:text-slate-200">
                              {p.year}
                            </div>
                          </div>

                          <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                            {p.summary}
                          </p>

                          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/50">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Project value
                              </dt>
                              <dd className="mt-1 text-sm font-extrabold text-secondary dark:text-slate-100">
                                {p.value}
                              </dd>
                            </div>
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/50">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Highlights
                              </dt>
                              <dd className="mt-1">
                                <ul className="grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
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
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-slate-400/60 bg-slate-200/80 shadow-sm dark:border-slate-600 dark:bg-slate-800">
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

