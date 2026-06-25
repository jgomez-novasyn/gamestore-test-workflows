## 1. Backend: Session TTL Configuration

- [ ] 1.1 Define `SESSION_TTL_MINUTES` constant (default 15) in auth config
- [ ] 1.2 Add `lastActivity` field to JWT payload

## 2. Backend: Sliding Expiration Middleware

- [ ] 2.1 Implement middleware to check and reset `lastActivity` on each request
- [ ] 2.2 Issue new JWT with updated timestamp on authenticated requests
- [ ] 2.3 Handle backward compatibility for tokens without `lastActivity`

## 3. Backend: Refresh Token Renewal

- [ ] 3.1 Fix refresh endpoint to issue new access token with updated `lastActivity`
- [ ] 3.2 Ensure refresh token rotation updates the session expiry

## 4. Frontend: Activity Detection

- [ ] 4.1 Add heartbeat/intercept mechanism to send activity on user interaction
