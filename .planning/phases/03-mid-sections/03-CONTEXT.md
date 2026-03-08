# Phase 3: Mid Sections - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement three content sections — Benefits, "What is Build With AI?", and Stats — that sit below the hero and above the event sections. These sections present the value proposition and key metrics of the event. Section content, layout, and interactions are in scope; new capabilities (search, filtering, etc.) are not.

</domain>

<decisions>
## Implementation Decisions

### Section Structure
- All three sections share the same off-white (#F5F5F5) background — no color variation between sections
- Section titles/headings: follow Figma exactly (some sections may have titles, others may not)
- Vertical spacing between sections: match Figma pixel values exactly

### Benefits Card Layout
- Cards are stacked vertically (not side-by-side)
- Each card has a '#' prefix heading — content beyond the heading (body copy, structure) follows Figma exactly
- Card borders/outlines: match Figma treatment
- Hover state: subtle hover effect on each card (light background change or shadow)

### Terminal Block Style ("What is BAI?" section)
- Background: matches page background (off-white, dark text) — integrated feel, not classic dark terminal
- Typing/typewriter animation: YES — text appears character by character on scroll-into-view
- Content: extract exact log line copy from Figma
- Window chrome (title bar, traffic light dots, prompt): match Figma exactly

### Stats Presentation
- Layout: two figures stacked vertically (one above the other)
- Count-up animation: YES — numbers count from 0 to final value when section scrolls into view
- Supporting text (labels, descriptions): match Figma copy and structure exactly
- Typography size/weight for numbers: match Figma exactly

### Claude's Discretion
- Exact easing/duration for count-up animation
- Exact easing/duration for typing animation
- Responsive behavior at mobile breakpoints (within Figma intent)

</decisions>

<specifics>
## Specific Ideas

- The terminal block should feel **integrated** with the page — off-white bg, dark monospace text — not like an isolated dark code editor dropped in
- Stats count-up animation creates a dynamic moment as the user scrolls down — important interaction for the page
- Benefits cards are vertically stacked with a subtle hover effect to give them some interactivity

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-mid-sections*
*Context gathered: 2026-03-08*
