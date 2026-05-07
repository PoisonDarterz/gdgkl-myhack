# Claim: quick-kayinleong-001
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-07
- status: in-progress
- summary: Replace Supabase Edge Function calls in frontend with direct backend (FastAPI) calls

## What will change
- `app/dashboard/judge/page.tsx`: replace `supabase.functions.invoke('judge'|'reset-db'|'download-csv')` and Supabase DB polling with `fetch` calls to the Python FastAPI backend
- `app/dashboard/results/page.tsx`: replace `supabase.functions.invoke('results')` with `fetch` to backend `/results`
- `backend/server.py`: add `POST /reset-db` endpoint (missing from backend, exists only in Supabase Edge Function)

## What has changed
(to be filled)

## Verification
(to be filled)
