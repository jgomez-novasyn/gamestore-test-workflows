## Context

Product prices in GameStore are stored as `String` in the Prisma schema (`Product.price`), causing all price filtering (`minPrice`/`maxPrice` `gte`/`lte` queries) and sorting (`price_asc`/`price_desc`) to use lexicographic comparison. For example, `"9.99" > "59.99"` alphabetically because `'9' > '5'`. The frontend also lacks any price-range filter inputs — users cannot filter by min/max price.

## Goals / Non-Goals

**Goals:**
- Change `Product.price` from `String` to `Float` in Prisma schema and database
- Fix backend price filtering to use numeric comparison
- Fix backend price sorting to order numerically
- Add min/max price filter inputs to the frontend catalog page
- Update seed data to use numeric prices

**Non-Goals:**
- Fix pagination `skip: 0` bug (separate concern)
- Change how prices are displayed on the frontend
- Add any other filter types or full-text search
- Introduce a test suite

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Price type | `Float` (not `Int` or `Decimal`) | Prices have 2 decimal places; `Float` in Prisma maps to SQLite `REAL`. Sufficient for a store with no high-precision accounting requirements. `Decimal` would be overkill for SQLite. |
| Migration strategy | Add column, cast, drop old | Create new `Float` column, update all rows via `CAST(price AS REAL)`, then drop string column. Using Prisma migration with custom SQL step. |
| Frontend approach | Simple two-input form (min/max) | Keep it lightweight — no slider, no debounce. Two number inputs + a "Filter" button that adds `minPrice`/`maxPrice` to existing query params. Matches existing patterns. |
| Sorting fix | Remove `String()` casts; Prisma handles type | No special conversion needed — once schema is `Float`, Prisma generates correct SQL. |

## Risks / Trade-offs

- **[Data Migration]** Existing string prices like `"9.99"` cast cleanly to `9.99`, but any malformed values would become `0.0`. Mitigation: inspect seed data (all well-formed) and add a sanity-check query before/after migration.
- **[No test suite]** Changes cannot be verified automatically. Manual verification via browser/curl is the norm for this project.
- **[SQLite limitation]** SQLite `REAL` is 8-byte IEEE floating point; very large numbers or extreme precision may incur rounding, but game store prices are well within safe range.
- **[Migration rollback]** Rolling back requires re-adding a String column and re-casting. Mitigation: document rollback steps in migration plan.
