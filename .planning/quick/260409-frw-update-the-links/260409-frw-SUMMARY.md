---
phase: quick
plan: 260409-frw
subsystem: links/cta
tags: [links, registration, cta, timeline]
dependency_graph:
  requires: []
  provides: [correct-registration-links]
  affects: [HeroSection, FooterSection, TimelineSection]
tech_stack:
  added: []
  patterns: [optional-link-field-on-data-type]
key_files:
  created: []
  modified:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/FooterSection.tsx
    - src/components/sections/TimelineSection.tsx
decisions:
  - "TimelineEvent type changed from `as const` tuple to explicit typed array to support optional link field"
  - "Register link color derived from event.type at runtime (meetup=blue #2196F3, hackathon=red #D32F2F)"
  - "WORKSHOP and MEETUP #2 intentionally have no links per product requirement"
metrics:
  duration: "1 min"
  completed: "2026-04-09"
  tasks: 2
  files: 3
---

# Phase quick Plan 260409-frw: Update the Links Summary

Updated all registration and event links across the site — new Google Form CTA in Hero and Footer, and event-specific "Register" links added to applicable timeline cards.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update main CTA Register Now links in Hero and Footer | 6cd086a | HeroSection.tsx, FooterSection.tsx |
| 2 | Add registration links to timeline event cards | 8b18566 | TimelineSection.tsx |

## Decisions Made

1. **TimelineEvent type refactored** — changed from `as const` inferred tuple to an explicit `TimelineEvent[]` typed array. This was required to add an optional `link?: string` field without TypeScript errors from the `as const` immutability.

2. **Register link color matches badge** — the "Register →" anchor uses the same hue as the event type badge (meetup: `text-[#2196F3]`, hackathon: `text-[#D32F2F]`), consistent with the existing `typeHeaderStyles` palette.

3. **No link for WORKSHOP and MEETUP #2** — explicitly omitted per plan requirements. No placeholder or "coming soon" text rendered.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- `grep "GZ1xhZG68RoPJZhQ6" src/` — returns nothing (old URL fully removed)
- `grep "zi6YknjSZosmJEVL9" src/` — found in HeroSection.tsx and FooterSection.tsx
- `grep "mgkk2e" src/` — found in TimelineSection.tsx (MEETUP #1)
- `grep "7C1S7w2gjMVKfdgj9" src/` — found 2x in TimelineSection.tsx (MYHACK OPENING + CLOSING)
- `grep "z3LLqqLzNgx42GWDA" src/` — returns nothing (workshop URL not added)
- `npm run build` — passed with no TypeScript or compilation errors

## Known Stubs

None.

## Self-Check: PASSED

- src/components/sections/HeroSection.tsx: modified, contains `zi6YknjSZosmJEVL9`
- src/components/sections/FooterSection.tsx: modified, contains `zi6YknjSZosmJEVL9`
- src/components/sections/TimelineSection.tsx: modified, contains `gdg.community.dev/e/mgkk2e` and `7C1S7w2gjMVKfdgj9`
- Commits 6cd086a and 8b18566 exist in git log
