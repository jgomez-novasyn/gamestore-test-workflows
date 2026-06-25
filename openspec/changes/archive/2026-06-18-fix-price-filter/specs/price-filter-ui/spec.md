## ADDED Requirements

### Requirement: Price Range Filter UI

The catalog page SHALL provide min and max price input fields for filtering products by price range.

#### Scenario: Filter by min price
- **WHEN** a user enters "10" in the min price field and clicks filter
- **THEN** the product list updates to show only products with price >= 10

#### Scenario: Filter by max price
- **WHEN** a user enters "50" in the max price field and clicks filter
- **THEN** the product list updates to show only products with price <= 50

#### Scenario: Filter by both min and max
- **WHEN** a user enters "10" in min price and "50" in max price and clicks filter
- **THEN** the product list updates to show only products with price between 10 and 50

#### Scenario: Clear price filter
- **WHEN** a user clears the price filter inputs and clicks filter
- **THEN** the product list returns to showing all products without price filtering

#### Scenario: Filter resets pagination
- **WHEN** a user applies a price filter while on page 2
- **THEN** the page resets to 1 and filtered results are shown
