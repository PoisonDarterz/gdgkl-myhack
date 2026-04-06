import os
import sys
import json

# Ensure backend directory is in path if running from within subfolders
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils import get_public_gdoc_text

# Per-category weightage: (CEO_weight, CTO_weight)
# "70/30 CTO" means CTO gets 70%, CEO gets 30%
# "70/30 CEO" means CEO gets 70%, CTO gets 30%
CATEGORY_WEIGHTS = {
    # Business-focused (CEO dominant 70/30)
    "originality_creativity": (0.70, 0.30),
    "problem_solution_fit": (0.70, 0.30),
    "scalability_profitability": (0.70, 0.30),
    "deployment_readiness": (0.70, 0.30),
    # Technical-focused (CTO dominant 30/70)
    "google_tech_integration": (0.30, 0.70),
    "ai_implementation_quality": (0.30, 0.70),
    "demo_ui_ux": (0.30, 0.70),
    "ai_model_performance": (0.30, 0.70),
    # Shared / Thematic (50/50 blend)
    "sdg_relevance": (0.50, 0.50),
}

# Max possible score per category (from the judging rubric)
CATEGORY_MAX = {
    "originality_creativity": 10, "problem_solution_fit": 10,
    "scalability_profitability": 10, "deployment_readiness": 5,
    "google_tech_integration": 10, "sdg_relevance": 10,
    "ai_implementation_quality": 10, "demo_ui_ux": 10,
    "ai_model_performance": 5,
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


def HeadJudge_main(project_content, ceo_output, cto_output):
    """
    Orchestrates the Head Judge evaluation using manual calculation.
    Merges all judging criteria from CEO and CTO into a comprehensive JSON report.
    
    Per-category weighting is applied based on which judge has domain expertise:
    - CTO-dominant (70/30): problem_sdg, ai_engineering, ai_innovation, architecture
    - CEO-dominant (70/30): user_validation, implementation, scalability, completeness
    
    Args:
        project_content: The original project submission text.
        ceo_output: The CEO Resonator's final JSON string.
        cto_output: The CTO Resonator's final JSON string.
    
    Returns:
        The final Head Judge verdict as a comprehensive JSON string.
    """
    print("\n" + "=" * 60)
    print("      --- Starting Head Judge Manual Calculation ---")
    print("=" * 60)

    try:
        # Parse CEO and CTO outputs
        ceo_data = json.loads(ceo_output)
        cto_data = json.loads(cto_output)

        # Extract individual category scores
        ceo_scores = ceo_data.get("scores", {})
        cto_scores = cto_data.get("scores", {})

        # --- Per-Category Weighted Calculation ---
        weighted_categories = {}
        total_weighted_raw = 0

        for cat, (ceo_w, cto_w) in CATEGORY_WEIGHTS.items():
            ceo_val = ceo_scores.get(cat, 0)
            cto_val = cto_scores.get(cat, 0)
            weighted_score = round((ceo_val * ceo_w) + (cto_val * cto_w), 2)
            total_weighted_raw += weighted_score

            dominant = "CTO" if cto_w > ceo_w else "CEO"
            weighted_categories[cat] = {
                "ceo_score": ceo_val,
                "cto_score": cto_val,
                "ceo_weight": f"{int(ceo_w * 100)}%",
                "cto_weight": f"{int(cto_w * 100)}%",
                "dominant_judge": dominant,
                "weighted_score": weighted_score,
                "max": CATEGORY_MAX[cat]
            }

        # --- Final Score (normalize to /100) ---
        final_score = round((total_weighted_raw / TOTAL_MAX) * 100, 2)
        verdict = _get_verdict(final_score)

        # Also extract the overall weighted finals for reference
        ceo_weighted_final = ceo_data.get("weighted_final", 0)
        cto_weighted_final = cto_data.get("weighted_final", 0)

        # --- Build Comprehensive JSON Report ---
        final_verdict_data = {
            "head_judge_verdict": verdict,
            "final_weighted_total": final_score,
            "calculation_breakdown": {
                "method": "Per-category weighted scoring",
                "formula": "For each category: (CEO_score * CEO_weight) + (CTO_score * CTO_weight)",
                "final_formula": f"final_score = (total_weighted_raw / {TOTAL_MAX}) * 100",
                "total_weighted_raw": round(total_weighted_raw, 2),
                "total_max": TOTAL_MAX,
            },
            "per_category_weighted_scores": weighted_categories,
            "ceo_evaluation": {
                "verdict": ceo_data.get("ceo_final_verdict", "N/A"),
                "consensus_summary": ceo_data.get("consensus_summary", "N/A"),
                "fact_check": ceo_data.get("fact_check_final_verdict", "N/A"),
                "scores": ceo_scores,
                "total_raw": ceo_data.get("total_raw", 0),
                "weighted_final": ceo_weighted_final,
                "strengths": ceo_data.get("top_3_strategic_strengths", []),
                "risks": ceo_data.get("critical_market_risks", [])
            },
            "cto_evaluation": {
                "verdict": cto_data.get("cto_final_verdict", "N/A"),
                "consensus_summary": cto_data.get("consensus_summary", "N/A"),
                "conflict_resolved": cto_data.get("conflict_resolved", "N/A"),
                "scores": cto_scores,
                "total_raw": cto_data.get("total_raw", 0),
                "weighted_final": cto_weighted_final,
                "strengths": cto_data.get("top_3_strengths", []),
                "vulnerabilities": cto_data.get("critical_vulnerabilities", [])
            },
            "executive_summary": (
                f"Per-category weighted raw total: {total_weighted_raw:.2f}/{TOTAL_MAX}. "
                f"Normalized final score: {final_score}/100, "
                f"resulting in a '{verdict}' verdict."
            )
        }


        final_verdict = json.dumps(final_verdict_data, indent=2)

    except json.JSONDecodeError as e:
        error_msg = f"Error parsing CEO/CTO JSON output: {str(e)}"
        print(error_msg)
        final_verdict = json.dumps({"error": error_msg, "ceo_raw": ceo_output, "cto_raw": cto_output})
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
    print("Head Judge requires CEO and CTO outputs. Run via main.py or specialized test script.")

