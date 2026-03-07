# Architecture Patterns

**Domain:** Static event landing page — Next.js 15 App Router, single scrollable page
**Researched:** 2026-03-07
**Confidence:** HIGH (Next.js official docs + verified font data from installed package)

---

## Recommended Architecture

A flat Server Component composition model: `app/page.tsx` assembles all section components in order. No routing, no state management, no data fetching — pure render-time composition of static content.

```
app/
├── layout.tsx              ← font loading + global CSS vars
├── page.tsx                ← section assembler (imports all sections in order)
├── globals.css             ← Tailwind + @theme inline with font CSS vars
└── components/
    └── sections/
        ├── HeroSection.tsx
        ├── BenefitsSection.tsx
        ├── AboutSection.tsx
        ├── StatsSection.tsx
        ├── TimelineSection.tsx
        ├── PartnersSection.tsx
        ├── FaqSection.tsx
        ├── RegisterSection.tsx
        └── FooterSection.tsx
lib/
└── data/
    ├── timeline.ts         ← event card data array
    ├── faq.ts              ← Q&A pairs array
    └── partners.ts         ← sponsor data array
```

---

## Component Breakdown

Each Figma section maps to exactly one Server Component file. Components are pure (no props needed from page — they import their own data from `lib/data/`).

| Component | Figma Section | RSC | Notes |
|-----------|---------------|-----|-------|
| `HeroSection` | Hero frame | Yes | Static text + CTA anchor. No client state. |
| `BenefitsSection` | Three feature cards | Yes | Static. Cards rendered via `.map()` over inline array. |
| `AboutSection` | "What is Build With AI?" + terminal log block | Yes | Static text with preformatted terminal block. |
| `StatsSection` | 2,258 events / 178,000 developers stats | Yes | Static numbers — inline, no data file needed. |
| `TimelineSection` | Event timeline cards | Yes | Iterates `lib/data/timeline.ts`. |
| `PartnersSection` | Google diamond sponsor display | Yes | Iterates `lib/data/partners.ts`. |
| `FaqSection` | Accordion or static Q&A | Yes (default) | See note below on accordion. |
| `RegisterSection` | Marquee "REGISTER NOW" | Conditional | See note below on marquee. |
| `FooterSection` | GDG KL branding + links | Yes | Static — inline links. |

### FAQ Accordion Note

If the design shows a collapsible accordion (click to expand/collapse answers), `FaqSection` needs `"use client"` for the toggle state. If the design shows all answers statically visible (no interaction), it remains a Server Component. Given the retro/hacker aesthetic, static Q&A with no interaction is architecturally simpler and consistent with the static-page constraint. Default to RSC unless Figma inspection confirms interactive collapse.

### Marquee (RegisterSection) Note

A pure CSS marquee (`@keyframes scroll` + `overflow: hidden`) requires no client JS and stays a Server Component. A JS-animated marquee (for pause-on-hover or precise control) would need `"use client"`. Prefer the CSS approach: define a `marquee` keyframe in `globals.css` and apply it with a Tailwind custom utility. This keeps the component a Server Component.

---

## Data Flow

All data is static — no API calls, no database, no server-side fetching.

```
lib/data/timeline.ts     → TimelineSection (import)
lib/data/faq.ts          → FaqSection (import)
lib/data/partners.ts     → PartnersSection (import)

BenefitsSection          ← inline array (3 items, simple enough to not warrant a file)
StatsSection             ← inline literal values
HeroSection              ← inline JSX (no data abstraction needed)
AboutSection             ← inline JSX (terminal log block is fixed content)
FooterSection            ← inline JSX (links are fixed)
```

**Rule:** Use `lib/data/` for arrays of 3+ structurally identical items that will be iterated. Use inline data for one-off static content.

**Data shape for timeline items:**
```typescript
// lib/data/timeline.ts
export type TimelineEvent = {
  date: string          // e.g. "March 15, 2026"
  name: string
  description: string
  type: "workshop" | "hackathon" | "talk" | string
}
export const timelineEvents: TimelineEvent[] = [...]
```

**Data shape for FAQ:**
```typescript
// lib/data/faq.ts
export type FaqItem = {
  question: string
  answer: string
}
export const faqItems: FaqItem[] = [...]
```

