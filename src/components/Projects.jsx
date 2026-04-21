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
      <Container className="py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Projects & milestones"
              title="Client references (verified)."
              subtitle="Representative references from recent projects, reflecting execution standards and institutional relationships."
            />
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/35 to-transparent sm:block lg:left-1/2"
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
                          'relative rounded-3xl border border-white/20 bg-primary p-6 shadow-lg shadow-primary/25',
                          isRight ? 'lg:col-start-2' : 'lg:col-start-1'
                        ].join(' ')}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_60%_at_20%_20%,rgba(255,255,255,0.1),transparent_60%),radial-gradient(60%_60%_at_80%_20%,rgba(253,184,19,0.12),transparent_60%)]"
                        />

                        <div className="relative">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-gold ring-1 ring-white/20">
                                {p.icon}
                              </div>
                              <div>
                                <h3 className="font-heading text-lg font-extrabold text-white">
                                  {p.title}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/90">
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                                    {p.location}
                                  </span>
                                  <span className="inline-flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
                                    {p.capacity}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 rounded-full border border-white/30 bg-primary px-3 py-1 text-xs font-extrabold text-white">
                              {p.year}
                            </div>
                          </div>

                          <p className="mt-4 text-sm font-semibold leading-relaxed text-white/90">
                            {p.summary}
                          </p>

                          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/20 bg-primary p-4 shadow-sm shadow-black/10">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-white/75">
                                Project value
                              </dt>
                              <dd className="mt-1 text-sm font-extrabold text-white">
                                {p.value}
                              </dd>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-primary p-4 shadow-sm shadow-black/10">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-white/75">
                                Highlights
                              </dt>
                              <dd className="mt-1">
                                <ul className="grid gap-1 text-sm font-semibold text-white/90">
                                  {p.highlights.map((h) => (
                                    <li key={h} className="flex gap-2">
                                      <span
                                        className="mt-2 h-1.5 w-1.5 rounded-full bg-gold"
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
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-primary shadow-md shadow-primary/30">
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
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

