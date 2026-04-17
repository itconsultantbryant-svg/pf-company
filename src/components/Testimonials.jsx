import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Mail, Phone, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const testimonials = [
  {
    name: 'Mr. Joseph Massah — Chief Financial Officer (Project Coordinator)',
    org: 'John F. Kennedy Medical Center',
    location: 'Monrovia, Liberia',
    quote:
      'Solar Standalone System for 9 Critical Units at JFKMC (Operating theaters, ICU, maternity wards, emergency units).',
    phone: '+231-886-524-291',
    email: 'josephmassah2@gmail.com'
  },
  {
    name: 'Mr. Kingsley Minikum, Jr — Project Manager',
    org: 'Bloom Bank Africa Liberia Limited',
    location: 'Liberia',
    quote:
      'Installation of Hybrid Solar Energy System at Five Bloom Bank Branches.',
    phone: '+231-770-416-473',
    email: 'kminikum@bloombankafrica.com'
  },
  {
    name: 'Dr. Nathaniel B. Walker — Political Advisor & Early Warning Liaison, ECOWAS',
    org: 'ECOWAS Commission / USAID GHSC-PSM',
    location: 'Liberia (11 counties)',
    quote:
      'Installation of 5kW Solar Hybrid Systems at 17 Community Radio Stations.',
    phone: '+231-770-944-659',
    email: 'nwalker@ecowas.int'
  }
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden" id="testimonials">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Client references"
            title="Three verified references from recent projects."
            subtitle="Representative of Enersource Inc.'s capabilities, execution standards, and institutional client relationships."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/60 dark:bg-red-950/70"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={
                reduceMotion ? false : { delay: 4500, disableOnInteraction: false }
              }
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                900: { slidesPerView: 2 }
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.quote}>
                  <article className="h-full rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/50">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {t.org} • {t.location}
                      </div>
                      <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                      “{t.quote}”
                    </p>
                    <div className="mt-5 font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {t.name}
                    </div>
                    <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <a className="inline-flex items-center gap-2 hover:underline" href={`tel:${t.phone.replace(/\\s/g, '')}`}>
                        <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                        {t.phone}
                      </a>
                      <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${t.email}`}>
                        <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                        {t.email}
                      </a>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

