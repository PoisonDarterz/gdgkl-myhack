import os
import sys
import re

# Ensure backend directory is in path if running from within subfolders
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text
from CEO_Model import run_CEOModel1_evaluator, run_CEOModel2_evaluator, run_CEOResonator_Model3

DISCREPANCY_THRESHOLD = 15
MAX_RETRIES = 3

def _extract_weighted_final(report_text):
    """Extracts the WEIGHTED FINAL score from a model's text report using regex."""
    # Look for patterns like "| **WEIGHTED FINAL** | 75/100 |" or "WEIGHTED FINAL: 75"
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

def CEO_main(project_content):
    print("\n--- Starting CEO Dual-Agent Evaluation ---")

    for attempt in range(1, MAX_RETRIES + 1):
        print(f"\n[CEO] Attempt {attempt}/{MAX_RETRIES}")

        print("[CEO] Model 1 Running...")
        report_ceo_1 = run_CEOModel1_evaluator(project_content)
        print(f"\nReport from CEO Model 1:\n{report_ceo_1}...")

        print("\n[CEO] Model 2 Running...")
        report_ceo_2 = run_CEOModel2_evaluator(project_content)
        print(f"\nReport from CEO Model 2:\n{report_ceo_2}...")

        # Extract scores and check discrepancy
        score_1 = _extract_weighted_final(report_ceo_1)
        score_2 = _extract_weighted_final(report_ceo_2)

        if score_1 is not None and score_2 is not None:
            discrepancy = abs(score_1 - score_2)
            print(f"\n[CEO] Score 1: {score_1}, Score 2: {score_2}, Discrepancy: {discrepancy}")
            if discrepancy <= DISCREPANCY_THRESHOLD:
                print(f"[CEO] Discrepancy ({discrepancy}) within threshold ({DISCREPANCY_THRESHOLD}). Proceeding to Resonator.")
                break
            else:
                print(f"[CEO] Discrepancy ({discrepancy}) exceeds threshold ({DISCREPANCY_THRESHOLD}). {'Retrying...' if attempt < MAX_RETRIES else 'Max retries reached, proceeding anyway.'}")
        else:
            print(f"[CEO] Could not extract scores from one or both reports. Proceeding to Resonator.")
            break

    print("\n[CEO] Resonator Model 3 Running (Merging Reports)...")
    final_ceo_output = run_CEOResonator_Model3(project_content, report_ceo_1, report_ceo_2)
    print("\nFinal CEO Output (Resonator Model 3):\n" + final_ceo_output)

    return final_ceo_output

if __name__ == "__main__":
    # For testing purposes only
    test_doc = "https://docs.google.com/document/d/1y6v.../edit" 
    content = get_public_gdoc_text(test_doc)
    CEO_main(content)

