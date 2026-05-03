import {
  COMPANY,
  PACKAGES,
  SERVICES_CATALOG,
  findPackageById,
  findServiceById
} from '../data/enersourceKnowledge.js';
import { PRODUCTS, formatProductForChat, lookupCatalogProduct } from '../data/productsCatalog.js';
import { PRODUCT_SEARCH_KEYWORDS } from '../data/productSearchKeywords.js';

function companySummary() {
  return [
    `${COMPANY.legal}`,
    `Founded ${COMPANY.founded} by ${COMPANY.founders}.`,
    COMPANY.mission,
    `We deploy ${COMPANY.deliveryRange}`,
    `Typical clients: ${COMPANY.audiences}`,
    `Office: ${COMPANY.address}`,
    `Email: ${COMPANY.email}`,
    `Phone: ${COMPANY.phones.join(' · ')}`,
    `WhatsApp: ${COMPANY.whatsapp}`,
    `Facebook ${COMPANY.social.facebook}; Instagram ${COMPANY.social.instagram}.`,
    '',
    'Core values:',
    ...COMPANY.values.map((v) => `• ${v}`)
  ].join('\n');
}

function matchFaq(text) {
  const t = text.toLowerCase();

  if (
    /(who are you|about enersource|company|founded|history|mission)/i.test(text)
  ) {
    return companySummary();
  }
  if (/(where|address|location|office|paynesville|liberia)/i.test(text)) {
    return `Our office is at ${COMPANY.address}. Email ${COMPANY.email} or call ${COMPANY.phones[0]}.`;
  }
  if (/(contact|email|phone|whatsapp|call)/i.test(text)) {
    return `Reach Enersource at ${COMPANY.email}, phone ${COMPANY.phones.join(' or ')}, WhatsApp ${COMPANY.whatsapp}.`;
  }
  if (/(quote|quotation|invoice|price|pricing|cost|estimate|pdf)/i.test(text)) {
    return (
      'I can prepare an indicative quotation or invoice-style PDF from our catalog (products, packages, and services). ' +
      'Use **Start quote / invoice** below, pick line items and quantities, then download the PDF. ' +
      'When you’re done, you can email the transcript (and summary) to our team at info@enersourcelr.com.'
    );
  }
  if (/(solar|pv|panel|kw|megawatt|grid|hybrid|off[- ]?grid|battery|storage)/i.test(text)) {
    return (
      `Enersource delivers solar PV from residential scale through commercial plants (${COMPANY.deliveryRange}). ` +
      'We offer hybrid-ready systems, battery storage, design, installation, and maintenance. ' +
      'Tell me if you want package details, a specific product (e.g. SRNE EOS storage), or to start a quote.'
    );
  }
  return null;
}

export function getWelcomeMessage() {
  return {
    text:
      `Hi — I’m the Enersource assistant. I can explain our **company**, **products**, **packages**, and **services**, ` +
      `or walk you through an indicative **quotation or invoice** PDF you can download.\n\n` +
      `What would you like to do?`,
    suggestions: [
      { label: 'Company overview', action: 'company' },
      { label: 'Products', action: 'list_products' },
      { label: 'Packages', action: 'list_packages' },
      { label: 'Services', action: 'list_services' },
      { label: 'Start quote / invoice', action: 'quote_start' }
    ]
  };
}

export function describeProduct(id) {
  const p = lookupCatalogProduct(id);
  if (!p) return null;
  return formatProductForChat(p);
}

const PRODUCT_LIST_PAGE_SIZE = 8;

