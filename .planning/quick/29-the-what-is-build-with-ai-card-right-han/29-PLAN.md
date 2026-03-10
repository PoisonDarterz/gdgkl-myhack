---
phase: quick-29
plan: 29
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: [QUICK-29]

must_haves:
  truths:
    - "The diagonal hatch stripe on the right side of the WHAT IS BUILD WITH AI card fills the card's full height"
    - "The card height still grows to fill available left-column space"
    - "No other card layout or content is affected"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Updated WhatIsBAI card with full-height right stripe"
  key_links:
    - from: "outer bordered div"
      to: "inner hatch block"
      via: "flex flex-col -> flex-1 row"
      pattern: "flex flex-col.*flex-1"
---

<objective>
Make the right-hand diagonal hatch stripe inside the WHAT IS BUILD WITH AI card stretch to the full card height.

Purpose: The hatch stripe currently does not fill the card vertically because `h-full` on the inner row requires the parent to have a defined height. Converting the outer bordered div to a flex column container and using `flex-1` on the inner row establishes the correct height chain.
Output: Updated HeroSection.tsx where the hatch stripe visually spans the entire card height.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/HeroSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix hatch stripe full-height in WhatIsBAI card</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
    In the WhatIsBAI bordered box div (around line 198), make two targeted changes:

    1. Add `flex flex-col` to the outer bordered div className so it becomes a flex column container:
       BEFORE: `className="border border-brand-text relative flex-1 lg:min-h-[280px]"`
       AFTER:  `className="border border-brand-text relative flex-1 lg:min-h-[280px] flex flex-col"`

    2. On the inner content row div (around line 205), replace `h-full` with `flex-1` so it fills the flex column parent:
       BEFORE: `className="flex h-full"`
       AFTER:  `className="flex flex-1"`

    No other changes to the file. The hatch block div itself (`w-24 lg:w-36 shrink-0 border-l border-brand-text`) already stretches to fill row height by default flex alignment — no change needed there.

  </action>
  <verify>Run `npm run build` with no TypeScript/lint errors. Visually confirm at localhost:3000 that the diagonal hatch stripe on the right of the WHAT IS BUILD WITH AI card reaches the bottom edge of the card border.</verify>
  <done>The hatch stripe's bottom edge aligns with the card's bottom border at all viewport heights where the card has content height.</done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- On desktop viewport (lg+): hatch stripe fills full card height top-to-bottom
- Card still grows with `flex-1` to fill remaining left column space
- No layout regression on Section A/B/C in the right column
</verification>

<success_criteria>
The right-hand diagonal hatch stripe in the WHAT IS BUILD WITH AI bordered box spans the full height of the card at all content heights.
</success_criteria>

<output>
After completion, create `.planning/quick/29-the-what-is-build-with-ai-card-right-han/29-SUMMARY.md`
</output>
