---
quick_id: 260421-sfe
slug: backend-functions-supabase-edge
description: Create backend_functions/ with Supabase Edge Function code converted from backend, plus api.http test file
date: 2026-04-21
---

# Quick Task 260421-sfe: Convert Backend to Supabase Edge Functions

## Goal

Create `backend_functions/` at the project root containing TypeScript/Deno Supabase Edge Functions that faithfully replicate all 5 FastAPI endpoints, plus `api.http` for testing.

## Structure

```
backend_functions/
├── _shared/
│   ├── supabaseClient.ts   # Supabase admin client
│   ├── gemini.ts           # Gemini REST API wrappers (BA/AI SE models)
│   ├── headJudge.ts        # HeadJudge manual score calculation (pure TS port)
│   ├── prompts.ts          # BA and AI SE system prompts
│   └── utils.ts            # Google Doc/Sheet/GitHub/Slides fetch utilities
├── status/index.ts         # GET /status → reads evaluation_jobs table
├── setup-db/index.ts       # POST /setup-db → runs supabase_setup.sql
├── judge/index.ts          # POST /judge → starts evaluation pipeline
├── results/index.ts        # GET /results → fetches evaluations with joins
├── download-csv/index.ts   # GET /download-csv → streams CSV
└── api.http                # REST Client test file (VS Code compatible)
```

## Key Design Decisions

- **Status persistence**: `evaluation_jobs` table replaces in-memory `eval_status` (Edge Functions are stateless)
- **Gemini calls**: Direct REST API via `fetch()` — no SDK, works natively in Deno
- **Background processing**: `EdgeRuntime.waitUntil()` for `/judge` pipeline
- **Supabase client**: `npm:@supabase/supabase-js@2` with SERVICE_ROLE_KEY for server-side writes
- **setup-db**: Runs the same SQL as `supabase_setup.sql` + adds `evaluation_jobs` table

## Tasks

### Task 1: Create _shared/ utilities
- files: backend_functions/_shared/supabaseClient.ts, backend_functions/_shared/gemini.ts, backend_functions/_shared/headJudge.ts, backend_functions/_shared/prompts.ts, backend_functions/_shared/utils.ts
- action: Create 5 shared TypeScript modules

### Task 2: Create 5 Edge Function endpoints
- files: backend_functions/status/index.ts, backend_functions/setup-db/index.ts, backend_functions/judge/index.ts, backend_functions/results/index.ts, backend_functions/download-csv/index.ts
- action: Create each endpoint as a Deno Edge Function

### Task 3: Create api.http test file
- files: backend_functions/api.http
- action: Create REST Client test file with requests for all 5 endpoints
