# SnapEst Build Status — Phase 1: Database & API

## ✅ Completed

### Infrastructure
- [x] Docker Compose setup (PostgreSQL + pgAdmin)
- [x] Environment configuration (.env files)
- [x] Prisma ORM configuration

### Database Schema (Multi-Tenant)
- [x] Company model (tenant isolation)
- [x] User model (company-scoped, with roles)
- [x] Material model (item library per company)
- [x] Assembly & AssemblyLineItem models (reusable collections)
- [x] Estimate & EstimateLineItem models (job estimates)
- [x] AdditionalCost model (permits, equipment, etc.)
- [x] Settings model (per-company defaults: labor rates, tax, OH&P)

**Schema features**:
- Full multi-tenancy with company_id isolation
- Foreign key constraints with cascade deletes
- Decimal precision for money calculations
- Formula support for Excel-like quantities
- Labor breakdown (3 levels: apprentice, journeyman, foreman)
- Tax calculation modes (Mode A & B)
- Separate OH&P for material vs. labor

### Backend API
- [x] Prisma client setup with global singleton
- [x] Authentication middleware (x-company-id header based)
- [x] Materials CRUD endpoints:
  - `GET /api/materials` — list all (with filters)
  - `GET /api/materials/:id` — get one
  - `POST /api/materials` — create (validates uniqueness)
  - `PUT /api/materials/:id` — update
  - `DELETE /api/materials/:id` — delete
  - `POST /api/materials/search` — full-text search (item # or description)

**API features**:
- Company scoping on all operations
- Input validation & error handling
- Full-text search (case-insensitive)
- Automatic timestamps (createdAt, updatedAt)

### Test Data & Seeding
- [x] Seed script (prisma/seed.ts) that creates:
  - 1 test company (`Demo Electrical Contractors`)
  - 7 sample materials (EMT conduit, THHN wire, outlets, switches, panels)
  - Global settings (labor rates: L1=$25, L2=$45, L3=$65; 30% burden; 6.625% tax)

### Documentation
- [x] GETTING_STARTED.md — step-by-step local setup guide
- [x] CLAUDE.md — full architecture & development guide
- [x] README.md — project overview

---

## 📋 Ready for Testing

1. Start Docker: `docker-compose up -d`
2. Set up DB: `npm run db:push` (from backend)
3. Seed data: `npm run db:seed` (from backend)
4. Start backend: `npm run dev` (from backend)
5. Test API: 
   ```bash
   curl -H "x-company-id: YOUR_COMPANY_ID" http://localhost:3000/api/materials
   ```

See [GETTING_STARTED.md](./GETTING_STARTED.md) for full instructions.

---

## 🚀 Next Steps (In Order)

### Phase 1a: Materials UI (Frontend)
- [ ] Create Materials management screen
- [ ] Quick search component (real-time Ctrl+A search)
- [ ] Materials table (add/edit/delete UI)
- [ ] Form validation & error handling
- [ ] Integrate with backend API

### Phase 1b: Assemblies
- [ ] Assemblies CRUD API routes
- [ ] Assembly schema validation
- [ ] Assembly UI (create, edit, add line items)
- [ ] Formula engine (evaluate Excel-like formulas)
- [ ] Line item management with quantities

### Phase 1c: Estimates & Takeoff
- [ ] Estimate CRUD API
- [ ] Job Details screen (estimate header form)
- [ ] Takeoff entry table (keyboard-navigable)
- [ ] Add Material/Assembly to takeoff
- [ ] Audit Trail panel (live entry record)
- [ ] Extensions tab (consolidated summary)

### Phase 1d: Closeout & Calculations
- [ ] Calculator service (backend):
  - Labor cost = hours × rate × (1 + burden%)
  - Material tax (Mode A & B)
  - OH&P calculations (separate material vs. labor)
  - Total sell price
- [ ] Closeout screen (edit labor rates, tax, OH&P)
- [ ] Unit price calculation (fully loaded per unit)
- [ ] Estimate totals display

### Phase 1e: Settings & Overrides
- [ ] Settings API (global + per-estimate overrides)
- [ ] Settings UI (labor names/rates, tax, OH&P)
- [ ] Per-estimate overrides (closeout settings screen)

---

## 🛠️ Current Architecture

### Tech Stack
- **Frontend**: React 18 + Vite + Zustand + Tailwind + TypeScript
- **Backend**: Node/Express + Prisma + PostgreSQL + TypeScript
- **Auth**: Header-based (x-company-id) for MVP, JWT planned
- **Math**: Decimal.js for precision money calculations

### Key Principles
- ✅ **Multi-tenant SaaS-ready**: Data isolated by company
- ✅ **Type-safe**: Full TypeScript, Prisma schemas
- ✅ **Keyboard-first**: All nav via hotkeys (to be wired in)
- ✅ **Server-side calculations**: Truth lives on backend
- ✅ **Formula support**: Excel-like syntax for quantities (to be implemented)

---

## 📊 Database Schema Summary

```
Company (tenant)
├─ User (many users per company)
├─ Material (materials library)
├─ Assembly (collections of materials)
│  └─ AssemblyLineItem (references Material)
├─ Estimate (job estimates)
│  ├─ EstimateLineItem (can reference Material or Assembly)
│  └─ AdditionalCost (permits, equipment, etc.)
├─ Settings (global defaults per company)
```

All tables have **company_id** for strict multi-tenant isolation.

---

## 🧪 How to Test the API

### List all materials:
```bash
curl -H "x-company-id: COMPANY_ID" http://localhost:3000/api/materials
```

### Search materials:
```bash
curl -H "x-company-id: COMPANY_ID" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "EMT", "limit": 5}' \
  http://localhost:3000/api/materials/search
```

### Create a material:
```bash
curl -H "x-company-id: COMPANY_ID" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "itemNumber": "200A-MAIN",
    "description": "200A Main Panel",
    "unit": "EA",
    "basePrice": 500,
    "laborLevel1Hours": 4,
    "laborLevel2Hours": 3,
    "laborLevel3Hours": 2,
    "category": "Panels"
  }' \
  http://localhost:3000/api/materials
```

---

## 💡 Notes

- **Company ID** comes from the seed script output
- **Authentication** is header-based for MVP; JWT can be added later
- **All calculations** happen on the backend for data integrity
- **Formula evaluation** (Excel syntax) is planned for Phase 1b
- **Keyboard shortcuts** are stubbed in frontend; wiring happens in Phase 1c

---

See [GETTING_STARTED.md](./GETTING_STARTED.md) to get up and running! 🚀
