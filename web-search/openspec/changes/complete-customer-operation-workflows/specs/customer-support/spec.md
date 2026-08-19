## ADDED Requirements

### Requirement: Shared reliable support conversation
The storefront and customer workspace MUST open the same customer support conversation and MUST expose connection and message delivery state.

#### Scenario: Customer opens support from the workspace
- **WHEN** the customer selects live support in the workspace
- **THEN** the existing assigned-manager conversation opens without navigating to a separate page

#### Scenario: A message cannot be delivered
- **WHEN** the socket is disconnected or delivery cannot be confirmed
- **THEN** the customer sees a clear failed or waiting state and can retry without losing the message
