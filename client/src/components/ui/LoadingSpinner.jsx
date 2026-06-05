export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
        aria-hidden="true"
      />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
