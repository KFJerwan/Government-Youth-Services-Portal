<div align="center">

# 🇨🇲 Portail des Services Gouvernementaux pour la Jeunesse

### The digital gateway connecting Cameroonian youth to government programs, trainings, and life-changing opportunities.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933.svg)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E.svg)](https://supabase.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11-398CCB.svg)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F.svg)](https://orm.drizzle.team/)

</div>

---

## 🎯 Why This Exists

Every year, thousands of government programs, scholarships, training sessions, and job opportunities go unfilled — not because there are no eligible youth, but because the information is scattered, inaccessible, or simply unknown.

**Portail Jeunesse Cameroun** solves this. It is a single, unified digital platform where young Cameroonians can discover, apply to, and track every government service aimed at them — from entrepreneurship grants to professional certifications to internship placements.

Built mobile-first, with a clean and accessible interface, the platform is designed to work across all 10 regions of Cameroon, for users regardless of their technical background.

---

## ✨ Platform Features

| Feature | Description |
|---|---|
| 🗂 **Programs** | Browse and apply to government grants, scholarships, and entrepreneurship support |
| 🎓 **Trainings** | Enroll in professional development sessions — online, offline, or hybrid |
| 💼 **Opportunities** | Discover jobs, internships, fellowships, and events filtered by region and domain |
| 📊 **Personal Dashboard** | Track all your applications and their statuses in real time with visual indicators |
| 🛡 **Admin Panel** | Publish programs, validate applications, manage users, send notifications |
| 🔔 **Notifications** | In-app and email notifications triggered on every application status change |
| 🔐 **Auth & Roles** | OAuth login (Google) with role-based access: `user` and `admin` |
| 🌍 **Region-aware** | All content filterable by any of Cameroon's 10 administrative regions |
| 🤖 **AI Assistant** | Built-in chat assistant to guide users through the application process |
| 🗺 **Map Integration** | Interactive map showing regional distribution of opportunities |

---

## 🧱 Full Tech Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND                                                           │
│  React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · Radix UI  │
│  tRPC Client · Wouter Router · React Hook Form · Zod               │
├─────────────────────────────────────────────────────────────────────┤
│  BACKEND                                                            │
│  Node.js 20 · Express 4 · tRPC 11 · Zod validation                │
│  Supabase Auth · Session Cookies · Role middleware                  │
├─────────────────────────────────────────────────────────────────────┤
│  DATABASE & STORAGE                                                 │
│  PostgreSQL (Supabase) · Drizzle ORM · Supabase Storage            │
├─────────────────────────────────────────────────────────────────────┤
│  TOOLING                                                            │
│  Vite 6 · pnpm · Vitest · Prettier · ESBuild · tsx                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Detailed dependency table

| Layer | Package | Version | Role |
|---|---|---|---|
| UI Framework | `react` | 19.x | Component model, concurrent rendering |
| Language | `typescript` | 5.x | Full-stack type safety end-to-end |
| Styling | `tailwindcss` | 4.x | Utility-first CSS with OKLCH color space |
| UI Components | `@radix-ui/*` | Latest | Accessible headless primitives (40+ components) |
| UI Kit | `shadcn/ui` | Latest | Pre-built styled components on top of Radix |
| API Layer | `@trpc/server` + `@trpc/client` | 11.x | End-to-end type-safe API — no REST, no GraphQL, no code generation |
| ORM | `drizzle-orm` | 0.44.x | TypeScript-first ORM with predictable SQL output |
| DB Client | `supabase-js` | 2.x | Auth, storage, and realtime from Supabase |
| Validation | `zod` | 3.x | Runtime schema validation, shared between client and server |
| Forms | `react-hook-form` | 7.x | Performant uncontrolled form state management |
| Router | `wouter` | 3.x | Lightweight 2KB client-side routing |
| Server | `express` | 4.x | HTTP server wrapping tRPC router |
| Build | `vite` | 6.x | Fast frontend bundler with HMR dev server |
| Runtime | `tsx` + `esbuild` | Latest | TypeScript execution and production server bundling |
| Testing | `vitest` | Latest | Unit and integration test runner |
| Package mgr | `pnpm` | 9.x | Fast, disk-efficient package management |

