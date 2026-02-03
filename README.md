# SmartFaktura

Multi-tenant SaaS invoicing platform.

**Stack:** React + Vite (frontend), Express on Bun (backend), shared types. Monorepo with Turborepo.

---

## Prerequisites

- **Node.js** ≥ 20
- **Bun** — all tooling (`bun run`, `bunx`, `bun install`). Do not use npm/yarn/pnpm.

---

## Quick start

```bash
bun install
bun run dev
```

- Backend: <http://localhost:3001>
- Frontend: <http://localhost:5173>

### Commands

| Command           | Description        |
| ----------------- | ------------------ |
| `bun run dev`     | Backend + frontend |
| `bun run dev:api` | Backend only       |
| `bun run dev:app` | Frontend only      |
| `bun run build`   | Build all          |
| `bun run lint`    | Lint all           |
| `bun run test`    | Run tests          |

Per-app detail: **`apps/backend/README.md`** · **`apps/frontend/README.md`**

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
