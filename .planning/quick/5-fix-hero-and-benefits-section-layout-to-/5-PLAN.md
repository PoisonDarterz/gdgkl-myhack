---
phase: quick-5
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
  - src/components/sections/BenefitsSection.tsx
autonomous: true
requirements: [quick-5]

must_haves:
  truths:
    - "Hero section has a two-column layout: left col with heading+description, right col with card+system log"
    - "Hero card has twin towers illustration on the left (~21% of card width) and content area on the right (~79%)"
    - "Hero card content: full-width signal received header, then HANDS-ON text, then arrows on left side with register button on right side"
    - "Benefits section shows three vertically stacked rows with no icons — just hash-prefixed title and description"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Hero section with correct two-column layout and card proportions"
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Benefits section with no icons, vertical stack matching Figma"
  key_links:
    - from: "HeroSection"
      to: "right card layout"
      via: "flex row: element-wrapper (towers) + content-wrapper (signal + text + cta row)"
      pattern: "flex.*element-wrapper.*content-wrapper"
---

<objective>
Fix Hero and Benefits sections to match the Figma layout structure.

Purpose: The current implementation deviates from Figma in card proportions, CTA arrangement, and benefits section (has icons that Figma doesn't show).
Output: Updated HeroSection.tsx and BenefitsSection.tsx matching Figma arrangement.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/quick/5-fix-hero-and-benefits-section-layout-to-/5-PLAN.md
@src/components/sections/HeroSection.tsx
@src/components/sections/BenefitsSection.tsx
</context>

<figma_analysis>
From Figma node 193:30 (LANDING frame, 6929px wide):

HERO SECTION (y 0–1600 of frame):
- Two-column flex layout, top-aligned
- LEFT col (x=199, spans ~67% of frame): heading row (icon + "Build With AI" + "KUALA LUMPUR") stacked above description paragraph
- RIGHT col (x=4960, ~27% of frame): card (bordered) stacked above system log
- Card internal layout (total w=1810):
  - element-wrapper LEFT (w=389, ~21%): Twin Towers illustration
  - content RIGHT (w=1421, ~79%): stacked vertically
    - Top header (h=158): "[[ SIGNAL RECEIVED ]]" — full-width dark/inverted bar
    - Below: "HANDS-ON AI TRAINING NEAR YOU." centered text
    - Bottom row: arrows (Frame 45, 3 arrow vectors, left side) + "REGISTER NOW" button (right side) — these are side by side filling width, NOT centered together
- System log (Frame 48) sits below the card, right-aligned with it

BENEFITS SECTION (y 2985+ of frame):
- Header row: [ BENEFITS ] label box + >>> separator + dashed line
- Three rows vertically stacked (Group 63, 64, 65)
- Each row: NO ICON. Title line = "# TITLE_TEXT" then dots (...) pushed right on same line. Description text below.
- Figma benefit groups have NO icon element (no Braces, Sparkle, Heart)
</figma_analysis>

<tasks>

<task type="auto">
  <name>Task 1: Fix HeroSection card layout to match Figma proportions</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
The current right column has `h-15` on the outer div — remove this fixed height. The card needs corrected proportions and CTA row layout:

1. Remove `h-15` from the right column outer div (`shrink-0 flex flex-col gap-4`).

2. Fix card proportions: The card uses `border border-brand-text flex`. Inside it:
   - Towers image wrapper: change from fixed width approach to `w-[21%] shrink-0` (or similar proportional) — ensure twin-towers image fills this column
   - Currently: `<Image className="h-[150px] block shrink-0" width={93} height={80} />` — change to `className="self-stretch object-cover w-[110px] shrink-0"` so towers fill the card height
   - Content div: currently `flex flex-col gap-2 w-70` — remove fixed `w-70`, use `flex-1 flex flex-col`

3. Fix CTA row (arrows + register button): Currently `flex flex-row gap-2 items-center justify-center` — change to `flex flex-row items-center justify-between px-3 pb-3` so arrows sit on LEFT and REGISTER button on RIGHT, filling the content width. The arrows (`→ → →`) stay as text, register button stays as is.

4. Fix HANDS-ON text: should be `text-center` with proper padding — add `px-3 pt-3 pb-1`.

5. The SIGNAL RECEIVED banner wraps the full width of the content column, not just part of it. Ensure it spans the full content div width.

Final card structure:
```
<div className="border border-brand-text flex">
  {/* Twin Towers: left ~110px, fills card height */}
  <Image src="/images/twin-towers.svg" alt="Petronas Twin Towers" className="self-stretch object-contain shrink-0 w-[110px]" width={93} height={150} />

  {/* Content: flex-1 */}
  <div className="flex-1 flex flex-col">
    {/* Signal received header - full width bar */}
    <span className="font-mono text-white bg-brand-text px-3 py-2.5 text-sm tracking-widest uppercase text-center block">
      {isDouble ? "[[ SIGNAL RECEIVED ]]" : "[ SIGNAL RECEIVED ]"}
    </span>

    {/* HANDS-ON text */}
    <p className="font-mono text-brand-text text-xs tracking-widest uppercase font-bold italic text-center px-3 pt-3 pb-1">
      HANDS-ON AI TRAINING NEAR YOU.
    </p>

    {/* CTA row: arrows LEFT, button RIGHT */}
    <div className="flex flex-row items-center justify-between px-3 pb-3">
      <p className="font-mono text-brand-text text-sm tracking-wider">→ → →</p>
      <a href="#" className="inline-block bg-[#8CFF81] text-black font-bold font-mono text-sm tracking-widest uppercase px-6 py-3 hover:bg-green-800 transition-colors duration-200">
        REGISTER NOW
      </a>
    </div>
  </div>
</div>
```
  </action>
  <verify>Run `npm run build` with no TypeScript errors. Visually confirm: card has towers on left, signal header spanning full width, arrows left + register button right in bottom row.</verify>
  <done>Card proportions match Figma: towers column narrow on left, content fills right, CTA row has arrows flush-left and register button flush-right.</done>
</task>

<task type="auto">
  <name>Task 2: Remove icons from BenefitsSection to match Figma</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
The Figma benefits section has NO icons — only hash-prefixed titles and descriptions. Remove the icon infrastructure entirely:

1. Remove the `import { Braces, Sparkle, Heart } from "lucide-react"` line.

2. Remove `Icon` and `iconClass` from the benefits array objects — simplify to just `{ title, description }`.

3. In the rendered card, remove the icon `<div>` wrapper entirely (the `<div className="mt-0.5 shrink-0"><Icon ... /></div>`).

4. The text content div currently has no left margin — keep it as is since there's no icon to offset against.

5. The layout stays vertical stack with dashed dividers — that matches Figma.

Final card rendering:
```tsx
<div key={title} className="flex flex-col py-5">
  <h3 className="font-mono text-sm font-bold text-brand-text mb-2">
    # {title}{" "}
    <span className="font-normal text-brand-muted/50 tracking-widest">·········</span>
  </h3>
  <p className="font-mono text-xs text-brand-muted leading-relaxed">
    {description}
  </p>
</div>
```

Keep `divide-y divide-dashed divide-brand-muted/30` on the container — that matches the dashed separators between benefit rows in Figma.
  </action>
  <verify>Run `npm run build` with no TypeScript errors. Visually confirm: benefits section shows three rows, each with only `# TITLE ·········` heading and description, no icons.</verify>
  <done>Benefits section renders three rows with no Lucide icons, matching Figma's icon-free layout.</done>
</task>

</tasks>

<verification>
After both tasks:
1. `npm run build` passes with no errors
2. Hero card: towers on left narrow column, full-width signal header, HANDS-ON text centered, arrows LEFT + REGISTER RIGHT in bottom row
3. Benefits: three vertical rows, no icons, hash-title + dots + description
</verification>

<success_criteria>
- Hero right card matches Figma card proportions and CTA row arrangement
- Benefits section has no icons — title-only rows matching Figma
- No TypeScript or build errors
</success_criteria>

<output>
After completion, create `.planning/quick/5-fix-hero-and-benefits-section-layout-to-/5-SUMMARY.md`
</output>
