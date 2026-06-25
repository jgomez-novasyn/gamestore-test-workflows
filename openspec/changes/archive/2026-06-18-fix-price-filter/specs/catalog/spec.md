## MODIFIED Requirements

### Requirement: Price Filter

Users SHALL filter products by price range using numeric comparison.

#### Scenario: Filter by price range
- **WHEN** a user applies a price filter between 10 and 30
- **THEN** only products with numeric prices between 10 and 30 are returned

#### Scenario: Filter by min price only
- **WHEN** a user applies a min price filter of 15
- **THEN** only products with numeric price >= 15 are returned

#### Scenario: Filter by max price only
- **WHEN** a user applies a max price filter of 20
- **THEN** only products with numeric price <= 20 are returned

#### Scenario: Sort by price ascending
- **WHEN** a user selects "Price: Low to High"
- **THEN** products are ordered from lowest to highest numeric price

#### Scenario: Sort by price descending
- **WHEN** a user selects "Price: High to Low"
- **THEN** products are ordered from highest to lowest numeric price
