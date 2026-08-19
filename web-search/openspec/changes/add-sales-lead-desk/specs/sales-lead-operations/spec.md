## ADDED Requirements

### Requirement: First-party customer journey capture
The system SHALL record normalized storefront and customer-workspace journey events without storing authentication credentials or free-form field contents.

#### Scenario: Anonymous visitor opens the storefront
- **WHEN** a browser opens a storefront page for the first time
- **THEN** the system creates a persistent anonymous lead and records the page visit

#### Scenario: Signed-in customer enters the workspace
- **WHEN** the same-origin browser enters the authenticated customer workspace
- **THEN** the system associates available customer identity hints with the existing lead without sending the session token

### Requirement: Actionable sales alerts
The system SHALL create deduplicated sales notifications for first visits, return visits, and high-intent customer actions.

#### Scenario: Customer returns in a new session
- **WHEN** a known visitor starts a new session
- **THEN** sales receives one return-visit notification for that session

#### Scenario: Customer starts a listing action
- **WHEN** a customer starts AI listing, enters publish review, opens live support, or begins checkout
- **THEN** the lead score and reason update and sales receives a high-intent notification

### Requirement: Sales follow-up workspace
The system SHALL provide an internal workspace where sales can prioritize leads and preserve follow-up context.

#### Scenario: Sales opens the lead queue
- **WHEN** an authorized sales user opens the internal workspace
- **THEN** the page shows actionable leads ordered by urgency with an explainable latest reason

#### Scenario: Sales records follow-up
- **WHEN** sales changes status, owner, next follow-up time, or adds a note
- **THEN** the system persists the change and includes it in the lead timeline

### Requirement: Replaceable middle-office boundary
The system SHALL expose normalized journey and sales records through a stable service boundary so downstream notification and CRM systems can be added later.

#### Scenario: Middle office is connected later
- **WHEN** an external middle office becomes available
- **THEN** normalized events and follow-up records can be forwarded without redesigning customer touchpoints or the sales UI

