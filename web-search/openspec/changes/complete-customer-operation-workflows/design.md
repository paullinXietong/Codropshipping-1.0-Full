## Context
The workspace is a Vue 2 application embedded in the unified image; the storefront is Nuxt 3. Existing CoD APIs already support most order and fulfillment mutations. Live support currently exists only as a Nuxt component and depends on browser-local assignment data.

## Goals / Non-Goals
- Goals: complete every visible customer action, preserve the new workspace UI, reuse proven CoD contracts, expose honest loading/error/scope states.
- Non-Goals: invent new financial reporting data, replace the existing agent chat backend, or redesign legacy APIs.

## Decisions
- Expose the existing storefront chat as a dedicated same-origin support surface and open it inside a workspace drawer, so both surfaces use the same component, assignment and WebSocket contract.
- Add explicit action panels to the new order/fulfillment pages and call the existing CoD mutation APIs.
- Build checkout as a new workspace page using the current cart preview/address/create APIs; external payment redirects remain controlled by the existing payment API.
- Replenishment creates a structured sourcing request in the existing feedback queue until a dedicated procurement-request endpoint exists.
- Label finance/insight figures with exact loaded scope; do not extrapolate or imply completeness.

## Risks / Trade-offs
- Existing upstream payloads vary across records. Defensive field normalization and contextual error messages are required.
- Chat cannot guarantee an agent response without the existing backend. The UI will accurately expose connection and send state.
- Structured replenishment uses an existing tracked ticket contract; it is a human procurement workflow, not automated purchasing.

## Migration Plan
Routes remain stable except the workspace cart now proceeds to `/workspace/checkout`. The legacy pages stay available for rollback but are no longer used by the new primary flow.
