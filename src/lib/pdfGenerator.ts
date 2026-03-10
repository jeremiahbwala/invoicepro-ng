import jsPDF from 'jspdf';
import type { Invoice, BusinessInfo } from '@/types';

export async function generateInvoicePDF(invoice: Invoice, businessInfo: BusinessInfo): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Helper functions
  const addText = (text: string, x: number, yPos: number, options?: { bold?: boolean; size?: number; color?: [number, number, number] }) => {
    const size = options?.size || 10;
    doc.setFontSize(size);
    if (options?.bold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    if (options?.color) {
      doc.setTextColor(options.color[0], options.color[1], options.color[2]);
    } else {
      doc.setTextColor(0, 0, 0);
    }
    doc.text(text, x, yPos);
  };

  const addLine = (yPos: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // Header - Business Info
  addText(businessInfo.name || 'My Business', margin, y, { bold: true, size: 24, color: [16, 185, 129] });
  y += 10;
  
  if (businessInfo.address) {
    addText(businessInfo.address, margin, y, { size: 9, color: [100, 100, 100] });
    y += 5;
  }
  if (businessInfo.phone) {
    addText(`Phone: ${businessInfo.phone}`, margin, y, { size: 9, color: [100, 100, 100] });
    y += 5;
  }
  if (businessInfo.email) {
    addText(`Email: ${businessInfo.email}`, margin, y, { size: 9, color: [100, 100, 100] });
    y += 5;
  }

  // Invoice Title & Number
  y += 10;
  addLine(y);
  y += 10;
  
  addText('INVOICE', pageWidth - margin - 40, y - 5, { bold: true, size: 28, color: [16, 185, 129] });
  addText(invoice.invoiceNumber, pageWidth - margin - 40, y + 5, { size: 12, color: [100, 100, 100] });

  // Invoice Details
  y += 15;
  const leftCol = margin;
  const rightCol = pageWidth / 2 + 10;
  
  addText('Bill To:', leftCol, y, { bold: true, size: 10 });
  addText('Invoice Details:', rightCol, y, { bold: true, size: 10 });
  y += 7;
  
  addText(invoice.customerName, leftCol, y, { size: 11 });
  addText(`Issue Date: ${formatDate(invoice.issueDate)}`, rightCol, y, { size: 10 });
  y += 5;
  
  if (invoice.customerAddress) {
    addText(invoice.customerAddress, leftCol, y, { size: 9, color: [100, 100, 100] });
  }
  addText(`Due Date: ${formatDate(invoice.dueDate)}`, rightCol, y, { size: 10 });
  y += 5;
  
  if (invoice.customerPhone) {
    addText(`Phone: ${invoice.customerPhone}`, leftCol, y, { size: 9, color: [100, 100, 100] });
  }
  
  // Status
  y += 5;
  const statusColor: [number, number, number] = invoice.status === 'paid' ? [16, 185, 129] : invoice.status === 'overdue' ? [239, 68, 68] : [245, 158, 11];
  addText(`Status: ${invoice.status.toUpperCase()}`, rightCol, y, { bold: true, size: 11, color: statusColor });

  // Items Table
  y += 20;
  addLine(y - 5);
  
  // Table Header
  const colWidths = [80, 25, 35, 35];
  const colX = [margin, margin + colWidths[0], margin + colWidths[0] + colWidths[1], margin + colWidths[0] + colWidths[1] + colWidths[2]];
  
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 10, 'F');
  
  addText('Description', colX[0] + 2, y + 2, { bold: true, size: 10, color: [255, 255, 255] });
  addText('Qty', colX[1] + 2, y + 2, { bold: true, size: 10, color: [255, 255, 255] });
  addText('Unit Price', colX[2] + 2, y + 2, { bold: true, size: 10, color: [255, 255, 255] });
  addText('Total', colX[3] + 2, y + 2, { bold: true, size: 10, color: [255, 255, 255] });
  
  y += 12;
  
  // Table Rows
  invoice.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(240, 253, 244);
      doc.rect(margin, y - 5, pageWidth - margin * 2, 8, 'F');
    }
    
    addText(item.description, colX[0] + 2, y, { size: 9 });
    addText(item.quantity.toString(), colX[1] + 2, y, { size: 9 });
    addText(formatCurrency(item.unitPrice), colX[2] + 2, y, { size: 9 });
    addText(formatCurrency(item.total), colX[3] + 2, y, { size: 9 });
    y += 8;
  });

  // Totals
  y += 10;
  addLine(y);
  y += 10;
  
  const totalX = pageWidth - margin - 60;
  
  addText('Subtotal:', totalX - 20, y, { size: 10 });
  addText(formatCurrency(invoice.subtotal), totalX + 30, y, { size: 10 });
  y += 7;
  
  if (invoice.tax > 0) {
    addText(`Tax (${invoice.taxRate}%):`, totalX - 20, y, { size: 10 });
    addText(formatCurrency(invoice.tax), totalX + 30, y, { size: 10 });
    y += 7;
  }
  
  addLine(y);
  y += 7;
  
  addText('TOTAL:', totalX - 20, y, { bold: true, size: 14 });
  addText(formatCurrency(invoice.total), totalX + 30, y, { bold: true, size: 14, color: [16, 185, 129] });

  // Notes
  if (invoice.notes) {
    y += 20;
    addText('Notes:', margin, y, { bold: true, size: 10 });
    y += 7;
    
    const splitNotes = doc.splitTextToSize(invoice.notes, pageWidth - margin * 2);
    addText(splitNotes, margin, y, { size: 9, color: [100, 100, 100] });
  }

  // Payment Terms
  if (invoice.paymentTerms) {
    y += 15;
    addText('Payment Terms:', margin, y, { bold: true, size: 10 });
    y += 7;
    
    const splitTerms = doc.splitTextToSize(invoice.paymentTerms, pageWidth - margin * 2);
    addText(splitTerms, margin, y, { size: 9, color: [100, 100, 100] });
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  addLine(footerY - 10);
  addText('Thank you for your business!', pageWidth / 2, footerY, { size: 9, color: [100, 100, 100] });
  addText('Generated by InvoicePro NG', pageWidth / 2, footerY + 5, { size: 8, color: [150, 150, 150] });

  // Save PDF
  doc.save(`${invoice.invoiceNumber}.pdf`);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
