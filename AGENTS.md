# GameStore Workshop — Agent Guide

This is a **training/workshop** app with **intentional bugs** across every feature area. Do **not** fix bugs unless explicitly asked.

## Structure

- `backend/` — Express 4 + TypeScript + Prisma 5 / SQLite (port 3001)
- `frontend/` — React 18 + Vite 5 + Tailwind 3 + react-router-dom 6 (port 5173)
- `openspec/` — OpenSpec spec-driven workflow config, specs, and changes
- `.opencode/` — OpenCode plugin & command definitions

Each directory has its own `package.json` / `node_modules`. No workspace tooling.

## Commands

```bash
# Backend (from backend/)
npm run dev              # ts-node-dev hot-reload on :3001
npm run build            # tsc
npm run prisma:generate
npm run prisma:migrate   # dev migration
npm run prisma:seed      # seeds dev.db

# Frontend (from frontend/)
npm run dev              # Vite dev server on :5173, proxies /api → :3001
npm run build            # tsc && vite build

# OpenSpec CLI (from root)
openspec validate --specs
openspec new change "<name>"
openspec status --change "<name>" --json
openspec list --changes
```

## How to run

Terminal 1: `cd backend && npm run dev`
Terminal 2: `cd frontend && npm run dev`

## No tests, no lint, no typecheck

- There are **zero tests**. Manual verification (curl / browser) is the norm.
- No ESLint, Prettier, or CI. No pre-commit hooks.
- Skip any lint/typecheck verification steps.

## OpenSpec workflow (AI commands in chat)

- `/opsx:propose <name>` — create a new change proposal
- `/opsx:apply <name>` — implement change tasks
- `/opsx:archive <name>` — archive a completed change
- `/opsx:explore "question"` — investigate without creating a change

## Key conventions & quirks

- **No env vars.** JWT secret (`hardcoded-secret-key-12345`), DB path, and port are hardcoded.
- **bcryptjs is a dependency but never imported.** Passwords stored in plain text (intentional).
- **`Product.price` is a `String`** in Prisma — sorts alphabetically, not numerically.
- **Vite dev server proxies** `/api/*` → `http://localhost:3001`.
- Auth token stored in `localStorage` as `token` / `refreshToken`.
- SQLite database at `backend/prisma/dev.db` — auto-created, contains seed data.

## Intentional bugs (do NOT fix unless asked)

Known categories present across auth, catalog, cart, checkout, and admin:
- No test framework exists — manual verification only
- JWT secret is hardcoded
- No admin role middleware — any auth user can access `/api/admin`
- Pagination always returns page 1 (`skip: 0` hardcoded in query)
- Cart duplicates items instead of incrementing quantity
- No stock validation on checkout
- Cart not cleared after order placement
- No form validation on checkout
- Refresh tokens never actually renew
