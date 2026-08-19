## ADDED Requirements

### Requirement: Lead-to-conversation linkage
The system SHALL link a sales lead to the approved customer conversation using normalized visitor, customer, manager, lead, and conversation identifiers without exposing customer or staff credentials.

#### Scenario: Sales opens a lead with a conversation
- **WHEN** an authorized salesperson opens a lead that has a valid conversation identity
- **THEN** the desk provides direct access to the correct conversation, unread count, last-message state, and relevant product or order context

#### Scenario: Conversation contract is unavailable
- **WHEN** the chat provider cannot return or authorize the sales conversation
- **THEN** the desk shows an explicit unavailable state and safe fallback instead of fabricated history or a nonfunctional reply control

### Requirement: Authorized sales messaging
The system SHALL allow only authenticated and authorized staff to read or send customer messages, attach approved files, and assign conversations.

#### Scenario: Unauthorized user requests a conversation
- **WHEN** a user without the required sales role requests conversation history or reply access
- **THEN** the service rejects the request without disclosing message or customer data

### Requirement: Message delivery integrity
The system SHALL provide idempotent sends, delivery state, reconnect recovery, unread state, and message ordering based on provider-confirmed identifiers and timestamps.

#### Scenario: Sales retries after a network interruption
- **WHEN** the network fails after a salesperson sends a message and the client retries
- **THEN** the customer receives at most one logical message and both sides converge on the provider-confirmed state

### Requirement: Separate internal collaboration
The system SHALL keep sales notes, assignment history, follow-up, and audit records separate from the customer-visible conversation.

#### Scenario: Sales records an internal note
- **WHEN** a salesperson adds a note to a lead
- **THEN** the note appears in authorized internal history and never appears in the customer conversation

### Requirement: Mobile sales operations
The sales desk SHALL provide phone-usable Inbox, Leads, Follow-ups, and Account destinations with focused list, detail, and conversation views.

#### Scenario: Sales replies from a phone
- **WHEN** an authorized salesperson opens an unread lead on a compact phone window
- **THEN** the salesperson can review context, reply, set follow-up, and return to the same queue position without using the desktop three-pane layout

