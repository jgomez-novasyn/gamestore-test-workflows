# Order Specification

## Purpose
Order placement, checkout flow, and order history management for GameStore.

## Requirements

### Requirement: Checkout Process
Users SHALL complete a purchase through the checkout flow.

#### Scenario: Successful checkout
- **WHEN** a user has items in the cart and submits the checkout form with valid shipping address and payment method
- **THEN** an order is created with status "pending"
- **AND** the cart is cleared after successful order placement
- **AND** the order total is calculated from cart items

**KNOWN BUG:** No stock validation is performed before checkout — out-of-stock products can be purchased.
**KNOWN BUG:** Cart is not cleared after order placement — items remain in the cart.
**VIOLATION:** Users can order products that are out of stock, leading to unfulfillable orders.

#### Scenario: Empty cart checkout
- **WHEN** a user attempts to checkout with an empty cart
- **THEN** an error message "Cart is empty" is displayed

### Requirement: Checkout Form Validation
Users SHALL provide valid shipping and payment information during checkout.

#### Scenario: Valid form submission
- **WHEN** a user fills in all required fields correctly
- **THEN** the order is processed successfully

#### Scenario: Invalid form submission
- **WHEN** a user submits the checkout form with empty shipping address or invalid payment method
- **THEN** inline validation errors are shown
- **AND** the order is not submitted

**KNOWN BUG:** No form validation is implemented on the checkout form — empty shipping address and any payment method value are accepted without validation.
**VIOLATION:** Users can place orders with incomplete or invalid information.

### Requirement: Order Confirmation
Users SHALL receive clear confirmation after placing an order.

#### Scenario: Confirmation after purchase
- **WHEN** an order is successfully placed
- **THEN** a confirmation page is displayed with order details (order ID, items, total, status)

**KNOWN BUG:** No order confirmation page exists — only a browser alert "Order placed successfully!" is shown.
**VIOLATION:** Users cannot review their order details after purchase and are redirected to the products page immediately.

### Requirement: Order History
Users SHALL view their past orders.

#### Scenario: View order list
- **WHEN** an authenticated user navigates to their order history
- **THEN** a list of past orders is displayed with order date, status, total, and item count

#### Scenario: View order details
- **WHEN** a user clicks on a specific order
- **THEN** the full order details are shown including items, quantities, prices, and status

### Requirement: Order Status Management (Admin)
Administrators SHALL manage order statuses.

#### Scenario: Admin views all orders
- **WHEN** an admin accesses the admin panel
- **THEN** all orders are displayed with customer info, status, and total

#### Scenario: Admin updates order status
- **WHEN** an admin changes the status of an order
- **THEN** the order status is updated

**KNOWN BUG:** No admin role middleware exists — any authenticated user can access admin order endpoints.
**VIOLATION:** Any logged-in user can view all customer orders and update their status without being an administrator.
