---
phase: quick-28
plan: 28
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: [QUICK-28]

must_haves:
  truths:
    - "On desktop (lg breakpoint), the WHAT IS BUILD WITH AI card occupies substantially more vertical space than on mobile"
    - "The text inside the card is legible and proportional to the card's size on desktop"
    - "The card still stretches to fill the left column's remaining height"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "WhatIsBAI card with enlarged desktop appearance"
      contains: "lg:min-h"
  key_links:
    - from: "src/components/sections/HeroSection.tsx"
      to: "WhatIsBAI bordered div"
      via: "ref={sectionRef} with border border-brand-text"
      pattern: "sectionRef.*border border-brand-text"
---

<objective>
Make the "WHAT IS BUILD WITH AI" bordered card visually larger on desktop viewport.

Purpose: The card currently renders at minimum content height on desktop because `text-sm` produces a compact text block and there is no minimum height constraint. On desktop the card should feel substantial and fill its column space.
Output: Updated `HeroSection.tsx` where the WhatIsBAI card has a minimum height at `lg`, larger body text, and increased inner padding on desktop.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/HeroSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Enlarge WhatIsBAI card on desktop</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
In `src/components/sections/HeroSection.tsx`, make the following targeted changes to the WhatIsBAI bordered box (the div at line ~198 with `ref={sectionRef}`):

1. **Card outer div** — add `lg:min-h-[280px]` so the card has a guaranteed minimum height on desktop regardless of how much text has typed in:

   ```
   // Before
   <div ref={sectionRef} className="border border-brand-text relative flex-1">
   // After
   <div ref={sectionRef} className="border border-brand-text relative flex-1 lg:min-h-[280px]">
   ```

2. **Inner content padding** — increase left content area padding on desktop (`lg:p-7 lg:pt-8`) so the text has more breathing room:

   ```
   // Before
   <div className="flex-1 p-5 pt-6">
   // After
   <div className="flex-1 p-5 pt-6 lg:p-7 lg:pt-8">
   ```

3. **Paragraph font size** — scale up from `text-sm` to `lg:text-base` on desktop so the text fills the card proportionally:

   ```
   // Before
   <p className="font-mono text-sm leading-relaxed text-brand-text">
   // After
   <p className="font-mono text-sm lg:text-base leading-relaxed text-brand-text">
   ```

4. **Hatch column width** — widen slightly on desktop (`lg:w-36` instead of `lg:w-32`) to match the larger card:
   ```
   // Before
   className="w-24 lg:w-32 shrink-0 border-l border-brand-text"
   // After
   className="w-24 lg:w-36 shrink-0 border-l border-brand-text"
   ```

Do NOT change any mobile classes, animation logic, or other sections. Only modify these four class strings.
</action>
<verify>
Run `npm run build` in the project root — must complete with no TypeScript or build errors.
Then run `npm run dev` and open http://localhost:3000 at a desktop viewport (≥1024px). Confirm:

- The WHAT IS BUILD WITH AI card is visually taller and more prominent than at mobile width
- Text inside the card is readable at the larger size
- The hatch column on the right side of the card is still visible
- The left column (heading + description + card) still aligns with the right column content
  </verify>
  <done>
  At desktop viewport the WHAT IS BUILD WITH AI card has a minimum height of 280px, the body text renders at text-base size, and inner padding is increased. Build passes with zero errors.
  </done>
  </task>

</tasks>

<verification>
`npm run build` passes. At lg+ viewport the WhatIsBAI card is noticeably larger than on mobile — minimum 280px tall with proportional text and padding.
</verification>

<success_criteria>

- `npm run build` exits 0
- WhatIsBAI card at desktop viewport is visually substantial (min-h-[280px] enforced)
- Font size inside card scales up on desktop (text-base at lg)
- No regressions to mobile layout
  </success_criteria>

<output>
After completion, create `.planning/quick/28-what-is-build-with-ai-card-need-to-be-la/28-SUMMARY.md`
</output>
