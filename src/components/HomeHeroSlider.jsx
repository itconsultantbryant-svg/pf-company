import { useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import home1 from '../assets/home_slide_1.jpeg';
import home2 from '../assets/home_slide_2.jpeg';
import home3 from '../assets/home_slide_3.jpeg';
import home4 from '../assets/home_slide_4.jpeg';
import home5 from '../assets/home_slide_5.jpeg';
import home6 from '../assets/home_slide_6.jpeg';

const slides = [
  { src: home1, alt: 'Enersource solar installation showcase 1' },
  { src: home2, alt: 'Enersource solar installation showcase 2' },
  { src: home3, alt: 'Enersource solar installation showcase 3' },
  { src: home4, alt: 'Enersource solar installation showcase 4' },
  { src: home5, alt: 'Enersource solar installation showcase 5' },
  { src: home6, alt: 'Enersource solar installation showcase 6' }
];

export default function HomeHeroSlider() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative border-b border-slate-200 bg-white dark:border-slate-200 dark:bg-white"
      aria-label="Featured project photography"
    >
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={reduceMotion ? 400 : 900}
          loop
          grabCursor
          autoplay={
            reduceMotion
              ? false
              : {
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }
          }
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/40 !opacity-100',
            bulletActiveClass: '!bg-white !w-6'
          }}
          navigation
          className="home-hero-swiper [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-pagination]:!bottom-4"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.src}>
              <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden bg-red-50 py-4 sm:min-h-[320px] md:min-h-[420px] md:py-6">
                <div
                  className="pointer-events-none absolute inset-0 bg-primary/25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-45 blur-md mix-blend-multiply"
                  style={{ backgroundImage: `url("${s.src}")` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/15 via-red-100/40 to-primary/20" />
                <img
                  src={s.src}
                  alt={s.alt}
                  className="relative z-10 max-h-[min(75vh,800px)] w-full object-contain drop-shadow-[0_12px_32px_rgba(198,40,40,0.22)]"
                  loading={s.src === home1 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
