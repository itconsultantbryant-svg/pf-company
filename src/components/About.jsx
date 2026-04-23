import { motion } from 'framer-motion';
import { Award, HandHeart, Shield, Target } from 'lucide-react';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const values = [
  { title: 'Ethics & Moral', icon: <Shield className="h-5 w-5" /> },
  { title: 'Honesty', icon: <HandHeart className="h-5 w-5" /> },
  { title: 'Quality & Safety', icon: <Award className="h-5 w-5" /> },
  { title: 'Responsibility', icon: <Target className="h-5 w-5" /> },
  { title: 'Humanity', icon: <HandHeart className="h-5 w-5" /> },
  { title: 'Excellence', icon: <Award className="h-5 w-5" /> }
];

export default function About() {
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
                      <motion.div
                        key={v.title}
                        className="group flex items-center gap-3 rounded-2xl border border-primary/15 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 + idx * 0.04 }}
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-gold ring-1 ring-white/20">
                          {v.icon}
                        </div>
                        <div className="font-heading text-sm font-extrabold text-primary">
                          {v.title}
                        </div>
                      </motion.div>
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

