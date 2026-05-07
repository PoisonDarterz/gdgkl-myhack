---
slug: 260421-dsh-sidebar-tables-actions
status: complete
completed: 2026-04-21
commit: d3e6c5f
---

# Quick Task: Dashboard — Sidebar, Table Pages, Action Buttons

## What was done

1. **Collapsible sidebar** (`components/dashboard/Sidebar.tsx`) — collapses to icon-only mode, sections for main nav and DB Tables, sticky to left of all dashboard pages.
2. **Dashboard layout restructured** (`app/dashboard/layout.tsx`) — switched from top-nav-only to sidebar + header layout. Removed server-action sign-out in favour of client `SignOutButton`.
3. **SignOutButton** (`components/dashboard/SignOutButton.tsx`) — client component using supabase browser client, usable inside the client sidebar.
4. **Action toolbar on judge page** — Results (link), Download CSV (calls `download-csv` edge fn, triggers file download), Reset DB (calls `reset-db` with confirmation dialog).
5. **Results page** (`app/dashboard/results/page.tsx`) — fetches from `results` edge function, shows expandable eval cards with scores, BA/AI SE breakdown, category scores.
6. **TableViewer component** (`components/dashboard/TableViewer.tsx`) — reusable client component that queries a Supabase table directly, renders paginated rows with search.
7. **6 table pages** under `app/dashboard/tables/`:
   - `evaluations/` — id, project_title, final_score, head_judge_verdict, summary, doc_url
   - `ba-findings/` — evaluation_id, verdict, weighted_final, total_raw, etc.
   - `ai-se-findings/` — evaluation_id, verdict, conflict_resolved, weighted_final, etc.
   - `category-scores/` — evaluation_id, category_name, ba_score, ai_se_score, weighted_score, max_score
   - `qualitative-insights/` — evaluation_id, agent_type, point_type, content
   - `evaluation-jobs/` — running, message, progress, total, completed_teams, error_detail
8. **CORS fix** (`backend_functions/reset-db/index.ts`) — added `apikey, x-client-info` to Access-Control-Allow-Headers so Supabase client calls succeed.

## Files changed
- `backend_functions/reset-db/index.ts` — CORS fix
- `app/dashboard/layout.tsx` — sidebar layout
- `app/dashboard/judge/page.tsx` — action toolbar
- `app/dashboard/results/page.tsx` — new
- `app/dashboard/tables/*/page.tsx` — 6 new
- `components/dashboard/Sidebar.tsx` — new
- `components/dashboard/SignOutButton.tsx` — new
- `components/dashboard/TableViewer.tsx` — new
