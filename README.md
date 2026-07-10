# CreatorOS

Turn one video into a month of content.

CreatorOS is an AI-powered content operating system for creators. It repurposes long-form video into platform-ready posts in your voice, then schedules and publishes across channels using automation.

## Tech Stack

- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS v4
- **Animation** — Framer Motion, GSAP, Three.js / React Three Fiber, Spline
- **Backend** — Express (Node.js), Stripe webhooks
- **Database / Auth** — Supabase
- **Payments** — Stripe

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, pricing, FAQ |
| `/about` | About us |
| `/login` | User login |
| `/signup` | User signup |
| `/dashboard` | Creator dashboard |
| `/projects` | Projects manager |
| `/analytics` | Content analytics |
| `/automation` | UiPath automation pipeline |
| `/ai-engine` | AI content engine |
| `/settings` | Account settings |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Stripe account

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Run (frontend only)

```bash
npm run dev
```

### Run (full stack with backend + Stripe listener)

```bash
npm run dev:full
```

### Build

```bash
npm run build
```

## Scripts

| Script | Description |
|---|---|
| `dev` | Start Vite dev server |
| `build` | Type-check and build for production |
| `preview` | Preview production build |
| `backend` | Run Express backend |
| `backend:dev` | Run backend with hot reload |
| `stripe:listen` | Forward Stripe webhooks locally |
| `dev:full` | Run frontend, backend, and Stripe listener concurrently |

## License

© 2026 CreatorOS Inc. All rights reserved.
