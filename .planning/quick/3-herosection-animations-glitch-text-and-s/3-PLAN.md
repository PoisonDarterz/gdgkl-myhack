---
phase: quick-3
plan: 3
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "start building the future today." text cycles through random characters before settling on the correct letters on page load
    - "[[ SIGNAL RECEIVED ]] badge swaps between double-bracket and single-bracket variants on a repeating interval"
  artifacts:
    - path: src/components/sections/HeroSection.tsx
      provides: Client component with both animations via useState + useEffect
      contains: '"use client"'
  key_links:
    - from: glitch animation
      to: '"start building the future today." span'
      via: useState tracking per-character resolved state
      pattern: "glitchText|glitch"
    - from: signal interval
      to: SIGNAL RECEIVED span
      via: setInterval toggling state
      pattern: "setInterval|signalVariant"
---

<objective>
Add two CSS/JS animations to HeroSection:
1. Glitch-text effect on "start building the future today." — each character cycles through random symbols before resolving to the correct letter.
2. "[[ SIGNAL RECEIVED ]]" badge alternates between double-bracket and single-bracket forms on a repeating interval.

Purpose: Bring the hero section to life with hacker-aesthetic micro-interactions that match the retro/terminal design language.
Output: Updated HeroSection.tsx as a client component with both animations.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/HeroSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add glitch-text and signal-received animations to HeroSection</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
Add `"use client"` directive at the top of the file. Convert HeroSection to a client component using useState and useEffect.

**Animation 1 — Glitch text on "start building the future today."**

Target string (including trailing period): `start building the future today.`
Characters that are spaces must stay as spaces throughout (no randomization on space/punctuation — only alpha chars).

Implementation approach:
- Define a constant `GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'`
- On mount, run a `setInterval` at 40ms. Track a `frame` counter (starts at 0). Each character in the target string settles at frame `Math.floor((i / target.length) * TOTAL_FRAMES)` where `TOTAL_FRAMES = 18`.
- On each tick: build the displayed string — for each index `i`, if `frame >= settleFrame[i]`, use the real character, else use a random char from GLITCH_CHARS (preserve spaces as spaces).
- After `TOTAL_FRAMES` ticks, clear the interval and set text to the exact target string.
- Store displayed text in `useState<string>` initialized to the target string (avoids hydration mismatch — SSR shows real text, animation runs only after mount).
- Render the glitch text inside the existing `<span className="bg-brand-text text-white px-1">` replacing the hardcoded string.

**Animation 2 — SIGNAL RECEIVED bracket swap**

- Use `useState<boolean>` (`isDouble`, initialized to `true`) toggled by `setInterval` every 600ms on mount.
- When `isDouble` is true: render `[[ SIGNAL RECEIVED ]]`; when false: render `[ SIGNAL RECEIVED ]`
- Clear the interval on component unmount (return cleanup from useEffect).
- Replace the hardcoded `{`[[ SIGNAL RECEIVED ]]`}` span content with the toggled state variable.

Both useEffects must return cleanup functions that call `clearInterval`. Keep all existing className/layout untouched.
  </action>
  <verify>
Run `npm run dev` and open the page in a browser. Observe:
1. On load, the "start building the future today." text briefly shows scrambled characters that resolve left-to-right into the real phrase.
2. The "[[ SIGNAL RECEIVED ]]" badge visibly alternates between `[[` and `[` bracket forms every ~600ms.
Run `npm run build` to confirm no TypeScript or build errors.
  </verify>
  <done>
Both animations are visible in the browser. Build completes without errors. Existing layout, fonts, and colors are unchanged.
  </done>
</task>

</tasks>

<verification>
- `npm run build` exits with code 0
- HeroSection.tsx has `"use client"` at line 1
- Glitch animation resolves to correct text within ~750ms of page load
- Signal badge toggles on a visible interval indefinitely
</verification>

<success_criteria>
HeroSection renders with two working animations. No hydration warnings in console. Build passes.
</success_criteria>

<output>
After completion, create `.planning/quick/3-herosection-animations-glitch-text-and-s/3-SUMMARY.md`
</output>
