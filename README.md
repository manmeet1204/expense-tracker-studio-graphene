# Expense Tracker — Studio Graphene

A full-stack expense tracking application built for the Studio Graphene Full Stack Developer assessment. Users can record daily spending, filter expenses, and view a monthly summary dashboard with category breakdowns.

---

## Brief Description

Expense Tracker is a single-page React application backed by a REST API. It supports full expense CRUD, client-side filtering by category and date range, a UTC-based monthly summary, and a category pie chart. Data persists to a JSON file on the server.

**Implemented capabilities:**

- Add, edit, delete, and view expenses
- Filter by category (All, Food, Transport, Bills, Entertainment, Other)
- Filter by date range (All, This Month, Last Month, Custom Range — UTC boundaries)
- Summary dashboard: total spent this month, highest expense, per-category totals
- Pie chart visualising category spending for the current UTC month
- INR currency formatting
- Server-side input validation
- Loading, error, and empty states
- Responsive layout (table on desktop, cards on mobile)
- JSON file persistence across server restarts

---

## Live Demo

| Environment | URL |
|-------------|-----|
| Frontend (Vercel) | [https://expense-tracker-studio-graphene-silk.vercel.app/](https://expense-tracker-studio-graphene-silk.vercel.app/) |
| Backend (Render) | [https://expense-tracker-studio-graphene.onrender.com](https://expense-tracker-studio-graphene.onrender.com) |
| API Health Check | [https://expense-tracker-studio-graphene.onrender.com/api/health](https://expense-tracker-studio-graphene.onrender.com/api/health) |

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| Vite 8 | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling |
| Axios | HTTP client |
| Recharts 3 | Category spending pie chart |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express 5 | REST API framework |
| CORS | Cross-origin requests |
| UUID v4 | Expense ID generation |
| JSON file | Data persistence (`server/data/expenses.json`) |

### Testing

| Technology | Purpose |
|------------|---------|
| Vitest | Test runner |
| Supertest | HTTP integration testing |

---

## Architecture Overview

### High-level flow

```
React Client
    ↓  Axios
Express REST API
    ↓
Controller  →  Validator
    ↓
Service
    ↓
JSON Storage (expenses.json)
```

### Backend layers

| Layer | Responsibility |
|-------|----------------|
| **Routes** | Map HTTP verbs and paths to controllers |
| **Controllers** | Parse requests, call services, return response envelopes |
| **Validators** | Enforce input rules (amount, category, date, note) |
| **Services** | Business logic — CRUD orchestration and summary calculations |
| **Storage** | Read/write `server/data/expenses.json` |

### Frontend layers

| Layer | Responsibility |
|-------|----------------|
| **Components** | UI — forms, tables, cards, modals, dashboard, chart |
| **Hooks** | State management (`useExpenses`, `useSummary`, `useEscapeKey`) |
| **Services** | Axios API client |
| **Utils** | Currency formatting, date ranges, client-side filters |

### Key design choices

- **No Redux or Context API** — React hooks only
- **No React Router** — single-page layout
- **Client-side filtering** — backend returns all expenses; frontend filters in memory
- **Summary is server-computed** — `GET /api/summary` uses UTC month boundaries
- **Table filters are independent** — summary dashboard always reflects the current UTC month, not active list filters

---

## Folder Structure

```
expense-tracker-studio-graphene/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/           # SummaryDashboard, SummaryCard, CategoryPieChart
│   │   │   ├── expenses/            # Form, table, cards, filters, modals
│   │   │   └── ui/                  # LoadingSpinner, ErrorAlert, EmptyState
│   │   ├── constants/               # Category enum
│   │   ├── hooks/                   # useExpenses, useSummary, useEscapeKey
│   │   ├── services/                # Axios API client
│   │   ├── utils/                   # currency, date, filters
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                          # Express backend
│   ├── src/
│   │   ├── constants/               # Categories, validation limits
│   │   ├── controllers/             # expenseController, summaryController
│   │   ├── middleware/              # Error handler
│   │   ├── routes/                  # expenseRoutes, summaryRoutes
│   │   ├── services/                # expenseService, summaryService
│   │   ├── storage/                 # expenseStorage (JSON file I/O)
│   │   ├── validators/              # expenseValidator
│   │   ├── utils/                   # response helpers, UTC date utils
│   │   └── app.js
│   ├── tests/                       # Vitest integration tests
│   ├── data/                        # expenses.json (runtime, gitignored)
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── vitest.config.js
└── docs/                            # Requirements and architecture documentation
```

---

## Installation

### Prerequisites

- Node.js 18 or later
- npm

### Steps

```bash
# Clone the repository
git clone https://github.com/manmeet1204/expense-tracker-studio-graphene.git
cd expense-tracker-studio-graphene

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## Environment Variables

### Backend (`server/.env`)

Copy the example file and adjust as needed:

```bash
cd server
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server listen port |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |

### Frontend (`client/.env`)

```bash
cd client
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001/api` | Backend API base URL |

> During local development, Vite proxies `/api` to `http://localhost:3001`, so `VITE_API_URL` is optional if you rely on the proxy.

---

## Running Locally

Open two terminals:

### Terminal 1 — Backend

```bash
cd server
npm run dev
```

Server starts at **https://expense-tracker-studio-graphene.onrender.com**

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

App opens at **https://expense-tracker-studio-graphene-silk.vercel.app**

### Production build (frontend)

```bash
cd client
npm run build
npm run preview
```

### Production start (backend)

```bash
cd server
npm start
```

---

## API Documentation

All endpoints return a uniform envelope:

**Success:**
```json
{ "success": true, "data": {} }
```

**Error:**
```json
{ "success": false, "message": "Error message" }
```

### Expense object

```json
{
  "id": "uuid-v4",
  "amount": 500,
  "category": "Food",
  "date": "2026-06-04",
  "note": "Lunch",
  "createdAt": "2026-06-05T15:08:38.717Z"
}
```

**Categories:** `Food`, `Transport`, `Bills`, `Entertainment`, `Other`

**Validation rules:**

| Field | Rules |
|-------|-------|
| `amount` | Required, positive, max 999999.99, up to 2 decimal places |
| `category` | Required, strict enum |
| `date` | Required, `YYYY-MM-DD`, no future dates (UTC) |
| `note` | Optional, max 200 characters |
| `id` | Server-generated UUID v4 on create |
| `createdAt` | Server-generated ISO timestamp on create; never updated |

---

### `GET /api/health`

Health check.

**Response:** `200`

```json
{ "success": true, "data": { "status": "ok" } }
```

---

### `GET /api/expenses`

Returns all expenses.

**Response:** `200`

```json
{
  "success": true,
  "data": [ { "id": "...", "amount": 500, "category": "Food", "date": "2026-06-04", "note": "Lunch", "createdAt": "..." } ]
}
```

---

### `POST /api/expenses`

Creates a new expense.

**Request body:**

```json
{
  "amount": 500,
  "category": "Food",
  "date": "2026-06-04",
  "note": "Lunch"
}
```

**Response:** `201` — returns the created expense object in `data`.

---

### `PUT /api/expenses/:id`

Updates an existing expense. Preserves `id` and `createdAt`.

**Request body:** Same as POST.

**Responses:**

| Status | Condition |
|--------|-----------|
| `200` | Updated expense in `data` |
| `400` | Validation error |
| `404` | Expense not found |

---

### `DELETE /api/expenses/:id`

Deletes an expense.

**Response:** `200`

```json
{ "success": true, "data": null }
```

**Error:** `404` if expense not found.

---

### `GET /api/summary`

Returns spending analytics for the **current UTC calendar month**.

**Response:** `200`

```json
{
  "success": true,
  "data": {
    "totalThisMonth": 5000,
    "highestExpense": {
      "id": "...",
      "amount": 1500,
      "category": "Bills",
      "date": "2026-06-02",
      "note": "Rent",
      "createdAt": "..."
    },
    "categoryTotals": {
      "Food": 1200,
      "Transport": 800,
      "Bills": 1500,
      "Entertainment": 0,
      "Other": 500
    }
  }
}
```

**Empty month:**

```json
{
  "success": true,
  "data": {
    "totalThisMonth": 0,
    "highestExpense": null,
    "categoryTotals": {
      "Food": 0,
      "Transport": 0,
      "Bills": 0,
      "Entertainment": 0,
      "Other": 0
    }
  }
}
```

---

### HTTP status codes

| Code | Usage |
|------|-------|
| `200` | Successful GET, PUT, DELETE |
| `201` | Successful POST (create) |
| `400` | Validation error or invalid JSON body |
| `404` | Route or expense not found |
| `500` | Server or storage error (e.g. corrupted JSON file) |

---

## Testing

### Backend integration test

One integration test covers the create-and-read flow:

```
POST /api/expenses  →  201, UUID + createdAt assigned
GET  /api/expenses  →  200, created expense in list
```

Run tests:

```bash
cd server
npm test
```

Tests use an isolated data file (`tests/test-expenses.json`) and do not modify `server/data/expenses.json`.

---

## Deployment

### Backend — Render

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect the repository and set the root directory to `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Set environment variables:
   - `PORT` — provided by Render
   - `CLIENT_URL` — `https://expense-tracker-studio-graphene-silk.vercel.app`

### Frontend — Vercel

1. Import the repository on [Vercel](https://vercel.com).
2. Set the root directory to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variable:
   - `VITE_API_URL` — `https://expense-tracker-studio-graphene.onrender.com/api`

### Production environment variables

| Service | Variable | Value |
|---------|----------|-------|
| Render (backend) | `CLIENT_URL` | `https://expense-tracker-studio-graphene-silk.vercel.app` |
| Vercel (frontend) | `VITE_API_URL` | `https://expense-tracker-studio-graphene.onrender.com/api` |

### Post-deployment checklist

- [x] Frontend deployed to Vercel
- [x] Backend deployed to Render
- [ ] Verify CRUD, filters, summary, and pie chart work end-to-end in production
- [ ] Confirm data persists after a Render service restart

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | JavaScript (not TypeScript) | Keeps scope lean; easy to explain in interview |
| State management | React hooks only | No Redux or Context — sufficient for single-page scope |
| Routing | None (single-page) | All features fit one view |
| Filtering | Client-side | Small dataset; backend returns full list |
| Date presets | UTC month boundaries | Aligns client filters with server summary calculations |
| Persistence | JSON file | Assessment requirement; simple and interview-friendly |
| ID generation | UUID v4 | Unique, no coordination needed |
| Edit UX | Modal dialog | Keeps list visible; clear focus |
| Delete UX | Confirmation dialog | Prevents accidental deletion |
| Add UX | Inline form above list | Fast add flow without extra clicks |
| Currency | INR (`en-IN` locale) | Assessment decision |
| Chart data | From `/api/summary` only | Single source of truth for monthly analytics |
| Post-mutation refetch | Silent (no full-page spinner) | List and dashboard update without UI flash |

---

## Accessibility Improvements

The following accessibility enhancements are implemented:

- **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<article>`, table `<th scope="col">`
- **ARIA roles** — `role="alert"`, `role="status"`, `role="dialog"`, `aria-modal`, `aria-live`
- **Label associations** — all form inputs have linked `<label htmlFor>` attributes; filter IDs are prefixed to avoid duplicates
- **Action button labels** — `aria-label` on Edit/Delete buttons (e.g. "Edit Food expense")
- **Modal keyboard support** — Escape key closes edit and delete dialogs
- **Modal backdrop** — click outside dialog to close
- **Delete dialog** — `aria-describedby` links heading to confirmation text
- **Chart** — `role="img"` with descriptive `aria-label`
- **Loading spinner** — `aria-live="polite"` announces loading state
- **Error alerts** — `aria-live="assertive"` announces API errors
- **Mobile touch targets** — minimum 44px height on card action buttons
- **Note field** — `maxLength={200}` prevents over-length input before server rejection

---

## Future Improvements

Items not yet implemented but documented as bonus or deferred scope:

- **CSV export** — client-side download of filtered expenses (bonus feature)
- **Frontend validation** — mirror server rules with inline field-level error messages
- **Additional tests** — summary endpoint integration test, validation error cases
- **Focus trap in modals** — trap keyboard focus inside open dialogs
- **Code splitting** — reduce frontend bundle size (Recharts adds significant weight)

---

## Documentation

Further project documentation is available in the [`docs/`](docs/) folder:

- [`00-ai-context.md`](docs/00-ai-context.md) — Assessment context and evaluation priorities
- [`02-prd.md`](docs/02-prd.md) — Product requirements
- [`03-architecture.md`](docs/03-architecture.md) — Architecture overview
- [`05-api-spec.md`](docs/05-api-spec.md) — API specification
- [`09-implementation-decisions.md`](docs/09-implementation-decisions.md) — Locked implementation decisions

