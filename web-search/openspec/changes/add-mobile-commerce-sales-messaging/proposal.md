# Change: Add adaptive mobile commerce and sales messaging

## Why
The current Nuxt 3 storefront, Vue 3 customer workspace, live chat, and sales lead desk already cover the main desktop journeys, but the mobile experience is still a responsive reduction of desktop surfaces. Customers need a complete phone-first path from discovery to purchase and sales conversation, while sales staff need to open and reply to the same customer conversation from the lead desk.

## What Changes
- Add one adaptive mobile experience to the existing Nuxt 3 application instead of creating a separate mobile site or duplicated route tree.
- Recompose storefront discovery, search, product detail, sourcing cart, checkout, account, and order pages for compact and touch-first windows.
- Add a persistent mobile navigation model inspired by familiar social applications, while preserving procurement, pricing, and fulfillment clarity.
- Replace the mobile use of the floating `ChatMini` window with a dedicated customer conversation route backed by a reusable chat session layer.
- Connect sales leads, customer identity, product and order context, and conversations through a replaceable chat-provider adapter.
- Extend the internal sales desk with conversation access, assignment, unread state, response status, follow-up, and customer context.
- Add a representative phone, browser, foldable, accessibility, performance, and poor-network verification matrix.

## Impact
- Affected specs: `mobile-commerce-experience`, `customer-mobile-workspace`, `sales-conversation-operations`
- Related active changes: `migrate-workspace-to-vue3`, `complete-customer-operation-workflows`, `add-sales-lead-desk`, `upgrade-procurement-search-filters`
- Affected code: Nuxt layouts and storefront pages, workspace shell and workflow views, chat component and composables, journey tracking, sales lead APIs and desk, release and test tooling
- Existing public and `/admin/*` route slugs remain compatible.
- The existing chat provider remains the source of truth until its history, delivery, read, assignment, and sales-reply contracts are verified.

