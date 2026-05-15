# Claim: quick-kayinleong-009
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-15
- status: done
- summary: Fix reset-db endpoint error caused by truncating non-existent evaluation_jobs table

## What will change
- `backend/server.py` `/reset-db` endpoint: replace `TRUNCATE TABLE evaluations, evaluation_jobs CASCADE` with the correct 5-table truncate that matches the actual schema

## What has changed
- `backend/server.py` line 142: replaced `TRUNCATE TABLE evaluations, evaluation_jobs CASCADE` with `TRUNCATE TABLE evaluations, ba_findings, ai_se_findings, category_scores, qualitative_insights CASCADE`
- Updated success message to list only the 5 real tables (removed `evaluation_jobs` which never existed in the schema)

## Verification
- Root cause confirmed: `supabase_setup.sql` defines exactly 5 tables — no `evaluation_jobs` table exists, so the old TRUNCATE statement raised `relation "evaluation_jobs" does not exist`
- New TRUNCATE references all 5 tables that actually exist; CASCADE handles any FK-linked rows
- All child tables (`ba_findings`, `ai_se_findings`, `category_scores`, `qualitative_insights`) have `ON DELETE CASCADE` on `evaluation_id`, so the explicit multi-table truncate is safe
- No other code paths reference `evaluation_jobs` anywhere in `backend/`
- Regression surface: `/setup-db`, `/judge`, `/results`, `/download-csv` endpoints are unaffected — none reference `evaluation_jobs` or the truncated tables directly
