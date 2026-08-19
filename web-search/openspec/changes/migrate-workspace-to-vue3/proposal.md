# Change: Migrate the customer workspace into Vue 3

## Why
The current unified UI image still builds a separate Vue 2 customer workspace and serves it as static files under `/admin`. This preserves two frontend runtimes, duplicates language and session behavior, and allows customer workflows to drift from the Nuxt 3 storefront.

## What Changes
- Move the customer workspace shell and primary customer workflows into the existing Nuxt 3 and Vue 3 application.
- Preserve the current `/admin/*` URLs and existing CoD, listing, search and support API contracts.
- Provide one shared session, language selector, support entry, navigation system and operational-state model across storefront and workspace.
- Remove the Vue 2 build stage and static `/admin` artifact from the unified UI image.
- Keep listing and search data services isolated behind the same Docker deployment network while shipping one immutable Vue 3 customer UI image.

## Impact
- Affected specs: production-deployment, customer-operations, customer-support, ai-listing-workspace, global-content-language
- Affected code: Nuxt pages, workspace components and composables, Docker unified image, Nginx routing, release checks and documentation
- Existing business API payloads and public route slugs remain compatible.
