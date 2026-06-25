## ADDED Requirements

### Requirement: Sliding Session Expiration
The system SHALL extend the session TTL on each authenticated request.

#### Scenario: Active user session stays alive
- **WHEN** an authenticated user makes a request within the session TTL window
- **THEN** the session expiry is reset to TTL minutes from the current time
- **AND** a new JWT with updated lastActivity timestamp is issued

#### Scenario: Inactive user session expires
- **WHEN** no authenticated requests are made within the session TTL window
- **THEN** the session expires
- **AND** the user must log in again

### Requirement: Configurable Session TTL
The session timeout SHALL be configurable via a constant.

#### Scenario: TTL constant defined
- **WHEN** the application starts
- **THEN** the session TTL is read from a constant SESSION_TTL_MINUTES
- **AND** the default value is 15 minutes
