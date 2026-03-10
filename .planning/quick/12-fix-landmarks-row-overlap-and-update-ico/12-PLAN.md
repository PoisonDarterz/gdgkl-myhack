---
phase: quick-12
plan: 12
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/LandmarksRow.tsx
autonomous: true
requirements: [quick-12]

must_haves:
  truths:
    - "LandmarksRow does not overlap the BenefitsSection content above it"
    - "Row shows 7 elements: union | building | union | building | union | building | union"
    - "The 4 union.svg icons are static and never animate"
    - "The 3 building slots independently cycle through kltower, big_union, tmtower every 3s with fade"
    - "Each building slot starts at a different building (slot 0 = kltower, slot 1 = big_union, slot 2 = tmtower)"
    - "Tall SVGs do not bleed upward out of their containers"
  artifacts:
    - path: "src/components/LandmarksRow.tsx"
      provides: "Fixed landmarks row with union separators and animated building slots"
  key_links:
    - from: "LandmarksRow"
      to: "/images/union.svg"
      via: "next/image src prop"
    - from: "LandmarksRow"
      to: "/images/kltower.svg, /images/big_union.svg, /images/tmtower.svg"
      via: "animated slot Image components"
---

<objective>
Fix the LandmarksRow overlap issue and update its icon sequence to use union.svg separators with animated building slots.

Purpose: The current row uses text `+` separators and the wrong SVG set. The tall KL Tower SVG bleeds upward into BenefitsSection content. This replaces the layout with proper overflow containment and the correct static/animated icon pattern.
Output: Updated `src/components/LandmarksRow.tsx` with overlap fix and new icon sequence.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/LandmarksRow.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite LandmarksRow with overlap fix and union-separator icon sequence</name>
  <files>src/components/LandmarksRow.tsx</files>
  <action>
Rewrite `src/components/LandmarksRow.tsx` with the following changes:

**1. Overlap fix — container:**
Replace the current outer div classes with:
```
className="flex items-end justify-around w-full py-4 mt-6 border-t border-brand-muted/40"
```
This adds top margin and a muted top border to visually separate the row from the BenefitsSection content above.

**2. Icon arrays:**
```ts
const BUILDINGS = [
  { src: "/images/kltower.svg", alt: "KL Tower" },
  { src: "/images/big_union.svg", alt: "Asterisk" },
  { src: "/images/tmtower.svg", alt: "TM Tower" },
];
```
No ICONS array — remove the old one entirely.

**3. Animation state (unchanged logic, same indices/visible pattern):**
Keep the existing `indices` and `visible` state with 3s interval + 150ms fade-out/swap/fade-in. Each slot advances all three indices by 1 on every tick. Initial state `[0, 1, 2]` means slot 0 starts on kltower, slot 1 on big_union, slot 2 on tmtower.

**4. JSX structure — 7 elements:**
```
UnionIcon | BuildingSlot(indices[0]) | UnionIcon | BuildingSlot(indices[1]) | UnionIcon | BuildingSlot(indices[2]) | UnionIcon
```

**UnionIcon** (static, used 4 times — extract as a const or inline):
```tsx
<div className="flex items-center justify-center w-[40px] h-[40px]">
  <Image
    src="/images/union.svg"
    alt="separator"
    width={40}
    height={40}
    className="opacity-50"
  />
</div>
```

**BuildingSlot** (animated, used 3 times, receives `index: number`):
```tsx
<div
  className="transition-opacity duration-150 h-[70px] w-[50px] flex items-end justify-center overflow-hidden"
  style={{ opacity: visible ? 1 : 0 }}
>
  <Image
    src={BUILDINGS[index].src}
    alt={BUILDINGS[index].alt}
    width={50}
    height={70}
    className="opacity-60 object-contain object-bottom"
  />
</div>
```

`overflow-hidden` on the building container prevents tall SVGs from bleeding outside the fixed 70px height. `object-bottom` anchors buildings to the bottom of their box.

Do NOT use a shared opacity wrapper for all 3 building slots. Each slot gets its own `style={{ opacity: visible ? 1 : 0 }}` div so the transition applies per-slot (they all fade together on the same tick, which is correct).

The UnionIcon divs have no opacity animation — they are always fully rendered at `opacity-50`.
  </action>
  <verify>
Run `npm run build` — no TypeScript errors. Visually inspect in browser: the LandmarksRow should sit below the BenefitsSection with visible top border spacing. The 7-element sequence should show union, building, union, building, union, building, union. Buildings should cycle every 3s with fade. Union icons should be static.
  </verify>
  <done>
LandmarksRow renders below BenefitsSection without overlap. 4 static union SVG separators visible. 3 building slots animate independently through kltower/big_union/tmtower every 3s with fade. No SVG bleeds outside its container.
  </done>
</task>

</tasks>

<verification>
- `npm run build` completes with no errors
- LandmarksRow has `mt-6 border-t border-brand-muted/40` on outer container
- Building slot containers have `overflow-hidden`
- 4 union.svg images present, never animating
- 3 animated slots cycling BUILDINGS array
</verification>

<success_criteria>
LandmarksRow no longer overlaps BenefitsSection. Row displays union | building | union | building | union | building | union with animated buildings and static union separators.
</success_criteria>

<output>
After completion, create `.planning/quick/12-fix-landmarks-row-overlap-and-update-ico/12-SUMMARY.md`
</output>
