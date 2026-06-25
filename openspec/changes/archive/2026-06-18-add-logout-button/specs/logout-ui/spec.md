## ADDED Requirements

### Requirement: Logout button visibility
The system SHALL display a Logout button in the Navbar only when a user is authenticated.

#### Scenario: Authenticated user sees logout button
- **WHEN** a user is logged in (user object is not null in AuthContext)
- **THEN** the Navbar SHALL render a "Logout" button

#### Scenario: Unauthenticated user does not see logout button
- **WHEN** no user is authenticated
- **THEN** the Navbar SHALL NOT render a Logout button (Login/Register links shown instead)

### Requirement: Logout confirmation
The system SHALL prompt the user to confirm before executing logout.

#### Scenario: User confirms logout
- **WHEN** user clicks the Logout button
- **THEN** a confirmation dialog SHALL appear asking "Are you sure you want to logout?"
- **WHEN** user clicks "OK"
- **THEN** the logout process SHALL proceed

#### Scenario: User cancels logout
- **WHEN** user clicks the Logout button
- **THEN** a confirmation dialog SHALL appear
- **WHEN** user clicks "Cancel"
- **THEN** the logout process SHALL be aborted

### Requirement: Backend session invalidation
The system SHALL call the backend logout endpoint to invalidate the server-side session before clearing local state.

#### Scenario: Successful backend logout
- **WHEN** user confirms logout
- **THEN** the system SHALL send POST /api/auth/logout with the auth token
- **THEN** the system SHALL wait for the backend response
- **THEN** the system SHALL clear local tokens
- **THEN** the system SHALL redirect to /login

#### Scenario: Backend logout fails
- **WHEN** the POST /api/auth/logout call fails (network error or server error)
- **THEN** the system SHALL still clear local tokens
- **THEN** the system SHALL redirect to /login

### Requirement: Token cleanup
The system SHALL remove all auth tokens from localStorage and in-memory state on logout.

#### Scenario: Tokens cleared on logout
- **WHEN** logout completes
- **THEN** localStorage SHALL NOT contain "token" or "refreshToken" keys
- **THEN** in-memory auth token and refresh token variables SHALL be null
- **THEN** AuthContext user state SHALL be null

### Requirement: Post-logout redirect
The system SHALL redirect the user to the login page after successful logout.

#### Scenario: Redirect to login after logout
- **WHEN** logout completes
- **THEN** the browser SHALL navigate to /login
