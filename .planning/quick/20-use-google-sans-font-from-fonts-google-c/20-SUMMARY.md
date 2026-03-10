---
phase: quick-20
plan: 20
subsystem: typography
tags: [fonts, cdn, google-sans, css-variables]
dependency_graph:
  requires: []
  provides: [google-sans-cdn-all-weights]
  affects: [app/layout.tsx, app/globals.css]
tech_stack:
  added: []
  patterns: [Google Fonts CDN link tags in App Router head, CSS variable font-family]
key_files:
  created: []
  modified:
    - app/layout.tsx
    - app/globals.css
decisions:
  - Google Sans loaded via CDN link tag in <head> instead of next/font/google — CDN version exposes weights 100-900, next/font caps at 700
  - --font-sans set to literal 'Google Sans', sans-serif in @theme inline — no CSS variable indirection needed since CDN font name is stable
metrics:
  duration: "2 min"
  completed: "2026-03-10"
  tasks: 2
  files: 2
---

# Quick Task 20: Google Sans CDN Font (All Weights) Summary

**One-liner:** Replaced next/font/google Google_Sans with Google Fonts CDN link tags in layout head, mapping --font-sans to 'Google Sans' with full weight range 100-900.

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | Replace next/font/google Google_Sans with CDN link tag | dd7b350 | app/layout.tsx |
| 2 | Wire Google Sans CDN family as --font-sans in globals.css | dd7b350 | app/globals.css |

## What Was Built

### app/layout.tsx
- Removed `Google_Sans` from the `next/font/google` import line
- Removed the `const googleSans = Google_Sans({...})` block
- Removed `${googleSans.variable}` from the wrapper div className
- Added `<head>` element with three link tags: preconnect to fonts.googleapis.com, preconnect to fonts.gstatic.com (crossOrigin="anonymous"), and stylesheet href loading Google Sans with all italic/weight combinations (ital,wght@0,100 through 1,900)

### app/globals.css
- Changed `--font-sans: var(--font-sans)` (self-referencing no-op) to `--font-sans: 'Google Sans', sans-serif`
- The existing `html { @apply font-sans; }` in `@layer base` now resolves to Google Sans from CDN site-wide
- `--font-mono`, `--font-display`, `--font-retro` remain unchanged

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

- [x] app/layout.tsx modified — Google_Sans import removed, CDN link tags in head
- [x] app/globals.css modified — --font-sans points to 'Google Sans', sans-serif
- [x] Commit dd7b350 exists
- [x] courierPrime.variable, instrumentSerif.variable, workbench.variable still in wrapper div className
