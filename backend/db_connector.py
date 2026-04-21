import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from the root .env.local file
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_evaluation_to_db(final_verdict_json_str, doc_url, team_name):
    """
    Parses the Head Judge final verdict JSON and saves all details to Supabase.
    """
    try:
        data = json.loads(final_verdict_json_str)
        
        # 1. Insert into evaluations table
        evaluation_data = {
            "doc_url": doc_url,
            "project_title": team_name,
            "head_judge_verdict": data.get("head_judge_verdict", "N/A"),
            "final_score": data.get("final_weighted_total", 0),
            "summary": data.get("executive_summary", ""),
            "calculation_breakdown": data.get("calculation_breakdown", {})
        }
        
        res = supabase.table("evaluations").insert(evaluation_data).execute()
        if not res.data:
            raise Exception("Failed to insert into evaluations table")
        
        evaluation_id = res.data[0]["id"]
        print(f"[DB] Created evaluation record with ID: {evaluation_id}")

        # 2. Insert into ceo_findings (table name unchanged — DB schema)
        ba = data.get("ba_evaluation", {})
        ba_data = {
            "evaluation_id": evaluation_id,
            "verdict": ba.get("verdict", "N/A"),
            "consensus_summary": ba.get("consensus_summary", ""),
            "fact_check_verdict": ba.get("fact_check", "N/A"),
            "scores": ba.get("scores", {}),
            "total_raw": ba.get("total_raw", 0),
            "weighted_final": ba.get("weighted_final", 0),
            "strengths": ba.get("strengths", []),
            "risks": ba.get("risks", [])
        }
        supabase.table("ceo_findings").insert(ba_data).execute()

        # 3. Insert into cto_findings (table name unchanged — DB schema)
        ai_se = data.get("ai_se_evaluation", {})
        ai_se_data = {
            "evaluation_id": evaluation_id,
            "verdict": ai_se.get("verdict", "N/A"),
            "consensus_summary": ai_se.get("consensus_summary", ""),
            "conflict_resolved": ai_se.get("conflict_resolved", "N/A"),
            "scores": ai_se.get("scores", {}),
            "total_raw": ai_se.get("total_raw", 0),
            "weighted_final": ai_se.get("weighted_final", 0),
            "strengths": ai_se.get("strengths", []),
            "vulnerabilities": ai_se.get("vulnerabilities", [])
        }
        supabase.table("cto_findings").insert(ai_se_data).execute()

        # 4. Insert into category_scores
        category_scores = data.get("per_category_weighted_scores", {})
        category_entries = []
        for cat_name, details in category_scores.items():
            category_entries.append({
                "evaluation_id": evaluation_id,
                "category_name": cat_name,
                "ceo_score": details.get("ba_score", 0),
                "cto_score": details.get("ai_se_score", 0),
                "ceo_weight": details.get("ba_weight", "0%"),
                "cto_weight": details.get("ai_se_weight", "0%"),
                "dominant_judge": details.get("dominant_judge", "N/A"),
                "weighted_score": details.get("weighted_score", 0),
                "max_score": details.get("max", 0)
            })
        if category_entries:
            supabase.table("category_scores").insert(category_entries).execute()

        # 5. Insert into qualitative_insights
        insights = []
        # BA Strengths & Risks
        for s in ba.get("strengths", []):
            insights.append({"evaluation_id": evaluation_id, "agent_type": "BA", "point_type": "strength", "content": s})
        for r in ba.get("risks", []):
            insights.append({"evaluation_id": evaluation_id, "agent_type": "BA", "point_type": "risk", "content": r})
        # AI SE Strengths & Vulnerabilities
        for s in ai_se.get("strengths", []):
            insights.append({"evaluation_id": evaluation_id, "agent_type": "AI SE", "point_type": "strength", "content": s})
        for v in ai_se.get("vulnerabilities", []):
            insights.append({"evaluation_id": evaluation_id, "agent_type": "AI SE", "point_type": "vulnerability", "content": v})
            
        if insights:
            supabase.table("qualitative_insights").insert(insights).execute()

        print(f"[DB] Successfully saved all evaluation details for team: {team_name}")
        return True

    except Exception as e:
        print(f"[DB] Error saving evaluation to Supabase: {str(e)}")
        return False
