## 1. Logout Button & Confirmation (Navbar)

- [x] 1.1 Add a confirmation `window.confirm("Are you sure you want to logout?")` before calling logout in the Navbar
- [x] 1.2 Ensure the Logout button is only rendered when user is authenticated (already conditional on `user`)

## 2. Logout Flow (AuthContext & api.ts)

- [x] 2.1 Update `AuthContext.logout()` to `await` the backend call before clearing local state
- [x] 2.2 Add error handling so a failed backend call still clears tokens and redirects
- [x] 2.3 Add redirect to `/login` after tokens are cleared

## 3. Verify

- [x] 3.1 Manual test: login as user1@test.com, click Logout, confirm dialog appears, confirm, verify redirect to /login
- [x] 3.2 Manual test: verify Login/Register links appear post-logout
- [x] 3.3 Manual test: verify cancelled logout keeps user logged in

## 4. Aislar implementación en git worktrees

- [x] 4.1 Crear rama `feat/add-logout-button` desde `main` ✓
- [x] 4.2 Agregar worktree en `worktrees/add-logout-button` apuntando a la rama ✓
- [x] 4.3 Instalar dependencias (npm install) dentro del worktree (backend + frontend) ✓
- [x] 4.4 Verificar que el worktree compila y corre independientemente ✓
- [x] 4.5 Implementar los cambios en el worktree (no en el checkout principal) ✓
- [x] 4.6 Al finalizar, hacer commit en la rama desde el worktree y limpiar ✓
