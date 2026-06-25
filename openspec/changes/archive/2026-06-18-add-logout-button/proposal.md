## Why

Users currently have no way to log out of their account — the app provides no logout button or mechanism to end a session. This leaves authenticated sessions dangling and prevents account switching.

## What Changes

- Add a **Logout** button to the Navbar visible only when a user is logged in
- Add a confirmation dialog to prevent accidental logout
- On logout: clear local tokens (access + refresh), notify the backend to invalidate the refresh token, and redirect to the login page
- The backend already exposes `POST /api/auth/logout` — the frontend will call it

## Capabilities

### New Capabilities
- `logout-ui`: Logout button in the Navbar with confirmation dialog, token cleanup, and post-logout redirect

### Modified Capabilities
- _(none — no existing spec is changing)_

## Impact

- **Frontend**: Navbar component, AuthContext (logout logic), api.ts service (logout call)
- **Backend**: No changes needed — `POST /api/auth/logout` already exists and works
