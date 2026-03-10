---
phase: 02-hero-noise
verified: 2026-03-08T00:00:00Z
status: gaps_found
score: 6/9 must-haves verified
re_verification: false
gaps:
  - truth: "Noise texture is visible as a subtle grain overlay across the entire page background"
    status: failed
    reason: "public/images/noise.png does not exist — the public/images/ directory itself is absent. The CSS wiring is correct but the referenced asset is missing, so the overlay renders as a transparent fixed div with no visual texture."
    artifacts:
      - path: "public/images/noise.png"
        issue: "File missing — directory public/images/ does not exist on disk"
    missing:
      - "Export noise texture PNG from Figma (imageRef: ffd40838e49e843387f4753b45e6667cfe238e61) and save as public/images/noise.png"
  - truth: "Twin Towers, KL Tower, and signal icon illustrations are positioned flanking the center content"
    status: failed
    reason: "All three SVG files are missing — public/images/twin-towers.svg, public/images/kl-tower.svg, and public/images/signal-icon.svg do not exist. The next/image references are wired correctly in HeroSection.tsx but the assets are absent. Next.js will render broken image slots at runtime."
    artifacts:
      - path: "public/images/twin-towers.svg"
        issue: "File missing"
      - path: "public/images/kl-tower.svg"
        issue: "File missing"
      - path: "public/images/signal-icon.svg"
        issue: "File missing"
    missing:
      - "Export Twin Towers SVG from Figma and save as public/images/twin-towers.svg"
      - "Export KL Tower SVG from Figma and save as public/images/kl-tower.svg"
      - "Export Signal icon SVG from Figma and save as public/images/signal-icon.svg"
human_verification:
  - test: "Noise texture grain visible at 30% opacity"
    expected: "A subtle grain/noise pattern overlays the #F5F5F5 background. It covers the full viewport including during scroll. Clicking anywhere is not blocked."
    why_human: "Requires visual inspection of the running page. Programmatic verification cannot confirm opacity appearance or grain visibility."
  - test: "Hero section matches Figma visual composition"
    expected: "Typography hierarchy reads correctly — large Instrument Serif heading, retro Workbench subheading, monospace badge and description. Outlined CTA button with no fill at rest, dark fill on hover. Flanking illustrations bottom-aligned with center column."
    why_human: "Font rendering, visual weight, and layout composition require human inspection against the Figma reference."
---

# Phase 02: Hero + Noise Verification Report

**Phase Goal:** The top of the page matches the Figma hero — correct typography hierarchy, badge, CTA button, and noise texture visible across the full viewport
**Verified:** 2026-03-08
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | "Build With AI" heading renders in Instrument Serif at large display size | VERIFIED | `HeroSection.tsx` line 24: `<h1 className="font-display text-7xl lg:text-8xl ...">Build With AI</h1>`. `font-display` maps to `--font-instrument-serif` in `globals.css` @theme. Font loaded via `next/font/google` in `layout.tsx`. |
| 2 | "KUALA LUMPUR" renders in Workbench retro display font | VERIFIED | `HeroSection.tsx` line 29: `<p className="font-retro text-4xl lg:text-5xl tracking-widest ...">KUALA LUMPUR</p>`. `font-retro` maps to `--font-workbench` in globals.css @theme. Workbench loaded in `layout.tsx`. |
| 3 | "[[ SIGNAL RECEIVED ]]" badge renders in Courier Prime with white text on #282828 pill background | VERIFIED | `HeroSection.tsx` line 19-21: `<span className="font-mono text-white bg-brand-text px-4 py-1 rounded-full text-sm tracking-widest uppercase">`. `font-mono` maps to `--font-courier-prime`. `bg-brand-text` maps to `#282828`. All three properties confirmed. |
| 4 | Description paragraph text is present in Courier Prime | VERIFIED | `HeroSection.tsx` line 34-37: `<p className="font-mono text-sm text-brand-muted max-w-md">Gain real-world experience...`. `font-mono` is Courier Prime. Text content matches plan spec exactly. |
| 5 | "REGISTER NOW" CTA button renders as an outlined (border-only) button with hover fill effect | VERIFIED | `HeroSection.tsx` line 40-45: `<a href="#" className="inline-block border border-brand-text text-brand-text ... hover:bg-brand-text hover:text-white transition-colors duration-200">REGISTER NOW</a>`. Border-only at rest, dark fill on hover — matches spec. |
| 6 | Twin Towers, KL Tower, and signal icon illustrations are positioned flanking the center content | FAILED | `HeroSection.tsx` has correct next/image wiring for all three paths but `public/images/` directory does not exist — all three SVG files are missing. |
| 7 | Noise texture is visible as a subtle grain overlay across the entire page background | FAILED | CSS wiring is correct (`.noise-overlay` in `globals.css`, div in `layout.tsx`) but `public/images/noise.png` is absent. The overlay div renders but has no background texture. |
| 8 | The noise overlay does not block clicks or interaction on page content | VERIFIED | `globals.css` line 141: `pointer-events: none;` confirmed present on `.noise-overlay`. |
| 9 | The noise covers the full viewport regardless of scroll position | VERIFIED (code) / UNCERTAIN (visual) | `globals.css` line 135-136: `position: fixed; inset: 0;` confirmed. Will work once `noise.png` is placed. Needs human confirmation after asset placement. |

