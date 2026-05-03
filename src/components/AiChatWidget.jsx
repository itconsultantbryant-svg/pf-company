import { AnimatePresence, motion } from 'framer-motion';
import {
  Download,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  Trash2,
  X
} from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useChatWidget } from '../context/ChatWidgetContext.jsx';
import {
  COMPANY,
  PACKAGES,
  SERVICES_CATALOG,
  findPackageById,
  findServiceById
} from '../data/enersourceKnowledge.js';
import { PRODUCTS, formatProductForChat, lookupCatalogProduct } from '../data/productsCatalog.js';
import {
  answerFreeText,
  describeProduct,
  findProductByUserMessage,
  getWelcomeMessage,
  handleAction,
  parseContactBlob
} from '../utils/chatAssistant.js';
import { sendChatTranscriptEmail } from '../utils/sendChatTranscript.js';

/** Loads PDF helpers + jsPDF only when the user generates or downloads a PDF. */
let pdfDocumentsPromise;
function loadPdfDocuments() {
  if (!pdfDocumentsPromise) pdfDocumentsPromise = import('../utils/pdfDocuments.js');
  return pdfDocumentsPromise;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AiChatWidget() {
  const titleId = useId();
  const { open, setOpen, proactiveHint, setProactiveHint, openChat } = useChatWidget();

  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [messages, setMessages] = useState(() => [
    { id: uid(), role: 'assistant', text: getWelcomeMessage().text, suggestions: getWelcomeMessage().suggestions }
  ]);

  const [quotePhase, setQuotePhase] = useState('none');
  const [quoteDocType, setQuoteDocType] = useState('quotation');
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [lines, setLines] = useState([]);
  const [lastInvoiceSummary, setLastInvoiceSummary] = useState('');
  const [pickKind, setPickKind] = useState('product');
  const [pickId, setPickId] = useState(PRODUCTS[0]?.id ?? '');
  const [pickQty, setPickQty] = useState(1);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (quotePhase !== 'building') return;
    if (pickKind === 'product' && PRODUCTS.length) {
      const ok = PRODUCTS.some((p) => p.id === pickId);
      if (!ok) setPickId(PRODUCTS[0].id);
    } else if (pickKind === 'package' && PACKAGES.length) {
      const ok = PACKAGES.some((p) => p.id === pickId);
      if (!ok) setPickId(PACKAGES[0].id);
    } else if (pickKind === 'service' && SERVICES_CATALOG.length) {
      const ok = SERVICES_CATALOG.some((p) => p.id === pickId);
      if (!ok) setPickId(SERVICES_CATALOG[0].id);
    }
  }, [pickId, pickKind, quotePhase]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const appendAssistant = useCallback((text, suggestions) => {
    setMessages((m) => [...m, { id: uid(), role: 'assistant', text, suggestions: suggestions ?? [] }]);
  }, []);

  const appendUser = useCallback((text) => {
    setMessages((m) => [...m, { id: uid(), role: 'user', text }]);
  }, []);

  const onAction = useCallback(
    (action) => {
      if (action.startsWith('invoice_product:')) {
        const id = action.slice('invoice_product:'.length);
        const p = lookupCatalogProduct(id);
        if (p) {
          setLines([
            {
              id: uid(),
              kind: 'product',
              catalogId: id,
              label: p.name,
              unitPrice: p.indicativeUnitPrice ?? 0,
              qty: 1
            }
          ]);
          setPickKind('product');
          setPickId(id);
          setQuotePhase('choosing_type');
          appendAssistant(
            `**${p.name}** is on your quote (**qty 1**, indicative unit price). Choose **Quotation** or **Invoice**, then enter your **name, email, and phone** to download the PDF.\n\nDetails shown above match our **Products** catalog.`,
            [
              { label: 'Quotation (estimate)', action: 'quote_type:quotation' },
              { label: 'Invoice style', action: 'quote_type:invoice' },
              { label: 'All products', action: 'list_products' }
            ]
          );
        } else {
          appendAssistant('That product ID was not found. Try **Browse products**.', [
            { label: 'Browse products', action: 'list_products' }
          ]);
        }
        return;
      }

      if (action === 'quote_start') {
        setQuotePhase('choosing_type');
      }
      if (action.startsWith('quote_type:')) {
        const inv = action.endsWith('invoice');
        setQuoteDocType(inv ? 'invoice' : 'quotation');
        setQuotePhase('awaiting_contact');
      }

      const res = handleAction(action);
      appendAssistant(res.text, res.suggestions);
    },
    [appendAssistant]
  );

  const transcriptText = useMemo(() => {
    return messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n\n');
  }, [messages]);

  const catalogEmailAppendix = useMemo(() => {
    if (!lines.length) return '';
    return lines
      .map((l) => {
        if (l.kind === 'product') {
          const p = lookupCatalogProduct(l.catalogId);
          return p ? formatProductForChat(p) : l.label;
        }
        if (l.kind === 'package') {
          const pkg = findPackageById(l.catalogId);
          return pkg
            ? `${pkg.name} (${pkg.subtitle})\n${pkg.description}\nIndicative (planning): USD ${pkg.indicativeUnitPrice.toLocaleString()}\n${pkg.pricingNote}`
            : l.label;
        }
        if (l.kind === 'service') {
          const s = findServiceById(l.catalogId);
          return s
            ? `${s.title}\n${s.details}\nIndicative line rate (planning): USD ${s.indicativeUnitPrice?.toLocaleString?.() ?? '—'}`
            : l.label;
        }
        return l.label;
      })
      .filter(Boolean)
      .join('\n\n---\n\n');
  }, [lines]);

  const addLineFromCatalog = useCallback(() => {
    const qty = Math.max(1, Number(pickQty) || 1);
    let label = '';
    let unit = 0;
    let id = pickId;
    if (!pickId) {
      appendAssistant('Pick an item from the dropdown first.');
      return;
    }
    if (pickKind === 'product') {
      const p = lookupCatalogProduct(pickId);
      if (!p) {
        appendAssistant(
          'That product could not be loaded from the catalog. Try choosing another item or tap **Main menu** and start again.'
        );
        return;
      }
      label = p.name;
      unit = p.indicativeUnitPrice ?? 0;
    } else if (pickKind === 'package') {
      const p = findPackageById(pickId);
      if (!p) {
        appendAssistant('Package not found — pick another from the list.');
        return;
      }
      label = `${p.name} (${p.subtitle})`;
      unit = p.indicativeUnitPrice ?? 0;
    } else {
      const s = findServiceById(pickId);
      if (!s) {
        appendAssistant('Service not found — pick another from the list.');
        return;
      }
      label = s.title;
      unit = s.indicativeUnitPrice ?? 1500;
    }
    setLines((prev) => [
      ...prev,
      { id: uid(), kind: pickKind, catalogId: id, label, unitPrice: unit, qty }
    ]);
  }, [appendAssistant, pickId, pickKind, pickQty]);

  const removeLine = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const generateCustomerPdf = useCallback(async () => {
    if (!contact.email || !contact.name) {
      appendAssistant('Please provide your name and email first (use the contact fields above).');
      return;
    }
    if (!lines.length) {
      appendAssistant('Add at least one line item from products, packages, or services.');
      return;
    }
    const docType = quoteDocType === 'invoice' ? 'invoice' : 'quotation';
    setPdfBusy(true);
    try {
      const { buildQuoteOrInvoicePdf, downloadPdf } = await loadPdfDocuments();
      const built = await buildQuoteOrInvoicePdf({
        docType,
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        lines: lines.map((l) => ({
          description: l.label,
          qty: l.qty,
          unitPrice: l.unitPrice
        })),
        notes: `Indicative ${docType}. Reference: Enersource website assistant.`
      });
      downloadPdf(built.doc, built.filename);
      const summary = [
        `Document: ${docType} (${built.refId})`,
        `Total USD: ${built.subtotal.toFixed(2)} (indicative)`,
        `Lines: ${lines.map((l) => `${l.qty}× ${l.label}`).join('; ')}`
      ].join('\n');
      setLastInvoiceSummary(summary);
      appendAssistant(
        `Your **${docType}** PDF has been generated (${built.filename}). Use **Download chat summary** for a full transcript PDF, or **Email Enersource** to send the conversation and quote snapshot to ${COMPANY.email}.`,
        [
          { label: 'Email Enersource', action: '__email_team__' },
          { label: 'Download chat summary PDF', action: '__download_summary__' }
        ]
      );
    } catch {
      appendAssistant('Could not generate the PDF. Please try again or contact us at info@enersourcelr.com.');
    } finally {
      setPdfBusy(false);
    }
  }, [appendAssistant, contact.email, contact.name, contact.phone, lines, quoteDocType]);

  const downloadSummaryPdf = useCallback(async () => {
    setPdfBusy(true);
    try {
      const { buildConversationSummaryPdf, downloadPdf } = await loadPdfDocuments();
      const { doc, filename } = await buildConversationSummaryPdf(
        messages.map((m) => ({ role: m.role, text: m.text })),
        lastInvoiceSummary || undefined
      );
      downloadPdf(doc, filename);
      return true;
    } catch {
      appendAssistant('Could not build the summary PDF. Please try again.');
      return false;
    } finally {
      setPdfBusy(false);
    }
  }, [appendAssistant, lastInvoiceSummary, messages]);

  const emailTeam = useCallback(async () => {
    if (!contact.email) {
      appendAssistant('Add your email in the contact fields so Enersource can reply.');
      return;
    }
    setBusy(true);
    try {
      await sendChatTranscriptEmail({
        fromName: contact.name || 'Website visitor',
        fromEmail: contact.email,
        transcriptText,
        invoiceSummary: lastInvoiceSummary || '',
        catalogAppendix: catalogEmailAppendix || undefined
      });

      appendAssistant(
        `Sent to **info@enersourcelr.com**. Use **Download chat summary PDF** if you also want a local copy with the full transcript.`,
        [{ label: 'Main menu', action: 'menu_reset' }]
      );
    } catch {
      appendAssistant(
        'Could not send email from this browser session (check EmailJS env vars or try again). Download the summary PDF and send it to info@enersourcelr.com, or use the Contact page.'
      );
    } finally {
      setBusy(false);
    }
  }, [
    appendAssistant,
    catalogEmailAppendix,
    contact.email,
    contact.name,
    contact.phone,
    lastInvoiceSummary,
    messages,
    transcriptText
  ]);

  const submitText = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    appendUser(text);

    if (text === '__email_team__') {
      await emailTeam();
      return;
    }
    if (text === '__download_summary__') {
      const ok = await downloadSummaryPdf();
      if (ok) {
        appendAssistant('Summary PDF downloaded. Anything else I can help with?', [
          { label: 'Main menu', action: 'menu_reset' }
        ]);
      }
      return;
    }

    if (quotePhase === 'awaiting_contact') {
      const parsed = parseContactBlob(text);
      if (parsed.ok) {
        setContact({ name: parsed.name, email: parsed.email, phone: parsed.phone });
        setQuotePhase('building');
        appendAssistant(
          `Thanks, **${parsed.name}**. Add products, packages, or services below, then tap **Generate PDF**.\n\nIndicative pricing is for planning; Enersource confirms final numbers after review.`,
          []
        );
        return;
      }
      appendAssistant(
        'Please reply with **full name**, **email**, and **phone** in one line, e.g. `Jane Doe, jane@site.com, +231-77-000-0000`. Or fill the fields above the builder.'
      );
      return;
    }

    if (quotePhase === 'none' || quotePhase === 'building') {
      const hit = findProductByUserMessage(text);
      if (hit?.product?.id) {
        const body = describeProduct(hit.product.id);
        if (body) {
          appendAssistant(body, [
            { label: 'PDF quote / invoice (this item)', action: `invoice_product:${hit.product.id}` },
            { label: 'Browse products (pages)', action: 'list_products' },
            { label: 'Packages', action: 'list_packages' },
            { label: 'Services', action: 'list_services' }
          ]);
          return;
        }
      }
    }

    const low = text.toLowerCase();
    if (low === 'menu' || low === 'main menu') {
      setQuotePhase('none');
      setLines([]);
      const w = getWelcomeMessage();
      appendAssistant(w.text, w.suggestions);
      return;
    }

    const free = answerFreeText(text);
    appendAssistant(free.text, free.suggestions);
  }, [
    appendAssistant,
    appendUser,
    downloadSummaryPdf,
    emailTeam,
    input,
    quotePhase,
    describeProduct
  ]);

  const onChip = useCallback(
    (action) => {
      if (action === '__download_summary__') {
        void downloadSummaryPdf();
        return;
      }
      if (action === '__email_team__') {
        void emailTeam();
        return;
      }
      if (action === 'menu_reset') {
        setQuotePhase('none');
        setLines([]);
        const w = getWelcomeMessage();
        setMessages([{ id: uid(), role: 'assistant', text: w.text, suggestions: w.suggestions }]);
        return;
      }
      void onAction(action);
    },
    [downloadSummaryPdf, emailTeam, onAction]
  );

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
            className="mb-1 flex max-h-[min(78vh,32rem)] w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-white/25 bg-primary shadow-2xl shadow-primary/30"
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
                  <p className="text-xs font-semibold text-white/85">Products · packages · quotes · PDF</p>
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

            {proactiveHint && open ? (
              <div className="border-b border-white/15 bg-white/10 px-4 py-3 text-white">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-white/75">
                      Suggestion
                    </div>
                    <div className="mt-1 font-heading text-sm font-extrabold">{proactiveHint.title}</div>
                    <p className="mt-1 text-xs font-semibold leading-relaxed text-white/90">{proactiveHint.body}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg p-1 text-white/85 hover:bg-white/15"
                    aria-label="Dismiss suggestion"
                    onClick={() => setProactiveHint(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}

            <div ref={scrollRef} className="flex min-h-[10rem] flex-1 flex-col gap-3 overflow-y-auto bg-primary p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[95%] rounded-2xl px-3 py-2 text-sm font-semibold leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'rounded-tr-sm bg-white text-primary'
                        : 'rounded-tl-sm border border-white/20 bg-white/10 text-white/95'
                    }`}
                  >
                    <MessageBubbleText text={m.text} />
                    {m.role === 'assistant' && m.suggestions?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.suggestions.map((s) => (
                          <button
                            key={s.action}
                            type="button"
                            className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-extrabold text-white/95 hover:bg-white/20"
                            onClick={() => onChip(s.action)}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {quotePhase === 'awaiting_contact' && (
              <div className="border-t border-white/15 bg-primary px-4 py-3 text-white">
                <div className="text-xs font-extrabold uppercase tracking-wider text-white/75">
                  Your details (for the PDF header)
                </div>
                <div className="mt-2 grid gap-2">
                  <input
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Full name"
                    className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white placeholder:text-white/60"
                  />
                  <input
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    placeholder="Email"
                    type="email"
                    className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white placeholder:text-white/60"
                  />
                  <input
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="Phone"
                    className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white placeholder:text-white/60"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const blob = `${contact.name}, ${contact.email}, ${contact.phone}`;
                      const parsed = parseContactBlob(blob);
                      if (parsed.ok) {
                        setQuotePhase('building');
                        if (PRODUCTS.length) {
                          setPickId((cur) =>
                            cur && PRODUCTS.some((p) => p.id === cur) ? cur : PRODUCTS[0].id
                          );
                        }
                        appendAssistant(
                          `Contact saved for **${parsed.name}**. Add catalog lines below, then generate your PDF.`,
                          []
                        );
                      } else {
                        appendAssistant('Please complete name and a valid email.');
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-xs font-extrabold hover:bg-white/25"
                  >
                    <FileText className="h-4 w-4" />
                    Save &amp; open line builder
                  </button>
                </div>
              </div>
            )}

            {quotePhase === 'building' && (
              <div className="border-t border-white/15 bg-primary px-4 py-3 text-white">
                <div className="text-xs font-extrabold uppercase tracking-wider text-white/75">
                  Quote builder ({quoteDocType})
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="grid gap-1 text-[11px] font-extrabold text-white/80">
                    Type
                    <select
                      value={pickKind}
                      onChange={(e) => {
                        const k = e.target.value;
                        setPickKind(k);
                        if (k === 'product') setPickId(PRODUCTS[0]?.id ?? '');
                        if (k === 'package') setPickId(PACKAGES[0]?.id ?? '');
                        if (k === 'service') setPickId(SERVICES_CATALOG[0]?.id ?? '');
                      }}
                      className="h-9 rounded-lg border border-white/25 bg-white/10 px-2 text-xs font-semibold text-white"
                    >
                      <option value="product">Product</option>
                      <option value="package">Package</option>
                      <option value="service">Service</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-[11px] font-extrabold text-white/80">
                    Item
                    <select
                      value={pickId}
                      onChange={(e) => setPickId(e.target.value)}
                      className="h-9 rounded-lg border border-white/25 bg-white/10 px-2 text-xs font-semibold text-white"
                    >
                      {pickKind === 'product'
                        ? PRODUCTS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))
                        : null}
                      {pickKind === 'package'
                        ? PACKAGES.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))
                        : null}
                      {pickKind === 'service'
                        ? SERVICES_CATALOG.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))
                        : null}
                    </select>
                  </label>
                  <label className="grid gap-1 text-[11px] font-extrabold text-white/80 sm:col-span-2">
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={pickQty}
                      onChange={(e) => setPickQty(e.target.value)}
                      className="h-9 rounded-lg border border-white/25 bg-white/10 px-2 text-xs font-semibold text-white"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={addLineFromCatalog}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-xs font-extrabold hover:bg-white/25"
                >
                  <Plus className="h-4 w-4" />
                  Add line
                </button>

                {lines.length > 0 ? (
                  <ul className="mt-3 grid gap-2 text-xs font-semibold">
                    {lines.map((l) => (
                      <li
                        key={l.id}
                        className="flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/8 px-2 py-2"
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {l.qty}× {l.label}{' '}
                          <span className="text-white/75">(@ USD {l.unitPrice.toFixed(0)})</span>
                        </span>
                        <button
                          type="button"
                          className="shrink-0 rounded-lg p-1.5 hover:bg-white/15"
                          aria-label="Remove line"
                          onClick={() => removeLine(l.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[11px] font-semibold text-white/75">No lines yet.</p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy || pdfBusy}
                    onClick={() => void generateCustomerPdf()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/25 bg-gold px-3 py-2 text-xs font-extrabold text-primary hover:brightness-110 disabled:opacity-60"
                  >
                    {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    Generate PDF
                  </button>
                  <button
                    type="button"
                    disabled={busy || pdfBusy}
                    onClick={() => void downloadSummaryPdf()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-extrabold hover:bg-white/20 disabled:opacity-60"
                  >
                    {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                    Summary PDF
                  </button>
                  <button
                    type="button"
                    disabled={busy || pdfBusy}
                    onClick={() => void emailTeam()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-extrabold hover:bg-white/20 disabled:opacity-60"
                  >
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    Email Enersource
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-white/20 bg-primary p-3">
              <label htmlFor="ai-chat-input" className="sr-only">
                Message
              </label>
              <div className="flex gap-2">
                <input
                  id="ai-chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void submitText();
                  }}
                  placeholder="Ask about solar, services, or say “quote”…"
                  className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white placeholder:text-white/70"
                />
                <button
                  type="button"
                  onClick={() => void submitText()}
                  disabled={busy || pdfBusy}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/15 text-white hover:bg-white/25 disabled:opacity-60"
                  aria-label="Send"
                >
                  {busy || pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          if (open) setOpen(false);
          else openChat();
        }}
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

function MessageBubbleText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-extrabold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
