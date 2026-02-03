# SmartFaktura 1 – Infrastructure

Where to deploy and what’s needed for Week 1 onward. Architecture is in [ARCHITECTURE.md](ARCHITECTURE.md). Aligned with [README.md](../README.md) and [MILESTONES_MVP.md](MILESTONES_MVP.md).

**Recommended:** Frontend **Vercel**, API **Render** or **DigitalOcean**. Deploy from Git. CI in GitHub Actions (backend + shared checks); frontend built by Vercel on push (see §5). Managed Postgres (Neon, Render, or DO). Docker optional.

---

## 1. Choices and rationale

### Frontend (static SPA)

React + Vite → static assets. Any host that serves static files and SPA routing works.

| Choice | Why |
|--------|-----|
| **Vercel** (recommended) | Already connected. Git push → build → deploy. Previews, env in dashboard. |
| Netlify | Git deploy, static. Alternative to Vercel. |
| Cloudflare Pages | Git deploy, free tier. Alternative for edge or pricing. |
| Self-hosted (Coolify, DO, nginx) | Full control; static files served on own infra. |

---

### API (Bun + Express)

Express on Bun; deployed separately from frontend (see ARCHITECTURE). Host must run Bun (build from repo or Docker).

| Choice | Why |
|--------|-----|
| **Render** (recommended) | Git push → build → deploy. No Docker. Predictable (~$7/mo+). Bun supported. |
| **DigitalOcean App Platform** (recommended) | Same: build from Git, Bun, predictable (~$5/mo+). |
| Railway | Git or Docker; usage-based. Good DX. |
| Fly / Coolify / AWS / GCP | For Docker, edge, or self-hosted. |

---

### Database (PostgreSQL)

Drizzle + Postgres. Managed or self-hosted (see ARCHITECTURE).

| Choice | Why |
|--------|-----|
| **Neon** | Serverless; free tier; works with Vercel/Render/DO. |
| **Render Postgres** | Same bill as API if on Render. |
| **DO Managed DB** | Same account as API if on DO. |
| Self-hosted (VPS, Docker) | Full control; backups managed on own infra. |

---

## 2. Combined setup (prioritized)

| Priority | Frontend | API | Database |
|----------|----------|-----|----------|
| **1** | Vercel | Render | Render Postgres or Neon |
| **2** | Vercel | DigitalOcean | DO Managed DB or Neon |
| **3** | Vercel | Railway | Railway Postgres or Neon |
| **4** | Vercel | Coolify / Fly / AWS / GCP | Managed or self-hosted Postgres |

Frontend on Vercel in all. API: Render or DigitalOcean first.

---

## 3. Docker (optional)

Not required for recommended setup (Vercel + Render or DO). Build from Git; platforms run `bun install` and `bun run start`. Docker only when deploying to Coolify, Fly, AWS, or GCP (containers expected). One image per app; Turborepo supports `turbo prune` per app.

---

## 4. Environment variables (no values in repo)

Env and secrets are **never** committed. Each environment gets vars from its platform only.

| Where | Source | What to set |
|-------|--------|-------------|
| **Local** | `.env.development` and `.env.production` (gitignored). Copy from `.env.example`, fill real values. Backend loads `.env` then `.env.${NODE_ENV}` (default development). | Backend: `apps/backend/.env.example`. Frontend: `apps/frontend/.env.example`. |
| **Production** | Platform dashboard only. | **Vercel:** Settings → Environment Variables (e.g. `VITE_API_URL`). **Render:** Service → Environment (e.g. `PORT`). Add DB/auth vars when those are in the codebase. |
| **CI** | GitHub Actions repository variables. | Repo → Settings → Secrets and variables → Actions → **Variables**. Add the same names as in `.env.example` with **mock** values (for validate + build only). CI does not use real secrets. |

This matches how larger apps operate: one source of truth per platform (GitHub for CI, Vercel for frontend deploy, Render for API deploy), no env in the repo.

---

## 5. CI and deploy

**CI** (`.github/workflows/ci.yml`) runs on every push and PR: install, lint, test, **backend build only**. It gates the backend and shared quality (lint/test); frontend is **not** built in CI.

**Frontend:** Built only by Vercel on push. No frontend env or build in CI; no Deployment Checks needed. If the frontend build fails, Vercel shows it after push.

**Backend:** CI runs `bun run build --filter=@smartfaktura/backend`. Use branch protection (require the `build` check) if you want to block merge until CI passes before deploying the API to Render or DO.

- **Week 1:** CI as above; Vercel builds frontend on push.
- **Week 2:** Confirm frontend (Vercel) and API (Render or DO). Platform access (Render/DO) before or at start of Week 2 to connect repo and wire deploy. Vercel already connected.
- **Week 2–8:** Deploy on push. Frontend and API deploy independently. Env and secrets in each platform’s dashboard; no secrets in repo.

---

## 6. Summary

| Layer | Recommended | Alternatives |
|-------|-------------|--------------|
| **Frontend** | Vercel | Netlify, Cloudflare Pages, self-hosted |
| **API** | Render or DigitalOcean | Railway, Fly, Coolify, AWS, GCP |
| **Database** | Neon, or Render/DO Postgres | Supabase, self-hosted Postgres |
| **Deploy** | From Git | Docker (Coolify, Fly, AWS, GCP) |

Bun everywhere. Recommended platforms support Bun (build from repo). Docker is a choice, not required for MVP.
