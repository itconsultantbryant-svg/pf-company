import { motion } from 'framer-motion';
import Container from './Container.jsx';

const overlayStrengthClasses = {
  light: 'bg-gradient-to-b from-white/60 via-white/50 to-white/60',
  medium: 'bg-gradient-to-b from-white/72 via-white/62 to-white/72',
  strong: 'bg-gradient-to-b from-white/82 via-white/74 to-white/82'
};

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  imageOverlay = 'medium'
}) {
  const overlayClass = overlayStrengthClasses[imageOverlay] ?? overlayStrengthClasses.medium;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-200">
      {backgroundImage ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0',
          backgroundImage
            ? overlayClass
            : 'opacity-50 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(253,184,19,0.2),transparent_60%),radial-gradient(60%_50%_at_10%_40%,rgba(0,168,150,0.12),transparent_55%),radial-gradient(60%_50%_at_90%_45%,rgba(11,60,93,0.35),transparent_55%)] dark:opacity-35'
        ].join(' ')}
      />
      {!backgroundImage ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/80 dark:bg-white"
        />
      ) : null}
      <Container className="relative py-16 sm:py-20">
        <motion.p
          className={[
            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider shadow-sm',
            backgroundImage
              ? 'border border-primary/15 bg-white/88 text-primary backdrop-blur-sm'
              : 'border border-primary/20 bg-white text-primary'
          ].join(' ')}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <motion.h1
          className={[
            'mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl',
            backgroundImage ? 'text-primary [text-shadow:0_1px_1px_rgba(255,255,255,0.6)]' : 'text-primary'
          ].join(' ')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className={[
              'mt-4 max-w-3xl text-base font-semibold leading-relaxed sm:text-lg',
              backgroundImage
                ? 'text-primary/85 [text-shadow:0_1px_1px_rgba(255,255,255,0.45)]'
                : 'text-primary/85'
            ].join(' ')}
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
