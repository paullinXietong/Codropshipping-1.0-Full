## 1. Runtime packaging

- [x] 1.1 Add production images for the customer workspace and listing orchestrator.
- [x] 1.2 Add all four application services to Docker Compose with health checks and restart policies.
- [x] 1.3 Route `/admin` and `/listing-api` to the new private services.

## 2. Data and secrets

- [x] 2.1 Remove local SQLite files from source control and use a named production volume.
- [x] 2.2 Add production environment templates and validate required secrets at startup.
- [x] 2.3 Add safe SQLite backup and restore commands.

## 3. Release quality

- [x] 3.1 Repair the member-center lint configuration.
- [x] 3.2 Add CI for installs, tests, builds, deployment configuration, and secret scanning.
- [x] 3.3 Document deployment, smoke tests, monitoring, rollback, and credential rotation.

## 4. Verification

- [x] 4.1 Run listing and search service tests.
- [x] 4.2 Build the storefront and customer workspace from clean lockfiles.
- [ ] 4.3 Validate Compose and Caddy configuration.
- [x] 4.4 Re-run the local browser journey without committing runtime data or secrets.
