---
phase: quick-23
plan: 23
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/FooterSection.tsx
autonomous: true
requirements:
  - QUICK-23
must_haves:
  truths:
    - "REGISTER NOW text shows only the outline/border of the letters, no solid fill"
    - "All three depth-effect copies are outline-only (no white fill visible inside letters)"
    - "The depth layering effect (opacity 100/40/20) is preserved"
  artifacts:
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Footer with outline-only REGISTER NOW depth effect"
      contains: "color: transparent"
  key_links:
    - from: "FooterSection.tsx"
      to: "REGISTER NOW copies"
      via: "WebkitTextStroke + color: transparent on all 3 copies"
      pattern: "color.*transparent"
---

<objective>
Make the footer REGISTER NOW depth effect text outline-only on all three copies — no solid fill inside the letters, only the white stroke border is visible.

Purpose: The text should read as outlined/hollow letters rather than solid white, matching the desired visual treatment.
Output: FooterSection.tsx with all three REGISTER NOW copies using color: transparent so only the WebkitTextStroke border shows.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@E:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/FooterSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Make all REGISTER NOW copies outline-only</name>
  <files>src/components/sections/FooterSection.tsx</files>
  <action>
In the Zone 2 REGISTER NOW section, update copies 2 and 3 to add `color: "transparent"` to their inline style objects — copy 1 already has it. All three `<p>` tags must have `color: "transparent"` alongside the existing `WebkitTextStroke: "3px white"`. This makes letters hollow — only the white stroke outline is visible, no white fill inside.

Current copy 2 style (line ~68):
  style={{ WebkitTextStroke: "3px white", fontFamily: ..., marginTop: "-0.65em" }}

Updated copy 2 style:
  style={{ WebkitTextStroke: "3px white", color: "transparent", fontFamily: ..., marginTop: "-0.65em" }}

Apply the same change to copy 3 (same pattern, same addition). Copy 1 already has color: transparent — no change needed there.

Do NOT change opacity values, font sizes, tracking, marginTop, or any other properties.
  </action>
  <verify>Run `npm run build` — must complete with no errors. Visually, the REGISTER NOW text should show only outlined/hollow letters with a white stroke border, no solid white fill inside the letterforms.</verify>
  <done>All three REGISTER NOW copies have color: transparent + WebkitTextStroke: "3px white". The depth effect (three stacked copies at opacity 100/40/20) is preserved but text is hollow outline-only.</done>
</task>

</tasks>

<verification>
- `npm run build` completes without TypeScript or lint errors
- All three `<p>` tags for REGISTER NOW have `color: "transparent"` in their inline style
- Depth layering effect still visible (three copies stacked with marginTop offsets)
</verification>

<success_criteria>
REGISTER NOW text in footer renders as white outlined hollow letters — the inside of each letter is transparent (shows the dark footer background through), only the stroke border is visible.
</success_criteria>

<output>
After completion, create `.planning/quick/23-footer-register-now-instead-of-transpare/23-SUMMARY.md`
</output>
