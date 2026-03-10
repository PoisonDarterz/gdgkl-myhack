---
phase: quick-20
plan: 20
type: execute
wave: 1
depends_on: []
files_modified:
  - app/layout.tsx
  - app/globals.css
autonomous: true
requirements: [QUICK-20]
must_haves:
  truths:
    - "Google Sans renders site-wide at all weights including 900"
    - "Font loads from Google Fonts CDN, not next/font/google"
    - "All existing font utilities (font-mono, font-display, font-retro) remain functional"
  artifacts:
    - path: "app/layout.tsx"
      provides: "Google Fonts CDN link tag in <head>, Google_Sans import removed"
    - path: "app/globals.css"
      provides: "--font-sans mapped to 'Google Sans' CDN family, site-wide application"
  key_links:
    - from: "app/layout.tsx"
      to: "fonts.gstatic.com"
      via: "<link> preconnect + stylesheet href"
    - from: "app/globals.css"
      to: "layout.tsx CDN font"
      via: "--font-sans: 'Google Sans', sans-serif in @theme inline"
---

<objective>
Load Google Sans from Google Fonts CDN directly, replacing the next/font/google import which caps at weight 700. Apply as the site-wide primary sans font via --font-sans CSS variable.

Purpose: Enable full weight range (100-900) for Google Sans, unlocking weight 900 for bold brand text like the footer REGISTER NOW depth effect.
Output: Google Sans CDN link in layout head, globals.css wired as --font-sans.
</objective>

<execution_context>
@C:/Users/youknowwhoiam/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/youknowwhoiam/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@app/layout.tsx
@app/globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Replace next/font/google Google_Sans with CDN link tag</name>
  <files>app/layout.tsx</files>
  <action>
    In app/layout.tsx:

    1. Remove the `Google_Sans` import from the `next/font/google` import line.
    2. Remove the `const googleSans = Google_Sans({...})` block entirely.
    3. Remove `${googleSans.variable}` from the wrapper div className.
    4. Add a `<link>` preconnect and stylesheet in the `<head>` element (add `<head>` tags if not present — Next.js App Router supports adding metadata children via the `<head>` element in layout.tsx, or use Next.js `<Head>` — actually the correct approach for App Router is to add it directly as children in the html/body or use the `metadata` export with `verification` or use next/head. For App Router, the correct way is to place `<link>` tags directly inside the returned JSX `<head>` element OR use the metadata `other` field.

    The simplest and correct approach for Next.js App Router: add `<link>` elements directly inside the `<html>` return as sibling to `<body>` is not valid HTML. Instead, use the Next.js metadata `viewport` pattern — but the cleanest solution is to render a `<link>` tag by importing `next/head` — however in App Router, `next/head` is not used.

    **Correct App Router approach:** Place `<link>` tags in `<head>` within the RootLayout JSX return. The App Router `RootLayout` can include a `<head>` element explicitly in the returned JSX between `<html>` and `<body>`:

    ```tsx
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body ...>
    ```

    Note: `crossOrigin` is the JSX attribute (camelCase), not `crossorigin`.

    The `--font-google-sans` CSS variable is no longer needed from next/font since we are switching to a global font-family name. Remove it from the wrapper div className. Keep all other font variables: `courierPrime.variable`, `instrumentSerif.variable`, `workbench.variable`.
  </action>
  <verify>Run `npx next build` or `npx next dev` — no TypeScript errors about missing Google_Sans import or variable reference.</verify>
  <done>layout.tsx has CDN link tags in head, no Google_Sans next/font import, no googleSans.variable reference.</done>
</task>

<task type="auto">
  <name>Task 2: Wire Google Sans CDN family as --font-sans in globals.css</name>
  <files>app/globals.css</files>
  <action>
    In app/globals.css, inside the `@theme inline` block:

    1. Update the `--font-sans` line from `var(--font-sans)` (which was pointing at itself — a no-op) to use the CDN font family directly:
       ```css
       --font-sans: 'Google Sans', sans-serif;
       ```

    2. Remove the `--font-google-sans` CSS variable alias if it exists in `@theme inline` (it was only needed when next/font injected a scoped variable). Since `--font-google-sans` is not currently in `@theme inline`, no removal needed — just confirm.

    3. In `@layer base`, the `html { @apply font-sans; }` rule already applies `--font-sans` site-wide — no change needed there.

    The result: every element inheriting `font-sans` (which is the entire page via `html`) will render in Google Sans from the CDN with all weights 100-900 available.

    Do NOT touch `--font-mono`, `--font-display`, or `--font-retro` — those remain as-is.
  </action>
  <verify>In browser devtools, inspect `body` or `html` computed font-family — should show "Google Sans". Check that weight 900 renders correctly on footer REGISTER NOW text.</verify>
  <done>--font-sans is 'Google Sans', sans-serif in @theme inline. Site-wide font renders Google Sans from CDN. Weight 900 is available.</done>
</task>

</tasks>

<verification>
1. `npx next dev` starts without TypeScript/import errors
2. Browser shows Google Sans in computed styles for body
3. Font weight 900 renders on footer REGISTER NOW (depth effect)
4. No regression in font-mono (Courier Prime), font-display (Instrument Serif), font-retro (Workbench)
</verification>

<success_criteria>
Google Sans loads from Google Fonts CDN at all weights (100-900). Site-wide sans font is Google Sans. next/font/google Google_Sans import is removed. No existing font utilities broken.
</success_criteria>

<output>
After completion, create `.planning/quick/20-use-google-sans-font-from-fonts-google-c/20-SUMMARY.md`
</output>
