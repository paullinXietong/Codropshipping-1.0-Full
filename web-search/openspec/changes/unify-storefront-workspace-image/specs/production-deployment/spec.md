## ADDED Requirements
### Requirement: Atomic UI release image
The deployment SHALL package the CoD storefront and the approved customer workspace in one immutable UI image and SHALL serve both applications from the same running container.

#### Scenario: Storefront and workspace are deployed
- **WHEN** IT deploys a UI release tag
- **THEN** `/` serves the storefront from that tag
- **AND** `/admin/*` serves the customer workspace from the same tag and container

#### Scenario: Docker publishes the customer origin
- **WHEN** the release is started
- **THEN** Docker publishes the unified UI port directly
- **AND** no Caddy service or legacy `/admin` upstream participates in the request path

#### Scenario: UI release rolls back
- **WHEN** IT restores a previous UI image tag
- **THEN** both the storefront and customer workspace roll back together

### Requirement: UI route health verification
The unified UI container MUST expose health checks that verify both the storefront runtime and the packaged customer workspace.

#### Scenario: Workspace artifact is missing
- **WHEN** the unified image does not contain a valid `/admin/index.html`
- **THEN** the container health check fails before the release is accepted
