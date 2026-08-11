## ADDED Requirements

### Requirement: Global language preference

The storefront and customer workspace SHALL expose one global site and listing language preference and SHALL use English when no preference exists.

#### Scenario: Customer changes language

- **WHEN** the customer selects a supported language
- **THEN** the preference is persisted, document language and direction are updated, and the listing handoff uses the selected language

#### Scenario: Background translation is slow or unavailable

- **WHEN** a translation request does not return promptly
- **THEN** the header remains usable, does not display a permanent loading spinner, and stops the request after a bounded timeout

### Requirement: Storefront workspace shortcuts

Every storefront header SHALL send the order and cart shortcuts to the redesigned customer workspace instead of legacy account pages.

#### Scenario: Customer opens orders or cart

- **WHEN** the customer selects the order or cart shortcut in any storefront header
- **THEN** the corresponding new workspace module opens while existing authentication protection is preserved

### Requirement: Listing language consistency

The system SHALL attach the selected language to new listing drafts and AI proposal requests.

#### Scenario: Customer creates a non-English listing

- **WHEN** a customer selects a non-English language before starting the AI-assisted listing path
- **THEN** the draft and AI proposal use that target language unless the customer changes it in the editor
