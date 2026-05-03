import { COMPANY } from '../data/enersourceKnowledge.js';

function footer(doc, pageW, pageH) {
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(
    `${COMPANY.name} · ${COMPANY.email} · ${COMPANY.address}`,
    pageW / 2,
    pageH - 10,
    { align: 'center' }
  );
}

/**
 * @param {object} opts
 * @param {'quotation'|'invoice'} opts.docType
 * @param {string} opts.customerName
 * @param {string} opts.customerEmail
 * @param {string} opts.customerPhone
 * @param {{ description: string; qty: number; unitPrice: number }[]} opts.lines
 * @param {string} [opts.notes]
 */
export async function buildQuoteOrInvoicePdf(opts) {
  const { jsPDF } = await import('jspdf');
  const { docType, customerName, customerEmail, customerPhone, lines, notes } = opts;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const title = docType === 'invoice' ? 'TAX INVOICE / INVOICE' : 'QUOTATION / PROFORMA';
  const refLabel = docType === 'invoice' ? 'Invoice #' : 'Quote #';
  const refId = `ES-${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date().toLocaleString('en-LR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  doc.setFillColor(198, 40, 40);
  doc.rect(0, 0, pageW, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(COMPANY.name, 14, 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(title, 14, 24);

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let y = 38;
  doc.text(`${refLabel} ${refId}`, 14, y);
  doc.text(`Date: ${dateStr}`, pageW - 14, y, { align: 'right' });
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Bill to', 14, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  doc.text(customerName || '—', 14, y);
  y += 5;
  doc.text(customerEmail || '—', 14, y);
  y += 5;
  doc.text(customerPhone || '—', 14, y);
  y += 12;

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    'Indicative figures for planning. Final pricing, taxes/duties, shipping, and terms are confirmed by Enersource in writing after site review.',
    14,
    y,
    { maxWidth: pageW - 28 }
  );
  y += 12;
  doc.setTextColor(30, 30, 30);

  const tableTop = y;
  doc.setFillColor(245, 245, 245);
  doc.rect(14, tableTop - 6, pageW - 28, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 16, tableTop);
  doc.text('Qty', pageW - 70, tableTop);
  doc.text('Unit (USD)', pageW - 48, tableTop);
  doc.text('Line total', pageW - 16, tableTop, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  y = tableTop + 6;

  let subtotal = 0;
  for (const row of lines) {
    const lineTotal = row.qty * row.unitPrice;
    subtotal += lineTotal;
    const descLines = doc.splitTextToSize(row.description, pageW - 56);
    doc.text(descLines, 16, y + 5);
    doc.text(String(row.qty), pageW - 70, y + 5);
    doc.text(row.unitPrice.toFixed(2), pageW - 48, y + 5);
    doc.text(lineTotal.toFixed(2), pageW - 16, y + 5, { align: 'right' });
    y += Math.max(10, descLines.length * 5 + 4);
    if (y > pageH - 40) {
      doc.addPage();
      y = 20;
    }
  }

  y += 8;
  doc.setDrawColor(220);
  doc.line(14, y, pageW - 14, y);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal (USD)', pageW - 50, y);
  doc.text(subtotal.toFixed(2), pageW - 16, y, { align: 'right' });
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('Taxes, duties, logistics, and discounts may apply.', 14, y);
  y += 10;

  if (notes) {
    doc.setFontSize(9);
    doc.setTextColor(40);
    doc.text('Notes:', 14, y);
    y += 5;
    const nLines = doc.splitTextToSize(notes, pageW - 28);
    doc.text(nLines, 14, y);
    y += nLines.length * 5 + 6;
  }

  footer(doc, pageW, pageH);

  const filename = `${docType === 'invoice' ? 'Enersource-Invoice' : 'Enersource-Quotation'}-${refId}.pdf`;
  return { doc, filename, refId, subtotal };
}

/**
 * @param {{ role: string; text: string }[]} messages
 * @param {string} [invoiceSummary]
 */
export async function buildConversationSummaryPdf(messages, invoiceSummary) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  doc.setFillColor(198, 40, 40);
  doc.rect(0, 0, pageW, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Conversation summary (website assistant)', 14, 14);

  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  let y = 30;
  doc.text(`Generated: ${new Date().toLocaleString('en-LR')}`, 14, y);
  y += 10;

  if (invoiceSummary) {
    doc.setFont('helvetica', 'bold');
    doc.text('Quote / invoice snapshot', 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    const invLines = doc.splitTextToSize(invoiceSummary, pageW - 28);
    doc.text(invLines, 14, y);
    y += invLines.length * 5 + 10;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Transcript', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');

  for (const m of messages) {
    const label = m.role === 'user' ? 'You' : 'Assistant';
    doc.setFont('helvetica', 'bold');
    const head = `${label}:`;
    if (y > pageH - 30) {
      doc.addPage();
      y = 20;
    }
    doc.text(head, 14, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const body = doc.splitTextToSize(m.text, pageW - 28);
    doc.text(body, 14, y);
    y += body.length * 5 + 5;
  }

  footer(doc, pageW, pageH);

  return {
    doc,
    filename: `Enersource-Chat-Summary-${Date.now().toString(36)}.pdf`
  };
}

export function downloadPdf(doc, filename) {
  doc.save(filename);
}
