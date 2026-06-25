## ADDED Requirements

### Requirement: Login form has per-field validation
The Login page SHALL validate that the email field contains a non-empty string with an `@` symbol and that the password field is non-empty. Validation SHALL run on form submit. Invalid fields SHALL display a red error message directly below the input. The form SHALL NOT be submitted if validation fails.

#### Scenario: Empty email shows error
- **WHEN** the user submits the login form with an empty email field
- **THEN** a red error message "Email is required" SHALL appear below the email input and the form SHALL NOT be submitted

#### Scenario: Invalid email format shows error
- **WHEN** the user submits the login form with an email that does not contain `@`
- **THEN** a red error message "Invalid email format" SHALL appear below the email input and the form SHALL NOT be submitted

#### Scenario: Empty password shows error
- **WHEN** the user submits the login form with an empty password field
- **THEN** a red error message "Password is required" SHALL appear below the password input and the form SHALL NOT be submitted

#### Scenario: Valid fields submit the form
- **WHEN** the user submits the login form with a valid email and non-empty password
- **THEN** the form SHALL submit and call the login API

### Requirement: Register form has per-field validation
The Register page SHALL validate that the name is non-empty, email is a valid format, and password is at least 6 characters. Validation SHALL run on form submit. Invalid fields SHALL display red error messages below the input. The form SHALL NOT be submitted if validation fails.

#### Scenario: Empty name shows error
- **WHEN** the user submits the register form with an empty name field
- **THEN** a red error message "Name is required" SHALL appear below the name input

#### Scenario: Short password shows error
- **WHEN** the user submits the register form with a password shorter than 6 characters
- **THEN** a red error message "Password must be at least 6 characters" SHALL appear below the password input

### Requirement: Checkout form has per-field validation
The Checkout page SHALL validate that the shipping address is non-empty and that a payment method is selected. Validation SHALL run on form submit. Invalid fields SHALL display red error messages below the input. The form SHALL NOT be submitted if validation fails.

#### Scenario: Empty address shows error
- **WHEN** the user submits the checkout form with an empty shipping address
- **THEN** a red error message "Shipping address is required" SHALL appear below the address input

#### Scenario: No payment method shows error
- **WHEN** the user submits the checkout form without selecting a payment method
- **THEN** a red error message "Please select a payment method" SHALL appear below the payment section

#### Scenario: All fields valid submits order
- **WHEN** the user submits the checkout form with a non-empty address and a selected payment method
- **THEN** the form SHALL submit and call the checkout API
