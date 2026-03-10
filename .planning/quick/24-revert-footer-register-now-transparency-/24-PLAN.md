---
phase: quick-24
plan: 24
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/FooterSection.tsx
autonomous: true
requirements:
  - QUICK-24
must_haves:
  truths:
    - "REGISTER NOW text on all three copies renders with solid white fill (no outline-only or color transparent)"
    - "Depth effect still visible via stacked copies at decreasing opacity"
  artifacts:
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Footer with solid-white-fill REGISTER NOW depth effect"
      contains: "color: \"white\""
  key_links:
    - from: "FooterSection.tsx copy1/2/3 p elements"
      to: "solid white text rendering"
      via: "color: white in inline style"
      pattern: "color.*white"
---

<objective>
Revert the REGISTER NOW depth effect in FooterSection so all three stacked copies use solid white fill instead of outline-only (color transparent).

Purpose: Quick-23 switched all copies to outline-only (color transparent). This revert restores solid white fill on all three copies while keeping the depth illusion via stacked opacity.
Output: FooterSection.tsx with color: "white" on all three REGISTER NOW p elements.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Restore solid white fill on all three REGISTER NOW copies</name>
  <files>src/components/sections/FooterSection.tsx</files>
  <action>
    In FooterSection.tsx, for all three stacked `p` elements in the depth effect (Copy 1, Copy 2, Copy 3):

    Change the inline style `color` value from `"#282828"` to `"white"` on each copy.

    The current state has `color: "#282828"` (dark bg color) with `WebkitTextStroke: "8px white"` and `paintOrder: "stroke fill"`. The desired state is `color: "white"` so the text interior is solid white, not dark. Keep `WebkitTextStroke` and `paintOrder` unchanged — they help letter edges render cleanly.

    All three copies get `color: "white"`. Opacities remain: copy1 opacity-100, copy2 opacity-40, copy3 opacity-20.
  </action>
  <verify>Run `npm run build` — no TypeScript or compile errors. Inspect FooterSection.tsx to confirm all three p elements have `color: "white"` in inline style.</verify>
  <done>All three REGISTER NOW copies have `color: "white"` in inline style; depth effect visible via decreasing opacity stacking; no solid dark fill bleeding through letter interiors.</done>
</task>

</tasks>

<verification>
After task completion:
- `npm run build` passes with no errors
- FooterSection.tsx contains `color: "white"` three times (once per copy)
- No occurrence of `color: "#282828"` or `color: "transparent"` remains in the REGISTER NOW block
</verification>

<success_criteria>
Footer REGISTER NOW text renders as solid white fill across all three depth copies. Depth illusion preserved via opacity gradient (100/40/20).
</success_criteria>

<output>
After completion, create `.planning/quick/24-revert-footer-register-now-transparency-/24-SUMMARY.md`
</output>
