## Context

Currently every backend route handler has an identical try/catch that sends `res.status(500).json({ error: error.message })`. The global error middleware in `index.ts` is almost never reached because routes never call `next(err)`. On the frontend, errors surface via browser `alert()`, inline red divs, or silent `console.error()` — three different patterns with no consistency.

## Goals / Non-Goals

**Goals:**
- Centralize backend error handling with a custom error class hierarchy and single middleware
- Replace all frontend `alert()` and `console.error()`-only failures with toast notifications
- Add field-level validation errors on auth and checkout forms
- Consistently check `response.ok` in the API service layer

**Non-Goals:**
- No new validation library — validation stays inline (simple field checks)
- No rewrite of the frontend — only targeted changes to error surfaces
- No backend input validation beyond what exists (form validation is frontend-only for this change)
- No changes to success responses or data shapes

## Decisions

1. **Error class hierarchy over numeric codes**: Instead of passing magic numbers or strings, use typed error classes (`AppError` with `statusCode`, `NotFoundError(404)`, `ValidationError(400)`, `AuthError(401)`). This makes it easy to add new error types and keeps the middleware generic — it just reads `err.statusCode`.

2. **`next(err)` pattern over catch-all response**: Every route handler wraps its body in a single `try/catch` that calls `next(err)` instead of sending the response directly. This lets the global middleware handle everything uniformly and removes 20+ lines of boilerplate.

3. **Toast component over alert()**: A lightweight toast component (CSS-only, no library) positioned top-right, auto-dismiss after 4 seconds, with success/error variants. No external dependency needed.

4. **Inline form errors over global messages**: Login/Register/Checkout show per-field error messages below each input rather than a single banner at the top. This is more accessible and user-friendly.

5. **response.ok check in api.ts**: The API service layer wraps all `fetch` calls with a check on `response.ok`. If it fails, the promise rejects with the `error` field from the JSON body. This eliminates the ad-hoc `data.error` checks scattered across callers.

## Risks / Trade-offs

- [**Existing callers may expect resolved promises on 4xx**] → The `response.ok` check changes the contract. All existing API callers were already checking `data.error` or getting silent failures, so the behavioral change is an improvement. Verify during implementation that no callers break.
- [**Toast spam**] → If an endpoint fires multiple errors rapidly, toasts could stack. Mitigation: the toast system deduplicates by message text and only shows one at a time.
- [**No animation library**] → Toasts use plain CSS transitions. This is simpler and avoids dependencies but might feel less polished. Acceptable for this scope.
