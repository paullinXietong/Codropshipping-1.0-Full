## ADDED Requirements
### Requirement: Shared Vue 3 workspace shell
The system SHALL provide one responsive workspace shell with shared account, language, search, messages and support controls.

#### Scenario: Customer enters from the storefront
- **WHEN** a signed-in customer opens an existing `/admin/*` shortcut
- **THEN** the shell MUST reuse the storefront session and selected language without another frontend application handoff

### Requirement: Complete visible actions
Every primary action shown in the workspace SHALL either execute an existing API workflow or disclose the exact setup that is missing.

#### Scenario: Upstream capability exists
- **WHEN** the customer submits a supported action
- **THEN** the page MUST call the real upstream contract and show loading, success and contextual failure states

#### Scenario: Upstream capability is not contracted
- **WHEN** the customer opens an unsupported integration
- **THEN** the page MUST provide a tracked request or configuration state and MUST NOT present a false connected or completed state

### Requirement: Global interface language
The workspace SHALL apply the shared site and listing language to navigation, controls, feedback states and newly rendered content.

#### Scenario: Customer changes language
- **WHEN** the customer selects a supported language in the workspace header
- **THEN** the visible workspace MUST update without a full-page loading lock and the preference MUST persist for listing creation
