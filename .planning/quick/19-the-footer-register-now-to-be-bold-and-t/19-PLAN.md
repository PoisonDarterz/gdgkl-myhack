---
phase: quick-19
plan: 19
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/FooterSection.tsx
autonomous: true
requirements:
  - QUICK-19
must_haves:
  truths:
    - "REGISTER NOW text is solid white (filled), not outlined/hollow"
    - "REGISTER NOW text spans the full width of the footer with no side padding gaps"
  artifacts:
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Footer with bold filled REGISTER NOW full-width text"
      contains: "color: white"
  key_links:
    - from: "src/components/sections/FooterSection.tsx"
      to: "Zone 2 REGISTER NOW block"
      via: "inline style color change"
      pattern: "color.*white"
---

<objective>
Make REGISTER NOW in the footer bold (solid white fill instead of outlined) and ensure the text block takes up the full footer width edge to edge.

Purpose: The outlined hollow text is hard to read; solid bold white fills the space with impact and the design intent.
Output: Updated FooterSection.tsx with filled REGISTER NOW and full-width layout.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/FooterSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Make REGISTER NOW solid white and full-width</name>
  <files>src/components/sections/FooterSection.tsx</files>
  <action>
    In Zone 2 (the REGISTER NOW block), make two changes:

    1. Remove the outline effect and fill with solid white:
       - On all three `p` tags: remove `WebkitTextStroke: "2px white"` from inline styles and change `color: "transparent"` to `color: "white"`.
       - The depth effect stays — the 3 stacked copies with decreasing opacity remain, just now filled white instead of outlined.

    2. Make the text fill full footer width edge to edge:
       - On the outer Zone 2 container div, change `px-4` to `px-0` (remove horizontal padding entirely).
       - Keep `pt-4 pb-2 overflow-hidden border-t border-white/20`.
       - The `text-[12vw]` sizing on each `p` already scales to viewport width; removing padding ensures no side gap.

    The `fontFamily: "var(--font-google-sans)"` and `font-black tracking-tighter leading-none uppercase text-center` classes stay unchanged.
  </action>
  <verify>Run `npm run build` (no TS errors). Visually: REGISTER NOW appears as solid white bold text stretching wall-to-wall across the dark footer.</verify>
  <done>All three REGISTER NOW copies render as solid filled white text (no hollow outline), and the text block has no horizontal gap from the footer edges.</done>
</task>

</tasks>

<verification>
`npm run build` completes with no errors. FooterSection renders REGISTER NOW as solid bold white text spanning full footer width.
</verification>

<success_criteria>
- REGISTER NOW text is solid white (not outlined/transparent)
- No `WebkitTextStroke` or `color: transparent` in the REGISTER NOW block
- Zone 2 container has no horizontal padding (`px-0`)
- Depth effect (3 stacked copies, opacity 100/40/20) preserved
</success_criteria>

<output>
After completion, create `.planning/quick/19-the-footer-register-now-to-be-bold-and-t/19-SUMMARY.md`
</output>
