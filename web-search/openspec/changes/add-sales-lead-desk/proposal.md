# Change: Add a real-time sales lead desk

## Why
Sales needs to know when a customer first arrives, when they return, and what high-intent actions they take before the future middle-office integration is available. The current storefront chat and customer workspace do not provide one explainable follow-up queue.

## What Changes
- Capture first-party storefront and customer-workspace journey events without storing credentials or form contents.
- Turn first visits, return visits, and high-intent actions into deduplicated sales notifications and an explainable intent score.
- Add a hidden internal sales lead desk with a lead queue, customer timeline, ownership, status, follow-up time, and notes.
- Keep the event and sales APIs behind the existing listing service so a future CRM or middle office can replace the transport layer without rebuilding the UI.

## Impact
- Affected specs: `sales-lead-operations`
- Affected code: `listing-backend`, storefront tracking plugin, member-center tracking service, unified Docker configuration, internal sales page

