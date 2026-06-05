import { useState } from 'react';
import { CATEGORIES } from '../../constants/categories.js';

const initialFormState = {
  amount: '',
  category: 'Food',
  date: '',
  note: '',
};

export default function ExpenseForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit({
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note,
      });
      setForm(initialFormState);
    } catch {
      // Error is surfaced by useExpenses; keep form data for retry.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Add Expense</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="amount" className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
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
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="note" className="mb-1 block text-sm font-medium text-gray-700">
            Note
          </label>
          <input
            id="note"
            name="note"
            type="text"
            value={form.note}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Optional note"
            maxLength={200}
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
}
