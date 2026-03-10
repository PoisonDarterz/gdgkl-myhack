---
phase: quick-11
plan: 11
subsystem: BenefitsSection / LandmarksRow
tags: [animation, client-component, landmarks, benefits-section]
dependency_graph:
  requires: [quick-10]
  provides: [animated-landmarks-row]
  affects: [BenefitsSection]
tech_stack:
  added: []
  patterns: [client-component-boundary, setInterval-cleanup, opacity-fade-transition]
key_files:
  created:
    - src/components/LandmarksRow.tsx
  modified:
    - src/components/sections/BenefitsSection.tsx
decisions:
  - "All 3 slots fade out and back in together (single `visible` boolean) — acceptable since they switch simultaneously"
  - "Slots initialized at offset indices [0,1,2] so each displays a distinct building on first render"
  - "BenefitsSection remains a server component — 'use client' boundary lives only inside LandmarksRow.tsx"
metrics:
  duration: "1 min"
  completed: "2026-03-10"
  tasks_completed: 2
  files_modified: 2
---

# Quick Task 11: Animated City Landmark Icons Row Summary

**One-liner:** Animated LandmarksRow client component cycles 3 KL building SVGs every 3s with opacity fade, replacing a static 3-icon row in BenefitsSection.

## What Was Built

### LandmarksRow component (`src/components/LandmarksRow.tsx`)

A new `"use client"` component rendering a full-width row of 7 elements:
`+  [icon]  +  [icon]  +  [icon]  +`

- Icon pool: `kl-tower.svg`, `twin-towers.svg`, `tmtower.svg`
- 3 slots initialized at indices `[0, 1, 2]` so each shows a different building on load
- `setInterval` at 3000ms advances each slot index `(i + 1) % 3` in lockstep
- Fade transition: `visible` state set to `false` for 150ms, then indices updated and `visible` restored to `true`
- Icon wrapper: `h-[60px] w-[40px]` fixed container with `transition-opacity duration-150` and inline `opacity` style
- All icons: `width=40 height=60 className="opacity-60 object-contain"`
- `clearInterval` cleanup returned from `useEffect`

### BenefitsSection update (`src/components/sections/BenefitsSection.tsx`)

- Added import: `import { LandmarksRow } from "@/src/components/LandmarksRow";`
- Replaced the 26-line static landmarks `<div>` (3 elements: icon + + icon) with a single `<LandmarksRow />`
- No `"use client"` added — server component boundary preserved

## Decisions Made

1. **Single `visible` boolean for all slots:** All 3 icons fade out and in together rather than individually. Acceptable per plan since all slots switch simultaneously on the same interval tick.

2. **Offset initial indices:** Slots start at `[0, 1, 2]` so the initial render shows kl-tower, twin-towers, and tmtower respectively — all different buildings visible at once.

3. **Server/client boundary:** `LandmarksRow` owns `"use client"`. `BenefitsSection` remains a server component, consistent with the established pattern from quick-9.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` — zero errors
- LandmarksRow file has "use client", useState/useEffect imports, setInterval with clearInterval cleanup, and 7-element JSX structure
- BenefitsSection imports LandmarksRow and renders `<LandmarksRow />`, no "use client" directive

## Self-Check: PASSED

- `src/components/LandmarksRow.tsx` — created (commit 3f9ef60)
- `src/components/sections/BenefitsSection.tsx` — modified (commit 8d111e1)
- Both commits verified in git log
