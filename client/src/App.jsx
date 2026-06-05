import { useState } from 'react';
import { useExpenses } from './hooks/useExpenses.js';
import ExpenseForm from './components/expenses/ExpenseForm.jsx';
import ExpenseTable from './components/expenses/ExpenseTable.jsx';
import ExpenseCardList from './components/expenses/ExpenseCardList.jsx';
import EditExpenseModal from './components/expenses/EditExpenseModal.jsx';
import DeleteConfirmDialog from './components/expenses/DeleteConfirmDialog.jsx';
import LoadingSpinner from './components/ui/LoadingSpinner.jsx';
import ErrorAlert from './components/ui/ErrorAlert.jsx';
import EmptyState from './components/ui/EmptyState.jsx';

export default function App() {
  const {
    expenses,
    loading,
    error,
    actionLoading,
    createExpense,
    updateExpense,
    removeExpense,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [dismissedError, setDismissedError] = useState(false);

  const visibleError = dismissedError ? null : error;

  const handleCreate = async (payload) => {
    setDismissedError(false);
    await createExpense(payload);
  };

  const handleEdit = (expense) => {
    setDismissedError(false);
    setEditingExpense(expense);
  };

  const handleDelete = (expense) => {
    setDismissedError(false);
    setDeletingExpense(expense);
  };

  const handleSaveEdit = async (payload) => {
    await updateExpense(editingExpense.id, payload);
    setEditingExpense(null);
  };

  const handleConfirmDelete = async () => {
    await removeExpense(deletingExpense.id);
    setDeletingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your daily spending</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <ErrorAlert
          message={visibleError}
          onDismiss={() => setDismissedError(true)}
        />

        <ExpenseForm onSubmit={handleCreate} loading={actionLoading} />

        {loading ? (
          <LoadingSpinner label="Loading expenses..." />
        ) : expenses.length === 0 ? (
          <EmptyState message="Add your first expense using the form above." />
        ) : (
          <>
            <ExpenseTable
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <ExpenseCardList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <EditExpenseModal
        expense={editingExpense}
        isOpen={Boolean(editingExpense)}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveEdit}
        loading={actionLoading}
      />

      <DeleteConfirmDialog
        expense={deletingExpense}
        isOpen={Boolean(deletingExpense)}
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
      />
    </div>
  );
}
