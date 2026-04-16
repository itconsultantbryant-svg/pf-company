import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';
import { posts } from '../data/posts.js';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogPreview() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="relative" id="news">
      <Container className="py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="News"
              title="Latest insights and updates."
              subtitle="Helpful short reads on solar systems, maintenance, and ROI."
            />
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              View all posts
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, idx) => (
              <motion.article
                key={p.slug}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {formatDate(p.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {p.readingMinutes} min
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-extrabold text-slate-950 dark:text-white">
                  <Link to={`/blog/${p.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                  {p.excerpt}
                </p>
                <div className="mt-5 text-sm font-extrabold text-secondary dark:text-primary">
                  Read <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

