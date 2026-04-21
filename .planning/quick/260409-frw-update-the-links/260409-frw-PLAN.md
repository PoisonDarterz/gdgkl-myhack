---
phase: quick
plan: 260409-frw
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroSection.tsx
  - src/components/sections/FooterSection.tsx
  - src/components/sections/TimelineSection.tsx
autonomous: true
must_haves:
  truths:
    - "Hero REGISTER NOW button links to main CTA Google Form"
    - "Footer REGISTER NOW depth text links to main CTA Google Form"
    - "MEETUP #1 timeline event links to GDG community page"
    - "MYHACK OPENING and MYHACK CLOSING timeline events link to MyHack registration form"
    - "WORKSHOP and MEETUP #2 timeline events have NO registration links"
  artifacts:
    - path: "src/components/sections/HeroSection.tsx"
      provides: "Main CTA registration link updated"
      contains: "forms.gle/zi6YknjSZosmJEVL9"
    - path: "src/components/sections/FooterSection.tsx"
      provides: "Footer registration link updated"
      contains: "forms.gle/zi6YknjSZosmJEVL9"
    - path: "src/components/sections/TimelineSection.tsx"
      provides: "Timeline events with registration links where available"
      contains: "gdg.community.dev/e/mgkk2e"
  key_links:
    - from: "HeroSection REGISTER NOW button"
      to: "https://forms.gle/zi6YknjSZosmJEVL9"
      via: "anchor href"
    - from: "FooterSection REGISTER NOW text"
      to: "https://forms.gle/zi6YknjSZosmJEVL9"
      via: "anchor href"
    - from: "TimelineSection MEETUP #1 card"
      to: "https://gdg.community.dev/e/mgkk2e/"
      via: "anchor href wrapping card or Register link"
    - from: "TimelineSection MYHACK OPENING/CLOSING cards"
      to: "https://forms.gle/7C1S7w2gjMVKfdgj9"
      via: "anchor href wrapping card or Register link"
---

<objective>
Update registration and event links across the site with real URLs.

Purpose: Replace placeholder/old registration form links with correct URLs, and add event-specific registration links to timeline events that have them.
Output: All CTA buttons and applicable timeline events link to their correct registration pages.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/sections/HeroSection.tsx
@src/components/sections/FooterSection.tsx
@src/components/sections/TimelineSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update main CTA "Register Now" links in Hero and Footer</name>
  <files>src/components/sections/HeroSection.tsx, src/components/sections/FooterSection.tsx</files>
  <action>
Replace the old Google Form URL with the new main CTA URL in both files:

In HeroSection.tsx (line 258):
- Change href from "https://forms.gle/GZ1xhZG68RoPJZhQ6" to "https://forms.gle/zi6YknjSZosmJEVL9"

In FooterSection.tsx (line 51):
- Change href from "https://forms.gle/GZ1xhZG68RoPJZhQ6" to "https://forms.gle/zi6YknjSZosmJEVL9"

Both are simple string replacements. Do NOT change any other attributes, styling, or structure.
  </action>
  <verify>
    <automated>grep -c "forms.gle/zi6YknjSZosmJEVL9" src/components/sections/HeroSection.tsx src/components/sections/FooterSection.tsx | grep -v ":0$" | wc -l | xargs test 2 -eq</automated>
  </verify>
  <done>Both HeroSection and FooterSection "Register Now" links point to https://forms.gle/zi6YknjSZosmJEVL9. Old URL (GZ1xhZG68RoPJZhQ6) no longer appears anywhere.</done>
</task>

<task type="auto">
  <name>Task 2: Add registration links to timeline event cards</name>
  <files>src/components/sections/TimelineSection.tsx</files>
  <action>
Add an optional `link` field to the events data array in TimelineSection.tsx for events that have registration URLs. Only these events get links:

- MEETUP #1 (index 0): link = "https://gdg.community.dev/e/mgkk2e/"
- MYHACK OPENING (index 3): link = "https://forms.gle/7C1S7w2gjMVKfdgj9"
- MYHACK CLOSING (index 4): link = "https://forms.gle/7C1S7w2gjMVKfdgj9"

Events that must NOT get links (user explicitly said skip):
- WORKSHOP (index 1): no link (workshop registration not ready)
- MEETUP #2 (index 2): no link (not available)

Update the events array type to include an optional `link?: string` field. Update each event object accordingly.

In the render logic, when `event.link` exists, add a small "Register" link element at the bottom of the event info div (below the description paragraph). Style it as:
- font-mono text-[10px] font-bold uppercase tracking-widest
- Use the same color as the event type badge (use typeHeaderStyles background color as text color, e.g., for meetup use text-[#2196F3], for hackathon use text-[#D32F2F])
- Add "target='_blank' rel='noopener noreferrer'" since links go to external sites
- Text content: "Register →"
- Add mt-1.5 for spacing from the description

When `event.link` does NOT exist, render nothing extra (no placeholder, no "coming soon" text).
  </action>
  <verify>
    <automated>grep -c "gdg.community.dev/e/mgkk2e" src/components/sections/TimelineSection.tsx | xargs test 1 -eq && grep -c "forms.gle/7C1S7w2gjMVKfdgj9" src/components/sections/TimelineSection.tsx | xargs test 1 -le</automated>
  </verify>
  <done>MEETUP #1 card shows "Register" link to gdg.community.dev. MYHACK OPENING and CLOSING cards show "Register" link to MyHack form. WORKSHOP and MEETUP #2 cards have no registration links. All external links open in new tabs.</done>
</task>

</tasks>

<verification>
1. Run `npm run build` to confirm no TypeScript or build errors
2. Grep for old URL to confirm it is fully replaced: `grep -r "GZ1xhZG68RoPJZhQ6" src/` should return nothing
3. Grep for new URLs to confirm they are present:
   - `grep -r "zi6YknjSZosmJEVL9" src/` should show HeroSection and FooterSection
   - `grep -r "mgkk2e" src/` should show TimelineSection
   - `grep -r "7C1S7w2gjMVKfdgj9" src/` should show TimelineSection
4. Grep to confirm skipped links are absent:
   - `grep -r "z3LLqqLzNgx42GWDA" src/` should return nothing (workshop link NOT added)
</verification>

<success_criteria>
- Main CTA "Register Now" in Hero and Footer both link to https://forms.gle/zi6YknjSZosmJEVL9
- MEETUP #1 timeline card has a "Register" link to https://gdg.community.dev/e/mgkk2e/
- MYHACK OPENING and CLOSING timeline cards have "Register" links to https://forms.gle/7C1S7w2gjMVKfdgj9
- WORKSHOP and MEETUP #2 timeline cards have NO registration links
- Workshop form link (z3LLqqLzNgx42GWDA) does NOT appear anywhere in codebase
- Old registration link (GZ1xhZG68RoPJZhQ6) does NOT appear anywhere in codebase
- Build passes with no errors
</success_criteria>

<output>
After completion, create `.planning/quick/260409-frw-update-the-links/260409-frw-SUMMARY.md`
</output>
