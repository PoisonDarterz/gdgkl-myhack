# Phase 4: Event Sections - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the Timeline, Partners, and FAQ sections to match the Figma layout. This phase covers three sections: event cards in a timeline view, sponsor display with tier hierarchy, and an interactive FAQ accordion. Content is placeholder data. Registration, CTA, and footer are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Timeline card layout
- Date sits in a left-side column; the event card (name, description, type badge) flows to the right — vertical progression
- No connecting line or dots between entries — standalone cards
- Type badge uses a filled background color unique to each event type (e.g. workshop = one color, talk = another)
- Fixed height cards — uniform across all entries; description truncated if needed

### FAQ interactivity
- Accordion: click to expand/collapse answer
- Multiple items can be open simultaneously — no auto-close behavior
- Animated expand/collapse — smooth height transition
- Icon rotates on expand (e.g. + or chevron rotates 180° when open)

### Partners section treatment
- Google displayed with logo + "Diamond Sponsor" tier label, oversized/prominent
- Four sponsor tiers: Diamond > Gold > Silver > Bronze — each tier visually smaller than the one above
- Other tiers (Gold, Silver, Bronze) show placeholder logo boxes since no other sponsors exist yet

### Content & data
- Timeline: placeholder data (realistic-looking, not real event schedule) — 5–6 entries
- FAQ: 5–7 items covering standard hackathon topics (registration, team size, eligibility, prizes, themes, schedule)

### Claude's Discretion
- Exact badge colors per event type
- Typography sizing and spacing within cards
- Placeholder company names/logo treatment for Gold/Silver/Bronze tiers
- Specific FAQ questions and answers (standard hackathon framing)
- Animation easing and duration for FAQ accordion

</decisions>

<specifics>
## Specific Ideas

No specific references — open to standard approaches that match the existing monospace/retro aesthetic established in earlier phases.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-event-sections*
*Context gathered: 2026-03-10*
