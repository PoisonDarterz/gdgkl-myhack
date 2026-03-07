# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** Next.js App Router - file-system-based routing with React Server Components

**Key Characteristics:**
- All routing is handled by the `app/` directory using Next.js App Router conventions
- Root layout wraps all pages; pages are co-located with their route segment
- No custom layers (services, repositories, API routes) exist yet - this is a fresh scaffold
- Server Components by default; client components require explicit `"use client"` directive
- Styling via Tailwind CSS v4 utility classes applied directly in JSX

## Layers

**Layout Layer:**
- Purpose: Wraps all pages with shared HTML shell, fonts, and global styles
- Location: `app/layout.tsx`
- Contains: Root `<html>` and `<body>` tags, font variables, global metadata export
- Depends on: `app/globals.css`, `next/font/google`
- Used by: Every route in the `app/` directory automatically

**Page Layer:**
- Purpose: Renders the UI for a given route segment
- Location: `app/page.tsx` (root route `/`)
- Contains: Default-exported React Server Component functions
- Depends on: `next/image`, static assets from `public/`
- Used by: Next.js router, which maps file path to URL

**Static Assets Layer:**
- Purpose: Serves publicly accessible files at the root URL path
- Location: `public/`
- Contains: SVG icons (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`)
- Depends on: Nothing
- Used by: Page components via `<Image>` or direct `<img>` src references

## Data Flow

**Page Render (Server Component):**

1. Browser requests a route (e.g., `/`)
2. Next.js matches `app/page.tsx` to the route
3. `app/layout.tsx` renders, injecting `children` (the page) into `<body>`
4. `app/page.tsx` renders as a React Server Component on the server
5. HTML is streamed to the browser

**State Management:**
- None currently. This is a static scaffold with no client state, server state, or data fetching.

## Key Abstractions

**Root Layout (`RootLayout`):**
- Purpose: Single shared shell applied to every page in the app
- Examples: `app/layout.tsx`
- Pattern: Default-exported async React component accepting `{ children }` prop; exports `metadata` object for `<head>` tags

**Page Component (`Home`):**
- Purpose: Renders the UI for the root route
- Examples: `app/page.tsx`
- Pattern: Default-exported React Server Component (no `"use client"`) returning JSX

**Global CSS / Theme Tokens:**
- Purpose: Defines CSS custom properties for background/foreground and imports Tailwind
- Examples: `app/globals.css`
- Pattern: `@import "tailwindcss"` at the top; CSS variables defined on `:root` with dark-mode override via `@media (prefers-color-scheme: dark)`; Tailwind `@theme inline` block wires variables to utility classes

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every page request in the app
- Responsibilities: Renders the HTML document shell, applies Geist font CSS variables, imports global styles

**Root Page:**
- Location: `app/page.tsx`
- Triggers: HTTP GET `/`
- Responsibilities: Renders the landing page UI using Next.js `<Image>` and Tailwind utility classes

**Next.js Config:**
- Location: `next.config.ts`
- Triggers: Build and dev server startup
- Responsibilities: Passes framework-level configuration to Next.js (currently no custom options set)

## Error Handling

**Strategy:** Framework default (no custom error handling defined)

**Patterns:**
- No `error.tsx` boundary defined yet - Next.js will use its built-in error page
- No `not-found.tsx` defined - Next.js will use its built-in 404 page

## Cross-Cutting Concerns

**Logging:** None - no logging library or custom logger configured
**Validation:** None - no form validation or schema validation library present
**Authentication:** None - no auth provider or middleware configured
**Fonts:** Loaded via `next/font/google` (Geist Sans and Geist Mono) with CSS variable injection in `app/layout.tsx`

---

*Architecture analysis: 2026-03-07*
