import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', tone = 'default' }) {
  const alignment =
    align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const onPrimary = tone === 'onPrimary';

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary shadow-sm"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35 }}
        >
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        className={`font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          onPrimary ? 'text-white' : 'text-primary'
        }`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          className={`max-w-3xl text-base leading-relaxed sm:text-lg ${
            onPrimary ? 'text-white/90' : 'text-primary/85'
          } ${align === 'center' ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
