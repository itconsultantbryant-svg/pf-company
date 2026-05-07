import { motion } from 'framer-motion';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

import jfkLogo from '../assets/partners/jfk-medical-center.png';
import bloomLogo from '../assets/partners/bloom-bank.png';
import ecowasLogo from '../assets/partners/ecowas.png';
import rreaLogo from '../assets/partners/rrea.png';

const partners = [
  { name: 'John F. Kennedy Medical Center (JFKMC)', src: jfkLogo },
  { name: 'Bloom Bank Africa Liberia Ltd.', src: bloomLogo },
  { name: 'ECOWAS Commission – Liberia', src: ecowasLogo },
  { name: 'RREA (Rural & Renewable Energy Agency)', src: rreaLogo }
];

export default function Partners() {
  return (
    <section className="relative" id="partners">
      <Container className="py-24">
        <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm lg:p-8">
          <SectionHeading
            eyebrow="Partners & clients"
            title="Trusted by institutions and growing teams."
            subtitle="A snapshot of key partners and institutional clients across healthcare, finance, international development, government, and civil society."
            tone="onPrimary"
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, idx) => (
              <motion.div
                key={p.name}
                className="group flex items-center justify-center rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <div className="w-full rounded-xl bg-white px-4 py-3 shadow-sm">
                  <img
                    src={p.src}
                    alt={`${p.name} logo`}
                    loading="lazy"
                    className="mx-auto h-12 w-full max-w-[220px] object-contain opacity-90 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/70">
                Healthcare & Medical Institutions
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                <li>John F. Kennedy Medical Center (JFKMC)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/70">
                Financial Institutions
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                <li>Bloom Bank Africa Liberia Ltd.</li>
                <li>International Bank Liberia Limited (IBLL) — Solarization proposal (POC phase)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/70">
                International Development & Civil Society
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                <li>ECOWAS Commission – Liberia</li>
                <li>USAID Global Health Supply Chain Program (GHSC-PSM)</li>
                <li>Verve Energy Resources Ltd. — Consortium partner (CRS Global Fund bid)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
              <div className="font-heading text-sm font-extrabold uppercase tracking-wider text-primary/70">
                Government & Regulatory Bodies / Commercial
              </div>
              <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
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

