## ADDED Requirements

### Requirement: Real product listing handoff

The product detail page SHALL present one primary "List to my store" action that opens the AI-assisted listing path for the current real product. The page SHALL keep manual listing and direct ordering available as lower-priority actions, SHALL keep Add to cart as the secondary visible action when supported, and SHALL preserve the globally selected listing language without requiring another inline language selector.

#### Scenario: Signed-out customer chooses the primary listing action

- **WHEN** a signed-out customer clicks List to my store on a product
- **THEN** the customer is sent to the real login page and returned to the same listing task after successful login

#### Scenario: Customer chooses manual listing

- **WHEN** a customer activates the quiet Manual listing action
- **THEN** the same product, source, region, and global language are passed to the manual listing editor

#### Scenario: Product source does not support listing

- **WHEN** a product source cannot enter the listing workflow
- **THEN** the page shows only the relevant Add to cart and Order now procurement actions

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
