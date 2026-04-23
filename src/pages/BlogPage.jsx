import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { posts } from '../data/posts.js';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog / News"
        title="Insights on clean energy, performance, and project delivery."
        subtitle="Short, practical posts to help clients make confident solar decisions."
      />

      <section>
        <Container className="py-20">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, idx) => (
              <motion.article
                key={p.slug}
                className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(70%_60%_at_20%_20%,rgba(253,184,19,0.22),transparent_60%),radial-gradient(70%_60%_at_80%_20%,rgba(0,168,150,0.16),transparent_60%)]"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-primary/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
                      {formatDate(p.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                      {p.readingMinutes} min read
                    </span>
                  </div>

                  <h2 className="mt-3 font-heading text-lg font-extrabold text-primary">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      {p.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                    {p.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary"
                      >
                        <Tag className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 text-sm font-extrabold text-gold">
                    Read more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