function normalizeQuery(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Match user free text to a catalog product (same list as /products).
 */
export function findProductByUserMessage(text) {
  const t = normalizeQuery(text);
  if (t.length < 2) return null;

  let best = null;
  let bestScore = 0;

  for (const p of PRODUCTS) {
    let score = 0;
    const idParts = p.id.split('-').filter((x) => x.length >= 2);
    for (const part of idParts) {
      if (part.length >= 2 && t.includes(part)) score += 2;
    }
    if (t.includes(normalizeQuery(p.id).replace(/\s/g, ''))) score += 4;

    const nameTok = normalizeQuery(p.name)
      .split(' ')
      .filter((w) => w.length > 2);
    for (const w of nameTok) {
      if (t.includes(w)) score += 1.2;
    }

    const catTok = normalizeQuery(p.category)
      .split(' ')
      .filter((w) => w.length > 2);
    for (const w of catTok) {
      if (t.includes(w)) score += 0.4;
    }

    const extra = PRODUCT_SEARCH_KEYWORDS[p.id];
    if (extra) {
      for (const kw of extra) {
        const nk = normalizeQuery(kw);
        if (nk.length >= 2 && t.includes(nk)) score += 3.5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  if (!best || bestScore < 4) return null;
  return { product: best, score: bestScore };
}

function productPickerSuggestions(page) {
  const start = page * PRODUCT_LIST_PAGE_SIZE;
  const slice = PRODUCTS.slice(start, start + PRODUCT_LIST_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(PRODUCTS.length / PRODUCT_LIST_PAGE_SIZE));
  const chips = slice.map((p) => ({
    label: (p.name.length > 38 ? `${p.name.slice(0, 36)}…` : p.name),
    action: `product:${p.id}`
  }));
  if (page > 0) {
    chips.unshift({ label: '← Previous', action: `list_products_page:${page - 1}` });
  }
  if (start + PRODUCT_LIST_PAGE_SIZE < PRODUCTS.length) {
    chips.push({ label: 'More products →', action: `list_products_page:${page + 1}` });
  }
  chips.push({ label: 'Start quote / invoice', action: 'quote_start' });
  return { chips, pageLabel: `Page ${page + 1} / ${totalPages}`, start, slice };
}

export function listProductsBlock() {
  return PRODUCTS.map((p) => {
    const unit = p.category === 'Solar module' ? 'per module' : 'per unit';
    const price =
      p.indicativeUnitPrice != null
        ? `Indicative: USD ${p.indicativeUnitPrice.toLocaleString()} ${unit} (estimate).`
        : 'Price on request.';
    return `**${p.name}** (${p.category})\n${p.shortDescription}\n${price}`;
  }).join('\n\n---\n\n');
}

export function listPackagesBlock() {
  return PACKAGES.map(
    (pkg) =>
      `**${pkg.name}** — ${pkg.subtitle}\n${pkg.description}\nHighlights: ${pkg.highlights.join('; ')}.\n${pkg.pricingNote}`
  ).join('\n\n---\n\n');
}

export function listServicesBlock() {
  return SERVICES_CATALOG.map((s) => `**${s.title}**\n${s.details}`).join('\n\n');
}

/**
 * @returns {{ text: string, suggestions?: {label: string, action: string}[] }}
 */
export function handleAction(action, payload) {
  switch (action) {
    case 'company':
      return {
        text: companySummary(),
        suggestions: [
          { label: 'View packages', action: 'list_packages' },
          { label: 'Start quote / invoice', action: 'quote_start' }
        ]
      };
    case 'list_products':
      return {
        text: `Here is our full product catalog (same as the **Products** page). Tap a name below for full specs, or use **More** for additional pages.\n\n${listProductsBlock()}`,
        suggestions: productPickerSuggestions(0).chips
      };
    case 'list_packages':
      return {
        text: `Our main solution packages:\n\n${listPackagesBlock()}`,
        suggestions: PACKAGES.map((p) => ({
          label: `${p.name} (${p.subtitle})`,
          action: `package:${p.id}`
        })).concat([{ label: 'Start quote / invoice', action: 'quote_start' }])
      };
    case 'list_services':
      return {
        text: `Enersource services:\n\n${listServicesBlock()}`,
        suggestions: SERVICES_CATALOG.map((s) => ({
          label: s.title,
          action: `service:${s.id}`
        })).concat([{ label: 'Start quote / invoice', action: 'quote_start' }])
      };
    default:
      if (action.startsWith('list_products_page:')) {
        const page = Math.max(0, parseInt(action.slice('list_products_page:'.length), 10) || 0);
        const { chips, pageLabel, slice } = productPickerSuggestions(page);
        const mini = slice
          .map((p) => `• ${p.name} (${p.category})`)
          .join('\n');
        return {
          text:
            `**${pageLabel}** — tap for full details or PDF.\n\n${mini}\n\nFull catalog with specs is also in the message above or use **Products** in the menu.`,
          suggestions: chips
        };
      }
      if (action.startsWith('product:')) {
        const id = action.slice('product:'.length);
        const body = describeProduct(id);
        return {
          text: body ?? 'Product not found.',
          suggestions: [
            { label: 'PDF quote / invoice (this product)', action: `invoice_product:${id}` },
            { label: 'All products', action: 'list_products' },
            { label: 'Packages', action: 'list_packages' }
          ]
        };
      }
      if (action.startsWith('package:')) {
        const id = action.slice('package:'.length);
        const pkg = findPackageById(id);
        if (!pkg) return { text: 'Package not found.' };
        return {
          text: [
            `**${pkg.name}** (${pkg.subtitle})`,
            pkg.description,
            `Highlights: ${pkg.highlights.join('; ')}.`,
            pkg.pricingNote,
            `Indicative planning figure: USD ${pkg.indicativeUnitPrice.toLocaleString()} (not final).`
          ].join('\n\n'),
          suggestions: [
            { label: 'Start quote with this package', action: 'quote_start' },
            { label: 'All packages', action: 'list_packages' }
          ]
        };
      }
      if (action.startsWith('service:')) {
        const id = action.slice('service:'.length);
        const s = findServiceById(id);
        if (!s) return { text: 'Service not found.' };
        return {
          text: `**${s.title}**\n\n${s.details}`,
          suggestions: [
            { label: 'Include in a quote', action: 'quote_start' },
            { label: 'All services', action: 'list_services' }
          ]
        };
      }
      if (action === 'quote_start') {
        return {
          text:
            'Let’s build an indicative **quotation or invoice** PDF.\n\n' +
            '**Step 1:** Choose document type.\n' +
            'Then I’ll ask for your name and email, and you can add line items (products, packages, services) with quantities.',
          suggestions: [
            { label: 'Quotation (estimate)', action: 'quote_type:quotation' },
            { label: 'Invoice style', action: 'quote_type:invoice' }
          ]
        };
      }
      if (action.startsWith('quote_type:')) {
        const docType = action.endsWith('invoice') ? 'invoice' : 'quotation';
        return {
          text:
            `Document type: **${docType}**.\n\n` +
            `Reply with your **full name**, **email**, and **phone** in one message, e.g.:\n` +
            `Jane Doe, jane@email.com, +231-77-000-0000`,
          suggestions: [{ label: 'Why we need this', action: 'quote_why_contact' }]
        };
      }
      if (action === 'quote_why_contact') {
        return {
          text:
            'We use your details on the PDF header and if you choose to email the summary to Enersource so our team can follow up accurately.',
          suggestions: [{ label: 'Back to document types', action: 'quote_start' }]
        };
      }
      if (action.startsWith('pdf_catalog:')) {
        // handled in widget — open picker UI
        return { text: 'Use the add buttons below to pick catalog lines.', suggestions: [] };
      }
      return { text: 'Choose an option below or ask about Enersource, solar, or pricing.', suggestions: [] };
  }
}

/**
 * Try to parse "Name, email, phone" and friendly chat replies.
 */
export function parseContactBlob(text) {
  const trimmed = text.trim();
  const emailMatch = trimmed.match(/([^\s@]+@[^\s@]+\.[^\s@]+)/);
  const phoneMatch = trimmed.match(/(\+?\d[\d\s\-]{6,}\d)/);

  let name = trimmed;
  if (emailMatch) {
    name = trimmed.slice(0, trimmed.indexOf(emailMatch[1])).replace(/[,;]/g, '').trim();
  }
  const email = emailMatch ? emailMatch[1].trim() : '';
  const phone = phoneMatch ? phoneMatch[1].trim() : '';

  const ok = Boolean(email && name.length >= 2);
  return { name, email, phone, ok };
}

export function answerFreeText(userText) {
  const faq = matchFaq(userText);
  if (faq) {
    return {
      text: faq,
      suggestions: [
        { label: 'Products', action: 'list_products' },
        { label: 'Packages', action: 'list_packages' },
        { label: 'Start quote / invoice', action: 'quote_start' }
      ]
    };
  }

  return {
    text:
      'I can help with Enersource products, packages, services, contact details, or building an indicative PDF quote. ' +
      'Choose a topic below or rephrase your question (e.g. “battery storage”, “commercial solar”, “maintenance”).',
    suggestions: [
      { label: 'Company overview', action: 'company' },
      { label: 'Products', action: 'list_products' },
      { label: 'Packages', action: 'list_packages' },
      { label: 'Services', action: 'list_services' },
      { label: 'Start quote / invoice', action: 'quote_start' }
    ]
  };
}

export { companySummary, matchFaq };
