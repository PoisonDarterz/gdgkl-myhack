---
phase: quick-8
plan: 01
subsystem: hero
tags: [hero, svg, icons, stats, layout, animation]
dependency_graph:
  requires: []
  provides: [hero-icon-stats, hero-equal-height-columns]
  affects: [HeroSection]
tech_stack:
  added: []
  patterns: [inline-count-up-animation, intersection-observer, items-stretch-equal-height]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
decisions:
  - "Stats count-up animation inlined into HeroSection — StatsSection no longer used in hero"
  - "Stats observer reuses sectionRef (WhatIsBAI box ref) — hero is above fold so threshold triggers on load"
  - "Section B border changed from border to border-t/l/r — connects flush with Section A bottom edge"
  - "Recap video placeholder uses light diagonal hatch to visually distinguish from dark WhatIsBAI hatch"
metrics:
  duration: 8 min
  completed: 2026-03-09
  tasks_completed: 1
  files_modified: 1
---

# Quick Task 8: Add Globe and People SVG Icons to Hero Stats Summary

**One-liner:** earth.svg and people.svg icons at 80px inline in hero right column stats, with items-stretch equal-height columns and count-up animation inlined from StatsSection.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Add SVG icons to stats and equalize column heights in HeroSection | fdd3eea | src/components/sections/HeroSection.tsx |

## What Was Built

- Removed `<StatsSection />` import and usage from HeroSection (StatsSection.tsx preserved for future standalone use)
- Inlined count-up animation (events 0→2,258, devs 0→178,000) with IntersectionObserver directly in HeroSection
- Added earth.svg at `width={80} height={80}` to the left of the 2,258 global events stat row
- Added people.svg at `width={80} height={80}` to the left of the 178,000 developers trained stat row
- Added Section D: RECAP VIDEO placeholder card with light diagonal hatch background
- Outer `<section>` changed from `items-start` to `items-stretch`
- Left column: `justify-between` + `flex-1` on WhatIsBAI box so it grows to fill remaining height
- Right column: `justify-between` so signal card (top), stats (middle), recap (bottom) space out vertically

## Verification

- `npm run build` exits 0, no TypeScript errors
- No StatsSection import remains in HeroSection
- page.tsx does not import StatsSection (it was never imported there — confirmed)
- earth.svg left of 2,258 stat, people.svg left of 178,000 stat, both at 80px
- Left and right columns stretch to equal height via `items-stretch`

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- src/components/sections/HeroSection.tsx: exists and updated
- Commit fdd3eea: confirmed
