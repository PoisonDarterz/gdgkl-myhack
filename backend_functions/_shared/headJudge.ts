// Per-category weightage: [BA_weight, AI_SE_weight]
const CATEGORY_WEIGHTS: Record<string, [number, number]> = {
  originality_creativity:    [0.70, 0.30],
  problem_solution_fit:      [0.70, 0.30],
  scalability_profitability: [0.70, 0.30],
  deployment_readiness:      [0.70, 0.30],
  google_tech_integration:   [0.30, 0.70],
  ai_implementation_quality: [0.30, 0.70],
  demo_ui_ux:                [0.30, 0.70],
  ai_model_performance:      [0.30, 0.70],
  sdg_relevance:             [0.50, 0.50],
}

const CATEGORY_MAX: Record<string, number> = {
  originality_creativity:    10,
  problem_solution_fit:      10,
  scalability_profitability: 10,
  deployment_readiness:       5,
  google_tech_integration:   10,
  sdg_relevance:             10,
  ai_implementation_quality: 10,
  demo_ui_ux:                10,
  ai_model_performance:       5,
}

const TOTAL_MAX = Object.values(CATEGORY_MAX).reduce((a, b) => a + b, 0) // 80

function getVerdict(finalScore: number): string {
  if (finalScore >= 85) return 'First Class'
  if (finalScore >= 70) return '2nd Class'
  if (finalScore >= 50) return 'HONORABLE_MENTION'
  return 'ELIMINATED'
}

export function headJudgeMain(
  baOutputJson: string,
  aiSeOutputJson: string
): string {
  try {
    const baData = JSON.parse(baOutputJson)
    const aiSeData = JSON.parse(aiSeOutputJson)

    const baScores: Record<string, number> = baData.scores ?? {}
    const aiSeScores: Record<string, number> = aiSeData.scores ?? {}

    const weightedCategories: Record<string, unknown> = {}
    let totalWeightedRaw = 0

    for (const [cat, [baW, aiSeW]] of Object.entries(CATEGORY_WEIGHTS)) {
      const baVal = baScores[cat] ?? 0
      const aiSeVal = aiSeScores[cat] ?? 0
      const weightedScore = Math.round((baVal * baW + aiSeVal * aiSeW) * 100) / 100
      totalWeightedRaw += weightedScore

      weightedCategories[cat] = {
        ba_score: baVal,
        ai_se_score: aiSeVal,
        ba_weight: `${Math.round(baW * 100)}%`,
        ai_se_weight: `${Math.round(aiSeW * 100)}%`,
        dominant_judge: aiSeW > baW ? 'AI SE' : 'BA',
        weighted_score: weightedScore,
        max: CATEGORY_MAX[cat],
      }
    }

    const finalScore = Math.round((totalWeightedRaw / TOTAL_MAX) * 100 * 100) / 100
    const verdict = getVerdict(finalScore)

    const result = {
      head_judge_verdict: verdict,
      final_weighted_total: finalScore,
      calculation_breakdown: {
        method: 'Per-category weighted scoring',
        formula: 'For each category: (BA_score * BA_weight) + (AI_SE_score * AI_SE_weight)',
        final_formula: `final_score = (total_weighted_raw / ${TOTAL_MAX}) * 100`,
        total_weighted_raw: Math.round(totalWeightedRaw * 100) / 100,
        total_max: TOTAL_MAX,
      },
      per_category_weighted_scores: weightedCategories,
      ba_evaluation: {
        verdict: baData.ba_final_verdict ?? 'N/A',
        consensus_summary: baData.consensus_summary ?? 'N/A',
        fact_check: baData.fact_check_final_verdict ?? 'N/A',
        scores: baScores,
        total_raw: baData.total_raw ?? 0,
        weighted_final: baData.weighted_final ?? 0,
        strengths: baData.top_3_business_strengths ?? [],
        risks: baData.critical_business_risks ?? [],
      },
      ai_se_evaluation: {
        verdict: aiSeData.ai_se_final_verdict ?? 'N/A',
        consensus_summary: aiSeData.consensus_summary ?? 'N/A',
        conflict_resolved: aiSeData.conflict_resolved ?? 'N/A',
        scores: aiSeScores,
        total_raw: aiSeData.total_raw ?? 0,
        weighted_final: aiSeData.weighted_final ?? 0,
        strengths: aiSeData.top_3_ai_engineering_strengths ?? [],
        vulnerabilities: aiSeData.critical_ai_engineering_gaps ?? [],
      },
      executive_summary:
        `Per-category weighted raw total: ${totalWeightedRaw.toFixed(2)}/${TOTAL_MAX}. ` +
        `Normalized final score: ${finalScore}/100, resulting in a '${verdict}' verdict.`,
    }

    return JSON.stringify(result, null, 2)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return JSON.stringify({ error: `HeadJudge error: ${msg}` })
  }
}
