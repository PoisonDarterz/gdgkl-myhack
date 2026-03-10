---
phase: quick-18
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/Header.tsx
  - src/components/sections/FooterSection.tsx
  - app/layout.tsx
autonomous: true
requirements: [quick-18]

must_haves:
  truths:
    - "Header shows gdg_white.svg logo to the left of the GDG KL text with no horizontal padding"
    - "Header uses space-between layout across full width"
    - "Footer 'Brought to you by' row shows gdg_white.svg to the left of the text"
    - "Footer policy links are stacked vertically (column)"
    - "Footer REGISTER NOW spans full width with two offset ghost copies for depth effect"
    - "Footer REGISTER NOW uses Google Sans font"
  artifacts:
    - path: "src/components/Header.tsx"
      provides: "Updated header with logo + no padding"
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Updated footer with logo, vertical links, depth text"
    - path: "app/layout.tsx"
      provides: "Google Sans font variable registered"
  key_links:
    - from: "app/layout.tsx"
      to: "src/components/sections/FooterSection.tsx"
      via: "--font-google-sans CSS variable"
      pattern: "font-google-sans|var\\(--font-google-sans\\)"
---

<objective>
Fix Header and Footer layout to match Figma design.

Header: add gdg_white.svg logo left of text, remove inner container padding so content fills full width, keep space-between.

Footer: add gdg_white.svg to the "Brought to you by" block, switch policy links to vertical column, make REGISTER NOW full-width, add 2 depth/ghost copies slightly offset with reduced opacity for a layered typographic effect, switch REGISTER NOW font to Google Sans.

Purpose: Visual alignment with Figma node 193-30.
Output: Updated Header.tsx, FooterSection.tsx, layout.tsx.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/quick/18-fix-header-logo-and-footer-layout-with-g/18-PLAN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix Header — add gdg_white.svg logo, remove inner padding, full-width layout</name>
  <files>src/components/Header.tsx</files>
  <action>
Rewrite Header.tsx with these changes:

1. Remove the inner `max-w-screen-xl mx-auto px-8 py-4` wrapper div. The header should have NO horizontal padding — content stretches edge to edge. Apply `py-4 px-0 flex items-center justify-between w-full` directly on the `<header>` element (or an inner div without px).

2. Add `gdg_white.svg` logo to the LEFT side of the "Google Developer Group / Kuala Lumpur" text block. Use `next/image` with `src="/images/gdg_white.svg"`, `alt="GDG logo"`, `width={40}`, `height={40}`. Place it inside a flex row: `<div className="flex items-center gap-3">` wrapping the logo image and the existing text column.

3. Keep the existing text column (border-l, "Google Developer Group", "Kuala Lumpur") immediately to the right of the logo.

4. Keep the right side Instagram link unchanged.

5. The `<header>` outer element keeps `sticky top-0 z-50 w-full bg-brand-text`. Use `px-6` on the header itself (not an inner container) to give slight breathing room without a max-width container, OR go fully edge-to-edge with `px-0` — use `px-6` for a slight inset matching the Figma design (no full bleed on very wide screens, but no centering container).

Result: `[GDG logo] [text] ................... [Instagram link]` spanning full header width.
  </action>
  <verify>Run `npm run build` (or `npm run dev` and visually inspect). Header must show GDG white logo on the left immediately before the text, no extra side margins from a max-width container, space-between between left group and right link.</verify>
  <done>Header displays gdg_white.svg + "Google Developer Group / Kuala Lumpur" text on the left; Instagram link on the right; no centered max-width container constraining width.</done>
</task>

<task type="auto">
  <name>Task 2: Fix Footer — gdg logo, vertical policy links, full-width depth REGISTER NOW with Google Sans</name>
  <files>src/components/sections/FooterSection.tsx, app/layout.tsx</files>
  <action>
**Step A — Add Google Sans font to layout.tsx:**

In `app/layout.tsx`, import `Google_Sans` from `next/font/google` and add a variable:

