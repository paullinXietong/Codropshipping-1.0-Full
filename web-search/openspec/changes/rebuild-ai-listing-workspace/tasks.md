## 1. Local isolation and orchestration

- [x] 1.1 Create a remote-free local working copy.
- [x] 1.2 Add authenticated draft, proposal, event, and publish-job storage.
- [x] 1.3 Add idempotent publishing through the existing CoD publish endpoint.
- [x] 1.4 Add orchestration service tests and health check.

## 2. Storefront handoff

- [x] 2.1 Add the AI-assisted listing and manual listing paths to the real product detail page.
- [x] 2.2 Preserve product identity, source, region, mode, and language through login.
- [x] 2.3 Add the global language selector with English fallback.
- [x] 2.4 Replace the crowded product action row with one AI-first listing action, one cart action, and quiet manual/order alternatives across every product detail.
- [x] 2.5 Route every storefront order and cart shortcut into the new workspace, and keep background translation from blocking the header.
- [x] 2.6 Route workspace live support into the existing assigned-manager WebSocket conversation while retaining product feedback as a separate tracked ticket flow.

## 3. Customer workspace

- [x] 3.1 Replace the active overview with real draft, channel, and task states.
- [x] 3.2 Add Product Library and Sales Channels pages using real APIs.
- [x] 3.3 Add the complete listing editor and field-by-field AI adoption.
- [x] 3.4 Require destination store and final confirmation before publishing.

## 4. Verification

- [x] 4.1 Build storefront and customer center.
- [x] 4.2 Run orchestration unit tests.
- [x] 4.3 Browser-test the local unauthenticated and authenticated journeys.
- [ ] 4.4 Verify a real Shopify publish with an explicitly authorized merchant account.
