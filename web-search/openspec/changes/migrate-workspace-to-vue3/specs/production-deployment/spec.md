## MODIFIED Requirements
### Requirement: Atomic Vue 3 customer UI release
The deployment SHALL serve the storefront and every `/admin/*` customer workflow from one immutable Nuxt 3 and Vue 3 UI image.

#### Scenario: Storefront and workspace are deployed
- **WHEN** IT deploys one UI release tag
- **THEN** `/` and `/admin/main/dashboard` MUST resolve to the same Nuxt build and MUST NOT require a Vue 2 runtime artifact

#### Scenario: A workspace route is checked
- **WHEN** the container health check opens an `/admin/*` route
- **THEN** Nuxt MUST return the workspace application shell and the check MUST fail when that shell is unavailable

### Requirement: Isolated data services
The deployment SHALL keep persistent listing and search services isolated from the customer UI process while exposing them through the same public origin.

#### Scenario: Search data is unavailable
- **WHEN** the search data service cannot connect to its production database
- **THEN** the UI MUST remain healthy and show a truthful degraded search state
