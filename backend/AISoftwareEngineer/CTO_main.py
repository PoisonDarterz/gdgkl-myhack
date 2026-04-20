import os
import sys
import re

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text
from CTO_Model import run_CTOModel1_evaluator, run_CTOModel2_evaluator, run_CTOResonator_Model3

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

def CTO_main(project_content):
    print("\n--- Starting CTO Dual-Agent Evaluation ---")

    for attempt in range(1, MAX_RETRIES + 1):
        print(f"\n[CTO] Attempt {attempt}/{MAX_RETRIES}")

        print("\n[CTO Agent A] Evaluating Technicality...")
        report_cto_1 = run_CTOModel1_evaluator(project_content)
        print(f"{report_cto_1}...")

        print("\n[CTO Agent B] Evaluating Innovation...")
        report_cto_2 = run_CTOModel2_evaluator(project_content)
        print(f"{report_cto_2}...")

        # Extract scores and check discrepancy
        score_1 = _extract_weighted_final(report_cto_1)
        score_2 = _extract_weighted_final(report_cto_2)

        if score_1 is not None and score_2 is not None:
            discrepancy = abs(score_1 - score_2)
            print(f"\n[CTO] Score 1: {score_1}, Score 2: {score_2}, Discrepancy: {discrepancy}")
            if discrepancy <= DISCREPANCY_THRESHOLD:
                print(f"[CTO] Discrepancy ({discrepancy}) within threshold ({DISCREPANCY_THRESHOLD}). Proceeding to Resonator.")
                break
            else:
                print(f"[CTO] Discrepancy ({discrepancy}) exceeds threshold ({DISCREPANCY_THRESHOLD}). {'Retrying...' if attempt < MAX_RETRIES else 'Max retries reached, proceeding anyway.'}")
        else:
            print(f"[CTO] Could not extract scores from one or both reports. Proceeding to Resonator.")
            break

    print("\n[CTO Arbiter] Resonating Final Verdict...")
    final_report = run_CTOResonator_Model3(project_content, report_cto_1, report_cto_2)
    print(final_report)

    return final_report

if __name__ == "__main__":
    # For testing purposes only
    test_doc = "https://docs.google.com/document/d/1y6v.../edit" 
    content = get_public_gdoc_text(test_doc)
    CTO_main(content)