---

## 🏗 System Architecture

The platform uses a **monorepo** structure with three top-level layers — `client`, `server`, and `shared` — communicating through a single tRPC API contract that is fully type-safe end-to-end.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Browser / Mobile                               │
│                                                                         │
│   ┌──────────────┐   ┌─────────────────┐   ┌───────────────────────┐   │
│   │    Pages     │   │   Components    │   │    Context / Hooks    │   │
│   │ Home         │   │ MainLayout      │   │ ThemeContext           │   │
│   │ Programs     │   │ DashboardLayout │   │ useAuth() → tRPC      │   │
│   │ Trainings    │   │ AIChatBox       │   │ useQuery / useMutation│   │
│   │ Opportunities│   │ Map             │   │ useMobile             │   │
│   │ Dashboard    │   │ 40+ shadcn/ui   │   │                       │   │
│   │ Admin        │   │ components      │   │                       │   │
│   └──────┬───────┘   └────────┬────────┘   └───────────┬───────────┘   │
│          └───────────────────┴────────────────────────┘               │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                  tRPC over HTTP (type-safe, no REST)
                  POST /trpc/{router}.{procedure}
                  Session cookie attached automatically
                               │
┌──────────────────────────────▼──────────────────────────────────────────┐
│                      Express + tRPC Server                              │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                  Middleware chain                                │   │
│   │  1. Cookie parser → reads HttpOnly session cookie               │   │
│   │  2. Context builder → getUserByOpenId() → attaches user to ctx  │   │
│   │  3. tRPC input parser → Zod validates all procedure inputs      │   │
│   │  4. Role guard → protectedProcedure throws if no user           │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                     appRouter (routers.ts)                      │   │
│   │  auth · programs · trainings · opportunities                    │   │
│   │  notifications · admin · system                                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└──────────────┬──────────────────────┬─────────────────┬─────────────────┘
               │                      │                 │
   ┌───────────▼──────────┐  ┌────────▼───────┐  ┌─────▼────────────┐
   │    Drizzle ORM       │  │ Supabase Auth  │  │ Supabase Storage │
   │    + PostgreSQL      │  │ (OAuth/Google) │  │ avatars/docs/CVs │
   │    (Supabase)        │  │                │  │                  │
   └──────────────────────┘  └────────────────┘  └──────────────────┘
