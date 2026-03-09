---
phase: 03-mid-sections
plan: 01
subsystem: content-sections
tags: [benefits, stats, scroll-animation, intersection-observer]
dependency_graph:
  requires: [hero-section, global-styles]
  provides: [benefits-cards, stats-countup]
  affects: [landing-page-flow]
tech_stack:
  added:
    - IntersectionObserver API for scroll-triggered animations
  patterns:
    - Count-up animation with setInterval
    - Scroll-into-view detection with threshold
    - Single-run animation with useRef flag
key_files:
  created:
    - src/components/sections/BenefitsSection.tsx
    - src/components/sections/StatsSection.tsx
  modified: []
decisions:
  - title: "Dashed border separators between benefit cards"
    rationale: "Uses border-dashed matching Figma design language for subtle visual separation"
    alternatives: ["Solid lines", "Dot characters"]
    chosen: "border-dashed border-brand-muted/40"
  - title: "Count-up animation runs once on scroll-into-view"
    rationale: "Better UX - animation shouldn't repeat on every scroll, hasAnimated ref ensures single execution"
    alternatives: ["Repeat on every scroll", "No animation flag"]
    chosen: "hasAnimated useRef flag with observer.disconnect()"
  - title: "25ms interval for count-up animation"
    rationale: "~40fps smooth animation over 1.5s duration, balancing performance and visual smoothness"
    alternatives: ["requestAnimationFrame", "50ms interval"]
    chosen: "setInterval 25ms"
metrics:
  duration: "12 min"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
  commits: 2
  completed_date: "2026-03-09"
---

# Phase 03 Plan 01: Benefits and Stats Sections

Implemented BenefitsSection with three interactive cards and StatsSection with animated count-up figures triggered on scroll-into-view.

## Objective

Replace placeholder sections with pixel-faithful implementations matching Figma design: BenefitsSection showing three feature cards with # prefix headings, dot separators, and hover effects; StatsSection displaying 2,258 events and 178,000 developers with count-up animation on scroll-into-view.

## Tasks Completed

### Task 1: Implement BenefitsSection with three cards, dot separators, and hover effects

**Commit:** `a1d1b52`

**Implementation:**

- Created three vertically stacked benefit cards with border-brand-text borders
- Card 1: "# PRACTICAL WORKSHOPS" - hands-on AI stack workshops
- Card 2: "# MODERN AI TECH STACK" - full Google AI stack overview
- Card 3: "# PEER-TO-PEER GUIDANCE" - local developer community learning
- Added dashed border separators (border-dashed border-brand-muted/40) between cards
- Implemented subtle hover effect (hover:bg-brand-text/5 transition-colors duration-200)
- All content extracted from figma_node.json for pixel accuracy
- Component is server-side by default (no "use client" needed for CSS hover)

**Files:**
- `src/components/sections/BenefitsSection.tsx` (43 lines)

**Verification:**
- ✓ npm run lint - 0 errors
- ✓ Three cards visible with # prefix headings
- ✓ Dashed separators between cards
- ✓ Hover effects applied

### Task 2: Implement StatsSection with count-up animation on scroll-into-view

**Commit:** `93f712b`

**Implementation:**

- Created StatsSection with "use client" directive for client-side animation
- Displays two stats: 2,258 global events organized / 178,000 developers trained
- Count-up animation triggered by IntersectionObserver (threshold: 0.3)
- Numbers count from 0 to final value over ~1.5s using setInterval (25ms intervals)
- Animation runs only once using hasAnimated useRef flag
- Numbers formatted with commas using toLocaleString()
- Typography: font-display for large numbers (text-7xl lg:text-8xl), font-mono for labels
- Observer disconnects after first trigger to prevent re-animation
- Proper cleanup in useEffect return function

**Files:**
- `src/components/sections/StatsSection.tsx` (91 lines)

**Verification:**
- ✓ npm run lint - 0 errors
- ✓ npm run build - production build succeeds
- ✓ Count-up animation implementation complete
- ✓ Numbers formatted with commas
- ✓ IntersectionObserver pattern follows HeroSection conventions

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

1. ✓ `npm run lint` - 0 errors across both files
2. ✓ `npm run build` - production build succeeds with no TypeScript errors
3. ✓ BenefitsSection: three cards visible with '#' headings, dashed separators, hover effects
4. ✓ StatsSection: count-up animation fires once on scroll-into-view with 2,258 and 178,000 as final values

## Key Technical Decisions

1. **Benefit cards layout:** Vertically stacked with gap-0 container, cards share borders creating continuous visual flow
2. **Separator style:** border-dashed border-brand-muted/40 matches Figma design language and existing patterns
3. **Hover interaction:** Pure CSS hover (no client-side JS) keeps BenefitsSection as server component
4. **Count-up interval calculation:** 60 frames over 1.5s (25ms intervals) provides smooth animation without performance overhead
5. **Single-run animation:** hasAnimated ref flag prevents re-running on subsequent scrolls, better UX
6. **IntersectionObserver threshold:** 0.3 ensures animation triggers when stats become meaningfully visible

## Success Criteria Met

- [x] BenefitsSection: three vertically stacked cards with '#' prefix headings
- [x] Dashed separators between benefit cards
- [x] Hover effect applied to each card
- [x] StatsSection: two stat figures with exact values (2,258 / 178,000)
- [x] Count-up animation from 0 to final value on first scroll-into-view
- [x] Numbers formatted with commas (toLocaleString)
- [x] Both components are lint/TypeScript clean
- [x] npm run build succeeds
- [x] All content extracted from figma_node.json for accuracy

## Next Steps

- Implement WhatIsBAI section (Plan 03-02) with terminal-style typing animation
- Ensure scroll experience flows smoothly from Hero → Benefits → Stats → WhatIsBAI

## Self-Check: PASSED

**Files created:**
- ✓ FOUND: src/components/sections/BenefitsSection.tsx
- ✓ FOUND: src/components/sections/StatsSection.tsx

**Commits:**
- ✓ FOUND: a1d1b52 (Task 1 - BenefitsSection)
- ✓ FOUND: 93f712b (Task 2 - StatsSection)

All claimed files and commits verified successfully.
