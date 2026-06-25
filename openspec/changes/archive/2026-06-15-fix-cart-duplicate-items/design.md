## Context

`POST /api/cart/add` creates a duplicate `CartItem` row when a product is already in the cart, instead of incrementing the quantity of the existing row. The existing cart spec requires quantity increment (no duplicates), and this is a documented known bug.

## Goals / Non-Goals

**Goals:**
- Fix the `if (existingItem)` branch in `cart.ts` to call `prisma.cartItem.update` instead of `prisma.cartItem.create`
- Maintain identical API contract (same request body, same response shape)

**Non-Goals:**
- No database schema changes
- No frontend changes
- No stock validation (separate known bug, not in scope)

## Decisions

**Decision: Use `prisma.cartItem.update` on existing item**
Replace the `create` call with `update` that increments quantity by the incoming amount.
- Rationale: Minimal change, single line diff, zero risk of regression outside this path.
- Alternative considered: Upsert — not needed because we already check existence with `findFirst`.

**Decision: Keep the `if/else` structure**
The existing branch already distinguishes "new vs existing" correctly — only the body of the `if` branch is wrong.
- Rationale: Avoids restructuring logic that works; minimizes diff surface.

## Risks / Trade-offs

- Minimal risk — change is scoped to one `if` branch; regression would only affect this endpoint
- Quantity accumulation (`existingItem.quantity + quantity`) is intentional for batch-add scenarios
