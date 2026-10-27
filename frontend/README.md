# Agriculture Crop Advisory Assistant - Frontend

Modern, accessible React, TypeScript, and Tailwind CSS client application for the Feedback Management module of the AI-Powered Agriculture Crop Advisory Assistant.

## Key Features

- **React 18 & TypeScript**: Robust type safety and modular component architecture.
- **Tailwind CSS**: Modern agriculture-inspired design system (emerald green accents, clean neutral surfaces, glassmorphic header).
- **Zod Validation**: Accessible form validation with real-time character counters and inline feedback.
- **Supabase Auth Integration**: User registration, login, session persistence, and protected feedback history routes.
- **Accessible & Responsive**: Keyboard navigability for star ratings, high contrast ratios, mobile drawer menu, and semantic HTML5 elements.

## Pages & Routes

- `/`: Home page with overview and call to action.
- `/feedback`: Interactive feedback submission form with 1–5 star rating, categories, and consent acknowledgment.
- `/login`: Supabase Auth email & password login.
- `/signup`: Account registration.
- `/my-feedback`: Protected route displaying the authenticated user's feedback history.
- `*`: Custom 404 page.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your backend URL and Supabase credentials:

```dotenv
VITE_APP_NAME=AI-Powered Agriculture Crop Advisory Assistant
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

### 3. Start Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
npm run preview
```
