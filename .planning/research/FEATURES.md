# Feature Landscape

**Domain:** GDG "Build With AI" event landing page (static, single-page, Figma-driven)
**Researched:** 2026-03-07
**Source of Truth:** Figma file `42FrlqAKolEHOx0G8p7k3D`, node `193-30` (LANDING frame, 6929x13969px), cross-referenced with PROJECT.md

## Table Stakes

Features users expect on any developer event landing page. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section | First impression; must communicate event name, date, location instantly | Low | Instrument Serif "Build With AI" + Workbench "KUALA LUMPUR" + signal badge + tagline + description + CTA button |
| Primary CTA (Register) | Users arrive to register; the CTA is the entire conversion goal | Low | "REGISTER NOW" with `href="#"` placeholder per design; appears in hero and as a standalone marquee section |
| About / What is this? section | Attendees need context: what is the event, who runs it, why attend | Low | "What is Build With AI?" heading + terminal-style system log block explaining the program |
| Event schedule / timeline | Attendees need to know what happens when | Medium | Cards with date, event name, description, type badge (e.g., hackathon, workshop); multiple events listed |
| Partners / sponsors section | Sponsors require visibility; it signals legitimacy to attendees | Low | Google displayed as diamond sponsor; logo grid layout |
| FAQ section | Reduces support burden; attendees always have questions | Low | Static Q&A accordion or flat entries; content-heavy but structurally simple |
| Footer | Legal and navigation baseline; every page has one | Low | GDG KL branding, Privacy Policy link, Code of Conduct link |
| Page metadata (title, description) | SEO and browser tab; currently "Create Next App" default — must be replaced | Low | Update `layout.tsx` metadata object; single task |

## Differentiators

Features this specific design introduces that go beyond a generic event template.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Retro terminal / hacker aesthetic | Distinctive visual identity; signals developer-centric audience | Medium | Monospace fonts throughout (Courier Prime primary), bracket notation `[SIGNAL RECEIVED]`, noise textures, `#282828` on `#F5F5F5` |
| Terminal system log block | Communicates "Build With AI" description in an on-brand format instead of plain prose | Low | Styled `<pre>` or `<div>` block mimicking a terminal readout; static content only |
| "Signal received" badge | Thematic entry point in the hero; immediately communicates the visual language | Low | Small badge/pill with bracket notation; purely decorative / atmospheric |
| Benefits cards with `#` prefix headings | Explains value proposition in a code-comment visual style | Low | Three cards, `#` prefix on headings, dot separators; layout pattern, not logic |
| Stats bar (2,258 events / 178,000 developers) | Social proof via global GDG network scale | Low | Two stat figures with labels; static numbers, no data fetching |
| Scrolling marquee "REGISTER NOW" | High-visibility CTA section that reinforces conversion before footer | Medium | CSS `animation: marquee` infinite scroll using Google Sans font; no JS library needed |
| Three custom Google Fonts loaded simultaneously | Workbench (retro display) is unusual and defines the aesthetic | Low-Medium | `next/font/google` for Courier Prime, Instrument Serif, Workbench, Google Sans; four font families require careful CSS variable setup to avoid conflicts |

## Anti-Features

