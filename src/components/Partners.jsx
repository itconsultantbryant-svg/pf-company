import { motion } from 'framer-motion';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

import jfkLogo from '../assets/partners/jfk-medical-center.svg';
import bloomLogo from '../assets/partners/bloom-bank.svg';
import ecowasLogo from '../assets/partners/ecowas.svg';
import rreaLogo from '../assets/partners/rrea.svg';

const partners = [
  { name: 'JFK Medical Center', src: jfkLogo },
  { name: 'Bloom Bank', src: bloomLogo },
  { name: 'ECOWAS', src: ecowasLogo },
  { name: 'RREA', src: rreaLogo }
];

export default function Partners() {
  return (
    <section className="relative" id="partners">
      <Container className="py-20">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <SectionHeading
            eyebrow="Partners & clients"
            title="Trusted by institutions and growing teams."
            subtitle="Hover to reveal full-color partner marks. (These are lightweight placeholders — swap in official logos anytime.)"
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, idx) => (
              <motion.div
                key={p.name}
                className="group flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-white/10 dark:bg-slate-950/40"
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
        </div>
      </Container>
    </section>
  );
}

