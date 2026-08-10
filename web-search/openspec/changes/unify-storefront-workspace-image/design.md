## Context
The current release builds `web` and `member-center` as separate images. A server can deploy the new storefront while leaving `/admin` routed to the previous public backend, producing a mixed-version customer experience.

## Goals / Non-Goals
- Goals: one immutable UI artifact, atomic storefront/workspace rollout, no Caddy dependency, same-origin paths, simple health verification, and rollback by one release tag.
- Non-goals: merge listing/search data processes into the UI runtime or replace the existing CoD business APIs.

## Decisions
- Decision: add a multi-stage `Dockerfile.unified` that builds both frontends and runs the Nuxt server behind an internal Nginx router that also serves the workspace under `/admin/`.
- Decision: publish the unified UI container directly from Docker. Its internal Nginx serves `/admin/*`, proxies the Nuxt storefront, listing/search services, and the existing CoD API upstreams.
- Decision: keep `listing-api` and `search-api` separate so persistent data, resource limits, and failures remain isolated.
- Alternatives considered: a single container containing every API process was rejected because one crash or image update would couple customer UI, listing data, and search availability.

## Risks / Trade-offs
- The UI image is larger because it includes both frontend artifacts. This is accepted to guarantee atomic UI releases.
- Two runtime processes (Nuxt and Nginx) share the UI container. The entrypoint supervises both and terminates the container if either process exits.

## Migration Plan
Build the unified image with a new immutable tag, stop the old Caddy/UI containers, publish the unified UI container directly, and run smoke tests for `/` and `/admin/main/dashboard`. Roll back by restoring the previous Compose file and image tags without deleting data volumes.
