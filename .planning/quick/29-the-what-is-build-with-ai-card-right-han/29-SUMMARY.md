---
phase: quick-29
plan: 29
subsystem: hero
tags: [layout, flex, hatch-stripe, WhatIsBAI]
dependency_graph:
  requires: []
  provides: [full-height hatch stripe in WhatIsBAI card]
  affects: [src/components/sections/HeroSection.tsx]
tech_stack:
  added: []
  patterns: [flex flex-col parent + flex-1 child for height chain]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
decisions:
  - Add flex flex-col to WhatIsBAI outer bordered div to establish flex height context
  - Replace h-full with flex-1 on inner row so it fills the flex column parent
metrics:
  duration: "2 min"
  completed: "2026-03-10"
---

# Quick Task 29: WhatIsBAI Card Right Hatch Stripe Full-Height Fix Summary

**One-liner:** Fixed diagonal hatch stripe to fill full card height by adding `flex flex-col` to outer bordered div and replacing `h-full` with `flex-1` on the inner row.

## What Was Done

The WHAT IS BUILD WITH AI card's right-hand diagonal hatch stripe was not stretching to the bottom edge of the card border. This happened because `h-full` on the inner flex row requires the parent to have a defined height — but the parent only had `flex-1` (which participates in flex sizing, not block height). The fix establishes the correct height chain via flex.

Two targeted changes made to `src/components/sections/HeroSection.tsx`:

1. **Outer bordered div (line 198):** Added `flex flex-col` to the className so the div becomes a flex column container that intrinsically defines height for its children.

   - Before: `className="border border-brand-text relative flex-1 lg:min-h-[280px]"`
   - After: `className="border border-brand-text relative flex-1 lg:min-h-[280px] flex flex-col"`

2. **Inner content row div (line 205):** Replaced `h-full` with `flex-1` so the row fills available height from the flex column parent.

   - Before: `className="flex h-full"`
   - After: `className="flex flex-1"`

The hatch block itself (`w-24 lg:w-36 shrink-0 border-l border-brand-text`) inherits full row height automatically via default flex `align-items: stretch` — no change needed there.

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Fix hatch stripe full-height in WhatIsBAI card | 2b78c1d | src/components/sections/HeroSection.tsx |

## Verification

- `npm run build` completed successfully with no TypeScript or lint errors
- Both CSS changes are minimal, targeted, and do not affect any other component

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- src/components/sections/HeroSection.tsx: modified with both targeted changes
- Commit 2b78c1d: confirmed present in git log
