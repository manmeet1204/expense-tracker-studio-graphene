const CSV_HEADERS = ['Date', 'Category', 'Amount', 'Note'];

function escapeCsvValue(value) {
  const stringValue = String(value ?? '');

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function generateExpensesCsv(expenses) {
  const rows = expenses.map((expense) => [
    expense.date,
    expense.category,
    expense.amount,
    expense.note || '',
  ]);

  const lines = [
    CSV_HEADERS.join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ];

  return lines.join('\n');
}

export function getExportFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `expenses-${year}-${month}-${day}.csv`;
}

export function downloadCsv(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function exportExpensesToCsv(expenses) {
  const csvContent = generateExpensesCsv(expenses);
  downloadCsv(csvContent, getExportFilename());
}