```

### Why tRPC instead of REST or GraphQL?

tRPC generates the full TypeScript type contract from your server router and makes it available in the client automatically — no code generation step, no OpenAPI spec, no manual type duplication. When you rename a field server-side, TypeScript immediately flags every affected client call. This makes the entire codebase safer and significantly faster to iterate on.

### Why Drizzle ORM?

Drizzle is a TypeScript-first ORM that treats SQL as a first-class citizen. Unlike Prisma, Drizzle produces raw SQL that is predictable and inspectable. Schema changes go through `drizzle-kit` migration files committed to the repo — giving you full control over database evolution with no hidden magic. The `schema.ts` file is the single source of truth: it defines the tables, and TypeScript infers all types from it at compile time.

---

## 📁 Project Structure

```
PortailJeunesse/
│
├── client/                              # React 19 frontend
│   ├── index.html                       # Vite HTML entry point
│   └── src/
│       ├── _core/hooks/
│       │   └── useAuth.ts               # tRPC-powered auth hook (session state)
│       ├── components/
│       │   ├── ui/                      # 40+ shadcn/ui + Radix primitives
│       │   ├── MainLayout.tsx           # App shell: nav, sidebar, theme toggle
│       │   ├── DashboardLayout.tsx      # Authenticated layout wrapper
│       │   ├── DashboardLayoutSkeleton.tsx
│       │   ├── AIChatBox.tsx            # AI assistant chat component
│       │   ├── Map.tsx                  # Interactive region map
│       │   ├── ErrorBoundary.tsx        # React error boundary
│       │   └── ManusDialog.tsx
│       ├── contexts/
│       │   └── ThemeContext.tsx         # Light / dark mode context + persistence
│       ├── hooks/
│       │   ├── useComposition.ts        # IME composition handling (non-Latin input)
│       │   └── useMobile.tsx            # Responsive breakpoint detection hook
│       ├── lib/
│       │   ├── supabase.ts              # ← FROM files.zip: Supabase client singleton
│       │   ├── trpc.ts                  # tRPC React Query client setup
│       │   └── utils.ts                 # cn() class merger and shared utilities
│       ├── pages/
│       │   ├── Home.tsx                 # Public landing page
│       │   ├── Dashboard.tsx            # User dashboard (auth required)
│       │   ├── Programs.tsx             # ← FROM files.zip: Supabase-powered listing
│       │   ├── Trainings.tsx            # ← FROM files.zip: Supabase-powered catalog
│       │   ├── Opportunities.tsx        # ← FROM files.zip: Supabase-powered board
│       │   ├── Admin.tsx                # Admin panel (admin role required)
│       │   └── NotFound.tsx
│       ├── App.tsx                      # Router + providers (Theme, Tooltip, Error)
│       ├── const.ts                     # App-wide constants (login URL, regions, etc.)
│       ├── main.tsx                     # React 19 DOM entry point
│       └── index.css                    # Tailwind directives + OKLCH design tokens
│
├── server/                              # Express + tRPC backend
│   ├── _core/
│   │   ├── index.ts                     # Server bootstrap: Express + Vite SSR
│   │   ├── trpc.ts                      # publicProcedure / protectedProcedure factory
│   │   ├── context.ts                   # Per-request context (user from cookie)
│   │   ├── cookies.ts                   # Session cookie sign/verify helpers
│   │   ├── env.ts                       # Validated environment variables (Zod)
│   │   ├── llm.ts                       # LLM integration (AI assistant backend)
│   │   ├── notification.ts              # In-app + email notification dispatch
│   │   ├── storage.ts                   # Supabase Storage upload helpers
│   │   ├── imageGeneration.ts           # AI image generation
│   │   ├── map.ts                       # Map data helpers
│   │   ├── oauth.ts                     # OAuth callback handler
│   │   ├── sdk.ts                       # Platform SDK integration
│   │   ├── systemRouter.ts              # System tRPC router (health checks)
│   │   ├── vite.ts                      # Vite dev server middleware (dev only)
│   │   └── voiceTranscription.ts        # Voice-to-text via Whisper API
│   ├── db.ts                            # Drizzle lazy client + upsertUser()
│   ├── routers.ts                       # All business logic tRPC routers
│   └── storage.ts                       # Storage procedure helpers
│
├── drizzle/                             # Database layer
│   ├── schema.ts                        # Full typed schema — 9 tables
│   ├── relations.ts                     # Drizzle table relations
│   ├── 0000_third_iron_patriot.sql      # Initial migration
│   ├── 0001_solid_scarlet_spider.sql    # Extended migration
│   ├── migrations/                      # Migration output directory
│   └── meta/                            # Drizzle snapshot + journal metadata
│
├── shared/                              # Shared between client and server
│   ├── _core/errors.ts                  # Shared error types
│   ├── const.ts                         # Cookie name, shared constants
│   └── types.ts                         # Shared TypeScript interfaces
│
├── .env.example                         # ← FROM files.zip: full env template
├── drizzle.config.ts                    # Drizzle Kit config (points to schema.ts)
├── vite.config.ts                       # Vite config (React plugin + SSR proxy)
├── tsconfig.json                        # TypeScript project references
├── vitest.config.ts                     # Test configuration
├── components.json                      # shadcn/ui CLI config
├── package.json                         # Scripts + dependencies
└── pnpm-lock.yaml                       # Exact dependency lockfile
```

---

## 🗄 Database Schema

The database has **9 tables** with a clear relational structure. All migrations are versioned under `drizzle/` and applied via `pnpm db:push`.

```
                        ┌─────────────────────────────────────────┐
                        │                 users                   │
                        │  id · openId (OAuth) · name · email    │
                        │  phone · dateOfBirth · region · city   │
                        │  bio · profileImage (Storage URL)      │
                        │  loginMethod · role (user|admin)       │
                        │  createdAt · updatedAt · lastSignedIn  │
                        └────────────────┬────────────────────────┘
                                         │
              ┌──────────────────────────┼───────────────────────────┐
              │                          │                           │
              ▼                          ▼                           ▼
  program_applications       training_enrollments       opportunity_applications
  userId* · programId*        userId* · trainingId*       userId* · opportunityId*
  status:                     status:                     status:
   pending|approved            enrolled|completed          applied|shortlisted
   rejected|withdrawn          cancelled                   rejected|accepted
  applicationDate             enrollmentDate              applicationDate
  reviewedAt · reviewedBy*    completionDate              resumeUrl (Storage)
  rejectionReason · notes     certificateUrl (Storage)    coverLetter · notes
  attachments (JSON URLs)
              │                          │                           │
              ▼                          ▼                           ▼
          programs                   trainings                 opportunities
  title · description           title · description          title · description
  category · targetAudience*    domain                       type:
  requirements* · benefits*     level: beg|int|adv            job|internship
  applicationDeadline           duration · format:            scholarship|event
  startDate · endDate            online|offline|hybrid       domain · region
  maxApplicants                 maxParticipants              organization
  fundingAmount (decimal)       currentParticipants†         salary · duration
  region · contactEmail         instructorName · Bio         applicationDeadline
  documentationUrl (Storage)    price (decimal, 0=free)      requirements*
  imageUrl (Storage)            certificateProvided          benefits*
  isActive · createdBy*         isActive · createdBy*        applicationUrl
                                                             isActive · createdBy*

