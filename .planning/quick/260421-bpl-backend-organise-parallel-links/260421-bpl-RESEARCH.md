# Quick Task 260421-bpl: Research Findings

**Date:** 2026-04-21
**Task:** Organise backend code, add Supabase schema API, parallelise judging, test GitHub/slide link reading

---

## 1. Backend Code Organisation

### What's outside `backend/` folder

| File | Location | Issue |
|------|----------|-------|
| `main.py` | Root | CLI entry point; uses `sys.path` hacks + `from backend.X import X` |
| `supabase_setup.sql` | Root | DB migration file; logically belongs in `backend/` |
| `.venv/` | Root | Stale/duplicate venv — the active one is `backend/.venv` |
| `result.txt` | Root | **Intentional** — DualLogger in both `main.py` and `server.py` writes here |
| `figma_node.json` | Root | Frontend artefact unrelated to backend |

### Import inconsistency inside `backend/`

- `server.py` appends `backend/`, `backend/BusinessAnalysis/`, `backend/AISoftwareEngineer/`, `backend/HeadJudge/` to `sys.path`, then uses `from BusinessAnalysis.BA_main import BA_main`
- `gsheet_processor.py` uses bare imports: `from BA_main import BA_main`, `from utils import ...` — depends on those subdirectory paths being on sys.path from the caller
- `BA_main.py` and `AI_SE_main.py` each append their parent (`backend/`) to sys.path and then use `from utils import ...` (bare)

### What to do

- Move `supabase_setup.sql` → `backend/supabase_setup.sql` (update any references)
- Remove root `.venv/` (stale; `backend/.venv` is the working venv)
- Keep `main.py` at root OR move it into `backend/` — it's the CLI entry point. If moved to `backend/`, the run command changes from `python main.py` to `python backend/main.py` (or `cd backend && python main.py`). **Decision needed from user.**
- Fix `gsheet_processor.py` imports to use the same explicit style as `server.py` so it works regardless of caller context

---

## 2. Auto-create Supabase Schema via API

### The problem
`supabase_setup.sql` contains the DDL but must be manually pasted into the Supabase SQL Editor. No API endpoint exists to run it.

### Supabase Python SDK limitation
`supabase-py` does **not** support raw SQL execution (DDL like `CREATE TABLE`). The `supabase.table()` interface is for DML only.

### Options

| Approach | Complexity | Auth required | Notes |
|----------|------------|---------------|-------|
| Direct Postgres via `psycopg2` | Low | DB password from Supabase dashboard | Most reliable for DDL |
| Supabase Management API | Medium | Service-role JWT | REST call to `/rest/v1/rpc` or management endpoint |
| `pg` stored procedure | High | Supabase service key | Would need to pre-create a `exec_sql` function |

### Recommended approach
Add `SUPABASE_DB_URL` (Postgres connection string: `postgresql://postgres:[password]@[host]:5432/postgres`) to `.env.local` and use `psycopg2` to execute the SQL file.

New endpoint: `POST /setup-db` in `server.py` — reads `supabase_setup.sql`, executes via psycopg2, returns which tables were created.

`psycopg2` is already a transitive dependency of `supabase-py`; just needs to be importable.

---

## 3. Parallelise the Judging Process

### Current sequential flow (per team)

```
BA_main:
  Model1 (API call) → Model2 (API call) → Resonator (API call)
                                    ↓ (serial)
AI_SE_main:
  Model1 (API call) → Model2 (API call) → Resonator (API call)
                                    ↓ (serial)
HeadJudge_main: (pure computation, no API)
                                    ↓
save_evaluation_to_db
```

Total: **6 sequential API calls** per team (each ~5–15 seconds) = 30–90 seconds per team.

### Parallelisation opportunities

**Level 1 — BA and AI SE run concurrently (easy win, ~2x speedup)**

BA and AI SE are fully independent — they take the same `project_content` and produce separate outputs. Run them with `concurrent.futures.ThreadPoolExecutor`:

```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=2) as executor:
    ba_future = executor.submit(BA_main, project_content)
    ai_se_future = executor.submit(AI_SE_main, project_content)
    ba_output = ba_future.result()
    ai_se_output = ai_se_future.result()
```

Reduction: 6 serial calls → 3 serial "rounds" (each round runs 2 calls in parallel).

**Level 2 — Model1 and Model2 within BA/AI SE run concurrently (~additional 1.5x)**

Inside `BA_main` and `AI_SE_main`, Model1 and Model2 evaluate independently. They can be parallelised before the resonator:

```python
with ThreadPoolExecutor(max_workers=2) as executor:
    f1 = executor.submit(run_BAModel1_evaluator, project_content)
    f2 = executor.submit(run_BAModel2_evaluator, project_content)
    report_ba_1 = f1.result()
    report_ba_2 = f2.result()
```

Combined with Level 1: per-team time goes from 6 serial API calls to ~2 parallel rounds (Models 1&2) + 1 resonator round, both agents running at the same time → effectively **3 serial "waits"** instead of 6, with two Gemini calls in each.

**Level 3 — Multiple teams concurrently (risky)**
Possible with a semaphore to limit concurrency, but Gemini API rate limits (RPM/TPM) make this risky for large batches without backoff. Not recommended without rate-limit handling.

### Implementation location

Changes needed in:
- `backend/server.py` → `_run_sheet_eval()`: parallelize BA_main + AI_SE_main per team
- `backend/BusinessAnalysis/BA_main.py` → `BA_main()`: parallelize Model1 + Model2
- `backend/AISoftwareEngineer/AI_SE_main.py` → `AI_SE_main()`: parallelize Model1 + Model2

`concurrent.futures` is stdlib — no new dependencies.

---

## 4. Can the AI Read GitHub and Slide Deck Links?

### Current behaviour

The `_build_project_content` function (in both `gsheet_processor.py` and `server.py`) puts GitHub and documentation URLs as **plain text** into the prompt:

```
- GITHUB/PROTOTYPE LINK: https://github.com/...
- DOCUMENTATION LINK: https://docs.google.com/presentation/d/...
```

The AI judges see the URL string but do not fetch its content. Only `get_public_gdoc_text()` in `utils.py` actually fetches Google Docs content — and it's only used in the single-doc flow (`choice == '1'` in `main.py`), not the batch sheet flow.

### What we can fetch

| Link type | Detection | Fetch method | Reliability |
|-----------|-----------|--------------|-------------|
| GitHub repo | `github.com/{owner}/{repo}` | `GET https://api.github.com/repos/{owner}/{repo}/readme` → base64 decode | High (public repos, no auth needed) |
| Google Slides | `docs.google.com/presentation/d/{id}` | `GET https://docs.google.com/presentation/d/{id}/export/txt` | Medium (works for public slides) |
| Google Docs | `docs.google.com/document/d/{id}` | Already implemented in `get_public_gdoc_text()` | High |
| Generic URL | any | `requests.get(url)` → BeautifulSoup strip HTML | Low (varies by site) |

### Recommended additions to `utils.py`

```python
def get_github_readme(url):
    """Fetches README content from a public GitHub repo URL."""
    # Extract owner/repo from github.com/{owner}/{repo}[/...]
    # Call api.github.com/repos/{owner}/{repo}/readme
    # Decode base64 content

def get_google_slides_text(url):
    """Exports plain text from a public Google Slides presentation."""
    # Extract presentation ID from URL
    # GET .../export/txt — same pattern as Google Docs
```

These functions can then be called in `_build_project_content` to enrich the prompt with actual content from the links, giving judges more signal.

### Caveat
Private repos/slides will fail silently (401/403). The code should try to fetch and fall back gracefully to just the URL if fetching fails.
