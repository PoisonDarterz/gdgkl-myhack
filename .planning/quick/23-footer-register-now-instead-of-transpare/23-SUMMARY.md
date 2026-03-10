---
phase: quick-23
plan: 23
subsystem: footer
tags: [footer, typography, depth-effect, outline-text]
dependency_graph:
  requires: []
  provides: [footer-outline-register-now]
  affects: [FooterSection]
tech_stack:
  added: []
  patterns: [WebkitTextStroke + color transparent for hollow text]
key_files:
  created: []
  modified:
    - src/components/sections/FooterSection.tsx
decisions:
  - All three REGISTER NOW depth-effect copies use color transparent so only the white stroke outline is visible with no solid white fill inside letters
metrics:
  duration: 2 min
  completed: 2026-03-10
---

# Phase quick-23 Plan 23: Footer REGISTER NOW Outline-Only Summary

**One-liner:** Added `color: transparent` to copies 2 and 3 of the REGISTER NOW depth-effect stack so all three show hollow outlined letters with white stroke only.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Make all REGISTER NOW copies outline-only | 7f83689 | src/components/sections/FooterSection.tsx |

## What Was Built

The footer REGISTER NOW depth effect uses three stacked `<p>` tags with decreasing opacity (100/40/20) and negative `marginTop` to create a depth shadow illusion. Copy 1 already had `color: "transparent"` making it outline-only. Copies 2 and 3 were missing `color: "transparent"`, causing their letter interiors to render solid white.

Added `color: "transparent"` to both copy 2 and copy 3 style objects. All three copies now render as hollow outlined letters — white stroke border only, with the dark footer background visible through the letter interiors. The depth layering effect (opacity stack + negative marginTop offsets) is fully preserved.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

- [x] `src/components/sections/FooterSection.tsx` — modified, all 3 copies have `color: "transparent"` + `WebkitTextStroke: "3px white"`
- [x] Commit 7f83689 exists
- [x] `npm run build` completed with no errors

## Self-Check: PASSED
