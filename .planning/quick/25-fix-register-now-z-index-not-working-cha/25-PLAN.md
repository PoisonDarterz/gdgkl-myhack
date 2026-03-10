---
phase: quick-25
plan: 25
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/FooterSection.tsx
autonomous: true
requirements:
  - QUICK-25
must_haves:
  truths:
    - "REGISTER NOW copy 1 renders on top of copies 2 and 3 (no DevTools z-index warning)"
    - "Depth effect stacking is visually correct — copy 1 bright, copies 2/3 faded behind"
  artifacts:
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Fixed REGISTER NOW z-index depth effect"
      contains: "relative"
  key_links:
    - from: "p.z-[3]!"
      to: "stacking context"
      via: "position: relative"
      pattern: "relative.*z-\\[3\\]"
---

<objective>
Fix the DevTools warning "position: static prevents z-index from having an effect" on the REGISTER NOW depth effect in FooterSection.

Purpose: z-index only works on positioned elements. The three stacked `<p>` tags are `position: static` by default, so their `z-[3]!`, `z-[-2]!`, `z-[-3]!` classes do nothing.
Output: All three `<p>` tags get `relative` added so z-index creates the correct stacking order (copy 1 on top, copies 2 and 3 behind).
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add position relative to REGISTER NOW depth effect paragraphs</name>
  <files>src/components/sections/FooterSection.tsx</files>
  <action>
In FooterSection.tsx, find the three `<p>` tags inside the "Zone 2: giant filled REGISTER NOW" block. Each currently has Tailwind classes like `text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-100 z-[3]!` (and similar for copies 2 and 3).

Add `relative` to the className of all three `<p>` tags so z-index takes effect:
- Copy 1: add `relative` → classes become `text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-100 relative z-[3]!`
- Copy 2: add `relative` → classes become `text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-40 relative z-[-2]!`
- Copy 3: add `relative` → classes become `text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-20 relative z-[-3]!`

Do NOT change any inline styles, marginTop values, opacity values, or any other existing classes. Only add `relative` to each `<p>`.
  </action>
  <verify>
Browser DevTools no longer shows "position: static prevents z-index" warning on REGISTER NOW elements. The depth effect (three stacked fading copies) still renders correctly.
  </verify>
  <done>All three REGISTER NOW `<p>` tags have `relative` in their className. DevTools z-index warning is gone. Visual depth effect unchanged.</done>
</task>

</tasks>

<verification>
Open the site in browser and inspect the REGISTER NOW element in DevTools. Confirm no z-index/static warning appears in the Styles panel or Issues tab.
</verification>

<success_criteria>
- `position: static` warning eliminated for all three REGISTER NOW copies
- Depth effect stacking visually unchanged (copy 1 on top, copies 2/3 faded behind)
</success_criteria>

<output>
After completion, create `.planning/quick/25-fix-register-now-z-index-not-working-cha/25-SUMMARY.md`
</output>
