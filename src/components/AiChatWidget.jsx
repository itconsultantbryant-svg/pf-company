import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="fixed bottom-6 left-4 z-[105] flex flex-col items-start gap-2 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.aside
            id="ai-chat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-1 flex max-h-[min(70vh,28rem)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-white/25 bg-primary shadow-2xl shadow-primary/30"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/20 bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                  <Sparkles className="h-5 w-5 text-gold" aria-hidden />
                </span>
                <div>
                  <h2 id={titleId} className="font-heading text-sm font-extrabold leading-tight">
                    Enersource Assistant
                  </h2>
                  <p className="text-xs font-semibold text-white/85">AI chat — coming soon</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/95 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-[12rem] flex-1 flex-col gap-3 overflow-y-auto bg-primary p-4">
              <div className="rounded-2xl rounded-tl-sm border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold leading-relaxed text-white/95 shadow-sm">
                Hi — I&apos;m your Enersource assistant. Soon I&apos;ll answer questions about our solar
                services, projects, and how to get a quote. Other features are on the way.
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-white/70">
                Full AI replies — coming later
              </p>
            </div>

            <div className="border-t border-white/20 bg-primary p-3">
              <label htmlFor="ai-chat-input" className="sr-only">
                Message (not active yet)
              </label>
              <div className="flex gap-2">
                <input
                  id="ai-chat-input"
                  type="text"
                  disabled
                  placeholder="Messaging will be available soon…"
                  className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white placeholder:text-white/70"
                />
                <button
                  type="button"
                  disabled
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/10 text-white/75"
                  aria-label="Send (disabled)"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ backgroundColor: '#C62828', color: '#fff' }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_18px_rgba(11,60,93,0.45)] ring-2 ring-white/90 ring-offset-2 ring-offset-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-white/30 dark:ring-offset-white dark:focus-visible:ring-offset-white sm:h-[3.25rem] sm:w-[3.25rem]"
        aria-expanded={open}
        aria-controls={open ? 'ai-chat-dialog' : undefined}
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
