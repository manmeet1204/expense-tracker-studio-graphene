function formatUTCDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function getUTCMonthRange(year, monthIndex) {
  const from = formatUTCDate(year, monthIndex + 1, 1);
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const to = formatUTCDate(year, monthIndex + 1, lastDay);

  return { from, to };
}

export function getThisMonthRange() {
  const now = new Date();
  return getUTCMonthRange(now.getUTCFullYear(), now.getUTCMonth());
}
