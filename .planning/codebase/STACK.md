# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**
- TypeScript 5.x - All application code (`app/layout.tsx`, `app/page.tsx`, `next.config.ts`, `eslint.config.mjs`)

**Secondary:**
- CSS - Global styles (`app/globals.css`)

## Runtime

**Environment:**
- Node.js 20.9.0

**Package Manager:**
- npm 10.1.0
- Lockfile: Not present (no `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` detected)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework, App Router (`app/` directory)
- React 19.2.3 - UI rendering (`app/layout.tsx`, `app/page.tsx`)
- React DOM 19.2.3 - DOM rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS, configured via PostCSS (`postcss.config.mjs`, `app/globals.css`)
- `@tailwindcss/postcss` 4.x - PostCSS integration for Tailwind v4

**Build/Dev:**
- ESLint 9.x - Linting (`eslint.config.mjs`)
- `eslint-config-next` 16.1.6 - Next.js ESLint rules including Core Web Vitals and TypeScript configs

## Key Dependencies

**Critical:**
- `next` 16.1.6 - Framework; handles routing, SSR/SSG, API routes, image optimization
- `react` / `react-dom` 19.2.3 - UI layer

**Infrastructure:**
- `next/font/google` - Google Fonts integration via Next.js font optimization (Geist and Geist Mono fonts loaded in `app/layout.tsx`)
- `next/image` - Optimized image component used in `app/page.tsx`

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to project root (`./`)
- Module resolution: `bundler`
- JSX: `react-jsx`
- Incremental compilation enabled

**Next.js (`next.config.ts`):**
- Minimal configuration; no custom options set beyond default scaffolding

**ESLint (`eslint.config.mjs`):**
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`

**PostCSS (`postcss.config.mjs`):**
- Uses `@tailwindcss/postcss` plugin only

**CSS (`app/globals.css`):**
- CSS custom properties for `--background` and `--foreground`
- Dark mode via `prefers-color-scheme` media query
- Font variables `--font-geist-sans` and `--font-geist-mono`

**Environment:**
- No `.env` files present; no environment variables configured
- No secrets or external service credentials required at this stage

**Build:**
- `npm run dev` - Development server (`next dev`)
- `npm run build` - Production build (`next build`)
- `npm run start` - Production server (`next start`)
- `npm run lint` - ESLint (`eslint`)

## Platform Requirements

**Development:**
- Node.js 20.x
- npm 10.x

**Production:**
- Designed for Vercel deployment (Vercel branding and deploy links present in `app/page.tsx`)
- Standard Next.js compatible hosting (Vercel, self-hosted Node.js server)

---

*Stack analysis: 2026-03-07*
