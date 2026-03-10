---
task: "fix herosection right card layout and tower image sizing to match figma"
quick: 4
date: "2026-03-08"
status: complete
duration: "1 min"
commits: ["e032b7a"]
key-files:
  modified:
    - src/components/sections/HeroSection.tsx
---

# Quick Task 4 — HeroSection Card Layout Fix Summary

**One-liner:** Converted card to compact Figma-faithful layout with native img towers, tight spacing, and full-width badge/button.

## What Was Done

Fixed the HeroSection right card to match Figma specifications:

1. Replaced Next.js `<Image>` with native `<img>` for twin-towers using `h-full w-auto` — towers now fill card height naturally (~130px), width follows aspect ratio (~70px)
2. Reduced card right content padding from `p-5` to `p-3` and gap from `gap-3` to `gap-2` for tighter layout
3. Set fixed width `w-[240px]` on right content div, removed `justify-between` and `min-w-[200px]` to prevent vertical stretching
4. Made SIGNAL RECEIVED badge full-width by removing `self-start` and adding `text-center`
5. Made REGISTER NOW button full-width by adding `w-full` class

**Result:** Card is now compact (~130px tall), towers are small and proportional, content is tightly packed, badge and button span full width of right panel.

## Tasks Completed

| Task | Description                            | Status | Commit  |
| ---- | -------------------------------------- | ------ | ------- |
| 1    | Fix tower image and card right content | Done   | e032b7a |

## Deviations from Plan

None — plan executed exactly as written.

## Technical Details

**Changed Elements:**

- Twin towers: `<Image width={100} height={160} />` → `<img className="h-full w-auto block shrink-0" />`
- Right content: `gap-3 p-5 justify-between min-w-[200px]` → `gap-2 p-3 w-[240px]`
- Badge: `self-start` → `text-center` (full-width)
- Button: added `w-full` class

**Why native img:** Allows towers to naturally fill card height with auto width, creating the compact proportions seen in Figma. Next.js Image enforces explicit dimensions which was causing oversized rendering.

## Verification

Build passed with no TypeScript errors:

```
✓ Compiled successfully in 2.6s
```

## Files Modified

- `src/components/sections/HeroSection.tsx` — updated right card layout structure and tower image rendering

## Commits

- `e032b7a` — feat(quick-4): fix hero card layout to match figma compact design

## Duration

Total time: 1 min

## Self-Check

Verifying deliverables:

**File check:**

```bash
[ -f "src/components/sections/HeroSection.tsx" ] && echo "FOUND: src/components/sections/HeroSection.tsx" || echo "MISSING: src/components/sections/HeroSection.tsx"
```

**Commit check:**

```bash
git log --oneline --all | grep -q "e032b7a" && echo "FOUND: e032b7a" || echo "MISSING: e032b7a"
```

## Self-Check: PASSED

All files and commits verified present.