Features to explicitly NOT build for this project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Backend form submission | Out of scope per PROJECT.md; static landing page only | Use `href="#"` placeholder on all register CTAs |
| Dark mode | Design is light-only (`#F5F5F5` background, `#282828` text); a dark variant does not exist in Figma | Remove the `prefers-color-scheme: dark` block from `globals.css` entirely to prevent accidental dark rendering |
| Multi-page routing | Single scrollable page per PROJECT.md | All content lives in `app/page.tsx`; no additional route segments |
| Mobile-specific responsive design | Explicitly deferred per PROJECT.md | Implement desktop design faithfully; apply `min-w` constraints if needed; responsive polish is a later milestone |
| JavaScript-heavy interactivity (animations, parallax, scroll triggers) | Not present in the Figma; adds complexity and risk without design backing | Use CSS-only animations (marquee); keep everything static |
| Real-time countdown timer | Common on event pages but not in this design; requires client-side JS and state | Not in Figma, do not add |
| Social media feed embeds | Not in the Figma design | Not in Figma, do not add |
| Ticket purchasing / payment flow | Requires backend, auth, payment provider; far out of scope | Placeholder register link |
| User accounts / attendee dashboard | Static site, no auth, no backend | Not applicable |
| CMS or admin interface | All content is hardcoded to match the Figma design exactly | Static JSX; content changes require code edits |
| Analytics / tracking scripts | Not specified in project requirements | Can be added later via Next.js Script component if needed; not blocking |

## Feature Dependencies

```
Font loading (layout.tsx) → Every section (all sections depend on Courier Prime, Instrument Serif, Workbench)
  - Hero section depends on: Instrument Serif (title), Workbench (city name), Courier Prime (tagline/badge)
  - Marquee section depends on: Google Sans (REGISTER NOW text)

Hero section → Register CTA (hero CTA links to same target as marquee section)

Stats section → None (standalone, static numbers)

Timeline/Schedule section → None (standalone, hardcoded event cards)

Partners section → None (static logo display)

FAQ section → None (static Q&A; no accordion state required unless designed with open/close)

Footer → None
```

## Section Order (Figma scroll order, top to bottom)

Per PROJECT.md requirements, the single-page layout follows this fixed order:

1. Hero (Build With AI + KUALA LUMPUR + signal badge + tagline + description + CTA)
2. Benefits (three `#`-prefixed feature cards with dot separators)
3. What is Build With AI? (terminal system log block)
4. Stats (2,258 events / 178,000 developers trained)
5. Timeline (event cards: date, name, description, type badge)
6. Partners (Google diamond sponsor display)
7. FAQ (accordion or static Q&A)
8. Register CTA (scrolling marquee "REGISTER NOW")
9. Footer (GDG KL branding, Privacy Policy, Code of Conduct)

This order is fixed by the Figma design and must not be reordered.

## MVP Recommendation

All sections listed above ARE the MVP — this project is a single-milestone pixel-faithful implementation of a complete Figma design. There is no phased feature rollout; the deliverable is the full page or nothing.

**Prioritize implementation order by dependency:**
1. Font loading (`layout.tsx`) — unblocks every section's typography
2. Global styles reset (`globals.css`) — remove dark mode, set `#F5F5F5` background, `#282828` text
3. Hero section — highest visibility, validates aesthetic direction
4. Footer — low complexity, closes the page
5. Remaining sections in Figma scroll order

**Defer:** None. All nine sections are in scope for the single deliverable.

**Content that must be hardcoded (not configurable):**
- Stats numbers (2,258 events, 178,000 developers)
- Timeline event entries (dates, names, descriptions, type badges)
- FAQ question/answer pairs
- All copy strings exactly as in the Figma design

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Section inventory | HIGH | Sourced directly from PROJECT.md, which reflects the Figma design |
| Table stakes classification | HIGH | Standard GDG event page conventions; hero/schedule/sponsors/FAQ/footer are universal |
| Differentiator classification | HIGH | Retro terminal aesthetic and Workbench font are clearly non-standard choices |
| Anti-features | HIGH | Explicitly enumerated as out-of-scope in PROJECT.md |
| Feature complexity estimates | MEDIUM | Implementation effort estimated from component structure; no prototyping done yet |

## Sources

- PROJECT.md — Primary: explicit section requirements from Figma design walkthrough
- `app/layout.tsx`, `app/page.tsx` — Current codebase state (unmodified scaffold)
- `.planning/codebase/CONCERNS.md` — Existing tech debt informing complexity estimates
- GDG event page conventions — Training data knowledge (HIGH confidence for standard event page patterns; no external verification possible without web search access)
