## ADDED Requirements

### Requirement: Actionable order management
The customer workspace MUST allow a customer to complete the order actions that it presents by using the existing CoD order contracts.

#### Scenario: Customer reviews an order
- **WHEN** a customer opens an order from the new workspace
- **THEN** the workspace shows available address, remark, shipping, fulfillment, cancellation, payment and tracking actions for that order state

### Requirement: Actionable inventory recommendation
The customer workspace MUST NOT render a replenishment action without a resulting tracked workflow.

#### Scenario: Customer requests replenishment
- **WHEN** a customer submits a replenishment request for a low-stock SKU
- **THEN** a structured request is created and the customer receives a referenceable success or failure state

### Requirement: Honest operational analytics
Finance and insight figures MUST disclose the time and record scope used for their calculation.

#### Scenario: Only a limited page is available
- **WHEN** an upstream endpoint returns a limited page rather than a complete aggregate
- **THEN** the interface labels the figures as the loaded record scope and does not describe them as complete business totals
