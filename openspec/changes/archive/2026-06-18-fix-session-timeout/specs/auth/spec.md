## MODIFIED Requirements

### Requirement: Session Persistence
Users SHALL maintain their session for 15 minutes after login, with the timeout resetting on each authenticated request.

#### Scenario: Session timeout with sliding expiration
- **WHEN** 15 minutes pass without any request from an authenticated user
- **THEN** the session expires
- **AND** the user must log in again

#### Scenario: Active use extends session
- **WHEN** an authenticated user makes a request before the 15-minute timeout
- **THEN** the session TTL is reset
- **AND** the user remains authenticated
