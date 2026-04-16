import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

const testimonials = [
  {
    name: 'Operations Lead',
    org: 'Healthcare Facility',
    location: 'Monrovia',
    quote:
      'Enersource delivered a clean installation with clear documentation and a smooth handover. The system performance has been consistent.'
  },
  {
    name: 'Facilities Manager',
    org: 'Financial Institution',
    location: 'Liberia',
    quote:
      'Professional team from survey to commissioning. Their preventive maintenance plan gave us confidence for long-term uptime.'
  },
  {
    name: 'Project Coordinator',
    org: 'Institutional Client',
    location: 'Liberia',
    quote:
      'Great communication and a strong safety culture on site. The work was completed on schedule and aligned to spec.'
  }
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="References that speak to reliability."
            subtitle="Swipeable, accessible slider with pagination dots."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
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
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950/40">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {t.org} • {t.location}
                      </div>
                      <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                      “{t.quote}”
                    </p>
                    <div className="mt-5 font-heading text-sm font-extrabold text-slate-950 dark:text-white">
                      {t.name}
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

