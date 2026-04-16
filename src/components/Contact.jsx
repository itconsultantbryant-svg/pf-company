import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useMemo, useState } from 'react';
import Container from './Container.jsx';
import SectionHeading from './SectionHeading.jsx';

function getEmailJsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    toEmail: import.meta.env.VITE_CONTACT_TO_EMAIL ?? 'info@enersourcelr.com'
  };
}

export default function Contact() {
  const cfg = useMemo(() => getEmailJsConfig(), []);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const canSend = Boolean(cfg.serviceId && cfg.templateId && cfg.publicKey);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      if (!canSend) {
        setStatus({
          state: 'error',
          message:
            'Please try again later!'
        });
        return;
      }

      await emailjs.send(
        cfg.serviceId,
        cfg.templateId,
        {
          to_email: cfg.toEmail,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          phone: form.phone,
          message: form.message
        },
        { publicKey: cfg.publicKey }
      );

      setStatus({ state: 'success', message: 'Message sent. We’ll get back to you shortly.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Something went wrong sending your message. Please try again.'
      });
    }
  };

  return (
    <section className="relative text-slate-800 dark:text-slate-200" id="contact">
      <Container className="py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Contact information"
              subtitle="Rehab Junction, Paynesville City Montserrado County, Liberia"
            />

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-slate-400/60 bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-800/90">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      Address
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Rehab Junction, Paynesville City, Liberia
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-400/60 bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-800/90">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      Phone
                    </div>
                    <div className="mt-1 grid gap-1">
                      <a
                        className="text-sm font-semibold text-slate-700 hover:underline dark:text-slate-300"
                        href="tel:+231773227668"
                      >
                        +231-773-227-668
                      </a>
                      <a
                        className="text-sm font-semibold text-slate-700 hover:underline dark:text-slate-300"
                        href="tel:+231881126464"
                      >
                        +231-881-126-464
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-400/60 bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-800/90">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      WhatsApp
                    </div>
                    <div className="mt-1 grid gap-1">
                      <a
                        className="text-sm font-semibold text-slate-700 hover:underline dark:text-slate-300"
                        href="https://wa.me/231881199106"
                        target="_blank"
                        rel="noreferrer"
                      >
                        +231-881-199-106
                      </a>
                      <a
                        className="text-sm font-semibold text-slate-700 hover:underline dark:text-slate-300"
                        href="https://wa.me/231773227668"
                        target="_blank"
                        rel="noreferrer"
                      >
                        +231-773-227-668
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-400/60 bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-800/90">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      Email
                    </div>
                    <a
                      className="mt-1 block text-sm font-semibold text-slate-700 hover:underline dark:text-slate-300"
                      href="mailto:info@enersourcelr.com"
                    >
                      info@enersourcelr.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-400/60 bg-slate-100 p-5 dark:border-slate-600 dark:bg-slate-800/90">
                <div className="flex items-start gap-3">
                  <Facebook className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-heading text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      Follow Us
                    </div>
                    <div className="mt-1 grid gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div>Facebook: @enersource</div>
                      <div className="inline-flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-primary" aria-hidden="true" />
                        Instagram: @enersourcelr
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Map to Paynesville City"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Paynesville%20City%2C%20Liberia&output=embed"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl border border-slate-400/60 bg-slate-100/90 p-6 shadow-sm backdrop-blur dark:border-slate-600 dark:bg-slate-800/90"
          >
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-extrabold text-slate-700">
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                    autoComplete="name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="h-11 rounded-xl border border-slate-400/60 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200">
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="h-11 rounded-xl border border-slate-400/60 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  autoComplete="tel"
                />
              </label>

              <label className="grid gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-200">
                Message
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={6}
                  className="resize-none rounded-xl border border-slate-400/60 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-glow transition-transform hover:scale-[1.02] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status.state === 'loading' ? 'Sending…' : 'Send message'}
              </button>

              {status.message ? (
                <p
                  className={`text-sm font-semibold ${
                    status.state === 'success'
                      ? 'text-accent'
                      : status.state === 'error'
                        ? 'text-rose-500'
                        : 'text-slate-600'
                  }`}
                  role={status.state === 'error' ? 'alert' : 'status'}
                >
                  {status.message}
                </p>
              ) : null}

              {!canSend ? (
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Please try again later!
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

