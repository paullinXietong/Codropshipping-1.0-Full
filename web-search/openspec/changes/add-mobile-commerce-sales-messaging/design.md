## Context

The latest workspace already contains:

- A Nuxt 3 storefront and Vue 3 customer workspace under one origin.
- Search, product detail, product listing, sourcing cart, checkout, orders, fulfillment, inventory, finance, and insights workflows.
- A customer-side WebSocket chat component with product messages, attachments, unread counts, reconnect state, offline support-request fallback, and WhatsApp handoff.
- A first-party journey tracker and internal sales lead desk with lead scoring, ownership, follow-up, notes, and notifications.

The gaps are structural rather than cosmetic:

- Storefront layouts and key pages still carry desktop-first composition and large single-file components.
- `ChatMini.vue` is a 683-line floating desktop window and is not a first-class mobile destination.
- Search and product detail are 2,000-line class pages, which makes mobile behavior difficult to isolate and verify.
- The customer workspace has a responsive drawer, but its navigation and dense workflow pages are not yet designed around one-handed phone use.
- The sales lead desk records support intent but does not open and reply to the actual customer conversation.
- The existing chat provider contract is only proven for the customer side. Sales history, assignment, read receipt, and reply APIs still require verification.

## Goals / Non-Goals

### Goals

- Deliver one maintainable responsive and adaptive codebase from 320 CSS pixels through unfolded foldables and desktop.
- Make the customer path complete on a phone: discover, search, compare, ask sales, save or list, checkout, pay, and track.
- Make messages a primary customer destination and the same conversation a primary sales action.
- Preserve current URLs, customer identity, language, analytics events, and business API contracts.
- Keep procurement facts visible and avoid hiding price, MOQ, fulfillment, supplier, and shipping information behind social-media gestures.
- Meet WCAG 2.2 AA, mobile performance budgets, safe-area requirements, and resilient network states.

### Non-Goals

- Build native iOS or Android applications in this phase.
- Copy Instagram branding, icons, gradients, engagement metrics, or infinite-feed behavior.
- Replace the existing WebSocket provider before the provider contract audit is complete.
- Invent sales reply, message history, payment, or order APIs that have not been approved.
- Create a second `m.` domain, a second route tree, or a forked mobile component library.

## Product Direction

### Instagram logic to borrow

- A stable bottom navigation that becomes muscle memory.
- Search and discovery as a visual, fast, continuously browsable surface.
- Messages as a first-class destination, with unread state always visible.
- Simple list-to-detail transitions and a strong back-stack model.
- Sharing a product or order into a conversation as a structured card.
- Profile and account-manager identity that make the relationship feel personal.

### Instagram logic not to borrow

- Infinite feed as the main conversion mechanism.
- Likes, follower counts, comments, and vanity engagement signals.
- Gesture-only actions, hidden procurement facts, or media that occupies the full screen without purchase context.
- A visually cloned interface that weakens the CoDropshipping brand or creates intellectual-property risk.
- Algorithmic ranking that cannot explain why a sourcing result is shown.

### Recommended navigation

For storefront and signed-out customers:

1. Home
2. Discover
3. Saved or Cart
4. Messages
5. Account

For signed-in customer workspace:

1. Overview
2. Products
3. Orders
4. Messages
5. Account

Listing Studio, channels, fulfillment, inventory, finance, insights, sourcing cart, and checkout remain available through contextual entry points and the Account or More surface. The bottom bar must not grow beyond five destinations.

## Information Architecture and Page Layouts

### Storefront home

- Compact app bar with logo, account state, and message unread count.
- Prominent search field supporting keywords, URL paste, and image search.
- Horizontally scrollable category shortcuts with semantic labels.
- A curated discovery feed made of varied sections: new arrivals, high-selling products, recommended categories, and campaign modules.
- Two-column product grid on standard phones, one column only when a card contains procurement details that cannot reflow safely.
- Persistent bottom navigation with safe-area padding.

