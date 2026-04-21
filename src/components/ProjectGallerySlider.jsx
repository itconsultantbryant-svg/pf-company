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
        <div className="overflow-hidden rounded-2xl border border-white/25 bg-primary shadow-lg shadow-primary/25">
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
            className="project-gallery-swiper [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination]:!bottom-3"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src}>
                <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden bg-red-50 py-4 sm:min-h-[300px] md:min-h-[380px]">
                  <div className="pointer-events-none absolute inset-0 bg-primary/25" aria-hidden="true" />
                  <div
                    className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-45 blur-md mix-blend-multiply"
                    style={{ backgroundImage: `url("${s.src}")` }}
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/15 via-red-100/40 to-primary/20" />
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="relative z-10 max-h-[min(70vh,720px)] w-full object-contain drop-shadow-[0_12px_32px_rgba(198,40,40,0.22)]"
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
