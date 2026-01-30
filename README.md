# Job Tracker

Fullstack job application tracker with Next.js API routes, Prisma, and Neon PostgreSQL.

## Live App
https://job-tracker-danielkamanda.vercel.app/

## Features
- User authentication (JWT)
- CRUD for job applications
- Status tracking (Applied, Interview, Offer, Rejected)
- Search and filter by company/title/status
- Responsive UI

## Tech Stack
- **Frontend**: Next.js 16, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL via Prisma v6
- **Auth**: bcryptjs + jsonwebtoken

## Setup
1. Clone and install:
   ```bash
   npm install
   ```

2. Environment variables (create `.env` and `.env.local`):
   ```bash
   DATABASE_URL="your_neon_db_url"
   JWT_SECRET="your_jwt_secret"
   ```

3. Initialize Prisma:
   ```bash
   npx prisma generate
   ```

4. Run:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Migration Note
Originally built with Express.js on Railway. Migrated to Next.js API routes for cost efficiency and unified Vercel deployment.

