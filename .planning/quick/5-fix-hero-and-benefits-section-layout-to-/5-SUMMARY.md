---
phase: quick-5
plan: 01
subsystem: UI/Sections
tags: [hero, benefits, layout, figma, tailwind]
dependency_graph:
  requires: []
  provides: [HeroSection-card-layout, BenefitsSection-no-icons]
  affects: [HeroSection, BenefitsSection]
tech_stack:
  added: []
  patterns: [flex-1 content column, justify-between CTA row, icon-free benefit cards]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/BenefitsSection.tsx
decisions:
  - "[quick-5]: Hero card content column uses flex-1 instead of fixed w-70 so it fills remaining card width"
  - "[quick-5]: CTA row uses justify-between so arrows sit flush-left and register button flush-right"
  - "[quick-5]: Towers image uses self-stretch object-contain w-27.5 (110px) to fill card height without overflow"
  - "[quick-5]: BenefitsSection is now icon-free — removed lucide-react imports and icon fields entirely"
metrics:
  duration: 3 min
  completed: 2026-03-09
  tasks_completed: 2
  files_modified: 2
---

# Quick Task 5: Fix Hero and Benefits Section Layout Summary

**One-liner:** Hero card corrected to towers-left + flex-1 content with justify-between CTA row; Benefits section stripped of Lucide icons to match Figma's icon-free vertical stack.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix HeroSection card layout to match Figma proportions | 3bf7418 | src/components/sections/HeroSection.tsx |
| 2 | Remove icons from BenefitsSection to match Figma | 8b6e3a2 | src/components/sections/BenefitsSection.tsx |

## Changes Made

### Task 1 — HeroSection card layout

- Removed `h-15` fixed height from right column outer div (`shrink-0 flex flex-col gap-4`)
- Towers image: changed from `h-[150px] block shrink-0` (width 93px) to `self-stretch object-contain shrink-0 w-27.5` — fills card height proportionally
- Content div: changed from `flex flex-col gap-2 w-70` to `flex-1 flex flex-col` — now fills remaining card width
- SIGNAL RECEIVED span: added `block` display so it spans full content column width
- HANDS-ON text: moved out of `p-3 text-center` wrapper, now has `px-3 pt-3 pb-1 text-center` directly
- CTA row: changed from `flex flex-row gap-2 items-center justify-center` to `flex flex-row items-center justify-between px-3 pb-3` — arrows flush-left, register button flush-right

### Task 2 — BenefitsSection icon removal

- Removed `import { Braces, Sparkle, Heart } from "lucide-react"` line
- Removed `Icon`, `iconClass` fields from all three benefit objects
- Removed icon wrapper `<div className="mt-0.5 shrink-0"><Icon .../></div>` from render
- Changed card from `flex gap-4` to `flex flex-col` — no icon to offset against
- Dashed dividers between rows preserved (`divide-y divide-dashed divide-brand-muted/30`)

## Verification

- `npm run build` passes with no TypeScript or compilation errors
- Hero card: towers column narrow on left, full-width signal header, HANDS-ON text centered, arrows flush-left and register button flush-right in CTA row
- Benefits: three vertical rows, no icons, `# TITLE ·········` heading + description

## Deviations from Plan

**1. [Rule 1 - Bug] Applied canonical Tailwind class for tower width**
- **Found during:** Task 1
- **Issue:** IDE diagnostic suggested `w-[110px]` can be written as `w-27.5` (canonical Tailwind v4 class)
- **Fix:** Changed `w-[110px]` to `w-27.5`
- **Files modified:** src/components/sections/HeroSection.tsx
- **Commit:** 3bf7418

## Self-Check: PASSED

- src/components/sections/HeroSection.tsx — FOUND
- src/components/sections/BenefitsSection.tsx — FOUND
- Commit 3bf7418 — FOUND
- Commit 8b6e3a2 — FOUND
