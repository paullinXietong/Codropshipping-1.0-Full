## Context

CoD 0.2 consists of a Nuxt storefront and a Vue customer center. Existing CoD APIs already provide product data, authentication, store authorization, image upload, and channel publishing. A small local orchestration service is required to keep drafts, AI proposals, revisions, and publish jobs consistent without modifying the existing production API.

## Goals

- Make the customer journey understandable without knowledge of CoD's internal API model.
- Preserve the customer's control over every AI-generated change.
- Reuse real CoD product, store, and publish APIs.
- Prevent duplicate publishing and misleading success states.
- Support Shopify first while retaining five channel entry points.

## Non-Goals

- Replacing CoD authentication or store authorization.
- Silently translating or rewriting customer content.
- Publishing without a customer-selected store and final action.
- Deploying or pushing this local implementation to GitHub.

## Decisions

### Draft and proposal separation

The listing draft stores customer-approved content. AI output is stored as a separate proposal tied to a draft revision. The customer may apply fields individually; generating a proposal never changes the draft.

### Authenticated orchestration

Every listing request forwards the customer's CoD token to the existing identity endpoint and scopes records by the returned stable customer ID. No local test account or bypass is provided.

### Idempotent publishing

The service hashes the complete publish payload together with draft revision and store. Retrying an already successful identical publish returns the recorded result instead of creating a duplicate product.

### Global content language

One persisted language preference is shared by storefront navigation and listing handoff. English is used when the customer has not selected another language. Right-to-left document direction is enabled for Arabic.

### Honest integration states

Unavailable AI, identity, channel, or publish services are shown as actionable errors. The interface does not substitute sample data or fake completion.

## Risks and Mitigations

- Existing API response shapes may differ between accounts. Validate using an authorized real account before a leadership demo.
- A real publish changes the merchant's Shopify catalog. Stop at final confirmation unless publishing is explicitly authorized.
- The legacy dependency graph has security and bundle-size warnings. Treat dependency modernization as a separate change so it does not destabilize this workflow.
