---
phase: quick-30
plan: 30
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/BenefitsSection.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "Benefit icons are visibly smaller on mobile viewport"
    - "Benefit icons remain full size on desktop viewport"
  artifacts:
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Responsive benefit icons"
  key_links:
    - from: "BenefitIcon component"
      to: "next/image className prop"
      via: "Tailwind responsive size classes"
      pattern: "w-\\d+ sm:w-\\[100px\\]"
---

<objective>
Make the benefit section icons (braces, gemini, heart) smaller on mobile viewport.

Purpose: The icons are currently fixed at 100x100px on all screen sizes, which is too large on mobile.
Output: Icons display at ~56px on mobile and 100px on sm+ breakpoints.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add responsive size classes to benefit icons</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
    In the `BenefitIcon` function, add a `className` prop to each `Image` component to control size responsively.

    Change all three Image instances from fixed `width={100} height={100}` to include a responsive className:

    ```tsx
    function BenefitIcon({ icon }: { icon: string }) {
      if (icon === "braces") return <Image src={"/images/braces.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
      if (icon === "sparkle") return <Image src={"/images/gemini.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
      if (icon === "heart") return <Image src={"/images/heart.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
      return null;
    }
    ```

    `w-14 h-14` = 56px on mobile (below `sm` breakpoint, i.e. < 640px).
    `sm:w-[100px] sm:h-[100px]` = 100px on sm and above.

    Keep `width={100} height={100}` as intrinsic props for next/image layout calculation — the CSS classes override the rendered size.

  </action>
  <verify>Run `npm run build` (or dev server) and inspect the benefits section at a mobile viewport (< 640px) — icons should be 56px. At desktop width they should be 100px.</verify>
  <done>Benefit icons render at 56px on mobile and 100px on sm+ breakpoints with no layout breakage.</done>
</task>

</tasks>

<verification>
At mobile viewport (< 640px): benefit icons are noticeably smaller than 100px.
At desktop viewport (>= 640px): benefit icons remain at 100px.
No build errors.
</verification>

<success_criteria>
All three benefit icons (braces, gemini, heart) are 56px on mobile and 100px on desktop.
</success_criteria>

<output>
After completion, create `.planning/quick/30-for-the-benefits-section-make-the-image-/30-SUMMARY.md`
</output>
