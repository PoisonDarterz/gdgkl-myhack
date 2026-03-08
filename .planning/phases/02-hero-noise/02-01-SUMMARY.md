---
phase: 02-hero-noise
plan: "01"
subsystem: ui
tags: [css, noise-texture, overlay, layout, next.js]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: globals.css and layout.tsx with font wrapper established
provides:
  - .noise-overlay CSS class in globals.css (position fixed, opacity 0.3, pointer-events none)
  - Noise overlay div rendered as first child of font wrapper in layout.tsx
  - Full-page grain texture overlay wired to /images/noise.png
affects:
  - All subsequent UI phases — noise overlay sits at z-index 9999 above all content

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Decorative full-page overlays use position: fixed with inset: 0 and pointer-events: none — never next/image"
    - "aria-hidden=true on purely decorative divs"

key-files:
  created: []
  modified:
    - app/globals.css
    - app/layout.tsx

key-decisions:
  - "CSS background-image used for noise texture (not next/image) — repeating decorative pattern, not content image"
  - "position: fixed with inset: 0 ensures overlay covers full viewport at all scroll positions"
  - "z-index: 9999 puts overlay above all content visually while pointer-events: none keeps interaction unblocked"
  - "aria-hidden=true on overlay div — purely decorative, screen readers must not see it"

patterns-established:
  - "Decorative overlays: position fixed, inset 0, pointer-events none, aria-hidden true"

requirements-completed:
  - STYLE-02

# Metrics
duration: 2min
completed: 2026-03-08
---

# Phase 02 Plan 01: Noise Overlay CSS and Layout Integration Summary

**Fixed-position grain texture overlay wired to /images/noise.png via CSS background-image at 30% opacity, non-blocking to interaction**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-08T10:00:58Z
- **Completed:** 2026-03-08
- **Tasks:** 1 of 2 (Task 2 is checkpoint:human-verify — awaiting user)
- **Files modified:** 2

## Accomplishments
- Added `.noise-overlay` CSS class to `app/globals.css` inside `@layer base` with `position: fixed`, `inset: 0`, `opacity: 0.3`, `pointer-events: none`, `z-index: 9999`
- Added `<div className="noise-overlay" aria-hidden="true" />` as first child of font wrapper div in `app/layout.tsx`
- Build and lint both pass with no errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Add noise overlay CSS class and render overlay div** - `25ed4f0` (feat)
2. **Task 2: Place noise PNG and verify grain texture visible** - awaiting human action (checkpoint)

## Files Created/Modified
- `app/globals.css` - Added `.noise-overlay` class with fixed positioning, repeat background, 30% opacity, no pointer events
- `app/layout.tsx` - Added `<div className="noise-overlay" aria-hidden="true" />` as first child of font wrapper

## Decisions Made
- CSS `background-image` used instead of `next/image` — noise PNG is a repeating decorative pattern, not a content image; `next/image` does not support CSS background usage
- `position: fixed` with `inset: 0` ensures full viewport coverage regardless of scroll position
- `pointer-events: none` ensures overlay never blocks clicks on page content
- `aria-hidden="true"` applied because overlay is purely decorative

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Human action required to complete this plan:** Export the noise texture PNG from Figma and place it at `public/images/noise.png`.

Steps:
1. In Figma, locate the noise texture fill (imageRef: `ffd40838e49e843387f4753b45e6667cfe238e61`)
2. Export it as a PNG
3. Create `public/images/` directory if it does not exist
4. Save the file as `public/images/noise.png`

Then verify visually at http://localhost:3000 that the grain texture is visible at ~30% opacity across the full page, and that clicking anywhere is not blocked.

## Next Phase Readiness
- Noise overlay CSS and layout integration complete — code side is done
- Pending: user must supply `public/images/noise.png` from Figma export
- Once PNG is placed, the full-page grain texture will be visible and this plan is complete

---
*Phase: 02-hero-noise*
*Completed: 2026-03-08*
