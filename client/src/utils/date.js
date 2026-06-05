export const DATE_PRESETS = {
  ALL: 'all',
  THIS_MONTH: 'thisMonth',
  LAST_MONTH: 'lastMonth',
  CUSTOM: 'custom',
};

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

export function getLastMonthRange() {
  const now = new Date();
  const monthIndex = now.getUTCMonth();
  const year = monthIndex === 0 ? now.getUTCFullYear() - 1 : now.getUTCFullYear();
  const lastMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;

  return getUTCMonthRange(year, lastMonthIndex);
}

export function isDateInRange(date, from, to) {
  if (from && date < from) {
    return false;
  }

  if (to && date > to) {
    return false;
  }

  return true;
}

export function getDateRangeFromPreset(preset, customFrom, customTo) {
  switch (preset) {
    case DATE_PRESETS.THIS_MONTH:
      return getThisMonthRange();
    case DATE_PRESETS.LAST_MONTH:
      return getLastMonthRange();
    case DATE_PRESETS.CUSTOM:
      return { from: customFrom || null, to: customTo || null };
    case DATE_PRESETS.ALL:
    default:
      return { from: null, to: null };
  }
}
