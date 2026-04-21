import os
import sys
import re
from concurrent.futures import ThreadPoolExecutor

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text
from AI_SE_Model import run_AI_SE_Model1_evaluator, run_AI_SE_Model2_evaluator, run_AI_SE_Resonator_Model3

DISCREPANCY_THRESHOLD = 15
MAX_RETRIES = 3

def _extract_weighted_final(report_text):
    """Extracts the WEIGHTED FINAL score from a model's text report using regex."""
    patterns = [
        r'WEIGHTED\s*FINAL[*\s|:]*(\d+(?:\.\d+)?)\s*/?\s*100',
        r'WEIGHTED\s*FINAL[*\s|:]*(\d+(?:\.\d+)?)',
        r'\*\*WEIGHTED\s*FINAL\*\*\s*\|\s*(\d+(?:\.\d+)?)',
    ]
    for pattern in patterns:
        match = re.search(pattern, report_text, re.IGNORECASE)
        if match:
            return float(match.group(1))
    return None

def AI_SE_main(project_content):
    print("\n--- Starting AI SE Dual-Agent Evaluation ---")

    for attempt in range(1, MAX_RETRIES + 1):
        print(f"\n[AI SE] Attempt {attempt}/{MAX_RETRIES}")

        print("\n[AI SE] Agent A (Technicality) + Agent B (Innovation) running in parallel...")
        with ThreadPoolExecutor(max_workers=2) as pool:
            f1 = pool.submit(run_AI_SE_Model1_evaluator, project_content)
            f2 = pool.submit(run_AI_SE_Model2_evaluator, project_content)
            report_ai_se_1 = f1.result()
            report_ai_se_2 = f2.result()

        print(f"{report_ai_se_1}...")
        print(f"{report_ai_se_2}...")

        # Extract scores and check discrepancy
        score_1 = _extract_weighted_final(report_ai_se_1)
        score_2 = _extract_weighted_final(report_ai_se_2)

        if score_1 is not None and score_2 is not None:
            discrepancy = abs(score_1 - score_2)
            print(f"\n[AI SE] Score 1: {score_1}, Score 2: {score_2}, Discrepancy: {discrepancy}")
            if discrepancy <= DISCREPANCY_THRESHOLD:
                print(f"[AI SE] Discrepancy ({discrepancy}) within threshold ({DISCREPANCY_THRESHOLD}). Proceeding to Resonator.")
                break
            else:
                print(f"[AI SE] Discrepancy ({discrepancy}) exceeds threshold ({DISCREPANCY_THRESHOLD}). {'Retrying...' if attempt < MAX_RETRIES else 'Max retries reached, proceeding anyway.'}")
        else:
            print(f"[AI SE] Could not extract scores from one or both reports. Proceeding to Resonator.")
            break

    print("\n[AI SE Arbiter] Resonating Final Verdict...")
    final_report = run_AI_SE_Resonator_Model3(project_content, report_ai_se_1, report_ai_se_2)
    print(final_report)

    return final_report

if __name__ == "__main__":
    # For testing purposes only
    test_doc = "https://docs.google.com/document/d/1y6v.../edit"
    content = get_public_gdoc_text(test_doc)
    AI_SE_main(content)
