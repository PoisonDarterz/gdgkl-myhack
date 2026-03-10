---
phase: quick-26
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/Header.tsx
  - src/components/sections/HeroSection.tsx
  - src/components/sections/BenefitsSection.tsx
  - src/components/sections/TimelineSection.tsx
  - src/components/sections/PartnersSection.tsx
  - src/components/sections/FAQSection.tsx
  - src/components/sections/FooterSection.tsx
  - src/components/LandmarksRow.tsx
autonomous: false
requirements: []

must_haves:
  truths:
    - "On mobile (<640px), all sections stack vertically with no horizontal overflow"
    - "Hero heading and stats are readable on mobile (no text-8xl or text-7xl at sm)"
    - "Timeline and Partners grids collapse to 1 column on mobile, 2 on sm"
    - "Header hides or wraps Instagram link gracefully on mobile"
    - "Footer top zone stacks GDG box and links vertically on mobile"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Mobile-responsive hero — single column on sm, two column on lg"
    - path: "src/components/sections/BenefitsSection.tsx"
      provides: "Mobile-responsive benefits — stacked column on sm, row on lg"
    - path: "src/components/sections/TimelineSection.tsx"
      provides: "Mobile-responsive timeline grid — 1 col on sm, 2 on md, 4 on lg"
    - path: "src/components/sections/PartnersSection.tsx"
      provides: "Mobile-responsive partners grid — 1 col on sm, 3 on lg"
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Mobile-responsive footer — stacked on sm, side-by-side on md"
  key_links:
    - from: "HeroSection left column"
      to: "HeroSection right column"
      via: "flex-col on mobile, flex-row on lg"
      pattern: "flex-col lg:flex-row"
    - from: "BenefitsSection left"
      to: "BenefitsSection RecapVideoCard"
      via: "flex-col on mobile, flex-row on lg"
      pattern: "flex-col lg:flex-row"
---

<objective>
Make every section of the landing page responsive on mobile viewports (320px–640px).

Purpose: The site currently has fixed-width columns, text-8xl headings, and 4-column grids that overflow and break on mobile screens.
Output: All sections use Tailwind responsive prefixes (sm:, md:, lg:) so the layout stacks correctly on mobile and looks like the Figma design on desktop.
</objective>

<execution_context>
@E:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@E:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Make HeroSection and Header responsive</name>
  <files>src/components/Header.tsx, src/components/sections/HeroSection.tsx</files>
  <action>
**Header.tsx:**
- On mobile, hide the Instagram link text or truncate it. Add `hidden sm:block` to the Instagram `<a>` tag so it disappears on mobile, keeping only the GDG logo+text group on tiny screens. Alternatively use `text-[10px] sm:text-xs` and allow wrapping with `flex-wrap gap-2` on the header.
- Preferred: add `hidden md:flex` to the Instagram link so it hides on mobile/tablet and appears on md+.

**HeroSection.tsx:**
- Change the outer `<section>` flex from `flex justify-between gap-0 items-stretch` to `flex flex-col lg:flex-row justify-between gap-0 lg:items-stretch`. On mobile sections stack vertically.
- Left column: remove `max-w-[50%]` and replace with `w-full lg:max-w-[50%]` so it takes full width on mobile.
- Heading row: change `text-8xl` to `text-4xl sm:text-6xl lg:text-8xl`. The `KUALA LUMPUR` span: `text-base sm:text-xl`.
- Description `<p>`: change `text-xl` to `text-base sm:text-xl`.
- Right column: change `w-[420px] shrink-0` to `w-full lg:w-[420px] lg:shrink-0`. The column currently uses no height constraint — on mobile it will naturally expand.
- Stats: change `text-7xl` to `text-4xl sm:text-6xl lg:text-7xl` on both stat number spans. Icon sizes: change `width={120} height={120}` to `width={80} height={80}` with `sm:w-[120px] sm:h-[120px]` via className (or just use smaller fixed sizes for all breakpoints since icons scale fine at 80px).
- WhatIsBAI box `border border-brand-text relative flex-1`: on mobile `flex-1` inside a flex-col parent is fine — it will grow to fill remaining height. No change needed.
- The diagonal hatch right panel `w-24 lg:w-32` — already has lg prefix. No change needed.
  </action>
  <verify>Open http://localhost:3000 in browser at 375px viewport width. Hero should show left column full-width above right column. No horizontal scrollbar.</verify>
  <done>Header shows only GDG logo on mobile. Hero stacks vertically on mobile with readable heading sizes. No overflow at 375px.</done>
</task>

