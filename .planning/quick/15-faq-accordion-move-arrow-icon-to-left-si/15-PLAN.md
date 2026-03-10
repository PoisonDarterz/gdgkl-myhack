---
phase: quick-15
plan: 15
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/FAQSection.tsx
autonomous: true
requirements:
  - QUICK-15
must_haves:
  truths:
    - "Chevron icon appears on the LEFT side of each accordion row"
    - "Accordion title text is visibly larger than before"
    - "Toggle behavior and rotation animation still work correctly"
  artifacts:
    - path: "src/components/sections/FAQSection.tsx"
      provides: "Updated FAQ accordion with left-side icon and larger title"
  key_links:
    - from: "button element"
      to: "svg chevron"
      via: "flex row order — svg rendered before span"
      pattern: "<svg.*><span"
---

<objective>
Move the FAQ accordion chevron icon from the right side to the left side of each row, and increase the accordion title font size.

Purpose: Match updated Figma design showing left-anchored chevron and larger question text.
Output: Updated FAQSection.tsx with reordered flex children and larger title class.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/FAQSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Move chevron to left and increase title font size</name>
  <files>src/components/sections/FAQSection.tsx</files>
  <action>
In the accordion button element (line 55–69), make two changes:

1. Move the SVG chevron BEFORE the question span so it appears on the left:
   - Current order: `<span question text>` then `<svg chevron>`
   - New order: `<svg chevron>` then `<span question text>`
   - Remove `ml-3` from the svg and add `mr-3` instead (margin now goes to the right of the icon)
   - Change button flex from `justify-between` to `justify-start` since the icon is now left-anchored
   - The span should take remaining space: add `flex-1` to the span

2. Increase the question text size:
   - Current: `text-sm` on the span
   - New: `text-base` (or `text-lg` for more visible increase — use `text-base` as a starting point)

The rotation animation (`rotate-180` when open) should remain unchanged — the chevron still points down when closed and up when open.

Final button structure:
```
<button className="w-full flex justify-start items-center p-4 hover:bg-brand-text/5 text-left cursor-pointer">
  <svg ... className={`w-4 h-4 shrink-0 mr-3 transition-transform duration-300 ${openItems.has(i) ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
  <span className="font-mono text-base font-bold text-brand-text flex-1">{item.q}</span>
</button>
```
  </action>
  <verify>Run `npx tsc --noEmit` — must exit 0 with no errors. Visually confirm in browser at the FAQ section that icon is on the left and text is larger.</verify>
  <done>Chevron renders left of question text, question text is text-base (larger than previous text-sm), toggle animation still rotates icon correctly.</done>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` exits 0
- FAQSection renders with chevron on left side of each row
- Question titles display at text-base size
- Clicking a row still expands/collapses with chevron rotating 180deg
</verification>

<success_criteria>
Each accordion row shows: [chevron] [question text] — left to right. Icon is left-anchored. Question text is larger than the previous text-sm. All existing toggle functionality intact.
</success_criteria>

<output>
After completion, create `.planning/quick/15-faq-accordion-move-arrow-icon-to-left-si/15-SUMMARY.md`
</output>
