import { CATEGORIES, MAX_AMOUNT, MAX_NOTE_LENGTH } from '../constants/categories.js';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function getTodayUTC() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidCalendarDate(dateString) {
  if (!DATE_PATTERN.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validateAmount(amount) {
  if (amount === undefined || amount === null || amount === '') {
    return 'Amount is required';
  }

  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return 'Amount must be a valid number';
  }

  if (amount <= 0) {
    return 'Amount must be a positive number';
  }

  if (amount > MAX_AMOUNT) {
    return `Amount must not exceed ${MAX_AMOUNT}`;
  }

  const rounded = Math.round(amount * 100) / 100;
  if (rounded !== amount) {
    return 'Amount must have at most 2 decimal places';
  }

  return null;
}

function validateCategory(category) {
  if (category === undefined || category === null || category === '') {
    return 'Category is required';
  }

  if (typeof category !== 'string') {
    return 'Category must be a string';
  }

  if (!CATEGORIES.includes(category)) {
    return `Category must be one of: ${CATEGORIES.join(', ')}`;
  }

  return null;
}

function validateDate(date) {
  if (date === undefined || date === null || date === '') {
    return 'Date is required';
  }

  if (typeof date !== 'string') {
    return 'Date must be a string in YYYY-MM-DD format';
  }

  if (!isValidCalendarDate(date)) {
    return 'Date must be a valid date in YYYY-MM-DD format';
  }

  if (date > getTodayUTC()) {
    return 'Future dates are not allowed';
  }

  return null;
}

function validateNote(note) {
  if (note === undefined || note === null || note === '') {
    return null;
  }

  if (typeof note !== 'string') {
    return 'Note must be a string';
  }

  if (note.length > MAX_NOTE_LENGTH) {
    return `Note must not exceed ${MAX_NOTE_LENGTH} characters`;
  }

  return null;
}

export function validateExpenseInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, message: 'Request body must be a valid JSON object' };
  }

  const errors = [
    validateAmount(body.amount),
    validateCategory(body.category),
    validateDate(body.date),
    validateNote(body.note),
  ].filter(Boolean);

  if (errors.length > 0) {
    return { valid: false, message: errors[0] };
  }

  return {
    valid: true,
    data: {
      amount: body.amount,
      category: body.category,
      date: body.date,
      note: body.note ?? '',
    },
  };
}
