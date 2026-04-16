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
      className="relative border-b border-slate-400/50 bg-slate-200/80 dark:border-slate-700 dark:bg-slate-900"
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
            bulletClass: 'swiper-pagination-bullet !bg-secondary/35 !opacity-100',
            bulletActiveClass: '!bg-primary !w-6'
          }}
          navigation
          className="home-hero-swiper [&_.swiper-button-next]:text-secondary [&_.swiper-button-prev]:text-secondary dark:[&_.swiper-button-next]:text-slate-200 dark:[&_.swiper-button-prev]:text-slate-200 [&_.swiper-pagination]:!bottom-4"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.src}>
              <div className="flex min-h-[260px] w-full items-center justify-center bg-slate-100 py-4 sm:min-h-[320px] md:min-h-[420px] md:py-6">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="max-h-[min(75vh,800px)] w-full object-contain"
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
