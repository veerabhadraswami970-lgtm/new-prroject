# AI-Powered Agriculture Crop Advisory Assistant

A production-ready, full-stack feedback management application designed to collect, validate, and securely store feedback for an AI-Powered Agriculture Crop Advisory platform. Built with React, TypeScript, Tailwind CSS, Node.js, Express, and Supabase PostgreSQL with Row Level Security (RLS).

---

## Architecture Overview

```text
┌─────────────────────────────────┐
│     React 18 + Tailwind CSS     │  (Port 5173)
│   • Form Validation (Zod)       │
│   • Supabase Auth (Session)     │
└───────────────┬─────────────────┘
                │ HTTP REST (/api)
                ▼
┌─────────────────────────────────┐
│     Node.js + Express.js        │  (Port 5000)
│   • Helmet & CORS Protection    │
│   • Rate Limiting Throttling    │
│   • Strict Zod Schema Parsing   │
│   • Token Auth Verification     │
└───────────────┬─────────────────┘
                │ Server Client
                ▼
┌─────────────────────────────────┐
│      Supabase PostgreSQL        │
│   • feedback table              │
│   • Row Level Security (RLS)    │
│   • UUID Primary Keys           │
└─────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom agriculture color palette
- **Routing**: React Router v6
- **Validation**: Zod
- **Icons**: Lucide React
- **Auth Client**: Supabase JS SDK (Auth session management only)

### Backend
- **Runtime**: Node.js (v20+ LTS recommended)
- **Framework**: Express.js with TypeScript
- **Validation**: Zod (Authoritative server-side validation)
- **Security**: Helmet, CORS allowlist, Express Rate Limit
- **Database Client**: `@supabase/supabase-js`
- **Testing**: Vitest & Supertest
- **Logging**: Pino

### Database
- **Database**: Supabase PostgreSQL
- **Security**: Row Level Security (RLS) with user isolation
- **Schema Management**: SQL migrations committed in Git (`backend/supabase/migrations/`)

---

## Folder Structure

```text
veera proj/
├── .gitignore                          # Root ignore for secrets, node_modules, build outputs
├── package.json                        # Root workspace scripts
├── README.md                           # Master project documentation
│
├── backend/                            # Express REST API
│   ├── .env.example                    # Backend environment template
│   ├── .env                            # Local development configuration (git-ignored)
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│   ├── supabase/
│   │   └── migrations/
│   │       └── 20261027000000_create_feedback_table.sql # Database migration SQL
│   ├── src/
│   │   ├── config/env.ts               # Startup configuration & Zod env validation
│   │   ├── controllers/feedback.controller.ts # Route controller logic
│   │   ├── lib/logger.ts               # Structured logger with redaction
│   │   ├── lib/supabase.ts             # Supabase server client & auth handler
│   │   ├── middleware/authenticate.ts  # Token verification & session extraction
│   │   ├── middleware/errorHandler.ts  # Centralized error & 404 handler
│   │   ├── middleware/rateLimiter.ts   # Rate limiting throttler
│   │   ├── middleware/validateRequest.ts # Zod request body/query validation
│   │   ├── routes/feedback.routes.ts   # POST /api/feedback, GET /api/feedback/mine
│   │   ├── routes/health.routes.ts     # GET /api/health
│   │   ├── schemas/feedback.schema.ts  # Strict Zod schemas & constraints
│   │   ├── services/feedback.service.ts # Supabase persistence operations
│   │   ├── types/index.ts              # TypeScript interfaces
│   │   ├── app.ts                      # Express app configuration
│   │   └── server.ts                   # Server bootstrap & graceful shutdown
│   └── tests/
│       ├── feedback.schema.test.ts     # Unit tests for schema validation
│       └── feedback.routes.test.ts     # Integration tests with Supertest
│
└── frontend/                           # React Client
    ├── .env.example                    # Frontend environment template
    ├── .env                            # Local configuration (git-ignored)
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── README.md
    └── src/
        ├── components/
        │   ├── auth/AuthForm.tsx       # Login & signup form
        │   ├── auth/ProtectedRoute.tsx  # Route guard for authenticated pages
        │   ├── common/ErrorMessage.tsx # Accessible error alert with retry
        │   ├── common/LoadingSpinner.tsx
        │   ├── common/EmptyState.tsx
        │   ├── feedback/FeedbackForm.tsx # Core feedback submission form
        │   ├── feedback/FeedbackCategorySelect.tsx # Category selector with icons
        │   ├── feedback/StarRating.tsx # 1–5 Star interactive rating
        │   ├── feedback/FeedbackTextarea.tsx # 10–2000 char counter textarea
        │   ├── feedback/ConsentCheckbox.tsx # Mandatory consent checkbox
        │   ├── feedback/SubmitButton.tsx # Loading state & duplicate-click prevention
        │   ├── feedback/FeedbackSuccessMessage.tsx # Confirmation receipt card
        │   ├── feedback/FeedbackHistoryItem.tsx
        │   ├── feedback/FeedbackHistoryList.tsx # Paginated list of user submissions
        │   └── layout/Navbar.tsx, Footer.tsx, AppLayout.tsx, PageContainer.tsx
        ├── context/AuthContext.tsx     # Supabase Auth state provider
        ├── lib/api.ts                  # Backend REST API client
        ├── lib/supabase.ts             # Browser Supabase client
        ├── lib/validation.ts           # Frontend Zod schemas
        ├── pages/                      # HomePage, FeedbackPage, LoginPage, SignupPage, MyFeedbackPage, NotFoundPage
        ├── types/index.ts              # Shared frontend interfaces
        ├── App.tsx                     # Router setup
        └── index.css                   # Tailwind base styles
