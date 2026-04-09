# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-08)

**Core value:** The landing page must look exactly like the Figma design — pixel-faithful typography, colors, layout structure, and section order.
**Current focus:** Phase 4 — Event Sections

## Current Position

Phase: 4 of 5 (Event Sections)
Plan: 3 of 3 in current phase
Status: Checkpoint — awaiting human visual verification (04-03 Task 2)
Last activity: 2026-04-09 - Completed quick task 260409-frw: update the links

Progress: [██████░░░░] 60%

## Performance Metrics

**Velocity:**

- Total plans completed: 5
- Average duration: 3.8 min
- Total execution time: 20 min

**By Phase:**

| Phase             | Plans | Total  | Avg/Plan |
| ----------------- | ----- | ------ | -------- |
| 01-foundation     | 2     | 3 min  | 1.5 min  |
| 03-mid-sections   | 2     | 15 min | 7.5 min  |
| 04-event-sections | 1     | 2 min  | 2 min    |

**Recent Trend:**

- Last 5 plans: 01-01 (1 min), 01-02 (2 min), 03-01 (12 min), 03-02 (3 min), 04-01 (2 min)
- Trend: -

_Updated after each plan completion_

| Phase/Plan                  | Duration | Tasks   | Files   |
| --------------------------- | -------- | ------- | ------- |
| 02-hero-noise P01           | 2 min    | 1       | 2       |
| 03-mid-sections P01         | 12 min   | 2       | 2       |
| Phase 03-mid-sections P02   | 3min     | 2 tasks | 1 files |
| Phase 04-event-sections P02 | 1        | 1 tasks | 1 files |
| 04-event-sections P01       | 2 min    | 2       | 2       |
| 04-event-sections P03       | 1 min    | 1       | 0       |

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
- [quick-9]: RecapVideoCard defined inline in BenefitsSection.tsx — no separate file needed for a single-use card component
- [quick-9]: Right column uses w-75 (Tailwind canonical) instead of w-[300px] per IDE suggestion
- [quick-9]: self-stretch on right column wrapper ensures RecapVideoCard fills full left-column height via h-full
- [04-01]: TimelineSection hardcodes 6 events as const array — no CMS or dynamic data source needed at this stage
- [04-01]: Type badge colors use fill (not outline) with distinct hues per event type — workshop=green, talk=blue, keynote=yellow, hackathon=orange, showcase=purple
- [04-01]: Google Diamond tier uses letter-by-letter colored spans matching official Google brand palette — no image import needed
- [04-01]: Tier rows decrease visually in box size: Gold w-32 h-16 → Silver w-24 h-12 → Bronze w-20 h-10
- [Phase 04-event-sections]: FAQSection uses useState<Set<number>> for multi-open accordion — no auto-close behavior
- [Phase 04-event-sections]: FAQSection height animation via max-h-0/max-h-48 Tailwind transition — no external accordion library
- [quick-15]: FAQ chevron repositioned to left via SVG-before-span flex order; justify-start + flex-1 on span fills remaining width
- [quick-15]: FAQ question text increased from text-sm to text-base for larger, more readable titles
- [quick-16]: Header is a server component imported in layout.tsx — renders on all pages without client JS
- [quick-16]: Footer REGISTER NOW font-family set via inline style to avoid Tailwind font-black + font-[var()] CSS conflict
- [quick-18]: Google_Sans from next/font/google is available but weight 900 is not — max weight is 700
- [quick-20]: Google Sans loaded via CDN link tag in <head> instead of next/font/google — CDN version exposes weights 100-900
- [quick-20]: --font-sans set to literal 'Google Sans', sans-serif in @theme inline — no CSS variable indirection needed since CDN font name is stable
- [quick-18]: Header uses px-6 directly on header element (no inner max-w container) to match Figma edge-to-edge layout
- [quick-18]: REGISTER NOW depth effect uses 3 stacked p tags with marginTop -0.55em and decreasing opacity (100/40/20)

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

### Quick Tasks Completed

