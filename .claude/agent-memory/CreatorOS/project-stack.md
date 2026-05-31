---
name: project-stack
description: CreatorOS-1 tech stack — Vite+React frontend with Node.js/Express backend in same repo, two separate tsconfigs
metadata:
  type: project
---

CreatorOS-1 is a single-repo project with a Vite+React frontend (`src/`) and an Express backend (`backend/`).

**Why:** Solo builder running everything from one repository. Frontend uses Vite bundler mode; backend uses Node.js CommonJS.

**Key structural facts:**
- Frontend tsconfig: `tsconfig.app.json` — `"moduleResolution": "bundler"`, `"module": "esnext"`, includes both `src` and `backend`
- Backend tsconfig: `tsconfig.backend.json` — `"moduleResolution": "node10"`, `"module": "commonjs"`, only includes backend Stripe files + server.ts + supabaseAdmin.ts
- Supabase client for frontend: `backend/AuthFunctionality/supabaseClient.ts` (uses `import.meta.env`, accessible via `@backend` alias)
- Supabase admin for backend: `backend/AuthFunctionality/supabaseAdmin.ts` (uses `process.env`, service role key, server-only)
- Frontend alias `@backend` maps to `./backend/` via Vite + tsconfig paths
- Stripe CLI binary at `stripe-cli/stripe.exe`
- Backend runs on port 4000, frontend dev server on 5173

**How to apply:** Always check which tsconfig context a file will be compiled under. Files in `backend/Stripe/` and `backend/server.ts` must compile under BOTH tsconfigs (app includes all of backend). Avoid Stripe SDK sub-path imports with `.js` extensions — they break under bundler mode.