<task type="auto">
  <name>Task 2: Make BenefitsSection, TimelineSection, PartnersSection, FAQSection, FooterSection, and LandmarksRow responsive</name>
  <files>
    src/components/sections/BenefitsSection.tsx,
    src/components/sections/TimelineSection.tsx,
    src/components/sections/PartnersSection.tsx,
    src/components/sections/FAQSection.tsx,
    src/components/sections/FooterSection.tsx,
    src/components/LandmarksRow.tsx
  </files>
  <action>
**BenefitsSection.tsx:**
- Outer `flex flex-row justify-between` → `flex flex-col lg:flex-row justify-between`.
- Left div `w-[70%]` → `w-full lg:w-[70%]`.
- Right div (RecapVideoCard wrapper): add `w-full lg:w-auto mt-4 lg:mt-0` and change `self-stretch` to `lg:self-stretch`. RecapVideoCard needs a height on mobile since `h-full` needs a parent height. Set `min-h-[280px]` on the RecapVideoCard wrapper div on mobile: `className="shrink-0 self-stretch w-full lg:w-auto mt-4 lg:mt-0"` and add `min-h-[280px] lg:min-h-0` to the wrapper.
- Section title span: add `text-3xl sm:text-5xl` instead of just `text-5xl`.

**TimelineSection.tsx:**
- `grid grid-cols-4` → `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- Section title span: `text-3xl sm:text-5xl`.

**PartnersSection.tsx:**
- `grid grid-cols-3` → `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Section title span: `text-3xl sm:text-5xl`.

**FAQSection.tsx:**
- Section is already single-column (accordion list). Only responsive change needed: section title `text-5xl` → `text-3xl sm:text-5xl`.

**FooterSection.tsx:**
- Top zone `flex items-start justify-between px-8 py-10` → `flex flex-col sm:flex-row items-start sm:justify-between px-6 sm:px-8 py-8 sm:py-10 gap-6 sm:gap-0`.
- Right div `flex flex-col items-end gap-8` → `flex flex-col sm:items-end gap-6 sm:gap-8`.
- REGISTER NOW text: already uses `text-[14vw]` which is viewport-width relative — already responsive. No change needed.

**LandmarksRow.tsx:**
- `min-h-50` → `min-h-32 sm:min-h-50`. Building image dimensions: already `width={50} height={70}`, fine on mobile.
- `justify-around` layout with 4 UnionIcons and 3 building slots — already wraps fine since flex row with fixed small items. No changes needed beyond the min-height.
  </action>
  <verify>
    1. At 375px viewport: scroll through the full page — each section stacks single-column, no horizontal scroll.
    2. At 640px: timeline shows 2 columns, partners shows 2 columns.
    3. At 1024px+: desktop layout matches original design unchanged.
  </verify>
  <done>All sections render without horizontal overflow at 375px. Grids collapse to 1 col (mobile) and 2 col (sm). Footer stacks vertically on mobile. Desktop layout is unchanged.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Full mobile responsiveness pass across all sections: Header, HeroSection, BenefitsSection, TimelineSection, PartnersSection, FAQSection, FooterSection, LandmarksRow.</what-built>
  <how-to-verify>
    1. Open http://localhost:3000 in Chrome DevTools — set viewport to 375px (iPhone SE size).
    2. Scroll from top to bottom. Check:
       - Header: only GDG logo+name visible, no overflowing Instagram link
       - Hero: single column, heading readable (not tiny), no horizontal scroll
       - Benefits: benefit cards stacked above recap video card
       - Timeline: 1-column card list (or 2 columns at sm breakpoint)
       - Partners: sponsor grid single column
       - FAQ: accordion works, no overflow
       - Footer: GDG box above policy links, REGISTER NOW text centered
    3. Resize to 1280px — confirm desktop layout is unchanged from before.
    4. Check for any horizontal scrollbar at 375px (should be none).
  </how-to-verify>
  <resume-signal>Type "approved" if mobile layout looks correct, or describe specific issues to fix.</resume-signal>
</task>

</tasks>

<verification>
- No horizontal overflow at 375px viewport (check document.documentElement.scrollWidth === window.innerWidth in console)
- All grids use responsive col prefixes: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- Hero heading and stat numbers are scaled down on mobile (not text-8xl or text-7xl at small sizes)
- Desktop layout at 1280px is unchanged
</verification>

<success_criteria>
- Mobile (375px): single-column layout throughout, no horizontal scroll, all text readable
- Tablet (640px): 2-column grids for timeline and partners
- Desktop (1280px): original Figma-matched layout preserved exactly
</success_criteria>

<output>
After completion, create `.planning/quick/26-make-website-responsive-on-mobile-viewpo/26-SUMMARY.md`
</output>
