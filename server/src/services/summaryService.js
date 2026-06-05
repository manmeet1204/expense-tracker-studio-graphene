import { CATEGORIES } from '../constants/categories.js';
import { getThisMonthRange } from '../utils/date.js';
import { getAllExpenses } from './expenseService.js';

function createEmptyCategoryTotals() {
  return CATEGORIES.reduce((totals, category) => {
    totals[category] = 0;
    return totals;
  }, {});
}

export async function getSummary() {
  const expenses = await getAllExpenses();
  const { from, to } = getThisMonthRange();

  const thisMonthExpenses = expenses.filter(
    (expense) => expense.date >= from && expense.date <= to
  );

  const categoryTotals = createEmptyCategoryTotals();
  let totalThisMonth = 0;
  let highestExpense = null;

  for (const expense of thisMonthExpenses) {
    totalThisMonth += expense.amount;
    categoryTotals[expense.category] += expense.amount;

    if (!highestExpense || expense.amount > highestExpense.amount) {
      highestExpense = expense;
    }
  }

  return {
    totalThisMonth,
    highestExpense,
    categoryTotals,
  };
}
