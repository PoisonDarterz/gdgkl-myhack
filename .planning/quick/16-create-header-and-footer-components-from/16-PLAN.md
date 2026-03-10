---
phase: quick-16
plan: 16
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/Header.tsx
  - src/components/sections/FooterSection.tsx
  - src/components/sections/index.ts
  - app/layout.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Dark navbar appears at top of every page with GDG KL logo left and Instagram link right"
    - "Footer shows GDG logo box on left, three white squares + policy links on right, and large outlined REGISTER NOW spanning full width at bottom"
  artifacts:
    - path: "src/components/Header.tsx"
      provides: "Sticky dark navbar component"
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Full footer with logo box, policy links, and REGISTER NOW text"
  key_links:
    - from: "app/layout.tsx"
      to: "src/components/Header.tsx"
      via: "import and render above {children}"
---

<objective>
Implement the Header navbar and Footer section matching the Figma design.

Purpose: These are the top and bottom frame of the entire landing page — currently the header is missing entirely and the footer is a placeholder.
Output: Header component in layout.tsx, fully-built FooterSection replacing the placeholder.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Header navbar component</name>
  <files>src/components/Header.tsx</files>
  <action>
Create `src/components/Header.tsx` as a server component (no "use client" needed — no interactivity):

Layout: full-width `<header>` with `bg-brand-text` (dark `#282828`) background. Inner: `max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between`.

Left side — GDG KL logo text:
- Two-line stacked text block
- Line 1: "Google Developer Group" in small monospace `text-xs tracking-widest text-white/70 uppercase`
- Line 2: "Kuala Lumpur" in slightly larger `text-sm font-bold text-white tracking-wide uppercase`
- Wrap in a `<div className="flex flex-col">` with a thin left border `border-l-2 border-white/30 pl-3`

Right side — Instagram link:
- `<a href="https://instagram.com/gdgkl" target="_blank" rel="noopener noreferrer">`
- Text: `>> CHECK OUT OUR INSTAGRAM <<` (literal angle-bracket arrows as text, not HTML entities)
- Style: `text-xs font-mono tracking-widest text-white hover:text-white/70 transition-colors uppercase`

Then in `app/layout.tsx`, import Header and add `<Header />` directly inside the wrapper div, ABOVE `{children}`. Do NOT add it to page.tsx — it belongs in layout so it appears on all pages. Place between the noise-overlay div and children.

Header should be `sticky top-0 z-50` so it stays fixed at top on scroll.
  </action>
  <verify>Run `npx tsc --noEmit` — no TypeScript errors. Open browser at localhost:3000 and confirm dark sticky navbar visible with GDG KL text left and Instagram link right.</verify>
  <done>Dark header spans full width, sticks to top on scroll, logo text left, Instagram link right with >> << brackets.</done>
</task>

<task type="auto">
  <name>Task 2: Build FooterSection replacing placeholder</name>
  <files>src/components/sections/FooterSection.tsx</files>
  <action>
Rewrite `src/components/sections/FooterSection.tsx` as a server component. The footer has a dark background (`bg-brand-text`, i.e. `#282828`) and consists of two visual zones stacked vertically.

**Zone 1 — top row** (`flex items-start justify-between px-8 py-10`):

Left side — bordered GDG logo box:
- `<div className="border border-white/30 p-5 flex flex-col gap-2">`
- Line 1: `<span className="text-white/50 text-xs font-mono tracking-widest uppercase">Brought to you by</span>`
- Line 2: `<span className="text-white text-xs font-mono tracking-widest uppercase">Google Developer Group</span>`
- Line 3: `<span className="text-white text-sm font-bold font-mono tracking-widest uppercase">Kuala Lumpur</span>`

Right side — decorative squares + policy links:
- Wrapper: `<div className="flex flex-col items-end gap-4">`
- Three white squares: `<div className="flex gap-2">` containing three `<div className="w-4 h-4 bg-white" />` elements (small solid white squares)
- Links row: `<div className="flex gap-6 text-xs font-mono tracking-widest text-white/70 uppercase">`
  - `<a href="#" className="hover:text-white transition-colors">Privacy Policy</a>`
  - `<a href="#" className="hover:text-white transition-colors">Code of Conduct</a>`

**Zone 2 — REGISTER NOW full-width text** (bottom of footer, spanning full width):
- `<div className="border-t border-white/20 px-4 pt-4 pb-2 overflow-hidden">`
- A single `<p>` with `REGISTER NOW` text
- Style: extremely large outlined text — use CSS `WebkitTextStroke` via inline style: `style={{ WebkitTextStroke: "2px white", color: "transparent" }}`
- Tailwind classes: `text-[12vw] font-black tracking-tighter leading-none font-[var(--font-instrument-serif)] uppercase text-center`
- Wrap in `<a href="#" className="block">` so the whole text is a link

Full structure:
```tsx
export function FooterSection() {
  return (
    <section className="w-full bg-brand-text">
      <div className="flex items-start justify-between px-8 py-10">
        {/* left: GDG box */}
        {/* right: squares + links */}
      </div>
      <div className="border-t border-white/20 px-4 pt-4 pb-2 overflow-hidden">
        <a href="#">
          <p style={{ WebkitTextStroke: "2px white", color: "transparent" }}
             className="text-[12vw] font-black tracking-tighter leading-none uppercase text-center font-[var(--font-instrument-serif)]">
            REGISTER NOW
          </p>
        </a>
      </div>
    </section>
  );
}
```
  </action>
  <verify>Run `npx tsc --noEmit` — no TypeScript errors. Open browser at localhost:3000, scroll to bottom. Confirm: dark footer, GDG bordered box left, three white squares + policy links right, giant outlined "REGISTER NOW" text spanning full width at bottom.</verify>
  <done>Footer matches screenshot: dark bg, GDG logo box left, white squares + policy links right, full-width outlined REGISTER NOW at bottom.</done>
</task>

</tasks>

<verification>
`npx tsc --noEmit` exits 0 and `npm run build` completes without errors. Visual check: sticky dark header at top, full-featured dark footer at bottom with all elements from the Figma design.
</verification>

<success_criteria>
- Header: dark sticky navbar, GDG KL logo left, ">> CHECK OUT OUR INSTAGRAM <<" link right
- Footer: dark section, bordered GDG box + "Brought to you by" left, three white squares + Privacy Policy + Code of Conduct right, giant outlined "REGISTER NOW" spanning full width at very bottom
</success_criteria>

<output>
After completion, create `.planning/quick/16-create-header-and-footer-components-from/16-SUMMARY.md`
</output>
