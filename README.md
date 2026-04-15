<div align="center">

<img src="https://img.shields.io/badge/Cameroun-🇨🇲-green?style=flat-square" alt="Cameroun"/>

# Portail des Services Gouvernementaux pour la Jeunesse

### The digital gateway connecting young Cameroonians to government programs, scholarships, trainings, and careers — across all 10 regions.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat-square)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933.svg?style=flat-square)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E.svg?style=flat-square)](https://supabase.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11-398CCB.svg?style=flat-square)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F.svg?style=flat-square)](https://orm.drizzle.team/)

</div>

---

## Why This Exists

Every year, thousands of government programs, scholarships, training sessions, and job opportunities go unfilled — not because there are no eligible youth, but because the information is scattered, inaccessible, or simply unknown.

**Portail Jeunesse Cameroun** solves this. It is a single, unified digital platform where young Cameroonians can discover, apply to, and track every government service aimed at them — from entrepreneurship grants to professional certifications to internship placements.

Built mobile-first, with a clean and accessible interface, designed to work across all 10 regions of Cameroon regardless of connectivity or technical background.

---

## Platform Preview

### Programs catalog

> Youth browse active government programs filtered by region, category, and deadline — and apply in seconds from the same view.

```
┌─────────────────────────────────────────────────────────────────────┐
│  portailjeunesse.cm/programs                                        │
├──────────────────────────────────────────────────────────────────── │
│  [Logo] Portail Jeunesse    Programs  Trainings  Opps   [Mon compte]│
├──────────────────────────────────────────────────────────────────── │
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────────┐ │
│  │  🎓 Education     │  │  💼 Entrepreneuriat│  │  🔬 Recherche   │ │
│  │                   │  │                   │  │                 │ │
│  │  Bourse           │  │  Fonds d'appui    │  │  Programme de   │ │
│  │  d'excellence     │  │  aux jeunes       │  │  recherche      │ │
│  │  universitaire    │  │  entrepreneurs    │  │  scientifique   │ │
│  │                   │  │                   │  │                 │ │
│  │  MINESUP · Centre │  │  MINPMEESA ·Lit.  │  │  MINRESI ·Nat. │ │
│  ├───────────────────┤  ├───────────────────┤  ├─────────────────┤ │
│  │ [Ouvert] [Postuler│  │ [Ouvert] [Postuler│  │[Bientôt] [Voir]│ │
│  └───────────────────┘  └───────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Personal dashboard

> Every applicant gets a personal dashboard to track the status of every application across programs, trainings, and opportunities in real time.

```
┌─────────────────────────────────────────────────────────────────────┐
│  portailjeunesse.cm/dashboard                                       │
├──────────────┬──────────────────────────────────────────────────────┤
│  [KN]        │  Bonjour, Koffi                                     │
│  Koffi Nguema│  Voici le résumé de vos activités                   │
│  Yaoundé     │                                                      │
│              │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  > Dashboard │  │    3     │  │    1     │  │    2     │          │
│    Candidat. │  │Candidat. │  │Approuvée │  │En attente│          │
│    Programmes│  └──────────┘  └──────────┘  └──────────┘          │
│    Formations│                                                      │
│    Opportun. │  Bourse d'excellence 2025         [Approuvée]       │
│    Profil    │  Fonds jeunes entrepreneurs        [En attente]      │
│              │  Formation React & Node.js          [Inscrit]        │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## Features

| Feature | Description |
|---|---|
| 🗂 **Programs catalog** | Government grants, scholarships, and entrepreneurship programs — filtered by region, category, deadline, and funding amount |
| 🎓 **Training enrollment** | Online, offline, and hybrid professional trainings with certificate tracking, capacity management, and instructor profiles |
| 💼 **Opportunity board** | Jobs, internships, scholarships, and events from verified organisations with one-click application and resume upload |
| 📊 **Personal dashboard** | Real-time application tracking with visual status indicators across all content types |
| 🛡 **Admin panel** | Publish content, validate applications, manage users, and review a full audit log of every admin action |
| 🔔 **Notifications** | In-app and email notifications triggered on every status change — approved, rejected, reminder, system update |
| 🔐 **Auth & roles** | Google OAuth login with role-based access: `user` (default) and `admin` |
| 🌍 **Region-aware** | All content filterable by any of Cameroon's 10 administrative regions |
| 🤖 **AI assistant** | Built-in chat assistant to guide users through applications and eligibility |
| 🗺 **Map integration** | Interactive map showing regional distribution of opportunities |

---

## Tech Stack

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

| Layer | Package | Version | Role |
|---|---|---|---|
| UI Framework | `react` | 19.x | Component model, concurrent rendering |
| Language | `typescript` | 5.x | Full-stack type safety end-to-end |
| Styling | `tailwindcss` | 4.x | Utility-first CSS with OKLCH color space |
| UI Components | `@radix-ui/*` | Latest | Accessible headless primitives (40+ components) |
| UI Kit | `shadcn/ui` | Latest | Pre-built styled components on top of Radix |
| API Layer | `@trpc/server` + `@trpc/client` | 11.x | End-to-end type-safe API — no REST, no GraphQL, no codegen |
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

