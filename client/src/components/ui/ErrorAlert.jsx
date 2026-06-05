export default function ErrorAlert({ message, onDismiss }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
      role="alert"
      aria-live="assertive"
    >
      <p className="text-sm">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-sm font-medium text-red-700 hover:text-red-900"
          aria-label="Dismiss error"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
