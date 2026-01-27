# Smartfaktura 1.0 – MVP

## Vision
Smartfaktura is a lean, modern, multi-tenant invoicing SaaS.

Initial market: Africa  
Long-term expansion: EU  

The goal is to validate real user demand for a simple invoicing product before building a full accounting system.

---

## Business Model
Smartfaktura is a subscription-based SaaS.

- Target users: small businesses and freelancers  
- Pricing: monthly subscription (exact pricing defined after MVP validation)  
- Core value: send professional invoices fast and easily  

---

## Product Principles
- One senior developer
- MVP first
- Clean architecture
- No legacy code
- Full ownership by Smartfaktura
- Build for extension, not for perfection

---

## Scope MVP (v1)
Only the following features are included in v1:

- Multi-tenant system (single database, tenant isolation)
- User authentication
- Companies (tenants)
- Customers
- Products / services
- Invoices (create, edit, send)
- Manual VAT field per invoice
- PDF invoice export
- Email sending
- Basic dashboard (sent invoices, totals)

---

## Tax & Language Model (v1)

### VAT / Tax
- Single generic VAT field
- Manual rate per invoice
- No country-specific tax logic
- Architecture must support multi-country rules later

### Language
- English only
- System prepared for i18n
- No multi-language UI in MVP

---

## Out of Scope (v1)
Explicitly NOT included:

- Stripe / payments
- Country-specific tax engines
- Accounting exports
- Multi-language UI
- Advanced analytics
- Mobile apps
- Design systems
- White-labeling
- Custom branding per client

---

## Success Metrics (MVP)

Smartfaktura v1 is successful if:
- Real users actively send invoices
- At least 5–10 paying companies
- Clear signal that users are willing to pay
- We can validate or kill the idea based on real usage

---

## Non-Goals (v1)

The following are NOT goals for v1:
- Competing with full accounting systems
- Supporting all countries
- Building enterprise features
- Optimizing for scale before product-market fit

---

## Constraints

- Budget target: ~8000 USD
- Timebox: 8 weeks
- Team: 1 senior developer
- Focus: shipping, not polishing

---

## Ownership & Control

- All source code is owned by Smartfaktura
- All infrastructure accounts are owned by Smartfaktura
- GitHub is the single source of truth
- No external services without approval
- No vendor lock-in

---

## Communication Model

- Primary communication: written (GitHub + chat)
- All decisions documented
- Calls only when necessary
- No feature added without written approval

---

## Product Contract

Anything not listed in this document is **out of scope for v1**.

Any new feature requires:
- Written proposal
- Impact on budget and timeline
- Explicit approval by Smartfaktura
