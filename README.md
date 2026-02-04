# SmartFaktura

Multi-tenant SaaS invoicing platform.

**Stack:** React + Vite (frontend), Express on Bun (backend), shared types. Monorepo with Turborepo.

---

## Prerequisites

Have the following set up locally before running the app:

- **Bun** — runtime and package manager. All tooling uses `bun run`, `bunx`, `bun install`. Do not use npm/yarn/pnpm.
- **PostgreSQL** — the backend requires a local Postgres instance (15+). Create a database (e.g. `smartfaktura`) and have a connection string ready for `DATABASE_URL`.
- **Environment files** — copy `apps/backend/.env.example` → `apps/backend/.env.development` and set `DATABASE_URL` (e.g. `postgres://user:pass@localhost:5432/smartfaktura`). For frontend, optionally copy `apps/frontend/.env.example` → `apps/frontend/.env.development` and set `VITE_API_URL` (default `http://localhost:3001`).

---

## Quick start

```bash
bun install
bun run dev
```

- Backend: <http://localhost:3001>
- Frontend: <http://localhost:5173>

### Commands

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `bun run dev`       | Backend + frontend                       |
| `bun run dev:api`   | Backend only                             |
| `bun run dev:app`   | Frontend only                            |
| `bun run build`     | Build all                                |
| `bun run lint`      | Lint all                                 |
| `bun run test`      | Run tests                                |
| `bun run db:generate` | Generate migration from schema (backend) |
| `bun run db:migrate`  | Apply migrations (requires `DATABASE_URL`) |
| `bun run db:studio`   | Open Drizzle Studio (requires `DATABASE_URL`) |

Per-app detail: **`apps/backend/README.md`** · **`apps/frontend/README.md`**

### Database (local)

The backend needs a Postgres database and **`DATABASE_URL`** in env (e.g. in `apps/backend/.env.development`). From repo root:

1. Copy `apps/backend/.env.example` → `apps/backend/.env.development` and set `DATABASE_URL`.
2. Run **`bun run db:migrate`** to apply migrations.
3. Optionally run **`bun run db:studio`** to inspect data.

See **`docs/DATABASE.md`** for schema; **`apps/backend/README.md`** for backend-specific commands.

---

## Environment

- No env values are committed.
- Copy **`.env.example`** → **`.env.development`** (or **`.env.production`**) per app and set values.
- Backend loads `.env.${NODE_ENV}` (default: development).
- **Production:** Set env in each platform (Vercel, Render) only.
- **CI:** Add repository variables in GitHub (Settings → Secrets and variables → Actions → Variables). See `docs/INFRASTRUCTURE.md` §4.

---

## Deployment

- **Frontend:** Vercel (root `vercel.json` builds frontend; or set Root Directory to `apps/frontend`). Set `VITE_API_URL` in Vercel → Environment Variables.
- **API & DB:** See `docs/INFRASTRUCTURE.md`.

---

## Documentation

- `docs/ARCHITECTURE.md` — stack and structure
- `docs/INFRASTRUCTURE.md` — deployment and hosting
- `docs/MILESTONES_MVP.md` — MVP scope and milestones
- `docs/AUTH.md` — authentication
- `docs/DATABASE.md` — database schema
- `docs/ACCESS_POLICY.md` — access and development rules
