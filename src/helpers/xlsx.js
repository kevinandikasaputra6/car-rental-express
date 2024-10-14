var XLSX = require("xlsx");

function generateXLSX(title, data, res) {
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, title);
  /* generate buffer */
  var buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  /* set headers */
  res.attachment(`${title} data export.xlsx`);
  return res.status(200).end(buf);
}

function readXLSX(files) {
  const workBook = XLSX.read(files.buffer);
  const json = XLSX.utils.sheet_to_json(
    workBook.Sheets[workBook.SheetNames[0]]
  );
  return json;
}

module.exports = { generateXLSX, readXLSX };
