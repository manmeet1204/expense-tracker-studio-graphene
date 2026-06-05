import { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CATEGORIES } from '../../constants/categories.js';
import { formatINR } from '../../utils/currency.js';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

function transformCategoryTotals(categoryTotals) {
  return CATEGORIES.map((category) => ({
    name: category,
    value: categoryTotals[category] ?? 0,
  })).filter((item) => item.value > 0);
}

export default function CategoryPieChart({ categoryTotals }) {
  const chartData = useMemo(
    () => transformCategoryTotals(categoryTotals),
    [categoryTotals]
  );

  if (chartData.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <p className="text-sm text-gray-500">No spending data available for this month</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-medium text-gray-700">Spending by Category</h3>
      <div
        className="h-64 w-full sm:h-72"
        role="img"
        aria-label="Pie chart showing spending by category for this month"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatINR(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
