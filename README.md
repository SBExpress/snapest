# SnapEst — Keyboard-First Estimating Software

SnapEst is a professional estimating software for electrical contractors, combining the keyboard-first navigation of Connest with the clean UX of EBM.

## Features (MVP Roadmap)

- **Three-screen workflow**: Job Details → Takeoff → Closeout
- **Keyboard-first**: All navigation via hotkeys; mouse optional
- **Materials Library**: CRUD, search, import/export
- **Assemblies**: Formula-driven quantities, auto-calculation
- **Labor Breakdown**: Three (or more) labor levels per estimate
- **Closeout Pricing**: Labor rates, burden, tax, overhead, profit
- **Audit Trail**: Live panel tracking every entry
- **Reports**: 10+ report types with saved templates
- **Fast Calculations**: Sub-500ms recalculation on every change

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3000 (Express API)

### Run Tests

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
SnapEst/
├── CLAUDE.md                     # Development guide
├── package.json                  # Monorepo config (Turbo)
├── tsconfig.json                 # Shared TypeScript config
│
├── packages/
│   ├── frontend/                 # React UI
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   ├── screens/          # Three main screens
│   │   │   ├── hooks/            # Custom hooks (keyboard, formulas, etc.)
│   │   │   ├── state/            # Zustand stores
│   │   │   ├── utils/            # Utilities (calculator, validation)
│   │   │   ├── App.tsx           # Main app
│   │   │   └── main.tsx          # Entry point
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── backend/                  # Node.js / Express
│       ├── src/
│       │   ├── routes/           # API endpoints
│       │   ├── services/         # Business logic
│       │   ├── models/           # Data models (ORM)
│       │   ├── db/               # Database setup
│       │   ├── middleware/       # Express middleware
│       │   ├── app.ts
│       │   └── server.ts         # Entry point
│       ├── package.json
│       └── tsconfig.json
│
└── data/                         # Seed data (future)
```

## Core Technologies

### Frontend
- **React 18** — Component framework
- **Vite** — Build tool & dev server
- **Zustand** — State management
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **react-table** — Keyboard-navigable tables

### Backend
- **Node.js** — Runtime
- **Express** — Web framework
- **PostgreSQL** — Relational database
- **TypeScript** — Type safety
- **Sequelize** or **Prisma** — ORM (to be chosen)

## Keyboard Shortcuts (MVP)

| Hotkey | Action |
|--------|--------|
| `Ctrl+N` | New Estimate |
| `Ctrl+O` | Open Estimate |
| `Ctrl+S` | Save Estimate |
| `Ctrl+,` | Open Settings |
| `Escape` | Close dialog |
| `F5` / `F6` / `F7` | Jump to Job Details / Takeoff / Closeout |
| `Ctrl+A` | Add Item (quick search) |
| `Ctrl+Shift+A` | Add Assembly (quick search) |
| `Ctrl+R` | Replace selected item |
| `Ctrl+D` | Duplicate row |
| `Delete` | Delete row |
| `Tab` / `Shift+Tab` | Move between cells |
| `Arrow Up/Down` | Move between rows |

See [KEYBOARD_SHORTCUTS.md](./docs/KEYBOARD_SHORTCUTS.md) for full list (to be created).

## Development Phases

### ✅ Phase 1: Foundation (Current)
- [x] Project structure
- [x] Frontend scaffold (screens, hotkey layer)
- [x] Backend scaffold (API stubs)
- [ ] Materials Library CRUD
- [ ] Assemblies CRUD
- [ ] Estimate creation
- [ ] Takeoff entry & audit trail
- [ ] Closeout screen
- [ ] Calculator service (labor, tax, OH&P)

### Phase 2: Workflow
- Replace Item (change another)
- Copy Takeoff (job-to-job)
- Extensions tab (summary + adjustments)
- Temporary items/assemblies
- Reports (all 10 types)
- Import/export (PDF, Excel)

### Phase 3: Growth
- Multi-level assemblies
- Change order tracking
- Budget vs. actual
- Team workspace
- Estimate versioning

## Next Steps

1. **Set up database** (PostgreSQL + migrations)
2. **Implement Materials CRUD** (backend + frontend)
3. **Implement Assemblies CRUD**
4. **Create formula engine** (Excel-like syntax)
5. **Build calculator service** (labor rates, tax, OH&P)
6. **Wire up Takeoff entry** (keyboard-navigable table)
7. **Add Audit Trail** (embedded in Takeoff tab)
8. **Implement Closeout** (labor rates, tax, overhead, profit)
9. **Build Reports** (report builder + templates)

## Documentation

- [CLAUDE.md](./CLAUDE.md) — Development guide & architecture
- [docs/API.md](./docs/API.md) — API reference (to be created)
- [docs/KEYBOARD_SHORTCUTS.md](./docs/KEYBOARD_SHORTCUTS.md) — Hotkey reference (to be created)
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Technical deep-dive (to be created)

## Environment Variables

Create a `.env` file in the backend package:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/snapest
```

## License

TBD

---

**Questions?** Check [CLAUDE.md](./CLAUDE.md) or ask in the codebase.
