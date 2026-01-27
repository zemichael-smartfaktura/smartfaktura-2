Smartfaktura 1.0 – MVP







Vision





Smartfaktura is a lean, modern, multi-tenant invoicing SaaS.



Initial market: Africa

Long-term expansion: EU



The goal is to validate real user demand for a simple invoicing product before building a full accounting system.









Business Model





Smartfaktura is a subscription-based SaaS.



Target users: small businesses and freelancers
Pricing: monthly subscription (exact pricing defined after MVP validation)
Core value: send professional invoices quickly and easily










Product Principles





One senior developer
MVP first
Clean architecture
No legacy code
Full ownership by Smartfaktura
Build for extension, not for perfection










Scope – MVP (v1)





Only the following features are included in v1:



Multi-tenant system (single database, strict tenant isolation)
User authentication
Companies (tenants)
Customers
Products / services
Invoices (create, edit, send)
Manual VAT field per invoice
PDF invoice export
Email sending
Basic dashboard (sent invoices, totals)










Tax & Language Model (v1)







VAT / Tax





Single generic VAT field
Manual rate per invoice
No country-specific tax logic in v1
Architecture must support multi-country tax rules later






Language





English only in v1
System prepared for i18n
No multi-language UI in MVP










Success Criteria (MVP)





Smartfaktura v1 is considered successful if:



Real users actively send invoices
At least 5–10 paying customers
Clear signal that users are willing to pay
We can validate or kill the idea based on real usage










Non-goals (v1)





The following are explicitly out of scope:



Competing with full accounting systems
Supporting all countries
Advanced reporting
Business automation features
Optimization for scale










Constraints





Budget: ~8000 USD
Timeline: ~8 weeks
Team: 1 senior developer
Focus: functionality, not polish










Ownership & Control





All source code owned by Smartfaktura
All infrastructure accounts owned by Smartfaktura
GitHub is the single source of truth
No external services without approval
No vendor lock-in










Communication Model





Primary communication: written (GitHub + chat)
All decisions documented
Calls only when necessary
No features added without written approval










Product Contract





Anything not listed in this document is out of scope for v1.



Any new feature requires:



Written proposal
Impact on budget and timeline
Explicit approval by Smartfaktura










High-Level Roadmap (by developer)





Weeks 1–2:
Domain models, architecture, infra setup
Weeks 3–6:
Core flows (auth, tenants, invoices, PDF, email, dashboard)
Weeks 7–8:
Hardening, security, migrations, cleanup, polish




No feature creep. Final time is for stability, not new ideas.