## System Architecture

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
│   appRouter:  auth · programs · trainings · opportunities              │
│               notifications · admin · system                           │
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

tRPC generates the full TypeScript type contract from your server router and makes it available in the client automatically — no code generation step, no OpenAPI spec, no manual type duplication. When you rename a field server-side, TypeScript immediately flags every affected client call.

### Why Drizzle ORM?

Drizzle is a TypeScript-first ORM that produces raw SQL that is predictable and inspectable. Schema changes go through `drizzle-kit` migration files committed to the repo — full control over database evolution with no hidden magic. The `schema.ts` file is the single source of truth; TypeScript infers all types from it at compile time.

---

## Database Schema (9 tables)

```
                        ┌───────────────────────────────────────────┐
                        │                  users                    │
                        │  id · openId (OAuth uid) · name · email  │
                        │  phone · dateOfBirth · region · city     │
                        │  role: user | admin · lastSignedIn       │
                        └───────┬────────────────┬──────────────────┘
                                │                │
              ┌─────────────────┼────────────────┼──────────────────┐
              │                 │                │                  │
              ▼                 ▼                ▼                  │
  program_applications  training_enrollments  opportunity_apps      │
  userId* · programId*  userId*·trainingId*   userId*·opportunityId*│
  status:               status:               status:               │
   pending|approved      enrolled|completed    applied|shortlisted  │
   rejected|withdrawn    cancelled             accepted|rejected    │
  attachments (JSON)    certificateUrl        resumeUrl             │
              │                 │                │                  │
              ▼                 ▼                ▼                  │
          programs          trainings        opportunities          │
  category · funding     domain · level      type: job|internship   │
  region · deadline      format: online      scholarship|event      │
  requirements (JSON)    offline|hybrid      organization · salary  │
  isActive · createdBy*  price (0=free)      applicationDeadline    │
                         certificateProvided  isActive · createdBy* │
                                                                    │
  notifications                              audit_logs             │
  userId* · type                             adminId* · action      │
  isRead · emailSent                         entityType · changes   │
```

---

## Request Lifecycle

What happens when a user submits a program application:

```
Browser
  trpc.programs.apply.mutate({ programId, notes, attachments })
  │
  │  POST /trpc/programs.apply · session cookie auto-attached
  │
  ▼
Express server
  │
  ├─ 1. Cookie parser → reads SESSION_SECRET-signed cookie → decodes openId
  ├─ 2. Context builder → getUserByOpenId() → attaches user to ctx (or null)
  ├─ 3. protectedProcedure → throws UNAUTHORIZED if ctx.user is null
  ├─ 4. Zod validates input shape (programId: number, notes?: string...)
  ├─ 5. Drizzle: verify program isActive + maxApplicants not exceeded
  ├─ 6. Drizzle: INSERT INTO program_applications
  ├─ 7. Notification: INSERT INTO notifications + optional SMTP email
  └─ 8. Returns { success: true, applicationId: number }
         │
         ▼
    React Query cache invalidated → dashboard re-fetches
    Sonner toast: "Application submitted successfully"
```

---

## Authentication Flow

```
User clicks "Login with Google"
  │
  ▼
Supabase Auth OAuth redirect → Google consent screen
  │
  ▼
OAuth callback → server/_core/oauth.ts
  │  openId + email + name extracted from provider payload
  │
  ▼
upsertUser() — INSERT ON DUPLICATE KEY UPDATE lastSignedIn
  │  If openId === ENV.ownerOpenId → role = 'admin'
  │
  ▼
HttpOnly session cookie set (SameSite=Strict, signed with SESSION_SECRET)
  │
  ▼
useAuth() hook → trpc.auth.me.useQuery()
  Returns { user, isAuthenticated, loading }
  │
  ▼
App.tsx Router: /dashboard and /admin render only if isAuthenticated
```

---

## Project Structure

```
PortailJeunesse/
├── client/src/
│   ├── _core/hooks/useAuth.ts          # tRPC-powered auth hook
│   ├── components/
│   │   ├── ui/                         # 40+ shadcn/ui + Radix components
│   │   ├── MainLayout.tsx              # App shell + nav
│   │   ├── AIChatBox.tsx               # AI assistant
│   │   └── Map.tsx                     # Region map
│   ├── lib/
│   │   ├── supabase.ts                 # ← FROM files.zip: Supabase client singleton
│   │   └── trpc.ts                     # tRPC React Query client
│   └── pages/
│       ├── Programs.tsx                # ← FROM files.zip: full Supabase page
│       ├── Trainings.tsx               # ← FROM files.zip: full Supabase page
│       └── Opportunities.tsx           # ← FROM files.zip: full Supabase page
│
├── server/
│   ├── _core/
│   │   ├── trpc.ts                     # publicProcedure / protectedProcedure
│   │   ├── context.ts                  # Per-request context builder
│   │   ├── notification.ts             # In-app + email dispatch
│   │   └── oauth.ts                    # OAuth callback handler
│   ├── db.ts                           # Drizzle lazy client + upsertUser()
│   └── routers.ts                      # All business logic tRPC routers
│
├── drizzle/
│   ├── schema.ts                       # 9 tables — single source of truth
│   ├── 0000_*.sql                      # Initial migration
│   └── 0001_*.sql                      # Extended migration
│
└── shared/
    ├── const.ts                        # Cookie name, shared constants
    └── types.ts                        # Shared TypeScript interfaces
```

