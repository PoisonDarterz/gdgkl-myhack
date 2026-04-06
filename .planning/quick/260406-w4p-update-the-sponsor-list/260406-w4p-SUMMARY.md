---
quick_id: 260406-w4p
description: Update the sponsor list
date: 2026-04-06
mode: quick
key_files:
  modified:
    - src/components/sections/PartnersSection.tsx
commits:
  - 11d106a
duration: 2 min
---

# Quick Task 260406-w4p: Update the sponsor list — Summary

**One-liner:** Updated PartnersSection with 6 real sponsors across 5 tiers, using tier-colored badges and text placeholders for non-Google logos.

## What Was Done

Replaced the placeholder sponsor data in `PartnersSection.tsx` with the actual sponsor list:

| Sponsor          | Tier             | Color        |
| ---------------- | ---------------- | ------------ |
| Google           | Official Sponsor | `#34A853`    |
| Devoteam         | Gold Sponsor     | `amber-500`  |
| MoneyLion        | Silver Sponsor   | `slate-400`  |
| Sunway University| Venue Sponsor    | `blue-600`   |
| KL42             | Venue Sponsor    | `blue-600`   |
| Cradle Funds     | Main Partner     | `purple-700` |

Both `marqueeSponsors` (the scrolling ticker) and `gridSponsors` (the 3-column card grid) were updated to reflect all 6 sponsors. Google retains its existing letter-by-letter multi-color logo JSX. The other 5 use a `<p>` text placeholder styled with `font-mono text-lg font-bold uppercase tracking-widest text-brand-text`.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- Non-Google sponsor logos are text placeholders pending real logo assets. These are intentional per the plan ("Icons/logos to be handled separately").

## Self-Check: PASSED

- [x] `src/components/sections/PartnersSection.tsx` updated
- [x] `marqueeSponsors` has 6 entries with correct labels
- [x] `gridSponsors` has 6 entries with correct tier colors
- [x] TypeScript check passed (no errors)
- [x] Commit `11d106a` exists
