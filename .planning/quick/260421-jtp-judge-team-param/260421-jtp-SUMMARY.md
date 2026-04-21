---
quick_id: 260421-jtp
status: complete
date: 2026-04-21
commit: 316962c
---

# Quick Task 260421-jtp: Judge Team Param

## What was done

Updated `backend_functions/judge/index.ts` to accept an optional `team_name` parameter in the POST request body.

**Changes:**
- Added `team_name?: string` to `JudgeRequest` interface
- Updated `runSheetEval` signature with optional `teamNameFilter?: string` parameter
- Row filter now applies case-insensitive match against column K when `teamNameFilter` is provided; omitting it evaluates all teams as before
- Job creation message reflects targeted team when `team_name` is supplied
- `EdgeRuntime.waitUntil` call passes `body.team_name` through

## Usage

```json
// Evaluate all teams (existing behavior)
{ "sheet_url": "https://..." }

// Evaluate a specific team only
{ "sheet_url": "https://...", "team_name": "Team Alpha" }
```
