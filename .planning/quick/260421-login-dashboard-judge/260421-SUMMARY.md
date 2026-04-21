---
quick_id: 260421-ldj
slug: login-dashboard-judge
phase: quick
plan: 260421-ldj
subsystem: frontend-auth-dashboard
tags: [nextjs, supabase-auth, middleware, dashboard, judge, csv-parser]
dependency_graph:
  requires: [supabase-edge-function-judge]
  provides: [login-page, middleware-auth, dashboard-layout, judge-page]
  affects: [app/login, app/dashboard, middleware.ts, src/lib/supabase]
tech_stack:
  added: ["@supabase/ssr@latest"]
  patterns: [supabase-ssr-cookie-auth, nextjs-middleware-protection, client-side-csv-parse, supabase-edge-function-invoke, polling-evaluation-jobs]
key_files:
  created:
    - src/lib/supabase/client.ts
    - src/lib/supabase/server.ts
    - middleware.ts
    - app/login/page.tsx
    - app/dashboard/layout.tsx
    - app/dashboard/page.tsx
    - app/dashboard/judge/page.tsx
  modified:
    - package.json
    - package-lock.json
decisions:
  - "Used evaluation_jobs polling (by job_id) to detect when async edge function completes, not just a fixed sleep"
  - "Used ba_findings and ai_se_findings tables (not ceo_findings/cto_findings from older admin page)"
  - "Inline CSV parser handles quoted fields and multiline cells without external library"
  - "Individual team Run button disabled during runAll to prevent concurrent invocations"
metrics:
  duration: "~20 minutes"
  completed_date: "2026-04-21"
  tasks_completed: 3
  files_created: 7
  files_modified: 2
---

# Quick Plan 260421-ldj: Login + Dashboard + Run Judge Page Summary

Supabase SSR auth with Next.js middleware protection, login page, dashboard layout, and a full judge page with Google Sheet CSV visualizer, per-team edge function invocation, and evaluation detail modal.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Install @supabase/ssr + create browser/server client helpers | 958b92e |
| 2 | Middleware route protection + login page | 0091ad7 |
| 3 | Dashboard layout, home redirect, judge page | d2c1c83 |

## Key Implementation Details

### Task 1 - Supabase SSR helpers
- `src/lib/supabase/client.ts`: `createBrowserClient` wrapper for use in client components
- `src/lib/supabase/server.ts`: `createServerClient` wrapper reading from Next.js `cookies()` for server components and server actions

### Task 2 - Middleware + Login
- `middleware.ts` at project root: uses `createServerClient` with `request.cookies`, protects `/dashboard/:path*`, redirects unauthenticated users to `/login`
- `app/login/page.tsx`: email/password form using `supabase.auth.signInWithPassword`, redirects to `/dashboard/judge` on success, shows inline error on failure. Styled: bg-[#F5F5F5], white card, font-mono, black button.

### Task 3 - Dashboard + Judge Page
- `app/dashboard/layout.tsx`: server component reading session, renders nav with "AI Judge Dashboard" title, user email, and Sign Out form action
- `app/dashboard/page.tsx`: immediate redirect to `/dashboard/judge`
- `app/dashboard/judge/page.tsx`:
  - Sheet input section: validates URL, extracts sheet ID, fetches CSV via `spreadsheets/d/{id}/export?format=csv`
  - Inline CSV parser handles quoted fields and CRLF/LF line endings
  - Table extracts: row# (1-based), team name (col 10), GitHub (col 6), docs (col 8), status badge, score, actions
  - Run All: iterates pending/error rows sequentially, invokes `judge` edge function with `{ sheet_url, team_name }`, polls `evaluation_jobs` by `job_id` until `running: false`
  - Per-team Run button in each row
  - After job completes, fetches full result from `evaluations` with joined `ba_findings`, `ai_se_findings`, `category_scores`, `qualitative_insights`
  - View Details modal: final score, head judge verdict, executive summary, BA findings (verdict, consensus summary, strengths, risks), AI SE findings (verdict, consensus summary, strengths, vulnerabilities), category scores table

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript error - impossible status comparison**
- **Found during:** Task 3, TypeScript check
- **Issue:** Inside a conditional `row.status === 'pending' || row.status === 'error'`, the `disabled` prop checked `row.status === 'running'` which TypeScript correctly identified as impossible
- **Fix:** Removed redundant `row.status === 'running'` check from `disabled` prop, kept only `runningAll`
- **Files modified:** app/dashboard/judge/page.tsx (line 677)
- **Commit:** d2c1c83

### Implementation Notes
- Edge function returns `{ status: 'started', job_id, message }` — the evaluation runs asynchronously. Frontend polls `evaluation_jobs` by `job_id` (2s intervals, max 4 min) rather than a fixed sleep, providing accurate completion detection.
- Pre-existing TypeScript errors in `backend_functions/` (Deno-specific code) are out of scope and were not modified.

## Known Stubs

None — all interactive features are wired to live Supabase data.

## Self-Check

### Files Exist
- src/lib/supabase/client.ts: FOUND
- src/lib/supabase/server.ts: FOUND
- middleware.ts: FOUND
- app/login/page.tsx: FOUND
- app/dashboard/layout.tsx: FOUND
- app/dashboard/page.tsx: FOUND
- app/dashboard/judge/page.tsx: FOUND

### Commits Exist
- 958b92e: FOUND (feat(auth): add Supabase SSR client helpers)
- 0091ad7: FOUND (feat(auth): add middleware protection and login page)
- d2c1c83: FOUND (feat(dashboard): add judge page with sheet visualizer and per-team evaluation)

## Self-Check: PASSED
