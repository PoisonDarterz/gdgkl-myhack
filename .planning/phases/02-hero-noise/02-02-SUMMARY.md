---
phase: 02-hero-noise
plan: "02"
subsystem: ui
tags: [nextjs, tailwind, next-image, instrument-serif, workbench, courier-prime, hero, svg]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: font CSS variables (--font-instrument-serif, --font-workbench, --font-courier-prime), Tailwind @theme tokens (font-display, font-retro, font-mono, brand colors)
provides:
  - Full HeroSection component with badge, heading, subheading, description, CTA button, and flanking SVG illustrations
affects: [page-layout, visual-verification]

# Tech tracking
tech-stack:
  added: []
  patterns: [next/image for all decorative SVGs, three-column flex layout with self-end alignment for illustrations, outlined button with hover:bg-brand-text fill transition]

key-files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx

key-decisions:
  - "Outlined CTA button uses border border-brand-text with hover:bg-brand-text hover:text-white — CSS transition, no JS"
  - "Signal received badge uses font-mono (Courier Prime) on bg-brand-text pill — single span element"
  - "Three-column flex layout with items-end so illustrations bottom-align with center text column"
  - "Signal icon placed above KL Tower in right column per Figma composition"

patterns-established:
  - "Flanking illustration pattern: shrink-0 self-end wrapper with next/image, aria-hidden on decorative images"
  - "Outlined button pattern: border border-brand-text + hover:bg-brand-text hover:text-white transition-colors duration-200"

requirements-completed: [SECT-01]

# Metrics
duration: 1min
completed: 2026-03-08
---

# Phase 02 Plan 02: Hero Section Implementation Summary

**Full hero section with Instrument Serif heading, Workbench retro subheading, Courier Prime badge/description/CTA, and flanking SVG illustration slots — pending human SVG placement and visual verification**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-03-08T14:41:00Z
- **Completed:** 2026-03-08T14:41:56Z
- **Tasks:** 1 of 2 complete (Task 2 is a human-verify checkpoint)
- **Files modified:** 1

## Accomplishments
- Replaced HeroSection placeholder with the full three-column Figma-faithful layout
- Implemented all five center content elements: badge, h1, city subheading, description, CTA button
- Wired font utility classes (font-display, font-retro, font-mono) and brand color tokens (brand-text, brand-muted) throughout
- Referenced three next/image SVG paths (/images/twin-towers.svg, /images/kl-tower.svg, /images/signal-icon.svg) — awaiting user to export from Figma
- Build and lint both pass cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement full HeroSection component** - `9973193` (feat)

**Plan metadata:** (pending — after checkpoint resolution)

## Files Created/Modified
- `src/components/sections/HeroSection.tsx` - Full hero section with badge, heading, subheading, description, CTA, and flanking illustration slots

## Decisions Made
- Outlined CTA button implemented as a single `<a>` element with CSS border + hover fill — matches CONTEXT.md spec (no two-rectangle structure)
- `self-end` on both illustration columns ensures bottom-alignment with the center text block in the flex row
- Signal icon uses `alt=""` + `aria-hidden="true"` as it is purely decorative

## Deviations from Plan

None - plan executed exactly as written for Task 1.

## Issues Encountered

Build lock from a prior Next.js process was present at `.next/lock` — cleared with `rm -f .next/lock` before running `npm run build`. Not a code issue.

## User Setup Required

**Task 2 (checkpoint:human-verify) requires manual SVG export from Figma before visual verification can proceed.**

Steps:
1. Export Twin Towers SVG from Figma → save as `public/images/twin-towers.svg`
2. Export KL Tower SVG from Figma → save as `public/images/kl-tower.svg`
3. Export Signal icon SVG from Figma → save as `public/images/signal-icon.svg`
4. Create `public/images/` directory if it does not yet exist
5. Run `npm run dev` and open http://localhost:3000 to confirm hero renders correctly

## Next Phase Readiness
- HeroSection.tsx is complete and committed; it will render once the three SVG files are placed
- Visual verification (Task 2) must be completed by the user before this plan is fully done
- After SVGs are in place and visual check passes, state can be advanced to Phase 02 Plan 03

---
*Phase: 02-hero-noise*
*Completed: 2026-03-08*
