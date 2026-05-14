# Research: quick-kayinleong-006
# Remaining CEO/CTO References in Backend Prompts

**Researched:** 2026-05-14
**Scope:** All backend prompt files — .py, .md, .ts in backend/ and backend_functions/

---

## Summary

Prior tasks 260420-32 and 260421-qwo renamed the old CEO/CTO directories to BusinessAnalysis/AISoftwareEngineer and updated HeadJudge code. However, several prompt CONTENT files in `backend/Prompt/` still contain CEO/CTO persona language in their markdown headings, role descriptions, JSON keys, and section titles. The `backend_functions/_shared/prompts.ts` (the live Supabase edge function equivalent) is already CLEAN — it was written post-rename and uses BA/AI SE language throughout.

**Three files need changes. One file (update_prompts.py) contains dead stale paths — lower priority but should be cleaned. The frontend_db.md and download.md are planning documents — not executable code — with CEO/CTO references; update for consistency.**

**No import chain risks.** The Prompt/ .md files are loaded as strings by the Python scripts. Variable names and JSON keys in Python source (`BA_prompt.py`, `AI_SE_prompt.py`) are already correct. The Supabase database schema (`supabase_setup.sql`) uses `ba_findings` and `ai_se_findings` — no CEO/CTO column names exist.

---

## Files With Remaining CEO/CTO References

### HIGH PRIORITY — Executable prompt files loaded at runtime

#### File 1: `backend/Prompt/BA_Judge_Prompt.md`

This is the prompt loaded for the Business Analysis judge. It still uses CEO persona language throughout.

| Line | Content | Action |
|------|---------|--------|
| 1 | `# KitaHack AI: CEO Judging Agent Prompt (Visionary Market Leader Mode)` | Change title to BA |
| 3 | `**Role:** You are a **Seasoned Tech CEO & Venture Capitalist (General Partner).**` | Change to BA persona |
| 19 | `## 1. The "CEO" Baseline (Pass/Fail)` | Rename section to "BA" Baseline |
| 34 | `*   **CEO Standard:** They identify a specific...` | × 5 occurrences (lines 34, 39, 44, 49, 54) — rename to "BA Standard" |
| 67 | `5. **Detailed Scorecard (CEO Perspective):**` | Rename to "BA Perspective" |

**Count: 9 occurrences across this file.**

**Replacement mapping:**
- `CEO Judging Agent Prompt (Visionary Market Leader Mode)` → `BA Judging Agent Prompt (Business Viability Mode)`
- `Seasoned Tech CEO & Venture Capitalist (General Partner)` → `Senior Business Analyst & Requirements Expert`
- `The "CEO" Baseline` → `The "Business Analysis" Baseline`
- `CEO Standard:` (all 5) → `BA Standard:`
- `Detailed Scorecard (CEO Perspective):` → `Detailed Scorecard (Business Analysis Perspective):`

Note: The body content (evaluation framework phases, disqualifiers) is already good — it was partially updated. Only the labels/headers still say CEO.

---

#### File 2: `backend/Prompt/BA_Reasonate.md`

Resonator prompt for the BA judge — still titled "CEO RESONATOR" with CEO language in body and JSON key.

| Line | Content | Action |
|------|---------|--------|
| 1 | `# CEO RESONATOR: The Final Strategic Arbiter` | Rename to BA RESONATOR |
| 4 | `from your junior CEO agents.` | → `from your junior Business Analyst agents.` |
| 10 | `for the CEO persona.` | → `for the Business Analysis persona.` |
| 22 | `You must output a final CEO Judge Marks in this way.` | → `...final Business Analysis Judge Marks...` |
| 40 | `"ceo_final_verdict": "FUND | ACQUIRE | WATCH | PASS",` | This JSON key is a RISK — see Import Risk section |

**Count: 5 occurrences across this file.**

---

#### File 3: `backend/Prompt/AI_SE_Reasonate.md`

Resonator prompt for the AI SE judge — still titled "CTO RESONATOR" with CTO language in body and JSON key.

