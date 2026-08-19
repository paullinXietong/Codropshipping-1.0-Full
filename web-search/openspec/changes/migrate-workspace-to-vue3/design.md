## Context
The storefront already uses Nuxt 3 and Vue 3. The workspace uses Vue 2 and is compiled into a second artifact inside the UI image. Both applications share local-storage tokens and the same upstream APIs, but maintain separate navigation, translation and error handling.

## Goals / Non-Goals
- Goals: one Vue 3 application for every customer-facing route, stable URLs, real API-backed workflows, honest unavailable states, one language preference, and one deployable UI image.
- Non-goals: rewrite upstream CoD business services, invent missing middle-office contracts, merge persistent listing/search processes into the UI process, or silently simulate unsupported third-party OAuth.

## Decisions
- Decision: implement `/admin` as Nuxt file routes and shared Vue 3 workspace components.
- Decision: use the existing native Codropshipping orange/forest design tokens. Do not add a second component system.
- Decision: centralize authenticated CoD requests, listing requests and response normalization in Nuxt composables.
- Decision: preserve route aliases for links already emitted by product detail, login, Shopify callback and listing drafts.
- Decision: the UI image contains only Nuxt output and Nginx. Listing and search remain separate services in the same Compose deployment because they own persistent data and independent health boundaries.

## Risks / Trade-offs
- Some upstream payloads vary by account and record. Each page must expose loading, empty and contextual error states instead of assuming one shape.
- Features without an approved upstream contract can only submit tracked requests or disclose setup requirements.
- Migrating the visible workflows first retires the Vue 2 runtime from production; obscure legacy URLs are redirected to the closest supported Vue 3 workflow.

## Migration Plan
1. Add the Vue 3 workspace shell, API composables and stable route pages.
2. Port the dashboard, product listing, channel, order, fulfillment, inventory, finance, insights, sourcing cart and checkout workflows.
3. Switch `/admin/*` routing to Nuxt and remove the Vue 2 build stage.
4. Build the unified image and smoke-test public, login and authenticated workspace paths.
5. Roll back with the previous immutable image tag if staging acceptance fails.
