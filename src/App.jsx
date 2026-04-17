import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AiChatWidget from './components/AiChatWidget.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'));

function PageShell({ children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reduceMotion ? 0.18 : 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [location.hash, location.pathname, reduceMotion]);

  return (
    <div className="min-h-dvh bg-red-50 pb-24 text-slate-800 dark:bg-red-950 dark:text-slate-100 sm:pb-20">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-extrabold focus:text-secondary focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:bg-slate-800 dark:focus:text-slate-100"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-20">
              <div className="h-3 w-40 animate-pulse rounded-lg bg-slate-400/50 dark:bg-slate-600" />
              <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-slate-400/40 dark:bg-slate-600/80" />
              <div className="mt-4 h-10 w-2/3 animate-pulse rounded-lg bg-slate-400/35 dark:bg-slate-600/60" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageShell>
                    <Home />
                  </PageShell>
                }
              />
              <Route
                path="/about"
                element={
                  <PageShell>
                    <AboutPage />
                  </PageShell>
                }
              />
              <Route
                path="/services"
                element={
                  <PageShell>
                    <ServicesPage />
                  </PageShell>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageShell>
                    <ProjectsPage />
                  </PageShell>
                }
              />
              <Route
                path="/gallery"
                element={
                  <PageShell>
                    <GalleryPage />
                  </PageShell>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageShell>
                    <ContactPage />
                  </PageShell>
                }
              />
              <Route
                path="/blog"
                element={
                  <PageShell>
                    <BlogPage />
                  </PageShell>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <PageShell>
                    <BlogPostPage />
                  </PageShell>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <AiChatWidget />
      <WhatsAppButton />
    </div>
  );
}

