import os
import sys
import json

# Ensure backend directory is in path if running from within subfolders
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text

# Per-category weightage: (BA_weight, AI_SE_weight)
# "70/30 AI SE" means AI SE gets 70%, BA gets 30%
# "70/30 BA" means BA gets 70%, AI SE gets 30%
CATEGORY_WEIGHTS = {
    # Technical Implementation and Architecture — AI SE dominant (30/70)
    "google_tech_integration":   (0.30, 0.70),
    "ai_implementation_quality": (0.30, 0.70),
    "demo_ui_ux":                (0.30, 0.70),
    "ai_model_performance":      (0.30, 0.70),
    # Business Innovation and Problem Solving — BA dominant (70/30)
    "originality_creativity":    (0.70, 0.30),
    "problem_solution_fit":      (0.70, 0.30),
    "scalability":               (0.70, 0.30),
    "deployment_readiness":      (0.70, 0.30),
}

# Max possible score per category (from the judging rubric)
CATEGORY_MAX = {
    "google_tech_integration":   15,
    "ai_implementation_quality": 10,
    "demo_ui_ux":                10,
    "ai_model_performance":       5,
    "originality_creativity":    10,
    "problem_solution_fit":      15,
    "scalability":               10,
    "deployment_readiness":       5,
}
TOTAL_MAX = sum(CATEGORY_MAX.values())  # 80


def _get_verdict(final_score):
    """Maps a final score to a verdict label."""
    if final_score >= 85:
        return "First Class"
    elif final_score >= 70:
        return "2nd Class"
    elif final_score >= 50:
        return "HONORABLE_MENTION"
    else:
        return "ELIMINATED"


def HeadJudge_main(project_content, ba_output, ai_se_output):
    """
    Orchestrates the Head Judge evaluation using manual calculation.
    Merges all judging criteria from BA and AI SE into a comprehensive JSON report.

    Per-category weighting is applied based on which judge has domain expertise:
    - AI SE-dominant (30/70): google_tech_integration, ai_implementation_quality, demo_ui_ux, ai_model_performance
    - BA-dominant (70/30): originality_creativity, problem_solution_fit, scalability, deployment_readiness

    Args:
        project_content: The original project submission text.
        ba_output: The Business Analysis Resonator's final JSON string.
        ai_se_output: The AI Software Engineer Resonator's final JSON string.

    Returns:
        The final Head Judge verdict as a comprehensive JSON string.
    """
    print("\n" + "=" * 60)
    print("      --- Starting Head Judge Manual Calculation ---")
    print("=" * 60)

    try:
        # Parse BA and AI SE outputs
        ba_data = json.loads(ba_output)
        ai_se_data = json.loads(ai_se_output)

        # Extract individual category scores
        ba_scores = ba_data.get("scores", {})
        ai_se_scores = ai_se_data.get("scores", {})

        # --- Per-Category Weighted Calculation ---
        weighted_categories = {}
        total_weighted_raw = 0

        for cat, (ba_w, ai_se_w) in CATEGORY_WEIGHTS.items():
            ba_val = ba_scores.get(cat, 0)
            ai_se_val = ai_se_scores.get(cat, 0)
            weighted_score = round((ba_val * ba_w) + (ai_se_val * ai_se_w), 2)
            total_weighted_raw += weighted_score

            dominant = "AI SE" if ai_se_w > ba_w else "BA"
            weighted_categories[cat] = {
                "ba_score": ba_val,
                "ai_se_score": ai_se_val,
                "ba_weight": f"{int(ba_w * 100)}%",
                "ai_se_weight": f"{int(ai_se_w * 100)}%",
                "dominant_judge": dominant,
                "weighted_score": weighted_score,
                "max": CATEGORY_MAX[cat]
            }

        # --- Final Score (normalize to /100) ---
        final_score = round((total_weighted_raw / TOTAL_MAX) * 100, 2)
        verdict = _get_verdict(final_score)

        # Also extract the overall weighted finals for reference
        ba_weighted_final = ba_data.get("weighted_final", 0)
        ai_se_weighted_final = ai_se_data.get("weighted_final", 0)

        # --- Build Comprehensive JSON Report ---
        final_verdict_data = {
            "head_judge_verdict": verdict,
            "final_weighted_total": final_score,
            "calculation_breakdown": {
                "method": "Per-category weighted scoring",
                "formula": "For each category: (BA_score * BA_weight) + (AI_SE_score * AI_SE_weight)",
                "final_formula": f"final_score = (total_weighted_raw / {TOTAL_MAX}) * 100",
                "total_weighted_raw": round(total_weighted_raw, 2),
                "total_max": TOTAL_MAX,
            },
            "per_category_weighted_scores": weighted_categories,
            "ba_evaluation": {
                "verdict": ba_data.get("ba_final_verdict", "N/A"),
                "consensus_summary": ba_data.get("consensus_summary", "N/A"),
                "fact_check": ba_data.get("fact_check_final_verdict", "N/A"),
                "scores": ba_scores,
                "total_raw": ba_data.get("total_raw", 0),
                "weighted_final": ba_weighted_final,
                "strengths": ba_data.get("top_3_business_strengths", []),
                "risks": ba_data.get("critical_business_risks", [])
            },
            "ai_se_evaluation": {
                "verdict": ai_se_data.get("ai_se_final_verdict", "N/A"),
                "consensus_summary": ai_se_data.get("consensus_summary", "N/A"),
                "conflict_resolved": ai_se_data.get("conflict_resolved", "N/A"),
                "scores": ai_se_scores,
                "total_raw": ai_se_data.get("total_raw", 0),
                "weighted_final": ai_se_weighted_final,
                "strengths": ai_se_data.get("top_3_ai_engineering_strengths", []),
                "vulnerabilities": ai_se_data.get("critical_ai_engineering_gaps", [])
            },
            "executive_summary": (
                f"Per-category weighted raw total: {total_weighted_raw:.2f}/{TOTAL_MAX}. "
                f"Normalized final score: {final_score}/100, "
                f"resulting in a '{verdict}' verdict."
            )
        }


        final_verdict = json.dumps(final_verdict_data, indent=2)

    except json.JSONDecodeError as e:
        error_msg = f"Error parsing BA/AI SE JSON output: {str(e)}"
        print(error_msg)
        final_verdict = json.dumps({"error": error_msg, "ba_raw": ba_output, "ai_se_raw": ai_se_output})
    except Exception as e:
        error_msg = f"Error in HeadJudge manual calculation: {str(e)}"
        print(error_msg)
        final_verdict = json.dumps({"error": error_msg})

    print("\n" + "=" * 60)
    print("      --- HEAD JUDGE FINAL VERDICT ---")
    print("=" * 60)
    print(final_verdict)

    return final_verdict


if __name__ == "__main__":
    # For testing purposes only
    print("Head Judge requires BA and AI SE outputs. Run via main.py or specialized test script.")

