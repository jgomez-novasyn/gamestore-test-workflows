## Why

Product price filtering and sorting in GameStore use lexicographic (alphabetical) comparison because `Product.price` is stored as a `String` in the database. This causes incorrect results — e.g., `"59.99" < "9.99"` evaluates to `true`, so price-range filters return wrong products and price sorting is completely scrambled. Users also cannot filter by price range from the frontend at all, as no min/max price inputs exist.

## What Changes

- Change `Product.price` from `String` to `Float` in Prisma schema
- Add and run a database migration to convert existing string prices to floats
- Fix backend price filter logic (minPrice/maxPrice) to use numeric comparison
- Fix backend sort-by-price logic (price_asc/price_desc)
- Add minPrice/maxPrice input fields to the frontend product listing page
- Update seed data to use numeric price values
- Clean up explicit `String()` casts in product create/update routes

## Capabilities

### New Capabilities

- `price-filter-ui`: Frontend price range filter controls (min/max inputs) on the catalog page, wired to backend query params

### Modified Capabilities

- `catalog`: Price filtering and sorting requirements will be met correctly — numeric comparison replaces broken lexicographic comparison. Pagination bug is out of scope for this change.

## Impact

- `backend/prisma/schema.prisma` — `price` field type change
- `backend/prisma/` — new migration required
- `backend/prisma/seed.ts` — price values updated to numbers
- `backend/src/routes/products.ts` — filter/sort logic, remove `String()` casts
- `frontend/src/pages/Products.tsx` — add price range filter UI
- `frontend/src/services/api.ts` — no changes needed (plumbing already works)
