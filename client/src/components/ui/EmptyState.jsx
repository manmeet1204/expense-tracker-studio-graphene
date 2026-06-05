export default function EmptyState({ title = 'No expenses yet', message }) {
  return (
    <div
      className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  );
}