* = JSON column (flexible structured data)
† = denormalized counter, incremented on enrollment

                        notifications
                  userId* · type:
                   application_status | new_opportunity
                   training_reminder | program_update | system
                  title · message
                  relatedEntityType · relatedEntityId
                  isRead · emailSent · emailSentAt

                        audit_logs
                  adminId* · action (e.g. "approve_application")
                  entityType · entityId
                  changes (JSON delta) · reason
```

### Key design decisions

**`openId` as identity anchor** — users authenticate via OAuth (Google). The `openId` field stores the provider's unique user ID. `upsertUser()` in `server/db.ts` uses `INSERT ... ON DUPLICATE KEY UPDATE` so returning users always get their existing record, never a duplicate.

**JSON columns for flexible content** — `requirements`, `benefits`, `targetAudience`, and `attachments` store JSON strings. This lets each program define its own structure without schema migrations every time content requirements change.

**`createdBy` on all content tables** — every program, training, and opportunity records the admin who created it. Combined with `audit_logs`, this provides a complete provenance trail.

**`currentParticipants` denormalized counter** — avoids expensive `COUNT(*)` joins on the hot training listing endpoint. Incremented atomically on enrollment.

**Drizzle type inference** — `typeof programs.$inferSelect` and `typeof programs.$inferInsert` produce TypeScript types at compile time directly from the schema. No manual type files, no code generation.

---

## 🔁 Request Lifecycle

What happens when a user submits a program application — from click to database to notification:

```
Browser
  trpc.programs.apply.mutate({ programId, notes, attachments })
  │
  │  tRPC client wraps this in:
  │  POST /trpc/programs.apply
  │  Body: JSON-encoded input
  │  Cookie: HttpOnly session cookie (auto-attached)
  │
  ▼
Express server (server/_core/index.ts)
  │
  ├─ 1. Cookie parser
  │     Reads SESSION_SECRET-signed cookie
  │     Decodes openId from payload
  │
  ├─ 2. Context builder (server/_core/context.ts)
  │     getUserByOpenId(openId) → Drizzle SELECT from users
  │     Attaches user object to ctx (null if not found)
  │
  ├─ 3. tRPC procedure: programs.apply (server/routers.ts)
  │     protectedProcedure → throws UNAUTHORIZED if ctx.user is null
  │     Zod parses + validates input (programId: number, notes?: string...)
  │
  ├─ 4. Business logic
  │     Drizzle: SELECT program to verify isActive + maxApplicants not exceeded
  │     Drizzle: INSERT INTO program_applications (userId, programId, status='pending')
  │
  ├─ 5. Notification dispatch (server/_core/notification.ts)
  │     Drizzle: INSERT INTO notifications (userId, type='application_status', ...)
  │     [optional] SMTP: sends confirmation email
  │
  └─ 6. Returns typed response
         { success: true, applicationId: number }
         │
         ▼
    React Query invalidates trpc.programs.myApplications cache
    Dashboard re-fetches and shows new "pending" application
    Sonner toast: "Application submitted successfully"
