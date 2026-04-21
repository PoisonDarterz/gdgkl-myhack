---
quick_id: 260421-sfe
slug: backend-functions-supabase-edge
status: complete
date: 2026-04-21
---

# Summary: Convert Backend to Supabase Edge Functions

## What was built

Created `backend_functions/` at the project root with 11 TypeScript/Deno files converting all 5 FastAPI endpoints into Supabase Edge Functions, plus an `api.http` test file.

## Files created

### Shared utilities (`backend_functions/_shared/`)
- `supabaseClient.ts` — Supabase admin client using SERVICE_ROLE_KEY
- `prompts.ts` — BA and AI SE system prompts (direct port from Python)
- `gemini.ts` — Gemini REST API wrappers: Model1, Model2, Resonator for BA and AI SE; includes discrepancy retry logic and parallel execution
- `headJudge.ts` — Manual per-category weighted scoring calculation (pure TS port from Python)
- `utils.ts` — Google Doc/Sheet/GitHub/Slides fetch utilities + CSV parser + project content builder

### Edge Functions
- `status/index.ts` — GET /status → reads `evaluation_jobs` table (stateless-safe)
- `setup-db/index.ts` — POST /setup-db → runs full SQL setup including new `evaluation_jobs` table
- `judge/index.ts` — POST /judge → creates job record, uses `EdgeRuntime.waitUntil()` for background pipeline
- `results/index.ts` — GET /results → fetches evaluations with parallel joins
- `download-csv/index.ts` — GET /download-csv → streams flat CSV

### Test file
- `api.http` — VS Code REST Client / JetBrains HTTP Client compatible test file for all 5 endpoints

## Key architectural change

The Python backend uses in-memory `eval_status` dict for tracking. Edge Functions are stateless, so `/judge` now persists status to a new `evaluation_jobs` Supabase table. The `/status` endpoint reads this table instead.

## How to deploy

```bash
# From project root
supabase functions deploy status --no-verify-jwt
supabase functions deploy setup-db --no-verify-jwt
supabase functions deploy judge --no-verify-jwt
supabase functions deploy results --no-verify-jwt
supabase functions deploy download-csv --no-verify-jwt
```

Set these secrets in Supabase Dashboard → Edge Functions → Secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
