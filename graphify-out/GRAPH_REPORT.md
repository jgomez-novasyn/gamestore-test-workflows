# Graph Report - .  (2026-06-08)

## Corpus Check
- Corpus is ~18,659 words - fits in a single context window. You may not need a graph.

## Summary
- 204 nodes · 266 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Frontend UI & State|Frontend UI & State]]
- [[_COMMUNITY_Backend API Routes|Backend API Routes]]
- [[_COMMUNITY_Backend Dependencies|Backend Dependencies]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Workshop Docs & Specs|Workshop Docs & Specs]]
- [[_COMMUNITY_Frontend TypeScript Config|Frontend TypeScript Config]]
- [[_COMMUNITY_Backend TypeScript Config|Backend TypeScript Config]]
- [[_COMMUNITY_Vite TypeScript Config|Vite TypeScript Config]]
- [[_COMMUNITY_Admin Panel|Admin Panel]]
- [[_COMMUNITY_Database Seeding|Database Seeding]]
- [[_COMMUNITY_OpenCode Config|OpenCode Config]]
- [[_COMMUNITY_OpenCode Plugin Deps|OpenCode Plugin Deps]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useAuth()` - 13 edges
3. `compilerOptions` - 12 edges
4. `useCart()` - 9 edges
5. `scripts` - 7 edges
6. `AuthRequest` - 6 edges
7. `authenticate()` - 6 edges
8. `compilerOptions` - 6 edges
9. `api` - 6 edges
10. `Spec-Driven Workflow` - 5 edges

## Surprising Connections (you probably didn't know these)
- `/opsx:propose` --references--> `Spec-Driven Workflow`  [INFERRED]
  .opencode/commands/opsx-propose.md → openspec/config.yaml
- `/opsx:apply` --references--> `Spec-Driven Workflow`  [INFERRED]
  .opencode/commands/opsx-apply.md → openspec/config.yaml
- `/opsx:archive` --references--> `Spec-Driven Workflow`  [INFERRED]
  .opencode/commands/opsx-archive.md → openspec/config.yaml
- `/opsx:explore` --references--> `Spec-Driven Workflow`  [INFERRED]
  .opencode/commands/opsx-explore.md → openspec/config.yaml
- `/opsx:sync` --references--> `Spec-Driven Workflow`  [INFERRED]
  .opencode/commands/opsx-sync.md → openspec/config.yaml

## Hyperedges (group relationships)
- **Workshop Curriculum Progression** — session01_setup, session02_first_change, session03_implementation, session04_archive, session05_exploration [EXTRACTED 1.00]
- **OpenSpec Change Lifecycle** — opsx_propose, opsx_apply, opsx_archive, spec_driven_workflow [INFERRED 0.85]
- **Session 05 Bug Investigation Flow** — session05_exploration, pagination_bug, catalog_specification, opsx_explore [INFERRED 0.80]

## Communities (16 total, 3 thin omitted)

### Community 0 - "Frontend UI & State"
Cohesion: 0.11
Nodes (27): Navbar(), AuthContext, AuthContextType, AuthProvider(), useAuth(), User, Cart, CartContext (+19 more)

### Community 1 - "Backend API Routes"
Cohesion: 0.10
Nodes (25): authenticate(), AuthRequest, generateRefreshToken(), generateToken(), verifyRefreshToken(), prisma, router, decoded (+17 more)

### Community 2 - "Backend Dependencies"
Cohesion: 0.07
Nodes (26): dependencies, bcryptjs, cors, express, jsonwebtoken, @prisma/client, description, devDependencies (+18 more)

### Community 3 - "Frontend Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, react, react-dom, react-router-dom, devDependencies, autoprefixer, postcss, tailwindcss (+13 more)

### Community 4 - "Workshop Docs & Specs"
Cohesion: 0.13
Nodes (21): Agent Guide, Auth Specification, Catalog Specification, fix-session-timeout, GameStore Backend, GameStore Frontend, GameStore Workshop, Intentional Bugs (+13 more)

### Community 5 - "Frontend TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "Backend TypeScript Config"
Cohesion: 0.13
Nodes (14): compilerOptions, declaration, esModuleInterop, forceConsistentCasingInFileNames, lib, module, outDir, resolveJsonModule (+6 more)

### Community 7 - "Vite TypeScript Config"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 8 - "Admin Panel"
Cohesion: 0.40
Nodes (4): Admin(), Order, Stats, User

## Knowledge Gaps
- **118 isolated node(s):** `target`, `module`, `lib`, `outDir`, `rootDir` (+113 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `target`, `module`, `lib` to the rest of the system?**
  _118 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend UI & State` be split into smaller, more focused modules?**
  _Cohesion score 0.1141025641025641 - nodes in this community are weakly interconnected._
- **Should `Backend API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.0967741935483871 - nodes in this community are weakly interconnected._
- **Should `Backend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Workshop Docs & Specs` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `Frontend TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._