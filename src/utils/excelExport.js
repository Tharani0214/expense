// utils/excelExport.js
import * as XLSX from 'xlsx';

export const exportToExcel = (transactions) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
  XLSX.writeFile(workbook, "ExpenseSummary.xlsx");
};
