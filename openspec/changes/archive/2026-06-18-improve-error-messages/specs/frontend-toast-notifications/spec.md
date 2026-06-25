## ADDED Requirements

### Requirement: Toast notification component
The frontend SHALL have a Toast component that renders notifications in the top-right corner of the viewport. Toasts SHALL support two variants: `error` (red background) and `success` (green background). Toasts SHALL auto-dismiss after 4 seconds and SHALL be dismissible by clicking.

#### Scenario: Error toast appears
- **WHEN** `showError('Failed to load products')` is called
- **THEN** a red toast with text "Failed to load products" SHALL appear in the top-right corner

#### Scenario: Toast auto-dismisses
- **WHEN** a toast is shown
- **THEN** it SHALL disappear after 4 seconds

#### Scenario: Toast is click-dismissible
- **WHEN** a user clicks on a visible toast
- **THEN** it SHALL disappear immediately

#### Scenario: Successful toast
- **WHEN** `showSuccess('Order placed!')` is called
- **THEN** a green toast with text "Order placed!" SHALL appear in the top-right corner

### Requirement: Toast replaces alert() in Products page
The Products page SHALL use `showError()` instead of `alert()` for "Please login to add items to cart" and SHALL use `showError()` instead of `console.error()` when product loading fails. The success message for adding to cart SHALL use `showSuccess()` instead of `alert()`.

#### Scenario: Login prompt uses toast
- **WHEN** an unauthenticated user clicks "Add to Cart" on the Products page
- **THEN** an error toast SHALL appear instead of a browser `alert()` dialog

#### Scenario: Load failure shows toast
- **WHEN** product loading fails on the Products page
- **THEN** an error toast SHALL appear and the page SHALL NOT use `console.error()` silently

### Requirement: Toast replaces alert() in Checkout page
The Checkout page SHALL use `showError()` instead of `alert()` for order errors, and `showSuccess()` instead of `alert('Order placed successfully!')`. The generic failure fallback SHALL also use `showError()`.

#### Scenario: Checkout error uses toast
- **WHEN** order placement fails on the Checkout page
- **THEN** an error toast SHALL appear instead of a browser `alert()` dialog

#### Scenario: Checkout success uses toast
- **WHEN** order placement succeeds on the Checkout page
- **THEN** a success toast SHALL appear instead of a browser `alert()` dialog

### Requirement: Toast replaces console.error in Admin page
The Admin page SHALL use `showError()` instead of `console.error()` when admin data loading fails and when order status updates fail.

#### Scenario: Admin load failure shows toast
- **WHEN** admin data loading fails
- **THEN** an error toast SHALL appear and the admin SHALL NOT use `console.error()` silently

#### Scenario: Admin update failure shows toast
- **WHEN** an order status update fails on the Admin page
- **THEN** an error toast SHALL appear and the admin SHALL NOT use `console.error()` silently

### Requirement: Toast replaces console.error in CartContext
The CartContext SHALL use `showError()` instead of `console.error()` when cart fetching fails.

#### Scenario: Cart fetch failure shows toast
- **WHEN** refreshing the cart fails in CartContext
- **THEN** an error toast SHALL appear instead of silent `console.error()`

### Requirement: API service layer checks response.ok
The frontend API service (`api.ts`) SHALL check `response.ok` on all fetch calls. If the response is not OK, the promise SHALL reject with the `error` field from the parsed JSON body (or the status text as fallback).

#### Scenario: 401 response rejects with error message
- **WHEN** the API returns a 401 response with body `{ "error": "Invalid token" }`
- **THEN** the fetch promise SHALL reject with an Error whose `.message` is "Invalid token"

#### Scenario: 500 response rejects with fallback
- **WHEN** the API returns a 500 response with a non-JSON or empty body
- **THEN** the fetch promise SHALL reject with an Error whose `.message` is the HTTP status text
