import os
import re

files_to_update = [
    r"d:\gdgkl-myhack\backend\BusinessAnalysis\BA_prompt.py",
    r"d:\gdgkl-myhack\backend\AISoftwareEngineer\AI_SE_Model.py",
    r"d:\gdgkl-myhack\backend\Prompt\BA_Judge_Prompt.md",
    r"d:\gdgkl-myhack\backend\Prompt\BA_Reasonate.md",
    r"d:\gdgkl-myhack\backend\Prompt\AI_SE_Judge_Prompt.md",
    r"d:\gdgkl-myhack\backend\Prompt\AI_SE_Reasonate.md"
]

table_pattern = re.compile(r"\| Category \| Score.*?(?=\| \*\*TOTAL\*\*)", re.DOTALL)
new_table = """| Category | Score | Justification (Why is this NOT a 10/10?) |
| :--- | :--- | :--- |
| **Originality & Creativity** | /10 | *Novelty of the approach/differentiator.* |
| **Problem-Solution Fit** | /10 | *Real-world relevance and validation.* |
| **Scalability & Profitability** | /10 | *Viability and resource usage.* |
| **Deployment Readiness** | /5 | *Feasible deployment approach.* |
| **Google Tech Integration** | /10 | *Meaningful use and understanding of Google Tech.* |
| **SDG Relevance** | /10 | *Direct meaningful alignment to UN SDGs.* |
| **AI Implementation Quality** | /10 | *Appropriate model, ethical AI aspects.* |
| **Working Demo & UI/UX** | /10 | *Functional prototype, intuitive UX.* |
| **AI Model Performance** | /5 | *Accuracy and hallucination reduction.* |
"""

json_scores_pattern = re.compile(r"\"scores\": \{(.*?)\}", re.DOTALL)
new_json_scores = """"scores": {
    "originality_creativity": 0,
    "problem_solution_fit": 0,
    "scalability_profitability": 0,
    "deployment_readiness": 0,
    "google_tech_integration": 0,
    "sdg_relevance": 0,
    "ai_implementation_quality": 0,
    "demo_ui_ux": 0,
    "ai_model_performance": 0
  }"""

for fp in files_to_update:
    if os.path.exists(fp):
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content

        content = table_pattern.sub(new_table, content)
        content = json_scores_pattern.sub(new_json_scores, content)

        if content != original_content:
            with open(fp, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {fp}")
        else:
            print(f"No changes made to {fp}")
    else:
        print(f"File not found: {fp}")
