import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';

export default function CTA() {
  return (
    <section className="relative overflow-hidden" id="cta">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,rgba(253,184,19,0.22),transparent_60%),radial-gradient(60%_50%_at_15%_45%,rgba(0,168,150,0.14),transparent_60%)] dark:opacity-70"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-slate-300/20 dark:bg-slate-950/40" />
      <Container className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-3xl border border-slate-400/50 bg-slate-100/95 p-10 shadow-glow backdrop-blur dark:border-slate-600 dark:bg-slate-800/90"
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <div className="font-heading text-3xl font-extrabold tracking-tight text-secondary dark:text-slate-100 sm:text-4xl">
                Power Your Future with Solar Energy
              </div>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                Start with a quick conversation. We’ll help you scope the right system and plan the
                path from quote to commissioning.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)] transition-transform hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]"
              >
                Request Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-400/70 bg-slate-200/80 px-6 py-3 text-sm font-extrabold text-secondary transition-colors hover:bg-slate-300/80 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

