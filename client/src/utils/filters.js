import { getDateRangeFromPreset } from './date.js';

export const DEFAULT_FILTERS = {
  category: 'All',
  datePreset: 'all',
  customFrom: '',
  customTo: '',
};

export function applyCategoryFilter(expenses, category) {
  if (!category || category === 'All') {
    return expenses;
  }

  return expenses.filter((expense) => expense.category === category);
}

export function applyDateFilter(expenses, filters) {
  const { from, to } = getDateRangeFromPreset(
    filters.datePreset,
    filters.customFrom,
    filters.customTo
  );

  if (!from && !to) {
    return expenses;
  }

  return expenses.filter((expense) => {
    const date = expense.date;

    if (from && date < from) {
      return false;
    }

    if (to && date > to) {
      return false;
    }

    return true;
  });
}

export function filterExpenses(expenses, filters) {
  const byCategory = applyCategoryFilter(expenses, filters.category);
  return applyDateFilter(byCategory, filters);
}

export function hasActiveFilters(filters) {
  return (
    filters.category !== DEFAULT_FILTERS.category ||
    filters.datePreset !== DEFAULT_FILTERS.datePreset ||
    filters.customFrom !== DEFAULT_FILTERS.customFrom ||
    filters.customTo !== DEFAULT_FILTERS.customTo
  );
}
