## ADDED Requirements

### Requirement: Mobile customer workspace shell
The system SHALL provide a phone-first workspace shell with no more than five primary destinations while preserving every supported `/admin/*` route.

#### Scenario: Signed-in customer enters the workspace on a phone
- **WHEN** a signed-in customer opens an existing `/admin/*` route in a compact window
- **THEN** the route renders inside the mobile workspace shell with the current task and navigation state preserved

### Requirement: Phone-complete customer operations
The system SHALL keep all supported product, listing, channel, order, fulfillment, inventory, finance, insight, cart, checkout, account, and support actions usable on a phone.

#### Scenario: Customer edits a listing draft
- **WHEN** a customer edits listing content and the viewport or virtual keyboard changes
- **THEN** the draft values and current review section remain intact

#### Scenario: Customer reviews an order
- **WHEN** a customer opens an order from the phone order list
- **THEN** the system shows one focused order detail with all approved actions and a reliable back path to the same list state

### Requirement: Responsive information density
The system SHALL recompose dense desktop tables and multi-pane layouts into phone-appropriate summaries, focused details, cards, or essential horizontal comparison regions without losing business data.

#### Scenario: Customer reviews fulfillment data
- **WHEN** fulfillment data contains more columns than fit in a compact window
- **THEN** the system presents the key status and actions first and keeps the remaining approved fields accessible without shrinking text below the design standard

### Requirement: Shared customer conversation
The customer workspace SHALL use the same assigned conversation, message history, unread state, and message delivery model as the storefront.

#### Scenario: Customer moves from a product to the workspace
- **WHEN** a signed-in customer opens Messages after entering the workspace
- **THEN** the system shows the same conversation and product context that was available on the storefront

