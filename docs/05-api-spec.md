# API Specification

GET /api/expenses

Returns all expenses

POST /api/expenses

Create expense

Body

{
  "amount": 500,
  "category": "Food",
  "date": "2026-06-04",
  "note": "Lunch"
}

PUT /api/expenses/:id

Update expense

DELETE /api/expenses/:id

Delete expense

GET /api/summary

Returns

{
  "totalThisMonth": 5000,
  "highestExpense": 1500,
  "categoryTotals": {}
}