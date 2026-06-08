# SnapEst Estimating Software — Development Guide

## Project Overview

SnapEst is a keyboard-first estimating software for electrical contractors. It combines Connest-style navigation with EBM-style UX to provide rapid, accurate bid proposals, RFIs, change orders, and scope reviews.

**Target User**: Electrical contractors (and general construction) who need fast, flexible estimating with labor-level breakdown.

---

## Architecture (High Level)

### Frontend
- **Framework**: React (for UI responsiveness and component reuse)
- **Keyboard Navigation**: Custom keyboard handler layer + focus management
- **State Management**: Context API or Zustand (for estimates, materials, assemblies, settings)
- **Styling**: Tailwind CSS (rapid, keyboard-friendly, accessible)
- **Tables**: react-table or similar (keyboard-navigable, formula-support-ready)

### Backend
- **Runtime**: Node.js (Express or similar)
- **Database**: PostgreSQL (structured data: materials, assemblies, estimates; strong ACID guarantees)
- **Persistence**: JSON export/import for portability; JSON file fallback for offline/local mode
- **API**: RESTful (or GraphQL if needed later for flexible report queries)
- **Calculations**: Backend formula evaluation (safety, consistency)

### Data Models
- **Materials**: Item #, description, unit, base price, labor levels (L1/L2/L3 hours per unit), category
- **Assemblies**: Assembly ID, name, line items (with formulas), total
- **Estimates**: Header (job details), line items (materials/assemblies), closeout settings, status
- **Settings**: Global and per-job defaults (labor rates, tax, OH&P, display options)

---

## Project Structure

```
SnapEst/
├── CLAUDE.md                     # This file
├── README.md                     # User-facing overview
├── package.json                  # Shared dependencies
├── turbo.json                    # Monorepo config (optional, for growth)
│
├── packages/
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── EstimateHeader.tsx
│   │   │   │   ├── LineItemTable.tsx
│   │   │   │   ├── QuickSearch.tsx
│   │   │   │   ├── AuditTrail.tsx
│   │   │   │   └── ...
│   │   │   ├── screens/          # Three main screens
│   │   │   │   ├── JobDetailsScreen.tsx
│   │   │   │   ├── TakeoffScreen.tsx
│   │   │   │   └── CloseoutScreen.tsx
│   │   │   ├── hooks/            # Custom hooks
│   │   │   │   ├── useKeyboard.ts
│   │   │   │   ├── useEstimate.ts
│   │   │   │   ├── useFormula.ts
│   │   │   │   └── ...
│   │   │   ├── state/            # Zustand stores
│   │   │   │   ├── estimateStore.ts
│   │   │   │   ├── settingsStore.ts
│   │   │   │   └── ...
│   │   │   ├── utils/            # Utility functions
│   │   │   │   ├── calculator.ts      # All calculation logic
│   │   │   │   ├── formulaEngine.ts   # Excel-like formulas
│   │   │   │   ├── validation.ts
│   │   │   │   └── ...
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts        # Or webpack if preferred
│   │
│   └── backend/                  # Node.js API server
│       ├── src/
│       │   ├── routes/           # API endpoints
│       │   │   ├── materials.ts
│       │   │   ├── assemblies.ts
│       │   │   ├── estimates.ts
│       │   │   ├── settings.ts
│       │   │   ├── reports.ts
│       │   │   └── ...
│       │   ├── services/         # Business logic
│       │   │   ├── estimateService.ts
│       │   │   ├── calculatorService.ts
│       │   │   ├── reportService.ts
│       │   │   └── ...
│       │   ├── models/           # Data models (Sequelize, TypeORM, or prisma)
│       │   │   ├── Material.ts
│       │   │   ├── Assembly.ts
│       │   │   ├── Estimate.ts
│       │   │   ├── Settings.ts
│       │   │   └── ...
│       │   ├── db/               # Database setup
│       │   │   ├── connection.ts
│       │   │   └── migrations/
│       │   ├── middleware/
│       │   ├── app.ts            # Express app setup
│       │   └── server.ts         # Server entry point
│       ├── package.json
│       └── tsconfig.json
│
├── data/                         # Seed data, sample estimates
│   ├── seed-materials.json
│   ├── seed-assemblies.json
│   └── ...
│
└── docs/                         # Documentation
    ├── API.md                    # API reference
    ├── KEYBOARD_SHORTCUTS.md     # Hotkey reference
    ├── USER_GUIDE.md             # End-user docs
    └── ARCHITECTURE.md           # Technical deep-dive
```

---

## Core Workflows (MVP)

### Phase 1: Foundation
1. ✅ Project structure and tooling
2. ✅ Frontend scaffold (screens, keyboard nav layer)
3. ✅ Backend scaffold (models, API stubs)
4. ✅ Materials Library (CRUD, search, import/export)
5. ✅ Assemblies (CRUD, formula support)
6. ✅ Create Estimate (job details screen)
7. ✅ Takeoff entry (add/edit/delete lines, audit trail in UI)
8. ✅ Closeout (labor rates, tax, OH&P, additional costs)
9. ✅ Basic calculations (totals, unit prices, margin %)
10. ✅ Per-job settings override

### Phase 2: Polish & Workflow
- Replace Item functionality (change another)
- Copy Takeoff job-to-job
- Extensions tab (summary + adjustments)
- Temporary items/assemblies + promote to permanent
- Reports (all 10 report types, saved templates)
- Duplicate row
- Import/export estimates (PDF, Excel)

