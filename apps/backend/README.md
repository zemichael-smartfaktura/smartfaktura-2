# Backend

Express API. Run from repo root or from this directory.

**From root:** `bun run dev:api`

**From here:**

```bash
cd apps/backend
bun install
bun run dev
```

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `bun run dev`      | Dev (watch)                                  |
| `bun run build`    | Build to `dist/`                             |
| `bun run start`    | Run built output                             |
| `bun run db:generate` | Generate migration SQL from schema         |
| `bun run db:migrate`   | Apply migrations (requires `DATABASE_URL`) |
| `bun run db:studio`    | Open Drizzle Studio (requires `DATABASE_URL`) |

**Environment:** The API and all DB commands require **`DATABASE_URL`**. Copy `.env.example` to `.env.development` and set `PORT` (optional, default 3001) and `DATABASE_URL` (Postgres connection string).

**Migrations:** App migrations live in `drizzle/`. Run `db:migrate` only when `DATABASE_URL` is set (e.g. from `.env.development`). Run app migrations **after** the better-auth schema has been applied (Week 2).
