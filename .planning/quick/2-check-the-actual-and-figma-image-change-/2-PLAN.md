---
phase: quick-2
plan: 2
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Hero section height is compact like Figma — no excessive vertical whitespace"
    - "Twin Towers illustration is smaller, keeping the card proportions tight"
    - "HANDS-ON AI TRAINING NEAR YOU. text is bold and italic, matching Figma"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Updated hero with corrected proportions and text styling"
  key_links:
    - from: "section className"
      to: "py-20 → py-8"
      via: "Tailwind padding class change"
    - from: "Image twin-towers"
      to: "height={260} → height={160}, width={160} → width={100}"
      via: "Next.js Image props"
    - from: "HANDS-ON paragraph"
      to: "add font-bold italic"
      via: "Tailwind class addition"
---

<objective>
Fix three visual discrepancies in HeroSection between the Figma design and the actual rendered output.

Purpose: The actual hero is significantly taller than Figma due to oversized Twin Towers and excessive section padding. The "HANDS-ON AI TRAINING NEAR YOU." text also lacks the bold+italic weight visible in Figma.
Output: HeroSection.tsx with corrected padding, image size, and text styling that visually matches the Figma reference.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

@src/components/sections/HeroSection.tsx

Visual reference — Figma: e:/Programming/Projects/myhack/public/temp/figma.png
Visual reference — Actual: e:/Programming/Projects/myhack/public/temp/actual.png
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix HeroSection proportions and text styling to match Figma</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
    Three targeted changes in HeroSection.tsx:

    1. Section vertical padding — change `py-20` to `py-8` on the outer `<section>` element.
       Reason: py-20 = 80px each side, Figma shows a compact banner-height hero strip.

    2. Twin Towers image size — change `width={160} height={260}` to `width={100} height={160}`.
       Reason: Current 260px height forces the card to be very tall. Figma shows compact towers.
       Keep the existing alt text and other props unchanged.

    3. "HANDS-ON AI TRAINING NEAR YOU." paragraph — add `font-bold italic` to its className.
       Current: `className="font-mono text-brand-text text-xs tracking-widest uppercase"`
       Updated: `className="font-mono text-brand-text text-xs tracking-widest uppercase font-bold italic"`
       Reason: Figma clearly shows this text as heavier weight and slanted.

    Do NOT change anything else — layout structure, other classes, file imports, or other text content must remain identical.

  </action>
  <verify>
    Run the dev server and visually inspect the hero section at localhost:3000.
    The section should be compact (similar height to Figma), the towers smaller, and the training text bold+italic.
    Alternatively: `npx tsc --noEmit` should pass with no type errors.
  </verify>
  <done>
    - Section height is compact, no large whitespace gap between hero bottom and next section
    - Twin Towers illustration is noticeably smaller within the card
    - "HANDS-ON AI TRAINING NEAR YOU." renders bold and italic
    - No TypeScript errors introduced
  </done>
</task>

</tasks>

<verification>
After applying changes, the actual screenshot should closely match the Figma:
- Compact horizontal strip, not a tall vertical block
- Twin Towers proportionally sized within the bordered card
- Training text visually distinct with bold+italic weight
</verification>

<success_criteria>
HeroSection renders with the same compact proportions as the Figma reference. All three discrepancies (padding, image size, text styling) are corrected in a single file with minimal diff.
</success_criteria>

<output>
After completion, create `.planning/quick/2-check-the-actual-and-figma-image-change-/2-SUMMARY.md`
</output>
