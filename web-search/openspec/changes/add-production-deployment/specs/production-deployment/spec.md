## ADDED Requirements

### Requirement: Complete production topology

The deployment package SHALL run the storefront, customer workspace, search API, and listing orchestrator as independently health-checked services behind one HTTPS origin.

#### Scenario: Customer opens the new workspace

- **WHEN** an authenticated customer visits a path under `/admin/`
- **THEN** Caddy serves the new customer workspace instead of the legacy remote workspace

#### Scenario: Workspace calls the listing service

- **WHEN** the customer workspace calls a path under `/listing-api/`
- **THEN** Caddy forwards the request to the private listing orchestrator without exposing its container port publicly

### Requirement: Durable and private listing data

The deployment SHALL store listing drafts, proposals, events, and publish jobs in a persistent server volume and SHALL NOT package local runtime data in source control or application images.

#### Scenario: Containers are replaced

- **WHEN** the listing container is recreated during an upgrade
- **THEN** previously stored listing data remains available from the persistent volume

### Requirement: Production secret isolation

The deployment SHALL obtain AI, database, and administrative credentials from server-managed environment variables and SHALL fail clearly when a required production secret is missing.

#### Scenario: Required secret is absent

- **WHEN** IT starts the production stack without a required credential
- **THEN** deployment validation fails before the affected service is exposed to customers

### Requirement: Verifiable release and rollback

The repository SHALL provide automated tests, builds, configuration validation, smoke-test instructions, backups, and a rollback procedure for each release.

#### Scenario: IT prepares a release

- **WHEN** IT submits the release branch for deployment
- **THEN** CI verifies service tests, frontend builds, deployment configuration, and the absence of committed secrets
