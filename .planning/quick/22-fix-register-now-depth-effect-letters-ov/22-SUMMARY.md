---
id: quick-22
status: complete
tags: [footer, depth-effect, typography]
---

# Quick Task 22: Fix REGISTER NOW depth effect letters overlapping into themselves

**One-liner:** Made copy 1 solid white fill (not transparent outline) so ghost copies don't bleed through letterforms; reduced negative margin from -0.55em to -0.35em.

## Root Cause
Copy 1 had `color: transparent` (hollow outline only). Copies 2 and 3 with `-0.55em` negative margin were pulled 55% up into copy 1's letter area. Since copy 1 was transparent, their outlines were visible *inside* the main letters — causing the "R going into itself" visual.

## Fix
- Copy 1: `color: white` (solid fill), removed WebkitTextStroke — solid letters block ghost copies from showing through
- Copies 2 & 3: kept as outlined (`WebkitTextStroke: "2px white"`, `color: transparent`) for ghost/reflection aesthetic
- Negative margin reduced from `-0.55em` → `-0.35em` — ghost copies peek below the main text without reaching into letter bodies

## Commit
- `2c9ead5`: fix(quick-22): fix REGISTER NOW depth effect - solid fill copy1, outlined ghost copies below
