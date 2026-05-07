# Claim: quick-kayinleong-001
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-07
- status: done
- summary: Replace Supabase Edge Function calls in frontend with direct backend (FastAPI) calls

## What will change
- `app/dashboard/judge/page.tsx`: replace `supabase.functions.invoke('judge'|'reset-db'|'download-csv')` and Supabase DB polling with `fetch` calls to the Python FastAPI backend
- `app/dashboard/results/page.tsx`: replace `supabase.functions.invoke('results')` with `fetch` to backend `/results`
- `backend/server.py`: add `POST /reset-db` endpoint (missing from backend, exists only in Supabase Edge Function)

## What has changed
- `app/dashboard/judge/page.tsx`: removed Supabase client; all `supabase.functions.invoke` calls replaced with `fetch(BACKEND_URL/...)`. Polling now uses `GET /status` (backend in-memory tracker) instead of Supabase `evaluation_jobs` table. `runTeam`/`handleRunAll` consolidated into single `runJudge()` since backend runs all teams at once.
- `app/dashboard/results/page.tsx`: removed Supabase client; `supabase.functions.invoke('results')` replaced with `fetch(BACKEND_URL/results)`.
- `backend/server.py`: added `POST /reset-db` endpoint (was missing; only existed as Supabase Edge Function). Uses psycopg2 + SUPABASE_DB_URL to TRUNCATE evaluations + evaluation_jobs CASCADE.

## Verification
- `npx tsc --noEmit` returns zero errors in Next.js app files (only pre-existing Deno errors in `backend_functions/`).
- Regression surface: judge page, results page, reset-db, download-csv. All Supabase function invocations removed. TableViewer and login/auth flows unchanged (use direct Supabase DB client, not Edge Functions).
