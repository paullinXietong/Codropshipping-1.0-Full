# Change: Add a production deployment package

## Why

The local CoD 2.0 journey runs four services, but the existing production bundle deploys only the storefront and search API while proxying `/admin` to the legacy public site. IT needs one reproducible package that deploys the new customer workspace and listing orchestrator without shipping local data or secrets.

## What Changes

- Containerize the Vue customer workspace and listing orchestration service.
- Route `/admin` to the new workspace and `/listing-api` to the authenticated orchestrator.
- Persist listing data in a server volume and provide safe backup and restore procedures.
- Add production secret templates, health checks, service restart policy, and least-privilege runtime users.
- Remove local SQLite runtime files from source control.
- Add release CI, dependency checks, deployment documentation, and rollback instructions.

## Impact

- Affected specs: `production-deployment`
- Affected code: root ignore rules and release documentation; `web-search` Caddy, Docker Compose, and CI; `member-center` container; `listing-backend` container, runtime configuration, and backup tooling
- External dependencies: Docker Compose, Caddy, existing CoD APIs, production MySQL search database, approved Qwen credentials
