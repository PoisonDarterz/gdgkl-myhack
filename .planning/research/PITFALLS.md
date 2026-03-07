# Domain Pitfalls: Figma-to-Next.js Implementation

**Domain:** Figma design implementation — retro/terminal aesthetic landing page
**Researched:** 2026-03-07
**Project:** MyHack / Build With AI KL event landing page
**Stack:** Next.js 16 App Router, Tailwind CSS v4, next/font/google

---

## Critical Pitfalls

Mistakes that cause visual breakage, build failures, or require rewrites.

---

### Pitfall 1: Workbench Font — Variable Axes Not Automatically Included

**What goes wrong:** Workbench is a Google variable font with non-standard axes (BLED and SCAN) that control its segmented LED display effect. When loaded via `next/font/google` without explicitly specifying the `axes` option, only the `wght` axis is included. The font renders as a plain monospace instead of its characteristic LED/segment aesthetic. The design effect is entirely lost.

**Why it happens:** `next/font/google` defaults to including only the `wght` variable axis to minimize file size. Non-standard axes like `BLED` (bleed/glow) and `SCAN` (scan line visibility) are opt-in via the `axes` array option.

**Consequences:** "KUALA LUMPUR" in the hero section renders as plain text instead of the retro LED display it is in the Figma design. This is the most visually distinctive element of the design.

**Prevention:**
```ts
import { Workbench } from 'next/font/google'

const workbench = Workbench({
  subsets: ['latin'],
  variable: '--font-workbench',
  axes: ['BLED', 'SCAN'],  // required for LED effect
  display: 'swap',
})
```
Verify axis identifiers at fonts.google.com/specimen/Workbench before implementing. Axis names are case-sensitive uppercase strings.

**Detection:** Load the page and inspect whether "KUALA LUMPUR" shows the characteristic segmented display look. If it looks like a plain monospace, the axes are missing.

**Phase:** Font setup / layout.tsx replacement — must be done first, before any section implementation.

---

### Pitfall 2: shadcn/Tailwind Theme Overrides Conflict With Design Fonts

**What goes wrong:** The existing `globals.css` has a shadcn-generated `@theme inline` block that maps `--font-sans` to `var(--font-sans)` (a self-referencing no-op) and `--font-mono` to `var(--font-geist-mono)`. The `@layer base` block applies `font-sans` to the `html` element. When the new design fonts are added as CSS variables in `layout.tsx` but not registered in `@theme inline`, the Tailwind utility classes `font-sans`, `font-mono`, and any custom `font-*` utilities will resolve to the wrong values or nothing.

**Why it happens:** Tailwind v4 uses `@theme inline` to map CSS custom properties to utility classes. The shadcn scaffold pre-populates this with Geist references. Simply adding new font variables to `layout.tsx` without also updating `globals.css` leaves the theme disconnected from the new fonts.

**Consequences:** Font utility classes like `font-courier` or `font-workbench` produce no CSS output. The `html` element still applies the old `font-sans` fallback. Design fonts only work on elements where the CSS variable is applied directly via inline styles or explicit `font-family` CSS, not through Tailwind utilities.

**Prevention:**
1. Add new font variables to `layout.tsx` `<html>` or `<body>` className.
2. Register them in `globals.css` `@theme inline`:
```css
@theme inline {
  --font-sans: var(--font-courier-prime);
  --font-mono: var(--font-courier-prime);
  --font-serif: var(--font-instrument-serif);
  --font-display: var(--font-workbench);
}
```
3. Remove or update the `@layer base` `html { @apply font-sans; }` rule to reflect the primary design font.

**Detection:** Inspect the `html` element in DevTools. If it shows `font-family: Arial` or `font-family: ui-sans-serif` instead of Courier Prime, the theme mapping is broken.

**Phase:** Font setup — must precede all component implementation.

---

### Pitfall 3: globals.css Has Conflicting `--font-sans` Self-Reference

**What goes wrong:** Line 10 of the existing `globals.css` reads `--font-sans: var(--font-sans)` — a circular self-reference that resolves to nothing (browsers treat it as invalid and discard it). Any element using `font-sans` via Tailwind falls back to the browser's default sans-serif.

**Why it happens:** The shadcn scaffold generates this as a placeholder. It was never a working declaration; it was meant to be replaced.

**Consequences:** If the team does not notice the self-reference, they may spend time debugging why `font-sans` isn't working when the root cause is a broken CSS variable declaration.

**Prevention:** When updating `globals.css`, replace `--font-sans: var(--font-sans)` with the actual CSS variable: `--font-sans: var(--font-courier-prime)`.

