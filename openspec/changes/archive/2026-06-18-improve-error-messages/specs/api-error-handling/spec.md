## ADDED Requirements

### Requirement: Error class hierarchy
The backend SHALL define `AppError`, `NotFoundError`, `ValidationError`, and `AuthError` classes extending `Error`, each carrying a numeric `statusCode` property matching the HTTP status (404, 400, 401 respectively). `AppError` SHALL accept a custom status code. All error classes SHALL accept a `message` string passed to the parent `Error` constructor.

#### Scenario: NotFoundError returns 404
- **WHEN** `new NotFoundError('Product not found')` is thrown and caught by error middleware
- **THEN** the response SHALL have HTTP status 404 and body `{ "error": "Product not found" }`

#### Scenario: ValidationError returns 400
- **WHEN** `new ValidationError('Email already exists')` is thrown and caught by error middleware
- **THEN** the response SHALL have HTTP status 400 and body `{ "error": "Email already exists" }`

#### Scenario: AuthError returns 401
- **WHEN** `new AuthError('Invalid token')` is thrown and caught by error middleware
- **THEN** the response SHALL have HTTP status 401 and body `{ "error": "Invalid token" }`

#### Scenario: Generic Error returns 500
- **WHEN** a plain `Error` is thrown and caught by error middleware
- **THEN** the response SHALL have HTTP status 500 and body `{ "error": "Something went wrong!" }`

### Requirement: Centralized error middleware
The backend SHALL have a single Express error middleware function that catches errors passed via `next(err)`, reads `err.statusCode` if present (defaulting to 500), logs the error stack to console, and responds with `{ "error": err.message }` (using `"Something went wrong!"` for generic errors).

#### Scenario: Error middleware is registered last
- **WHEN** Express processes an error passed to `next(err)`
- **THEN** the error middleware SHALL handle it and send the appropriate response

### Requirement: Routes delegate to next(err)
All route handlers SHALL wrap their logic in a try/catch that calls `next(error)` in the catch block, instead of sending error responses inline.

#### Scenario: Route handler catches and forwards
- **WHEN** any route handler throws or encounters an error
- **THEN** the catch block SHALL call `next(error)` and SHALL NOT send a response directly

### Requirement: Consistent error response format
All error responses from the backend SHALL use the format `{ "error": "<message string>" }` with no additional envelope fields.

#### Scenario: Error response shape
- **WHEN** any backend endpoint returns an error
- **THEN** the response body SHALL be a JSON object with exactly one key `"error"` whose value is a string
