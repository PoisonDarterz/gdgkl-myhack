---
id: quick-21
status: complete
tags: [fonts, google-sans, css-variables, footer]
provides: [google-sans-font-working]
---

# Quick Task 21: Fix --font-google-sans is not defined

**One-liner:** Replaced `var(--font-google-sans)` with literal `'Google Sans', sans-serif` in FooterSection.tsx and updated CDN link to user-specified URL.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Replace var(--font-google-sans) in FooterSection.tsx (3 occurrences) | 6ce6750 | src/components/sections/FooterSection.tsx |
| 2 | Update CDN link to user-provided URL with opsz axis | 6ce6750 | app/layout.tsx |

## Root Cause
quick-18 set `fontFamily: "var(--font-google-sans)"` which relied on next/font injecting the `--font-google-sans` CSS variable via the wrapper div className. quick-20 removed the next/font import, so the variable was never injected — error at runtime.

## Fix
Since the CDN approach makes 'Google Sans' a global font-family name (not scoped via CSS variable), all inline style references now use the literal string `'Google Sans', sans-serif` directly.
