import os
import sys
import re
from concurrent.futures import ThreadPoolExecutor

# Ensure backend directory is in path if running from within subfolders
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text
from BA_Model import run_BAModel1_evaluator, run_BAModel2_evaluator, run_BAResonator_Model3

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

def BA_main(project_content):
    print("\n--- Starting BA Dual-Agent Evaluation ---")

    for attempt in range(1, MAX_RETRIES + 1):
        print(f"\n[BA] Attempt {attempt}/{MAX_RETRIES}")

        print("[BA] Model 1 + Model 2 running in parallel...")
        with ThreadPoolExecutor(max_workers=2) as pool:
            f1 = pool.submit(run_BAModel1_evaluator, project_content)
            f2 = pool.submit(run_BAModel2_evaluator, project_content)
            report_ba_1 = f1.result()
            report_ba_2 = f2.result()

        print(f"\nReport from BA Model 1:\n{report_ba_1}...")
        print(f"\nReport from BA Model 2:\n{report_ba_2}...")

        # Extract scores and check discrepancy
        score_1 = _extract_weighted_final(report_ba_1)
        score_2 = _extract_weighted_final(report_ba_2)

        if score_1 is not None and score_2 is not None:
            discrepancy = abs(score_1 - score_2)
            print(f"\n[BA] Score 1: {score_1}, Score 2: {score_2}, Discrepancy: {discrepancy}")
            if discrepancy <= DISCREPANCY_THRESHOLD:
                print(f"[BA] Discrepancy ({discrepancy}) within threshold ({DISCREPANCY_THRESHOLD}). Proceeding to Resonator.")
                break
            else:
                print(f"[BA] Discrepancy ({discrepancy}) exceeds threshold ({DISCREPANCY_THRESHOLD}). {'Retrying...' if attempt < MAX_RETRIES else 'Max retries reached, proceeding anyway.'}")
        else:
            print(f"[BA] Could not extract scores from one or both reports. Proceeding to Resonator.")
            break

    print("\n[BA] Resonator Model 3 Running (Merging Reports)...")
    final_ba_output = run_BAResonator_Model3(project_content, report_ba_1, report_ba_2)
    print("\nFinal BA Output (Resonator Model 3):\n" + final_ba_output)

    return final_ba_output

if __name__ == "__main__":
    # For testing purposes only
    test_doc = "https://docs.google.com/document/d/1y6v.../edit"
    content = get_public_gdoc_text(test_doc)
    BA_main(content)
