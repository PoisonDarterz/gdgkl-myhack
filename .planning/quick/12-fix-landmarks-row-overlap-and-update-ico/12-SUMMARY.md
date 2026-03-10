---
phase: quick-12
plan: 12
subsystem: landmarks-row
tags: [layout, animation, svg, landmarks]
dependency_graph:
  requires: [quick-11]
  provides: [fixed-landmarks-row-union-separators]
  affects: [BenefitsSection]
tech_stack:
  added: []
  patterns: [next/image, useEffect animation, CSS overflow containment]
key_files:
  created: []
  modified:
    - src/components/LandmarksRow.tsx
decisions:
  - "union.svg used as static separator at 36x36 (inside 40x40 container) — rendered 4 times, never animating"
  - "Building slots use overflow-hidden + object-bottom to prevent tall SVGs from bleeding outside 70px height"
  - "BUILDINGS array replaces ICONS array — kltower.svg, big_union.svg, tmtower.svg"
  - "mt-6 border-t border-brand-muted/40 added to outer container to separate row from BenefitsSection above"
  - "Canonical Tailwind classes used: w-10 h-10 for UnionIcon container, h-17.5 w-12.5 for building slots"
metrics:
  duration: 3 min
  completed: 2026-03-10
  tasks: 1
  files: 1
---

# Quick Task 12: Fix LandmarksRow Overlap and Update Icon Sequence — Summary

**One-liner:** Rewrote LandmarksRow to use 4 static union.svg separators with 3 overflow-contained animated building slots (kltower/big_union/tmtower) and a mt-6 border-t outer container to eliminate overlap with BenefitsSection.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Rewrite LandmarksRow with overlap fix and union-separator icon sequence | 80e648d | src/components/LandmarksRow.tsx |

## What Was Built

- Replaced text `+` separators with 4 static `UnionIcon` components rendering `/images/union.svg` at 36x36 with `opacity-50`
- Replaced `ICONS` array (kl-tower.svg, twin-towers.svg, tmtower.svg) with `BUILDINGS` array (kltower.svg, big_union.svg, tmtower.svg)
- Building slot containers now have `overflow-hidden` and `object-bottom` on the Image — prevents tall SVGs from bleeding upward out of their 70px fixed height
- Outer container gains `mt-6 border-t border-brand-muted/40` to visually separate row from BenefitsSection above and eliminate overlap
- Animation logic unchanged: 3s interval, 150ms fade-out/swap/fade-in, slots start at offsets [0, 1, 2]
- `UnionIcon` extracted as local const for clean, DRY JSX

## Deviations from Plan

None — plan executed exactly as written. Canonical Tailwind class substitutions applied per IDE warnings (w-10/h-10, h-17.5/w-12.5) — cosmetic only, no behavior change.

## Self-Check: PASSED

- src/components/LandmarksRow.tsx: exists and updated
- Commit 80e648d: confirmed in git log
- npm run build: completed with no errors
