import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSrc from '../../assets/enersource_logo.jpeg';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

const services = [
  'Solar Installation',
  'Preventive Maintenance',
  'System Design & Engineering',
  'Technical Training'
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="Enersource Inc. logo"
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/10"
                loading="lazy"
              />
              <div>
                <div className="font-heading text-base font-extrabold text-slate-950 dark:text-white">
                  Enersource Inc.
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Source of Africa’s Energy
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Clean, affordable, and reliable solar solutions across Liberia — from design and
              procurement to installation, commissioning, and long-term maintenance.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-950 dark:text-white">
              Quick Links
            </h3>
            <nav className="mt-4 grid gap-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-950 dark:text-white">
              Services
            </h3>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s} className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-950 dark:text-white">
              Contact
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>Rehab Junction, Paynesville City</div>
              </div>
              <a className="flex items-center gap-2 hover:underline" href="tel:+231773227668">
                <Phone className="h-5 w-5 text-primary" />
                +231-773-227-668
              </a>
              <a className="flex items-center gap-2 hover:underline" href="mailto:info@enersourcelr.com">
                <Mail className="h-5 w-5 text-primary" />
                info@enersourcelr.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Enersource Inc. All rights reserved.</p>
          <p className="font-semibold">Built for speed, accessibility, and trust.</p>
        </div>
      </div>
    </footer>
  );
}

