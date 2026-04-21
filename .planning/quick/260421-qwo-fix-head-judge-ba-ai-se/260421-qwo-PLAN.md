---
quick_id: 260421-qwo
slug: fix-head-judge-ba-ai-se
description: Fix Head Judge CEO/CTO references to use BA/AI SE naming
date: 2026-04-21
must_haves:
  truths:
    - HeadJudge_main.py uses BA/AI SE naming throughout (variables, JSON keys, comments)
    - JSON output keys renamed: ceo_evaluation→ba_evaluation, cto_evaluation→ai_se_evaluation
    - Per-category dict keys renamed: ceo_score→ba_score, cto_score→ai_se_score, etc.
    - CEO_prompt.py: ceo_final_verdict→ba_final_verdict, variables renamed
    - CTO_prompt.py: cto_final_verdict→ai_se_final_verdict, variables renamed
    - HeadJudge_Prompt.md updated to say BA Judge / AI SE Judge
    - Cascading fixes in main.py, server.py, gsheet_processor.py, db_connector.py
    - Existing key-name bugs fixed (wrong strengths/risks keys in HeadJudge)
  artifacts:
    - backend/HeadJudge/HeadJudge_main.py
    - backend/Prompt/HeadJudge_Prompt.md
    - backend/BusinessAnalysis/CEO_prompt.py
    - backend/AISoftwareEngineer/CTO_prompt.py
    - backend/BusinessAnalysis/CEO_Model.py
    - backend/AISoftwareEngineer/CTO_Model.py
    - backend/main.py
    - backend/server.py
    - backend/gsheet_processor.py
    - backend/db_connector.py
---

# Quick Task 260421-qwo: Fix Head Judge CEO/CTO → BA/AI SE Naming

## Task 1: Update HeadJudge_main.py

Files: backend/HeadJudge/HeadJudge_main.py
Action:
- Rename function params: ceo_output→ba_output, cto_output→ai_se_output
- Rename variables: ceo_data→ba_data, cto_data→ai_se_data, ceo_scores→ba_scores, cto_scores→ai_se_scores
- Rename loop vars: ceo_w→ba_w, cto_w→ai_se_w, ceo_val→ba_val, cto_val→ai_se_val
- Rename weighted final vars: ceo_weighted_final→ba_weighted_final, cto_weighted_final→ai_se_weighted_final
- Update dominant logic: "CTO" if cto_w > ceo_w else "CEO" → "AI SE" if ai_se_w > ba_w else "BA"
- Update per-category dict keys: ceo_score→ba_score, cto_score→ai_se_score, ceo_weight→ba_weight, cto_weight→ai_se_weight
- Update formula string to BA/AI SE
- Update output JSON keys: "ceo_evaluation"→"ba_evaluation", "cto_evaluation"→"ai_se_evaluation"
- Fix existing bugs: wrong dict key reads (top_3_strategic_strengths→top_3_business_strengths, critical_market_risks→critical_business_risks, top_3_strengths→top_3_ai_engineering_strengths, critical_vulnerabilities→critical_ai_engineering_gaps)
- Update error strings and comments

## Task 2: Update prompt files

Files: backend/BusinessAnalysis/CEO_prompt.py, backend/AISoftwareEngineer/CTO_prompt.py
Action:
- CEO_prompt.py: rename variable ceo_system_instruction_1_2→ba_system_instruction_1_2, ceo_system_instruction_3→ba_system_instruction_3; rename JSON key ceo_final_verdict→ba_final_verdict
- CTO_prompt.py: rename variable cto_system_instruction_1_2→ai_se_system_instruction_1_2, cto_system_instruction_3→ai_se_system_instruction_3; rename JSON key cto_final_verdict→ai_se_final_verdict

Files: backend/BusinessAnalysis/CEO_Model.py, backend/AISoftwareEngineer/CTO_Model.py
Action:
- CEO_Model.py: update import and usage to ba_system_instruction_1_2/ba_system_instruction_3
- CTO_Model.py: update import and usage to ai_se_system_instruction_1_2/ai_se_system_instruction_3

## Task 3: Update HeadJudge_Prompt.md

Files: backend/Prompt/HeadJudge_Prompt.md
Action:
- "CEO Judge" → "BA Judge"
- "CTO Judge" → "AI SE Judge"
- "CEO dominant" → "BA dominant"
- "CTO dominant" → "AI SE dominant"
- "CEO-CTO Score Cross-Reference Table" → "BA-AI SE Score Cross-Reference Table"

## Task 4: Update callers (main.py, server.py, gsheet_processor.py, db_connector.py)

Files: backend/main.py, backend/server.py, backend/gsheet_processor.py, backend/db_connector.py
Action:
- main.py: comment "CEO Evaluation"→"BA Evaluation", "CTO Evaluation"→"AI SE Evaluation"; vars ceo_output→ba_output, cto_output→ai_se_output
- server.py: same comment+var renames; CSV headers "CEO Verdict"→"BA Verdict" etc.; local vars ceo_*/cto_* → ba_*/ai_se_*
- gsheet_processor.py: same comment+var renames
- db_connector.py: JSON key reads "ceo_evaluation"→"ba_evaluation", "cto_evaluation"→"ai_se_evaluation"; category dict reads ceo_score→ba_score etc.; agent_type "CEO"→"BA", "CTO"→"AI SE"; local vars
  Note: Do NOT change Supabase table names (ceo_findings/cto_findings) or DB column names (ceo_score/cto_score in category_scores table insert)
