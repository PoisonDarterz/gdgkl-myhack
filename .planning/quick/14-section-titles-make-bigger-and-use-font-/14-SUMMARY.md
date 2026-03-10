---
phase: quick-14
plan: 01
subsystem: sections
tags: [typography, branding, font, section-titles]
dependency_graph:
  requires: [app/layout.tsx (--font-instrument-serif CSS variable)]
  provides: [larger serif section titles in BenefitsSection, TimelineSection, PartnersSection, FAQSection]
  affects: [visual weight and font of all four section headers]
tech_stack:
  added: []
  patterns: [Tailwind arbitrary font-family via CSS variable, text-5xl display size]
key_files:
  created: []
  modified:
    - src/components/sections/BenefitsSection.tsx
    - src/components/sections/TimelineSection.tsx
    - src/components/sections/PartnersSection.tsx
    - src/components/sections/FAQSection.tsx
decisions:
  - Section title spans use bracket syntax font-[family-name:var(--font-instrument-serif)] per plan spec — IDE suggests canonical form but build passes either way; no change made
metrics:
  duration: 2 min
  completed: 2026-03-10
  tasks_completed: 1
  files_modified: 4
---

# Quick Task 14: Section Titles — Bigger Size and Instrument Serif Font Summary

**One-liner:** Upgraded BENEFITS, TIMELINE, PARTNERS, FAQ section title spans from `text-2xl font-mono` to `text-5xl font-[family-name:var(--font-instrument-serif)]` for prominent serif display headings.

## Tasks Completed

| Task | Description | Commit | Files |
| ---- | ----------- | ------ | ----- |
| 1 | Update section title font and size in all four section components | 335e0e1 | BenefitsSection.tsx, TimelineSection.tsx, PartnersSection.tsx, FAQSection.tsx |

## Changes Made

Each of the four section files had its header `<span>` updated:

- `font-mono text-2xl` replaced with `font-[family-name:var(--font-instrument-serif)] text-5xl`
- All other classes (`bg-brand-text text-white font-black tracking-widest uppercase px-4 py-2 shrink-0`) preserved unchanged
- No other elements or layout changed in any file

## Verification

`npm run build` exits 0 — TypeScript check passed, static pages generated without errors.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- src/components/sections/BenefitsSection.tsx: modified (confirmed)
- src/components/sections/TimelineSection.tsx: modified (confirmed)
- src/components/sections/PartnersSection.tsx: modified (confirmed)
- src/components/sections/FAQSection.tsx: modified (confirmed)
- Commit 335e0e1: exists (confirmed)
