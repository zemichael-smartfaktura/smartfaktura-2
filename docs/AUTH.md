# SmartFaktura 1 – Authentication (better-auth)

This document describes how we implement authentication and tenancy using [better-auth](https://www.better-auth.com). Auth tables and session handling are **managed by better-auth**; we do not define auth schema in [database.md](database.md). App schema (customers, invoices) is in database.md.

**Related documents:** [ARCHITECTURE.md](ARCHITECTURE.md) (stack), [INFRASTRUCTURE.md](INFRASTRUCTURE.md) (deploy, env, DB hosting), [database.md](database.md) (app schema), [MILESTONES_MVP.md](MILESTONES_MVP.md) (scope).

---

## 1. Overview

- **Library:** better-auth in the backend; Drizzle adapter with PostgreSQL (`provider: "pg"`).
- **Plugins:** Organization plugin only (tenant = organization; no Admin plugin, no Teams).
- **Tenant:** Current tenant comes from `session.activeOrganizationId`. All app routes resolve this and filter by `organizationId`; see database.md.

Auth tables (user, session, account, verification, organization, member, invitation) are created and migrated by better-auth (CLI + Drizzle). We extend user and organization via `additionalFields` only.

---

## 2. Implementation

### 2.1 Setup

- **Backend:** Create auth instance with `betterAuth()`, `drizzleAdapter(db, { provider: "pg" })`, and `organization()` plugin. Mount better-auth handler on Express (e.g. `/api/auth/*`).
- **Schema:** Run `bunx @better-auth/cli@latest generate` to get Drizzle schema for auth tables; then `bunx drizzle-kit generate` and `bunx drizzle-kit migrate`. Do not hand-write auth table definitions—better-auth may add or change columns.
- **Performance:** Enable `experimental: { joins: true }` for better performance on `/get-session` and organization endpoints.

### 2.2 Additional fields (our extensions)

- **User:** Add `deletedAt` (timestamp, nullable) and `consentGivenAt` (timestamp, nullable) via `user.additionalFields`. Used for soft delete, EU consent at signup, and data-export/delete-account flows.
- **Organization:** Add `currencyCode` (text, default `'NOK'`) via Organization plugin `schema.organization.additionalFields`. One currency per company for MVP.

### 2.3 Owner and member (MVP = one user per company)

MVP scope is **one user per company**. The Organization plugin still uses roles: **owner** (full control) and **member** (limited). For MVP:

- When a user creates their company (organization), better-auth adds them as the single member with role **owner** (default `creatorRole` is `owner`).
- So in practice everyone is an owner in MVP. We keep the role column so the schema is ready for future multi-user (invitations, members with role `member`). No extra logic needed now; just create org → single member is owner.

---

## 3. Session and tenant

- **Active organization:** Stored in `session.activeOrganizationId`. Set via `organization.setActive` (client or server). For single-org MVP, set it when the user has only one org (e.g. after signup or login).
- **App usage:** In every app API handler, read session (e.g. `auth.api.getSession({ headers })`), get `session.activeOrganizationId`, and pass it to Drizzle queries as `organizationId`. Reject if null (user must have an active org).

---

## 4. Environment and security

- **Env (required):**
  - `BETTER_AUTH_SECRET` — 32+ character secret (e.g. `openssl rand -base64 32`). Used for signing and encryption.
  - `BETTER_AUTH_URL` — Base URL of the **backend** (e.g. `https://api.smartfaktura.tech` or `http://localhost:3001`). Used by better-auth for callback URLs and CSRF.
  - `CORS_ORIGIN` — Frontend origin (e.g. `https://smartfaktura.tech` or `http://localhost:5173`). Used for CORS `Access-Control-Allow-Origin`.
- **Cookies:** better-auth uses httpOnly, secure (in production), and SameSite=Lax by default. For strict HTTPS, set `useSecureCookies: true`.
- **Database:** Use a single PostgreSQL database; Drizzle adapter shares it with app schema. Connection pooling and SSL are infra concerns (see INFRASTRUCTURE.md), not auth config.

---

## 5. EU / GDPR and compliance

- **Consent:** Store consent at signup in `user.consentGivenAt` (set when user accepts terms/privacy). Required for EU; no extra table.
- **Data export:** Implement “export my data” by querying user + org + app data (customers, invoices) for the user’s org(s), then return JSON (or file). Use existing columns; filter soft-deleted as needed.
- **Delete account:** “Delete my account” = set `user.deletedAt` (soft delete), invalidate sessions, and optionally anonymize or purge after retention. No schema change; implement in API and optionally in better-auth hooks.

---

## 6. Invitation and verification tables

- **Invitation table:** Yes — the Organization plugin creates it. We do **not** use the invite flow in MVP (single user per company). The table exists so we can enable “invite teammate to company” later without schema changes.
- **Verification table:** Yes — better-auth creates it. It stores tokens for email verification, password reset, magic links, etc. We need the table if we enable any of those flows; better-auth creates it by default.
- **Email verification in MVP:** Not in scope. We do **not** require “verify email before login” for MVP. Users can sign up and log in with email+password without a verification step. If we add email verification later, we enable it in better-auth config; the verification table is already there.

## 7. What we do not implement in MVP

- **Invitations:** Table exists; no invite flow or UI in MVP.
- **Email verification:** Not required; can be added later.
- **Admin plugin:** No platform-level admin; company-level roles only.
- **Teams:** Organization plugin teams disabled.
- **OAuth:** Email+password only for MVP; OAuth can be added later via better-auth config.

---

## 8. References

- [better-auth – Drizzle adapter](https://www.better-auth.com/docs/adapters/drizzle)
- [better-auth – Organization plugin](https://www.better-auth.com/docs/plugins/organization)
- [better-auth – Cookies](https://www.better-auth.com/docs/concepts/cookies)
- [better-auth – Security](https://www.better-auth.com/docs/reference/security)

Schema for **app** data (customers, invoices, line items): [database.md](database.md).

---

## 9. Scaling and extensions

- **Org-level settings:** More fields (address, vatNumber, registrationNumber for PDF) can be added via `organization.additionalFields` later—no separate settings table.
- **Invitations / multi-member:** Plugin supports them; enable flow and UI when needed.
- **Admin plugin:** Add only if platform-level admin (list users, ban, impersonate) is required.
- **OAuth:** better-auth supports it; add providers in config when needed.
