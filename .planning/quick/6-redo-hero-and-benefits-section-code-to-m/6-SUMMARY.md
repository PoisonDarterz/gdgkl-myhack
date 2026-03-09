---
phase: quick-6
plan: 01
subsystem: ui-sections
tags: [hero, benefits, figma, layout, icons, landmarks]
dependency_graph:
  requires: []
  provides:
    - HeroSection with full Figma-matching right card (stats + recap video)
    - BenefitsSection with colored inline icons and city landmarks strip
  affects:
    - app/page.tsx (renders both sections)
tech_stack:
  added: []
  patterns:
    - Inline SVG icons for colored benefit indicators (no external library)
    - Bordered card sections separated by border-t dividers inside single outer border
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/BenefitsSection.tsx
decisions:
  - "Right card uses single outer border with border-t internal dividers for sections A/B/C/D"
  - "KUALA LUMPUR moved to its own line below the heading row (not inline with h1)"
  - "Benefit icons implemented as inline SVG components (no external icon library dependency)"
  - "City landmarks row uses kl-tower.svg + twin-towers.svg + kl-tower.svg with + separators"
metrics:
  duration: "3 min"
  completed: "2026-03-09T14:00:37Z"
  tasks_completed: 2
  files_modified: 2
---

# Quick Task 6: Redo Hero and Benefits Section Summary

**One-liner:** Rebuilt HeroSection right card with globe/people stats and recap video panel, and BenefitsSection with green/blue/red inline SVG icons and KL/Petronas city landmarks strip.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Redo HeroSection — complete right card with stats and recap video | f0487eb | src/components/sections/HeroSection.tsx |
| 2 | Redo BenefitsSection with colored inline icons and city landmarks row | 43aab09 | src/components/sections/BenefitsSection.tsx |

## What Was Built

### Task 1 — HeroSection

Restructured the right column into a single bordered outer wrapper (`border border-brand-text`) with four internal sections separated by `border-t`:

- **Section A:** Twin towers illustration + CTA content (SIGNAL RECEIVED header, HANDS-ON text, arrows + REGISTER NOW button)
- **Section B:** System log with three monospace boot lines
- **Section C:** Two-column stats row — globe SVG + "2,258 / global events organized" | people SVG + "178,000 / developers trained"
- **Section D:** Recap video card — dark thumbnail panel (Build with AI / GDG / 2026) + play button + "Watch recap"

Also corrected left column: KUALA LUMPUR moved to its own line below the heading row (was inline), bai_icon resized to 80x80, h1 to text-8xl.

All animation logic (glitch text, isDouble signal bracket swap) preserved unchanged.

### Task 2 — BenefitsSection

Added per-benefit colored SVG icons rendered inline before the `# TITLE` heading:
- Curly braces icon in `text-[#4CAF50]` (green) for PRACTICAL WORKSHOPS
- Sparkle/4-point star in `text-[#2196F3]` (blue) for MODERN AI TECH STACK
- Heart icon in `text-[#F44336]` (red) for PEER-TO-PEER GUIDANCE

Added city landmarks strip at the bottom with `border-t border-dashed`: KL Tower + Petronas Twin Towers + KL Tower, separated by `+` text, using existing SVG assets from `/public/images/`.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files exist
- `src/components/sections/HeroSection.tsx` — present
- `src/components/sections/BenefitsSection.tsx` — present

### Commits exist
- f0487eb — HeroSection task
- 43aab09 — BenefitsSection task

### Build
`npm run build` passed with zero TypeScript or lint errors.

## Self-Check: PASSED
