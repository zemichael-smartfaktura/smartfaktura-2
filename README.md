# SmartFaktura

Multi-tenant SaaS invoicing platform.

**Stack:** React + Vite (frontend), Express on Bun (backend), shared types. Monorepo with Turborepo.

---

## Prerequisites

- **Node.js** ≥ 20  
- **Bun** — used for all tooling (`bun run`, `bunx`, `bun install`). Do not use npm/yarn/pnpm.

---

## Quick start

```bash
bun install
bun run dev
```

Runs backend and frontend together. Backend: <http://localhost:3001>. Frontend: <http://localhost:5173>.

### Commands

| Command           | Description        |
| ----------------- | ------------------ |
| `bun run dev`     | Backend + frontend |
| `bun run dev:api` | Backend only       |
| `bun run dev:app` | Frontend only      |
| `bun run build`   | Build all          |
| `bun run lint`    | Lint all           |
| `bun run test`    | Run tests          |

More detail per app: **`apps/backend/README.md`** · **`apps/frontend/README.md`**

---

## Environment

Copy each app’s **`.env.example`** to **`.env`** and set values as needed.

- **Backend:** `apps/backend/.env.example`  
- **Frontend:** `apps/frontend/.env.example`

---

## Deployment

| Layer     | Where                          |
| --------- | ------------------------------ |
| **Frontend** | Vercel                         |
| **API & DB** | See `docs/INFRASTRUCTURE.md`   |

**Vercel:** Deploy from repo root (root `vercel.json` builds the frontend). Or set **Root Directory** to `apps/frontend`. Set `VITE_API_URL` in Vercel → Settings → Environment Variables for production.

---

## Documentation

All architecture, scope, and infrastructure docs live in **`docs/`**:

- `docs/ARCHITECTURE.md` — stack and structure  
- `docs/INFRASTRUCTURE.md` — deployment and hosting  
- `docs/MILESTONES_MVP.md` — MVP scope and milestones  
- `docs/AUTH.md` — authentication  
- `docs/DATABASE.md` — database schema  
- `docs/ACCESS_POLICY.md` — access and development rules  
