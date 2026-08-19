## 0. Approval gate
- [ ] 0.1 Review and approve the product direction, route preservation, five-tab navigation, and phased rollout.
- [ ] 0.2 Agree the implementation branch strategy around the current uncommitted Vue 3 migration and sales work.

## 1. Discovery and contracts
- [ ] 1.1 Inventory all storefront, customer workspace, sales desk, chat, analytics, and API states on mobile.
- [ ] 1.2 Measure baseline Core Web Vitals, bundle size, interaction failures, and 320 px reflow issues.
- [ ] 1.3 Verify customer and sales chat authentication, identity, history, reply, assignment, read, delivery, attachment, and notification contracts.
- [ ] 1.4 Approve the information architecture, wireframes, content hierarchy, device matrix, analytics events, and retention policy.

## 2. Adaptive foundation
- [ ] 2.1 Add semantic visual tokens and safe-area, dynamic viewport, touch-target, focus, and reduced-motion utilities.
- [ ] 2.2 Build shared top bar, bottom navigation, bottom sheet, sticky actions, page states, and responsive product card.
- [ ] 2.3 Add state and route patterns that survive keyboard, orientation, split-screen, fold, and unfold changes.
- [ ] 2.4 Add automated checks at 320, 360, 390, 412, 430, 768, 1024, and desktop widths.

## 3. Storefront mobile path
- [ ] 3.1 Recompose home and category discovery.
- [ ] 3.2 Extract and recompose search header, filters, results, cards, pagination, and error states.
- [ ] 3.3 Extract and recompose product gallery, procurement facts, variants, shipping, description, and sticky actions.
- [ ] 3.4 Add saved or cart, account, sign-in handoff, and contextual sales entry points.
- [ ] 3.5 Verify existing URLs, search data, listing actions, cart actions, coupons, language, and analytics remain compatible.

## 4. Customer workspace mobile path
- [ ] 4.1 Add the five-destination mobile workspace shell and compact account or More navigation.
- [ ] 4.2 Recompose overview, product library, Listing Studio, and channels.
- [ ] 4.3 Recompose orders, fulfillment, inventory, finance, and insights.
- [ ] 4.4 Recompose sourcing cart, checkout, profile, wallet, security, feedback, and support.
- [ ] 4.5 Verify draft preservation, forms, batch actions, payment handoff, and order mutations on touch devices.

## 5. Customer conversation
- [ ] 5.1 Extract provider-specific WebSocket and upload behavior into a tested adapter.
- [ ] 5.2 Add shared chat state, identity linkage, message normalization, history pagination, unread state, draft persistence, and send queue.
- [ ] 5.3 Build message timeline, composer, product card, order card, quotation card, delivery states, retry, and offline fallback.
- [ ] 5.4 Add `/messages` and `/admin/messages` while retaining a desktop launcher and temporary iframe rollback path.
- [ ] 5.5 Sanitize rich messages and enforce attachment validation, rate limiting, privacy, and retention rules.

## 6. Sales conversation operations
- [ ] 6.1 Extend the lead and provider boundary with conversation linkage and real last-message state.
- [ ] 6.2 Replace shared sales token access with approved staff authentication and role-based authorization.
- [ ] 6.3 Add sales Inbox, lead detail, conversation, reply, attachment, assignment, follow-up, internal note, and audit log.
- [ ] 6.4 Add unread and response-SLA notifications without mixing internal notes into customer messages.
- [ ] 6.5 Verify a real two-way test conversation, reconnect, duplicate-send protection, read state, reassignment, and offline fallback.

## 7. Quality and rollout
- [ ] 7.1 Run unit, component, API, backend, end-to-end, accessibility, visual regression, and performance checks.
- [ ] 7.2 Complete the representative iPhone, Android brand class, foldable, browser, in-app browser, poor-network, keyboard, and zoom matrix.
- [ ] 7.3 Load-test event ingestion, message fan-out, uploads, polling or WebSocket reconnect, and rate limits.
- [ ] 7.4 Roll out by feature flag and cohort with dashboards for conversion, delivery, response time, errors, and Core Web Vitals.
- [ ] 7.5 Remove the old mobile floating modal and iframe bridge only after the rollback window closes.

