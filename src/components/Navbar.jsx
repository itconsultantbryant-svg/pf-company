import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50',
          isActive
            ? 'bg-primary/25 text-secondary shadow-sm'
            : 'text-secondary/85 hover:bg-secondary/[0.06] hover:text-secondary'
        ].join(' '),
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          aria-label="Enersource Inc. home"
        >
          <img
            src={logoSrc}
            alt="Enersource Inc. logo"
            className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-slate-200/90"
            loading="eager"
          />
          <div className="leading-tight">
            <div className="font-heading text-sm font-extrabold tracking-tight text-secondary">
              Enersource Inc.
            </div>
            <div className="text-xs font-semibold text-slate-600">Source of Africa’s Energy</div>
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
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-white shadow-glow transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 active:brightness-95"
          >
            Get a Quote
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-secondary shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
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
              className="fixed inset-0 z-50 cursor-default bg-slate-900/25 backdrop-blur-[2px]"
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
              className="fixed right-0 top-0 z-[60] h-dvh w-[86%] max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl"
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
                    className="h-9 w-9 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <div className="font-heading text-sm font-extrabold text-secondary">Enersource Inc.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-secondary hover:bg-slate-50"
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
                          ? 'bg-primary/20 text-secondary ring-1 ring-primary/30'
                          : 'text-slate-700 hover:bg-slate-100'
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-base font-extrabold text-white shadow-glow hover:brightness-105"
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
