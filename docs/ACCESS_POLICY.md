# SmartFaktura – Access Policy

## Purpose
This document defines access rules for the SmartFaktura codebase and infrastructure.
The goal is to protect ownership, prevent unauthorized changes, and ensure controlled development.

SmartFaktura – Developer Access Policy

1. All external developers are added as Outside Collaborators with READ access by default.
2. READ access allows code review, documentation review, and technical discussion only.
3. WRITE access is granted only after:
   - Contract is signed
   - MVP scope is finalized
   - Timeline and milestones are approved
4. All code changes must go through Pull Requests.
5. Direct pushes to main branch are not allowed.
6. Access can be downgraded or revoked at any time if scope or contract changes.


## Roles Overview

### Owner / Admin
- Full control over:
  - GitHub organization and repositories
  - Branch protection rules
  - Vercel projects and deployments
  - Domains and billing
- Admin access is limited to SmartFaktura founders only.

---

### Developer – Read Access (Default)
**This is the initial access level for all external developers.**

Read access allows:
- Viewing source code
- Reading documentation
- Reviewing scope, milestones, and architecture
- Commenting on issues and pull requests

Read access does NOT allow:
- Pushing code
- Creating or merging pull requests
- Modifying branches
- Accessing secrets or environment variables
- Deploying to production


### Developer – Write Access
Write access is granted only after all requirements below are met:

**Requirements to upgrade from Read to Write:**
1. A signed and active contract is in place.
2. Scope, exclusions, and milestones are confirmed in writing.
3. Timeline is fixed and agreed upon (SmartFaktura 1 = 2 months).
4. Code ownership is explicitly confirmed as SmartFaktura property.

Write access allows:
- Creating feature branches
- Pushing code to non-protected branches
- Opening pull requests

Write access does NOT allow:
- Direct pushes to the `main` branch
- Changing repository settings
- Managing collaborators
- Accessing production secrets or deployments

---

## Branch Protection
- The `main` branch is protected.
- Direct pushes to `main` are not allowed.
- All changes must go through pull requests.
- At least one review is required before merging.

---

## Production & Deployment
- Production deployments are controlled exclusively by SmartFaktura.
- Developers do not receive admin access to Vercel or domain settings.
- All environment variables and secrets are managed by SmartFaktura only.

---

## Access Removal & Offboarding
- Access may be downgraded or revoked at any time.
- Upon contract completion or termination:
  - Developer access is downgraded to Read or removed entirely.
  - No further changes are permitted without a new agreement.


## Final Notes
This policy is binding for all contributors to the SmartFaktura project.
Any work outside the defined scope or access level requires written approval.