| #   | Description                                                                                                   | Date       | Commit  | Directory                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------- |
| 1   | adjust hero section according to image layout                                                                 | 2026-03-08 | a751983 | [1-adjust-hero-section-according-to-image-l](./quick/1-adjust-hero-section-according-to-image-l/)   |
| 2   | fix hero section proportions and text styling to match Figma                                                  | 2026-03-08 | fa175b1 | [2-check-the-actual-and-figma-image-change-](./quick/2-check-the-actual-and-figma-image-change-/)   |
| 3   | add glitch text and signal received animations to HeroSection                                                 | 2026-03-08 | a709450 | [3-herosection-animations-glitch-text-and-s](./quick/3-herosection-animations-glitch-text-and-s/)   |
| 4   | fix herosection right card layout and tower image sizing to match figma                                       | 2026-03-08 | e032b7a | [4-fix-herosection-right-card-layout-and-to](./quick/4-fix-herosection-right-card-layout-and-to/)   |
| 5   | fix hero card proportions and CTA row; remove icons from benefits                                             | 2026-03-09 | 8b6e3a2 | [5-fix-hero-and-benefits-section-layout-to-](./quick/5-fix-hero-and-benefits-section-layout-to-/)   |
| 6   | redo HeroSection and BenefitsSection to match Figma (stats, recap, icons, landmarks)                          | 2026-03-09 | 43aab09 | [6-redo-hero-and-benefits-section-code-to-m](./quick/6-redo-hero-and-benefits-section-code-to-m/)   |
| 7   | fix hero layout — inline KL, WhatIsBAI in hero left column, stats/recap outside card                          | 2026-03-09 | 995de00 | [7-fix-hero-and-benefits-layout-differences](./quick/7-fix-hero-and-benefits-layout-differences/)   |
| 8   | add earth/people SVG icons to hero stats and equalize column heights                                          | 2026-03-09 | fdd3eea | [8-add-globe-and-people-svg-icons-to-hero-s](./quick/8-add-globe-and-people-svg-icons-to-hero-s/)   |
| 9   | add RECAP VIDEO card to right side of BenefitsSection as 2-column layout                                      | 2026-03-09 | 12839b8 | [9-add-recap-video-card-to-right-side-of-be](./quick/9-add-recap-video-card-to-right-side-of-be/)   |
| 10  | move city landmarks row to full-width below benefits+video two-column layout                                  | 2026-03-09 | 6191eea | [10-fix-benefits-section-layout-benefits-lef](./quick/10-fix-benefits-section-layout-benefits-lef/) |
| 11  | replace static landmarks row with animated LandmarksRow cycling 3 KL building SVGs                            | 2026-03-10 | 8d111e1 | [11-add-animated-city-landmark-icons-row-bel](./quick/11-add-animated-city-landmark-icons-row-bel/) |
| 12  | fix LandmarksRow overlap and update icon sequence with union separators                                       | 2026-03-10 | 80e648d | [12-fix-landmarks-row-overlap-and-update-ico](./quick/12-fix-landmarks-row-overlap-and-update-ico/) |
| 13  | replace small pill section titles with dark bg large bold white text across BENEFITS, TIMELINE, PARTNERS, FAQ | 2026-03-10 | d9d9b51 | [13-for-the-title-refer-to-image-need-to-use](./quick/13-for-the-title-refer-to-image-need-to-use/) |
| 14  | increase section title size to text-5xl and switch to Instrument Serif font                                   | 2026-03-10 | 335e0e1 | [14-section-titles-make-bigger-and-use-font-](./quick/14-section-titles-make-bigger-and-use-font-/) |
| 15  | move FAQ accordion chevron to left side and increase question title to text-base                              | 2026-03-10 | 09e838a | [15-faq-accordion-move-arrow-icon-to-left-si](./quick/15-faq-accordion-move-arrow-icon-to-left-si/) |
| 16  | create Header navbar and Footer with GDG logo box, policy links, outlined REGISTER NOW                        | 2026-03-10 | 87d19d8 | [16-create-header-and-footer-components-from](./quick/16-create-header-and-footer-components-from/) |
| 17  | fix invalid font-[var()] Tailwind class causing CSS parse error                                               | 2026-03-10 | bae300b | [17-fix-invalid-font-var-tailwind-class-caus](./quick/17-fix-invalid-font-var-tailwind-class-caus/) |
| 18  | fix header logo and footer layout with Google Sans depth effect                                               | 2026-03-10 | 8acfd03 | [18-fix-header-logo-and-footer-layout-with-g](./quick/18-fix-header-logo-and-footer-layout-with-g/) |
| 19  | make footer REGISTER NOW solid white fill and full-width                                                      | 2026-03-10 | 6055570 | [19-the-footer-register-now-to-be-bold-and-t](./quick/19-the-footer-register-now-to-be-bold-and-t/) |
| 20  | load Google Sans from CDN to unlock weight 900                                                                | 2026-03-10 | dd7b350 | [20-use-google-sans-font-from-fonts-google-c](./quick/20-use-google-sans-font-from-fonts-google-c/) |
| 21  | fix --font-google-sans is not defined — replace with literal font name in FooterSection                       | 2026-03-10 | 6ce6750 | [21-fix-font-google-sans-is-not-defined-by-l](./quick/21-fix-font-google-sans-is-not-defined-by-l/) |
| 22  | fix REGISTER NOW depth effect — solid fill copy1 so ghost copies don't bleed through letters                  | 2026-03-10 | 2c9ead5 | [22-fix-register-now-depth-effect-letters-ov](./quick/22-fix-register-now-depth-effect-letters-ov/) |
| 23  | make footer REGISTER NOW depth effect outline-only on all three copies                                        | 2026-03-10 | 7f83689 | [23-footer-register-now-instead-of-transpare](./quick/23-footer-register-now-instead-of-transpare/) |
| 25  | fix REGISTER NOW z-index not working — add relative to all three depth effect paragraphs                      | 2026-03-10 | a62e100 | [25-fix-register-now-z-index-not-working-cha](./quick/25-fix-register-now-z-index-not-working-cha/) |
| 26  | make website responsive on mobile viewport                                                                    | 2026-03-10 | 6bcb762 | [26-make-website-responsive-on-mobile-viewpo](./quick/26-make-website-responsive-on-mobile-viewpo/) |
| 27  | make KL Tower / TM Tower animation row compact on mobile                                                      | 2026-03-10 | 7e56419 | [27-the-kltower-tmtower-animation-row-make-i](./quick/27-the-kltower-tmtower-animation-row-make-i/) |
| 28  | enlarge WHAT IS BUILD WITH AI card on desktop viewport                                                        | 2026-03-10 | f4011f3 | [28-what-is-build-with-ai-card-need-to-be-la](./quick/28-what-is-build-with-ai-card-need-to-be-la/) |
| 29  | make WhatIsBAI card right hatch stripe fill full card height                                                  | 2026-03-10 | 2b78c1d | [29-the-what-is-build-with-ai-card-right-han](./quick/29-the-what-is-build-with-ai-card-right-han/) |

| 30  | make benefit section icons smaller on mobile viewport                                                         | 2026-03-10 | d6826bc | [30-for-the-benefits-section-make-the-image-](./quick/30-for-the-benefits-section-make-the-image-/) |
| 260406-vzf | update timeline section with real Build with AI 2026 KL event dates                               | 2026-04-06 | 0721a42 | [260406-vzf-update-timeline-section-with-real-build-](./quick/260406-vzf-update-timeline-section-with-real-build-/) |
| 260406-w4p | update sponsor list with 6 sponsors                                                               | 2026-04-06 | 11d106a | [260406-w4p-update-the-sponsor-list](./quick/260406-w4p-update-the-sponsor-list/) |
| 260409-frw | update the links                                                                                  | 2026-04-09 | 8b18566 | [260409-frw-update-the-links](./quick/260409-frw-update-the-links/) |

## Session Continuity

Last session: 2026-03-10
Stopped at: quick-30 complete
Resume file: None
