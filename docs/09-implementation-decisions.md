# Implementation Decisions

## Expense Schema

{
  id: string,
  amount: number,
  category: string,
  date: string,
  note: string,
  createdAt: string
}

## ID Strategy

UUID v4

Reason:
Simple, unique, production-friendly.

---

## Amount Rules

- Required
- Positive number only
- Maximum: 999999.99
- Up to 2 decimal places

Examples:

Valid:
100
99.99

Invalid:
-100
100.999

---

## Date Rules

Format:

YYYY-MM-DD

Stored as ISO date string.

Future dates are not allowed.

---

## Note Rules

Optional

Maximum length:

200 characters

---

## createdAt

Set only when expense is created.

Never updated.

---

## Category Validation

Strict enum validation.

Allowed values:

- Food
- Transport
- Bills
- Entertainment
- Other

Reject anything else.

---

## Filtering Strategy

Client-side filtering.

Reason:

Project scope is small.

Backend returns all expenses.

Frontend performs:

- category filtering
- date filtering

---

## Date Range UX

Support:

- All
- This Month
- Last Month
- Custom Range

Custom range is inclusive.

---

## Summary Endpoint

GET /api/summary

Returns:

{
  totalThisMonth: number,
  highestExpense: Expense | null,
  categoryTotals: {
    Food: number,
    Transport: number,
    Bills: number,
    Entertainment: number,
    Other: number
  }
}

---

## Empty Summary

{
  totalThisMonth: 0,
  highestExpense: null,
  categoryTotals: {
    Food: 0,
    Transport: 0,
    Bills: 0,
    Entertainment: 0,
    Other: 0
  }
}

---

## HTTP Status Codes

GET Success:
200

POST Success:
201

PUT Success:
200

DELETE Success:
200

Validation Error:
400

Not Found:
404

Server Error:
500

---

## API Response Shape

Success:

{
  success: true,
  data: {}
}

Error:

{
  success: false,
  message: "Error message"
}

---

## Delete Response

{
  success: true,
  data: null
}

---

## JSON Persistence

File:

server/data/expenses.json

Create automatically if missing.

If corrupted:

Return error.

Do not silently reset data.

---

## State Management

React hooks only.

useState
useMemo
useEffect

No Redux.

No Context API required.

---

## Routing

Single-page application.

No React Router.

---

## Currency

INR

Example:

₹1,234.50

---

## Edit UX

Modal dialog.

---

## Delete UX

Confirmation dialog required.

---

## Mobile Layout

Responsive cards on mobile.

Table on desktop.

---

## Chart Strategy

Pie chart uses summary data.

---

## Testing

Vitest

One backend integration test.

---

## Deployment

Frontend:
Vercel

Backend:
Render

---

## Environment Variables

Backend

PORT

Frontend

VITE_API_URL

---

## Bonus Features

1. JSON persistence
2. CSV export (if time permits)

Priority:
Core requirements first.

## Summary Timezone

All summary calculations use UTC.

Reason:

Consistent behavior across local development and deployment environments.

## Dependencies

Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts

Backend

- Express
- Cors
- UUID
- Vitest