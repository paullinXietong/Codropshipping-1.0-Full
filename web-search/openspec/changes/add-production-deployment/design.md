## Context

The storefront, customer workspace, search API, and listing orchestrator currently run together only through the local demo script. The previous production Caddy configuration sends `/admin` to the legacy `codropshipping.com` deployment and has no route for `/listing-api`.

## Goals / Non-Goals

- Goals: reproducible deployment, same-origin browser traffic, durable listing data, secret isolation, health checks, CI validation, and documented rollback.
- Non-goals: replacing the existing CoD identity/API service, migrating the search database, or automatically deploying from this local workstation.

## Decisions

- Serve the Vue 2 customer workspace from an unprivileged Nginx container under `/admin/`.
- Keep the listing orchestrator private on the Compose network and expose it only through Caddy at `/listing-api/`.
- Store SQLite data in a named Docker volume and create schema automatically on first start.
- Supply Qwen and search credentials only through deployment environment variables; never bake them into images.
- Require health checks before Caddy starts routing traffic.
- Keep the existing `/api` and `/mall-api` upstream integrations unchanged.

## Risks / Trade-offs

- SQLite supports this initial workload but has limited horizontal-write scaling. Back up the volume and migrate to managed SQL before running multiple orchestrator replicas.
- The legacy member center has dependency debt. CI blocks broken builds and critical issues should be remediated without destabilizing the approved listing workflow.
- Replacing `/admin` is a visible cutover. Preserve the previous Compose image tags for immediate rollback.

## Migration Plan

1. Rotate previously shared credentials and create the production environment file on the server.
2. Back up the current deployment and database.
3. Build immutable images and start search, listing, member, and storefront services.
4. Verify health endpoints and the authenticated listing journey on a staging hostname.
5. Switch Caddy traffic, monitor logs, and roll back to the previous image tags if acceptance checks fail.
