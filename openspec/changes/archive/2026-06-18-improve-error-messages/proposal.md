## Why

Error messages across the application are inconsistent, sometimes silent (console.error only), and often use raw browser `alert()` dialogs. Backend errors are handled ad-hoc with 20+ identical try/catch blocks that bypass the global error middleware. This creates a poor user experience and makes the codebase harder to maintain.

## What Changes

- Introduce a backend error class hierarchy (`AppError`, `NotFoundError`, `ValidationError`, `AuthError`) with typed status codes
- Create a central error-handling middleware that all routes delegate to via `next(err)`
- Replace every route-level catch-all with a single `next(err)` pattern
- Add a shared frontend `showError` utility that replaces `alert()` and `console.error()` with a toast notification component
- Add a `response.ok` check to the API service layer for consistent error extraction
- Wire up toast notifications in all pages that currently use `alert()` or silent `console.error()`
- Add field-level form validation with inline error messages on Login, Register, and Checkout pages
- Clean up the frontend API service to consistently extract and surface error messages

## Capabilities

### New Capabilities
- `api-error-handling`: Backend error class hierarchy, centralized error middleware, consistent error responses
- `frontend-toast-notifications`: Toast notification component replacing `alert()` and silent failures
- `form-validation`: Field-level validation with inline error messages on Login, Register, and Checkout

### Modified Capabilities
<!-- No existing specs describe error behavior — no delta specs needed -->

## Impact

- `backend/src/` — All route files (auth, products, cart, orders, admin), middleware/auth.ts, index.ts
- `frontend/src/` — services/api.ts, contexts/AuthContext.tsx, contexts/CartContext.tsx, pages (Login, Register, Products, Checkout, Admin)
- New files: backend error classes, frontend Toast component, frontend error utility
