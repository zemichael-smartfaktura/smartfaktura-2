# SmartFaktura 1 – Architecture

**Status: finalized.** The stack below is the approved architecture. No deployment or platform details—those are in [INFRASTRUCTURE.md](INFRASTRUCTURE.md). Aligned with [README.md](../README.md) and [MILESTONES_MVP.md](MILESTONES_MVP.md).

---

## 1. Finalized stack overview

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Monorepo | Turborepo | 2.x | Single repo, cached builds, apps + packages. |
| Package manager & runtime | Bun | 1.2.x | Install, run, test; one toolchain. |
| Backend | Express | 5.x | REST API on Bun. |
| Frontend | React + Vite | React 19, Vite 6.x | SPA; English-only in MVP, prepared for i18n. |
| Database | PostgreSQL | 15+ | Multi-tenant via `tenant_id`. |
| DB layer | Drizzle ORM | 0.45.x (stable) | Schema, migrations, type-safe queries. |
| Auth | better-auth | latest | Email+password, organizations, RBAC. |
| PDF (invoices) | pdf-lib or PDFKit | latest | Pure JS; runs on Bun. |
| Email | Resend (or nodemailer) | latest | Transactional email; works on Bun. |
| API client | TanStack Query | v5 | Server state, caching. |
| Styling | Tailwind CSS + shadcn/ui | latest | Utility-first CSS; accessible, customizable components. |
| i18n (later) | react-i18next | v14+ | Not in MVP. |

JS/TS across backend and frontend; shared types in the monorepo.

---

## 2. Rationale: Bun over Node.js

| Aspect | Bun | Node.js |
|--------|-----|---------|
| Performance | Faster installs, startup, CPU-bound work. | Slower install/startup. |
| Toolchain | One binary: pm, runtime, bundler, test runner. | Split (npm/node + extra tools). |
| TypeScript | Native; no separate compile to run .ts. | Needs ts-node or build. |
| Ecosystem | Node-compatible; we use libs that work on Bun. | Default everywhere. |

We chose Bun for a single toolchain and speed. No rollback to Node.

---

## 3. Rationale: chosen technologies

**Turborepo** — One repo (`apps/backend`, `apps/frontend`, `packages/*`); cached builds; approved.

**Express on Bun** — REST API; runs on Bun without code changes; portable.

**React + Vite** — SPA; no Next.js/SSR. i18n later via react-i18next.

**PostgreSQL + Drizzle** — Relational, multi-tenant (`tenant_id`). Drizzle 0.45.x: type-safe schema, migrations, pure JS on Bun. Not SQLite (single-writer; not for multi-tenant prod). Not MongoDB (we need relational invoices, line items, VAT).

**better-auth** — Email+password, orgs (tenant), RBAC, invitations. Works on Bun with `pg`. We use it instead of rolling our own (security/maintenance) or Auth0/Clerk (cost, lock-in). Identity lives in our Postgres; no separate auth service.

**PDF (invoices)** — pdf-lib or PDFKit (pure JS, run on Bun). Invoicing = Drizzle + one of these + our layout.

**Email** — Resend or nodemailer; both work on Bun. We use Resend (or its SMTP) for sending.

**TanStack Query** — Server state and caching for REST APIs; no Redux/Zustand for API data.

**Tailwind CSS + shadcn/ui** — Tailwind for utility-first styling and layout; shadcn/ui for accessible, copy-paste React components (buttons, forms, dialogs, etc.) that we own and can theme. No heavy component library; components live in the repo and match our design.

---

## 4. Managed vs self-hosted

- **DB:** Managed Postgres (Neon, Supabase, etc.) or self-hosted Postgres—see INFRASTRUCTURE. Architecture is the same; Drizzle talks to Postgres either way.
- **Auth:** better-auth is a library in our API; data in our DB. No “managed auth service” vs self-hosted; only DB hosting choice.
- **PDF:** Generated in our API; no external PDF service.
- **Email:** We use Resend (sending provider). Alternative is self-hosted SMTP; for MVP, Resend is simpler for deliverability.

