# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**
- Pages use lowercase kebab-style route segments (Next.js App Router convention): `app/page.tsx`, `app/layout.tsx`
- Config files use camelCase or dot-separated lowercase: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`
- CSS file is `globals.css` — single global stylesheet

**Components/Functions:**
- React components use PascalCase: `RootLayout`, `Home`
- Default exports are the component function (not named `export const`, but `export default function`)
- Non-component constants use camelCase: `geistSans`, `geistMono`, `nextConfig`

**Variables:**
- camelCase for all local variables and constants
- SCREAMING_SNAKE_CASE not observed; prefer descriptive camelCase

**Types:**
- Imported types use PascalCase: `Metadata`, `NextConfig`
- Type imports use `import type { ... }` syntax (TypeScript `isolatedModules` compatible)

## Code Style

**Formatting:**
- No Prettier config file present — formatting is not explicitly enforced by a formatter
- Indentation: 2 spaces (observed in all `.tsx`, `.ts`, `.mjs` files)
- Double quotes for strings in JSX attributes and import paths

**Linting:**
- ESLint 9 with flat config format (`eslint.config.mjs`)
- Rule sets: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Core Web Vitals rules enforce performance-oriented patterns (e.g., using `next/image` over `<img>`)
- TypeScript-aware linting via `eslint-config-next/typescript`
- Run with: `npm run lint` (invokes `eslint` with no additional flags)

**TypeScript:**
- `strict: true` — all strict checks enabled
- `noEmit: true` — TypeScript is type-checking only; Next.js handles compilation
- `isolatedModules: true` — each file must be independently compilable
- `esModuleInterop: true`
- Target: `ES2017`

## Import Organization

**Order (observed in `app/layout.tsx`, `app/page.tsx`):**
1. Framework/library imports (`import type { Metadata } from "next"`, `import Image from "next/image"`)
2. Local font/component imports (`from "next/font/google"`)
3. CSS imports (`import "./globals.css"`)

**Path Aliases:**
- `@/*` maps to project root `./*` (configured in `tsconfig.json`)
- Example: `import something from "@/components/Button"` would resolve to `./components/Button`

## Error Handling

**Current state:** No custom error handling patterns established — codebase is scaffolded only.

**Next.js conventions to follow when adding error handling:**
- Use `app/error.tsx` for route-level error boundaries
- Use `app/not-found.tsx` for 404 handling
- Server Actions should use try/catch and return structured error objects

## Logging

**Framework:** None established. Console logging only.

**Patterns:**
- No logging utility present — use `console.error` for errors, `console.log` sparingly during development
- Avoid committing debug `console.log` statements to production code

## Comments

**When to Comment:**
- No JSDoc or inline comments observed in existing source files
- Prefer self-documenting code over comments
- Config files use brief inline comments where Next.js scaffold provides them (e.g., `/* config options here */`)

**JSDoc/TSDoc:**
- Not used in existing codebase — not required but can be added for exported utility functions

## Function Design

**Size:** Components are small and focused (single responsibility observed in `layout.tsx` and `page.tsx`)

**Parameters:**
- Props are typed inline with destructuring: `{ children }: Readonly<{ children: React.ReactNode }>`
- Use `Readonly<>` wrapper for component props to prevent mutation

**Return Values:**
- Components return JSX directly — no intermediate variables for JSX trees
- Config objects exported as typed constants: `const nextConfig: NextConfig = { ... }`

## Module Design

**Exports:**
- One default export per file (React components and config files)
- `export default function ComponentName` pattern for pages and layouts
- `export const metadata` for Next.js metadata objects (named export alongside default)

**Barrel Files:**
- None present — not a pattern in this codebase yet
- Avoid adding barrel files (`index.ts`) unless the project grows to need them

## Styling

**Approach:** Tailwind CSS v4 via utility classes inline in JSX
- All styling done via `className` props — no CSS Modules, no styled-components
- CSS custom properties defined in `app/globals.css` for theming (`--background`, `--foreground`)
- Dark mode via `prefers-color-scheme` media query in `globals.css` and `dark:` Tailwind variants
- Fonts loaded via `next/font/google` and applied as CSS variables (`--font-geist-sans`, `--font-geist-mono`)

---

*Convention analysis: 2026-03-07*
