---
id: quick-21
description: fix --font-google-sans is not defined by loading Google Sans via correct CDN link tags
mode: quick
---

# Quick Task 21: Fix --font-google-sans is not defined

## Root Cause
FooterSection.tsx uses `var(--font-google-sans)` inline style which was injected by next/font/google. Since quick-20 removed the next/font import and switched to CDN, `--font-google-sans` CSS variable no longer exists. The CDN approach makes 'Google Sans' a global font-family name — no CSS variable needed.

## Tasks

### Task 1: Fix FooterSection.tsx font references
- **File:** `src/components/sections/FooterSection.tsx`
- **Action:** Replace all 3 occurrences of `fontFamily: "var(--font-google-sans)"` with `fontFamily: "'Google Sans', sans-serif"`
- **Done:** No more `--font-google-sans` references in FooterSection.tsx

### Task 2: Update CDN link tags to user-provided URL
- **File:** `app/layout.tsx`
- **Action:** Replace existing CDN link with the exact links the user provided:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet">
  ```
  Note: In JSX, `crossorigin` → `crossOrigin="anonymous"`
- **Done:** CDN link matches user-specified URL exactly
