---
phase: quick-1
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "Two-column layout: left content column (flex-1), right card column (shrink-0)"
    - "Signal icon appears inline left of 'Build With AI' heading, not in a separate column"
    - "KUALA LUMPUR text appears inline to the right of 'Build With AI', bottom-aligned"
    - "Last phrase 'start building the future today.' is visually inverted (dark bg, white text)"
    - "Right column is a bordered box with Twin Towers SVG on the left and CTA content on the right"
    - "REGISTER NOW button is filled green (not outlined) and lives inside the right card"
    - "[[ SIGNAL RECEIVED ]] badge is inside the right card (not standalone above heading)"
    - "System log block appears below the right card with three terminal lines"
    - "KL Tower SVG is not rendered in this section"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Rebuilt two-column hero section"
  key_links:
    - from: "Left column heading row"
      to: "signal-icon.svg, Build With AI h1, KUALA LUMPUR span"
      via: "flex items-end gap-4 wrapper"
    - from: "Right card"
      to: "twin-towers.svg and CTA content"
      via: "flex row inside border border-brand-text div"
    - from: "REGISTER NOW button"
      to: "filled green style"
      via: "bg-green-700 text-white (not border outline)"
---

<objective>
Rebuild HeroSection.tsx from the current 3-column symmetric layout to the 2-column layout shown in the reference image.

Purpose: The existing layout (towers | text | towers) does not match the Figma design. The target layout has a left content column with an inline heading row and a right bordered card.
Output: Updated src/components/sections/HeroSection.tsx matching the reference layout.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rebuild HeroSection to two-column layout matching reference image</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
Replace the entire contents of HeroSection.tsx with the following structure. Use `next/image` for SVGs (already imported).

**Top-level section:** `flex gap-12 items-start py-20 w-full overflow-hidden`

**Left column** (`flex-1 flex flex-col gap-6`):

Row 1 — heading row (`flex items-end gap-4`):

- `<Image src="/images/signal-icon.svg" alt="" width={56} height={56} aria-hidden="true" />`
- `<h1>` with `font-display text-7xl lg:text-8xl leading-none text-brand-text` containing "Build With AI"
- `<span>` with `font-retro text-2xl lg:text-3xl tracking-widest text-brand-text self-end pb-2` containing "KUALA LUMPUR"

Row 2 — description (`font-mono text-sm text-brand-muted max-w-xl`):

- Plain text: "Gain real-world experience with Google's latest AI tools & models and "
- Highlighted span: `<span className="bg-brand-text text-white px-1">start building the future today.</span>`
- Use `&apos;` and `&amp;` for apostrophe and ampersand (JSX escaping)

**Right column** (`shrink-0 flex flex-col gap-4`):

Card (`border border-brand-text flex`):

- Left side of card: `<Image src="/images/twin-towers.svg" alt="Petronas Twin Towers" width={160} height={260} />`
- Right side of card (`flex flex-col gap-3 p-5 justify-between min-w-[200px]`):
  - Signal badge: `<span className="font-mono text-white bg-brand-text px-3 py-1 text-xs tracking-widest uppercase self-start">` with `{`[[SIGNAL RECEIVED]]`}`
  - Subheading: `<p className="font-mono text-brand-text text-xs tracking-widest uppercase">HANDS-ON AI TRAINING NEAR YOU.</p>`
  - Arrows: `<p className="font-mono text-brand-text text-sm tracking-wider">→ → →</p>`
  - CTA button: `<a href="#" className="inline-block bg-green-700 text-white font-mono text-sm tracking-widest uppercase px-6 py-3 text-center hover:bg-green-800 transition-colors duration-200">REGISTER NOW</a>`

System log block (below card, `font-mono text-xs text-brand-muted flex flex-col gap-0.5`):

- `<p className="text-brand-text font-semibold mb-1">[ SYSTEM LOG ]</p>`
- `<p># INITIALIZING ANTIGRAVITY.......///....OK</p>`
- `<p># DOWNLOADING GEMMA... COMPLETED</p>`
- `<p># CONNECTING TO GOOGLE CLOUD... ESTABLISHED</p>`

Do NOT render kl-tower.svg anywhere in this section. Do NOT include the old "[[SIGNAL RECEIVED]]" badge above the heading. Do NOT include a standalone outlined CTA button in the left column.

TypeScript: keep `"use client"` off (no client state needed), keep the named export `export function HeroSection()`.
</action>
<verify>

1. Run `npm run build` (or `npx tsc --noEmit`) — must exit 0 with no type errors.
2. Visually inspect `http://localhost:3000` — left column shows signal icon + "Build With AI" + "KUALA LUMPUR" on one line, description below with highlighted last phrase; right column shows bordered card with twin towers + badge + arrows + green button, and system log text below.
   </verify>
   <done>

- HeroSection renders as two columns (not three).
- Signal icon, "Build With AI", "KUALA LUMPUR" are in one flex row (items-end).
- "start building the future today." has dark background / white text.
- Right card has a visible border, contains twin-towers.svg and the CTA content.
- REGISTER NOW button is filled green (bg-green-700), not outlined.
- "[[SIGNAL RECEIVED]]" badge is inside the card, not above the heading.
- System log block is visible below the right card.
- `npm run build` exits 0.
  </done>
  </task>

</tasks>

<verification>
- `npm run build` passes with no TypeScript errors
- No import of kl-tower.svg remains in HeroSection.tsx
- `grep "outline\|border border-brand-text.*REGISTER\|kl-tower" src/components/sections/HeroSection.tsx` returns nothing (old outlined button pattern gone, kl-tower gone)
</verification>

<success_criteria>
HeroSection.tsx reflects the 2-column reference layout: inline heading row on the left, bordered card with twin towers and green CTA on the right, system log below the card, and inverted text highlight on the description's final phrase.
</success_criteria>

<output>
After completion, create `.planning/quick/1-adjust-hero-section-according-to-image-l/1-SUMMARY.md` with:
- What changed (layout, moved elements, new elements)
- Final file: src/components/sections/HeroSection.tsx
- Any decisions made (e.g., green shade used)
</output>
