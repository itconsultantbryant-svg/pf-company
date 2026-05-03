import emailjs from '@emailjs/browser';

function getConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    toEmail: import.meta.env.VITE_CONTACT_TO_EMAIL ?? 'info@enersourcelr.com'
  };
}

/**
 * Sends transcript text to Enersource using the same EmailJS template as the contact form.
 * Configure optional attachment base64 in EmailJS template if your plan supports it.
 *
 * @param {object} opts
 * @param {string} opts.fromName
 * @param {string} opts.fromEmail
 * @param {string} opts.transcriptText
 * @param {string} [opts.invoiceSummary]
 * @param {string} [opts.catalogAppendix] Full product/package/service write-ups for quoted lines
 */
export async function sendChatTranscriptEmail(opts) {
  const cfg = getConfig();
  if (!cfg.serviceId || !cfg.templateId || !cfg.publicKey) {
    throw new Error('Email is not configured (missing VITE_EMAILJS_* env vars).');
  }

  const { fromName, fromEmail, transcriptText, invoiceSummary, catalogAppendix } = opts;

  const message = [
    '--- Website assistant transcript ---',
    '',
    `From: ${fromName} <${fromEmail}>`,
    '',
    invoiceSummary ? `Quote / invoice snapshot:\n${invoiceSummary}\n\n` : '',
    catalogAppendix
      ? `Catalog detail (items referenced on PDF lines):\n${catalogAppendix}\n\n`
      : '',
    'Conversation:',
    transcriptText
  ].join('\n');

  const payload = {
    to_email: cfg.toEmail,
    from_name: fromName || 'Website visitor',
    from_email: fromEmail,
    reply_to: fromEmail || cfg.toEmail,
    phone: '',
    message
  };

  const options = { publicKey: cfg.publicKey };

  return emailjs.send(cfg.serviceId, cfg.templateId, payload, options);
}
