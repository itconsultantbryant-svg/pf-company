import { motion } from 'framer-motion';
import { Award, HandHeart, Shield, Target } from 'lucide-react';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const values = [
  { title: 'Ethics', icon: <Shield className="h-5 w-5" /> },
  { title: 'Honesty', icon: <HandHeart className="h-5 w-5" /> },
  { title: 'Quality & Safety', icon: <Award className="h-5 w-5" /> },
  { title: 'Excellence', icon: <Target className="h-5 w-5" /> }
];

export default function About() {
  return (
    <section className="relative overflow-hidden" id="about">
      <Container className="py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About Enersource"
              title="Full-lifecycle solar solutions built for Liberia."
              subtitle="We deliver end-to-end services — planning, engineering, procurement, installation, commissioning, training, and preventive maintenance — for grid-tie and off-grid systems."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Grid-tie & off-grid',
                  text: 'Design options aligned to your load profile and site constraints.'
                },
                {
                  title: 'Engineering-first',
                  text: 'Reliability, safety, and performance baked into every build.'
                },
                {
                  title: 'Procurement you can trust',
                  text: 'Right components, right sizing, transparent documentation.'
                },
                {
                  title: 'Maintenance & upgrades',
                  text: 'Keep systems healthy and future-proof over time.'
                }
              ].map((b, idx) => (
                <motion.div
                  key={b.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
                >
                  <div className="font-heading text-sm font-extrabold text-slate-950 dark:text-white">
                    {b.title}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-glow backdrop-blur dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="grid gap-6">
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950/40">
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Vision
                  </div>
                  <div className="text-lg font-extrabold text-slate-950 dark:text-white">
                    Power a cleaner, more resilient Liberia.
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950/40">
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Mission
                  </div>
                  <ul className="grid gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      Deliver safe, high-performing solar systems from 1kW to utility scale.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      Provide transparent lifecycle support — installation, training, maintenance.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      Build trust through measurable results and long-term partnerships.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Core values
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {values.map((v, idx) => (
                      <motion.div
                        key={v.title}
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 + idx * 0.04 }}
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-secondary dark:text-primary">
                          {v.icon}
                        </div>
                        <div className="font-heading text-sm font-extrabold text-slate-950 dark:text-white">
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

