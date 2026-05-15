# Claim: quick-kayinleong-009
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-15
- status: in-progress
- summary: Fix reset-db endpoint error caused by truncating non-existent evaluation_jobs table

## What will change
- `backend/server.py` `/reset-db` endpoint: replace `TRUNCATE TABLE evaluations, evaluation_jobs CASCADE` with the correct 5-table truncate that matches the actual schema

## What has changed
<!-- filled after work completes -->

## Verification
<!-- filled after verification -->
