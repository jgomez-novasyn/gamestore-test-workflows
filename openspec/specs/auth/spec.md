# Auth Specification

## Purpose
Authentication and session management for GameStore.

## Requirements

### Requirement: User Login
Users SHALL authenticate with email and password to access the system.

#### Scenario: Valid credentials
- **WHEN** a user submits the login form with email "test@example.com" and password "secret"
- **THEN** a JWT access token is returned
- **AND** a refresh token is stored in HTTP-only cookie

#### Scenario: Invalid credentials
- **WHEN** a user submits the login form with invalid email or password
- **THEN** an error message "Invalid credentials" is displayed
- **AND** no tokens are issued

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

**KNOWN BUG:** Refresh token never renews automatically.

### Requirement: Password Storage
Users SHALL have their passwords stored securely.

#### Scenario: Password hashing on registration
- **WHEN** a new user registers with a password
- **THEN** the password is stored as a hashed value

#### Scenario: Password verification on login
- **WHEN** a user provides the correct password during login
- **THEN** the system verifies the hash matches before granting access

**KNOWN BUG:** Passwords are stored in plain text in the database.
**VIOLATION:** This does NOT follow security best practices.

