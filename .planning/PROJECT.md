# MyHack / Build With AI KL — Event Landing Page

## What This Is

A Next.js event landing page for Google Developer Group Kuala Lumpur's "Build With AI / MyHack" 2026 event. The page faithfully implements a Figma design with a retro terminal/hacker aesthetic — monospace fonts, bracket notation, noise textures, and a long scrollable single-page layout.

## Core Value

The landing page must look exactly like the Figma design — pixel-faithful typography, colors, layout structure, and section order.

## Requirements

### Validated

- ✓ Next.js App Router setup — existing
- ✓ Tailwind CSS configured — existing
- ✓ layout.tsx with Google font loading — existing

### Active

- [ ] Replace default page.tsx with full landing page matching Figma design
- [ ] Update layout.tsx to load Courier Prime, Instrument Serif, and Workbench fonts
- [ ] Hero section: "Build With AI" (Instrument Serif large), "KUALA LUMPUR" (Workbench), signal received badge, tagline, description, CTA
- [ ] Benefits section: three feature cards with # prefix headings and dot separators
- [ ] "What is Build With AI?" section with terminal system log block
- [ ] Stats section: 2,258 events / 178,000 developers trained
- [ ] Timeline section: event cards with date, name, description, type badge
- [ ] Partners section: Google diamond sponsor display
- [ ] FAQ section: accordion or static Q&A entries
- [ ] Register CTA section: large marquee "REGISTER NOW" text
- [ ] Footer: GDG KL branding, Privacy Policy, Code of Conduct links
- [ ] Background: #F5F5F5, text: #282828, fonts: Courier Prime + Instrument Serif + Workbench
- [ ] "REGISTER NOW" links use placeholder href="#"

### Out of Scope

- Backend / form submission — static landing page only
- Dark mode — design is light-only
- Multi-page routing — single scrollable page
- Mobile-specific breakpoints — implement desktop design first, responsive polish later

## Context

- Figma file: `42FrlqAKolEHOx0G8p7k3D`, node `193-30` (LANDING frame, 6929x13969px)
- Figma token available for API access
- Design uses three font families: Courier Prime (primary monospace), Instrument Serif (display/accent), Workbench (retro display), Google Sans (register marquee)
- All Workbench/Google Sans fonts are available via Google Fonts
- Color palette: background `#F5F5F5`, text `#282828`, muted text `#5C5C5C`
- Existing fonts in layout.tsx (Geist, Geist Mono) will be replaced with design fonts

## Constraints

- **Tech stack**: Next.js 15 App Router, Tailwind CSS — must stay within existing stack
- **Fonts**: Must use next/font/google for all custom fonts
- **No new packages**: Use only what's in package.json unless font loading requires it

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single page, all sections | User confirmed full landing page scope | — Pending |
| Register CTA uses href="#" placeholder | User confirmed placeholder for now | — Pending |
| Fonts loaded via next/font/google | Next.js best practice, avoids FOUT | — Pending |

---
*Last updated: 2026-03-07 after initialization*
