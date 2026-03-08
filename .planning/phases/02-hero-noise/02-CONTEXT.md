# Phase 2: Hero + Noise - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the hero section visible at the top of the page matching the Figma design: "Build With AI" heading, "KUALA LUMPUR" subheading, signal received badge, description text, CTA button, decorative illustrations (Twin Towers, KL Tower, signal icon), and a full-page noise texture overlay. Typography, layout, and noise are all in scope. Mobile/responsive is out of scope (v2).

</domain>

<decisions>
## Implementation Decisions

### Noise texture
- Use an actual PNG texture exported from Figma (user will export and place in `/public/images/`)
- Apply as a full-page overlay spanning the entire page height (not hero-only)
- Scrolls with the page content (standard CSS background-attachment behavior)
- Opacity: exactly 30% as specified in Figma

### Decorative illustrations
- User will export SVGs from Figma — Twin Towers, KL Tower, signal icon
- Files go in `/public/images/` with descriptive names (e.g. `twin-towers.svg`, `kl-tower.svg`, `signal-icon.svg`)
- Signal icon (two overlapping vector shapes: orange + grey with dark outlines): Claude decides single vs separate file based on what renders best

### Hero layout & sizing
- Height: content-driven with generous padding — no forced viewport height (no 100vh)
- Layout: flex or grid with illustrations as side columns and heading/text in the center area
- Max-width / edge-to-edge: Claude decides based on Figma proportions

### CTA button
- Outlined button (border only, no fill) — matches Figma
- Hover state: fill in with dark color (#282828), text inverts to white
- Link: `href="#"` placeholder
- Border rendering: Claude decides single element vs two-rectangle structure based on closest Figma match

### Claude's Discretion
- Signal icon: single combined SVG vs separate files
- Hero max-width container vs full-bleed — match Figma proportions
- CTA button border: single CSS border vs two-rectangle layer structure
- Font size translation from Figma's large coordinate space to CSS rem/px values

</decisions>

<specifics>
## Specific Ideas

- Figma source of truth for exact sizes: "Build With AI" is Instrument Serif Regular at ~627px Figma units; "KUALA LUMPUR" is Workbench Close style; "[[ SIGNAL RECEIVED ]]" is Courier Prime at 82px Figma units, white text on #282828 background pill/frame
- Description text: "Gain real-world experience with Google's latest AI tools & models and start building the future today." — Courier Prime
- Noise is image-based (imageRef in Figma): `ffd40838e49e843387f4753b45e6667cfe238e61` — user exports this PNG from Figma
- The button in Figma is "Group 44" containing two rectangles (border treatment) + text "REGISTER NOW" in Courier Prime

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-hero-noise*
*Context gathered: 2026-03-08*
