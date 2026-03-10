---
phase: quick-25
plan: 25
subsystem: footer
tags: [z-index, positioning, depth-effect, tailwind]
dependency_graph:
  requires: []
  provides: [FooterSection REGISTER NOW z-index stacking]
  affects: [FooterSection.tsx]
tech_stack:
  added: []
  patterns: [position-relative z-index stacking]
key_files:
  created: []
  modified:
    - src/components/sections/FooterSection.tsx
decisions:
  - "position: relative added to all three REGISTER NOW <p> tags so z-index classes take effect — no other class or style changes made"
metrics:
  duration: 2 min
  completed: 2026-03-10
---

# Phase quick-25: Fix REGISTER NOW z-index Not Working Summary

**One-liner:** Added `relative` to all three REGISTER NOW `<p>` tags so `z-[3]!`, `z-[-2]!`, `z-[-3]!` Tailwind classes create correct depth stacking instead of being silently ignored.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Add position relative to REGISTER NOW depth effect paragraphs | a62e100 | src/components/sections/FooterSection.tsx |

## What Was Built

The REGISTER NOW depth effect in `FooterSection.tsx` uses three stacked `<p>` tags with decreasing opacity and negative `marginTop` to create a pseudo-3D shadow. The z-index Tailwind classes (`z-[3]!`, `z-[-2]!`, `z-[-3]!`) were applied but had no effect because `position: static` elements are excluded from z-index stacking contexts. Adding `relative` to each `<p>` makes them positioned elements, enabling z-index to work correctly.

- Copy 1: `opacity-100 relative z-[3]!` — renders on top
- Copy 2: `opacity-40 relative z-[-2]!` — renders behind copy 1
- Copy 3: `opacity-20 relative z-[-3]!` — renders furthest behind

No inline styles, marginTop values, opacity values, or other classes were changed.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] `src/components/sections/FooterSection.tsx` modified with `relative` on all three `<p>` tags
- [x] Commit a62e100 exists
