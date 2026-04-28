<div align="center">

<br/>

# 🇨🇲 Portail des Services Gouvernementaux pour la Jeunesse

### The digital gateway connecting young Cameroonians to government programs, scholarships, trainings, and careers — across all 10 regions.
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square)](https://supabase.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11-398CCB?style=flat-square)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team/)

</div>

---

## 🎯 Why This Exists

Every year, thousands of government programs, scholarships, training sessions, and job opportunities go unfilled — not because there are no eligible youth, but because the information is scattered, inaccessible, or simply unknown.

**Portail Jeunesse Cameroun** solves this. One unified digital platform where young Cameroonians can discover, apply to, and track every government service aimed at them — from entrepreneurship grants to professional certifications to internship placements.

<br/>

| | | |
|:---:|:---:|:---:|
| ![Cameroonian students during computer lessons Kumba](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Students_in_school_uniform_during_computer_lessons%2C_Kumba%2C_Cameroon_%2811701993756%29.jpg/400px-Students_in_school_uniform_during_computer_lessons%2C_Kumba%2C_Cameroon_%2811701993756%29.jpg) | ![Students with laptops Bitame Lucia school Cameroon](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243116%29.jpg/400px-Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243116%29.jpg) | ![Laptops empowering youth Cameroon school](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243146%29.jpg/400px-Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243146%29.jpg) |
| *Digital education · Kumba, Cameroon* | *Youth empowerment · Cameroon* | *Skills training · Cameroon* |

<br/>

---

## 📊 Impact at a Glance

<div align="center">

| 26M+ | 10 | 4 | 100% |
|:---:|:---:|:---:|:---:|
| Cameroonians under 35 | Regions served | Content types | Open source |

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗂 **Programs catalog** | Government grants, scholarships, entrepreneurship programs — filtered by region, category, deadline, and funding amount |
| 🎓 **Training enrollment** | Online, offline, and hybrid trainings with certificate tracking and capacity management |
| 💼 **Opportunity board** | Jobs, internships, scholarships, and events — one-click apply with resume upload |
| 📊 **Personal dashboard** | Real-time application tracking across all content types with status indicators |
| 🛡 **Admin panel** | Publish content, validate applications, manage users, review full audit log |
| 🔔 **Notifications** | In-app and email notifications on every status change |
| 🔐 **Auth & roles** | Google OAuth with role-based access: `user` and `admin` |
| 🌍 **Region-aware** | All content filterable by any of Cameroon's 10 administrative regions |
| 🤖 **AI assistant** | Built-in chat to guide users through applications and eligibility |
| 🗺 **Map integration** | Interactive map showing regional distribution of opportunities |

---

## 🖥 Platform Preview

### Programs catalog

```
┌─────────────────────────────────────────────────────────────────────────┐
│  portailjeunesse.cm/programs                                            │
├─────────────────────────────────────────────────────────────────────────┤
│  [⊞] Portail Jeunesse   Programmes  Formations  Opportunités  [Mon ▾]  │
├─────────────────────────────────────────────────────────────────────────┤
│  Programmes gouvernementaux                         127 actifs          │
│                                                                         │
│  [Tous ●]  [Bourses]  [Entrepreneuriat]  [Recherche]  [Centre ▾]       │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│  🎓 BOURSE           │  💼 ENTREPRENEURIAT  │  🔬 RECHERCHE            │
│                      │                      │                          │
│  Bourse d'excellence │  Fonds d'appui aux   │  Programme de recherche  │
│  universitaire 2025  │  jeunes entrepren.   │  scientifique jeunesse   │
│                      │                      │                          │
│  MINESUP · Centre    │  MINPMEESA · Lit.    │  MINRESI · National      │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│  [Ouvert] [Postuler] │  [Ouvert] [Postuler] │  [Bientôt]   [Voir]      │
└──────────────────────┴──────────────────────┴──────────────────────────┘
```

### Personal dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  portailjeunesse.cm/dashboard                                           │
├────────────────┬────────────────────────────────────────────────────────┤
│  [KN]          │  Bonjour, Koffi 👋                                     │
│  Koffi Nguema  │  Voici le résumé de vos activités récentes             │
│  Yaoundé       │                                                        │
│                │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  ● Dashboard   │  │    3     │  │    1     │  │    2     │            │
│    Candidat.   │  │  Total   │  │Approuvée │  │En attente│            │
│    Programmes  │  └──────────┘  └──────────┘  └──────────┘            │
│    Formations  │                                                        │
│    Opportun.   │  Bourse d'excellence universitaire 2025   [Approuvée] │
│    Profil      │  Fonds d'appui jeunes entrepreneurs       [En attente]│
│                │  Formation React & Node.js avancé          [Inscrit]  │
└────────────────┴────────────────────────────────────────────────────────┘
```

<br/>

| | |
|:---:|:---:|
| ![Students on computers Cameroon Kumba digital learning](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Students_in_school_uniform_during_computer_lessons%2C_Kumba%2C_Cameroon_%2811701993756%29.jpg/560px-Students_in_school_uniform_during_computer_lessons%2C_Kumba%2C_Cameroon_%2811701993756%29.jpg) | ![Youth with laptops Cameroon empowerment digital skills](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243116%29.jpg/560px-Laptops_Empower_Students_at_Bitame_Lucia_International_School%2C_Cameroon_%2849743243116%29.jpg) |
| *Built for students and young professionals across Cameroon* | *Accessible on any device, in any region* |

---

## 🧱 Full Tech Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│  FRONTEND                                                           │
│  React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · Radix UI  │
│  tRPC Client · Wouter · React Hook Form · Zod                      │
├─────────────────────────────────────────────────────────────────────┤
│  BACKEND                                                            │
│  Node.js 20 · Express 4 · tRPC 11 · Zod · Session Cookies         │
├─────────────────────────────────────────────────────────────────────┤
│  DATABASE & STORAGE                                                 │
│  PostgreSQL (Supabase) · Drizzle ORM · Supabase Storage            │
├─────────────────────────────────────────────────────────────────────┤
│  TOOLING                                                            │
│  Vite 6 · pnpm 9 · Vitest · Prettier · ESBuild · tsx               │
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
| ORM | `drizzle-orm` | 0.44.x | TypeScript-first ORM, predictable raw SQL output |
| DB Client | `supabase-js` | 2.x | Auth, storage, and realtime |
| Validation | `zod` | 3.x | Runtime schema validation shared across client and server |
| Forms | `react-hook-form` | 7.x | Performant uncontrolled form state |
| Router | `wouter` | 3.x | Lightweight 2KB client-side routing |
| Server | `express` | 4.x | HTTP server wrapping the tRPC router |
| Build | `vite` | 6.x | Fast frontend bundler with HMR dev server |
| Runtime | `tsx` + `esbuild` | Latest | TypeScript execution and production bundling |
| Testing | `vitest` | Latest | Unit and integration test runner |
| Package mgr | `pnpm` | 9.x | Fast, disk-efficient dependency management |

### Why tRPC instead of REST or GraphQL?

tRPC generates the full TypeScript contract from your server router and makes it available in the client — no code generation step, no OpenAPI spec, no manual type duplication. Rename a field server-side and TypeScript immediately flags every affected client call.

### Why Drizzle ORM?

Drizzle produces raw, predictable SQL. Schema changes go through versioned migration files in `drizzle/` committed to the repo. `schema.ts` is the single source of truth; TypeScript infers all types at compile time via `$inferSelect` and `$inferInsert`.

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Browser / Mobile                               │
│                                                                         │
│   Pages (Home, Programs, Trainings, Opportunities, Dashboard, Admin)    │
│   Components (MainLayout, AIChatBox, Map, 40+ shadcn/ui)               │
│   Hooks (useAuth, useQuery, useMutation, useMobile, ThemeContext)        │
│                                                                         │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
              tRPC over HTTP · POST /trpc/{router}.{procedure}
              Session cookie auto-attached · Fully type-safe
                               │
┌──────────────────────────────▼──────────────────────────────────────────┐
│                      Express + tRPC Server                              │
│                                                                         │
│  1. Cookie parser    → reads HttpOnly session cookie → decodes openId  │
│  2. Context builder  → getUserByOpenId() → attaches user to ctx        │
│  3. Zod input parser → validates all procedure inputs at runtime       │
│  4. Role guard       → protectedProcedure throws if no user            │
│                                                                         │
│  appRouter: auth · programs · trainings · opportunities                │
│             notifications · admin · system                             │
│                                                                         │
└──────────────┬──────────────────────┬─────────────────┬─────────────────┘
               │                      │                 │
   ┌───────────▼──────────┐  ┌────────▼───────┐  ┌─────▼────────────┐
   │    Drizzle ORM       │  │ Supabase Auth  │  │ Supabase Storage │
   │    + PostgreSQL      │  │ OAuth · Google │  │ avatars (public) │
   │    9 tables          │  │ JWT · Sessions │  │ docs + resumes   │
   └──────────────────────┘  └────────────────┘  └──────────────────┘
```

---

## 🗄 Database Schema (9 tables)

```
                        ┌───────────────────────────────────────┐
                        │               users                   │
                        │  id · openId (OAuth uid) · name       │
                        │  email · phone · dateOfBirth          │
                        │  region · city · profileImage         │
                        │  role: user | admin · lastSignedIn    │
                        └──────────┬──────────┬─────────────────┘
                                   │          │
               ┌───────────────────┼──────────┴──────────────────┐
               │                   │                             │
               ▼                   ▼                             ▼
   program_applications   training_enrollments      opportunity_applications
   userId* · programId*   userId* · trainingId*     userId* · opportunityId*
   status:                status:                   status:
    pending|approved       enrolled|completed        applied|shortlisted
    rejected|withdrawn     cancelled                 accepted|rejected
   attachments (JSON)     certificateUrl            resumeUrl · coverLetter
               │                   │                             │
               ▼                   ▼                             ▼
           programs             trainings                  opportunities
   category · funding       domain · level              type: job|internship
   region · deadline        format: online               scholarship|event
   requirements* (JSON)     offline|hybrid               organization · salary
   isActive · createdBy*    price · certificate          isActive · createdBy*

   notifications  → userId* · type · title · isRead · emailSent
   audit_logs     → adminId* · action · entityType · changes (JSON)

   * JSON column   † denormalized counter
```

**Key design decisions:**
- `openId` anchors identity — `upsertUser()` uses `INSERT ON DUPLICATE KEY UPDATE` so returning OAuth users never get a duplicate row
- JSON columns (`requirements`, `benefits`, `attachments`) let each program define its own structure without schema migrations
- `currentParticipants` on `trainings` is a denormalized counter — avoids expensive `COUNT(*)` on hot listing endpoints
- `createdBy*` on all content tables + `audit_logs` = complete provenance trail for every piece of content

---

## 🔁 Request Lifecycle

```
Browser
  trpc.programs.apply.mutate({ programId, notes, attachments })
  │
  │  POST /trpc/programs.apply
  │  HttpOnly session cookie auto-attached
  │
  ▼
Express server
  ├─ 1. Cookie parser   → SESSION_SECRET-signed cookie → decodes openId
  ├─ 2. Context builder → getUserByOpenId() → attaches user (or null)
  ├─ 3. protectedProcedure → throws UNAUTHORIZED if ctx.user is null
  ├─ 4. Zod validates input (programId: number, notes?: string…)
  ├─ 5. Drizzle: verify program isActive + maxApplicants not exceeded
  ├─ 6. Drizzle: INSERT INTO program_applications
  ├─ 7. notification.ts: INSERT INTO notifications + optional SMTP
  └─ Returns { success: true, applicationId: number }
       │
       ▼
  React Query cache invalidated → dashboard re-fetches
  Sonner toast: "Application submitted successfully"
```

---

## 🔐 Authentication Flow

```
User clicks "Login with Google"
  → Supabase Auth OAuth redirect → Google consent screen
  → Callback: server/_core/oauth.ts
      openId + email + name extracted from provider payload
  → upsertUser(): INSERT ON DUPLICATE KEY UPDATE lastSignedIn
      if openId === ENV.ownerOpenId → role = 'admin'
  → HttpOnly cookie set (SameSite=Strict · signed with SESSION_SECRET)
  → useAuth(): trpc.auth.me.useQuery() → { user, isAuthenticated }
  → App router: /dashboard and /admin protected by isAuthenticated
```

---

## 📁 Project Structure

```
PortailJeunesse/
├── client/src/
│   ├── _core/hooks/useAuth.ts          # tRPC-powered auth hook
│   ├── components/
│   │   ├── ui/                         # 40+ shadcn/ui + Radix components
│   │   ├── MainLayout.tsx              # App shell + navigation
│   │   ├── AIChatBox.tsx               # AI assistant component
│   │   └── Map.tsx                     # Interactive region map
│   ├── lib/
│   │   ├── supabase.ts                 # ← FROM files.zip: Supabase client singleton
│   │   └── trpc.ts                     # tRPC React Query client
│   └── pages/
│       ├── Programs.tsx                # ← FROM files.zip
│       ├── Trainings.tsx               # ← FROM files.zip
│       └── Opportunities.tsx           # ← FROM files.zip
│
├── server/
│   ├── _core/
│   │   ├── trpc.ts                     # publicProcedure / protectedProcedure
│   │   ├── context.ts                  # Per-request context builder
│   │   ├── notification.ts             # In-app + email dispatch
│   │   └── oauth.ts                    # OAuth callback handler
│   ├── db.ts                           # Drizzle lazy client + upsertUser()
│   └── routers.ts                      # All tRPC business logic
│
├── drizzle/
│   ├── schema.ts                       # 9 tables — single source of truth
│   ├── 0000_*.sql / 0001_*.sql         # Versioned migrations
│   └── meta/                           # Drizzle snapshot metadata
│
└── shared/
    ├── const.ts                        # Cookie name, shared constants
    └── types.ts                        # Shared TypeScript interfaces
```

---

## 📦 Files from `files.zip` — Exact Destinations

| File | Destination | Action |
|---|---|---|
| `Programs.tsx` | `client/src/pages/Programs.tsx` | Replace existing stub |
| `Trainings.tsx` | `client/src/pages/Trainings.tsx` | Replace existing stub |
| `Opportunities.tsx` | `client/src/pages/Opportunities.tsx` | Replace existing stub |
| `MainLayout.tsx` | `client/src/components/MainLayout.tsx` | Replace existing file |
| `supabase.ts` | `client/src/lib/supabase.ts` | **New file** — create `lib/` if missing |
| `.env.example` | `.env.example` (project root) | Replace existing template |

> The three pages import from `../lib/supabase`. Place `supabase.ts` first or the project will not compile.

---

## ⚡ Quick Start

**Prerequisites:** Node.js ≥ 20 · pnpm ≥ 9 (`npm i -g pnpm`) · A [Supabase](https://supabase.com) project

```bash
git clone https://github.com/YOUR_USERNAME/PortailJeunesse.git
cd PortailJeunesse
pnpm install
cp .env.example .env       # fill in your Supabase credentials
pnpm db:push               # creates all 9 tables in your Supabase DB
pnpm dev                   # → http://localhost:3000
```

---

## 🗄 Supabase Setup

**Keys** — Project Settings → API:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...       # safe for browser
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...    # server only — never expose to browser
```

**Database URL** — Project Settings → Database → Connection string:

```env
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

> Port **5432** for Drizzle (direct connection). Port 6543 for serverless/edge only.

**Storage buckets:**

| Bucket | Visibility | Purpose |
|---|---|---|
| `avatars` | Public | User profile pictures |
| `documents` | Private | Application attachments |
| `resumes` | Private | CVs on opportunity applications |

**Promote first admin:**

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'your@email.com';
```

**Google OAuth:** Authentication → Providers → Google → add Client ID + Secret.
Authorised redirect URI: `https://xxxxxxxxxxxx.supabase.co/auth/v1/callback`

---

## 🚀 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Production build — Vite (client) + ESBuild (server) |
| `pnpm start` | Run production server |
| `pnpm check` | TypeScript type check (no emit) |
| `pnpm format` | Prettier formatting |
| `pnpm test` | Vitest test suite |
| `pnpm db:push` | Generate + apply Drizzle migrations |

---

## 🌍 Push to GitHub

```bash
cd PortailJeunesse
git init
git remote add origin https://github.com/YOUR_USERNAME/PortailJeunesse.git
# Copy the 6 files from files.zip to their correct paths (see table above)
git add .
git commit -m "feat: initial project with Supabase integration"
git push -u origin main
```

> `.env` is already in `.gitignore`. Never commit credentials — only `.env.example`.

---

## 🛣 Roadmap

- [x] Full database schema — 9 tables with typed Drizzle migrations
- [x] Programs, Trainings, Opportunities pages (Supabase-powered)
- [x] OAuth authentication with role-based route guards
- [x] AI assistant + interactive region map
- [ ] User dashboard — visual application status tracking
- [ ] Admin panel — full CRUD + application validation workflow
- [ ] Email notifications — SendGrid / Resend
- [ ] Certificate generation — PDF → Supabase Storage
- [ ] Mobile PWA + offline support
- [ ] French / English language toggle
- [ ] WCAG 2.1 AA accessibility audit

---

## 🤝 Contributing

1. Fork → `git checkout -b feat/your-feature`
2. `git commit -m "feat: describe your change"`
3. `git push origin feat/your-feature` → open a Pull Request

Run `pnpm check && pnpm test && pnpm format` before submitting.

---


---

<div align="center">

Built with ❤️ for the youth of Cameroon 🇨🇲

**[Supabase](https://supabase.com)** · **[shadcn/ui](https://ui.shadcn.com)** · **[tRPC](https://trpc.io)** · **[Drizzle ORM](https://orm.drizzle.team)** · **[Radix UI](https://www.radix-ui.com)**

<br/>

*Photos: [CDC/Rotary](https://commons.wikimedia.org/wiki/File:Students_in_school_uniform_during_computer_lessons,_Kumba,_Cameroon_(11701993756).jpg) and [One Laptop per Child](https://commons.wikimedia.org/wiki/File:Laptops_Empower_Students_at_Bitame_Lucia_International_School,_Cameroon_(49743243116).jpg) via Wikimedia Commons (CC BY 2.0)*

</div>
