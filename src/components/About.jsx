import { motion } from 'framer-motion';
import { useState } from 'react';
import { Award, HandHeart, Shield, Target } from 'lucide-react';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const values = [
  {
    title: 'Ethics & Moral',
    icon: <Shield className="h-5 w-5" />,
    details: [
      'We uphold strong ethical standards in every engagement, from procurement and vendor selection to installation and long-term service delivery.',
      'Our team commits to fair dealing, respect for local communities, and transparent decision-making, even when projects involve difficult trade-offs.',
      'This value ensures that clients, partners, and communities can trust not only what we deliver, but how we deliver it.'
    ]
  },
  {
    title: 'Honesty',
    icon: <HandHeart className="h-5 w-5" />,
    details: [
      'We communicate clearly about costs, timelines, technical limits, and expected outcomes before a project starts and throughout delivery.',
      'When constraints arise, we explain them early and provide practical alternatives rather than hiding risks or overpromising.',
      'Honesty builds long-term relationships and helps clients make informed energy decisions with confidence.'
    ]
  },
  {
    title: 'Quality & Safety',
    icon: <Award className="h-5 w-5" />,
    details: [
      'We design and install systems to high technical standards, using reliable components and disciplined engineering practices.',
      'Safety is integrated into planning, site work, commissioning, and maintenance through proper protection, grounding, and operational checks.',
      'Our goal is dependable system performance that protects people, property, and investment value over the full project lifecycle.'
    ]
  },
  {
    title: 'Responsibility',
    icon: <Target className="h-5 w-5" />,
    details: [
      'We take ownership of project outcomes, timelines, and service commitments from concept through post-installation support.',
      'Responsibility means proactive follow-through, measurable accountability, and timely action when maintenance or adjustments are needed.',
      'We are accountable to clients, teammates, and communities for delivering sustainable energy solutions that work in real conditions.'
    ]
  },
  {
    title: 'Humanity',
    icon: <HandHeart className="h-5 w-5" />,
    details: [
      'We put people at the center of our work by designing energy solutions that improve daily life, productivity, and community resilience.',
      'Our projects are delivered with empathy, respect, and an understanding of local realities across homes, schools, clinics, and businesses.',
      'Humanity drives us to create impact beyond infrastructure by empowering people with safer, cleaner, and more reliable power.'
    ]
  },
  {
    title: 'Excellence',
    icon: <Award className="h-5 w-5" />,
    details: [
      'We pursue excellence through continuous improvement in design quality, execution discipline, and service responsiveness.',
      'Our teams refine methods, upgrade skills, and apply lessons learned to exceed baseline expectations on each project.',
      'Excellence means delivering consistent results that clients can rely on today while preparing systems for tomorrow’s energy needs.'
    ]
  }
];

export default function About() {
  const [openValue, setOpenValue] = useState(null);

  return (
    <section className="relative overflow-hidden" id="about">
      <Container className="py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About Enersource"
              title="EnerSource Inc. is a Liberian-owned and operated Engineering Company."
              subtitle="Founded in 2021 by Alfred V. Morris, Jr. and Jonetta Bijoux Morris, Enersource Inc. provides clean, abundant, low-cost, distributed, and renewable energy alongside security and technology services to clients, communities, and our nation Liberia."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Full-service solar installer',
                  text: 'We own the entire project lifecycle: from client acquisition and custom system design, through installation and commissioning, to long-term maintenance.'
                },
                {
                  title: 'Grid-Tie & Off-Grid',
                  text: 'We offer both Grid-Tie and Off-Grid configurations for a wide range of use cases and sites.'
                },
                {
                  title: '1kW to 10MW',
                  text: 'Our experienced professional technicians can engineer and deploy solar systems ranging from 1 kilowatt (1kW) to ten megawatts (10MW).'
                },
                {
                  title: 'Nationwide impact',
                  text: 'We serve NGOs, health facilities, government institutions, commercial businesses, factories, schools, universities, churches, and banking institutions across Montserrado and multiple counties throughout Liberia.'
                }
              ].map((b, idx) => (
                <motion.div
                  key={b.title}
                  className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
                >
                  <div className="font-heading text-sm font-extrabold text-primary">
                    {b.title}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="grid gap-6">
                <div className="grid gap-3 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm">
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/75">
                    Vision
                  </div>
                  <div className="text-lg font-extrabold text-primary">
                    To provide the most compelling value in the solar energy industry — designing and
                    installing the highest quality solar energy systems, on time, safely, with high
                    customer satisfaction, at the lowest possible cost. We are fully committed to
                    innovation and the growth of renewable energy in Liberia and across our nation.
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm">
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/75">
                    Mission
                  </div>
                  <ul className="grid gap-2 text-sm font-semibold text-slate-700">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                      Advancing the renewable energy industry by serving our clients and creating measurable value for them.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                      Driving the large-scale utilization of renewable energy and photovoltaic systems with entrepreneurial commitment, investing our own resources and sharing knowledge with local installers.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                      Providing unparalleled value that accelerates the adoption of solar energy systems, delivering clean, abundant, low-cost, and distributed energy to customers, communities, and our nation.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/75">
                    Core values
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {values.map((v, idx) => (
                      <motion.article
                        key={v.title}
                        className="group rounded-2xl border border-primary/15 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 + idx * 0.04 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotateY: openValue === v.title ? 180 : 0 }}
                          transition={{ duration: 0.45, ease: 'easeInOut' }}
                          className="relative min-h-[170px] [transform-style:preserve-3d]"
                        >
                          <div className="absolute inset-0 [backface-visibility:hidden]">
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-gold ring-1 ring-white/20">
                                {v.icon}
                              </div>
                              <div className="font-heading text-sm font-extrabold text-primary">
                                {v.title}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenValue((current) => (current === v.title ? null : v.title))
                              }
                              aria-expanded={openValue === v.title}
                              aria-controls={`core-value-${idx}`}
                              className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-gold"
                            >
                              Read details <span aria-hidden="true">→</span>
                            </button>
                          </div>

                          <div
                            id={`core-value-${idx}`}
                            className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-gold ring-1 ring-white/20">
                                {v.icon}
                              </div>
                              <div className="font-heading text-sm font-extrabold text-primary">
                                {v.title}
                              </div>
                            </div>
                            <div className="mt-3 max-h-28 space-y-2 overflow-y-auto pr-2">
                              {v.details.map((line) => (
                                <p key={line} className="text-sm font-semibold leading-relaxed text-slate-700">
                                  {line}
                                </p>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setOpenValue(null)}
                              aria-controls={`core-value-${idx}`}
                              className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-gold"
                            >
                              Flip back <span aria-hidden="true">↺</span>
                            </button>
                          </div>
                        </motion.div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

