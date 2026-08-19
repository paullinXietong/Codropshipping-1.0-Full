# Change: Complete customer operation workflows

## Why
The new customer workspace presents modern order, fulfillment, inventory, finance, insight and support surfaces, but several actions are still read-only, route into legacy pages, or depend on a fragile legacy chat widget. Customers must be able to complete the visible task without discovering a dead button or an unexplained handoff.

## What Changes
- Replace the storefront-only support handoff with one reliable support experience shared by storefront and workspace, including connection and delivery states.
- Connect the new order and fulfillment surfaces to the existing CoD edit, shipping, fulfillment, delivery-order, payment, cancellation and tracking APIs.
- Replace the legacy cart checkout route with a new workspace checkout that reuses the existing preview, address, shipping and order-create contracts.
- Turn low-stock recommendations into a real replenishment request flow instead of a dead button.
- Make finance and insights disclose their data scope and avoid presenting incomplete samples as complete business totals.

## Impact
- Affected specs: customer operations, customer support, sourcing checkout, operations analytics
- Affected code: `member-center/src/views/workspace/*`, `web-search/components/ChatMini.vue`, workspace routing and i18n
- Existing CoD API contracts remain unchanged.
