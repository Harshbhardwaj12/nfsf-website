# Architecture

This document maps the codebase by **layer** — frontend, API, database, auth,
and hosting — so you can see what each file is responsible for and how a request
flows through the system.

---

## Layer Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  BROWSER (client)                                                 │
│  app/(site)/*, app/donate, app/thank-you, components/*           │
│  - Renders UI, collects input, generates the PDF certificate      │
│  - NEVER talks to Supabase directly                               │
└───────────────┬───────────────────────────────────────────────────┘
                │  fetch() JSON
                ▼
┌─────────────────────────────────────────────────────────────────┐
│  API ROUTES (server)   app/api/**                                 │
│  - Validate input, rate-limit, generate cert IDs                  │
│  - Hold the ONLY reference to the service-role key                │
└───────────────┬───────────────────────────────────────────────────┘
                │  service-role client (lib/db/supabaseAdmin.ts)
                ▼
┌─────────────────────────────────────────────────────────────────┐
│  DATABASE   Supabase / PostgreSQL — `donations` table            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Frontend Layer

### Route pages (`app/`)

| Route                    | File                              | Type    | Purpose                                             |
| ------------------------ | --------------------------------- | ------- | --------------------------------------------------- |
| `/`                      | `app/(site)/page.tsx`             | Server  | Home — Hero, TrustBar, ProcessSteps, Campaigns      |
| `/about`                 | `app/(site)/about/page.tsx`       | Server  | Mission + MissionStats                              |
| `/how-it-works`          | `app/(site)/how-it-works/page.tsx`| Server  | 3-step process, FarmGallery, TreeSpecies            |
| `/impact`                | `app/(site)/impact/page.tsx`      | Server  | WhyItMatters, SocialProof                           |
| `/faq`                   | `app/(site)/faq/page.tsx`         | Server  | FAQ accordion                                       |
| `/why-nfsf`              | `app/(site)/why-nfsf/page.tsx`    | Server  | WhyNFSF, TrustSection                               |
| `/donate`                | `app/donate/page.tsx`             | Client  | 2-step donation form → POST `/api/donate`           |
| `/thank-you`             | `app/thank-you/page.tsx`          | Client  | Summary + certificate download (Suspense)           |
| `/verify`                | `app/verify/page.tsx`             | Client  | Certificate-ID lookup form                          |
| `/verify/[id]`           | `app/verify/[id]/page.tsx`        | Server  | Public verification (force-dynamic)                 |
| `/admin/login`           | `app/admin/login/page.tsx`        | Client  | Admin login → POST `/api/admin/login`               |
| `/admin/dashboard`       | `app/admin/dashboard/page.tsx`    | Client  | Donations table (cookie-gated by middleware)        |

The `(site)` route group shares one layout (`app/(site)/layout.tsx`) that wraps
marketing pages with `Navbar`, `Footer`, `MobileDonateBar`, and `FloatingDonate`.
`/donate`, `/thank-you`, `/verify`, and `/admin` sit outside the group so they
render without the marketing chrome.

### Components (`components/`)

- `components/landing/*` — presentational marketing sections (Hero, Campaigns,
  ProcessSteps, FarmGallery, TreeSpecies, FAQ, WhyNFSF, etc.). No data fetching.
- `components/CertificatePreview.tsx` — live HTML/CSS preview of the certificate
  shown on the thank-you page before the user downloads the PDF.

### Design system

- **Fonts:** Playfair Display (headings) + Inter (body).
- **Palette:** `forest` (primary, `#15803D`), `earth` (amber CTA, `#B45309`),
  `mist` (backgrounds). Defined in `tailwind.config.ts` and `app/globals.css`.
- **Signature visual:** multi-layer SVG forest-horizon silhouette in the hero.

---

## 2. API Layer (`app/api/**`)

All handlers are `dynamic = "force-dynamic"` and run on the server. They are the
**only** code with access to the service-role key.

| Endpoint                 | Method | File                              | Responsibility                                          |
| ------------------------ | ------ | --------------------------------- | ------------------------------------------------------- |
| `/api/donate`            | POST   | `app/api/donate/route.ts`         | Validate donation, honeypot, rate-limit, server-generate cert ID, insert |
| `/api/donation/[id]`     | GET    | `app/api/donation/[id]/route.ts`  | Return a donor's own record for the thank-you page      |
| `/api/admin/login`       | POST   | `app/api/admin/login/route.ts`    | Constant-time credential check → set signed cookie      |
| `/api/admin/logout`      | POST   | `app/api/admin/logout/route.ts`   | Clear the session cookie                                |
| `/api/admin/donations`   | GET    | `app/api/admin/donations/route.ts`| List all donations (session-verified)                   |

**Public verification** (`/verify/[id]`) is a server component rather than an API
route: it queries Supabase directly (via the service-role client) and returns only
public columns (no email).

### Donation request flow

```
donate form ──POST /api/donate──► validate + rate-limit + honeypot
                                   │
                                   ├─ mock mode: return in-memory donation
                                   └─ real mode: INSERT into donations
                                   │
                          returns { certificate_id }
                                   │
        redirect ──► /thank-you?id=<certificate_id>
                                   │
        GET /api/donation/<id> ──► render summary
                                   │
        "Download" ──► lib/cert/certificate.ts builds the PDF client-side
```

---

## 3. Business Logic (`lib/`)

Grouped by concern so responsibilities are obvious at a glance:

| Folder          | File                    | Responsibility                                              |
| --------------- | ----------------------- | ---------------------------------------------------------- |
| `lib/db/`       | `supabase.ts`           | Shared `Donation` type (no client — browser never queries) |
|                 | `supabaseAdmin.ts`      | Lazy server-only service-role client + `isSupabaseConfigured()` |
| `lib/auth/`     | `adminSession.ts`       | Create/verify HMAC-SHA256 session tokens (Edge + Node)     |
| `lib/cert/`     | `certificate.ts`        | jsPDF certificate generation (landscape A4)                |
|                 | `certificateFont.ts`    | Base64 Noto Sans subset (renders the ₹ glyph)              |
|                 | `certDesigns.ts`        | Certificate theme registry (classic / photo / ivory)       |
| `lib/donation/` | `validation.ts`         | Server-side input validation + `PRICE_PER_TREE`            |
|                 | `gift.ts`               | Gift metadata (sessionStorage only, never persisted)       |
| `lib/utils/`    | `rateLimit.ts`          | Best-effort in-memory fixed-window rate limiter            |

---

## 4. Database Layer (Supabase / PostgreSQL)

**Table: `donations`**

| Column           | Type        | Default              |
| ---------------- | ----------- | -------------------- |
| `id`             | uuid        | `gen_random_uuid()`  |
| `donor_name`     | text        | —                    |
| `email`          | text        | —                    |
| `trees`          | int4        | —                    |
| `amount`         | int4        | —                    |
| `certificate_id` | text        | —                    |
| `created_at`     | timestamptz | `now()`              |

- **Certificate ID format:** `NFSF-YYYYMMDD-XXXX` (server-generated, cryptographic
  random hex). Acts as an unguessable capability token for the thank-you page.
- **Row-Level Security:** enabling RLS with no anon policies denies the browser
  entirely; the service-role key bypasses RLS for server routes. **Enable RLS only
  after the server-side code is deployed** (see AUDIT.md → Pending actions).

---

## 5. Auth Layer

- **Admin login** (`/api/admin/login`): username/password from env vars compared in
  **constant time** (`crypto.timingSafeEqual`). On success, sets an **httpOnly,
  SameSite=Strict, Secure** cookie (`nfsf_admin`) containing an HMAC-SHA256-signed
  token with an 8-hour TTL.
- **Gate:** `middleware.ts` verifies the cookie for `/admin/dashboard/*` and
  redirects to `/admin/login` when missing/invalid. Each `/api/admin/*` route
  re-verifies independently (defense-in-depth).
- Tokens are stateless and signed with `ADMIN_SESSION_SECRET`; verification runs in
  both the Edge (middleware) and Node (route handler) runtimes via Web Crypto.

---

## Security

- Browser has **zero** direct database access.
- Public POST routes are **rate-limited** and protected by a **honeypot** field.
- **Security headers** (`next.config.js`): Content-Security-Policy, HSTS,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy`. `'unsafe-eval'` is added to the CSP **only** in development
  (required by `next dev`); production stays strict.

---

## Hosting & Deployment

- **Platform:** Vercel. Framework auto-detected — no `vercel.json` needed.
- **Trigger:** push to `master` → automatic production build + deploy.
- **Build:** `npm run build`.
- **Env vars:** the five variables in `.env.example` must be configured in the
  Vercel dashboard for production.
- **Rate limiting caveat:** the in-memory limiter is per-serverless-instance and
  resets on cold start. For hard guarantees, back it with Upstash Redis / Vercel KV.
