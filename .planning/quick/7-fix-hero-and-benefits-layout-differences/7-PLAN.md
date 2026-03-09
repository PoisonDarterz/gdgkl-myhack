---
phase: quick-7
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
  - app/page.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "KUALA LUMPUR appears inline on the same row as the Build With AI heading, smaller text to its right"
    - "// WHAT IS BUILD WITH AI? bordered box with typewriter text and diagonal hatch appears in the hero left column below the description"
    - "Right column signal card contains only: signal header + twin towers + HANDS-ON + arrows + REGISTER NOW + SYSTEM LOG"
    - "Stats (globe + 2,258, people + 178,000) appear as standalone items BELOW the signal card in the right column, outside any card border"
    - "RECAP VIDEO card appears below the stats in the right column, outside the signal card border"
    - "WhatIsBAISection is no longer rendered as a separate section in page.tsx"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Updated hero with inline KL, inline WhatIsBAI content, restructured right column"
    - path: "app/page.tsx"
      provides: "Mid-sections grid without WhatIsBAISection"
  key_links:
    - from: "HeroSection.tsx left column"
      to: "WhatIsBAI bordered box"
      via: "inlined JSX with typewriter animation (moved from WhatIsBAISection.tsx)"
      pattern: "WHAT IS BUILD WITH AI"
    - from: "HeroSection.tsx right column"
      to: "stats + recap video"
      via: "flex flex-col items outside the bordered card div"
      pattern: "2,258|178,000"
---

<objective>
Restructure HeroSection to match Figma layout: KUALA LUMPUR inline with heading, WhatIsBAI content inside the hero left column, and right column stats + recap video extracted outside the signal card border.

Purpose: Current implementation has KUALA LUMPUR on its own line, WhatIsBAI as a separate page section, and all right column content locked inside one card — none of which matches Figma.
Output: Updated HeroSection.tsx with correct layout, page.tsx without standalone WhatIsBAI section.
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
  <name>Task 1: Restructure HeroSection — inline KL, extract stats/recap, shrink card</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
    Make the following changes to HeroSection.tsx:

    1. **KUALA LUMPUR inline with heading:** In the heading row div (currently `flex items-end gap-4`), add KUALA LUMPUR as a sibling span inside that same flex row, to the right of the h1. Remove the standalone `<span>` block that currently renders KUALA LUMPUR on its own line below the heading.
       - Example structure: `<div className="flex items-end gap-4"> <Image .../> <h1>Build With AI</h1> <span className="font-retro text-xl tracking-widest ...">KUALA LUMPUR</span> </div>`
       - Keep the existing font-retro/tracking-widest/uppercase classes on the span.

    2. **Move WhatIsBAI content into left column:** After the description paragraph `<p>`, add the full WhatIsBAI bordered box inline. This means:
       - Copy the JSX from WhatIsBAISection.tsx: the outer `<div ref={sectionRef} className="border border-brand-text relative">` with the legend title, the text paragraph with typewriter cursor, and the diagonal hatch block.
       - Bring in the required state and refs: `displayedText`, `animating`, `hasAnimated`, `sectionRef`.
       - Bring in the FULL_TEXT constant and both useEffect hooks (IntersectionObserver + character timer) from WhatIsBAISection.tsx.
       - The animation logic is identical — just co-locate it in HeroSection's existing "use client" component.
       - Use `bg-background` for the legend title background (same as WhatIsBAISection).
       - Keep typewriter speed at 18ms intervals, threshold at 0.3.

    3. **Extract stats and recap video OUTSIDE the card border:**
       - The right column outer div currently wraps everything in `<div className="border border-brand-text flex flex-col">`.
       - Change the right column to be a `flex flex-col gap-0` wrapper (keep existing `w-[420px] shrink-0`), with the bordered card containing ONLY sections A (towers + CTA) and B (system log).
       - Remove Section C (stats row) and Section D (recap video) from inside the bordered card div.
       - After the closing tag of the bordered card, add the stats and recap video as separate items in the right column flex container.

    4. **Stats outside card — large standalone numbers:** Render each stat as a full-width row below the card:
       - Globe SVG + large `2,258` number + "global events organized" label. Display number large (e.g. `text-2xl font-bold font-mono`) with label below it (`text-xs text-brand-muted`). Add `border-t border-brand-text` top divider and `px-4 py-3` padding.
       - People SVG + large `178,000` + "developers trained" label. Same treatment. Add `border-t border-brand-text`.
       - Keep existing SVG paths verbatim from the current Section C markup.

    5. **Recap video outside card:** Move the recap video div (current Section D) directly after the stats, as another child of the right column flex container. Add `border-t border-brand-text` to connect visually (it already has this in the current markup since it was border-t inside the card — keep it or wrap the whole right column in a border if that looks cleaner, but a border-t on the recap div is sufficient).

    Do NOT change Section A (towers + CTA + signal) or Section B (system log) — only extract C and D.
  </action>
  <verify>
    Run `npm run build` — must compile with no TypeScript errors.
    Check browser at localhost:3000 — left column should show heading with KUALA LUMPUR inline, then description, then "// WHAT IS BUILD WITH AI?" bordered box with typewriter animation. Right column card should only show signal header/towers/CTA/system-log. Stats and recap video appear below the card border, not inside it.
  </verify>
  <done>
    KUALA LUMPUR is on the same flex row as the h1. The WhatIsBAI bordered box with typewriter animation appears in the hero left column. The right column card border wraps only the signal + system log area. Stats (2,258 / 178,000) and recap video render below the card as separate items. Build passes with zero TS errors.
  </done>
