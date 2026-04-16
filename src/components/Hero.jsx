import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import QuoteCalculator from './QuoteCalculator.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden" id="hero">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(253,184,19,0.35),transparent_60%),radial-gradient(60%_50%_at_10%_40%,rgba(0,168,150,0.25),transparent_55%),radial-gradient(60%_50%_at_90%_45%,rgba(11,60,93,0.35),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <Container className="relative py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Clean energy • Sustainability • Innovation
            </motion.p>

            <motion.h1
              className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-5xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            >
              Your Trusted Solar Energy Partner
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
            >
              Clean, affordable, reliable solar solutions across Liberia — delivering clean, abundant,
              low-cost, distributed, and renewable energy to clients, communities, and our nation
              Liberia.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-secondary shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-950"
              >
                Our Services
              </Link>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-3 sm:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } }
              }}
            >
              {[
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: 'High efficiency',
                  text: 'Optimized design for real-world performance.'
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: 'Quality & safety',
                  text: 'Standards-first engineering and installation.'
                },
                {
                  icon: <Leaf className="h-5 w-5" />,
                  title: 'Sustainable',
                  text: 'Lower emissions with better energy choices.'
                }
              ].map((f) => (
                <motion.div
                  key={f.title}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2 text-slate-950 dark:text-white">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-secondary dark:text-primary">
                      {f.icon}
                    </div>
                    <div className="font-heading text-sm font-extrabold">{f.title}</div>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                    {f.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-glow backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(253,184,19,0.30),transparent_60%),radial-gradient(60%_60%_at_80%_30%,rgba(0,168,150,0.18),transparent_60%)]"
              />

              <div className="relative">
                <QuoteCalculator />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

