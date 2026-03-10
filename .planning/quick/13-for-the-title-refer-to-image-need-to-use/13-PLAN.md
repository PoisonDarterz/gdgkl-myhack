---
phase: quick-13
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/BenefitsSection.tsx
  - src/components/sections/TimelineSection.tsx
  - src/components/sections/PartnersSection.tsx
  - src/components/sections/FAQSection.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Every section title (BENEFITS, TIMELINE, PARTNERS, FAQ) renders with a dark/black filled background"
    - "Section title text is large, bold, and white — visually prominent, not a small pill badge"
    - "The dashed line separator to the right of each title is preserved"
  artifacts:
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "BENEFITS section title with dark bg + large text"
    - path: "src/components/sections/TimelineSection.tsx"
      provides: "TIMELINE section title with dark bg + large text"
    - path: "src/components/sections/PartnersSection.tsx"
      provides: "PARTNERS section title with dark bg + large text"
    - path: "src/components/sections/FAQSection.tsx"
      provides: "FAQ section title with dark bg + large text"
  key_links:
    - from: "header row div"
      to: "section label span"
      via: "className bg-brand-text text-white"
      pattern: "bg-brand-text.*text-white"
---

<objective>
Replace the small bordered-pill section title style with a dark-background large bold white text style across all four sections: Benefits, Timeline, Partners, and FAQ.

Purpose: Match the Figma design intent shown in the screenshot — section titles should be visually dominant, dark-filled blocks with large white text rather than small inline pill badges.
Output: All four section header rows updated to use the new style.
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
  <name>Task 1: Update section title header rows in all four sections</name>
  <files>
    src/components/sections/BenefitsSection.tsx
    src/components/sections/TimelineSection.tsx
    src/components/sections/PartnersSection.tsx
    src/components/sections/FAQSection.tsx
  </files>
  <action>
In each of the four files, replace the existing header row div with the new dark-background large-text style.

Current pattern (identical in all four sections):
```jsx
<div className="flex items-center gap-3 mb-6">
  <span className="font-mono text-xs font-bold border border-brand-text px-2 py-0.5 tracking-wider">
    [ SECTION NAME ]
  </span>
  <span className="font-mono text-xs text-brand-muted tracking-widest">{`>>>`}</span>
  <div className="flex-1 border-t border-dashed border-brand-muted/60" />
</div>
```

New pattern to apply in all four sections:
```jsx
<div className="flex items-center gap-4 mb-6">
  <span className="bg-brand-text text-white font-mono text-2xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
    SECTION NAME
  </span>
  <span className="font-mono text-sm text-brand-muted tracking-widest shrink-0">{`>>>`}</span>
  <div className="flex-1 border-t border-dashed border-brand-muted/60" />
</div>
```

Apply with the correct label text for each file:
- BenefitsSection.tsx: label text = "BENEFITS" (mb-4 in original — use mb-6 for consistency)
- TimelineSection.tsx: label text = "TIMELINE"
- PartnersSection.tsx: label text = "PARTNERS"
- FAQSection.tsx: label text = "FAQ" (mb-4 in original — use mb-6 for consistency)

Do NOT change any other part of these files — only the header row div.
  </action>
  <verify>Run `npm run build` and confirm it exits 0 with no TypeScript errors.</verify>
  <done>All four sections compile cleanly and their header rows use `bg-brand-text text-white font-black text-2xl` style instead of the small bordered pill.</done>
</task>

</tasks>

<verification>
- `npm run build` exits 0
- Visual check: each section title appears as a large dark block with white text, not a small bordered pill
- The dashed separator line still appears to the right of each title
</verification>

<success_criteria>
BENEFITS, TIMELINE, PARTNERS, and FAQ section titles all render with dark filled background and large bold white text matching the screenshot reference.
</success_criteria>

<output>
After completion, create `.planning/quick/13-for-the-title-refer-to-image-need-to-use/13-SUMMARY.md`
</output>