**Detection:** Open DevTools computed styles for the `html` element. If `font-family` is the browser default, check what `--font-sans` resolves to.

**Phase:** Font setup — catch immediately when replacing layout.tsx.

---

### Pitfall 4: Figma Pixel Values Cannot Be Directly Translated to Tailwind Classes

**What goes wrong:** The Figma design is a 6929x13969px frame. Font sizes, spacing, and layout measurements in Figma are absolute pixel values on a large desktop canvas. Directly copying px values into Tailwind arbitrary value classes (e.g., `text-[280px]`) produces a page that overflows and looks broken on any real screen width.

**Why it happens:** Figma designs at this scale use a fixed-width canvas. The "large" hero text ("Build With AI" in Instrument Serif) likely occupies hundreds of pixels at the Figma canvas scale but needs to be viewport-relative or clamped to fit real screens.

**Consequences:** Hero section text either overflows the viewport (causing horizontal scroll) or looks tiny if naively scaled. The design intent — large impactful display text — is lost either way.

**Prevention:**
- Identify the intended viewport width (likely 1440px or 1920px) and establish a scale ratio.
- Use `clamp()` or `vw`-based font sizes for display text: `text-[clamp(3rem,8vw,9rem)]`.
- Use Tailwind's arbitrary values for spacing and sizing derived from the target viewport, not the Figma canvas.
- Confirm the target viewport with the design before implementing hero typography.

**Detection:** View the page at 1440px wide in DevTools. If the hero text wraps to three lines when the Figma shows one, the size is wrong.

**Phase:** Hero section implementation — establish the viewport baseline before sizing any text.

---

### Pitfall 5: Noise Texture Implementation Method Affects Performance and Fidelity

**What goes wrong:** There are multiple ways to implement a noise/grain texture overlay (CSS background SVG filter, base64 PNG, generated SVG turbulence, CSS custom properties). Choosing the wrong method leads to either poor visual fidelity (the texture looks different from Figma), performance issues (large PNG re-downloaded on every page), or layout issues (the texture shifts or tiles visibly).

**Why it happens:** The Figma design likely uses a solid color fill with a noise layer blended on top. CSS has no direct equivalent of Figma's "noise fill" — it must be recreated via `mix-blend-mode`, `opacity`, and either a repeating SVG or a `filter: url()` approach.

**Consequences:** The texture either looks obviously different from the design, causes layout shift if loaded as an external image, or causes Cumulative Layout Shift if placed as a background image that loads after content.

**Prevention:**
- Use an inline SVG `feTurbulence` filter applied via CSS for zero network overhead: `filter: url("data:image/svg+xml,<svg>...")`. This is deterministic and matches across browsers.
- Alternatively, embed a small base64-encoded PNG as a CSS `background-image` in `globals.css` — not in a `<img>` tag — so it is part of the CSS bundle and never causes layout shift.
- Apply the texture as a pseudo-element (`::before` or `::after`) with `pointer-events: none` and `position: fixed` so it covers the viewport without affecting document flow.
- Set `mix-blend-mode: multiply` or `overlay` to match Figma's blend mode.

**Detection:** Compare side-by-side with the Figma design at the same zoom. Check for tiling seams, color cast differences, and layout shift in Chrome DevTools Performance tab.

**Phase:** Background/global styles — implement early and verify before adding sections.

---

### Pitfall 6: Dynamic Tailwind Class Construction Is Purged at Build Time

**What goes wrong:** If any component generates Tailwind class names by string concatenation or template literals (e.g., `` `text-${size}` `` or `` `bg-${color}-500` ``), those classes will not appear in the final CSS bundle. The elements will be unstyled in production builds.

**Why it happens:** Tailwind v4 scans source files as plain text. It cannot evaluate runtime expressions. Only literal, complete class name strings are detected.

