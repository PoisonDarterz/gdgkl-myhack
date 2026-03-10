---
phase: quick-18
plan: 01
subsystem: header-footer
tags: [header, footer, fonts, google-sans, layout, gdg-logo, depth-effect]
dependency_graph:
  requires: [quick-16, quick-17]
  provides: [gdg-logo-in-header, gdg-logo-in-footer, google-sans-font, depth-register-now, vertical-policy-links]
  affects: [Header.tsx, FooterSection.tsx, app/layout.tsx]
tech_stack:
  added: [Google_Sans from next/font/google]
  patterns: [next/image for SVG logos, CSS variable font injection, stacked p tags with negative margin for depth effect]
key_files:
  modified:
    - src/components/Header.tsx
    - src/components/sections/FooterSection.tsx
    - app/layout.tsx
decisions:
  - Google Sans weight 900 not available — used 400/500/600/700 (variable font supports bold rendering via font-black)
  - Google Sans fallback font override not found (non-blocking warning) — build succeeds, font loads at runtime
  - gdg_white.svg path confirmed as /images/gdg_white.svg (file lives in public/images/)
metrics:
  duration: 8 min
  completed: 2026-03-10
  tasks_completed: 2
  files_modified: 3
---

# Quick Task 18: Fix Header Logo and Footer Layout with Google Sans Depth Effect Summary

**One-liner:** Header gets gdg_white.svg left of text with no max-width container; footer gets logo in "Brought to you by" box, vertical policy links, and a 3-copy REGISTER NOW depth stack in Google Sans.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Fix Header — add gdg_white.svg logo, remove inner padding, full-width layout | 8acfd03 | src/components/Header.tsx |
| 2 | Fix Footer — gdg logo, vertical policy links, full-width depth REGISTER NOW with Google Sans | 8acfd03 | src/components/sections/FooterSection.tsx, app/layout.tsx |

## Changes Made

### Task 1: Header

- Removed `max-w-screen-xl mx-auto px-8` inner wrapper div — layout is now directly on the `<header>` element with `px-6`
- Added `<Image src="/images/gdg_white.svg" alt="GDG logo" width={40} height={40} />` from `next/image`
- Wrapped logo + text column in `<div className="flex items-center gap-3">` for horizontal alignment
- Existing border-l text column and Instagram link unchanged

### Task 2: Footer

**layout.tsx:**
- Imported `Google_Sans` from `next/font/google`
- Registered with weights `["400", "500", "600", "700"]` (900 not available for this font)
- Added `${googleSans.variable}` to inner wrapper div className
- CSS variable `--font-google-sans` is now available throughout the app

**FooterSection.tsx:**
- Left bordered box: added `<Image src="/images/gdg_white.svg" width={48} height={48} />` to the left, wrapped with existing text in a flex row with `gap-4`
- Policy links: changed from `flex gap-6` to `flex flex-col gap-2 items-end` — Privacy Policy stacks above Code of Conduct
- REGISTER NOW: replaced `var(--font-instrument-serif)` with `var(--font-google-sans)` in inline style
- REGISTER NOW: rendered as 3 `<p>` tags in a `flex flex-col` container, copies 2 and 3 use `marginTop: "-0.55em"` to overlap, opacity-100 / opacity-40 / opacity-20 for depth effect
- Outer container uses `overflow-hidden` to prevent vertical scrollbar from negative margins

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Google Sans weight 900 unavailable**
- **Found during:** Task 2 (Step A)
- **Issue:** `next/font/google` Google_Sans does not expose weight 900; build failed with "Unknown weight 900"
- **Fix:** Changed weight array from `["400", "700", "900"]` to `["400", "500", "600", "700"]`. The `font-black` Tailwind class still renders at the heaviest available weight (700).
- **Files modified:** app/layout.tsx
- **Commit:** 8acfd03

## Self-Check: PASSED

- FOUND: src/components/Header.tsx
- FOUND: src/components/sections/FooterSection.tsx
- FOUND: app/layout.tsx
- FOUND commit: 8acfd03
- Build: PASSED (0 errors, 1 non-blocking warning about Google Sans fallback override)
