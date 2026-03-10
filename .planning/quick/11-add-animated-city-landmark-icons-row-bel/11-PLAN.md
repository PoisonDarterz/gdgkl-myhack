---
phase: quick-11
plan: 11
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/BenefitsSection.tsx
  - src/components/LandmarksRow.tsx
autonomous: true
requirements: [quick-11]

must_haves:
  truths:
    - "Landmarks row shows 7 elements: +, icon, +, icon, +, icon, +"
    - "Plus signs appear on both edges and between every icon"
    - "Each of the 3 icon slots independently cycles through kl-tower, twin-towers, and tmtower SVGs"
    - "Icons animate on a ~3 second interval with smooth fade transition"
    - "Row is full-width and items are evenly spaced"
  artifacts:
    - path: "src/components/LandmarksRow.tsx"
      provides: "Animated landmark cycling component (use client)"
      exports: ["LandmarksRow"]
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "BenefitsSection with LandmarksRow replacing the static landmarks row"
  key_links:
    - from: "src/components/sections/BenefitsSection.tsx"
      to: "src/components/LandmarksRow.tsx"
      via: "import and render at bottom of section"
      pattern: "import.*LandmarksRow"
---

<objective>
Replace the static, incorrect city landmarks row in BenefitsSection with an animated LandmarksRow component that cycles through building SVGs.

Purpose: The current row has only + icon + icon + (no edge plus signs, wrong icons). The target layout requires 7 elements with plus signs on both edges, and each of 3 icon slots randomly cycling through kl-tower.svg, twin-towers.svg, and tmtower.svg every 3 seconds.

Output: src/components/LandmarksRow.tsx (new, "use client") and updated BenefitsSection.tsx.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/BenefitsSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create LandmarksRow component with animated icon cycling</name>
  <files>src/components/LandmarksRow.tsx</files>
  <action>
    Create a new "use client" component at src/components/LandmarksRow.tsx.

    The component renders a full-width row with 7 elements in order:
    `+  [icon]  +  [icon]  +  [icon]  +`

    Icon pool (cycling order): ["/images/kl-tower.svg", "/images/twin-towers.svg", "/images/tmtower.svg"]

    Use useState to track the current icon index for each of the 3 slots (indices 0, 1, 2 into the pool array). Initialize each slot at a different index so they start showing different icons:
    - Slot 0: starts at index 0 (kl-tower)
    - Slot 1: starts at index 1 (twin-towers)
    - Slot 2: starts at index 2 (tmtower)

    Use useEffect with setInterval at 3000ms. On each tick, advance each slot's index by 1 mod 3 (so they all cycle in lockstep but are offset). Return cleanup function to clearInterval.

    For the fade transition, wrap each icon in a div with a CSS transition on opacity. On icon change: briefly set opacity to 0, then after a short timeout (e.g., 150ms) update the icon and restore opacity to 1. Use a second piece of state (or a single combined state object) to track opacity per slot.

    Simplest approach: use a `visible` boolean state that flips false briefly on each 3s tick, then back to true after 150ms. All 3 icons fade out and back in together — this is acceptable since they all switch simultaneously.

    Layout classes:
    - Outer div: `flex items-end justify-around w-full py-4`
    - Plus sign spans: `font-mono text-brand-muted/50 text-lg pb-2`
    - Icon wrapper divs: `transition-opacity duration-150` with opacity toggled via style prop
    - next/image for each icon: width=32 height=60 for kl-tower and tmtower, width=40 height=60 for twin-towers. Since the active icon changes, use a fixed container size and let the image fill it. Use a fixed wrapper with className="h-[60px] w-[40px] flex items-end justify-center" and render next/image with width=40 height=60 objectFit="contain".
    - All icons: className="opacity-60 object-contain"

    The icon src and alt are determined by the current index for each slot. Map index to src/alt:
    - 0: src="/images/kl-tower.svg", alt="KL Tower"
    - 1: src="/images/twin-towers.svg", alt="Petronas Twin Towers"
    - 2: src="/images/tmtower.svg", alt="TM Tower"

    Export as `export function LandmarksRow()`.

    Import Image from "next/image". Import useEffect, useState from "react".
  </action>
  <verify>File exists at src/components/LandmarksRow.tsx with "use client" directive, useState/useEffect imports, setInterval logic with clearInterval cleanup, and 7-element JSX row structure.</verify>
  <done>Component file created with cycling logic and correct 7-element layout structure.</done>
</task>

<task type="auto">
  <name>Task 2: Replace static landmarks row in BenefitsSection with LandmarksRow</name>
  <files>src/components/sections/BenefitsSection.tsx</files>
  <action>
    In BenefitsSection.tsx:

    1. Add import at top: `import { LandmarksRow } from "@/src/components/LandmarksRow";`

    2. Find the existing static landmarks row div (starts with comment `{/* City landmarks row — full width */}` around line 221). Replace the entire div (from the opening `<div className="flex items-end justify-center...">` through its closing `</div>`) with simply: `<LandmarksRow />`

    Do NOT add "use client" to BenefitsSection.tsx — it remains a server component. The "use client" boundary lives inside LandmarksRow.tsx. This is the correct Next.js pattern: server component imports a client component.

    No other changes to BenefitsSection.tsx.
  </action>
  <verify>BenefitsSection.tsx imports LandmarksRow and renders `&lt;LandmarksRow /&gt;` at the bottom. No "use client" directive in BenefitsSection.tsx. Run `npx tsc --noEmit` to confirm no type errors.</verify>
  <done>Static landmarks row removed, LandmarksRow component renders in its place. `npx tsc --noEmit` exits with 0 errors. Dev server shows animated row with 7 elements (+, icon, +, icon, +, icon, +) cycling every 3 seconds.</done>
</task>

</tasks>

<verification>
After both tasks:
1. `npx tsc --noEmit` — zero type errors
2. `npm run dev` — page loads without console errors
3. Visually inspect BenefitsSection bottom: 7 elements visible (4 plus signs, 3 icons)
4. Wait 3+ seconds — icons fade out and back in with different buildings visible
</verification>

<success_criteria>
- LandmarksRow renders 7 elements: +, icon, +, icon, +, icon, +
- Plus signs on both edges and between every icon
- Each icon slot cycles through kl-tower, twin-towers, tmtower on a 3-second interval
- Fade transition (opacity) occurs between icon switches
- BenefitsSection remains a server component (no "use client")
- No TypeScript errors
</success_criteria>

<output>
After completion, update .planning/STATE.md quick tasks table and create .planning/quick/11-add-animated-city-landmark-icons-row-bel/11-SUMMARY.md with what was built and any decisions made.
</output>
