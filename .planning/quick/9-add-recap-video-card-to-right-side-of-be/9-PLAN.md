---
phase: quick-9
plan: 9
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/BenefitsSection.tsx
autonomous: true
requirements: [QUICK-9]

must_haves:
  truths:
    - "BenefitsSection renders in a 2-column layout (left: existing content, right: RECAP VIDEO card)"
    - "RECAP VIDEO card has a red label in the top-left corner"
    - "Left dark panel inside the card shows 'Build with AI' text, yellow curly braces, GDG label, KL badge, wavy lines, Google color dots, and a 2026 yellow circle"
    - "Right panel inside the card shows a play icon and 'Watch recap' text"
    - "Bottom bar shows YouTube icon, 'BUILD WITH AI RECAP 2025', YouTube URL, barcode pattern, and '1:36:46' timestamp"
    - "Right column card stretches to match the height of the left column"
  artifacts:
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Updated BenefitsSection with 2-col layout and RecapVideoCard component"
  key_links:
    - from: "BenefitsSection"
      to: "RecapVideoCard"
      via: "flex row sibling"
      pattern: "flex.*flex-row|grid.*grid-cols"
---

<objective>
Add a RECAP VIDEO card as a right-side column in BenefitsSection, converting the section to a 2-column flex layout. The left column keeps existing content unchanged. The right column is a new bordered card with a dark preview panel, watch-recap panel, and a bottom info bar.

Purpose: Match Figma design which shows benefits on the left and a recap video card on the right.
Output: Updated BenefitsSection.tsx with RecapVideoCard component inline.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/PROJECT.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add RecapVideoCard and convert BenefitsSection to 2-column layout</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
Modify `src/components/sections/BenefitsSection.tsx` to:

1. Wrap the existing section content and a new RecapVideoCard in a `flex flex-row gap-6 items-stretch` container inside the `<section>` tag. The existing content becomes the left column (`flex-1 min-w-0`). The RecapVideoCard becomes the right column (`w-[320px] shrink-0`).

2. Add a `RecapVideoCard` function component (no props) above `BenefitsSection`. The card structure:

