import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Container from '../components/Container.jsx';
import { getPostBySlug } from '../data/posts.js';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article>
      <Container className="py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-primary px-4 py-2 text-sm font-extrabold text-white shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back to blog
        </Link>

        <motion.h1
          className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {post.title}
        </motion.h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
          {post.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-3xl border border-primary/15 bg-white p-6 shadow-sm sm:p-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
        >
          <div className="grid gap-4">
            {post.content.map((para) => (
              <p
                key={para}
                className="text-sm font-semibold leading-relaxed text-slate-700 sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </Container>
    </article>
  );
}