### Search and results

- Sticky search field at the top.
- Sort and filter controls open as bottom sheets, not narrow desktop popovers.
- Selected filters appear as removable chips in one horizontal scroll row.
- Product cards prioritize image, translated title, price range, MOQ, shipping readiness, supplier facts, and one primary action.
- Product-card actions become `View` and `Ask sales`; listing and cart actions stay on detail unless a verified fast action is available.
- Loading skeletons, partial-index disclosure, empty state, retry state, and offline state remain visible.

### Product detail

- Full-width swipe gallery with stable image aspect ratio and image count.
- Price, MOQ, variant range, shipping estimate, supplier information, and trust facts immediately below the gallery.
- Variants, shipping calculator, product description, and supplier details use clear sections or disclosures.
- A sticky bottom action area contains no more than three actions: `Ask sales`, the primary conversion action, and cart or save.
- `Ask sales` opens the dedicated conversation with the current product attached as context.
- All sticky elements include `env(safe-area-inset-bottom)` and remain visible when the virtual keyboard opens.

### Messages

- Add a customer route such as `/messages` and a compatible `/admin/messages` alias.
- If the customer has one assigned manager, open that thread directly. If multiple approved conversations exist later, show a conversation list first.
- Header contains manager avatar, name, role, connection state, and a secondary WhatsApp fallback.
- Timeline supports text, image, file, product card, order card, quotation card, system event, loading history, and delivery state.
- Composer supports text, attachment, product or order context, retry, and offline request fallback.
- Quick prompts may include sourcing, shipping, MOQ, sample, and order-status questions, but remain optional.
- The conversation restores draft text and scroll position after route changes, resize, fold or unfold, and temporary network loss.

### Customer workspace

- Replace the mobile sidebar-first mental model with a five-destination bottom bar and a compact top app bar.
- Overview shows urgent work, order status, current listing work, and recent messages before analytics.
- Product library uses search, filter sheet, concise rows or cards, and batch actions in a bottom action tray.
- Listing Studio uses step sections with a sticky progress header and a persistent review or save action. It must preserve draft state when the keyboard, language, or viewport changes.
- Orders and fulfillment use list-detail navigation. A phone opens one order at a time; an expanded foldable may show list and detail together.
- Inventory, finance, and insights use summary-first layouts. Dense tables become grouped cards or horizontally scrollable regions only where column comparison is essential.
- Cart and checkout use one-column forms, explicit labels, saved-address selection, shipping review, order total, and a sticky final action.
- Account contains language, profile, security, wallet, support, and secondary workspace destinations.

### Sales desk

- Desktop remains a three-pane lead queue, customer story, and follow-up panel.
- Compact mobile flow becomes four destinations: Inbox, Leads, Follow-ups, Account.
- Lead list opens a focused lead detail rather than stacking the queue, story, and editor vertically.
- Every lead with a valid conversation identity exposes `Open conversation` as the primary action.
- Conversation header shows customer name, assigned salesperson, lead temperature, last active page, and current product or order context.
- Sales can reply, attach approved files, share a quotation or product, assign or reassign, mark follow-up, and record a note without leaving the customer context.
- Internal notes never enter the customer-visible message stream.
- The desk displays honest unavailable states when the chat provider does not expose sales reply or history.

## Adaptive Layout System

Design against available window size, not phone brand or user-agent strings.

| Window width | Expected behavior |
| --- | --- |
| 320-359 CSS px | Single column, compact spacing, no two-button rows unless each remains at least 44 px high |
| 360-479 CSS px | Standard phone layout, two-column visual product grid where content remains readable |
| 480-767 CSS px | Large phone or foldable cover, wider cards and optional supporting information |
| 768-1023 CSS px | Tablet or unfolded foldable, list-detail and two-pane layouts where useful |
| 1024+ CSS px | Existing desktop composition with shared components and tokens |

Implementation rules:

