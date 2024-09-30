import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

async function loadImage(url) {
  const imageBytes = await fetch(url).then((res) => res.arrayBuffer());
  return imageBytes;
}

export const generatePdf = async (salesData) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();

  // Load images from the public directory if needed
  const nairaIconUrl = '/naira.png'; // Path to your Naira icon image in the public directory
  const otherIconUrl = '/naira.png'; // Path to another icon image if needed

  const [nairaIconBytes, otherIconBytes] = await Promise.all([
    loadImage(nairaIconUrl),
    loadImage(otherIconUrl),
  ]);

  const nairaIconImage = await pdfDoc.embedPng(nairaIconBytes);
  const otherIconImage = await pdfDoc.embedPng(otherIconBytes);

  let yOffset = height - 130;
  const pageMargin = 50; // Margin for the page

  // Function to add headers to the page
  const addHeaders = () => {
    page.drawText('Order ID', { x: 50, y: height - 100, size: 20, color: rgb(0, 0, 0) });
    page.drawText('Item', { x: 150, y: height - 100, size: 20, color: rgb(0, 0, 0) });
    page.drawText('Amount', { x: 250, y: height - 100, size: 20, color: rgb(0, 0, 0) });
    page.drawText('Date', { x: 350, y: height - 100, size: 20, color: rgb(0, 0, 0) });
  };

  // Add title
  page.drawText('Sales Report', { x: 50, y: height - 50, size: 30, color: rgb(0, 0, 0) });

  // Add headers on the first page
  addHeaders();

  salesData.forEach((sale) => {
    if (yOffset < pageMargin + 50) {
      // Add a new page and copy headers if necessary
      page = pdfDoc.addPage([600, 400]);
      const newPage = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
      const { width: newWidth, height: newHeight } = newPage.getSize();
      yOffset = newHeight - 130;

      // Add headers to the new page
      addHeaders();
    }

    page.drawText(sale.orderId.toString(), { x: 50, y: yOffset, size: 18, color: rgb(0, 0, 0) });
    page.drawText(sale.item, { x: 150, y: yOffset, size: 18, color: rgb(0, 0, 0) });
    page.drawText(formatCurrency(sale.amount), { x: 250, y: yOffset, size: 18, color: rgb(0, 0, 0) });
    page.drawText(sale.date, { x: 350, y: yOffset, size: 18, color: rgb(0, 0, 0) });

    // Draw FontAwesome icon images if needed
    // page.drawImage(nairaIconImage, { x: 400, y: yOffset - 10, width: 20, height: 20 });
    // page.drawImage(otherIconImage, { x: 430, y: yOffset - 10, width: 20, height: 20 });

    yOffset -= 30;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'sales_report.pdf');
};

function formatCurrency(amount) {
  // Format amount as plain text without currency symbol
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
