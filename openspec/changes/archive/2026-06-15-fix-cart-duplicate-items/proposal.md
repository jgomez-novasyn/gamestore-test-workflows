## Why

Adding a product already in the cart creates a duplicate cart item instead of incrementing the existing item's quantity, violating the cart spec requirement and causing incorrect item counts and totals.

## What Changes

- Fix `POST /api/cart/add` to update the existing cart item's quantity instead of creating a new duplicate entry
- No API contract changes — same request/response shape
- No breaking changes

## Capabilities

### New Capabilities
<!-- No new capabilities — this is a bug fix to an existing capability -->

### Modified Capabilities
- `cart`: Fix "Add existing product" scenario — change backend behavior from creating duplicate items to incrementing quantity on the existing item

## Impact

- `backend/src/routes/cart.ts` — fix the `if (existingItem)` branch in `POST /add` handler
- No database schema changes
- No frontend changes needed (frontend already handles items by unique `item.id`)
