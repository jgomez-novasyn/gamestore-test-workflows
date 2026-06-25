## MODIFIED Requirements

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
