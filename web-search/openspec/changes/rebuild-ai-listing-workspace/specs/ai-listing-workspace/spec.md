## ADDED Requirements

### Requirement: Real product listing handoff

The product detail page SHALL offer AI-assisted and manual listing paths for the current real product and SHALL preserve the selected listing language.

#### Scenario: Signed-out customer chooses AI List

- **WHEN** a signed-out customer selects a language and clicks AI List on a product
- **THEN** the customer is sent to the real login page and returned to the same listing task after successful login

### Requirement: Customer-owned listing draft

The system SHALL store each listing draft under the authenticated CoD customer identity and SHALL initialize it from the existing CoD product API.

#### Scenario: Draft creation

- **WHEN** an authenticated customer enters a listing task for the first time
- **THEN** the system creates a durable draft containing the source title, description, images, and variants

### Requirement: AI is advisory

The system SHALL keep AI proposals separate from merchant-approved content and SHALL never automatically apply or publish a proposal.

#### Scenario: AI proposal becomes ready

- **WHEN** the AI provider returns suggested content
- **THEN** the customer can review and adopt individual fields while the saved draft remains unchanged until the customer saves

### Requirement: Complete listing review

The editor SHALL allow the customer to review and change title, description, SEO, images, variants, price, inventory, language, and destination store before publishing.

#### Scenario: Required data is missing

- **WHEN** the customer attempts to publish without a title, selected image, selected variant, or destination store
- **THEN** publishing is blocked and the missing requirement is shown

### Requirement: Explicit and idempotent publish

The system SHALL publish only after the customer selects a connected store and activates the final publish action. Identical successful retries SHALL NOT create duplicate products.

#### Scenario: Customer retries a completed publish

- **WHEN** the customer repeats an unchanged publish request for the same draft revision and store
- **THEN** the system returns the recorded successful result instead of calling the channel again
