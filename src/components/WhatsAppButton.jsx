import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '+231773227668';
  const message = encodeURIComponent('Hello Enersource Inc. — I would like a solar quote.');
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-extrabold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