**Score:** 6/9 truths verified (2 failed due to missing assets, 1 code-verified but pending asset placement)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/sections/HeroSection.tsx` | Full hero section component, min 60 lines | VERIFIED | 66 lines, named export `HeroSection`, no placeholder content, all five center elements implemented |
| `app/globals.css` | .noise-overlay CSS class | VERIFIED | Lines 134-143: position fixed, inset 0, background-image url(/images/noise.png), opacity 0.3, pointer-events none, z-index 9999 — matches spec exactly |
| `app/layout.tsx` | Noise overlay div as first child of font wrapper | VERIFIED | Line 48: `<div className="noise-overlay" aria-hidden="true" />` is first child of font wrapper div |
| `public/images/noise.png` | Noise texture PNG from Figma | MISSING | `public/images/` directory does not exist on disk |
| `public/images/twin-towers.svg` | Twin Towers decorative illustration | MISSING | `public/images/` directory does not exist on disk |
| `public/images/kl-tower.svg` | KL Tower decorative illustration | MISSING | `public/images/` directory does not exist on disk |
| `public/images/signal-icon.svg` | Signal icon illustration | MISSING | `public/images/` directory does not exist on disk |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `app/layout.tsx` | `public/images/noise.png` | CSS background-image url(/images/noise.png) | WIRED (asset missing) | `globals.css` line 137 contains `background-image: url(/images/noise.png)`. Link is correctly coded; asset not present. |
| `app/globals.css` | `.noise-overlay` class in layout.tsx | `.noise-overlay` applied to div | WIRED | `layout.tsx` line 48 uses `className="noise-overlay"`. Class defined in `globals.css` line 134. |
| `src/components/sections/HeroSection.tsx` | `font-display` utility | `font-display` class on h1 | WIRED | Line 24 of HeroSection.tsx uses `font-display`. Token defined in `globals.css` @theme as `--font-instrument-serif`. |
| `src/components/sections/HeroSection.tsx` | `font-retro` utility | `font-retro` class on city subheading | WIRED | Line 29 of HeroSection.tsx uses `font-retro`. Token defined in `globals.css` @theme as `--font-workbench`. |
| `src/components/sections/HeroSection.tsx` | `public/images/*.svg` | next/image src props | WIRED (assets missing) | Lines 9, 52, 58 reference `/images/twin-towers.svg`, `/images/signal-icon.svg`, `/images/kl-tower.svg`. Paths are correct; files do not exist. |
| `HeroSection` | `app/page.tsx` | Import via barrel `@/src/components/sections` | WIRED | `page.tsx` imports `HeroSection` from barrel; `index.ts` line 1 exports it; used on page.tsx line 16. |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| SECT-01 | 02-02-PLAN.md | Hero section: Instrument Serif heading, Workbench subheading, badge, description, CTA button | PARTIALLY SATISFIED | Typography, badge, description, and CTA are all implemented and wired. Flanking SVG illustrations are wired in code but the asset files are missing — hero will render without illustrations at runtime. |
| STYLE-02 | 02-01-PLAN.md | Noise texture overlay applied as full-page background effect | PARTIALLY SATISFIED | CSS class and layout div are correctly implemented. The PNG asset is absent so the effect is not visible. Code satisfies the structural requirement; the visual outcome requires `public/images/noise.png`. |

No orphaned requirements found — both SECT-01 and STYLE-02 are mapped to this phase in REQUIREMENTS.md and claimed by plan frontmatter.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | No placeholder comments, empty returns, or stub implementations found in modified files |

### Human Verification Required

#### 1. Noise texture grain visible after PNG placement

**Test:** Place `public/images/noise.png` (exported from Figma, imageRef `ffd40838e49e843387f4753b45e6667cfe238e61`), run `npm run dev`, open http://localhost:3000
**Expected:** Subtle grain pattern overlays the #F5F5F5 background at ~30% opacity. Texture persists during scroll. Clicking anywhere on the page (buttons, links) is not blocked.
**Why human:** Visual opacity appearance and grain density cannot be confirmed programmatically.

#### 2. Flanking SVG illustrations render correctly after file placement

**Test:** Place the three SVG files in `public/images/`, run `npm run dev`, open http://localhost:3000
**Expected:** Twin Towers illustration appears on the left side, KL Tower + Signal icon stacked on the right side, both columns bottom-aligned with the center text block. No broken image placeholders.
**Why human:** Layout composition, illustration scaling, and visual alignment with center column require inspection against the Figma reference.

#### 3. Typography appearance matches Figma

**Test:** Open the running dev server. Inspect the hero section.
**Expected:** "Build With AI" appears in an elegant serif typeface (Instrument Serif). "KUALA LUMPUR" appears in a distinctive retro LED/display aesthetic (Workbench). Badge and description are in monospace (Courier Prime).
**Why human:** Font rendering and character aesthetics require visual confirmation.

### Gaps Summary

Two gaps are blocking full goal achievement, both caused by missing user-supplied assets. No code is broken — the implementation is correct and complete on the code side.

**Gap 1 — noise.png missing:** The `public/images/` directory does not exist. The `.noise-overlay` CSS class is correctly written (position fixed, opacity 0.3, pointer-events none, z-index 9999) and the overlay div is rendered in `layout.tsx`. The grain texture will appear automatically once `public/images/noise.png` is placed.

**Gap 2 — SVG illustrations missing:** All three illustration files (`twin-towers.svg`, `kl-tower.svg`, `signal-icon.svg`) are absent. The `next/image` references in `HeroSection.tsx` are correctly coded with proper paths and dimensions. The illustrations will render once the files are placed by the user.

Both gaps require the same action: create the `public/images/` directory and export the four asset files from Figma.

---

_Verified: 2026-03-08_
_Verifier: Claude (gsd-verifier)_
