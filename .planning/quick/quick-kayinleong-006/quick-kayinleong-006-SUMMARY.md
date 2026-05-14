---
quick_id: quick-kayinleong-006
slug: replace-ceo-cto-with-ba-ai-se-in-backend-prompts
status: complete
date: 2026-05-14
---

# Quick Task quick-kayinleong-006: Replace CEO/CTO with BA/AI SE in Backend Prompt Files

## What Changed

Audited all backend prompt files for remaining CEO/CTO persona references. Found and fixed 8 files spanning 49 occurrences. Two of the fixes also resolved a latent JSON key parsing bug.

### Files Modified

- **`backend/Prompt/BA_Judge_Prompt.md`** — Title, role description, baseline section header, 5× "CEO Standard" labels, scorecard label → BA equivalents (9 occurrences)
- **`backend/Prompt/BA_Reasonate.md`** — Title, agent references, persona reference, output label, and `ceo_final_verdict` → `ba_final_verdict` JSON key (5 occurrences; JSON key is a bug fix)
- **`backend/Prompt/AI_SE_Reasonate.md`** — Title, agent references, persona reference, output label, and `cto_final_verdict` → `ai_se_final_verdict` JSON key (5 occurrences; JSON key is a bug fix)
- **`backend/Prompt/AI_SE_Judge_Prompt.md`** — Title and role line (2 occurrences)
- **`backend/Prompt/HeadJudge_Reasonate.md`** — 2× CEO/CTO text refs, `ceo_evaluation`/`cto_evaluation` JSON keys → `ba_evaluation`/`ai_se_evaluation` (4 occurrences)
- **`backend/update_prompts.py`** — `files_to_update` list paths updated from old CEO/CTO directories to BusinessAnalysis/AISoftwareEngineer (6 path strings)
- **`backend/Prompt/frontend_db.md`** — Planning doc updated: function signature, BA/AI SE Findings labels, dashboard column names (5 occurrences)
- **`backend/Prompt/download.md`** — Planning doc updated: table names `ceo_findings`/`cto_findings` → `ba_findings`/`ai_se_findings`, CSV column headers (10 occurrences)

### Bug Fixes (Bonus)

`BA_Reasonate.md` and `AI_SE_Reasonate.md` were instructing the LLM to output JSON keys `ceo_final_verdict` / `cto_final_verdict`, but `BA_main.py` and `headJudge.ts` were already reading `ba_final_verdict` / `ai_se_final_verdict`. This silent mismatch would cause those fields to always return default/null values. Now corrected.

## Verification

- Post-change grep: `grep -rn -i "\bceo\b\|\bcto\b" backend/ backend_functions/` → zero results
- Import chain confirmed safe: BA_main.py and AI_SE_main.py import from BA_prompt.py/AI_SE_prompt.py (Python files), not from the .md files — no import chain risk
- DB schema (supabase_setup.sql) uses `ba_findings`/`ai_se_findings` — no column renames needed
- backend_functions/ TypeScript files already clean (confirmed by research agent)
- No secrets introduced; no test fixtures affected
