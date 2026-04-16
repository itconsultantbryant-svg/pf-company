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
import p7 from '../assets/project_slide_7.jpeg';
import p8 from '../assets/project_slide_8.jpeg';
import p9 from '../assets/project_slide_9.jpeg';
import p10 from '../assets/project_slide_10.jpeg';

const slides = [
  { src: p1, alt: 'Project gallery image 1' },
  { src: p2, alt: 'Project gallery image 2' },
  { src: p3, alt: 'Project gallery image 3' },
  { src: p4, alt: 'Project gallery image 4' },
  { src: p5, alt: 'Project gallery image 5' },
  { src: p6, alt: 'Project gallery image 6' },
  { src: p7, alt: 'Project gallery image 7' },
  { src: p8, alt: 'Project gallery image 8' },
  { src: p9, alt: 'Project gallery image 9' },
  { src: p10, alt: 'Project gallery image 10' }
];

export default function ProjectGallerySlider() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-slate-400/50 bg-slate-200/50 py-10 dark:border-slate-700 dark:bg-slate-900/80 sm:py-12"
      aria-label="Project photography"
    >
      <Container>
        <p className="mb-4 text-center text-xs font-extrabold uppercase tracking-wider text-secondary dark:text-slate-300">
          Gallery
        </p>
        <h2 className="mb-6 text-center font-heading text-xl font-extrabold text-secondary dark:text-slate-100 sm:text-2xl">
          Recent deployments & sites
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-400/50 bg-slate-200/70 shadow-glow dark:border-slate-600 dark:bg-slate-800/60">
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
              bulletClass:
                'swiper-pagination-bullet !bg-secondary/25 !opacity-100',
              bulletActiveClass: '!bg-primary !w-6'
            }}
            navigation
            className="project-gallery-swiper [&_.swiper-button-next]:text-secondary [&_.swiper-button-prev]:text-secondary dark:[&_.swiper-button-next]:text-slate-200 dark:[&_.swiper-button-prev]:text-slate-200 [&_.swiper-pagination]:!bottom-3"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src}>
                <div className="flex min-h-[220px] w-full items-center justify-center bg-slate-200/40 py-4 dark:bg-slate-900/40 sm:min-h-[300px] md:min-h-[380px]">
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="max-h-[min(70vh,720px)] w-full object-contain"
                    loading={s.src === p1 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
