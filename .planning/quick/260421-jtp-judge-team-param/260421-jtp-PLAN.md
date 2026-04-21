---
quick_id: 260421-jtp
slug: judge-team-param
description: Update judge function to accept optional team_name param for filtering
date: 2026-04-21
must_haves:
  truths:
    - JudgeRequest interface has optional team_name field
    - runSheetEval filters rows by team_name when provided
    - All teams evaluated when team_name is omitted
  artifacts:
    - backend_functions/judge/index.ts
---

# Quick Task 260421-jtp: Judge Team Param

## Goal

Update `backend_functions/judge/index.ts` so a judge can run evaluation for a specific team by passing `team_name` in the request body.

## Task 1 — Add team_name param to JudgeRequest and propagate

**File:** `backend_functions/judge/index.ts`

**Action:**
1. Add `team_name?: string` to `JudgeRequest` interface
2. Update `runSheetEval` signature to accept optional `teamNameFilter?: string`
3. After building `validRows` (line ~124), add filter: if `teamNameFilter` is provided, keep only rows where `row[10].trim()` matches `teamNameFilter` (case-insensitive)
4. Update `EdgeRuntime.waitUntil` call to pass `body.team_name`
5. Update job creation message to include team name filter info when provided

**Verify:** TypeScript types are consistent; no existing behavior changed when `team_name` is omitted

**Done:** Single atomic commit `feat(judge): accept optional team_name param for targeted evaluation`
