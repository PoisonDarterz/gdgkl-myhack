---
phase: quick-14
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
requirements: [QUICK-14]

must_haves:
  truths:
    - "Section title labels (BENEFITS, TIMELINE, PARTNERS, FAQ) render noticeably larger than before"
    - "Section titles use Instrument Serif font instead of monospace"
  artifacts:
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Updated BENEFITS title span"
      contains: "font-[family-name:var(--font-instrument-serif)]"
    - path: "src/components/sections/TimelineSection.tsx"
      provides: "Updated TIMELINE title span"
      contains: "font-[family-name:var(--font-instrument-serif)]"
    - path: "src/components/sections/PartnersSection.tsx"
      provides: "Updated PARTNERS title span"
      contains: "font-[family-name:var(--font-instrument-serif)]"
    - path: "src/components/sections/FAQSection.tsx"
      provides: "Updated FAQ title span"
      contains: "font-[family-name:var(--font-instrument-serif)]"
  key_links:
    - from: "app/layout.tsx"
      to: "src/components/sections/*.tsx"
      via: "--font-instrument-serif CSS variable on ancestor wrapper div"
      pattern: "font-instrument-serif"
---

<objective>
Increase the section title labels (BENEFITS, TIMELINE, PARTNERS, FAQ) from text-2xl to text-5xl and switch their font from font-mono to Instrument Serif using the already-loaded --font-instrument-serif CSS variable.

Purpose: Section titles should be prominent display headings using the serif brand font, not small monospace labels.
Output: Four updated component files with larger, serif section titles.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@E:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/quick/14-section-titles-make-bigger-and-use-font-/14-PLAN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update section title font and size in all four section components</name>
  <files>
    src/components/sections/BenefitsSection.tsx
    src/components/sections/TimelineSection.tsx
    src/components/sections/PartnersSection.tsx
    src/components/sections/FAQSection.tsx
  </files>
  <action>
In each of the four files, locate the header `<span>` that renders the section title label. It currently has these classes: `bg-brand-text text-white font-mono text-2xl font-black tracking-widest uppercase px-4 py-2 shrink-0`.

Replace `font-mono text-2xl` with `font-[family-name:var(--font-instrument-serif)] text-5xl` in all four spans.

The font variable `--font-instrument-serif` is already registered on an ancestor wrapper in `app/layout.tsx` — no import needed in the component files.

Specific spans to update (one per file):
- BenefitsSection.tsx line 180: the `BENEFITS` span
- TimelineSection.tsx line 26: the `TIMELINE` span
- PartnersSection.tsx line 37: the `PARTNERS` span
- FAQSection.tsx line 47: the `FAQ` span

After the change each span should have classes: `bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0`

Do not change any other classes or any other elements in these files.
  </action>
  <verify>Run `npm run build` — must exit 0 with no TypeScript or Tailwind errors.</verify>
  <done>All four section title spans use `font-[family-name:var(--font-instrument-serif)] text-5xl`. Build passes.</done>
</task>

</tasks>

<verification>
`npm run build` exits 0. No lint or type errors.
</verification>

<success_criteria>
The four section title labels render at text-5xl size in Instrument Serif on the page. The rest of each section (content, layout, colors) is unchanged.
</success_criteria>

<output>
After completion, create `.planning/quick/14-section-titles-make-bigger-and-use-font-/14-SUMMARY.md`
</output>
