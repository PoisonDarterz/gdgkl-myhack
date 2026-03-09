---
phase: quick-7
plan: "01"
subsystem: hero-layout
tags: [hero, layout, figma, typewriter, animation]
dependency_graph:
  requires: []
  provides: [hero-left-whatisbai, hero-right-stats-outside-card, kualalumpur-inline]
  affects: [HeroSection, page.tsx]
tech_stack:
  added: []
  patterns: [inlined-animation-state, intersection-observer-once]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
    - app/page.tsx
decisions:
  - "KUALA LUMPUR moved inline into the heading flex row (self-end pb-2) rather than its own line below"
  - "WhatIsBAI typewriter animation state and effects inlined directly into HeroSection — no shared hook, keeps component self-contained"
  - "Stats and recap video rendered as border-t sibling divs below the card container, not nested inside the bordered card"
  - "WhatIsBAISection.tsx file kept on disk but no longer imported or rendered anywhere"
metrics:
  duration: "2 min"
  completed: "2026-03-09"
  tasks_completed: 2
  files_modified: 2
---

# Quick Task 7: Fix Hero Layout Differences Summary

**One-liner:** Inlined WhatIsBAI typewriter block into hero left column, moved KUALA LUMPUR inline with h1, and extracted stats + recap video outside the right column card border to match Figma layout.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Restructure HeroSection — inline KL, extract stats/recap, shrink card | b041e86 | src/components/sections/HeroSection.tsx |
| 2 | Remove WhatIsBAISection from page.tsx mid-sections grid | 995de00 | app/page.tsx |

## What Was Built

### Task 1: HeroSection restructure

- **KUALA LUMPUR inline:** The span is now a third child of the heading `flex items-end gap-4` row (after the icon and h1), using `self-end pb-2` to bottom-align with the heading baseline.
- **WhatIsBAI inlined:** `FULL_TEXT` constant, `displayedText`/`animating`/`hasAnimated` state, `sectionRef`, and both `useEffect` hooks (IntersectionObserver + character timer at 18ms) copied from `WhatIsBAISection.tsx` directly into `HeroSection`. The bordered box with diagonal hatch renders after the description paragraph in the left column.
- **Right column card trimmed:** The outer `border border-brand-text` div now contains only Section A (towers + signal header + HANDS-ON + CTA) and Section B (system log). Sections C and D removed from inside the card.
- **Stats outside card:** Globe stat and people stat rendered as `border-t border-brand-text flex items-center gap-3 px-4 py-3` divs directly after the card closing tag. Numbers use `text-2xl font-bold font-mono`, labels use `text-xs text-brand-muted`.
- **Recap video outside card:** Recap video div rendered as another `border-t` sibling after the stats rows.

### Task 2: page.tsx cleanup

- Removed `WhatIsBAISection` from the named import.
- Removed `<WhatIsBAISection />` from the mid-sections grid left column.
- Left column now contains only `<BenefitsSection />`.
- Grid structure (`grid-cols-1 lg:grid-cols-[3fr_2fr]`), `StatsSection`, and all other sections untouched.

## Verification

- `npm run build` passes with zero TypeScript errors after both tasks.
- Hero left column order: icon + h1 + KUALA LUMPUR (inline) → description paragraph → WhatIsBAI bordered box with typewriter animation.
- Hero right column: bordered card (signal header + twin towers + HANDS-ON + arrows + REGISTER NOW + SYSTEM LOG) → globe stat → people stat → recap video (all three outside card border).
- page.tsx mid-sections: BenefitsSection + StatsSection only.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- `src/components/sections/HeroSection.tsx` — exists and modified.
- `app/page.tsx` — exists and modified.
- Commit b041e86 — Task 1 HeroSection restructure.
- Commit 995de00 — Task 2 page.tsx cleanup.
- Both commits present in git log.
