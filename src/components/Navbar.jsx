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
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

const iconBtnClass =
  'grid h-10 w-10 place-items-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

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
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-primary hover:bg-primary/10'
        ].join(' '),
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 lg:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Enersource Inc. home"
        >
          <img
            src={logoSrc}
            alt="Enersource Inc. logo"
            className="h-9 w-9 rounded-xl object-cover shadow-sm ring-2 ring-white/40"
            loading="eager"
          />
          <div className="leading-tight">
            <div className="font-heading text-sm font-extrabold tracking-tight text-primary">
              Enersource Inc.
            </div>
            <div className="text-xs font-semibold text-primary/80">
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
            className={`${iconBtnClass} ml-1`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            to="/contact"
            className="ml-2 rounded-full border border-primary/20 bg-primary px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:brightness-95"
          >
            Get a Quote
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className={iconBtnClass}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={iconBtnClass}
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
              className="fixed inset-0 z-50 cursor-default bg-black/35 backdrop-blur-[2px]"
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
              className="fixed right-0 top-0 z-[60] flex h-dvh w-[86%] max-w-sm flex-col overflow-y-auto border-l border-slate-200 bg-white p-4 text-primary shadow-2xl"
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
                    className="h-9 w-9 rounded-lg object-cover ring-2 ring-white/40"
                  />
                  <div className="font-heading text-sm font-extrabold text-primary">
                    Enersource Inc.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={iconBtnClass}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" strokeWidth={2.25} />
                </button>
              </div>

              <div className="mt-4 grid flex-1 gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-3 py-3 text-base font-bold transition-colors',
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-primary hover:bg-primary/10'
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 rounded-xl border border-white/25 bg-primary px-4 py-3 text-center text-base font-extrabold text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)] hover:brightness-110"
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
