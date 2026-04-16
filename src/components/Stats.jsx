import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Container from './Container.jsx';

const stats = [
  { value: 47, suffix: '+', label: 'Installations' },
  { value: 10, suffix: '+', label: 'Counties Served' },
  { value: 10, suffix: 'MW', label: 'Capacity (1kW–10MW)' },
  { value: 2021, suffix: '', label: 'Founded' }
];

function useInViewport(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function CountUp({ to, suffix = '', start }) {
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setVal(to);
      return;
    }
    let raf = 0;
    const durationMs = 1100;
    const startedAt = performance.now();
    const from = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - startedAt) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, start, to]);

  return (
    <div className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
      {val}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInViewport(0.25);

  return (
    <section className="relative" ref={ref}>
      <Container className="py-14">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950/40"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.05 }}
            >
              <CountUp to={s.value} suffix={s.suffix} start={inView} />
              <div className="mt-2 text-sm font-extrabold text-slate-600 dark:text-slate-300">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