| Line | Content | Action |
|------|---------|--------|
| 1 | `# CTO RESONATOR: The Final Technical Arbiter` | Rename to AI SE RESONATOR |
| 4 | `from your junior CTO agents.` | → `from your junior AI Software Engineer agents.` |
| 10 | `for the CTO persona.` | → `for the AI Software Engineer persona.` |
| 21 | `You must output a final CTO Judge Marks in this way.` | → `...final AI Software Engineer Judge Marks...` |
| 39 | `"cto_final_verdict": "FUND | HIRE | REJECT",` | This JSON key is a RISK — see Import Risk section |

**Count: 5 occurrences across this file.**

---

#### File 4: `backend/Prompt/AI_SE_Judge_Prompt.md`

The judge prompt for AI SE — line 1 and 3 still say CTO.

| Line | Content | Action |
|------|---------|--------|
| 1 | `# KitaHack AI: CTO Judging Agent Prompt (Elite Industry Standard Mode)` | Rename |
| 3 | `**Role:** You are a **Ruthless Chief Technology Officer (CTO) & Venture Capital Technical Auditor.**` | Replace with AI SE persona |

**Count: 2 occurrences.**

**Replacement mapping:**
- `CTO Judging Agent Prompt (Elite Industry Standard Mode)` → `AI SE Judging Agent Prompt (AI Engineering Standard Mode)`
- `Ruthless Chief Technology Officer (CTO) & Venture Capital Technical Auditor` → `Senior AI Software Engineer & ML Systems Architect`

Note: The rest of this file (evaluation framework from line 10 onward) was already updated to AI Engineering language.

---

#### File 5: `backend/Prompt/HeadJudge_Reasonate.md`

The HeadJudge resonator still references CEO/CTO in its input description and JSON output template.

| Line | Content | Action |
|------|---------|--------|
| 4 | `You receive the original submission, CEO/CTO resonated outputs, and two independent Head Judge evaluations.` | → `BA/AI SE resonated outputs` |
| 9 | `Discard claims not grounded in CEO/CTO JSONs or the submission.` | → `BA/AI SE JSONs` |
| 33 | `"ceo_evaluation": {},` | JSON key — RISK (see below) |
| 34 | `"cto_evaluation": {},` | JSON key — RISK (see below) |

**Count: 4 occurrences.**

---

### MEDIUM PRIORITY — Dead-code script (not executed at runtime)

#### File 6: `backend/update_prompts.py`

This script contains Windows-style absolute paths pointing to the old CEO/ and CTO/ directories that no longer exist. The script does not run as part of any import chain — it is a standalone utility. Since the target paths do not exist, running it would produce "File not found" for all entries.

| Lines | Content | Action |
|-------|---------|--------|
| 5 | `r"d:\gdgkl-myhack\backend\CEO\CEO_prompt.py"` | Update to new path or delete |
| 6 | `r"d:\gdgkl-myhack\backend\CTO\CTO_Model.py"` | Update to new path or delete |
| 7 | `r"d:\gdgkl-myhack\backend\Prompt\CEO_Judge_Prompt.md"` | Update to BA_Judge_Prompt.md |
| 8 | `r"d:\gdgkl-myhack\backend\Prompt\CEO_Reasonate.md"` | Update to BA_Reasonate.md |
| 9 | `r"d:\gdgkl-myhack\backend\Prompt\CTO_Judge_Prompt.md"` | Update to AI_SE_Judge_Prompt.md |
| 10 | `r"d:\gdgkl-myhack\backend\Prompt\CTO_Reasonate.md"` | Update to AI_SE_Reasonate.md |

**Recommendation:** Update the file list to the new paths. The script logic itself (table_pattern, json_scores_pattern) is still useful.

---

### LOW PRIORITY — Planning/design documents (not loaded by code)

#### File 7: `backend/Prompt/frontend_db.md`

A planning doc. Not loaded by any Python or TypeScript code. Contains 8 CEO/CTO references (lines 10, 12, 13, 15, 41, 42):
- `save_to_supabase(ceo_json, cto_json, ...)` — function signature in spec
- `CEO Findings`, `CTO Findings` — spec table sections
- `CEO Score`, `CTO Score` — dashboard column names in spec

