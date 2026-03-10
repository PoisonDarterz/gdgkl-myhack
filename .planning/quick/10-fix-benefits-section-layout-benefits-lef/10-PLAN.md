---
phase: quick-10
plan: 10
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/BenefitsSection.tsx
autonomous: true
requirements:
  - QUICK-10
must_haves:
  truths:
    - "Benefits list and video card are side by side (flex row, justify-between)"
    - "City landmarks row spans full section width below the two-column row"
    - "Left column contains ONLY the benefits header and 3 benefit items"
  artifacts:
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Updated BenefitsSection with landmarks moved to full-width row"
      contains: "landmarks-row as sibling div after the flex-row container"
  key_links:
    - from: "left column div"
      to: "benefits list only"
      via: "city landmarks div removed from inside left col"
      pattern: "City landmarks row.*moved outside"
---

<objective>
Move the city landmarks row out of the left column in BenefitsSection so it spans the full section width as a separate row below the benefits+video two-column layout.

Purpose: Landmarks currently constrained to left-column width — moving to full width gives them proper visual weight matching the Figma design.
Output: BenefitsSection.tsx with landmarks as a full-width sibling row below the two-column flex container.
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
  <name>Task 1: Move city landmarks div to full-width row in BenefitsSection</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
In `BenefitsSection`, make two edits:

1. Remove the "City landmarks row" `<div>` (lines 213–239) from inside the left column `<div className="min-w-0 flex flex-col">`. The left column should end after the benefits list closing `</div>` (after the `.map(...)` block).

2. Add the landmarks `<div>` as a sibling AFTER the two-column flex row `</div>` closes, but still inside `<section>`. Use the same classes and content as before:

```tsx
{/* City landmarks row — full width */}
<div className="flex items-end justify-center gap-4 border-t border-dashed border-brand-muted/40 mt-2 pt-4 pb-2">
  <Image
    src="/images/kl-tower.svg"
    alt="KL Tower"
    width={32}
    height={60}
    className="object-contain opacity-60"
  />
  <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
  <Image
    src="/images/twin-towers.svg"
    alt="Petronas Twin Towers"
    width={40}
    height={60}
    className="object-contain opacity-60"
  />
  <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
  <Image
    src="/images/kl-tower.svg"
    alt=""
    aria-hidden
    width={32}
    height={60}
    className="object-contain opacity-60"
  />
</div>
```

The resulting JSX structure should be:
```
<section>
  <div className="flex flex-row justify-between">   ← two-col row
    <div className="min-w-0 flex flex-col">         ← left: benefits only
      header row
      benefits list
    </div>
    <div className="w-75 shrink-0 self-stretch">    ← right: video card
      <RecapVideoCard />
    </div>
  </div>
  <div className="flex items-end justify-center ..."> ← landmarks full-width
    ...
  </div>
</section>
```

No other changes — keep all existing classes, content, and component definitions exactly as-is.
  </action>
  <verify>Run `npx tsc --noEmit` with no errors. Visually confirm in browser: landmarks row stretches full section width below both benefits and video columns.</verify>
  <done>Landmarks row spans full section width; left column contains only the benefits header and 3 benefit items; video card unchanged on the right.</done>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` exits with no errors
- BenefitsSection renders with two-column row (benefits left, video right) followed by full-width landmarks row
- No JSX structure or content changes beyond the landmarks relocation
</verification>

<success_criteria>
City landmarks row (KL Tower + Petronas + KL Tower) is a full-width element below the benefits+video row, not constrained to the left column.
</success_criteria>

<output>
After completion, create `.planning/quick/10-fix-benefits-section-layout-benefits-lef/10-SUMMARY.md`
</output>
