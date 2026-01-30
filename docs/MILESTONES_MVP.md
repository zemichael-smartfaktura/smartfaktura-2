SmartFaktura 1 – MVP







Milestone Plan (Week 1–8)





Total duration: 8 weeks

Team: 1 senior developer

Focus: Functionality, stability, clarity (not polish)

Scope: As defined in README.md

Rule: No feature creep. Anything not listed is out of scope.









🟦 Week 1 – Foundation & Architecture





Goal: Establish a solid technical foundation.



Deliverables:



Project structure finalized
Core domain models defined
Base architecture implemented
Infrastructure setup completed




Scope:



Domain modeling (users, tenants, invoices, customers)
Database schema (multi-tenant, strict isolation)
Backend project setup
CI/CD setup
Environment configuration (dev / prod basics)




Acceptance criteria:



Project runs locally
Database migrations working
Clean architecture in place










🟦 Week 2 – Authentication & Tenancy





Goal: Secure access and tenant isolation.



Deliverables:



User authentication
Organization (tenant) setup
Basic role-based access




Scope:



Email + password authentication
User registration & login
Tenant creation and selection
Tenant-scoped data access
Basic roles (owner / member)




Acceptance criteria:



Users can register and log in
Data is isolated per tenant
No cross-tenant access possible










🟦 Week 3 – Core Invoicing (Data & Logic)





Goal: Core invoicing logic working.



Deliverables:



Invoice data model
Invoice lifecycle logic




Scope:



Create / edit / delete invoices
Invoice line items
Manual VAT/tax field per invoice or line
Invoice numbering
Invoice status (draft / sent / paid)




Acceptance criteria:



Invoices can be created and stored
Status transitions work correctly
Totals and VAT are calculated correctly










🟦 Week 4 – Invoicing Output & Customers





Goal: Make invoices usable in practice.



Deliverables:



Customer management
Invoice output




Scope:



Customer CRUD
Customer details (name, email, address, country)
PDF invoice generation
Basic invoice layout (functional, not design-focused)




Acceptance criteria:



Customers can be managed
Invoices can be exported as PDF
PDFs contain correct data










🟦 Week 5 – Email & Basic Dashboard





Goal: Enable real usage.



Deliverables:



Invoice sending
Overview dashboard




Scope:



Send invoices via email
Email status tracking
Basic dashboard:
Sent invoices
Paid invoices
Totals (simple)





Acceptance criteria:



Invoices can be emailed
Dashboard shows correct numbers
Basic audit trail exists










🟦 Week 6 – System Hardening





Goal: Improve reliability and security.



Deliverables:



Improved stability
Security hardening




Scope:



Error handling
Logging
Input validation
Basic audit logs (timestamps, ownership)
Security review (auth, permissions)




Acceptance criteria:



No critical security issues
System handles common errors gracefully
Logs exist for key actions










🟦 Week 7 – Cleanup & MVP Polish (Non-Visual)





Goal: Prepare for real users.



Deliverables:



Clean codebase
Improved usability (logic-level)




Scope:



Code cleanup and refactoring
Performance improvements where needed
Bug fixes
Migration scripts verified
Deployment verification




Acceptance criteria:



Codebase is clean and maintainable
No known blocking bugs
Deployment is stable










🟦 Week 8 – MVP Lock & Handover





Goal: Finalize MVP and lock scope.



Deliverables:



MVP locked
Documentation finalized




Scope:



Final testing
README verification
Deployment confirmation
Access rules enforced
Scope lock




Acceptance criteria:



MVP is live and usable
README matches delivered functionality
No new features added
Project is ready for user validation










🔒 Scope Lock Rule



Any feature not explicitly listed above is out of scope
Any change requires:
Written proposal
Impact on timeline and budget
Explicit approval



📌 Notes



No accounting integrations
No payment gateways
No country-specific VAT automation
No multi-language UI
No mobile apps


