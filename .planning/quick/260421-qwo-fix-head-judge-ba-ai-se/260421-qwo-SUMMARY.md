---
quick_id: 260421-qwo
slug: fix-head-judge-ba-ai-se
status: complete
date: 2026-04-21
---

# Quick Task 260421-qwo: Fix Head Judge CEO/CTO → BA/AI SE Naming

## What Changed

Renamed all CEO/CTO references across the Head Judge and related backend files to use BA (Business Analysis) and AI SE (AI Software Engineer) naming, consistent with the directory rename done in quick-32.

### Files Modified

- **`HeadJudge/HeadJudge_main.py`** — Function signature, variable names, CATEGORY_WEIGHTS comments, dominant judge strings, JSON output keys (`ceo_evaluation`→`ba_evaluation`, `cto_evaluation`→`ai_se_evaluation`), formula string, error messages. Also fixed pre-existing key-name bugs (wrong strengths/risks field names that would have returned empty lists).
- **`HeadJudge/test_manual_calculation.py`** — Mock data keys, function call args, assertion strings.
- **`BusinessAnalysis/CEO_prompt.py`** — Variable names (`ceo_system_instruction_*`→`ba_system_instruction_*`), JSON output key `ceo_final_verdict`→`ba_final_verdict`.
- **`AISoftwareEngineer/CTO_prompt.py`** — Variable names (`cto_system_instruction_*`→`ai_se_system_instruction_*`), JSON output key `cto_final_verdict`→`ai_se_final_verdict`.
- **`BusinessAnalysis/CEO_Model.py`** — Import and usage of renamed prompt variables.
- **`AISoftwareEngineer/CTO_Model.py`** — Import and usage of renamed prompt variables.
- **`Prompt/HeadJudge_Prompt.md`** — Judge names (CEO Judge→BA Judge, CTO Judge→AI SE Judge), weight labels, cross-reference table title.
- **`main.py`**, **`server.py`**, **`gsheet_processor.py`** — Phase comments and local variable names.
- **`db_connector.py`** — JSON key reads (`ceo_evaluation`→`ba_evaluation`, `cto_evaluation`→`ai_se_evaluation`), per-category score dict reads, agent_type values (`"CEO"`→`"BA"`, `"CTO"`→`"AI SE"`). DB table/column names left unchanged.

## Bugs Fixed (Bonus)

The original HeadJudge was reading wrong JSON keys for strengths/risks from the agent outputs (e.g. `top_3_strategic_strengths` which never existed — actual key was `top_3_business_strengths`). These are now corrected, so the fields will no longer silently return empty lists.
