# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** The landing page must look exactly like the Figma design — pixel-faithful typography, colors, layout structure, and section order.
**Current focus:** Phase 3 — Mid Sections

## Current Position

Phase: 3 of 5 (Mid Sections)
Plan: 2 of 3 in current phase
Status: Completed
Last activity: 2026-03-09 - Completed quick task 8: add earth/people SVG icons to hero stats and equalize column heights

Progress: [███░░░░░░░] 30%

## Performance Metrics

**Velocity:**

- Total plans completed: 4
- Average duration: 4.5 min
- Total execution time: 18 min

**By Phase:**

| Phase           | Plans | Total  | Avg/Plan |
| --------------- | ----- | ------ | -------- |
| 01-foundation   | 2     | 3 min  | 1.5 min  |
| 03-mid-sections | 2     | 15 min | 7.5 min  |

**Recent Trend:**

- Last 5 plans: 01-01 (1 min), 01-02 (2 min), 03-01 (12 min), 03-02 (3 min)
- Trend: -

_Updated after each plan completion_

| Phase/Plan                | Duration | Tasks   | Files   |
| ------------------------- | -------- | ------- | ------- |
| 02-hero-noise P01         | 2 min    | 1       | 2       |
| 03-mid-sections P01       | 12 min   | 2       | 2       |
| Phase 03-mid-sections P02 | 3min     | 2 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Setup]: Register CTA uses href="#" placeholder — no real URL yet
- [Setup]: Fonts loaded via next/font/google — avoids FOUT, Next.js best practice
- [Setup]: Single page, all sections — full landing page scope confirmed
- [01-01]: Courier Prime overrides --font-mono so font-mono utility uses brand font throughout
- [01-01]: Wrapper div inside body applies font CSS variables — avoids conflict with Geist fallbacks on body
- [01-01]: --background set to #F5F5F5 hex so bg-background renders brand off-white system-wide
- [Phase 01-foundation]: Import path @/src/components/sections is correct because tsconfig @/\* maps to project root — sections at src/ must include the src/ segment
- [Phase 01-foundation]: Figma scroll order canonically established in page.tsx: Hero, Benefits, WhatIsBAI, Stats, Timeline, Partners, FAQ, RegisterCTA, Footer
- [Phase 02-hero-noise]: CSS background-image used for noise texture (not next/image) — repeating decorative pattern not a content image
- [Phase 02-hero-noise]: Noise overlay uses position: fixed with inset: 0 and pointer-events: none — covers full viewport at all scroll positions without blocking interaction
- [Phase 02-hero-noise]: Outlined CTA button uses border border-brand-text with hover:bg-brand-text hover:text-white — CSS transition only, no JS
- [Phase 02-hero-noise]: Three-column flex layout with items-end so flanking illustrations bottom-align with center text column
- [quick-1]: Hero rebuilt to two-column layout — left: signal icon + heading + description, right: bordered card with twin-towers + CTA (filled green button), system log below card; KL Tower removed from hero
- [quick-3]: Glitch text initialized to target string to avoid hydration mismatch — SSR shows real text, animation runs only after mount
- [quick-3]: Both hero animations use setInterval with proper cleanup via useEffect return function
- [quick-3]: Glitch text preserves spaces and punctuation, only randomizes alphanumeric characters
- [03-01]: Dashed border separators (border-brand-muted/40) between benefit cards match Figma design
- [03-01]: Count-up animation uses hasAnimated ref flag to ensure single execution on scroll-into-view
- [03-01]: StatsSection uses IntersectionObserver with 0.3 threshold to trigger animation when meaningfully visible
- [03-01]: BenefitsSection is server-side (no "use client") since hover is pure CSS
- [Phase 03-mid-sections]: Count-up animation runs once on scroll using hasAnimated ref flag and observer.disconnect()
- [03-02]: Terminal block uses off-white background (NOT dark theme) to integrate visually with page aesthetic
- [03-02]: Typewriter animation fires once only using hasAnimated state flag - no replay on subsequent scrolls
- [03-02]: Character-by-character typing at 30ms intervals with 150ms pause between lines for natural reading rhythm
- [03-02]: Blinking cursor implemented via Tailwind animate-pulse class during active typing
- [quick-6]: Right card uses single outer border with border-t internal dividers for sections A/B/C/D
- [quick-6]: KUALA LUMPUR moved to its own line below the heading row (not inline with h1)
- [quick-6]: Benefit icons implemented as inline SVG components — no external icon library dependency
- [quick-6]: City landmarks row uses kl-tower.svg + twin-towers.svg + kl-tower.svg with + separators
- [quick-7]: KUALA LUMPUR moved inline into heading flex row (self-end pb-2) — no longer on own line below h1
- [quick-7]: WhatIsBAI typewriter animation state and effects inlined directly into HeroSection — WhatIsBAISection no longer rendered in page.tsx
- [quick-7]: Stats and recap video rendered as border-t sibling divs below the bordered card, not nested inside it
- [quick-8]: Stats count-up animation inlined into HeroSection — StatsSection no longer used in hero but preserved for standalone use
- [quick-8]: Stats observer reuses sectionRef (WhatIsBAI box) — hero above fold so threshold triggers on load
- [quick-8]: Section B border changed to border-t/l/r to connect flush with Section A bottom edge without double border

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

### Quick Tasks Completed

| #   | Description                                                             | Date       | Commit  | Directory                                                                                         |
| --- | ----------------------------------------------------------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------- |
| 1   | adjust hero section according to image layout                           | 2026-03-08 | a751983 | [1-adjust-hero-section-according-to-image-l](./quick/1-adjust-hero-section-according-to-image-l/) |
| 2   | fix hero section proportions and text styling to match Figma            | 2026-03-08 | fa175b1 | [2-check-the-actual-and-figma-image-change-](./quick/2-check-the-actual-and-figma-image-change-/) |
| 3   | add glitch text and signal received animations to HeroSection           | 2026-03-08 | a709450 | [3-herosection-animations-glitch-text-and-s](./quick/3-herosection-animations-glitch-text-and-s/) |
| 4   | fix herosection right card layout and tower image sizing to match figma | 2026-03-08 | e032b7a | [4-fix-herosection-right-card-layout-and-to](./quick/4-fix-herosection-right-card-layout-and-to/) |
| 5   | fix hero card proportions and CTA row; remove icons from benefits       | 2026-03-09 | 8b6e3a2 | [5-fix-hero-and-benefits-section-layout-to-](./quick/5-fix-hero-and-benefits-section-layout-to-/) |
| 6   | redo HeroSection and BenefitsSection to match Figma (stats, recap, icons, landmarks) | 2026-03-09 | 43aab09 | [6-redo-hero-and-benefits-section-code-to-m](./quick/6-redo-hero-and-benefits-section-code-to-m/) |
| 7   | fix hero layout — inline KL, WhatIsBAI in hero left column, stats/recap outside card | 2026-03-09 | 995de00 | [7-fix-hero-and-benefits-layout-differences](./quick/7-fix-hero-and-benefits-layout-differences/) |
| 8   | add earth/people SVG icons to hero stats and equalize column heights | 2026-03-09 | fdd3eea | [8-add-globe-and-people-svg-icons-to-hero-s](./quick/8-add-globe-and-people-svg-icons-to-hero-s/) |

## Session Continuity

Last session: 2026-03-09
Stopped at: Completed quick-8 — Add earth/people SVG icons to hero stats, equal-height columns, inline count-up animation
Resume file: None
