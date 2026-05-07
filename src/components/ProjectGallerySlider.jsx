import { useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Container from './Container.jsx';

import p1 from '../assets/project_slide_1.jpeg';
import p2 from '../assets/project_slide_2.jpeg';
import p3 from '../assets/project_slide_3.jpeg';
import p4 from '../assets/project_slide_4.jpeg';
import p5 from '../assets/project_slide_5.jpeg';
import p6 from '../assets/project_slide_6.jpeg';
import p8 from '../assets/project_slide_8.jpeg';
import p10 from '../assets/project_slide_10.jpeg';

const slides = [
  { src: p1, alt: 'Project gallery image 1' },
  { src: p2, alt: 'Project gallery image 2' },
  { src: p3, alt: 'Project gallery image 3' },
  { src: p4, alt: 'Project gallery image 4' },
  { src: p5, alt: 'Project gallery image 5' },
  { src: p6, alt: 'Project gallery image 6' },
  { src: p8, alt: 'Project gallery image 8' },
  { src: p10, alt: 'Project gallery image 10' }
];

export default function ProjectGallerySlider() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-slate-200 bg-white py-10 dark:border-slate-200 dark:bg-white sm:py-12"
      aria-label="Project photography"
    >
      <Container>
        <div className="mb-6 rounded-2xl border border-white/25 bg-primary px-5 py-5 text-center shadow-lg shadow-primary/30 sm:px-8 sm:py-6">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/90">Gallery</p>
          <h2 className="mt-1 font-heading text-xl font-extrabold text-white sm:text-2xl">
            Recent deployments & sites
          </h2>
        </div>
      </Container>
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[min(100%,120rem)] overflow-hidden rounded-2xl border border-white/25 bg-primary shadow-lg shadow-primary/25 sm:rounded-3xl">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={reduceMotion ? 400 : 850}
            loop
            grabCursor
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }
            }
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/35 !opacity-100',
              bulletActiveClass: '!bg-white !w-6'
            }}
            navigation
            className="project-gallery-swiper !h-auto [&_.swiper-slide]:!h-auto [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination]:!bottom-3"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src} className="!h-auto">
                <div className="relative h-[min(82svh,1500px)] min-h-[max(17rem,48svh)] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading={s.src === p1 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
