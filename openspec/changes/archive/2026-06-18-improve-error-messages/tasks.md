## 1. Backend Error Infrastructure

- [x] 1.1 Create `backend/src/utils/errors.ts` with `AppError`, `NotFoundError`, `ValidationError`, `AuthError` classes
- [x] 1.2 Update global error middleware in `backend/src/index.ts` to read `err.statusCode`, log stack, and return `{ "error": "Something went wrong!" }` for generic errors
- [x] 1.3 Update `auth.ts` routes — replace inline error responses with `throw new AuthError()` / `throw new NotFoundError()` and use `next(error)` pattern
- [x] 1.4 Update `products.ts` routes — replace inline error responses with `throw new NotFoundError()` and use `next(error)` pattern
- [x] 1.5 Update `cart.ts` routes — replace inline error responses with `throw new ValidationError()` and use `next(error)` pattern
- [x] 1.6 Update `orders.ts` routes — replace inline error responses with `throw new ValidationError()` / `throw new NotFoundError()` and use `next(error)` pattern
- [x] 1.7 Update `admin.ts` routes — replace inline error responses and use `next(error)` pattern

## 2. Frontend Toast Notifications

- [x] 2.1 Create `frontend/src/components/Toast.tsx` — renders top-right toasts with error/success variants, auto-dismiss after 4s, click-to-dismiss
- [x] 2.2 Create `frontend/src/utils/notifications.ts` — exports `showError()` and `showSuccess()` functions
- [x] 2.3 Add `<ToastContainer />` to `frontend/src/App.tsx`
- [x] 2.4 Update `Products.tsx` — replace `alert()` and `console.error()` with `showError()` / `showSuccess()`
- [x] 2.5 Update `Checkout.tsx` — replace `alert()` with `showError()` / `showSuccess()`
- [x] 2.6 Update `Admin.tsx` — replace `console.error()` with `showError()`
- [x] 2.7 Update `CartContext.tsx` — replace `console.error()` with `showError()`

## 3. Frontend API Error Handling

- [x] 3.1 Update `api.ts` — add `response.ok` check to all fetch calls that rejects with the `error` field from the JSON body
- [x] 3.2 Clean up callers in `AuthContext.tsx` — remove ad-hoc `data.error` checks now handled by the API layer
- [x] 3.3 Verify no API callers break due to the changed promise contract

## 4. Frontend Form Validation

- [x] 4.1 Update `Login.tsx` — add per-field validation with error messages below inputs (email format, required password)
- [x] 4.2 Update `Register.tsx` — add per-field validation (name required, email format, password min 6 chars)
- [x] 4.3 Update `Checkout.tsx` — add per-field validation (shipping address required, payment method required)

## 5. Aislar implementación en git worktrees

- [ ] 5.1 Crear rama `feat/improve-error-messages` desde `main`
- [ ] 5.2 Agregar worktree en `worktrees/improve-error-messages` apuntando a la rama
- [ ] 5.3 Instalar dependencias (npm install) dentro del worktree (backend + frontend)
- [ ] 5.4 Verificar que el worktree compila y corre independientemente
- [ ] 5.5 Implementar los cambios en el worktree (no en el checkout principal)
- [ ] 5.6 Al finalizar, hacer commit en la rama desde el worktree y limpiar
