import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useTheme } from '../context/ThemeContext.jsx';
import logoSrc from '../assets/enersource_logo.jpeg';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

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
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-slate-900',
          isActive
            ? 'bg-primary/30 text-secondary shadow-sm dark:bg-primary/35 dark:text-slate-100'
            : 'text-secondary/90 hover:bg-secondary/10 hover:text-secondary dark:text-slate-200/90 dark:hover:bg-white/10 dark:hover:text-white'
        ].join(' '),
    []
  );

  const themeBtnClass =
    'grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-slate-200/80 text-secondary shadow-sm transition hover:bg-slate-300/90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/90 bg-slate-100/95 shadow-md shadow-slate-900/5 backdrop-blur-md dark:border-slate-700/90 dark:bg-slate-900/95 dark:shadow-black/20 supports-[backdrop-filter]:bg-slate-100/90 dark:supports-[backdrop-filter]:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-slate-900"
          aria-label="Enersource Inc. home"
        >
          <img
            src={logoSrc}
            alt="Enersource Inc. logo"
            className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-slate-400/50 dark:ring-slate-600"
            loading="eager"
          />
          <div className="leading-tight">
            <div className="font-heading text-sm font-extrabold tracking-tight text-secondary dark:text-slate-100">
              Enersource Inc.
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
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
          <button
            type="button"
            onClick={toggleTheme}
            className={`${themeBtnClass} ml-1`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            to="/contact"
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-white shadow-[0_2px_12px_rgba(198,40,40,0.35)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 active:brightness-95 dark:focus-visible:ring-offset-slate-900"
          >
            Get a Quote
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className={themeBtnClass}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-slate-200/80 text-secondary shadow-sm transition-colors hover:bg-slate-300/90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-slate-900"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 cursor-default bg-slate-900/40 backdrop-blur-[2px] dark:bg-black/50"
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
              className="fixed right-0 top-0 z-[60] h-dvh w-[86%] max-w-sm overflow-y-auto border-l border-slate-300 bg-slate-100 p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
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
                    className="h-9 w-9 rounded-lg object-cover ring-1 ring-slate-400/50 dark:ring-slate-600"
                  />
                  <div className="font-heading text-sm font-extrabold text-secondary dark:text-slate-100">
                    Enersource Inc.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-slate-200/80 text-secondary hover:bg-slate-300/90 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" strokeWidth={2.25} />
                </button>
              </div>

              <div className="mt-4 grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-3 py-3 text-base font-bold transition-colors',
                        isActive
                          ? 'bg-primary/25 text-secondary ring-1 ring-primary/40 dark:bg-primary/30 dark:text-slate-100'
                          : 'text-slate-700 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-800'
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-base font-extrabold text-white shadow-[0_2px_12px_rgba(198,40,40,0.35)] hover:brightness-110"
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
