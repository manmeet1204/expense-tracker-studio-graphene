import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/AppError.js';
import { readExpenses, writeExpenses } from '../storage/expenseStorage.js';

export async function getAllExpenses() {
  return readExpenses();
}

export async function createExpense(input) {
  const expenses = await readExpenses();

  const expense = {
    id: uuidv4(),
    amount: input.amount,
    category: input.category,
    date: input.date,
    note: input.note,
    createdAt: new Date().toISOString(),
  };

  expenses.push(expense);
  await writeExpenses(expenses);

  return expense;
}

export async function updateExpense(id, input) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    throw new AppError('Expense not found', 404);
  }

  const existing = expenses[index];

  const updated = {
    id: existing.id,
    amount: input.amount,
    category: input.category,
    date: input.date,
    note: input.note,
    createdAt: existing.createdAt,
  };

  expenses[index] = updated;
  await writeExpenses(expenses);

  return updated;
}

export async function deleteExpense(id) {
  const expenses = await readExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    throw new AppError('Expense not found', 404);
  }

  expenses.splice(index, 1);
  await writeExpenses(expenses);
}
