import { formatINR } from '../../utils/currency.js';

export default function ExpenseCardList({ expenses, onEdit, onDelete }) {
  return (
    <div className="space-y-4 md:hidden">
      {expenses.map((expense) => (
        <article
          key={expense.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{expense.category}</p>
              <p className="mt-1 text-xs text-gray-500">{expense.date}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">{formatINR(expense.amount)}</p>
          </div>

          {expense.note && (
            <p className="mt-3 text-sm text-gray-600">{expense.note}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => onEdit(expense)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(expense)}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
