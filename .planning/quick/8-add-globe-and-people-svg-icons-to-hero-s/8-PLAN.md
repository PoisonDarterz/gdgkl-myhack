---
phase: quick-8
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: [quick-8]

must_haves:
  truths:
    - "Globe (earth.svg) icon appears to the left of the 2,258 stat row"
    - "People (people.svg) icon appears to the left of the 178,000 stat row"
    - "Icons are large (~80-100px), matching Figma prominence"
    - "Left and right hero columns have equal visual height"
    - "Right column content spaces out vertically to fill height (signal card top, stats middle, recap bottom)"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Updated hero with icon stats and equal-height columns"
  key_links:
    - from: "HeroSection right column stats"
      to: "public/images/earth.svg"
      via: "<Image src='/images/earth.svg'>"
    - from: "HeroSection right column stats"
      to: "public/images/people.svg"
      via: "<Image src='/images/people.svg'>"
---

<objective>
Add earth.svg and people.svg icons to the two hero stat rows, and make the left and right hero columns equal height.

Purpose: Match the Figma design where large SVG icons sit left of each stat number and both columns span the same vertical height.
Output: Updated HeroSection.tsx with icon stats and stretched equal-height columns.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/PROJECT.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add SVG icons to stats and equalize column heights in HeroSection</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
The stats are currently rendered by `<StatsSection />` imported from `./StatsSection`. That component has its own large padding (`py-20`, `max-w-4xl`) and is a full-page standalone section — it is not suited for inline use inside the hero right column.

Replace the `<StatsSection />` usage inside HeroSection with inline stat markup directly in the right column. The inline stats should:
- Be two rows (one for 2,258 / one for 178,000), each a `flex flex-row items-center gap-4` div
- Left of each row: an `<Image>` tag — `earth.svg` for the first stat, `people.svg` for the second — width/height 80 (use `width={80} height={80}`, `className="shrink-0"`)
- Right of icon: a `flex flex-col` with the animated count number (font-display, large text) and the label below it (font-mono, small, muted, uppercase)
- The count-up animation state (`events`, `devs`) and IntersectionObserver logic should be moved from StatsSection into HeroSection directly (or kept in StatsSection if it can be refactored, but inline is simpler here). Move the `events`/`devs` state and the useEffect with the observer from StatsSection.tsx into HeroSection.tsx, attaching the observer to `sectionRef` (already present) or a new `statsRef`.
- Remove the `<StatsSection />` import and component usage from HeroSection.

Also add a placeholder RECAP VIDEO card below the stats (a bordered div with `font-mono text-xs` label `[ RECAP VIDEO ]` and a hatched or grey fill, matching the Figma bottom-right card). This was previously planned but may not yet exist — add it as a simple bordered placeholder with text.

Equal column heights:
- Change the outer `<section>` flex container from `items-start` to `items-stretch`
- Left column: change from `flex flex-col gap-6` to `flex flex-col gap-6 justify-between` so the WhatIsBAI box grows/fills remaining space. Add `h-full` to the left column div.
- Right column: change its wrapper `div` to also `flex flex-col h-full justify-between` (or keep `gap-0` and let content fill). The right column's inner flex column (currently `flex flex-col gap-0`) should use `justify-between` so the card is at top, stats in middle, recap at bottom.

Do NOT remove StatsSection.tsx — it may still be used as a standalone section elsewhere in page.tsx. Only remove its usage from HeroSection. Check page.tsx imports before removing anything.

Keep the existing count-up animation behavior (start on scroll into view, run once, 60 increments over ~1.5s).
  </action>
  <verify>
Run `npm run build` — must complete with no TypeScript errors.
Visually: both columns reach the same bottom edge, earth.svg appears left of 2,258, people.svg appears left of 178,000, icons are ~80px.
  </verify>
  <done>
`npm run build` exits 0. In the browser, left and right hero columns share equal height. The globe icon is visible and large to the left of "2,258 / global events organized". The people icon is visible and large to the left of "178,000 / developers trained".
  </done>
</task>

</tasks>

<verification>
- `npm run build` passes with no errors
- No TypeScript import errors (StatsSection import removed from HeroSection if unused there)
- page.tsx still imports StatsSection for the standalone stats section below the hero (verify it is untouched)
</verification>

<success_criteria>
earth.svg and people.svg icons are displayed at ~80px to the left of their respective stat numbers in the hero right column. Left and right hero columns have visually equal height. Build passes.
</success_criteria>

<output>
After completion, create `.planning/quick/8-add-globe-and-people-svg-icons-to-hero-s/8-SUMMARY.md`
</output>