```

### Authentication flow

```
User clicks "Login with Google"
  │
  ▼
Supabase Auth OAuth redirect → Google consent screen
  │  User approves
  │
  ▼
OAuth callback → server/_core/oauth.ts
  │  Supabase validates token, returns user info
  │  openId + email + name extracted from provider payload
  │
  ▼
upsertUser() in server/db.ts
  │  INSERT INTO users (openId, name, email, lastSignedIn)
  │  ON DUPLICATE KEY UPDATE lastSignedIn = NOW()
  │  If openId === ENV.ownerOpenId → role = 'admin'
  │
  ▼
Session cookie set by server/_core/cookies.ts
  │  HttpOnly · SameSite=Strict · signed with SESSION_SECRET
  │
  ▼
useAuth() hook on the client (client/src/_core/hooks/useAuth.ts)
  │  trpc.auth.me.useQuery() → GET /trpc/auth.me
  │  Returns { user, isAuthenticated, loading }
  │  Caches in React Query + mirrors to localStorage
  │
  ▼
App.tsx Router applies route guards
  /dashboard and /admin only render if isAuthenticated === true
```

---

## 🔐 Authentication & Roles

| Role | How assigned | Access |
|---|---|---|
| `user` | Default on first OAuth login | Browse content, apply to programs/trainings/opportunities, manage own profile and applications, receive notifications |
| `admin` | SQL `UPDATE` or `ENV.ownerOpenId` match at login | Everything above + publish/edit/delete programs, manage trainings and opportunities, validate/reject applications, access audit logs, manage all users |

Role is stored in `users.role` and checked server-side on every protected tRPC procedure via `protectedProcedure`. The client reads `user.role` from the auth context to conditionally render the admin navigation link and admin-only UI elements.

---

## 📁 Where the Files from `files.zip` Go

| File in `files.zip` | Exact destination in repo | What it does |
|---|---|---|
| `Programs.tsx` | `client/src/pages/Programs.tsx` | Replaces the stub — full Supabase-powered listing with filters and application modal |
| `Trainings.tsx` | `client/src/pages/Trainings.tsx` | Replaces the stub — full training catalog with enrollment flow |
| `Opportunities.tsx` | `client/src/pages/Opportunities.tsx` | Replaces the stub — full job/internship/scholarship board |
| `MainLayout.tsx` | `client/src/components/MainLayout.tsx` | Replaces existing — updated nav with Supabase-aware auth state |
| `supabase.ts` | `client/src/lib/supabase.ts` | **New file** — create `lib/` if it doesn't exist. The Supabase client singleton used by all three pages above |
| `.env.example` | `.env.example` (project root) | Replaces the existing template with the complete Supabase variable set |

> The three page files (`Programs`, `Trainings`, `Opportunities`) all import `supabase` from `../lib/supabase`. Place `supabase.ts` at `client/src/lib/supabase.ts` first or TypeScript will fail to compile.

---

## ⚡ Quick Start

### Prerequisites

- Node.js ≥ 20 — check with `node --version`
- pnpm ≥ 9 — install with `npm install -g pnpm`
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PortailJeunesse.git
cd PortailJeunesse
```

### 2. Install all dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
# Open .env and fill in your Supabase credentials
```

### 4. Run database migrations

```bash
pnpm db:push
```

This runs `drizzle-kit generate && drizzle-kit migrate` — creating all 9 tables in your Supabase PostgreSQL database.

### 5. Start the development server

```bash
pnpm dev
```

App runs at **http://localhost:3000**. The Express server proxies the Vite dev server, so hot-reload works for both frontend and backend changes.

---

## 🗄 Supabase Setup

### Step 1 — Create a project in your organisation

Go to [app.supabase.com](https://app.supabase.com) → select your organisation → **New project**.

> Recommended region: `af-south-1` (Cape Town) — lowest latency from Cameroon.

### Step 2 — Copy your API keys

Go to **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGci...    # safe for browser
SUPABASE_ANON_KEY=eyJhbGci...

SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... # server only — NEVER expose to browser
```