---

## Font Architecture

**Confirmed via `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`:**

| Font | Available in next/font/google | Variable Font | Import Name | Subsets |
|------|-------------------------------|---------------|-------------|---------|
| Courier Prime | Yes | No (weight required) | `Courier_Prime` | latin |
| Instrument Serif | Yes | No (weight required) | `Instrument_Serif` | latin |
| Workbench | Yes | Yes | `Workbench` | latin |
| Google Sans | Yes | Yes | `Google_Sans` | latin |

**Pattern: CSS Variable approach with Tailwind v4**

Load all fonts in `app/layout.tsx` using the `variable` option. Inject CSS variable class names onto `<html>`. Wire to Tailwind in `globals.css` via `@theme inline`.

```typescript
// app/layout.tsx
import { Courier_Prime, Instrument_Serif, Workbench, Google_Sans } from 'next/font/google'

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier-prime',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const workbench = Workbench({
  subsets: ['latin'],
  variable: '--font-workbench',
  display: 'swap',
})

const googleSans = Google_Sans({
  subsets: ['latin'],
  variable: '--font-google-sans',
  display: 'swap',
})

// In RootLayout, apply all variable classes to <html>:
// className={`${courierPrime.variable} ${instrumentSerif.variable} ${workbench.variable} ${googleSans.variable}`}
```

```css
/* app/globals.css */
@import 'tailwindcss';

@theme inline {
  --font-mono: var(--font-courier-prime);
  --font-serif: var(--font-instrument-serif);
  --font-display: var(--font-workbench);
  --font-register: var(--font-google-sans);

  --color-background: #F5F5F5;
  --color-foreground: #282828;
  --color-muted: #5C5C5C;
}
```

This allows using `font-mono`, `font-serif`, `font-display`, `font-register` as Tailwind utility classes throughout components.

---

## Build Order

Dependencies are strictly vertical (later sections have no component dependencies on earlier ones). The recommended build order is driven by visual complexity and isolation:

1. **Font + global styles setup** (`layout.tsx` + `globals.css`)
   — Foundation. Everything else breaks without correct font CSS variables.

2. **HeroSection** — Visually highest priority, most prominent, tests all three primary fonts in one place.

3. **FooterSection** — Simple static component. Validates the page shell works.

4. **BenefitsSection** — Three cards, tests the `#` prefix heading pattern and dot separator.

5. **AboutSection** — Terminal log block. Tests monospace formatting and preformatted layout.

6. **StatsSection** — Two-stat layout. Quick win.

7. **TimelineSection** — Requires `lib/data/timeline.ts` to be created first. Most data-driven section.

8. **PartnersSection** — Requires `lib/data/partners.ts`. Grid layout.

9. **FaqSection** — Requires `lib/data/faq.ts`. Implement as static RSC unless Figma confirms interactive accordion.

10. **RegisterSection** — Marquee animation. Implement CSS `@keyframes` scroll in `globals.css`, apply in component. Build last because it requires a working Tailwind custom animation setup.

**No cross-section dependencies exist.** Any section can be built in isolation. The order above is recommendation only, not constraint.

---

## Patterns to Follow

### Pattern 1: Section Component as RSC
**What:** Every section is a default-exported async React Server Component with no props.
**When:** All sections — they have no parent-provided data, only static or file-imported data.
**Example:**
```typescript
// app/components/sections/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="...">
      {/* content */}
    </section>
  )
}
```

### Pattern 2: Data file per iterated section
**What:** Arrays of structured content live in `lib/data/*.ts` and are imported by their section component.
**When:** Any section that renders 3+ structurally identical items (cards, events, FAQ pairs).
**Example:**
```typescript
// lib/data/timeline.ts
export const timelineEvents: TimelineEvent[] = [
  { date: "...", name: "...", description: "...", type: "workshop" },
]

// app/components/sections/TimelineSection.tsx
import { timelineEvents } from '@/lib/data/timeline'
export default function TimelineSection() {
  return (
    <section>
      {timelineEvents.map((event, i) => (
        <TimelineCard key={i} {...event} />
      ))}
    </section>
  )
}
```