---

## 5. MVP scope fit (Weeks 1–8)

| Week | Fit |
|------|-----|
| 1 | Turborepo, Drizzle schema, migrations, env, CI. Bun everywhere. |
| 2 | better-auth + Express on Bun; Drizzle users/orgs; tenant middleware; RBAC. |
| 3 | Drizzle invoices/items, manual VAT, status, numbering. Express CRUD on Bun. |
| 4 | Drizzle customers. PDF via pdf-lib or PDFKit on Bun. |
| 5 | Resend/nodemailer on Bun; TanStack Query + dashboard. |
| 6–8 | Hardening, polish, handover. i18n later with react-i18next. |

Out of scope: Stripe, country-specific tax, accounting integrations—architecture allows adding later.

---

## 6. Alternatives (reference only)

The following options were considered and not chosen. Kept here for context and future reference only; they do not affect the finalized stack above.

### Node.js

We use Bun as runtime and package manager for the whole project. Bun gives one toolchain, faster installs and startup, and native TypeScript; our stack runs on Bun end-to-end. We do not maintain a Node path or rollback.

### SQLite

SQLite is single-file and single-writer; fine for dev or tiny single-tenant apps. For multi-tenant SaaS we need concurrent writes, connection pooling, and room to scale. Postgres fits that; Drizzle supports both, but we standardize on Postgres for production.

### MongoDB

MVP needs structured invoices, line items, VAT, and clear relations (users → orgs → invoices → customers). A relational model and SQL are a better fit than a document store. Postgres + Drizzle gives schema, migrations, and type safety without giving up flexibility; we did not choose MongoDB for this project.

### Roll our own auth

Session handling, password hashing, CSRF, and org/member logic are easy to get wrong and costly to maintain. better-auth gives a typed, framework-agnostic layer we plug into Express and scope to our `tenant_id` model. We avoid the security and maintenance burden of custom auth.

### Auth0 / Clerk

MVP scope is email+password and one org per user. We avoid ongoing per-MAU cost and vendor lock-in for auth. better-auth keeps identity in our Postgres; we can add OAuth or move to a paid auth provider later if needed.

### Puppeteer for PDF

Puppeteer (headless Chrome) can render HTML to PDF. We do not rely on it for invoice PDFs. pdf-lib and PDFKit are pure JavaScript, run on Bun without native addons, and are sufficient for structured invoice layout; we use one of those instead.

### TanStack Start

TanStack Start is a full-stack framework (Vite + TanStack Router + server functions). We already chose Express for the API and a React SPA for the frontend; adding TanStack Start would replace or duplicate that. For MVP we keep Express + React SPA + TanStack Query for a simpler, lighter setup.

### T3 stack (Next.js + Prisma + tRPC)

T3 is Next.js-centric with Prisma and tRPC. We want a lightweight SPA (React + Vite) and a REST API (Express), not Next.js or tRPC. Our stack is lighter and fits “deploy anywhere” and “no framework lock-in”; we did not adopt T3 for this project.

### Next.js

We keep the frontend as a lightweight SPA (React + Vite). Next.js adds SSR, routing, and i18n routing we do not need for MVP; we use English only and add react-i18next later. Avoiding Next.js keeps the frontend deployable anywhere (static host) and the stack simpler.

### Prisma

We use Drizzle for type-safe schema and migrations with a lighter, SQL-oriented API. Prisma is more “magic” and heavier; Drizzle fits our preference for explicit SQL and minimal abstraction. Both work on Bun; we chose Drizzle.

### Redux / Zustand

Server state (API data) is handled by TanStack Query (caching, loading, refetch). Global client state is minimal for MVP; we do not need Redux or Zustand for the current scope. We use TanStack Query only for server state.

### NestJS

NestJS is a full backend framework with DI and structure. We want a minimal API (Express); NestJS is heavier than we need for MVP. Express on Bun gives us the same portability with less boilerplate.