# Cart Specification

## Purpose
Shopping cart management for GameStore.

## Requirements

### Requirement: Add Item to Cart
Users SHALL add products to their shopping cart.

#### Scenario: Add new product
- **WHEN** a user adds a product to the cart
- **THEN** the product appears with quantity 1
- **AND** the cart total is updated

#### Scenario: Add existing product
- **WHEN** a user adds a product already in the cart
- **THEN** the quantity increments by 1
- **AND** no duplicate cart item is created

### Requirement: Update Cart Item Quantity
Users SHALL update item quantities in their cart.

#### Scenario: Increase quantity
- **WHEN** a user increases the quantity of a cart item
- **THEN** the item quantity is updated
- **AND** the cart total is recalculated

#### Scenario: Decrease quantity
- **WHEN** a user decreases the quantity of a cart item
- **THEN** the item quantity is updated
- **AND** the cart total is recalculated

**KNOWN BUG:** Cart total is not recalculated when quantity changes.

### Requirement: Remove Cart Item
Users SHALL remove items from their cart.

#### Scenario: Remove single item
- **WHEN** a user removes an item from the cart
- **THEN** the item is removed
- **AND** the cart total is updated

#### Scenario: Clear entire cart
- **WHEN** a user clears the cart
- **THEN** all items are removed
- **AND** the cart total returns to zero

### Requirement: Cart Persistence
Users SHALL retain their cart across page reloads.

#### Scenario: Reload page with cart items
- **WHEN** a user reloads the page after adding items to the cart
- **THEN** the cart items are still visible

**KNOWN BUG:** Cart is lost on page reload — no persistence mechanism.

### Requirement: Stock Validation
Users SHALL only add products that are in stock.

#### Scenario: Add in-stock product
- **WHEN** a user adds a product that has sufficient stock
- **THEN** the product is added to the cart

#### Scenario: Add out-of-stock product
- **WHEN** a user adds a product that is out of stock
- **THEN** an error message is displayed
- **AND** the product is not added to the cart

**KNOWN BUG:** No stock validation is performed before adding items to cart.
**VIOLATION:** Users can add out-of-stock products without any warning.