These are planning artifacts. Update for consistency so the doc matches the implemented naming.

#### File 8: `backend/Prompt/download.md`

A planning doc. Not loaded by code. Contains 10 CEO/CTO references (lines 14, 18, 19, 64-72):
- `ceo_findings`, `cto_findings` table names in spec — note: the actual DB tables are `ba_findings` and `ai_se_findings`
- `CEO Verdict`, `CTO Verdict`, `CEO Weighted Score`, etc. as CSV column headers in spec

Update so spec matches the actual implemented table names (ba_findings, ai_se_findings).

---

## Import Chain / Dependency Risk Assessment

### JSON key risk for BA_Reasonate.md line 40: `"ceo_final_verdict"`

The BA resonator prompt instructs the Gemini model to output JSON with key `ceo_final_verdict`. This key is consumed by:

- `backend/BusinessAnalysis/BA_main.py` — calls `ba_data.get("ba_final_verdict", "N/A")` [VERIFIED: read file]
- `backend_functions/_shared/headJudge.ts` — calls `baData.ba_final_verdict` [VERIFIED: read file]
- `backend_functions/_shared/prompts.ts` (BA_SYSTEM_3) — already outputs `ba_final_verdict` [VERIFIED: read file]

**The Python code and TypeScript edge functions already expect `ba_final_verdict` — NOT `ceo_final_verdict`.** The old `backend/Prompt/BA_Reasonate.md` is MISMATCHED with the actual code. Changing `ceo_final_verdict` → `ba_final_verdict` in the .md file FIXES the bug (brings prompt into alignment with what the code expects).

### JSON key risk for AI_SE_Reasonate.md line 39: `"cto_final_verdict"`

Same situation. The Python code (`AI_SE_main.py`) and TypeScript (`headJudge.ts`) already expect `ai_se_final_verdict`. The old .md file still says `cto_final_verdict`. Changing it FIXES the mismatch.

### JSON key risk for HeadJudge_Reasonate.md lines 33-34: `"ceo_evaluation"` / `"cto_evaluation"`

The HeadJudge_Reasonate.md is a prompt template. The actual Python `HeadJudge_main.py` builds the JSON output itself (it does not ask the LLM to produce it — it uses manual calculation). So this .md file is a legacy/reference artifact. Check whether `HeadJudge_Prompt.md` still uses `HeadJudge_Reasonate.md` directly. Based on reading `HeadJudge_Prompt.md`, it no longer references an LLM resonator — the calculation is done by code. These keys in `HeadJudge_Reasonate.md` are therefore STALE with no runtime impact.

**Conclusion: Changing the JSON keys in BA_Reasonate.md and AI_SE_Reasonate.md from ceo_/cto_ to ba_/ai_se_ is SAFE and actually fixes a bug. No downstream breakage risk.**

---

## Files Confirmed CLEAN (no CEO/CTO references)

| File | Status |
|------|--------|
| `backend/BusinessAnalysis/BA_prompt.py` | Clean — already uses BA persona |
| `backend/AISoftwareEngineer/AI_SE_prompt.py` | Clean — already uses AI SE persona |
| `backend/HeadJudge/HeadJudge_main.py` | Clean — uses BA/AI SE throughout |
| `backend/HeadJudge/test_manual_calculation.py` | Clean |
| `backend/main.py` | Clean |
| `backend/server.py` | Clean |
| `backend/gsheet_processor.py` | Clean |
| `backend/db_connector.py` | Clean |
| `backend/supabase_setup.sql` | Clean — uses ba_findings, ai_se_findings |
| `backend_functions/_shared/prompts.ts` | Clean — uses BA/AI SE throughout |
| `backend_functions/_shared/headJudge.ts` | Clean |
| `backend_functions/judge/index.ts` | Clean |
| `backend_functions/results/index.ts` | Clean |
| `backend_functions/download-csv/index.ts` | Clean |
| `backend_functions/setup-db/index.ts` | Clean |
| `frontend/` (entire directory) | Clean — no CEO/CTO references |

---

## Scope Summary

