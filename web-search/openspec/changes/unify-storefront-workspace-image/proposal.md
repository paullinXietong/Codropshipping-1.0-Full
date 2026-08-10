# Change: Unify the storefront and customer workspace image

## Why
The test environment updated the CoD storefront while continuing to serve the legacy customer backend. Packaging the two user-facing applications separately allows this version mismatch to happen again.

## What Changes
- Build the Nuxt storefront and the approved Vue customer workspace into one immutable UI image.
- Serve `/` and `/admin/*` from the same container and release tag.
- Remove Caddy from the release topology.
- Keep listing and search APIs as independent data services behind the unified UI container.
- Publish the unified UI container directly from Docker so `/` and `/admin/*` cannot be routed to different releases.

## Impact
- Affected specs: production-deployment
- Affected code: Docker build files, UI container routing, Compose topology, release CI, and IT deployment documentation
