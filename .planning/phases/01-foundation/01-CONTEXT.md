# Phase 1: Foundation - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up fonts, global color palette, and section scaffolding that all subsequent phases build on. layout.tsx gets the three custom fonts and metadata; page.tsx gets a root component with empty section placeholders in Figma scroll order. No visual content beyond scaffold placeholders.

</domain>

<decisions>
## Implementation Decisions

### Section component structure
- Section components live in `src/components/sections/` folder
- One file per section — strict one-to-one (HeroSection.tsx, BenefitsSection.tsx, etc.)
- Phase 1 placeholders should be minimally visible: a commented section name or thin border so the scaffold is traceable during development
- page.tsx imports sections via a barrel index file (`@/components/sections`)

### Tailwind design tokens
- Font families registered in tailwind.config with role-based names: `font-mono` (Courier Prime), `font-display` (Instrument Serif), `font-retro` (Workbench)
- Colors: Claude's Discretion — semantic names vs arbitrary values, whichever scales better for a multi-section page
- Tailwind config extension strategy: Claude's Discretion — extend vs override based on what a landing page needs

### Font loading
- next/font CSS variable classes applied to a wrapper `<div>` in layout.tsx (not on `<html>` or `<body>`)
- Courier Prime set as the default body font on that wrapper div — all text inherits monospace by default; Instrument Serif and Workbench applied explicitly per section
- Existing Geist / Geist Mono fonts kept as fallbacks (not removed)
- Page metadata updated in this phase: title and description updated to reflect "Build With AI KL 2026" while layout.tsx is being edited

### Claude's Discretion
- Tailwind color naming convention (semantic vs raw) — Claude picks what scales best
- Tailwind config extend vs override strategy
- Exact placeholder visual treatment (comment text, border style, height)

</decisions>

<specifics>
## Specific Ideas

- Font utility names are role-based, not font-name-based: `font-mono`, `font-display`, `font-retro` — consistent naming pattern
- Wrapper div approach for font classes gives flexibility for future multi-layout scenarios
- Geist/Geist Mono retained as fallbacks — clean removal deferred until design is fully locked

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-08*
