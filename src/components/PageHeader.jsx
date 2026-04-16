import { motion } from 'framer-motion';
import Container from './Container.jsx';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-400/50 dark:border-slate-700">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(253,184,19,0.2),transparent_60%),radial-gradient(60%_50%_at_10%_40%,rgba(0,168,150,0.12),transparent_55%),radial-gradient(60%_50%_at_90%_45%,rgba(11,60,93,0.35),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(253,184,19,0.12),transparent_60%),radial-gradient(60%_50%_at_10%_40%,rgba(0,168,150,0.08),transparent_55%),radial-gradient(60%_50%_at_90%_45%,rgba(11,60,93,0.35),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-slate-200/40 dark:bg-slate-950/70"
      />
      <Container className="relative py-14 sm:py-16">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-slate-400/60 bg-slate-100/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-200"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-secondary dark:text-slate-100 sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}
