export interface Evaluation {
  id: string;
  doc_url: string;
  project_title: string;
  head_judge_verdict: string;
  final_score: number;
  summary: string;
  calculation_breakdown: Record<string, unknown>;
  created_at: string;
}

export interface CeoFinding {
  id: string;
  evaluation_id: string;
  verdict: string;
  consensus_summary: string;
  fact_check_verdict: string;
  scores: Record<string, number>;
  total_raw: number;
  weighted_final: number;
  strengths: string[];
  risks: string[];
}

export interface CtoFinding {
  id: string;
  evaluation_id: string;
  verdict: string;
  consensus_summary: string;
  conflict_resolved: string;
  scores: Record<string, number>;
  total_raw: number;
  weighted_final: number;
  strengths: string[];
  vulnerabilities: string[];
}

export interface CategoryScore {
  id: string;
  evaluation_id: string;
  category_name: string;
  ceo_score: number;
  cto_score: number;
  ceo_weight: string;
  cto_weight: string;
  dominant_judge: string;
  weighted_score: number;
  max_score: number;
}

export interface QualitativeInsight {
  id: string;
  evaluation_id: string;
  agent_type: string;
  point_type: string;
  content: string;
}

export interface EvaluationWithDetails extends Evaluation {
  ceo_findings: CeoFinding[];
  cto_findings: CtoFinding[];
  category_scores: CategoryScore[];
  qualitative_insights: QualitativeInsight[];
}

export type FilterMode =
  | 'all'
  | 'head_judge'
  | 'cto_only'
  | 'ceo_only'
  | 'comments'
  | 'final_marks';