```

---

## Getting Started & Installation

### Prerequisites
- Node.js LTS (v20.x or higher)
- npm (v10.x or higher)
- A Supabase account (free tier works)

### 1. Install Dependencies

You can install all dependencies from the root directory:

```bash
# In the project root:
npm run install:all
```

Or install separately in each folder:

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

## Database Setup & SQL Migration

1. Log into your [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. In the left navigation, open the **SQL Editor**.
3. Copy and run the migration script located at:
   `backend/supabase/migrations/20261027000000_create_feedback_table.sql`
4. The migration will:
   - Create the `public.feedback` table with constraints on `rating` (1–5), `message` length (10–2000), `name` (≤100), and `email` (≤254).
   - Create indexes on `(user_id, created_at DESC)`, `created_at`, and `category`.
   - Enable Row Level Security (RLS).
   - Configure policies allowing authenticated users to select, insert, and update only their own rows (`auth.uid() = user_id`).
   - Prevent anonymous direct queries via client SDK (anonymous submissions are handled exclusively through the validated Express API).

---

## Environment Configuration

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Configure your parameters:

```dotenv
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Replace with credentials from Supabase Dashboard -> Project Settings -> API
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
JSON_BODY_LIMIT=20kb
LOG_LEVEL=info
```

### Frontend (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
```

Configure the public variables:

```dotenv
VITE_APP_NAME=AI-Powered Agriculture Crop Advisory Assistant
VITE_API_BASE_URL=http://localhost:5000/api

# Replace with your Supabase Project URL and publishable anon key
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
```

> **Security Note:** Never place the `SUPABASE_SECRET_KEY` (service-role key) or database credentials into frontend files or any variable beginning with `VITE_`.

---

## Running the Application

### Running Concurrently (Root)

```bash
# Starts both backend (port 5000) and frontend (port 5173)
npm run dev
```

### Running Individually

**Backend:**
```bash
cd backend
npm run dev
```
Backend API will be live at `http://localhost:5000/api/health`.

**Frontend:**
```bash
cd frontend
npm run dev
```
Frontend client will be live at `http://localhost:5173`.

---

## Testing & Quality Assurance

### Run Backend Automated Tests

```bash
cd backend
npm test
```

Runs 25 automated unit and integration tests covering:
- Schema validation with Zod (valid payloads, boundary checks, email formats, character constraints).
- Security rejection of unknown fields (strict object validation).
- Health check endpoint verification (`GET /api/health`).
- Unauthenticated rejection on private history (`GET /api/feedback/mine` returns 401).
- Rate limiting and standard 404 routing.

### Production Builds

**Backend Build:**
```bash
cd backend
npm run build
```

**Frontend Build:**
```bash
cd frontend
npm run build
```

---

## API Documentation

All routes run under `/api`:

### `GET /api/health`
Checks server health status.
- **Auth**: None
- **Response `200`**:
  ```json
  {
    "success": true,
    "data": {
      "status": "ok",
      "service": "feedback-api"
    }
  }
  ```

### `POST /api/feedback`
Submits feedback. Supports anonymous submissions or authenticated submissions if a valid `Authorization: Bearer <token>` is passed.
- **Auth**: Optional
- **Body**:
  ```json
  {
    "name": "Farmer Ramesh",
    "email": "ramesh@example.com",
    "category": "agriculture_advisory",
    "rating": 5,
    "message": "The wheat advisory notes are clear and actionable.",
    "consent": true
  }
  ```
- **Response `201`**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully.",
    "data": {
      "id": "c1f7b7e2-...",
      "category": "agriculture_advisory",
      "rating": 5,
      "createdAt": "2026-10-27T10:00:00.000Z"
    }
  }
  ```

### `GET /api/feedback/mine?page=1&limit=10`
Retrieves paginated feedback submitted by the verified user.
- **Auth**: Required (`Authorization: Bearer <access_token>`)
- **Query Params**: `page` (default 1), `limit` (default 10, max 50)
- **Response `200`**:
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": "c1f7b7e2-...",
          "category": "agriculture_advisory",
          "rating": 5,
          "message": "...",
          "created_at": "..."
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 1
      }
    }
  }
  ```

---

## Security & Privacy Highlights

1. **Row Level Security (RLS)**: Enforced directly on the PostgreSQL `feedback` table. Authenticated users can query only records matching their `auth.uid() = user_id`.
2. **Anonymous Submissions**: Anonymous users never have direct write or read access to PostgreSQL tables; submissions are mediated by the validated Express backend.
3. **No Credential Leaks**: Server secrets are restricted to `backend/.env`. All `.env` files are tracked in `.gitignore`.
4. **Rate Limiting**: Throttles submission bursts to safeguard the database and API.
5. **No AI Dependency in Initial Module**: Keeps initial feedback collection lightweight, fast, and free of unnecessary AI API keys.