### Step 3 — Copy your database URL

**Project Settings → Database → Connection string → URI**:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

Use **port 5432** (direct connection) for Drizzle ORM migrations.

### Step 4 — Run migrations

```bash
pnpm db:push
```

### Step 5 — Enable Google OAuth

**Authentication → Providers → Google** — paste your Google Client ID and Secret from [Google Cloud Console](https://console.cloud.google.com/).

Authorised redirect URI to add in Google:
```
https://xxxxxxxxxxxx.supabase.co/auth/v1/callback
```

### Step 6 — Create storage buckets

**Storage → New bucket**:

| Bucket | Visibility | Used for |
|---|---|---|
| `avatars` | Public | User profile pictures |
| `documents` | Private | Attachments on program applications |
| `resumes` | Private | CVs on opportunity applications |

### Step 7 — Promote your first admin

In **Supabase → SQL Editor**:

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
```

Or set `ownerOpenId` in your server env — the matching user will auto-promote to admin on every login.

---

## 🚀 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with hot reload (client + server) |
| `pnpm build` | Production build: Vite bundles client, ESBuild bundles server to `dist/` |
| `pnpm start` | Start production server (`node dist/index.js`) |
| `pnpm check` | TypeScript type check across all packages (no emit) |
| `pnpm format` | Format all files with Prettier |
| `pnpm test` | Run Vitest test suite |
| `pnpm db:push` | Generate Drizzle migrations and apply to the database |

---

## 🌍 Pushing to GitHub

```bash
cd PortailJeunesse

git init
git remote add origin https://github.com/YOUR_USERNAME/PortailJeunesse.git

# Copy the 6 files from files.zip to their correct paths (see table above)

git add .
git commit -m "feat: initial project with Supabase integration"
git push -u origin main
```

> `.env` is in `.gitignore` and will not be pushed. Only `.env.example` is committed. Never commit real credentials.

---

## 📦 Production Deployment

### Railway (recommended — full-stack Node.js)

1. Push code to GitHub
2. Connect repo at [railway.app](https://railway.app)
3. Set all environment variables from `.env` in the Railway dashboard
4. Build command: `pnpm build`
5. Start command: `pnpm start`
6. Railway auto-provisions a public HTTPS URL

### Render

Same as Railway:
- Build: `pnpm install && pnpm build`
- Start: `pnpm start`
- Add all `.env` variables in the Render dashboard

### Vercel (frontend only — if backend is hosted separately)

```bash
cd client && vite build
```

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in Vercel. Point your tRPC calls to your separately hosted Express backend.

---

## 🛣 Roadmap

- [x] Full database schema — 9 tables with typed Drizzle migrations
- [x] Frontend infrastructure: layout, navigation, theming, error boundaries
- [x] Public landing page
- [x] Programs, Trainings, Opportunities pages (Supabase-powered with filters)
- [x] OAuth authentication with role-based route guards
- [x] AI chat assistant integration
- [x] Interactive region map
- [ ] User dashboard: visual application tracking with status indicators
- [ ] Admin panel: full CRUD for programs, trainings, opportunities
- [ ] Application validation workflow (approve/reject with reason + notification)
- [ ] Email notification system (SMTP via SendGrid / Resend)
- [ ] Training certificate generation (PDF, stored in Supabase Storage)
- [ ] Mobile PWA + offline support (service worker)
- [ ] Multi-language: French / English toggle
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Cursor-based pagination for large datasets

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add region filter to opportunities"`
4. Push and open a Pull Request

Please run `pnpm check && pnpm test && pnpm format` before submitting a PR.

---.

---

<div align="center">

Built with ❤️ for the youth of Cameroon 🇨🇲

**[Supabase](https://supabase.com)** · **[shadcn/ui](https://ui.shadcn.com)** · **[tRPC](https://trpc.io)** · **[Drizzle ORM](https://orm.drizzle.team)** · **[Radix UI](https://www.radix-ui.com)**

</div>
