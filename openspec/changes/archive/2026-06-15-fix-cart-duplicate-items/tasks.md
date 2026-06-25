## 1. Backend Fix

- [ ] 1.1 Replace `prisma.cartItem.create` with `prisma.cartItem.update` in the `if (existingItem)` branch of `POST /api/cart/add` and use `existingItem.quantity + quantity` as the new quantity

## 2. Verification

- [ ] 2.1 Restart backend and test that adding the same product twice increments quantity instead of creating a duplicate
