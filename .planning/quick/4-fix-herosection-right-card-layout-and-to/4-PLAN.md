---
task: "fix herosection right card layout and tower image sizing to match figma"
quick: 4
date: "2026-03-08"
---

# Quick Task 4 — Fix HeroSection Right Card Layout

## Goal

Match the figma target: compact right-side card (~130px tall), twin towers image small and auto-height, right content tightly packed with full-width signal badge and full-width button.

## Diff Analysis (actual vs figma)

| Element               | Actual (broken)                                 | Figma (target)                                        |
| --------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| Twin towers image     | Renders oversized (~200px wide, card very tall) | Small, fills card height with auto width (~70px wide) |
| Card height           | ~350px (way too tall)                           | ~125-130px (compact)                                  |
| Right content padding | `p-5` (too much)                                | Tight, ~`p-3`                                         |
| Right content spacing | `justify-between` over large height = stretched | Tight stacked, no stretch                             |
| SIGNAL RECEIVED badge | `self-start` (partial width)                    | Full-width across right panel                         |
| REGISTER NOW button   | Not full-width                                  | Full-width across right panel                         |

## Tasks

### Task 1 — Fix tower image and card right content

**File:** `src/components/sections/HeroSection.tsx`

**Changes:**

1. Replace `<Image>` (Next.js) for twin-towers with native `<img>` using `className="h-full w-auto block shrink-0"` — lets towers fill card height naturally, width follows aspect ratio
2. On the card right content div: remove `justify-between` and `min-w-[200px]`, use `flex flex-col gap-2 p-3` with a fixed width `w-[240px]`
3. On SIGNAL RECEIVED badge span: remove `self-start`, add `text-center` — spans full width of right panel
4. On REGISTER NOW anchor: add `w-full` — spans full width of right panel

**Verify:** Card matches figma — compact height, small towers, tight right content.
**Done:** Build passes, no TS errors.
