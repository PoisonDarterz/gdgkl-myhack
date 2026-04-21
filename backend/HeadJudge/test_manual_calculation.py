import json
import sys
import os

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from HeadJudge.HeadJudge_main import HeadJudge_main

def test_per_category_weights():
    """Tests per-category weighted scoring."""
    print("=" * 60)
    print("  Testing Per-Category Weighted Head Judge Output")
    print("=" * 60)

    # Mock BA output
    ba_output = json.dumps({
        "ba_final_verdict": "FUND",
        "consensus_summary": "Strong market fit.",
        "fact_check_final_verdict": "All claims verified.",
        "conflict_resolved": "None.",
        "scores": {
            "originality_creativity": 8,
            "problem_solution_fit": 9,
            "scalability_profitability": 8,
            "deployment_readiness": 4,
            "google_tech_integration": 7,
            "sdg_relevance": 8,
            "ai_implementation_quality": 8,
            "demo_ui_ux": 8,
            "ai_model_performance": 4
        },
        "total_raw": 64,
        "weighted_final": 82.5,
        "top_3_business_strengths": ["Strong fit"],
        "critical_business_risks": ["High cost"]
    })

    # Mock AI SE output
    ai_se_output = json.dumps({
        "ai_se_final_verdict": "HIRE",
        "consensus_summary": "Clean architecture.",
        "conflict_resolved": "Agreed.",
        "scores": {
            "originality_creativity": 7,
            "problem_solution_fit": 8,
            "scalability_profitability": 7,
            "deployment_readiness": 3,
            "google_tech_integration": 8,
            "sdg_relevance": 7,
            "ai_implementation_quality": 9,
            "demo_ui_ux": 7,
            "ai_model_performance": 3
        },
        "total_raw": 59,
        "weighted_final": 72.5,
        "top_3_ai_engineering_strengths": ["Clean Arch"],
        "critical_ai_engineering_gaps": ["No CI/CD"]
    })

    project_content = "Sample project content."

    result_json = HeadJudge_main(project_content, ba_output, ai_se_output)
    result = json.loads(result_json)

    # --- Manual calculation for verification ---
    # originality_creativity: BA=8, AI SE=7, BA_w=70%, AI_SE_w=30% -> 8*0.7 + 7*0.3 = 5.6 + 2.1 = 7.7
    # problem_solution_fit:   BA=9, AI SE=8, BA_w=70%, AI_SE_w=30% -> 9*0.7 + 8*0.3 = 6.3 + 2.4 = 8.7
    # scalability_profitability: BA=8, AI SE=7, BA_w=70%, AI_SE_w=30% -> 8*0.7 + 7*0.3 = 5.6 + 2.1 = 7.7
    # deployment_readiness:   BA=4, AI SE=3, BA_w=70%, AI_SE_w=30% -> 4*0.7 + 3*0.3 = 2.8 + 0.9 = 3.7
    # google_tech_integration:BA=7, AI SE=8, BA_w=30%, AI_SE_w=70% -> 7*0.3 + 8*0.7 = 2.1 + 5.6 = 7.7
    # sdg_relevance:          BA=8, AI SE=7, BA_w=50%, AI_SE_w=50% -> 8*0.5 + 7*0.5 = 4.0 + 3.5 = 7.5
    # ai_implementation_quality: BA=8, AI SE=9, BA_w=30%, AI_SE_w=70% -> 8*0.3 + 9*0.7 = 2.4 + 6.3 = 8.7
    # demo_ui_ux:             BA=8, AI SE=7, BA_w=30%, AI_SE_w=70% -> 8*0.3 + 7*0.7 = 2.4 + 4.9 = 7.3
    # ai_model_performance:   BA=4, AI SE=3, BA_w=30%, AI_SE_w=70% -> 4*0.3 + 3*0.7 = 1.2 + 2.1 = 3.3
    # Total raw = 7.7 + 8.7 + 7.7 + 3.7 + 7.7 + 7.5 + 8.7 + 7.3 + 3.3 = 62.3
    # Final = (62.3 / 80) * 100 = 77.875 -> rounded to 77.88

    expected_raw = 62.3
    expected_final = 77.88

    assert result["calculation_breakdown"]["total_weighted_raw"] == expected_raw, \
        f"Expected raw {expected_raw}, got {result['calculation_breakdown']['total_weighted_raw']}"
    print(f"\n[PASS] Total weighted raw: {result['calculation_breakdown']['total_weighted_raw']} (expected {expected_raw})")

    assert result["final_weighted_total"] == expected_final, \
        f"Expected final {expected_final}, got {result['final_weighted_total']}"
    print(f"[PASS] Final score: {result['final_weighted_total']} (expected {expected_final})")

    assert result["head_judge_verdict"] == "2nd Class", \
        f"Expected '2nd Class', got '{result['head_judge_verdict']}'"
    print(f"[PASS] Verdict: {result['head_judge_verdict']}")

    # Check per-category dominant judges
    cats = result["per_category_weighted_scores"]
    assert cats["google_tech_integration"]["dominant_judge"] == "AI SE"
    assert cats["problem_solution_fit"]["dominant_judge"] == "BA"
    assert cats["ai_implementation_quality"]["dominant_judge"] == "AI SE"
    assert cats["scalability_profitability"]["dominant_judge"] == "BA"
    print(f"[PASS] Dominant judge assignments correct")

    # Check full evaluations are included
    assert "ba_evaluation" in result
    assert "ai_se_evaluation" in result
    print(f"[PASS] Full BA/AI SE evaluations included")

    print("\n" + "=" * 60)
    print("  ALL TESTS PASSED!")
    print("=" * 60)

    print("\n--- Full JSON Output ---")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    test_per_category_weights()
