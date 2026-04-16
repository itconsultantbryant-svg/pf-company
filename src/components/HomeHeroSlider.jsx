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
      className="relative border-b border-slate-200 bg-slate-900"
      aria-label="Featured project photography"
    >
      <div className="relative mx-auto max-h-[min(70vh,640px)] min-h-[280px] w-full overflow-hidden sm:min-h-[320px]">
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
            bulletClass: 'swiper-pagination-bullet !bg-white/50 !opacity-100',
            bulletActiveClass: '!bg-primary !w-6'
          }}
          navigation
          className="home-hero-swiper h-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination]:!bottom-4"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.src} className="!h-auto">
              <div className="relative aspect-[21/9] min-h-[280px] w-full sm:min-h-[320px] md:aspect-[2.4/1]">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={s.src === home1 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/20"
                  aria-hidden
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
