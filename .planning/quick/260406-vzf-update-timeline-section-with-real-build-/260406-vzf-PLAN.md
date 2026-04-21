---
quick_id: 260406-vzf
description: update timeline section with real Build with AI 2026 KL event dates
date: 2026-04-06
mode: quick
---

# Quick Task 260406-vzf: Update Timeline with Real Event Dates

## Task

Replace placeholder/fictional events in `TimelineSection.tsx` with real Build with AI 2026 KL event data sourced from the GDG Community event pages.

## Sources

- https://gdg.community.dev/events/details/google-gdg-kuala-lumpur-presents-build-with-ai-2026-kl-meetup-day-1/
- https://gdg.community.dev/events/details/google-gdg-kuala-lumpur-presents-build-with-ai-2026-kl-workshop-1/
- https://gdg.community.dev/events/details/google-gdg-kuala-lumpur-presents-build-with-ai-kl-2026-meetup-day-2/
- https://gdg.community.dev/events/details/google-gdg-kuala-lumpur-presents-build-with-ai-2026-kl-myhack/

## Plan

### Task 1: Update events array in TimelineSection.tsx

**File:** `src/components/sections/TimelineSection.tsx`

**Action:** Replace the 6 placeholder events with 5 real events:
1. APR 9 — MEETUP #1 (meetup) @ Google Malaysia
2. APR 25 — WORKSHOP (workshop) @ Sunway University
3. MAY 5 — MEETUP #2 (meetup) @ Google Malaysia
4. MAY 16 — MYHACK OPENING (hackathon) @ Sunway University
5. MAY 17 — MYHACK CLOSING (hackathon) @ Sunway University

**Note:** GRID_SIZE remains 8 (2×4 grid); 3 cells will be empty in the second row.
