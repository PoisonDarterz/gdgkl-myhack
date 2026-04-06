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

    # Mock CEO output
    ceo_output = json.dumps({
        "ceo_final_verdict": "FUND",
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
        "top_3_strategic_strengths": ["Strong fit"],
        "critical_market_risks": ["High cost"]
    })

    # Mock CTO output
    cto_output = json.dumps({
        "cto_final_verdict": "HIRE",
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
        "top_3_strengths": ["Clean Arch"],
        "critical_vulnerabilities": ["No CI/CD"]
    })

    project_content = "Sample project content."

    result_json = HeadJudge_main(project_content, ceo_output, cto_output)
    result = json.loads(result_json)

    # --- Manual calculation for verification ---
    # originality_creativity: CEO=8, CTO=7, CEO_w=70%, CTO_w=30% -> 8*0.7 + 7*0.3 = 5.6 + 2.1 = 7.7
    # problem_solution_fit:   CEO=9, CTO=8, CEO_w=70%, CTO_w=30% -> 9*0.7 + 8*0.3 = 6.3 + 2.4 = 8.7
    # scalability_profitability: CEO=8, CTO=7, CEO_w=70%, CTO_w=30% -> 8*0.7 + 7*0.3 = 5.6 + 2.1 = 7.7
    # deployment_readiness:   CEO=4, CTO=3, CEO_w=70%, CTO_w=30% -> 4*0.7 + 3*0.3 = 2.8 + 0.9 = 3.7
    # google_tech_integration:CEO=7, CTO=8, CEO_w=30%, CTO_w=70% -> 7*0.3 + 8*0.7 = 2.1 + 5.6 = 7.7
    # sdg_relevance:          CEO=8, CTO=7, CEO_w=50%, CTO_w=50% -> 8*0.5 + 7*0.5 = 4.0 + 3.5 = 7.5
    # ai_implementation_quality: CEO=8, CTO=9, CEO_w=30%, CTO_w=70% -> 8*0.3 + 9*0.7 = 2.4 + 6.3 = 8.7
    # demo_ui_ux:             CEO=8, CTO=7, CEO_w=30%, CTO_w=70% -> 8*0.3 + 7*0.7 = 2.4 + 4.9 = 7.3
    # ai_model_performance:   CEO=4, CTO=3, CEO_w=30%, CTO_w=70% -> 4*0.3 + 3*0.7 = 1.2 + 2.1 = 3.3
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
    assert cats["google_tech_integration"]["dominant_judge"] == "CTO"
    assert cats["problem_solution_fit"]["dominant_judge"] == "CEO"
    assert cats["ai_implementation_quality"]["dominant_judge"] == "CTO"
    assert cats["scalability_profitability"]["dominant_judge"] == "CEO"
    print(f"[PASS] Dominant judge assignments correct")

    # Check full evaluations are included
    assert "ceo_evaluation" in result
    assert "cto_evaluation" in result
    print(f"[PASS] Full CEO/CTO evaluations included")

    print("\n" + "=" * 60)
    print("  ALL TESTS PASSED!")
    print("=" * 60)

    print("\n--- Full JSON Output ---")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    test_per_category_weights()
