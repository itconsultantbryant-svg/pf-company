import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Hospital, Landmark, MapPin, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';
import bloomBank1 from '../assets/bloom_bank-1.jpeg';
import bloomBank2 from '../assets/bloom_bank-2.jpeg';
import bloomBank3 from '../assets/bloom_bank-3.jpeg';
import bloomBank4 from '../assets/bloom_bank-4.jpeg';
import ecowas1 from '../assets/ecowas-1.jpeg';
import ecowas2 from '../assets/ecowas-2.jpeg';
import ecowas3 from '../assets/ecowas-3.jpeg';
import jfk1 from '../assets/jfk-1.jpeg';
import jfk2 from '../assets/jfk-2.jpeg';
import jfk3 from '../assets/jfk-3.jpeg';
import jfk4 from '../assets/jfk-4.jpeg';
import rre1 from '../assets/rre-1.jpeg';
import rre2 from '../assets/rre-2.jpeg';
import rre3 from '../assets/rre-3.jpeg';

function ProjectImageSlider({ images, title, align }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isAlignedRight = align === 'right';

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images, isPaused]);

  const goTo = (index) => setActiveIndex(index);
  const goNext = () => setActiveIndex((current) => (current + 1) % images.length);
  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + images.length) % images.length);

  return (
    <div
      className={[
        'overflow-hidden rounded-3xl border border-primary/15 bg-white p-3 shadow-sm',
        isAlignedRight ? 'lg:col-start-2' : 'lg:col-start-1'
      ].join(' ')}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[16/11]">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${title} site image ${idx + 1}`}
            className={[
              'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700',
              idx === activeIndex ? 'opacity-100' : 'opacity-0'
            ].join(' ')}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute bottom-3 right-3 rounded-full bg-primary/85 px-2.5 py-1 text-[11px] font-extrabold text-white shadow">
          {activeIndex + 1}/{images.length}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:bg-primary hover:text-white"
          aria-label={`Show previous image for ${title}`}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {images.map((image, idx) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Show image ${idx + 1} for ${title}`}
              aria-pressed={idx === activeIndex}
              className={[
                'h-2.5 rounded-full transition-all',
                idx === activeIndex ? 'w-6 bg-primary' : 'w-2.5 bg-primary/25 hover:bg-primary/45'
              ].join(' ')}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:bg-primary hover:text-white"
          aria-label={`Show next image for ${title}`}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

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
    highlights: ['Final Phase — Battery Bank Installation', 'Testing, Commissioning & Staff Training'],
    images: [jfk1, jfk2, jfk3, jfk4]
  },
  {
    title: 'Bloom Bank Africa Liberia Limited',
    icon: <Building2 className="h-5 w-5" />,
    year: 'March 2025 – September (6 Months)',
    location: 'Ashmun Street, Clara Town, Buchanan City, Redlight, and 5th Street Sinkor',
    capacity: '202.8kWp Solar PV | 445kWh Battery Storage (16kW–100kW per location)',
    value: 'USD $316,110.60',
    summary: 'Installation of Hybrid Solar Energy System at Five Bloom Bank Branches.',
    highlights: ['Successfully Completed Ahead of Schedule (4.5 Months)'],
    images: [bloomBank1, bloomBank2, bloomBank3, bloomBank4]
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
    highlights: ['Successfully Completed — Currently Under Preventive Maintenance Contract'],
    images: [ecowas1, ecowas2, ecowas3, rre1, rre2, rre3]
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
                      <ProjectImageSlider images={p.images} title={p.title} align="left" />

                      <div
                        className={[
                          'relative rounded-3xl border border-primary/15 bg-white p-6 shadow-sm',
                          'lg:col-start-2'
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
                                <h3 className="font-heading text-lg font-extrabold text-primary">
                                  {p.title}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
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

                            <div className="shrink-0 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-extrabold text-primary">
                              {p.year}
                            </div>
                          </div>

                          <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
                            {p.summary}
                          </p>

                          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-primary/15 bg-white p-4 shadow-sm">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-primary/75">
                                Project value
                              </dt>
                              <dd className="mt-1 text-sm font-extrabold text-primary">
                                {p.value}
                              </dd>
                            </div>
                            <div className="rounded-2xl border border-primary/15 bg-white p-4 shadow-sm">
                              <dt className="text-xs font-extrabold uppercase tracking-wider text-primary/75">
                                Highlights
                              </dt>
                              <dd className="mt-1">
                                <ul className="grid gap-1 text-sm font-semibold text-slate-700">
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

