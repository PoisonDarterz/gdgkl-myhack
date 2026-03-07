# Project Research Summary

**Project:** MyHack / Build With AI KL — Event Landing Page
**Domain:** Static single-page event landing page, Figma-driven, developer-audience aesthetic
**Researched:** 2026-03-07
**Confidence:** HIGH

## Executive Summary

This project is a pixel-faithful static landing page for a GDG developer event in Kuala Lumpur, built on a Next.js 16.1.6 App Router scaffold that already has the full required stack installed. The implementation pattern is well-established: flat Server Component composition in `app/page.tsx`, nine section components in `app/components/sections/`, data arrays in `lib/data/`, and all styling through Tailwind CSS v4 CSS-first configuration. No new packages are required. The work is entirely front-end: fonts, CSS tokens, and static JSX faithful to the Figma design.

The recommended approach is strictly sequential: configure fonts and global styles first (everything downstream depends on them), validate the hero section second (it exercises all three primary fonts and establishes the retro terminal aesthetic), then implement remaining sections top-to-bottom per Figma scroll order. All nine sections are in scope for the single deliverable — there is no phased feature rollout. This is a complete-or-nothing implementation milestone.

The key risks are concentrated in the font setup phase. Workbench requires explicit `axes` configuration to render its LED segment effect; without it the most visually distinctive element of the design (the "KUALA LUMPUR" hero text) renders as plain monospace. The existing `globals.css` has a broken self-referencing `--font-sans: var(--font-sans)` declaration and a shadcn dark mode block that must both be corrected before any component work. Figma pixel values from the 6929x13969px canvas cannot be directly translated to CSS — viewport-relative sizing with `clamp()` is required for display text. All remaining pitfalls are mechanical and preventable with the specific patterns documented in PITFALLS.md.

---

## Key Findings

### Recommended Stack

