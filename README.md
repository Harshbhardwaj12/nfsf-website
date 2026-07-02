# NFSF — Nature and Farmer Sustainability Foundation

Donation website for a Bangalore-based NGO. Donors contribute **₹300 per tree** toward
plantation drives in Andhra Pradesh and receive a verifiable, downloadable **PDF
certificate** with a unique ID.

**Live:** https://nfsf-website.vercel.app

---

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 14 (App Router) + React 18 + TypeScript 5      |
| Styling    | Tailwind CSS 3.4 (custom "forest" design tokens)       |
| Database   | Supabase (PostgreSQL) — accessed **server-side only**  |
| PDF        | jsPDF + embedded Noto Sans font (for the ₹ glyph)      |
| Auth       | Signed HMAC session cookie (admin panel)               |
| Hosting    | Vercel (auto-deploy on push to `master`)               |

For how these fit together, see **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.
For a full code/health audit, see **[docs/AUDIT.md](docs/AUDIT.md)**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   Fill in the values (see "Environment Variables" below).
#   Leaving the Supabase keys blank runs the app in MOCK MODE — the full
#   donation flow works without a database (nothing is persisted).

# 3. Run the dev server
npm run dev          # http://localhost:3000
```

### Scripts

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Local dev server (hot reload)    |
| `npm run build` | Production build                 |
| `npm run start` | Serve a production build         |
| `npm run lint`  | Next.js ESLint                   |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                     | Scope        | Required | Notes                                             |
| ---------------------------- | ------------ | -------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`   | Public       | Prod     | Supabase project URL.                             |
| `SUPABASE_SERVICE_ROLE_KEY`  | Server-only  | Prod     | Bypasses RLS. **Never** expose to the browser.    |
| `ADMIN_USERNAME`             | Server-only  | Prod     | Admin login (defaults to `admin`).                |
| `ADMIN_PASSWORD`             | Server-only  | Prod     | Admin login password.                             |
| `ADMIN_SESSION_SECRET`       | Server-only  | Prod     | 32+ random chars — signs the admin session cookie.|

> **Mock mode:** if `SUPABASE_SERVICE_ROLE_KEY` is absent, the app skips all
> database access and the donation flow returns a generated certificate in-memory.
> Great for local development; **not** a production configuration.

---

## Project Structure

```
app/                     Routes (App Router) — see ARCHITECTURE.md
├── (site)/              Marketing pages (shared Navbar/Footer layout)
├── api/                 Server route handlers — the ONLY code that touches the DB
├── donate/             Donation form
├── thank-you/          Post-donation summary + certificate download
├── verify/[id]/        Public certificate verification
└── admin/              Login + dashboard (cookie-gated)

components/
├── landing/            Presentational marketing sections
└── CertificatePreview  Live HTML preview of the certificate

lib/                     Business logic, grouped by concern:
├── db/                 Supabase clients + Donation type
├── auth/               Admin session (HMAC cookie)
├── cert/               PDF generation, fonts, design themes
├── donation/           Input validation, gift metadata
└── utils/              Rate limiting

middleware.ts            Gates /admin/dashboard
next.config.js           Security headers (CSP, HSTS, etc.)
```

---

## Deployment

Hosted on **Vercel**. Any push to `master` triggers an automatic production deploy.

```bash
git push origin master
```

The five environment variables above must be set in the Vercel project settings
(Settings → Environment Variables) for production.

See [docs/ARCHITECTURE.md → Hosting & Deployment](docs/ARCHITECTURE.md#hosting--deployment)
for the Supabase table schema and the Row-Level-Security rollout note.

---

## Security Model (summary)

- The **browser never calls Supabase directly.** All DB access is server-side via
  the service-role key, behind API routes.
- Admin auth uses a **signed, httpOnly session cookie** (HMAC-SHA256), not
  client-side flags.
- Security headers (CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`) are set in
  `next.config.js`.
- Rate limiting + a honeypot field guard the public POST endpoints.

Full details in [docs/ARCHITECTURE.md → Security](docs/ARCHITECTURE.md#security).
