# Catalog Specification

## Purpose
Product listing, filtering, and pagination for GameStore.

## Requirements

### Requirement: Product Pagination
Users SHALL browse products in pages of 10 items.

#### Scenario: First page
- **WHEN** a user requests page 1
- **THEN** products 1-10 are returned

#### Scenario: Second page
- **WHEN** a user requests page 2
- **THEN** products 11-20 are returned

**KNOWN BUG:** Page 2 returns the same products as page 1.

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

### Requirement: Product Images
Users SHALL view product images correctly.

#### Scenario: Display product image
- **WHEN** a user views a product in the catalog
- **THEN** the product image is displayed from the backend URL

#### Scenario: Broken image fallback
- **WHEN** a product image URL is not accessible
- **THEN** a fallback placeholder image is shown

**KNOWN BUG:** Product images use absolute local paths instead of relative or CDN URLs, causing broken images in production.