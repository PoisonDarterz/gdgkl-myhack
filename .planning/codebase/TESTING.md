# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Runner:** None installed

No test framework is configured in this project. The `package.json` defines no test script, no test runner dependency (Jest, Vitest, Playwright, Cypress, etc.), and no test configuration file exists at the project root.

**Current test-related configuration:**
- `.gitignore` includes `/coverage` — indicating test coverage output is anticipated but not yet set up
- No `jest.config.*`, `vitest.config.*`, or `playwright.config.*` files present

**Run Commands:**
```bash
# No test commands available yet
npm run lint    # Only code quality check currently available
```

## Recommended Setup (Not Yet Implemented)

For a Next.js 16 / React 19 project, the standard testing stack is:

**Unit/Integration:**
- Vitest (preferred for ESM-first projects) or Jest with `jest-environment-jsdom`
- React Testing Library (`@testing-library/react`) for component tests
- `@testing-library/user-event` for interaction simulation

**E2E:**
- Playwright (official Next.js recommendation)

## Test File Organization

**Current state:** No test files exist in the project source.

**Recommended location pattern (to establish):**
- Co-locate unit tests with source files: `app/components/Button.test.tsx` alongside `app/components/Button.tsx`
- Place integration and E2E tests in a top-level `tests/` or `e2e/` directory

**Recommended naming:**
- Unit: `[name].test.tsx` / `[name].test.ts`
- E2E: `[feature].spec.ts`

## Test Structure

**No patterns established.** When adding tests, follow this structure for React components:

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ComponentName from "@/app/components/ComponentName";

describe("ComponentName", () => {
  it("renders expected content", () => {
    render(<ComponentName />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
```

## Mocking

**Framework:** None established.

**Recommended patterns when using Vitest:**
```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock a function
const mockFetch = vi.fn().mockResolvedValue({ json: () => ({ data: [] }) });
```

**What to Mock:**
- Next.js router hooks (`useRouter`, `usePathname`, `useSearchParams`)
- External API calls and fetch requests
- Browser APIs not available in jsdom (e.g., `IntersectionObserver`, `ResizeObserver`)

**What NOT to Mock:**
- React itself
- Internal utility functions being tested
- Next.js `Image` and `Link` components (use actual implementations)

## Fixtures and Factories

**Test Data:** None established.

**Recommended pattern:**
```typescript
// tests/fixtures/user.ts
export const mockUser = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
};
```

**Location:**
- `tests/fixtures/` for shared test data
- Inline for one-off data used in a single test file

## Coverage

**Requirements:** None enforced (no coverage tooling configured)

**Recommended target:** 80% line coverage for utility functions and business logic; component smoke tests at minimum for UI code

**View Coverage (once configured):**
```bash
# With Vitest
npx vitest run --coverage

# With Jest
npx jest --coverage
```

## Test Types

**Unit Tests:**
- Not present. Should cover: utility functions, data transformation helpers, custom hooks

**Integration Tests:**
- Not present. Should cover: page components with mocked data, form submissions, navigation flows

**E2E Tests:**
- Not present. Playwright recommended for full user journey testing against the running app

## Adding Tests — Getting Started

To add testing to this project, install a framework first:

```bash
# Vitest + React Testing Library (recommended)
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom

# Then add to package.json scripts:
# "test": "vitest",
# "test:coverage": "vitest run --coverage"
```

Create `vitest.config.ts` at project root:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
});
```

---

*Testing analysis: 2026-03-07*