- Use CSS Grid, flexbox, container queries, and content-driven reflow.
- Use `min-height: 100dvh` for application surfaces and avoid fixed `100vh` assumptions.
- Apply `viewport-fit=cover` and safe-area insets to top bars, bottom bars, chat composer, and sticky CTAs.
- Do not lock portrait orientation.
- Preserve state during orientation, split-screen, fold, unfold, and virtual-keyboard changes.
- Use pointer and hover media queries for interaction differences, not brand detection.
- Set important touch targets to 44 by 44 CSS pixels or larger. WCAG 2.2 AA minimum remains the compliance floor.

## Visual System

- Preserve the current CoDropshipping orange and forest palette.
- Use one semantic token layer for storefront, customer workspace, and sales desk: canvas, surface, elevated surface, primary text, secondary text, border, accent, success, warning, danger, focus.
- Use a consistent shape rule: 10-12 px for cards and fields, 999 px only for chips, badges, and avatars.
- Use system-first sans typography or a self-hosted approved font to avoid blocking remote font requests on slow mobile networks.
- Use one icon family across the Nuxt 3 surfaces. Do not add custom inline SVG paths for routine interface icons.
- Motion is limited to navigation transitions, sheets, loading feedback, and state changes. Respect `prefers-reduced-motion`.
- Support light and dark modes only after critical purchase and message surfaces pass contrast and image checks in both. Light mode remains the initial rollout if schedule is constrained.

## Technical Architecture

### Shared mobile shell

Create shared Nuxt components rather than per-page copied markup:

- `AppTopBar`
- `MobileBottomNav`
- `MobileSearchBar`
- `FilterBottomSheet`
- `StickyActionBar`
- `ResponsiveProductCard`
- `PageState` for loading, empty, error, and offline
- `SafeAreaSurface`

Consolidate duplicated storefront layouts gradually. Existing route metadata selects behavior; it must not select a separately maintained mobile layout.

### Chat refactor

Split `ChatMini.vue` into:

- `useChatSession`: identity, manager assignment, connection lifecycle, reconnect, message normalization, unread state, send queue, history, and cleanup.
- `chatStore`: active conversation, messages, draft, unread count, delivery state, and attached product or order context.
- `ConversationTimeline`: typed messages and history pagination.
- `ConversationComposer`: text, attachment, retry, and keyboard-safe layout.
- `ConversationPage`: full mobile and workspace route.
- `ChatLauncher`: desktop-only shortcut that opens the same store and components.
- `ChatProviderAdapter`: the only layer aware of existing WebSocket event names and upload endpoints.

Remove the iframe bridge after the Vue 3 conversation route is proven under the same origin. During migration, the bridge remains as rollback protection.

### Conversation identity and API boundary

Normalize these identifiers without storing credentials in journey events:

- `visitorId`
- `customerId`
- `managerId`
- `leadId`
- `conversationId`
- `messageId`
- `productId` or `orderId` context

Before implementation, verify whether the current chat provider supports:

- Sales-side authentication and authorization.
- Conversation lookup by customer or visitor.
- Paginated message history.
- Sales reply and attachments.
- Delivery and read receipts.
- Assignment and reassignment.
- Idempotent client message IDs.
- Message deletion or redaction policy.
- Webhook or WebSocket events for sales notifications.

If any contract is missing, introduce a server-side adapter in `listing-backend` or the approved middle office. The client must never embed a privileged sales token.

### Sales integration

Extend the current lead store rather than creating a second CRM record:

- Add conversation linkage and last-message metadata to the lead response.
- Add protected conversation endpoints only after provider contracts are known.
- Keep lead notes and chat messages in separate stores and authorization scopes.
- Add response-time timestamps and unread counts based on real message state.
- Deduplicate journey `support_message` events by client message ID.
- Allow a future CRM to replace the adapter without changing the customer or sales UI contracts.

### Security and privacy

