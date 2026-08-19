## ADDED Requirements

### Requirement: One adaptive storefront
The system SHALL provide the storefront through one Nuxt 3 route and component architecture that adapts from 320 CSS pixels to expanded foldable and desktop windows without a separate mobile site.

#### Scenario: Customer opens a compact phone viewport
- **WHEN** the storefront window is 320 CSS pixels wide
- **THEN** all primary content and actions reflow without horizontal document scrolling or desktop-only fallback

#### Scenario: Customer unfolds a foldable
- **WHEN** the available window changes from compact to expanded while a customer is browsing
- **THEN** the layout adapts and preserves the active route, input state, selected product context, and useful scroll position

### Requirement: Mobile commerce navigation
The system SHALL provide no more than five persistent mobile destinations and SHALL keep messages directly accessible with an unread indicator.

#### Scenario: Customer receives a sales message
- **WHEN** an unread sales message arrives while the customer is browsing another storefront page
- **THEN** the persistent Messages destination displays an accurate unread state and opens the conversation

### Requirement: Complete phone conversion path
The system SHALL allow a customer to discover, search, inspect, ask sales, select the supported conversion action, checkout, and review order status from a phone.

#### Scenario: Customer asks about a product
- **WHEN** the customer selects `Ask sales` from a product result or product detail
- **THEN** the system opens the assigned conversation with a structured reference to that product

#### Scenario: Customer completes checkout
- **WHEN** the customer has valid items, address, shipping, and payment information
- **THEN** the customer can review and submit the order without being redirected to a desktop-only page

### Requirement: Touch and safe-area support
The system SHALL keep critical controls operable with touch and visible around device cutouts, browser chrome, virtual keyboards, and gesture areas.

#### Scenario: Customer types a chat message on an iPhone-class device
- **WHEN** the virtual keyboard opens and the bottom safe area is non-zero
- **THEN** the composer and send action remain visible, reachable, and free from overlap

### Requirement: Mobile interaction states
Every data-backed mobile surface SHALL provide layout-matched loading, empty, error, offline, and retry states.

#### Scenario: Search fails on a poor network
- **WHEN** a product search request fails or times out
- **THEN** the page preserves the query and selected filters, explains the failure, and offers a retry action

