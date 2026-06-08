# SnapEst — Getting Started Guide

Quick setup to get SnapEst running locally with PostgreSQL, backend API, and frontend.

---

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- Docker & Docker Compose ([download](https://www.docker.com/products/docker-desktop))
- Git (optional, but useful)

---

## Step 1: Install Dependencies

From the SnapEst root directory:

```bash
npm install
```

This installs dependencies for all packages (frontend, backend, and root).

---

## Step 2: Start PostgreSQL

Start PostgreSQL and pgAdmin with Docker Compose:

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on `localhost:5432`
- **pgAdmin** on `http://localhost:5050`

Verify PostgreSQL is running:

```bash
docker-compose ps
```

---

## Step 3: Set Up Database Schema

From the `packages/backend` directory:

```bash
npm run db:push
```

Or, if you want to create a migration:

```bash
npm run db:migrate
```

This creates all tables in the database according to the Prisma schema.

---

## Step 4: Seed Test Data

From the `packages/backend` directory:

```bash
npm run db:seed
```

This creates:
- A test company (`Demo Electrical Contractors`)
- 7 sample materials (conduit, wire, outlets, panels, etc.)
- Global settings with labor rates and defaults

**Important**: The seed script will print the **Company ID** you'll need to use in API requests. Copy it!

Example output:
```
🎉 Database seeded successfully!

Test Company ID: clq4j5k2b0000h7d9q0s5q0q0
Use this ID in the x-company-id header for API requests.
```

---

## Step 5: Start the Backend API

From the `packages/backend` directory:

```bash
npm run dev
```

This starts the Express server on `http://localhost:3000`.

You should see:
```
SnapEst backend listening on port 3000
Visit http://localhost:3000/api/health to check status

Send x-company-id header with all API requests
Example: curl -H "x-company-id: company-123" http://localhost:3000/api/materials
```

---

## Step 6: Start the Frontend (in a new terminal)

From the `packages/frontend` directory:

```bash
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`.

Open `http://localhost:5173` in your browser.

---

## Testing the API

In a new terminal, test the Materials API:

```bash
# Replace COMPANY_ID with the ID from the seed output
curl -H "x-company-id: COMPANY_ID" http://localhost:3000/api/materials
```

You should get a JSON response with the 7 sample materials.

---

## Database Management

### View Data in pgAdmin

1. Open `http://localhost:5050`
2. Login with:
   - **Email**: `admin@snapest.local`
   - **Password**: `admin`
3. Add a new server:
   - **Host**: `postgres`
   - **Port**: `5432`
   - **Username**: `snapest`
   - **Password**: `snapest_dev_password`
   - **Database**: `snapest`

### View/Edit Data with Prisma Studio

From `packages/backend`:

```bash
npm run db:studio
```

Opens an interactive UI at `http://localhost:5555`.

### Reset Database

To clear all data and start fresh:

```bash
npm run db:reset
```

Then reseed:

```bash
npm run db:seed
```

---

## Troubleshooting

### Docker won't start
- Make sure Docker Desktop is running
- Check `docker ps` to see running containers
- Try `docker-compose down && docker-compose up -d`

### PostgreSQL connection fails
- Check `.env` file in `packages/backend/` has correct `DATABASE_URL`
- Verify PostgreSQL is running: `docker-compose ps`
- Try resetting: `docker-compose down && docker-compose up -d`

### Prisma schema out of sync
```bash
npm run db:push
```

### Need to clear everything and start fresh
```bash
# Stop and remove containers
docker-compose down -v

# Remove node_modules and lock files
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Start fresh
docker-compose up -d
npm run db:push
npm run db:seed
```

---

## Project Structure

```
SnapEst/
├── docker-compose.yml          # PostgreSQL + pgAdmin setup
├── packages/
│   ├── backend/
│   │   ├── .env                # Database connection (you created this)
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Data models
│   │   │   └── seed.ts         # Test data
│   │   └── src/
│   │       ├── server.ts       # Express entry point
│   │       ├── routes/         # API endpoints
│   │       ├── middleware/     # Auth, etc.
│   │       └── db/             # Prisma client
│   └── frontend/
│       ├── src/
│       │   ├── App.tsx         # Main app component
│       │   ├── screens/        # Job Details, Takeoff, Closeout
│       │   └── ...
│       └── vite.config.ts
└── CLAUDE.md                   # Development guide
```

---

## Next Steps

- **Explore the API**: Test different endpoints with cURL or Postman
- **Build Materials UI**: Wire up the quick-search component to fetch from the API
- **Add Assemblies**: Implement assembly CRUD with line items
- **Build Takeoff**: Implement the keyboard-navigable takeoff entry table
- **Calculate Totals**: Implement the calculator service for labor costs, tax, OH&P

See [CLAUDE.md](./CLAUDE.md) for the full development roadmap.

---

## Common Commands

```bash
# Terminal 1: Backend
cd packages/backend
npm run dev

# Terminal 2: Frontend (new terminal)
cd packages/frontend
npm run dev

# Terminal 3: Database Studio (optional, for debugging)
cd packages/backend
npm run db:studio

# See all materials
curl -H "x-company-id: YOUR_COMPANY_ID" http://localhost:3000/api/materials

# Search materials
curl -H "x-company-id: YOUR_COMPANY_ID" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "EMT"}' \
  http://localhost:3000/api/materials/search
```

---

## Questions?

Check [CLAUDE.md](./CLAUDE.md) for architecture and design decisions, or dig into the code!

Happy building! 🚀
