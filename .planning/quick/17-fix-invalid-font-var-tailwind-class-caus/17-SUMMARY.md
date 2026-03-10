# Quick Task 17 — Summary

**Status:** Complete
**Commit:** bae300b

## What was done

Added `@source not` directives to `app/globals.css` to exclude planning docs from Tailwind v4's automatic content scanning.

**Root cause:** Tailwind v4 auto-scans all project files. The quick-16 SUMMARY.md contained the text `font-[var()]` as a shorthand reference, which Tailwind interpreted as an arbitrary class and generated invalid CSS `font-weight: var()` — causing a CSS parse error at build time.

**Fix:** Two `@source not` lines in globals.css:
- `@source not "../.planning/**"` — excludes all planning docs
- `@source not "../*.md"` — excludes root-level markdown files
