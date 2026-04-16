import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logoSrc from '../assets/enersource_logo.jpeg';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  const apply = (next) => {
    const isDark = next === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.body?.classList.toggle('dark', isDark);
  };

  useEffect(() => {
    const saved = localStorage.getItem('enersource-theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    apply(initial);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== 'enersource-theme') return;
      const next = e.newValue === 'dark' ? 'dark' : 'light';
      setTheme(next);
      apply(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('enersource-theme', next);
      apply(next);
      return next;
    });
  };

  return { theme, toggle };
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const desktopLinkClass = useMemo(
    () =>
      ({ isActive }) =>
        [
          'rounded-full px-3 py-2 text-sm font-extrabold tracking-tight transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950',
          isActive
            ? 'bg-primary/20 text-secondary dark:text-white'
            : 'text-secondary/80 hover:bg-secondary/5 hover:text-secondary dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
        ].join(' '),
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
          aria-label="Enersource Inc. home"
        >
          <img
            src={logoSrc}
            alt="Enersource Inc. logo"
            className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-slate-200 dark:ring-white/10"
            loading="eager"
          />
          <div className="leading-tight">
            <div className="font-heading text-sm font-extrabold tracking-tight text-secondary dark:text-white">
              Enersource Inc.
            </div>
            <div className="text-xs font-semibold text-secondary/70 dark:text-white/70">
              Source of Africa’s Energy
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={desktopLinkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-secondary shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={toggle}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-secondary/80 transition-colors hover:bg-secondary/5 hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-950"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 cursor-default bg-slate-950/30 backdrop-blur-sm"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              className="fixed right-0 top-0 z-[60] h-dvh w-[86%] max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-slate-950"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={logoSrc}
                    alt=""
                    className="h-9 w-9 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-white/10"
                  />
                  <div className="font-heading text-sm font-extrabold text-slate-950 dark:text-white">
                    Enersource Inc.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-3 py-3 text-base font-bold',
                        isActive
                          ? 'bg-primary/15 text-slate-950 dark:text-white'
                          : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10'
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-base font-extrabold text-secondary shadow-glow"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

