# Change: Rebuild the customer listing workspace

## Why

The legacy customer center separates product selection, editing, channel connection, and publishing across technical pages. Customers need one understandable path from a real CoD product to a reviewed Shopify listing, with AI assistance that remains under customer control.

## What Changes

- Simplify the real product detail page to one primary "List to my store" action with AI assistance by default, while keeping manual listing and procurement paths available as secondary actions.
- Add durable, customer-owned listing drafts and explicit AI proposals.
- Add a reviewable editor for content, media, variants, pricing, inventory, SEO, language, and destination store.
- Publish only after explicit customer confirmation through the existing CoD Shopify integration.
- Redesign the active customer workspace around Overview, Product Library, Sales Channels, Orders, Fulfillment, Inventory, Finance, and Insights.
- Add one global site and listing language preference, with English as the default.
- Remove active sample metrics, test stores, fake success states, and automatic AI application from the new path.

## Impact

- Affected specs: `ai-listing-workspace`, `global-content-language`
- Affected code: `web-search/pages/productDetail.vue`, storefront language control, member-center navigation and workspace pages, local listing orchestration service
- External dependencies: existing CoD identity, product, store, image upload, and Shopify publishing APIs; an approved AI listing provider
