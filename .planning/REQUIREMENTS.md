# Requirements: MyHack / Build With AI KL — Event Landing Page

**Defined:** 2026-03-08
**Core Value:** The landing page must look exactly like the Figma design — pixel-faithful typography, colors, layout structure, and section order.

## v1 Requirements

### Foundation Setup

- [x] **SETUP-01**: Layout updated to load Courier Prime, Instrument Serif, and Workbench fonts via next/font/google, replacing existing Geist fonts
- [x] **SETUP-02**: page.tsx replaced with landing page root component that renders all sections in Figma order

### Page Sections

- [x] **SECT-01**: Hero section implemented — "Build With AI" heading (Instrument Serif), "KUALA LUMPUR" (Workbench), signal received badge, tagline, description, CTA button
- [x] **SECT-02**: Benefits section implemented — three feature cards with `#` prefix headings and dot separator lines
- [ ] **SECT-03**: "What is Build With AI?" section implemented — terminal-style system log block with monospace content
- [x] **SECT-04**: Stats section implemented — 2,258 events and 178,000 developers trained figures displayed
- [ ] **SECT-05**: Timeline section implemented — event cards with date, name, description, and type badge
- [ ] **SECT-06**: Partners section implemented — Google diamond sponsor display
- [ ] **SECT-07**: FAQ section implemented — Q&A entries matching Figma layout
- [ ] **SECT-08**: Register CTA section implemented — marquee "REGISTER NOW" text animation, all CTA links use href="#"
- [ ] **SECT-09**: Footer implemented — GDG KL branding, Privacy Policy and Code of Conduct links

### Visual Fidelity

- [x] **STYLE-01**: Global color palette applied — background #F5F5F5, primary text #282828, muted text #5C5C5C
- [x] **STYLE-02**: Noise texture overlay applied as full-page background effect matching Figma design

## v2 Requirements

### Responsive & Polish

- **RESP-01**: Mobile-specific breakpoints and responsive layout adjustments
- **RESP-02**: Real registration link (replace href="#" with actual URL when available)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend / form submission | Static landing page only — no server-side handling needed |
| Dark mode | Design is light-only |
| Multi-page routing | Single scrollable page — no sub-pages |
| Mobile breakpoints | Desktop design first — responsive polish is v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Complete |
| SETUP-02 | Phase 1 | Complete |
| STYLE-01 | Phase 1 | Complete |
| SECT-01 | Phase 2 | Complete |
| STYLE-02 | Phase 2 | Complete |
| SECT-02 | Phase 3 | Complete |
| SECT-03 | Phase 3 | Pending |
| SECT-04 | Phase 3 | Complete |
| SECT-05 | Phase 4 | Pending |
| SECT-06 | Phase 4 | Pending |
| SECT-07 | Phase 4 | Pending |
| SECT-08 | Phase 5 | Pending |
| SECT-09 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after roadmap creation*