---

## Files from `files.zip` — exact destinations

| File | Destination | Action |
|---|---|---|
| `Programs.tsx` | `client/src/pages/Programs.tsx` | Replace existing stub |
| `Trainings.tsx` | `client/src/pages/Trainings.tsx` | Replace existing stub |
| `Opportunities.tsx` | `client/src/pages/Opportunities.tsx` | Replace existing stub |
| `MainLayout.tsx` | `client/src/components/MainLayout.tsx` | Replace existing file |
| `supabase.ts` | `client/src/lib/supabase.ts` | New file — create `lib/` if missing |
| `.env.example` | `.env.example` (project root) | Replace existing template |

> The three pages import `supabase` from `../lib/supabase` — place `supabase.ts` first or the project will not compile.

---

## Quick Start

### Prerequisites
- Node.js ≥ 20
- pnpm ≥ 9 → `npm install -g pnpm`
- A [Supabase](https://supabase.com) project (free tier works)

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/PortailJeunesse.git
cd PortailJeunesse

# 2. Install
pnpm install

# 3. Configure
cp .env.example .env
# Fill in your Supabase credentials

# 4. Apply DB migrations
pnpm db:push

# 5. Start dev server
pnpm dev
# → http://localhost:3000
```

---

## Supabase Setup

### Keys (Project Settings → API)

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGci...       # safe for browser
SUPABASE_ANON_KEY=eyJhbGci...

SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...    # server only — never expose to browser
```

### Database URL (Project Settings → Database → Connection string)

```env
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

> Use port **5432** (direct) for Drizzle migrations. Port 6543 (pooler) is for serverless only.

### Storage buckets

| Bucket | Visibility | Used for |
|---|---|---|
| `avatars` | Public | User profile pictures |
| `documents` | Private | Application attachments |
| `resumes` | Private | CVs on opportunity applications |

### Promote first admin

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
```

### Enable Google OAuth

**Authentication → Providers → Google** — paste your Google Client ID and Secret.
Add to Google's allowed redirect URIs: `https://xxxxxxxxxxxx.supabase.co/auth/v1/callback`

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Production build (Vite + ESBuild) |
| `pnpm start` | Run production server |
| `pnpm check` | TypeScript type check |
| `pnpm format` | Prettier formatting |
| `pnpm test` | Vitest test suite |
| `pnpm db:push` | Generate + apply Drizzle migrations |

---

## Push to GitHub

```bash
cd PortailJeunesse
git init
git remote add origin https://github.com/YOUR_USERNAME/PortailJeunesse.git

# Copy the 6 files from files.zip to their correct paths (see table above)

git add .
git commit -m "feat: initial project with Supabase integration"
git push -u origin main
```

> `.env` is in `.gitignore`. Never commit real credentials — only `.env.example`.

---

## Deployment

### Railway (recommended)
1. Connect repo at [railway.app](https://railway.app)
2. Set all env variables from `.env`
3. Build: `pnpm build` · Start: `pnpm start`

### Render
- Build: `pnpm install && pnpm build`
- Start: `pnpm start`

### Vercel (frontend only)
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Point tRPC calls to your separately hosted backend

---

## Roadmap

- [x] Full database schema — 9 tables with typed Drizzle migrations
- [x] Frontend infrastructure: layout, navigation, theming, error boundaries
- [x] Programs, Trainings, Opportunities pages (Supabase-powered)
- [x] OAuth authentication with role-based route guards
- [x] AI assistant + interactive region map
- [ ] User dashboard: visual application tracking
- [ ] Admin panel: full CRUD + application validation workflow
- [ ] Email notifications (SendGrid / Resend)
- [ ] Training certificate generation (PDF → Supabase Storage)
- [ ] Mobile PWA + offline support
- [ ] French / English language toggle
- [ ] WCAG 2.1 AA accessibility audit

---

## Contributing

1. Fork the repo
2. `git checkout -b feat/your-feature`
3. `git commit -m "feat: add your feature"`
4. `git push origin feat/your-feature`
5. Open a Pull Request

Run `pnpm check && pnpm test && pnpm format` before submitting.

---



---

<div align="center">

Built with love for the youth of Cameroon 🇨🇲

**[Supabase](https://supabase.com)** · **[shadcn/ui](https://ui.shadcn.com)** · **[tRPC](https://trpc.io)** · **[Drizzle ORM](https://orm.drizzle.team)** · **[Radix UI](https://www.radix-ui.com)**

</div>
