## Context
The storefront, customer workspace, and listing orchestrator already run under one origin in the unified Docker deployment. A future middle office is planned but is not yet available.

## Goals / Non-Goals
- Goals: record explainable first-party activity, surface only actionable alerts, persist follow-up work, and make the integration boundary replaceable.
- Non-Goals: replace the existing chat provider, infer personal identity without sign-in, or provide a full CRM campaign system.

## Decisions
- Decision: persist journey events, leads, notifications, and notes in the existing SQLite database used by the listing service.
- Decision: expose a rate-limited public ingestion endpoint and token-protected internal sales endpoints.
- Decision: use polling and browser notifications for the pre-middle-office stage; downstream message delivery can subscribe to the same records later.
- Decision: keep the sales page outside customer navigation and require an internal token in production.

## Risks / Trade-offs
- Browser storage can be cleared and therefore anonymous visitors may receive a new identifier. Signed-in identity hints allow the sales team to understand the customer without storing session credentials.
- Polling is not instant at WebSocket latency, but it is reliable, simple, and replaceable when the middle office is connected.

## Migration Plan
1. Deploy the additive SQLite schema and API routes.
2. Enable the storefront and workspace trackers.
3. Configure `SALES_WORKSPACE_TOKEN` and give the internal URL only to sales staff.
4. Later forward the same normalized events to the middle office and switch alert delivery without changing the page contract.

