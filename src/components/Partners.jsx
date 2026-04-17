import { motion } from 'framer-motion';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

import jfkLogo from '../assets/partners/jfk-medical-center.svg';
import bloomLogo from '../assets/partners/bloom-bank.svg';
import ecowasLogo from '../assets/partners/ecowas.svg';
import rreaLogo from '../assets/partners/rrea.svg';

const partners = [
  { name: 'John F. Kennedy Medical Center (JFKMC)', src: jfkLogo },
  { name: 'Bloom Bank Africa Liberia Ltd.', src: bloomLogo },
  { name: 'ECOWAS Commission – Liberia', src: ecowasLogo },
  { name: 'RREA (Rural & Renewable Energy Agency)', src: rreaLogo }
];

export default function Partners() {
  return (
    <section className="relative" id="partners">
      <Container className="py-20">
        <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm dark:border-red-900/60 dark:bg-red-950/70">
          <SectionHeading
            eyebrow="Partners & clients"
            title="Trusted by institutions and growing teams."
            subtitle="A snapshot of key partners and institutional clients across healthcare, finance, international development, government, and civil society."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, idx) => (
              <motion.div
                key={p.name}
                className="group flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/60 dark:bg-red-950/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <img
                  src={p.src}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className="h-12 w-full max-w-[220px] object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/50">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Healthcare & Medical Institutions
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <li>John F. Kennedy Medical Center (JFKMC)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/50">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Financial Institutions
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <li>Bloom Bank Africa Liberia Ltd.</li>
                <li>International Bank Liberia Limited (IBLL) — Solarization proposal (POC phase)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/50">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                International Development & Civil Society
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <li>ECOWAS Commission – Liberia</li>
                <li>USAID Global Health Supply Chain Program (GHSC-PSM)</li>
                <li>Verve Energy Resources Ltd. — Consortium partner (CRS Global Fund bid)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/50">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Government & Regulatory Bodies / Commercial
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <li>RREA (Rural & Renewable Energy Agency) — Duty waiver request submitted</li>
                <li>Aminata & Sons Inc. — MOU for solarization of 23 filling stations (Lease-to-Own)</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

