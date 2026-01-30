# SmartFaktura 1 – MVP

SmartFaktura is a modern, multi-tenant SaaS invoicing platform.
This repository contains the codebase and documentation for **SmartFaktura 1 (MVP)**.

---

## 🎯 Purpose of SmartFaktura 1

SmartFaktura 1 is a **strictly scoped MVP** designed to:
- Validate core invoicing workflows
- Establish a scalable technical foundation
- Prepare for future EU and international expansion

The MVP prioritizes **functionality, stability, and clarity** over advanced features or complex compliance.

---

## ⏱ Timeline

- **Fixed timeline:** 2 months (8 weeks)
- Development follows a **week-by-week milestone plan**
- Any functionality that cannot be delivered within this timeframe is considered **out of scope**

---

## 💰 Budget

- Fixed total budget (as agreed separately via contract)
- No open-ended or undefined work
- Any work outside scope requires a **separate agreement**

---

## 👤 Target Users

SmartFaktura 1 is designed for:
- Small and medium-sized businesses (SMBs)
- Freelancers and independent professionals
- Small IT and service companies

Primary early focus:
- EU-ready architecture
- Initial launch markets may include selected African countries

---

## ✅ In Scope (SmartFaktura 1)

The MVP includes the following core features:

### Core
- User authentication (email + password)
- Organization / company setup
- Multi-tenant architecture (one system, multiple companies)
- Role-based access (basic)

### Invoicing
- Create, edit, and manage invoices
- Manual VAT/tax rate per invoice line or invoice
- PDF invoice generation
- Invoice numbering
- Invoice status tracking (draft / sent / paid)

### Customers
- Add and manage customers
- Customer details: name, email, address, country

### System
- English language only
- Prepared for i18n (no multi-language UI in MVP)
- Prepared for future multi-country tax logic
- Basic auditability (timestamps, ownership)

---

## ❌ Out of Scope (Explicitly Excluded)

The following are **not included** in SmartFaktura 1:

- Country-specific VAT or tax rules
- Automated tax calculations per country
- Accounting integrations
- Payment gateways (Stripe, PayPal, etc.)
- Bank integrations
- Advanced reporting or analytics
- Multi-language UI
- Mobile applications
- Marketplace, plugins, or add-ons
- Pixel-perfect or final UI/UX design
- Regulatory compliance beyond basic invoicing logic

Any feature not explicitly listed as **In Scope** is considered **Out of Scope**.

---

## 🎨 UI / UX Scope

- No final wireframes are provided at project start
- Early phase focuses on:
  - Aligning user flows
  - Delivering a simple, functional UI
- Design priority:
  - Clarity
  - Usability
  - Speed of implementation
- Visual polish and advanced design are deferred to later versions

---

## 🧱 Technical Principles

- Clean, maintainable codebase
- Full code ownership by SmartFaktura
- No vendor lock-in
- Scalable architecture suitable for future expansion
- All development tracked via GitHub

---

## 🌱 Future Versions (Not MVP)

The following are planned for later versions:
- Country-specific tax engines
- EU VAT compliance automation
- Multi-language UI
- Payments and accounting integrations
- Advanced roles and permissions
- Public API and integrations

These are **not part of SmartFaktura 1**.

---

## 🔒 Access & Development Rules

- All external developers start with **Read-only access**
- Write access is granted only after:
  - Contract signing
  - Scope lock
  - Milestone approval
- `main` branch is protected
- All changes must go through Pull Requests

See `docs/ACCESS_POLICY.md` for details.

---

## 📌 Final Notes

This README represents the **locked scope** for SmartFaktura 1 (MVP).
Any changes, additions, or extensions require written approval and may impact timeline and budget.

This document is the primary reference for:
- Development scope
- Contract alignment
- Milestone acceptance