- Sales APIs require authenticated staff identity and role-based authorization. Replace the shared session token before broad production use.
- Validate file type, file size, filename, and content disposition on the server.
- Sanitize rendered Markdown and rich message payloads. Never use unsanitized `v-html` for provider content.
- Rate-limit anonymous message and journey endpoints.
- Redact tokens, email, phone, and secrets from paths and analytics metadata.
- Define retention, export, and deletion behavior for conversations and customer notes.
- Record assignment, status, and privileged sales actions in an audit log.

## Device and Browser Coverage

Brand coverage is achieved through capability coverage plus representative real devices.

### Required browser matrix

- Current and previous major iOS Safari releases.
- Current Android Chrome and one previous major version.
- Current Samsung Internet.
- Current Huawei Browser where available.
- Current Xiaomi, OPPO, and vivo system browsers or their Chromium-based webviews.
- In-app browsers used by WhatsApp, Instagram, Facebook, TikTok, and WeChat for entry and sign-in handoff checks.

### Representative device matrix

- 320 px compact iPhone-class viewport.
- 360 px low and mid-range Android phones from Xiaomi, Redmi, OPPO, vivo, realme, TECNO, Infinix, and Motorola classes.
- 375-390 px mainstream iPhone viewport.
- 393-412 px mainstream Google Pixel, Samsung Galaxy, Huawei, and Honor classes.
- 428-430 px large iPhone and large Android viewport.
- Narrow foldable cover screen.
- Samsung Galaxy Z Fold, Google Pixel Fold, Huawei Mate X, Honor Magic V, Xiaomi Mix Fold, OPPO Find N, or equivalent unfolded class.
- Landscape phone, split-screen, and browser zoom at 200 and 400 percent where applicable.

### Performance profiles

- Fast Wi-Fi and modern flagship CPU.
- Mid-range Android on 4G.
- Low-end Android on throttled 3G or high-latency 4G.
- WebSocket disconnect and reconnect.
- Image upload interruption and retry.
- Virtual keyboard open during long chat and checkout forms.

## Performance and Quality Budgets

- LCP below 2.5 seconds at the 75th percentile for key mobile routes.
- INP below 200 milliseconds at the 75th percentile.
- CLS below 0.1.
- Initial critical mobile JavaScript budget agreed after bundle measurement; heavy workspace modules and charts load by route.
- Product and message images use responsive sources, reserved dimensions, lazy loading, and compression.
- No horizontal document scroll at 320 CSS pixels.
- Search, product detail, messages, checkout, and order detail pass keyboard and screen-reader checks.
- All pages provide loading, empty, error, offline, and retry states where network data is involved.

## Analytics and Success Metrics

Track funnel and service outcomes, not social vanity metrics:

- Mobile search-to-detail rate.
- Product-detail-to-message rate.
- Product-detail-to-list, cart, or checkout rate.
- Checkout completion rate and failure reason.
- Message send success and reconnect recovery rate.
- Median first sales response time and percentage within agreed SLA.
- Conversation-to-qualified-lead and conversation-to-order rate.
- Mobile error rate, crash-free sessions, Core Web Vitals, and support-request fallback rate.

## Delivery Phases

### Phase 0: Contract and baseline audit

- Freeze route, analytics, and API compatibility requirements.
- Measure current mobile performance and record baseline screenshots.
- Verify chat provider contracts and sales authorization.
- Confirm final five-tab information architecture.
- Produce wireframes for home, search, product, messages, customer overview, orders, checkout, sales inbox, and sales conversation.

Exit: approved API contract, wireframes, device matrix, and no unresolved P0 chat unknowns.

### Phase 1: Foundations

- Add semantic design tokens, safe-area utilities, adaptive shell, bottom navigation, bottom sheet, page states, and responsive product card.
- Add accessibility and viewport checks to the verification workflow.
- Establish visual-regression widths and performance budgets.

