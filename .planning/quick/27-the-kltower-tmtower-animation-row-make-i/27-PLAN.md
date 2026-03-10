---
phase: quick-27
plan: 27
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/LandmarksRow.tsx
autonomous: true
requirements: [quick-27]

must_haves:
  truths:
    - "LandmarksRow is visibly shorter and narrower on mobile viewports"
    - "LandmarksRow retains its current size on sm+ (desktop) viewports"
    - "Building icons and union separators remain proportionally scaled"
  artifacts:
    - path: "src/components/LandmarksRow.tsx"
      provides: "Responsive landmarks animation row"
  key_links:
    - from: "LandmarksRow container"
      to: "building slot divs"
      via: "Tailwind responsive prefixes (sm:)"
      pattern: "sm:w-12\\.5|sm:min-h"
---

<objective>
Reduce the KL Tower / TM Tower animation row height and icon sizes on mobile viewports so the row is compact on small screens without changing desktop appearance.

Purpose: The row is currently oversized on mobile — min-h-32 (128px) container with 50px-wide icon slots takes up disproportionate vertical space on narrow screens.
Output: Responsive LandmarksRow that is compact on mobile and full-size on sm+.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/LandmarksRow.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add responsive sizing to LandmarksRow</name>
  <files>src/components/LandmarksRow.tsx</files>
  <action>
Edit `src/components/LandmarksRow.tsx` to apply mobile-first responsive sizing:

1. **Container div** (line 44): change `min-h-32 sm:min-h-50` to `min-h-16 sm:min-h-32`.
   This drops mobile row height from 128px to 64px; desktop stays at the current 128px.

2. **Each building slot div** (three of them, lines 47, 63, 77): change `w-12.5` to `w-7 sm:w-12.5`.
   This narrows icon slots from 50px to 28px on mobile.

3. **UnionIcon inner div** (inside the `UnionIcon` component, line 13): change `w-10 h-10` to `w-5 h-5 sm:w-10 sm:h-10`.
   Separator icons scale down proportionally on mobile.

4. **UnionIcon Image** (line 16): change `width={36} height={36}` to `width={20} height={20}`.
   Keeps the intrinsic pixel hint in sync with the new smaller CSS container on mobile.
   Note: Since this Image drives both breakpoints from one prop, set it to the smaller size and let CSS contain it — the `object-contain` CSS already handles upscaling in the larger sm: container. Alternatively keep at 36/36 to preserve desktop sharpness. Prefer keeping 36/36 and relying on CSS container shrinking.

Summary of class changes:

- Container: `min-h-16 sm:min-h-32 flex items-center justify-around w-full mt-6 border-brand-muted/40`
- Building slots: `transition-opacity duration-150 w-7 sm:w-12.5 flex items-end justify-center overflow-hidden`
- UnionIcon wrapper: `flex items-center justify-center w-5 h-5 sm:w-10 sm:h-10`
  </action>
  <verify>Run `npm run build` (or open dev server) and inspect on a mobile viewport (375px width). The landmarks row should be noticeably shorter — approximately half the height — with smaller icon slots and separator icons.</verify>
  <done>On mobile (375px), the LandmarksRow row height is ~64px and icon slots are 28px wide. On desktop (640px+), the row is 128px tall with 50px-wide slots. No layout overflow or clipped icons.</done>
  </task>

</tasks>

<verification>
Visually check at two breakpoints:
- Mobile (375px): row is compact, icons are small, no overflow
- Desktop (1024px): row matches prior appearance, no regression
</verification>

<success_criteria>
LandmarksRow is at least 40% shorter on mobile viewport compared to current, and desktop layout is unchanged.
</success_criteria>

<output>
After completion, create `.planning/quick/27-the-kltower-tmtower-animation-row-make-i/27-SUMMARY.md` summarising the changes made.
</output>
