import { useEffect, useState } from 'react';
import { CATEGORIES } from '../../constants/categories.js';

const EMPTY_FORM_STATE = {
  amount: '',
  category: 'Food',
  date: '',
  note: '',
};

function buildFormState(expense) {
  if (!expense) {
    return EMPTY_FORM_STATE;
  }

  return {
    amount: expense.amount.toString(),
    category: expense.category,
    date: expense.date,
    note: expense.note || '',
  };
}

export default function EditExpenseModal({ expense, isOpen, onClose, onSave, loading }) {
  const [form, setForm] = useState(EMPTY_FORM_STATE);

  useEffect(() => {
    if (expense) {
      setForm(buildFormState(expense));
    }
  }, [expense]);

  if (!isOpen || !expense) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSave({
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-expense-title"
      >
        <h2 id="edit-expense-title" className="mb-4 text-lg font-semibold text-gray-900">
          Edit Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-amount" className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="edit-amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              required
              value={form.amount}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="edit-category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="edit-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="edit-date" className="mb-1 block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="edit-date"
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-note" className="mb-1 block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              id="edit-note"
              name="note"
              type="text"
              value={form.note}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
