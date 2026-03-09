---
phase: quick-6
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
  - src/components/sections/BenefitsSection.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Hero left column shows hexagonal bai_icon.svg left of 'Build With AI' heading, with 'KUALA LUMPUR' below (not inline)"
    - "Hero right card shows: SIGNAL RECEIVED header, HANDS-ON text, arrows + REGISTER NOW button, SYSTEM LOG, globe stat (2,258 global events), people stat (178,000 developers trained), RECAP VIDEO card"
    - "Benefits section shows three items with colored inline icons (curly braces green, sparkle blue, heart red) before the # heading"
    - "Benefits section has a city landmarks row at the bottom with KL Tower and Petronas Towers SVGs separated by '+'"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Full hero section with 2-col layout and right card containing stats + recap video"
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Benefits section with inline colored icons and city landmarks row"
  key_links:
    - from: "src/components/sections/HeroSection.tsx"
      to: "public/images/bai_icon.svg"
      via: "next/image src prop"
      pattern: "bai_icon\\.svg"
    - from: "src/components/sections/BenefitsSection.tsx"
      to: "public/images/kl-tower.svg"
      via: "next/image src prop"
      pattern: "kl-tower\\.svg"
---

<objective>
Redo HeroSection and BenefitsSection to faithfully match the Figma design.

Purpose: Previous quick tasks have iteratively adjusted these sections but significant gaps remain vs. Figma — the hero right card is missing the globe/people stats and recap video card, the Benefits section is missing colored inline icons and the city landmarks row at the bottom.

Output: HeroSection with complete right card (stats + recap video), BenefitsSection with inline colored icons and city landmarks strip.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
@src/components/sections/HeroSection.tsx
@src/components/sections/BenefitsSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Redo HeroSection to match Figma — complete right card with stats and recap video</name>
  <files>src/components/sections/HeroSection.tsx</files>
  <action>
Rewrite HeroSection.tsx to exactly match the Figma layout. Preserve all existing animations (glitch text, signal bracket swap) — only restructure the JSX/styles.

**Overall layout:** `flex gap-0 items-start w-full` with horizontal padding `px-6 lg:px-8 py-8`. Two columns: left uses `flex-1`, right uses `w-[420px] shrink-0 flex flex-col gap-0`.

**LEFT COLUMN (`flex flex-col gap-6`):**

Heading row (`flex items-end gap-4`):
- `<Image src="/images/bai_icon.svg" alt="" width={80} height={80} aria-hidden />` (slightly smaller than current)
- `<h1 className="font-display text-8xl leading-none text-brand-text">Build With AI</h1>`
- KUALA LUMPUR is NOT in this row — it goes below on its own line

Below heading row:
- `<span className="font-retro text-xl tracking-widest text-brand-text uppercase block mt-1">KUALA LUMPUR</span>`

Description paragraph (same as current — glitch text animation preserved):
- `<p className="font-mono text-base text-brand-muted max-w-lg">Gain real-world experience with Google's latest AI tools & models and <span className="bg-brand-text text-white px-2 py-1">{glitchText}</span></p>`

**RIGHT COLUMN:**

Structure is a vertical stack of bordered boxes — use `border border-brand-text` on the outer wrapper, then internal sections separated by `border-t border-brand-text`.

Outer wrapper: `<div className="border border-brand-text flex flex-col">`

**Section A — Card with twin towers + CTA content (same as before but inside wrapper):**
`<div className="flex">`
- Towers image: `<Image src="/images/twin-towers.svg" alt="Petronas Twin Towers" className="self-stretch object-contain shrink-0 w-[93px]" width={93} height={200} />`
- Content col `<div className="flex-1 flex flex-col border-l border-brand-text">`:
  - Signal header: `<span className="font-mono text-white bg-brand-text px-3 py-2 text-xs tracking-widest uppercase text-center block">{isDouble ? "[[ SIGNAL RECEIVED ]]" : "[ SIGNAL RECEIVED ]"}</span>`
  - HANDS-ON text: `<p className="font-mono text-brand-text text-xs tracking-widest uppercase font-bold italic text-center px-3 pt-3 pb-1">HANDS-ON AI TRAINING NEAR YOU.</p>`
  - CTA row: `<div className="flex flex-row items-center justify-between px-3 pb-3"><p className="font-mono text-brand-text text-sm">→ → →</p><a href="#" className="inline-block bg-[#8CFF81] text-black font-bold font-mono text-xs tracking-widest uppercase px-4 py-2 hover:bg-green-700 transition-colors">REGISTER NOW</a></div>`

