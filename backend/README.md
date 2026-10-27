# Agriculture Crop Advisory Assistant - Backend API

Production-ready Node.js, Express, and Supabase PostgreSQL backend powering the Feedback Management module of the AI-Powered Agriculture Crop Advisory Assistant.

## Key Features

- **Express 4 & TypeScript**: Fully typed REST API under `/api`.
- **Zod Validation**: Authoritative server-side schema validation preventing unknown properties and invalid data.
- **Supabase Integration**: PostgreSQL persistence with Row Level Security (RLS) policies.
- **Authentication**: Supabase Auth JWT verification for private user feedback history (`/api/feedback/mine`).
- **Security**: Helmet HTTP headers, CORS origin allowlisting, rate limiting (`express-rate-limit`), and body payload size limits.
- **Automated Testing**: Vitest test suite with Supertest covering endpoint security, validation, and error handling.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Service health check |
| `POST` | `/api/feedback` | Optional | Submit feedback (anonymous or authenticated) |
| `GET` | `/api/feedback/mine` | Yes | Retrieve paginated feedback submitted by the authenticated user |

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Supabase project credentials:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=YOUR_SERVER_ONLY_SUPABASE_SECRET_KEY
```

### 3. Run Database Migrations

Apply the SQL migration file located in:
`supabase/migrations/20261027000000_create_feedback_table.sql`

This can be executed via the Supabase Dashboard SQL Editor or using the Supabase CLI:

```bash
supabase db push
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### 5. Run Automated Tests

```bash
npm test
```

### 6. Build for Production

```bash
npm run build
npm start
```
