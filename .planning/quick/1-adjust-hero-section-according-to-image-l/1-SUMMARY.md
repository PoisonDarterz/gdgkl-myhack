---
phase: quick-1
plan: 1
subsystem: hero-section
tags: [layout, hero, two-column, ui]
dependency_graph:
  requires: []
  provides: [two-column-hero-layout]
  affects: [src/components/sections/HeroSection.tsx]
tech_stack:
  added: []
  patterns:
    [flex two-column layout, inline heading row, inverted text highlight]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
decisions:
  - "bg-green-700 used for REGISTER NOW button fill — matches design intent (filled green)"
  - "self-end pb-2 on KUALA LUMPUR span to bottom-align with heading baseline"
  - "min-w-[200px] on CTA content side of card to prevent narrow collapse"
metrics:
  duration: "2 min"
  completed: "2026-03-08"
---

# Quick Task 1: Adjust Hero Section to Two-Column Reference Layout — Summary

**One-liner:** Rebuilt HeroSection from a 3-column symmetric layout (towers | text | towers) to a 2-column layout with an inline heading row on the left and a bordered card with twin towers and green CTA on the right.

## What Changed

### Layout structure

- **Before:** `flex items-end justify-between` with three columns — left twin-towers column, center text column, right signal-icon + kl-tower column.
- **After:** `flex gap-12 items-start` with two columns — left content column (`flex-1`) and right card column (`shrink-0`).

### Left column

- Heading row (`flex items-end gap-4`) now contains the signal icon (56x56), the `<h1>Build With AI</h1>`, and the `KUALA LUMPUR` span all on a single line, bottom-aligned.
- Description paragraph now contains an inline `<span className="bg-brand-text text-white px-1">` wrapping "start building the future today." to create the inverted highlight effect.

### Right column / card

- A `border border-brand-text flex` card wraps two sub-columns: the twin-towers.svg image (160x260) on the left and a CTA content column on the right.
- CTA content column holds: `[[ SIGNAL RECEIVED ]]` badge (bg-brand-text, moved from standalone above heading), a subheading, arrow decorators, and the REGISTER NOW button.
- REGISTER NOW button changed from `border border-brand-text` outlined style to `bg-green-700 text-white` filled green style.

### System log block

- Added below the right card (`font-mono text-xs text-brand-muted flex flex-col gap-0.5`) with `[ SYSTEM LOG ]` header and three terminal lines.

### Removed elements

- `kl-tower.svg` — no longer rendered anywhere in this section.
- Standalone `[[ SIGNAL RECEIVED ]]` badge above the heading — moved inside the card.
- Standalone outlined CTA button in the center column — replaced by the filled green button inside the card.
- Standalone `KUALA LUMPUR` paragraph — merged into the inline heading row.

## Decisions Made

| Decision                                   | Rationale                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `bg-green-700` for REGISTER NOW            | Closest standard Tailwind green to design intent; `hover:bg-green-800` for subtle feedback |
| `self-end pb-2` on KUALA LUMPUR            | Keeps the text visually baseline-aligned with the bottom of the h1 in the flex row         |
| `min-w-[200px]` on CTA column              | Prevents the card's right side from collapsing too narrow on smaller viewports             |
| `width={160} height={260}` for twin-towers | Maintains portrait aspect ratio without being overly tall                                  |

## Final File

`src/components/sections/HeroSection.tsx`

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `src/components/sections/HeroSection.tsx` exists and is updated
- [x] `npm run build` exits 0 with no TypeScript errors
- [x] No `kl-tower` reference in HeroSection.tsx
- [x] No outlined button pattern remaining
- [x] Commit `70424ef` exists
