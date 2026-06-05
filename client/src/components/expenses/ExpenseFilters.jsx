import { CATEGORIES } from '../../constants/categories.js';
import { DATE_PRESETS } from '../../utils/date.js';
import { hasActiveFilters } from '../../utils/filters.js';

export default function ExpenseFilters({ filters, onChange, onClear }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  const showCustomRange = filters.datePreset === DATE_PRESETS.CUSTOM;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filter-category" className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="filter-category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-date-preset" className="mb-1 block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <select
            id="filter-date-preset"
            name="datePreset"
            value={filters.datePreset}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={DATE_PRESETS.ALL}>All</option>
            <option value={DATE_PRESETS.THIS_MONTH}>This Month</option>
            <option value={DATE_PRESETS.LAST_MONTH}>Last Month</option>
            <option value={DATE_PRESETS.CUSTOM}>Custom Range</option>
          </select>
        </div>

        {showCustomRange && (
          <>
            <div>
              <label htmlFor="filter-custom-from" className="mb-1 block text-sm font-medium text-gray-700">
                From
              </label>
              <input
                id="filter-custom-from"
                name="customFrom"
                type="date"
                value={filters.customFrom}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="filter-custom-to" className="mb-1 block text-sm font-medium text-gray-700">
                To
              </label>
              <input
                id="filter-custom-to"
                name="customTo"
                type="date"
                value={filters.customTo}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