Exit: foundations demonstrated on representative empty, loading, error, and populated fixtures.

### Phase 2: Storefront mobile conversion path

- Recompose home, categories, search, product detail, saved or cart entry, and public account entry.
- Split large search and product components without changing current API behavior.
- Add contextual `Ask sales` entry points.

Exit: anonymous and signed-in customers can move from home to product and message on all compact widths.

### Phase 3: Customer workspace

- Add mobile workspace navigation and recompose overview, products, listing, channels, orders, fulfillment, inventory, finance, insights, cart, checkout, account, and support.
- Preserve drafts and form state across navigation and viewport changes.

Exit: the primary authenticated business workflow is complete on a phone without desktop fallback.

### Phase 4: Shared conversation and sales desk

- Refactor chat into store, composables, provider adapter, timeline, composer, page, and desktop launcher.
- Add customer messages routes and contextual product or order cards.
- Link leads to conversations and add sales inbox, conversation, assignment, reply, follow-up, and notes.
- Keep WhatsApp and offline support requests as fallback channels.

Exit: one test customer and one test salesperson complete a real two-way conversation with delivery and identity verification.

### Phase 5: Hardening and rollout

- Run automated viewport, accessibility, interaction, API, and backend tests.
- Run real-device and in-app-browser acceptance.
- Load-test reconnect, message fan-out, upload, and rate limiting.
- Release behind feature flags by cohort, monitor metrics, and retain rollback to existing chat and workspace shell.

Exit: acceptance matrix passes and production monitoring confirms the error and performance budgets.

## Staffing and Estimate

Planning estimate for a team of two frontend engineers, one backend engineer, one product designer, and shared QA:

- Phase 0: 1 week.
- Phase 1: 1 week.
- Phase 2: 2 weeks.
- Phase 3: 2-3 weeks.
- Phase 4: 2-3 weeks, dependent on chat provider contracts.
- Phase 5: 1-2 weeks.

Expected total: 9-12 calendar weeks with overlapping design, engineering, and QA. A single full-stack engineer should plan for a longer staged delivery and release storefront, customer workspace, and sales messaging as separate milestones.

## Risks / Trade-offs

- Sales-side chat contract is the largest P0 risk. Mitigation: complete provider discovery before conversation implementation and keep a replaceable adapter.
- Existing large components increase regression risk. Mitigation: characterization tests and incremental extraction before visual recomposition.
- Current worktree contains active uncommitted Vue 3 migration and sales changes. Mitigation: implement only after those changes are reviewed or the branch strategy is agreed.
- In-app browsers may block storage, popups, or third-party handoffs. Mitigation: same-origin routes, explicit sign-in recovery, and tested fallbacks.
- Foldables change size while the app is active. Mitigation: window-based layout, state preservation, and no device-orientation assumptions.
- A copied social UI could hide commerce facts. Mitigation: borrow navigation and conversation logic only, while preserving CoDropshipping visual and procurement hierarchy.

## Migration and Rollback

1. Add new components and chat state behind feature flags while keeping current routes and `ChatMini` behavior.
2. Enable the adaptive storefront for internal and QA cohorts.
3. Enable the mobile customer workspace.
4. Enable the customer conversation route while retaining the old desktop launcher.
5. Enable sales conversation features only after staff authorization and real provider tests pass.
6. Remove the iframe bridge and old mobile floating modal after metrics and support logs remain stable.
7. Roll back by disabling feature flags or redeploying the previous immutable UI image. Data additions remain backward compatible.

## Open Questions Requiring Approval

- Should `Saved` or `Cart` occupy the storefront bottom navigation slot?
- Is there always exactly one assigned account manager per customer, or can customers have multiple sales conversations?
- Which chat provider endpoints are available for sales-side history, reply, read, assignment, and attachments?
- What sales roles and permissions must be supported at launch?
- Which languages are launch-critical for mobile layout validation?
- Is installable PWA behavior part of this release or a later phase?