| Priority | Files | Occurrences | Risk |
|----------|-------|-------------|------|
| High — prompt text fixes | BA_Judge_Prompt.md, AI_SE_Judge_Prompt.md | 11 | AI model uses wrong persona |
| High — JSON key bug fixes | BA_Reasonate.md, AI_SE_Reasonate.md | 4 JSON keys + 6 text labels | JSON keys mismatch what code parses |
| High — HeadJudge ref update | HeadJudge_Reasonate.md | 4 | Misleading; stale artifact |
| Medium — dead script | update_prompts.py | 6 path strings | Script breaks on run |
| Low — planning docs | frontend_db.md, download.md | 18 | Docs inconsistent with implementation |

**Total: 7 files, ~49 occurrences.**

---

## Recommended Changes Per File (Exact)

### BA_Judge_Prompt.md
1. Line 1: `CEO Judging Agent Prompt (Visionary Market Leader Mode)` → `BA Judging Agent Prompt (Business Viability Mode)`
2. Line 3: `Seasoned Tech CEO & Venture Capitalist (General Partner)` → `Senior Business Analyst & Requirements Expert`
3. Line 19: `The "CEO" Baseline (Pass/Fail)` → `The "Business Analysis" Baseline (Pass/Fail)`
4. Lines 34, 39, 44, 49, 54: `CEO Standard:` → `BA Standard:`
5. Line 67: `Detailed Scorecard (CEO Perspective):` → `Detailed Scorecard (Business Analysis Perspective):`

### BA_Reasonate.md
1. Line 1: `# CEO RESONATOR:` → `# BA RESONATOR:`
2. Line 4: `junior CEO agents` → `junior Business Analyst agents`
3. Line 10: `for the CEO persona` → `for the Business Analysis persona`
4. Line 22: `final CEO Judge Marks` → `final Business Analysis Judge Marks`
5. Line 40: `"ceo_final_verdict"` → `"ba_final_verdict"` (BUG FIX — aligns with code)

### AI_SE_Reasonate.md
1. Line 1: `# CTO RESONATOR:` → `# AI SE RESONATOR:`
2. Line 4: `junior CTO agents` → `junior AI Software Engineer agents`
3. Line 10: `for the CTO persona` → `for the AI Software Engineer persona`
4. Line 21: `final CTO Judge Marks` → `final AI Software Engineer Judge Marks`
5. Line 39: `"cto_final_verdict"` → `"ai_se_final_verdict"` (BUG FIX — aligns with code)

### AI_SE_Judge_Prompt.md
1. Line 1: `CTO Judging Agent Prompt (Elite Industry Standard Mode)` → `AI SE Judging Agent Prompt (AI Engineering Standard Mode)`
2. Line 3: `Ruthless Chief Technology Officer (CTO) & Venture Capital Technical Auditor` → `Senior AI Software Engineer & ML Systems Architect`

### HeadJudge_Reasonate.md
1. Line 4: `CEO/CTO resonated outputs` → `BA/AI SE resonated outputs`
2. Line 9: `CEO/CTO JSONs` → `BA/AI SE JSONs`
3. Line 33: `"ceo_evaluation": {}` → `"ba_evaluation": {}`
4. Line 34: `"cto_evaluation": {}` → `"ai_se_evaluation": {}`

### update_prompts.py
Update `files_to_update` list paths to reflect current file names:
- `CEO\CEO_prompt.py` → `BusinessAnalysis\BA_prompt.py`
- `CTO\CTO_Model.py` → `AISoftwareEngineer\AI_SE_Model.py`
- `Prompt\CEO_Judge_Prompt.md` → `Prompt\BA_Judge_Prompt.md`
- `Prompt\CEO_Reasonate.md` → `Prompt\BA_Reasonate.md`
- `Prompt\CTO_Judge_Prompt.md` → `Prompt\AI_SE_Judge_Prompt.md`
- `Prompt\CTO_Reasonate.md` → `Prompt\AI_SE_Reasonate.md`

### frontend_db.md and download.md
Update all CEO/CTO references to BA/AI SE equivalents (18 occurrences total). Table names `ceo_findings`/`cto_findings` in the planning docs should be corrected to `ba_findings`/`ai_se_findings` which is what was actually implemented.
