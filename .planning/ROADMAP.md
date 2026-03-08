# Roadmap: MyHack / Build With AI KL — Event Landing Page

## Overview

Starting from an existing Next.js 15 scaffold, this milestone implements the full Figma design as a pixel-faithful single-page landing page. Work flows top-to-bottom through the page: foundation first (fonts, shell, colors), then each band of sections in scroll order, finishing with the register CTA and footer. Each phase delivers a visually verifiable slice of the complete design.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Fonts, page shell, and global color palette ready
- [ ] **Phase 2: Hero + Noise** - Hero section visible with noise texture background
- [ ] **Phase 3: Mid Sections** - Benefits, What is BAI, and Stats sections complete
- [ ] **Phase 4: Event Sections** - Timeline, Partners, and FAQ sections complete
- [ ] **Phase 5: CTA + Footer** - Register marquee and footer complete — page ships

## Phase Details

### Phase 1: Foundation
**Goal**: The page loads with the correct fonts, background color, and section scaffolding in place — every section slot exists even if empty
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, STYLE-01
**Success Criteria** (what must be TRUE):
  1. Browser loads the page and the background is #F5F5F5 (warm off-white, not browser default white)
  2. Courier Prime renders in the page — visible as the primary monospace typeface
  3. Instrument Serif and Workbench fonts are loaded and available (no fallback sans-serif flash)
  4. page.tsx renders all section placeholders in Figma scroll order with no layout errors
**Plans**: TBD

### Phase 2: Hero + Noise
**Goal**: The top of the page matches the Figma hero — correct typography hierarchy, badge, CTA button, and noise texture visible across the full viewport
**Depends on**: Phase 1
**Requirements**: SECT-01, STYLE-02
**Success Criteria** (what must be TRUE):
  1. "Build With AI" heading renders in Instrument Serif at large display size
  2. "KUALA LUMPUR" renders in Workbench retro display font
  3. Signal received badge, tagline, description, and CTA button are present and styled
  4. Noise texture is visible as a subtle grain overlay across the entire page background
**Plans**: TBD

### Phase 3: Mid Sections
**Goal**: The Benefits, "What is Build With AI?", and Stats sections are fully implemented and match the Figma layout
**Depends on**: Phase 2
**Requirements**: SECT-02, SECT-03, SECT-04
**Success Criteria** (what must be TRUE):
  1. Benefits section shows three feature cards with `#` prefix headings and dot separator lines between them
  2. "What is Build With AI?" section contains a terminal-style system log block with monospace content
  3. Stats section displays the two figures: 2,258 events and 178,000 developers trained
**Plans**: TBD

### Phase 4: Event Sections
**Goal**: The Timeline, Partners, and FAQ sections are fully implemented and match the Figma layout
**Depends on**: Phase 3
**Requirements**: SECT-05, SECT-06, SECT-07
**Success Criteria** (what must be TRUE):
  1. Timeline section shows event cards each with a date, event name, description, and type badge
  2. Partners section shows Google as the diamond sponsor in the correct visual treatment
  3. FAQ section displays Q&A entries in the layout matching the Figma design
**Plans**: TBD

### Phase 5: CTA + Footer
**Goal**: The page is complete — register marquee animates, footer is present, and the full landing page matches the Figma design end-to-end
**Depends on**: Phase 4
**Requirements**: SECT-08, SECT-09
**Success Criteria** (what must be TRUE):
  1. Register CTA section shows a marquee with "REGISTER NOW" text animating horizontally
  2. All CTA links (including marquee) use href="#" placeholder and do not navigate away
  3. Footer shows GDG KL branding with Privacy Policy and Code of Conduct links
  4. Scrolling through the full page from top to bottom shows all sections in Figma order with no missing or broken sections
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Hero + Noise | 0/? | Not started | - |
| 3. Mid Sections | 0/? | Not started | - |
| 4. Event Sections | 0/? | Not started | - |
| 5. CTA + Footer | 0/? | Not started | - |
