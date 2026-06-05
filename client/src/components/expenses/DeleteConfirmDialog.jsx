import { formatINR } from '../../utils/currency.js';
import { useEscapeKey } from '../../hooks/useEscapeKey.js';

export default function DeleteConfirmDialog({
  expense,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {
  useEscapeKey(isOpen && Boolean(expense), onClose);

  if (!isOpen || !expense) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-expense-title"
        aria-describedby="delete-expense-description"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-expense-title" className="text-lg font-semibold text-gray-900">
          Delete Expense
        </h2>

        <p id="delete-expense-description" className="mt-3 text-sm text-gray-600">
          Are you sure you want to delete this expense?
        </p>

        <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">{expense.category}</span> —{' '}
            {formatINR(expense.amount)}
          </p>
          <p className="mt-1 text-gray-500">{expense.date}</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