**Section B — System log (border-t inside outer wrapper):**
`<div className="border-t border-brand-text px-4 py-3">`
- `<p className="font-mono text-xs text-brand-text font-semibold mb-1">[ SYSTEM LOG ]</p>`
- `<p className="font-mono text-xs text-brand-muted"># INITIALIZING ANTIGRAVITY.......///....OK</p>`
- `<p className="font-mono text-xs text-brand-muted"># DOWNLOADING GEMMA... COMPLETED</p>`
- `<p className="font-mono text-xs text-brand-muted"># CONNECTING TO GOOGLE CLOUD... ESTABLISHED</p>`

**Section C — Stats row (border-t inside outer wrapper):**
`<div className="border-t border-brand-text flex">`
Two equal stat blocks separated by `border-r border-brand-text`:

Stat 1 (globe icon): `<div className="flex-1 flex items-center gap-2 px-4 py-3 border-r border-brand-text">`
- Globe SVG inline (simple circle with latitude lines, ~24x24, stroke-current text-brand-text, no fill):
  ```
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-brand-text">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
    <path d="M2 12h20"/>
  </svg>
  ```
- Text col: `<div className="flex flex-col"><span className="font-mono text-sm font-bold text-brand-text leading-none">2,258</span><span className="font-mono text-[10px] text-brand-muted leading-tight">global events organized</span></div>`

Stat 2 (people icon): `<div className="flex-1 flex items-center gap-2 px-4 py-3">`
- People SVG inline (~24x24):
  ```
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-brand-text">
    <circle cx="9" cy="7" r="4"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
  </svg>
  ```
- Text col: `<div className="flex flex-col"><span className="font-mono text-sm font-bold text-brand-text leading-none">178,000</span><span className="font-mono text-[10px] text-brand-muted leading-tight">developers trained</span></div>`

**Section D — Recap video card (border-t inside outer wrapper):**
`<div className="border-t border-brand-text flex">`
- Left: dark thumbnail area `<div className="w-[120px] shrink-0 bg-brand-text flex flex-col items-center justify-center py-4 gap-1">`:
  - `<span className="font-display text-white text-base leading-none">Build</span>`
  - `<span className="font-display text-white text-base leading-none">with AI</span>`
  - `<span className="font-mono text-[#8CFF81] text-[10px] tracking-widest mt-1">GDG</span>`
  - `<span className="font-mono text-white text-[10px]">2026</span>`
- Right: `<div className="flex-1 flex flex-col justify-center px-4 py-3 gap-1 border-l border-brand-text">`:
  - `<span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">[ RECAP VIDEO ]</span>`
  - Play button row: `<div className="flex items-center gap-2 mt-1"><svg ...play triangle... width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-text"><polygon points="5 3 19 12 5 21 5 3"/></svg><span className="font-mono text-xs text-brand-text">Watch recap</span></div>`

Keep all existing animation state/effects (glitch text, isDouble) exactly as-is — do NOT change animation logic, only JSX structure.
  </action>
  <verify>Run `npm run build` — must pass with no TypeScript errors. Visually inspect in browser at localhost:3000: hero shows left column with icon+heading+KUALA LUMPUR stacked, right card has SIGNAL RECEIVED + HANDS-ON + CTA row, then SYSTEM LOG, then 2-column stats (2258/178000), then RECAP VIDEO card at bottom.</verify>
  <done>Hero section has full Figma-matching right card with signal header, system log, globe/people stats, and recap video. No TypeScript errors. No hydration warnings.</done>
</task>

<task type="auto">
  <name>Task 2: Redo BenefitsSection with colored inline icons and city landmarks row</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
Rewrite BenefitsSection.tsx to match Figma. This section is server-side (no "use client").