```ts
import { ..., Google_Sans } from "next/font/google";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
```

Add `${googleSans.variable}` to the inner wrapper div's className alongside the other font variables.

Note: If `Google_Sans` is not exported from `next/font/google` (it may not be available in the public Google Fonts catalog for all environments), use `"Plus_Jakarta_Sans"` as the import name with variable `--font-google-sans` as a close substitute, and add a comment: `// Google Sans substitute — closest available on Google Fonts`.

**Step B — Rewrite FooterSection.tsx:**

Zone 1 (top row — left block):
- The existing bordered box shows text only. Add `gdg_white.svg` logo INSIDE the bordered box, displayed to the LEFT of the "Brought to you by" + text stack. Use `next/image` with `src="/images/gdg_white.svg"`, `alt="GDG KL"`, `width={48}`, `height={48}`.
- Layout inside the box: `<div className="flex items-center gap-4">` — left: the logo image, right: the existing text column (Brought to you by / Google Developer Group / Kuala Lumpur).
- The barcode design already present (the three white squares on the right side) stays as-is.

Zone 1 (top row — right block, policy links):
- Change `<div className="flex gap-6 ...">` for the two policy links to `<div className="flex flex-col gap-2 ...">` so Privacy Policy and Code of Conduct are stacked vertically.

Zone 2 (REGISTER NOW section):
- Add Google Sans font via `fontFamily: "var(--font-google-sans)"` in the inline style (replacing `--font-instrument-serif`).
- The main REGISTER NOW text: keep outlined style (`WebkitTextStroke: "2px white"`, `color: "transparent"`), `text-[12vw]`, `w-full`, centered.
- Add 2 ghost/depth copies below the main text. Use `position: relative` on the container and stack 3 lines in a `flex flex-col` with negative margin-top to overlap, OR render them as 3 sibling `<p>` tags with `mt-[-0.6em]` on the 2nd and 3rd to create the stacked depth illusion.
  - Copy 1 (top): full brightness white stroke, `opacity-100`
  - Copy 2 (middle): `opacity-40`, same stroke style, `translate-y-[3px]` or `mt-[-0.55em]`
  - Copy 3 (bottom): `opacity-20`, same stroke style, `translate-y-[6px]` or `mt-[-0.55em]`
- Wrap all 3 in a container: `<div className="overflow-hidden">` to prevent vertical scroll from the overlapping copies.
- Each copy is `w-full text-center` and uses the same font-size `text-[12vw]` and stroke style.
  </action>
  <verify>
1. `npm run build` completes without errors (especially no CSS parse errors from the new font variable).
2. In browser: Footer left block shows GDG white logo to the left of the "Brought to you by" text.
3. Policy links are stacked vertically (Privacy Policy above Code of Conduct).
4. REGISTER NOW section shows 3 stacked copies, each slightly lower and less bright, creating a depth/fade effect.
5. REGISTER NOW uses Google Sans (or Plus Jakarta Sans fallback) — confirm in DevTools computed styles.
  </verify>
  <done>
Footer shows: gdg_white.svg inline with "Brought to you by" text; Privacy Policy and Code of Conduct in a vertical column; REGISTER NOW spans full width in Google Sans with 2 progressively dimmer/offset copies for a layered depth effect.
  </done>
</task>

</tasks>

<verification>
After both tasks, do a final `npm run build` to confirm zero type errors and no CSS parse errors. The three-copy REGISTER NOW stack must not cause horizontal overflow (verify with `overflow-hidden` on the container).
</verification>

<success_criteria>
- Header: GDG white logo visible left of text, no max-width centering container, space-between layout
- Footer: GDG logo in "brought to you by" box, policy links vertical, REGISTER NOW full-width with 3-layer depth effect in Google Sans
- Build passes with no errors
</success_criteria>

<output>
After completion, create `.planning/quick/18-fix-header-logo-and-footer-layout-with-g/18-SUMMARY.md`
</output>
