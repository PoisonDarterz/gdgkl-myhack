---
phase: quick-10
plan: 10
subsystem: BenefitsSection
tags: [layout, landmarks, full-width, benefits]
dependency_graph:
  requires: [quick-9]
  provides: [full-width-landmarks-row]
  affects: [BenefitsSection]
tech_stack:
  added: []
  patterns: [sibling-div-after-flex-row]
key_files:
  created: []
  modified:
    - src/components/sections/BenefitsSection.tsx
decisions:
  - City landmarks row moved to section-level sibling div — no class or content changes
metrics:
  duration: 3 min
  completed: 2026-03-09
---

# Quick Task 10: Fix Benefits Section Layout — Landmarks Full Width Summary

**One-liner:** City landmarks div relocated from left column interior to full-width sibling row below the benefits+video two-column flex container.

## What Was Done

Moved the "City landmarks row" `<div>` (KL Tower + Petronas Twin Towers + KL Tower) out of the left column `<div className="min-w-0 flex flex-col">` and placed it as a direct child of `<section>`, after the closing `</div>` of the two-column flex row.

**Resulting JSX structure:**
```
<section>
  <div flex-row justify-between>   <- 2-col: benefits left, video right
    <div left-col>                 <- header + 3 benefits only
    </div>
    <div right-col>
      <RecapVideoCard />
    </div>
  </div>
  <div landmarks-row>              <- full-width, centered, spans both columns
    KL Tower + Petronas + KL Tower
  </div>
</section>
```

No classes, content, or other markup were changed — purely a structural relocation.

## Tasks

| # | Name | Status | Commit |
|---|------|--------|--------|
| 1 | Move city landmarks div to full-width row | Done | 6191eea |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npx tsc --noEmit` exits with no errors
- Left column contains only header row and 3 benefit items
- Landmarks row is a sibling of the two-column flex row inside `<section>`
- Video card on right column is unchanged

## Self-Check: PASSED

- File `src/components/sections/BenefitsSection.tsx` exists and modified
- Commit 6191eea exists in git log
