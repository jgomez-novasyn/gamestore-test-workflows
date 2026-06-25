## 1. Database Schema Migration

- [x] 1.1 Change `Product.price` from `String` to `Float` in `backend/prisma/schema.prisma`
- [x] 1.2 Create and run Prisma migration (`prisma migrate dev`) to alter the column
- [x] 1.3 Verify existing string prices are cast correctly to floats in the database

## 2. Backend — Product Routes

- [x] 2.1 Remove `String(price)` cast in POST `/api/products`
- [x] 2.2 Remove `String(price)` cast in PUT `/api/products/:id`
- [x] 2.3 Verify price filtering (`minPrice`/`maxPrice`) works correctly with numeric `Float` comparison
- [x] 2.4 Verify price sorting (`price_asc`/`price_desc`) works correctly with numeric `Float` comparison

## 3. Seed Data

- [x] 3.1 Update `backend/prisma/seed.ts` to use numeric price values (remove quotes around prices)
- [x] 3.2 Re-seed and verify products load with correct numeric prices

## 4. Frontend — Product Type

- [x] 4.1 Change `Product.price` type from `string` to `number` in `frontend/src/pages/Products.tsx`

## 5. Frontend — Price Range Filter UI

- [x] 5.1 Add `minPrice` and `maxPrice` state variables in `Products.tsx`
- [x] 5.2 Add min/max price input fields to the filter bar (next to sort dropdown)
- [x] 5.3 Include `minPrice` and `maxPrice` in the API request params
- [x] 5.4 Reset page to 1 when price filter changes
- [x] 5.5 Verify frontend sends correct params and backend filters correctly

## 6. Aislar implementación en git worktrees

- [x] 6.1 Crear rama `fix/price-filter` desde `main`
- [x] 6.2 Agregar worktree en `worktrees/fix-price-filter` apuntando a la rama
- [x] 6.3 Instalar dependencias (npm install) dentro del worktree (backend + frontend)
- [x] 6.4 Verificar que el worktree compila y corre independientemente
- [x] 6.5 Implementar los cambios en el worktree (no en el checkout principal)
- [x] 6.6 Al finalizar, hacer commit en la rama desde el worktree y limpiar
