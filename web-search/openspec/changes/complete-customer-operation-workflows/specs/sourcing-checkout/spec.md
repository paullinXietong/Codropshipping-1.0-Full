## ADDED Requirements

### Requirement: New workspace checkout
Selected sourcing-cart variants MUST proceed through a checkout that belongs to the new workspace and uses live CoD preview, address, freight and order creation data.

#### Scenario: Customer checks out selected variants
- **WHEN** the customer continues from the new cart
- **THEN** the new checkout loads the selected items, confirms a saved address and shipping choice, previews the exact payable amount, and creates the order only after explicit confirmation
