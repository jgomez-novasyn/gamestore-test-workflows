## Why

The current session timeout is hardcoded to 15 minutes and does not reset on user activity, causing users to be unexpectedly logged out while actively using the application. This creates a poor user experience and increases login requests.

## What Changes

- Session TTL resets on each authenticated request (sliding expiration)
- Session timeout is configurable via a constant rather than hardcoded
- Refresh token mechanism is fixed to properly renew sessions before expiry

## Capabilities

### New Capabilities
- `session-management`: Sliding session expiration with configurable TTL

### Modified Capabilities
- `auth`: Update session persistence requirement to use sliding expiration instead of fixed 15-minute timeout

## Impact

- Backend auth middleware: session TTL verification and refresh logic
- JWT token handling: refresh token renewal flow
- Frontend auth context: heartbeat or activity detection

## Risks
- Cambiar el TTL puede invalidar tokens existentes.
- Necesitamos migrar sesiones activas o invalidarlas.
