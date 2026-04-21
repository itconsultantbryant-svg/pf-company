import { motion } from 'framer-motion';
import Container from '../components/Container.jsx';

const imageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const videoModules = import.meta.glob('../assets/**/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default'
});

function toSortedEntries(mods) {
  return Object.entries(mods)
    .filter(([p]) => !p.includes('/.DS_Store'))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => ({ path, url, name: path.split('/').pop() ?? path }));
}

const images = toSortedEntries(imageModules);
const videos = toSortedEntries(videoModules);

export default function GalleryPage() {
  return (
    <>
      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((m, idx) => (
              <motion.div
                key={m.path}
                className="overflow-hidden rounded-3xl border border-white/20 bg-primary shadow-lg shadow-primary/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(0.12, idx * 0.02) }}
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-white p-3 dark:bg-white">
                  <img
                    src={m.url}
                    alt=""
                    className="max-h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {videos.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {videos.map((m, idx) => (
                <motion.div
                  key={m.path}
                  className="overflow-hidden rounded-3xl border border-white/20 bg-primary shadow-lg shadow-primary/20"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(0.12, idx * 0.02) }}
                >
                  <div className="bg-red-50 p-3">
                    <video
                      src={m.url}
                      controls
                      className="h-auto w-full rounded-2xl"
                      preload="metadata"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}

