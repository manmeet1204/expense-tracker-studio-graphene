import { CATEGORIES } from '../../constants/categories.js';
import { formatINR } from '../../utils/currency.js';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorAlert from '../ui/ErrorAlert.jsx';
import SummaryCard from './SummaryCard.jsx';
import CategoryPieChart from './CategoryPieChart.jsx';

export default function SummaryDashboard({ summary, loading, error }) {
  if (loading) {
    return <LoadingSpinner label="Loading summary..." />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!summary) {
    return null;
  }

  const highestExpenseValue = summary.highestExpense
    ? formatINR(summary.highestExpense.amount)
    : formatINR(0);

  const highestExpenseSubtitle = summary.highestExpense
    ? `${summary.highestExpense.category} · ${summary.highestExpense.date}`
    : 'No expenses this month';

  return (
    <section className="space-y-4" aria-labelledby="summary-dashboard-title">
      <h2 id="summary-dashboard-title" className="text-lg font-semibold text-gray-900">
        Summary Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SummaryCard
          title="Total Spent This Month"
          value={formatINR(summary.totalThisMonth)}
        />
        <SummaryCard
          title="Highest Expense"
          value={highestExpenseValue}
          subtitle={highestExpenseSubtitle}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">Category Totals</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORIES.map((category) => (
            <SummaryCard
              key={category}
              title={category}
              value={formatINR(summary.categoryTotals[category])}
            />
          ))}
        </div>
      </div>

      <CategoryPieChart categoryTotals={summary.categoryTotals} />
    </section>
  );
}