### Phase 3: Growth
- Multi-level assemblies
- Change order tracking
- Budget vs. actual
- Estimate versioning
- Team/multi-user workspace
- Integration with PM tools

---

## Key Technical Decisions

### Keyboard Navigation
- Custom `useKeyboard` hook captures global and contextual hotkeys
- Focus trap within modals; Escape always closes
- Tab order managed explicitly per screen (not browser default)
- Arrow key navigation updates table row selection without submitting edits

### Formula Evaluation
- Server-side formula parsing + calculation (for data integrity)
- Client-side preview/validation in input field
- Whitelist operators: +, −, *, /, parentheses, cell references (A1, B2, etc.)
- Error messages on invalid syntax

### Calculations
- **Single source of truth**: backend calculates all totals, line prices, tax, OH&P
- Frontend shows previews based on user input but doesn't store calculated values
- On save, server re-validates and returns canonical values
- Prevents client-side drift and audit trail inconsistencies

### State Management
- Zustand stores for:
  - Current estimate (job details, line items, status)
  - Materials library (loaded once on app init, cached)
  - Settings (global defaults + per-job overrides)
  - UI state (selected row, open modals, active screen)
- Synced with backend on every save

---

## Keyboard Shortcuts (MVP Minimum)

### Global
| Hotkey | Action |
|--------|--------|
| `Ctrl+N` | New Estimate |
| `Ctrl+O` | Open Estimate |
| `Ctrl+S` | Save Estimate |
| `Ctrl+,` | Open Settings |
| `Escape` | Close dialog / deselect |
| `F5` / `F6` / `F7` | Jump to Job Details / Takeoff / Closeout |

### Takeoff Entry
| Hotkey | Action |
|--------|--------|
| `Ctrl+A` | Add Item (quick search) |
| `Ctrl+Shift+A` | Add Assembly (quick search) |
| `Ctrl+R` | Replace selected item |
| `Ctrl+D` | Duplicate selected row |
| `Delete` | Delete selected row |
| `Tab` / `Shift+Tab` | Move between cells |
| `Arrow Up/Down` | Move between rows |
| `Enter` | Edit or confirm |

### Takeoff Display
| Hotkey | Action |
|--------|--------|
| `Ctrl+Shift+T` | Toggle Audit Trail panel |
| `Ctrl+Shift+E` | Switch to Extensions tab |

---

## Success Criteria

1. ✅ Material/Assembly add to estimate in < 3 keystrokes
2. ✅ Replace item without data loss, < 5 keystrokes
3. ✅ All navigation without mouse
4. ✅ Estimate recalculates in < 500ms
5. ✅ Labor level breakdown visible at all times
6. ✅ Clear error messages (no silent failures)

---

## Development Guidelines

### Code Style
- TypeScript everywhere (no `any` without justification)
- ESLint + Prettier for consistency
- Functional components + hooks in React
- Small, focused functions (max 40 lines)

### Testing
- Unit tests for all calculation logic (formula engine, labor cost, tax, OH&P)
- Integration tests for estimate save/load workflow
- Keyboard navigation tests for critical paths
- E2E tests for full estimate creation (optional, Phase 2+)

### Documentation
- JSDoc comments on exported functions only (names should be self-documenting)
- README in each package
- API.md for all backend routes
- KEYBOARD_SHORTCUTS.md for hotkeys

### Git Workflow
- Feature branches for each feature
- Commit messages in present tense ("Add X", "Fix Y")
- PR reviews before merging to main

---

## Environment & Dependencies (Initial)

### Frontend
- `react` 18+
- `zustand` (state)
- `react-table` (tables)
- `tailwindcss` (styles)
- `vite` (build)
- `typescript`

### Backend
- `express` (server)
- `typescript`
- `postgres` / `pg` (database)
- `sequelize` or `prisma` (ORM)
- `joi` (validation)
- `ts-node` (dev)

### Shared
- `date-fns` (date formatting)
- `decimal.js` or `big.js` (precision math for money)

---

## First Steps

1. Initialize monorepo (Turbo or Lerna)
2. Set up backend: DB schema (materials, assemblies, estimates, settings)
3. Set up frontend: Vite + React scaffold
4. Create keyboard handler layer
5. Build Materials CRUD (backend API + React UI)
6. Build Assemblies CRUD
7. Wire up Estimate creation and Takeoff entry
8. Implement calculator service (labor, tax, OH&P, totals)
9. Add Closeout screen
10. Polish keyboard nav + shortcuts

---

## Future: Phase 2 Roadmap

- **Replace Item** workflow (change another without data loss)
- **Copy Takeoff** (job-to-job with options)
- **Extensions** tab (consolidated, adjustable summary)
- **Temporary Items/Assemblies** (job-scoped, promotable)
- **Audit Trail Panel** (embedded in Takeoff tab)
- **Reports Module** (10 report types + templates)
- **Import/Export** (PDF, Excel, CSV)
- **Settings Panel** (global defaults + per-job overrides)

---

## Notes

- Keep estimates backward-compatible as schema evolves
- Plan for offline-first architecture (JSON fallback)
- Labor rates and tax vary by jurisdiction — settings must be flexible
- Electrical contractors often work with custom assemblies; temp items are critical UX
- Speed is not negotiable — aim for sub-second perception on all interactions
