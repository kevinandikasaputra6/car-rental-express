const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

function createInvoice(invoice, res) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(res);
}

function generateHeader(doc) {
  doc
    .image(
      path.resolve(__dirname, "../../public/uploads/logo-tmmin.jpg"),
      50,
      45,
      {
        width: 50,
      }
    )
    // .fillColor("#444444")
    // .fontSize(20)
    // .text("TMMIN Car Rental.", 110, 57)
    .fontSize(10)
    .text("TMMIN Car Rental.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  console.log(invoice);
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.order_no, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.total), 150, customerInformationTop + 30)

    .font("Helvetica-Bold")

    .text(invoice.users.fullname, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.users.address, 300, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Name",
    "Price",
    "Start Time",
    "Finish Time",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  const position = invoiceTableTop + 1 * 30;
  generateTableRow(
    doc,
    position,
    invoice.cars.name,
    formatCurrency(invoice.cars.price),
    formatDate(invoice.start_time),
    formatDate(invoice.finish_time),
    formatCurrency(invoice.total)
  );

  generateHr(doc, position + 20);

  const subtotalPosition = invoiceTableTop + 2 * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.total)
  );

  //   const paidToDatePosition = subtotalPosition + 20;
  //   generateTableRow(
  //     doc,
  //     paidToDatePosition,
  //     "",
  //     "",
  //     "Paid To Date",
  //     "",
  //     formatCurrency(invoice.paid)
  //   );

  //   const duePosition = paidToDatePosition + 25;
  //   doc.font("Helvetica-Bold");
  //   generateTableRow(
  //     doc,
  //     duePosition,
  //     "",
  //     "",
  //     "Balance Due",
  //     "",
  //     formatCurrency(invoice.subtotal - invoice.paid)
  //   );
  //   doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Invoice was created on a computer and is valid without the signature and seal.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatCurrency.format(cents);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