```
<div className="border border-brand-text flex flex-col h-full relative">

  {/* RECAP VIDEO red label — top-left absolute */}
  <div className="absolute top-0 left-0 bg-[#FF0000] px-2 py-0.5 z-10">
    <span className="font-mono text-white text-[10px] font-bold uppercase tracking-widest">
      RECAP VIDEO
    </span>
  </div>

  {/* Main two-panel row — fills available height */}
  <div className="flex flex-row flex-1 min-h-0">

    {/* Left dark panel */}
    <div className="w-[55%] bg-[#1a1a1a] flex flex-col justify-between p-4 pt-7">
      {/* Top: Build with AI heading */}
      <div>
        <div className="font-mono text-xs text-white leading-snug mb-3">
          <span className="text-[#FFD600] text-base font-bold">{"{"}</span>
          <span className="text-white font-bold text-sm mx-1">Build</span>
          <span className="text-[#FFD600] text-base font-bold">{"}"}</span>
          <span className="text-white font-bold text-sm mx-1">with AI</span>
        </div>
        <p className="font-mono text-[10px] text-white/70 uppercase tracking-wider mb-2">
          Google Developer<br />Groups
        </p>
        {/* KL badge */}
        <span className="inline-block font-mono text-[9px] text-white/80 border border-white/30 rounded-full px-2 py-0.5 mb-3">
          Kuala Lumpur
        </span>
        {/* Wavy lines — 3 rows of tilde chars */}
        <div className="font-mono text-[#FFD600]/40 text-[10px] leading-tight mb-3">
          <div>~ ~ ~ ~ ~ ~ ~ ~</div>
          <div>~ ~ ~ ~ ~ ~ ~ ~</div>
          <div>~ ~ ~ ~ ~ ~ ~ ~</div>
        </div>
        {/* Google tech color dots row */}
        <div className="flex gap-1 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
          <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
          <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
          <span className="w-2 h-2 rounded-full bg-[#34A853]" />
          <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
          <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
        </div>
      </div>
      {/* Bottom: 2026 yellow circle badge */}
      <div className="flex justify-end">
        <div className="w-9 h-9 rounded-full bg-[#FFD600] flex items-center justify-center">
          <span className="font-mono text-[#1a1a1a] text-[10px] font-bold">2026</span>
        </div>
      </div>
    </div>

    {/* Right watch-recap panel */}
    <div className="flex-1 bg-[#F5F5F5] flex flex-col items-center justify-center gap-2 border-l border-brand-text/20">
      {/* Play triangle */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" stroke="#111" strokeWidth="1.5" />
        <polygon points="10,8 18,12 10,16" fill="#111" />
      </svg>
      <span className="font-mono text-[10px] text-brand-text uppercase tracking-wider text-center px-2">
        Watch recap
      </span>
    </div>

  </div>

  {/* Bottom info bar */}
  <div className="border-t border-brand-text/30 px-3 py-2 flex items-center gap-2">
    {/* YouTube icon (red rectangle with play) */}
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect width="16" height="12" rx="2" fill="#FF0000" />
      <polygon points="6,3 12,6 6,9" fill="white" />
    </svg>
    <div className="flex-1 min-w-0">
      <p className="font-mono text-[9px] font-bold text-brand-text uppercase tracking-wider truncate">
        BUILD WITH AI RECAP 2025
      </p>
      <a
        href="https://youtu.be/46dB6AAcmTI"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[9px] text-brand-muted hover:text-brand-text"
      >
        youtu.be/46dB6AAcmTI
      </a>
    </div>
    {/* Barcode pattern — thin vertical lines */}
    <div className="flex gap-px items-center shrink-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-brand-text/60"
          style={{ width: i % 3 === 0 ? 2 : 1, height: i % 2 === 0 ? 18 : 12 }}
        />
      ))}
    </div>
    <span className="font-mono text-[9px] text-brand-muted ml-1 shrink-0">1:36:46</span>
  </div>

</div>
```

3. In `BenefitsSection`, replace the existing `<section className="px-6 lg:px-8 py-6">` content with:

```tsx
<section className="px-6 lg:px-8 py-6">
  <div className="flex flex-row gap-6 items-stretch">
    {/* Left: existing content */}
    <div className="flex-1 min-w-0 flex flex-col">
      {/* Header row */}
      ... (existing header row JSX unchanged) ...
      {/* Benefits list */}
      ... (existing benefits list JSX unchanged) ...
      {/* City landmarks row */}
      ... (existing landmarks JSX unchanged) ...
    </div>
    {/* Right: Recap video card */}
    <div className="w-[300px] shrink-0">
      <RecapVideoCard />
    </div>
  </div>
</section>
```

Keep all existing imports (`Image` from next/image), benefit data, and icon components intact. Do NOT add any new npm dependencies.
  </action>
  <verify>Run `npx tsc --noEmit` from the project root — should produce no TypeScript errors. Open the browser at localhost:3000 and visually confirm the Benefits section has a 2-column layout with the RECAP VIDEO card on the right.</verify>
  <done>BenefitsSection renders with left column (header + 3 benefit rows + landmarks) and right column (RECAP VIDEO card with dark panel, watch-recap panel, and bottom bar). No TypeScript errors.</done>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` exits with code 0
- Page renders without runtime errors
- Benefits section shows 2-column layout
- RECAP VIDEO red label appears top-left of card
- Dark panel on left of card: yellow braces, GDG text, KL badge, wavy lines, color dots, 2026 circle
- Right panel: play icon + "Watch recap"
- Bottom bar: YouTube icon, title, URL link, barcode, timestamp
</verification>

<success_criteria>
BenefitsSection is a 2-column layout. The right column RECAP VIDEO card matches the wireframe: red label, dark left panel with event branding, white right panel with play button, bottom info bar with YouTube link and barcode.
</success_criteria>

<output>
After completion, create `.planning/quick/9-add-recap-video-card-to-right-side-of-be/9-SUMMARY.md`
</output>