**Benefits data — add colored icon SVG and color class per item:**
```ts
const benefits = [
  {
    title: "PRACTICAL WORKSHOPS",
    description: "Use Google's integrated AI stack to solve real-world challenges, following a practical path from your first API call to a fully deployed application.",
    icon: "braces",
    iconColor: "text-[#4CAF50]",   // green
  },
  {
    title: "MODERN AI TECH STACK",
    description: "Explore the full stack of Google AI. From the open-source power of Gemma to the enterprise scale of Vertex AI, see how the pieces fit together.",
    icon: "sparkle",
    iconColor: "text-[#2196F3]",   // blue
  },
  {
    title: "PEER-TO-PEER GUIDANCE",
    description: "Work alongside our Google Developer Experts (GDEs) and local leads who share their honest experience building in the AI ecosystem.",
    icon: "heart",
    iconColor: "text-[#F44336]",   // red
  },
];
```

**Icon SVGs (inline, no external library):**
- Braces (curly braces): `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`
- Sparkle (4-point star): `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>`
- Heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`

**Benefit card render:**
```tsx
<div key={title} className="flex items-start gap-3 py-5">
  {/* Colored icon */}
  <span className={`shrink-0 mt-0.5 ${iconColor}`}>
    {/* inline SVG per icon type */}
  </span>
  {/* Text content */}
  <div className="flex flex-col gap-1">
    <h3 className="font-mono text-sm font-bold text-brand-text">
      # {title}{" "}
      <span className="font-normal text-brand-muted/50 tracking-widest">............</span>
    </h3>
    <p className="font-mono text-xs text-brand-muted leading-relaxed">{description}</p>
  </div>
</div>
```

Wrap all three cards: `<div className="flex flex-col divide-y divide-dashed divide-brand-muted/30">`

**City landmarks row at the bottom:**
Use `kl-tower.svg` and `twin-towers.svg` from `/images/`. Render as a horizontal flex row with `+` separators. Add a `border-t border-dashed border-brand-muted/40 mt-2 pt-4` above it.

```tsx
<div className="flex items-end justify-center gap-4 border-t border-dashed border-brand-muted/40 mt-2 pt-4 pb-2">
  <Image src="/images/kl-tower.svg" alt="KL Tower" width={32} height={60} className="object-contain opacity-60" />
  <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
  <Image src="/images/twin-towers.svg" alt="Petronas Twin Towers" width={40} height={60} className="object-contain opacity-60" />
  <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
  <Image src="/images/kl-tower.svg" alt="" aria-hidden width={32} height={60} className="object-contain opacity-60" />
</div>
```

Add `import Image from "next/image"` at top.

Keep header row exactly as-is: `[ BENEFITS ]` badge + `>>>` + dashed line.

Section outer: `<section className="px-6 lg:px-8 py-6">`
  </action>
  <verify>Run `npm run build` — no TypeScript errors. Visually in browser: each benefit row has a colored icon (green curly braces, blue sparkle, red heart) before the # heading. Bottom of benefits section has a row of city silhouette icons separated by +.</verify>
  <done>BenefitsSection has colored inline icons per Figma, dot trail after heading, and city landmarks strip at bottom. Passes build with no errors.</done>
</task>

</tasks>

<verification>
1. `npm run build` passes with zero TypeScript or lint errors
2. In browser at localhost:3000, the hero right card shows: SIGNAL RECEIVED header, HANDS-ON AI text, arrows + REGISTER NOW button, SYSTEM LOG messages, globe stat row (2,258 / 178,000), RECAP VIDEO thumbnail card
3. Hero left column shows bai_icon + "Build With AI" heading, then "KUALA LUMPUR" on a line below
4. Benefits section shows three rows each with colored icon + # TITLE ............ + description text
5. Benefits section bottom has KL Tower + Petronas Towers landmark icons with + separators
</verification>

<success_criteria>
Both sections rebuilt to match Figma design. Full build passes. No hydration warnings. Stats and recap video visible in hero card. Colored icons visible in benefits items. Landmark strip visible below benefits.
</success_criteria>

<output>
After completion, create `.planning/quick/6-redo-hero-and-benefits-section-code-to-m/6-SUMMARY.md`
</output>