</task>

<task type="auto">
  <name>Task 2: Remove WhatIsBAISection from page.tsx mid-sections grid</name>
  <files>app/page.tsx</files>
  <action>
    In page.tsx, the WhatIsBAI content now lives inside HeroSection. Update the mid-sections grid:

    1. Remove the `<WhatIsBAISection />` JSX element from the left column div inside the mid-sections grid.
    2. Remove the `WhatIsBAISection` import from the import block at the top.
    3. The mid-sections grid left column now contains only `<BenefitsSection />`.
    4. Do NOT change the grid structure itself (`grid-cols-1 lg:grid-cols-[3fr_2fr]`), the StatsSection, or anything else.

    The WhatIsBAISection.tsx file itself can remain on disk — do not delete it. Just stop importing and rendering it.
  </action>
  <verify>
    Run `npm run build` — must compile with no TypeScript errors or unused-import warnings that break the build.
    Check browser — WhatIsBAI content should NOT appear as a standalone section between Hero and Benefits. It should only appear inside the hero left column.
  </verify>
  <done>
    WhatIsBAISection is not imported or rendered in page.tsx. Build passes. No duplicate WhatIsBAI content on page.
  </done>
</task>

</tasks>

<verification>
After both tasks:
- `npm run build` passes with zero errors
- Hero left column: icon + "Build With AI" + "KUALA LUMPUR" (inline, same row) → description paragraph → "// WHAT IS BUILD WITH AI?" bordered box with diagonal hatch and typewriter animation
- Hero right column: bordered card (signal header + twin towers + HANDS-ON + arrows + REGISTER NOW + SYSTEM LOG) → stats row (globe + 2,258 / people + 178,000) outside card → recap video outside card
- page.tsx mid-sections grid: BenefitsSection + StatsSection only (no WhatIsBAI)
</verification>

<success_criteria>
Layout matches Figma: KUALA LUMPUR inline with heading, WhatIsBAI inside hero left column, right column card trimmed to signal+log only, stats and recap video below card border as standalone items.
</success_criteria>

<output>
After completion, create `.planning/quick/7-fix-hero-and-benefits-layout-differences/7-SUMMARY.md`
</output>
