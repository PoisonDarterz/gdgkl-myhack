---
status: complete
quick_id: "260421"
slug: dsh-judge-retry
date: 2026-04-21
---

# Summary: Dashboard judge retry button

## What changed

Split the single "Run" button (shown for both `pending` and `error` rows) into two distinct buttons in `app/dashboard/judge/page.tsx`:

- **Pending rows:** black "Run" button (unchanged)
- **Error rows:** red-600 "Retry" button — visually communicates the row previously failed

Both buttons call `runTeam(row.teamName)` and are disabled while `runningAll` is active.

## Files changed

- `app/dashboard/judge/page.tsx` — Actions column, lines ~753–768
