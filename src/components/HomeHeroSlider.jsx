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

const slides = [
  { src: home1, alt: 'Enersource solar installation showcase 1' },
  { src: home2, alt: 'Enersource solar installation showcase 2' },
  { src: home3, alt: 'Enersource solar installation showcase 3' },
  { src: home4, alt: 'Enersource solar installation showcase 4' },
  { src: home5, alt: 'Enersource solar installation showcase 5' },
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
            bulletClass: 'swiper-pagination-bullet !bg-primary/30 !opacity-100',
            bulletActiveClass: '!bg-primary !w-6'
          }}
          navigation
          className="home-hero-swiper !h-auto [&_.swiper-slide]:!h-auto [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-pagination]:!bottom-4"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.src} className="!h-auto">
              <div className="relative h-[min(88svh,1600px)] min-h-[max(18rem,52svh)] w-full overflow-hidden bg-neutral-900">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
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
