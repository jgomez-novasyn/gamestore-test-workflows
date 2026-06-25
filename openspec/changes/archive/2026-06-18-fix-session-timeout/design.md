## Context

The auth system uses a hardcoded 15-minute JWT expiry with no sliding expiration. Users are logged out even while actively using the app. The refresh token mechanism exists but never actually renews the session.

## Goals / Non-Goals

**Goals:**
- Sliding session expiration: each authenticated request resets the TTL
- Configurable session TTL via a constant
- Fix refresh token renewal to actually extend the session

**Non-Goals:**
- Password storage changes (separate concern)
- Multi-factor authentication
- Remember-me / long-lived sessions

## Decisions

- **Sliding window approach**: Reset the 15-minute TTL on every authenticated request rather than issuing a new JWT. The middleware checks elapsed time since last activity stored in the token payload or a server-side store.
- **Token-based activity tracking**: Store `lastActivity` timestamp in the JWT payload. Middleware validates and updates it on each request.
- **Refresh token flow**: The refresh endpoint will issue a new access token with an updated `lastActivity` timestamp, effectively renewing the session.

## Risks / Trade-offs

- [Token invalidation] Changing TTL logic could invalidate existing tokens → Implement graceful fallback: old tokens without `lastActivity` field are treated as valid for their original remaining duration.
- [Performance] Writing new tokens on every request adds overhead → Mitigated by using fast symmetric signing (HS256) and keeping tokens small.
