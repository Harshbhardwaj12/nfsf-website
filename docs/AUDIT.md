# Project Audit

Snapshot of the codebase health, decisions, and outstanding items — captured while
organizing the repo for a clean git history. Date: 2026-07-02.

---

## Summary

The project is in good shape: all six feature phases plus a security-hardening pass
are complete, TypeScript compiles cleanly (`tsc --noEmit` passes), and the code was
already well-commented from prior phases. This audit round focused on **structure,
documentation, and dead-code removal** — no behavior was changed.

---

## Changes Made in This Pass

### Structure (safe grouping — framework layout preserved)
- Reorganized `lib/` from a flat folder into concern-based subfolders:
  `db/`, `auth/`, `cert/`, `donation/`, `utils/`. All `@/lib/...` imports updated;
  moves done via `git mv` to preserve history.
- Added top-level docs: `README.md`, `docs/ARCHITECTURE.md`, `docs/AUDIT.md`.
- Renamed `.env.local.example` → `.env.example` (conventional).

### Removals (dead code / cruft)
- **`components/landing/DonationCTA.tsx`** — deleted. Not imported anywhere; the
  home page moved to `TrustBar` / `ProcessSteps` / `Campaigns`, orphaning it.
- **`frontend-design/`** (`SKILL.md`, `LICENSE.txt`) — removed. A Claude Code skill
  folder accidentally committed into the app repo; not part of the website.

### Comments
- Normalized file-header and function-level comments across `lib/`, `app/`, and
  `components/` where gaps existed. No logic touched.

---

## Known Issues / Follow-ups

### ✅ Broken image reference — FIXED
- `lib/cert/certDesigns.ts` and `components/CertificatePreview.tsx` previously
  referenced `/images/forest-path.jpg` for the "photo" certificate theme, but that
  file did not exist. Repointed both to the existing (and previously unused)
  `/images/forest-mist.jpg`, which fixes the broken theme and puts an orphaned
  asset to use.

### 🟡 Unused image assets
These exist in `public/images/` but are not referenced by any component. Kept for
now (harmless, may be intended for future sections). Remove if confirmed unneeded:
`garden-bed.jpg`, `hero-banner.jpg`, `nursery-trays.jpg`, `seedling-pots.jpg`.

### 🟡 Rate limiting is per-instance
`lib/utils/rateLimit.ts` is in-memory and resets on serverless cold start. It is a
speed bump, not a hard guarantee. Back it with Upstash Redis / Vercel KV for
production-grade limits.

---

## Pending Operational Actions (from Phase 7 security hardening)

These are **deploy-time** actions, not code:

1. Set the five server env vars in Vercel + local `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME`,
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
2. Push to `master` to deploy the server-side code.
3. **Only after** the deploy succeeds, enable Row-Level Security on the table:
   ```sql
   alter table public.donations enable row level security;
   ```
   With no anon policies, this denies the browser; the service-role key still
   bypasses RLS for server routes. Enabling it **before** the new code is live would
   break the older anon-key path.

---

## Deferred (larger efforts, not blocking)

- Next.js 15/16 major upgrade (remaining advisories mostly N/A to this app).
- Shared-store rate limiting (Upstash / Vercel KV) for serverless correctness.
- Custom domain: the certificate prints a `nfsf.org.in/verify/<id>` verification URL
  — confirm the final domain before printing physical materials.

---

## Verification

- `npx tsc --noEmit` → passes (0 errors) after the reorg.
- `npm run build` → run before pushing to confirm production build integrity.