### Pattern 3: Sub-components for repeated items
**What:** Within a section, repeated item renderers become their own components (not separate files unless complex).
**When:** TimelineCard inside TimelineSection, BenefitCard inside BenefitsSection.
**Rule:** If the sub-component is only used within one section, co-locate it in the same file below the main export. Only extract to a separate file if it will be reused across sections.

### Pattern 4: CSS marquee over JS marquee
**What:** `@keyframes` + `animation` for the Register marquee — no `useEffect`, no `requestAnimationFrame`.
**When:** RegisterSection.
**Example:**
```css
/* globals.css */
@keyframes marquee {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}
```
```typescript
// RegisterSection.tsx — style attribute for animation (no "use client" needed)
<div style={{ animation: 'marquee 8s linear infinite' }}>
  {/* duplicate content twice to create seamless loop */}
</div>
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Monolithic page.tsx
**What:** Putting all section JSX directly in `app/page.tsx`.
**Why bad:** File becomes 500+ lines. Hard to navigate, no separation of concerns, no isolated testing per section.
**Instead:** `app/page.tsx` is a thin assembler: imports and renders section components in order, nothing else.

### Anti-Pattern 2: Fetching fonts at component level
**What:** Loading fonts inside individual section components instead of `layout.tsx`.
**Why bad:** Same font loaded multiple times = multiple network requests, increased bundle size. Next.js warns about this.
**Instead:** All fonts loaded once in `layout.tsx`, exposed as CSS variables, consumed by Tailwind utilities everywhere.

### Anti-Pattern 3: Hardcoding data inline in complex sections
**What:** Embedding timeline event objects or FAQ pairs directly in JSX.
**Why bad:** Mixing content and structure. Designer/content changes require editing component logic.
**Instead:** Structured data in `lib/data/*.ts`, components only handle rendering.

### Anti-Pattern 4: Adding "use client" defensively
**What:** Marking sections as client components "just in case" or for convenience.
**Why bad:** Pushes components into the client bundle, losing RSC streaming and server-render benefits.
**Instead:** Default to RSC. Only add `"use client"` when browser-only APIs are actually required (event listeners, refs, state).

### Anti-Pattern 5: Importing Google_Sans as "Google Sans" (space)
**What:** Writing `import { "Google Sans" } from 'next/font/google'` — this is invalid JS syntax.
**Why bad:** Compile error.
**Instead:** `import { Google_Sans } from 'next/font/google'` (underscore replaces space — Next.js convention, confirmed in official docs).

---

## Component Boundaries Summary

| Component | File | RSC? | Has Sub-components | Data Source |
|-----------|------|------|--------------------|-------------|
| `HeroSection` | `sections/HeroSection.tsx` | Yes | No | Inline |
| `BenefitsSection` | `sections/BenefitsSection.tsx` | Yes | Yes — `BenefitCard` (co-located) | Inline array |
| `AboutSection` | `sections/AboutSection.tsx` | Yes | No | Inline |
| `StatsSection` | `sections/StatsSection.tsx` | Yes | No | Inline literals |
| `TimelineSection` | `sections/TimelineSection.tsx` | Yes | Yes — `TimelineCard` (co-located) | `lib/data/timeline.ts` |
| `PartnersSection` | `sections/PartnersSection.tsx` | Yes | No | `lib/data/partners.ts` |
| `FaqSection` | `sections/FaqSection.tsx` | Yes (default) | Yes — `FaqItem` (co-located) | `lib/data/faq.ts` |
| `RegisterSection` | `sections/RegisterSection.tsx` | Yes | No | Inline |
| `FooterSection` | `sections/FooterSection.tsx` | Yes | No | Inline |

---

## Sources

- Next.js Font Optimization docs (official, fetched 2026-03-07): https://nextjs.org/docs/app/getting-started/fonts — HIGH confidence
- Next.js Font API Reference (official, fetched 2026-03-07): https://nextjs.org/docs/app/api-reference/components/font — HIGH confidence
- Font availability verified directly from installed package: `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` — HIGH confidence (Workbench: confirmed variable font with latin subset; Google Sans: confirmed with variable weight)
