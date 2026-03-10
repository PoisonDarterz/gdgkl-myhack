---
phase: quick-15
plan: 15
subsystem: faq-accordion
tags: [ui, layout, accordion, figma-match]
dependency_graph:
  requires: []
  provides: [left-anchored-chevron, larger-faq-title]
  affects: [FAQSection]
tech_stack:
  added: []
  patterns: [flex-reorder, tailwind-text-sizing]
key_files:
  created: []
  modified:
    - src/components/sections/FAQSection.tsx
decisions:
  - "[quick-15]: FAQ chevron moved to left of question text — SVG rendered before span in flex row"
  - "[quick-15]: Question text increased from text-sm to text-base for better readability"
  - "[quick-15]: Button flex changed from justify-between to justify-start; flex-1 on span fills remaining width"
metrics:
  duration: "1 min"
  completed: "2026-03-10"
  tasks: 1
  files: 1
---

# Quick Task 15: FAQ Accordion — Move Arrow Icon to Left Side Summary

**One-liner:** FAQ accordion chevron repositioned to left via flex child reorder with question text bumped to text-base.

## Objective

Move the chevron icon from the right side to the left side of each FAQ accordion row, and increase the question text font size from `text-sm` to `text-base`, matching the updated Figma design.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Move chevron to left and increase title font size | 09e838a | src/components/sections/FAQSection.tsx |

## Changes Made

**FAQSection.tsx — button element restructure:**

- SVG chevron moved before the question `<span>` so it renders on the left
- Button `justify-between` changed to `justify-start` (no longer space-between layout)
- SVG margin changed from `ml-3` to `mr-3` (spacing now between icon and text, not after text)
- Question `<span>` gains `flex-1` to fill the remaining row width
- Question text class changed from `text-sm` to `text-base` for larger, more readable titles
- Chevron `rotate-180` toggle animation preserved unchanged

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` exits 0 with no errors
- Button flex structure: SVG chevron renders left of question text
- Question title displays at `text-base` (larger than previous `text-sm`)
- Accordion toggle animation (`rotate-180` on open) still works correctly

## Self-Check: PASSED

- File exists: `src/components/sections/FAQSection.tsx` — FOUND
- Commit 09e838a — FOUND
