import { motion } from 'framer-motion';
import Container from '../components/Container.jsx';
import PageHeader from '../components/PageHeader.jsx';

const imageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  as: 'url'
});

const videoModules = import.meta.glob('../assets/**/*.{mp4,webm,mov}', {
  eager: true,
  as: 'url'
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
      <PageHeader
        eyebrow="Gallery"
        title="Photos & videos from our work."
        subtitle="A public collection of media used across the site."
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-12">
            <div>
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-heading text-2xl font-extrabold text-secondary dark:text-slate-100">
                  Images
                </h2>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {images.length} files
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((m, idx) => (
                  <motion.figure
                    key={m.path}
                    className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm dark:border-red-900/60 dark:bg-red-950"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(0.12, idx * 0.02) }}
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-red-50 p-3 dark:bg-red-950/60">
                      <img
                        src={m.url}
                        alt={m.name}
                        className="max-h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="border-t border-red-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-red-900/60 dark:text-slate-300">
                      {m.name}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-heading text-2xl font-extrabold text-secondary dark:text-slate-100">
                  Videos
                </h2>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {videos.length} files
                </div>
              </div>

              {videos.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-white p-5 text-sm font-semibold text-slate-700 dark:border-red-900/60 dark:bg-red-950 dark:text-slate-300">
                  No videos found in `src/assets` yet. Add `.mp4`, `.webm`, or `.mov` files and they’ll
                  appear here automatically.
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {videos.map((m, idx) => (
                    <motion.div
                      key={m.path}
                      className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm dark:border-red-900/60 dark:bg-red-950"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(0.12, idx * 0.02) }}
                    >
                      <div className="bg-red-50 p-3 dark:bg-red-950/60">
                        <video
                          src={m.url}
                          controls
                          className="h-auto w-full rounded-2xl"
                          preload="metadata"
                        />
                      </div>
                      <div className="border-t border-red-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-red-900/60 dark:text-slate-300">
                        {m.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