**Consequences:** Styles that work in development (if using Tailwind's dev server which may be more permissive) disappear in production builds. This is a common cause of "works locally, broken in deployment" bugs.

**Prevention:** This project uses `class-variance-authority` (CVA) and `tailwind-merge` from the shadcn setup. CVA enforces the pattern of complete static strings in variant maps, which is correct. Never construct partial class names:
```tsx
// BAD — will be purged
const cls = `text-${fontSize}-500`

// GOOD — complete static strings
const cls = fontSize === 'large' ? 'text-xl' : 'text-base'
```
If arbitrary values need to be dynamic (e.g., a font size read from props), use inline `style` prop instead of Tailwind classes.

**Detection:** `npm run build` and inspect the generated CSS. Compare with the development build. Missing styles that work in dev are a strong signal.

**Phase:** Any component with dynamic styling — enforce from first component written.

---

### Pitfall 7: Instrument Serif Is a Serif Font Without Italic in All Weights

**What goes wrong:** Instrument Serif on Google Fonts provides only regular weight (400). It also offers italic, but only at 400. If the design uses any other weight variation (bolder hero text achieved by font weight), specifying `weight: '700'` will either fall back to system serif or trigger a build error.

**Why it happens:** Not all Google Fonts are variable fonts. Instrument Serif is a static font with limited weight/style combinations. `next/font/google` requires a `weight` to be specified for non-variable fonts, and if an unavailable weight is requested, the build fails.

**Consequences:** Build errors during font loading, or fallback to Times New Roman/system serif for the Instrument Serif display text, completely breaking the hero aesthetic.

**Prevention:**
```ts
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',           // only available weight
  style: ['normal', 'italic'],  // both styles available at 400
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})
```
Do not specify weights other than 400 for Instrument Serif.

**Detection:** Run `next build`. Any weight that doesn't exist will produce a build-time error from `next/font/google`.

**Phase:** Font setup — catch at layout.tsx implementation, before any components.

---

### Pitfall 8: Courier Prime Is Not a Variable Font — Weight Array Required

**What goes wrong:** Courier Prime is a static Google Font (not variable). It has discrete weights: 400 (regular), 700 (bold), and both in italic variants. If only `weight: '400'` is loaded but the design uses bold monospace text in headings or badges, those elements fall back to browser-synthesized bold, which looks different from real bold and can cause letter spacing issues.

**Why it happens:** next/font/google loads only the specified weights. Synthesized bold stretches the 400 font rather than using the actual 700 glyphs.

**Consequences:** Badges, labels, and bold monospace text look wrong — fatter, sloppier, with incorrect metrics compared to the design.

**Prevention:**
```ts
import { Courier_Prime } from 'next/font/google'

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-courier-prime',
  display: 'swap',
})
```
Load all weights actually used in the design. Check the Figma design for any bold or italic Courier Prime usage.

**Detection:** Inspect elements with bold monospace text in DevTools. If `font-synthesis: weight` is active, the browser is faking bold.

**Phase:** Font setup — load all required weights upfront.

---

### Pitfall 9: layout.tsx Font Variables Scoped to Wrong Element

**What goes wrong:** The current `layout.tsx` applies font variable classes to `<body>` but the `globals.css` `@layer base` applies `font-sans` to `html`. If the new font variables are added to `<body>` but the CSS variable theme uses `--font-sans` on `html`, there is a cascade mismatch: `html` inherits nothing, `body` has the variables, and the CSS custom properties are available only to body descendants, not on `html` itself.

**Why it happens:** Next.js examples typically show font variables on `<body>`, but the shadcn globals.css sets fonts on `html`. When the two don't match, elements outside `<body>` (rare but possible with Next.js App Router layout nesting) lose the font.

**Consequences:** Subtle font cascade issues, typically not visible in simple single-page apps but fragile. More critically, if font variables are not on the `html` element, the `@theme inline` mappings that reference them resolve to empty.

**Prevention:** Apply font variable classes to `<html>`, not `<body>`. Update `layout.tsx`:
```tsx
<html lang="en" className={`${courierPrime.variable} ${instrumentSerif.variable} ${workbench.variable}`}>
  <body className="antialiased">
    {children}
  </body>
</html>
```

**Detection:** In DevTools, inspect the `html` element. The CSS custom properties (`--font-courier-prime`, etc.) should be visible there. If they only appear on `body`, the variables are on the wrong element.

**Phase:** Font setup — correct immediately when modifying layout.tsx.

---

### Pitfall 10: Figma Group Layouts Map Poorly to CSS Flexbox/Grid

**What goes wrong:** Figma uses Auto Layout and Frame/Group structures that don't directly correspond to CSS layout models. Nested frames with padding, gap, and alignment properties look like flexbox, but their wrapping behavior, overflow handling, and z-index stacking may differ. Complex sections (the timeline cards, FAQ entries, partner grid) may appear pixel-perfect in a static screenshot but behave incorrectly when content length varies.

**Why it happens:** Figma designs are static. They show one state with fixed content. CSS layouts must handle variable content, text wrapping, and different container sizes. Figma's "clip content" on frames has no direct CSS equivalent — it's either `overflow: hidden` (which hides content) or nothing (which shows overflow).

**Consequences:** Section layouts break when real text is longer or shorter than the Figma content. Cards in the timeline or FAQ section collapse to zero height or overflow their containers.

**Prevention:**
- For each complex section, determine the layout intent: is this a grid, flexbox column, or absolute positioning?
- Set explicit `min-height` rather than `height` on card containers so they grow with content.
- Use `overflow-wrap: break-word` on text within fixed-width containers.
- Test each section with longer text than in the Figma to confirm graceful expansion.

**Detection:** Replace design text with longer strings in development. If a card collapses or clips text, the layout uses fixed height instead of minimum height.

**Phase:** Each section implementation — verify content resilience before marking a section done.

---

### Pitfall 11: Large Marquee Text Needs Scroll Animation Without Overflow Causing Layout Issues

**What goes wrong:** The "REGISTER NOW" marquee section uses very large text that scrolls horizontally. A naive implementation with `overflow: hidden` on the parent clips the text, while `overflow: visible` causes the text to affect document width and enable horizontal page scrolling.

**Why it happens:** Marquee/ticker effects require the text to exist outside the visible container boundary. The parent must hide horizontal overflow without affecting the document's scroll width. This requires careful isolation of the overflow context.

**Consequences:** Horizontal scrollbar appears on the entire page, or the marquee text is clipped mid-letter at the edges.

**Prevention:**
- Wrap the marquee in a container with `overflow-x: hidden` that is itself inside the document flow.
- Use CSS `@keyframes` translation rather than JavaScript scrolling.
- Apply `will-change: transform` on the animated element to promote it to its own compositing layer.
- Set `width: 100%` and `overflow: hidden` on the section wrapper, not the document root.

**Detection:** Enable the scrollbar always in DevTools (Settings > Rendering > Show scrollbars). If a horizontal scrollbar appears on the page body, the overflow context is wrong.

**Phase:** Register CTA / marquee section — test in isolation before integrating into page.

---

## Moderate Pitfalls

---

### Pitfall 12: Shadcn CSS Variable Namespace Collision

**What goes wrong:** The existing `globals.css` defines extensive shadcn design tokens (`--primary`, `--secondary`, `--background`, `--foreground`, etc.). These are color values in OKLCH format. The design uses `#F5F5F5` (background) and `#282828` (text). If the shadcn tokens are not updated, the `bg-background` and `text-foreground` Tailwind utilities from the existing `@layer base` body rule will use the wrong colors.

**Prevention:** Update `globals.css` `:root` section to set `--background` to the design's `#F5F5F5` and `--foreground` to `#282828`. Or explicitly avoid using `bg-background`/`text-foreground` utilities and instead use design-specific tokens.

**Phase:** Global styles setup — update alongside font configuration.

---

### Pitfall 13: `adjustFontFallback` Causes Layout Shift Between Fallback and Loaded Font

**What goes wrong:** `next/font` enables `adjustFontFallback: true` by default for Google Fonts. This creates a synthetic fallback font with adjusted metrics to minimize CLS. However, for highly distinctive display fonts (Workbench, Instrument Serif), the fallback adjustment can cause visible layout reflow as the custom font loads even with `display: swap`.

**Prevention:** For display fonts used in large hero text (Instrument Serif, Workbench), set `display: 'optional'` if the font is not preloaded, or `display: 'block'` to prevent FOUT at the cost of invisible text during load. Since these fonts define the entire visual identity of the page, `display: 'block'` with a short timeout is preferable to a jarring swap.

**Phase:** Font setup — configure display strategy per font role (body vs. display).

---

### Pitfall 14: Terminal/Log Block Requires Monospace Alignment to Be Exact

**What goes wrong:** The "What is Build With AI?" section has a terminal system log block. Terminal aesthetics depend on character-level alignment — columns of text must line up precisely. If the monospace font is not applied to every character in the block, or if the container uses any proportional font fallback, the columnar alignment breaks.

**Prevention:** Wrap the entire terminal block in an element with explicit `font-family: var(--font-courier-prime)` or the Tailwind utility. Do not rely on inheritance from a parent that might be overridden. Use `whitespace-pre` or `whitespace-pre-wrap` to preserve spacing.

**Phase:** "What is Build With AI?" section implementation.

---

### Pitfall 15: Tailwind v4 Config Is CSS-First — No `tailwind.config.js`

**What goes wrong:** The project uses Tailwind v4, which uses `@theme` in CSS for configuration rather than `tailwind.config.js`. Developers familiar with Tailwind v3 may attempt to create a `tailwind.config.js` to extend font families or add custom spacing — this file is ignored in v4. Changes made there have no effect and create false confidence that fonts are configured.

**Prevention:** All theme customization in this project goes in `globals.css` inside the `@theme inline` block. Verify the Tailwind version before writing any config:
```
"tailwindcss": "^4"  ← confirmed v4 in package.json
```

**Detection:** If a `tailwind.config.js` exists but custom utilities aren't working, it's being ignored. Check whether the project is v3 or v4.

**Phase:** Font setup and theme configuration — establish correct approach before writing any utilities.

---

## Minor Pitfalls

---

### Pitfall 16: `text-[color]` Arbitrary Colors vs. Design Token Colors

**What goes wrong:** Using hex colors directly in Tailwind arbitrary value classes (`text-[#282828]`, `bg-[#F5F5F5]`) instead of registering them as design tokens makes the color palette inconsistent and hard to update. If the muted text color `#5C5C5C` appears in 20 arbitrary values, a color change requires 20 find-and-replace operations.

**Prevention:** Register design colors in `globals.css` `@theme inline`:
```css
@theme inline {
  --color-design-bg: #F5F5F5;
  --color-design-text: #282828;
  --color-design-muted: #5C5C5C;
}
```
Then use `bg-design-bg`, `text-design-text`, `text-design-muted` as utilities.

**Phase:** Global styles setup — do this before writing any component.

---

### Pitfall 17: `Workbench` Import Name Must Use Capital W

**What goes wrong:** next/font/google exports use the exact Google Fonts name with underscores for spaces. `Workbench` has no spaces so it imports as `Workbench`. `Courier Prime` becomes `Courier_Prime`. `Instrument Serif` becomes `Instrument_Serif`. Getting the import name wrong produces a TypeScript error or runtime `undefined is not a function`.

**Prevention:**
```ts
import { Courier_Prime, Instrument_Serif, Workbench } from 'next/font/google'
```
The Next.js docs confirm: "Use an underscore (_) for font names with multiple words."

**Phase:** Font setup — trivial but worth explicit confirmation before starting.

---

### Pitfall 18: Missing `subsets` Warning in Next.js Build Output

**What goes wrong:** If `subsets` is omitted from any `next/font/google` call and `preload: true` (default), Next.js emits a build warning. The font still loads, but the preload link tag is not injected, degrading performance.

**Prevention:** Always specify `subsets: ['latin']` for all three design fonts.

**Phase:** Font setup.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| layout.tsx font replacement | Workbench axes missing (Pitfall 1), wrong element scoping (Pitfall 9), Instrument Serif wrong weight (Pitfall 7) | Implement all three fonts together with correct config before any section work |
| globals.css theme update | shadcn font variable self-reference (Pitfall 3), theme namespace conflict (Pitfall 12), Tailwind v4 config location (Pitfall 15) | Update @theme inline and :root color tokens as first CSS task |
| Hero section | Figma pixel scaling (Pitfall 4), font fallback flash (Pitfall 13) | Establish viewport baseline, use clamp() for display text, set display: 'block' on display fonts |
| Background / noise texture | Noise implementation method (Pitfall 5) | Use inline SVG feTurbulence or base64 CSS background, never an img tag |
| Any section with dynamic class names | Tailwind purge (Pitfall 6) | Never use string interpolation to build Tailwind class names |
| Terminal log block | Monospace alignment (Pitfall 14) | Explicit font-family on the block, whitespace-pre |
| Register CTA marquee | Horizontal overflow (Pitfall 11) | overflow-x: hidden on section wrapper, CSS animation not JS |
| Timeline / complex group sections | Figma layout mismatch (Pitfall 10) | min-height not height, test with variable content length |

---

## Sources

- Next.js Font API Reference (v16.1.6, fetched 2026-02-27): https://nextjs.org/docs/app/api-reference/components/font — HIGH confidence, official docs
- Next.js Font Optimization Overview (v16.1.6, fetched 2026-02-27): https://nextjs.org/docs/app/getting-started/fonts — HIGH confidence, official docs
- Tailwind CSS v4 Arbitrary Values: https://tailwindcss.com/docs/adding-custom-styles — HIGH confidence, official docs
- Tailwind CSS v4 Content/Purge Behavior: https://tailwindcss.com/docs/content-configuration — HIGH confidence, official docs
- Workbench font axes (BLED, SCAN): MEDIUM confidence — confirmed from next/font docs that `axes` option exists for custom variable font axes; specific axis names inferred from font design documentation. Verify axis strings at fonts.google.com/specimen/Workbench before implementation.
- Instrument Serif weight limitation (400 only): MEDIUM confidence — inferred from Google Fonts catalog behavior for serif display fonts; verify at fonts.google.com/specimen/Instrument+Serif before implementation.
- Project codebase analysis (globals.css self-referencing variable, layout.tsx structure): HIGH confidence — directly observed in source files.
