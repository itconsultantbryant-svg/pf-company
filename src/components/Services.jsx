import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  Hammer,
  PlugZap,
  RefreshCcw,
  ShoppingCart,
  Wrench
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useChatWidget } from '../context/ChatWidgetContext.jsx';
import { SERVICES_CATALOG } from '../data/enersourceKnowledge.js';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const iconById = {
  'svc-design': PlugZap,
  'svc-supply': ShoppingCart,
  'svc-install': Hammer,
  'svc-maintenance': Wrench,
  'svc-upgrade': RefreshCcw,
  'svc-training': GraduationCap
};

export default function Services() {
  const [openCard, setOpenCard] = useState(null);
  const sectionRef = useRef(null);
  const location = useLocation();
  const { notifyServicesSection } = useChatWidget();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenCard(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/services') return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && en.intersectionRatio >= 0.3) {
            notifyServicesSection();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0.25, 0.35, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [location.pathname, notifyServicesSection]);

  return (
    <section className="relative" id="services" ref={sectionRef}>
      <Container className="py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Everything you need for a successful solar deployment."
              subtitle="End-to-end solar energy solutions tailored to the unique energy needs of each client."
            />
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View all services
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_CATALOG.map((s, idx) => (
              <motion.article
                key={s.id}
                className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(70%_60%_at_20%_20%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(70%_60%_at_80%_20%,rgba(253,184,19,0.12),transparent_60%)]"
                />
                <motion.div
                  initial={false}
                  animate={{ rotateY: openCard === s.id ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="relative min-h-[280px] [transform-style:preserve-3d]"
                >
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-gold ring-1 ring-white/20">
                        {iconById[s.id] ? (() => {
                            const I = iconById[s.id];
                            return <I className="h-5 w-5" />;
                          })() : null}
                      </div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary/70">
                        Enersource
                      </div>
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-extrabold text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-primary/90">
                      {s.details}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenCard((current) => (current === s.id ? null : s.id))}
                      aria-expanded={openCard === s.id}
                      aria-controls={`service-card-${idx}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-gold"
                    >
                      Learn more
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>

                  <div
                    id={`service-card-${idx}`}
                    className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-gold ring-1 ring-white/20">
                        {iconById[s.id] ? (() => {
                            const I = iconById[s.id];
                            return <I className="h-5 w-5" />;
                          })() : null}
                      </div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary/70">
                        Enersource
                      </div>
                    </div>
                    <h3 className="mt-4 font-heading text-base font-extrabold text-primary">{s.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-primary/90">{s.details}</p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-primary/90">
                      Our team handles planning, implementation, and post-delivery support so every
                      project remains reliable, safe, and aligned with your energy goals.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenCard(null)}
                      aria-controls={`service-card-${idx}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-gold"
                    >
                      Flip back <span aria-hidden="true">↺</span>
                    </button>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
