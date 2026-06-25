## Context

The app uses JWT-based auth with access tokens (15min) and refresh tokens (7d). Auth state is managed via React Context (`AuthContext`). The Navbar is the primary navigation component rendered above all routes. The backend already exposes `POST /api/auth/logout` which clears the stored refresh token. There is currently no logout button or mechanism in the UI.

## Goals / Non-Goals

**Goals:**
- Provide a visible logout button in the Navbar when user is logged in
- Confirmation dialog to prevent accidental logout
- Clear all local tokens and redirect to /login on logout
- Notify backend to invalidate the refresh token

**Non-Goals:**
- Session timeout / auto-logout
- Multi-device session management
- UI changes to login/register pages

## Decisions

- **Button placement in Navbar**: The Navbar already renders auth-conditional UI. Adding the button there keeps logout consistent with other session controls. No new layout component needed.
- **Confirmation via `window.confirm`**: Avoids adding a modal dependency. Simple and effective for a destructive action.
- **`await` the backend call before clearing state**: Ensures the refresh token is invalidated server-side before the client cleans up. If the backend call fails, tokens are still cleared to let the user retry login.

## Risks / Trade-offs

- [No network on logout] → `fetch` will reject, caught by the try/catch. Tokens still cleared locally. User can re-login.
- [Backend logout call fails silently] → Refresh token remains valid server-side (stale). Mitigation: clear local tokens immediately in failure case too, so user can establish a fresh session.