The existing stack requires no additions. Next.js 16.1.6 with `next/font/google` handles all three design fonts (Courier Prime, Instrument Serif, Workbench) plus Google Sans for the marquee, with self-hosting, zero FOUT risk, and preload injection built in. Tailwind CSS v4 uses CSS-first `@theme inline` configuration in `globals.css` — there is no `tailwind.config.js` and one must not be created. Supporting utilities (`clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, `radix-ui`) are already installed from the shadcn scaffold.

The marquee animation is achievable with a 5-line `@keyframes marquee` definition in `globals.css`. The noise/grain texture overlay is achievable with an inline SVG `feTurbulence` filter or a base64 PNG in CSS. Neither requires a package.

**Core technologies:**
- `next/font/google` (built into Next.js): Font loading — self-hosted, zero FOUT, preload injected automatically
- Tailwind CSS v4 with `@theme inline`: Utility styling — CSS-first config, font/color tokens via CSS custom properties
- React Server Components (default): All nine sections — no client state needed except possibly FAQ accordion
- `lib/data/*.ts` typed arrays: Content separation — timeline, FAQ, and partners data abstracted from rendering

### Expected Features

This project has a fixed feature scope defined by the Figma design. All nine sections are required for the deliverable; none are deferrable.

**Must have (table stakes):**
- Hero section — event name, date, location, CTA button; first impression and only conversion surface
- Primary CTA (Register) — placeholder `href="#"` per design; appears in hero and as marquee section
- About / What is Build With AI? — terminal system log block; event context for attendees
- Event schedule / timeline — date, name, description, type badge per card
- Partners / sponsors — Google diamond sponsor display; legitimacy signal
- FAQ section — static Q&A; reduces support burden
- Footer — GDG KL branding, Privacy Policy, Code of Conduct links
- Page metadata — title and description; currently set to "Create Next App" default, must be replaced

**Should have (differentiators for this design):**
- Retro terminal / hacker aesthetic — Courier Prime throughout, bracket notation, noise textures, `#282828` on `#F5F5F5`
- Terminal system log block — on-brand styled `<pre>` for About section content
- Benefits cards with `#` prefix headings — code-comment visual style, three cards
- Stats bar — 2,258 events / 178,000 developers; social proof static numbers
- Scrolling marquee "REGISTER NOW" — CSS `@keyframes` only, no JS library

**Explicitly out of scope (do not build):**
- Backend form submission, dark mode, multi-page routing, mobile responsive design
- JS-heavy interactivity, countdown timers, social feeds, payment flows, CMS, analytics

### Architecture Approach

The architecture is a flat Server Component assembly pattern. `app/page.tsx` is a thin assembler that imports and renders nine section components in Figma scroll order. Each section component is a pure RSC with no props — it either uses inline data (hero, about, stats, footer) or imports a typed array from `lib/data/` (timeline, partners, FAQ). Sub-components for repeated items (TimelineCard, BenefitCard, FaqItem) are co-located in the same file as their parent section unless reused across sections.

**Major components:**
1. `app/layout.tsx` — font loading via `next/font/google`, CSS variable injection onto `<html>`
2. `app/globals.css` — Tailwind `@theme inline` with font/color tokens, `@keyframes marquee`, noise texture
3. `app/page.tsx` — section assembler, imports all nine section components in order
4. `app/components/sections/` (9 files) — one RSC per Figma section
5. `lib/data/` (3 files) — `timeline.ts`, `faq.ts`, `partners.ts` with typed arrays

### Critical Pitfalls

1. **Workbench axes not configured** — Without `axes: ['BLED', 'SCAN']` in the Workbench font config, `next/font/google` omits the LED segment effect axes and the font renders as plain monospace. The hero city name loses its defining visual character. Verify exact axis strings at fonts.google.com/specimen/Workbench before implementing.

2. **globals.css self-referencing `--font-sans`** — The existing shadcn scaffold has `--font-sans: var(--font-sans)` (circular, resolves to nothing). Any element using `font-sans` falls back to browser default. Replace with `--font-sans: var(--font-courier-prime)` as the first CSS edit.

3. **Font variables scoped to `<body>` instead of `<html>`** — The shadcn `@layer base` sets fonts on the `html` element. Font CSS variables must be applied as classes on `<html>`, not `<body>`, or the `@theme inline` mappings resolve to empty.

4. **Figma canvas pixel values ≠ viewport CSS values** — The design frame is 6929x13969px. Hero display text sizes cannot be copied directly; use `clamp()` or `vw`-based sizing derived from the target viewport (likely 1440px). Failing to do this causes hero text overflow or an undersized appearance.

5. **Dynamic Tailwind class construction is purged** — Tailwind v4 scans source as plain text. String interpolation to build class names (`` `text-${size}` ``) produces classes that exist in dev but are stripped from production CSS. Always use complete static strings or inline `style` props for dynamic values.

---

## Implications for Roadmap

Based on the dependency chain identified in ARCHITECTURE.md and the pitfall concentration identified in PITFALLS.md, the correct build order is:

### Phase 1: Foundation — Font Loading and Global Styles
**Rationale:** Every section depends on correct font CSS variables. The three most critical pitfalls (Workbench axes, self-referencing `--font-sans`, font variables on wrong element) all live here. Building any section before this is resolved means rebuilding it after fixing the foundation.
**Delivers:** `layout.tsx` with all four fonts loaded correctly; `globals.css` with corrected `@theme inline`, design color tokens, `@keyframes marquee`, shadcn dark mode block addressed, and noise texture definition.
**Addresses:** Page metadata (title/description update in layout.tsx).
**Avoids:** Pitfalls 1, 2, 3, 6, 9, 12, 15, 17, 18 — all font and theme configuration pitfalls.

### Phase 2: Hero Section
**Rationale:** Highest visual priority. Exercises all three primary fonts simultaneously. Establishes viewport baseline for `clamp()` sizing that all other sections with display text will reference. Fastest validation that the foundation phase was correct.
**Delivers:** HeroSection component — "Build With AI" title (Instrument Serif), "KUALA LUMPUR" (Workbench with LED axes), signal badge, tagline, description, CTA button.
**Avoids:** Pitfall 4 (Figma pixel scaling) — establish the viewport baseline here; Pitfall 13 (font fallback flash) — set `display: 'block'` on display fonts if FOUT is visible.

### Phase 3: Static Content Sections (Benefits, About, Stats, Footer)
**Rationale:** These four sections are structurally simple, fully inline (no data files), and independent of each other. Building them together after the hero validates the aesthetic language across section types before tackling the data-driven sections. Footer closes the page shell early.
**Delivers:** BenefitsSection (three `#`-prefixed feature cards), AboutSection (terminal log block with `whitespace-pre` monospace), StatsSection (two static numbers), FooterSection (GDG KL branding and links).
**Avoids:** Pitfall 14 (terminal block monospace alignment) — explicit `font-family` and `whitespace-pre` on the About section's log block.

### Phase 4: Data-Driven Sections (Timeline, Partners, FAQ)
**Rationale:** These three sections require creating `lib/data/` files first. Grouping them together means the data layer is established in one pass. Timeline is the most complex (multiple card fields, type badge variants). FAQ and Partners are straightforward grids/lists.
**Delivers:** `lib/data/timeline.ts`, `lib/data/partners.ts`, `lib/data/faq.ts` typed arrays; TimelineSection, PartnersSection, FaqSection components.
**Avoids:** Pitfall 10 (Figma layout → CSS mismatch) — use `min-height` not `height` on cards; test with variable content length before marking done.

### Phase 5: Register CTA Marquee Section
**Rationale:** Build last because it requires the `@keyframes marquee` defined in Phase 1 to be working, uses Google Sans (the fourth font), and has a specific overflow isolation requirement. Testing it in isolation before integrating is easier than debugging it mid-page.
**Delivers:** RegisterSection with CSS-only horizontal marquee, `will-change: transform`, and correct `overflow-x: hidden` isolation.
**Avoids:** Pitfall 11 (horizontal overflow causing page scroll) — `overflow-x: hidden` on section wrapper, not document root; CSS animation, not JS.

### Phase Ordering Rationale

- Font and global styles must precede all sections — three of the eleven critical pitfalls are in this phase and would cascade failures into every section built before they are fixed.
- Hero second because it is the aesthetic north star — if fonts render incorrectly here, the problem is caught before investing in eight more sections.
- Footer included in Phase 3 (not last) to close the page shell early and enable full-page visual review throughout remaining phases.
- Data-driven sections grouped together so the `lib/data/` layer is created in one focused pass rather than interleaved with section work.
- Marquee last because it is the only section with a CSS animation dependency and an overflow isolation requirement that is easiest to debug in isolation.

### Research Flags

Phases with standard, well-documented patterns (research-phase not needed):
- **Phase 1 (Foundation):** Font loading via `next/font/google` and Tailwind v4 `@theme inline` are fully documented with exact code patterns in STACK.md and ARCHITECTURE.md. Implementation is deterministic.
- **Phase 3 (Static sections):** Pure static JSX with Tailwind utilities. No novel patterns.
- **Phase 5 (Marquee):** CSS `@keyframes` marquee is a well-established pattern fully documented in STACK.md.

Phases that may need verification during implementation:
- **Phase 1 (Workbench axes):** The specific axis identifiers `BLED` and `SCAN` are MEDIUM confidence. Verify at fonts.google.com/specimen/Workbench before writing the font config. If axes differ, the font loads without the LED effect.
- **Phase 4 (FAQ accordion):** Whether the FAQ is interactive (requires `"use client"`) or static (stays RSC) depends on Figma inspection that was not possible during research. Inspect the Figma frame before implementing.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against official Next.js 16.1.6 docs and Tailwind v4 docs; font imports confirmed via `font-data.json` in installed package |
| Features | HIGH | Sourced directly from PROJECT.md Figma design walkthrough; section list is definitive |
| Architecture | HIGH | Next.js App Router RSC composition pattern is official and well-documented; data shape decisions are straightforward for this scope |
| Pitfalls | HIGH (with two MEDIUM exceptions) | Critical pitfalls sourced from official docs and direct codebase inspection; Workbench axis names and Instrument Serif weight limit are MEDIUM — verify before implementing |

**Overall confidence:** HIGH

### Gaps to Address

- **Workbench `axes` values:** `['BLED', 'SCAN']` is the documented expectation from PITFALLS.md but flagged MEDIUM confidence. Before implementing Phase 1, open fonts.google.com/specimen/Workbench and confirm the exact axis identifiers (case-sensitive). If the axes differ from documented values, update the font config accordingly.

- **FAQ interactivity:** The Figma design was not inspected for whether FAQ entries are collapsible. If the design shows a chevron or "click to expand" affordance, FaqSection needs `"use client"` and toggle state. If all answers are statically visible, it stays RSC. Determine this before starting Phase 4.

- **Target viewport width:** The Figma canvas is 6929px wide. The intended viewport for the desktop design (1440px or 1920px) determines the `clamp()` baseline for hero display text sizing. Confirm with the design before implementing Phase 2 hero typography.

- **Noise texture blend mode:** The Figma design's noise layer blend mode (multiply, overlay, or screen) affects the CSS implementation. Identify the Figma layer blend mode before implementing the texture in Phase 1.

---

## Sources

### Primary (HIGH confidence)
- Next.js Font Optimization docs (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/fonts
- Next.js Font API Reference (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/api-reference/components/font
- Tailwind CSS v4 Upgrade Guide: https://tailwindcss.com/docs/upgrade-guide
- Tailwind CSS v4 Arbitrary Values: https://tailwindcss.com/docs/adding-custom-styles
- Installed package font data: `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`
- Project codebase direct inspection: `app/layout.tsx`, `app/globals.css`, `package.json`
- PROJECT.md: Section requirements sourced from Figma design walkthrough

### Secondary (MEDIUM confidence)
- Workbench font axes (BLED, SCAN): inferred from font design documentation; verify at fonts.google.com/specimen/Workbench
- Instrument Serif weight limitation (400 only): inferred from Google Fonts catalog conventions; verify at fonts.google.com/specimen/Instrument+Serif

---
*Research completed: 2026-03-07*
*Ready for roadmap: yes*
