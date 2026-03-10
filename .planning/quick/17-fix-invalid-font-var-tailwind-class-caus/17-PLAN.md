# Quick Task 17 — Fix invalid font-[var()] Tailwind CSS parse error

## Goal
Exclude `.planning/` from Tailwind v4 content auto-scan to prevent planning docs with literal `font-[var()]` text from generating invalid CSS.

## Root Cause
Tailwind v4 scans all project files automatically. The SUMMARY.md for quick-16 contained `font-[var()]` as shorthand text, which Tailwind tried to generate as `font-weight: var()` — invalid CSS causing a parse error.

## Task 1 — Add @source not exclusions to globals.css

**File:** `app/globals.css`
**Action:** Add `@source not "../.planning/**"` and `@source not "../*.md"` after imports
**Done:** ✅
