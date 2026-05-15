"""
FastAPI server for AI Judge — triggers evaluations and serves results.
Run with: uvicorn server:app --reload --port 8000  (from the backend/ directory)
"""
import os
import sys
import json
import asyncio
from concurrent.futures import ThreadPoolExecutor
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# Add current directory and subdirectories to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'BusinessAnalysis'))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'AISoftwareEngineer'))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'HeadJudge'))

from gsheet_processor import process_gsheet_submissions
from utils import get_public_gdoc_text, get_public_gsheet_csv, get_github_readme, get_google_slides_text
from BusinessAnalysis.BA_main import BA_main
from AISoftwareEngineer.AI_SE_main import AI_SE_main
from HeadJudge.HeadJudge_main import HeadJudge_main
from db_connector import save_evaluation_to_db, supabase


# ── Dual Logger: writes to both terminal and result.txt ─────────────
class DualLogger:
    def __init__(self, filename):
        self.terminal = sys.stdout
        self.log = open(filename, "a", encoding="utf-8")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)
        self.log.flush()

    def flush(self):
        self.terminal.flush()
        self.log.flush()


# Point result.txt to the project root (one level up from backend/)
_project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_log_file = os.path.join(_project_root, "result.txt")
sys.stdout = DualLogger(_log_file)
sys.stderr = DualLogger(_log_file)


app = FastAPI(title="AI Judge API")

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Evaluation Status (in-memory tracker) ───────────────────────────
eval_status = {
    "running": False,
    "message": "",
    "progress": 0,
    "total": 0,
    "completed_teams": [],
    "error": None,
}


# ── Request Models ──────────────────────────────────────────────────
class JudgeRequest(BaseModel):
    sheet_url: str


# ── GET /status ─────────────────────────────────────────────────────
@app.get("/status")
def get_status():
    """Get the current evaluation status."""
    return eval_status


# ── POST /setup-db ─────────────────────────────────────────────────
@app.post("/setup-db")
def setup_database():
    """
    Reads backend/supabase_setup.sql and creates all tables.
    Safe to re-run — all statements use CREATE TABLE IF NOT EXISTS.
    Requires SUPABASE_DB_URL in .env.local (Postgres URI from Supabase Dashboard).
    """
    import psycopg2

    db_url = os.getenv("SUPABASE_DB_URL", "").strip()
    if not db_url:
        raise HTTPException(
            status_code=500,
            detail="SUPABASE_DB_URL not set. Add it to .env.local (Supabase Dashboard → Settings → Database → URI).",
        )

    sql_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "supabase_setup.sql")
    if not os.path.exists(sql_path):
        raise HTTPException(status_code=500, detail="supabase_setup.sql not found in backend/.")

    with open(sql_path, "r") as f:
        sql = f.read()

    try:
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(sql)
        cur.close()
        conn.close()
        return {"status": "ok", "message": "All tables created (or already existed)."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB setup error: {str(e)}")


# ── POST /reset-db ─────────────────────────────────────────────────
@app.post("/reset-db")
def reset_database():
    """
    Truncates evaluations and evaluation_jobs tables with CASCADE.
    Requires SUPABASE_DB_URL in .env.local.
    """
    import psycopg2

    db_url = os.getenv("SUPABASE_DB_URL", "").strip()
    if not db_url:
        raise HTTPException(
            status_code=500,
            detail="SUPABASE_DB_URL not set.",
        )

    try:
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute("TRUNCATE TABLE evaluations, evaluation_jobs CASCADE")
        cur.close()
        conn.close()
        return {
            "status": "ok",
            "message": "All tables cleared: evaluations, ba_findings, ai_se_findings, category_scores, qualitative_insights, evaluation_jobs.",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reset error: {str(e)}")


# ── POST /judge ─────────────────────────────────────────────────────
@app.post("/judge")
async def start_judging(req: JudgeRequest):
    """
    Accept a Google Sheet URL and run the judging pipeline in the background.
    Returns immediately so the frontend doesn't timeout.
    """
    if eval_status["running"]:
        raise HTTPException(status_code=409, detail="An evaluation is already running. Please wait.")

    # Reset status
    eval_status.update({
        "running": True,
        "message": "Starting evaluation...",
        "progress": 0,
        "total": 0,
        "completed_teams": [],
        "error": None,
    })

    # Run the heavy work in a background thread
    asyncio.get_event_loop().run_in_executor(None, _run_sheet_eval, req.sheet_url)

    return {"status": "started", "message": "Evaluation started. Poll GET /status for progress."}


# ── GET /results ────────────────────────────────────────────────────
@app.get("/results")
def get_results():
    """
    Fetch all evaluation data from Supabase, joining findings and scores
    into a single payload for the frontend.
    """
    try:
        evals_res = supabase.table("evaluations").select("*").order("created_at", desc=True).execute()
        evals = evals_res.data or []

        if not evals:
            return {"evaluations": []}

        eval_ids = [e["id"] for e in evals]

        ba_res = supabase.table("ba_findings").select("*").in_("evaluation_id", eval_ids).execute()
        ai_se_res = supabase.table("ai_se_findings").select("*").in_("evaluation_id", eval_ids).execute()
        cat_res = supabase.table("category_scores").select("*").in_("evaluation_id", eval_ids).execute()
        ins_res = supabase.table("qualitative_insights").select("*").in_("evaluation_id", eval_ids).execute()

        def group_by_eval_id(rows):
            grouped = {}
            for row in rows:
                eid = row["evaluation_id"]
                if eid not in grouped:
                    grouped[eid] = []
                grouped[eid].append(row)
            return grouped

        ba_map = group_by_eval_id(ba_res.data or [])
        ai_se_map = group_by_eval_id(ai_se_res.data or [])
        cat_map = group_by_eval_id(cat_res.data or [])
        ins_map = group_by_eval_id(ins_res.data or [])

        combined = []
        for e in evals:
            eid = e["id"]
            combined.append({
                **e,
                "ba_findings": ba_map.get(eid, []),
                "ai_se_findings": ai_se_map.get(eid, []),
                "category_scores": cat_map.get(eid, []),
                "qualitative_insights": ins_map.get(eid, []),
            })

        return {"evaluations": combined}

    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Error fetching results: {str(ex)}")


# ── GET /download-csv ──────────────────────────────────────────────
@app.get("/download-csv")
def download_csv():
    """
    Download all evaluation data as a CSV file.
    Flattens nested BA/AI SE findings into a single row per evaluation.
    """
    import csv
    import io

    try:
        # 1. Fetch all evaluations
        evals_res = supabase.table("evaluations").select("*").order("created_at", desc=True).execute()
        evals = evals_res.data or []

        if not evals:
            raise HTTPException(status_code=404, detail="No evaluations found to download.")

        eval_ids = [e["id"] for e in evals]

        # 2. Fetch related data
        ba_res = supabase.table("ba_findings").select("*").in_("evaluation_id", eval_ids).execute()
        ai_se_res = supabase.table("ai_se_findings").select("*").in_("evaluation_id", eval_ids).execute()
        cat_res = supabase.table("category_scores").select("*").in_("evaluation_id", eval_ids).execute()

        # Group by evaluation_id
        def group_by_eid(rows):
            grouped = {}
            for row in rows:
                eid = row["evaluation_id"]
                if eid not in grouped:
                    grouped[eid] = []
                grouped[eid].append(row)
            return grouped

        ba_map = group_by_eid(ba_res.data or [])
        ai_se_map = group_by_eid(ai_se_res.data or [])
        cat_map = group_by_eid(cat_res.data or [])

        # 3. CSV headers
        headers = [
            "Project Title", "Final Score", "Head Judge Verdict",
            "BA Verdict", "BA Total Raw", "BA Weighted Final",
            "AI SE Verdict", "AI SE Total Raw", "AI SE Weighted Final",
            "Executive Summary",
            "BA Strengths", "BA Risks",
            "AI SE Strengths", "AI SE Vulnerabilities",
            "Category Scores",
            "Documentation Link", "Created At"
        ]

        # 4. Build CSV rows
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)

        for e in evals:
            eid = e["id"]
            ba_list = ba_map.get(eid, [{}])
            ai_se_list = ai_se_map.get(eid, [{}])
            cats = cat_map.get(eid, [])

            ba = ba_list[0] if ba_list else {}
            ai_se = ai_se_list[0] if ai_se_list else {}

            # Flatten strengths/risks into comma-separated strings
            ba_strengths = "; ".join(ba.get("strengths", []) or [])
            ba_risks = "; ".join(ba.get("risks", []) or [])
            ai_se_strengths = "; ".join(ai_se.get("strengths", []) or [])
            ai_se_vulns = "; ".join(ai_se.get("vulnerabilities", []) or [])

            # Flatten category scores
            cat_summary = "; ".join(
                [f"{c.get('category_name', 'N/A')}: {c.get('weighted_score', 0)}/{c.get('max_score', 0)}" for c in cats]
            )

            writer.writerow([
                e.get("project_title", ""),
                e.get("final_score", ""),
                e.get("head_judge_verdict", ""),
                ba.get("verdict", ""),
                ba.get("total_raw", ""),
                ba.get("weighted_final", ""),
                ai_se.get("verdict", ""),
                ai_se.get("total_raw", ""),
                ai_se.get("weighted_final", ""),
                e.get("summary", ""),
                ba_strengths,
                ba_risks,
                ai_se_strengths,
                ai_se_vulns,
                cat_summary,
                e.get("doc_url", ""),
                e.get("created_at", ""),
            ])

        output.seek(0)
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=all_submissions.csv"}
        )

    except HTTPException:
        raise
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Error generating CSV: {str(ex)}")


# ── Background Worker ───────────────────────────────────────────────
def _run_sheet_eval(sheet_url: str):
    """Blocking function: runs the full sheet evaluation pipeline."""
    import csv
    import io

    try:
        eval_status["message"] = "Fetching Google Sheet..."
        csv_data = get_public_gsheet_csv(sheet_url)

        if csv_data.startswith("Error"):
            eval_status["error"] = csv_data
            eval_status["running"] = False
            return

        f = io.StringIO(csv_data)
        reader = csv.reader(f)

        try:
            next(reader)  # skip header
        except StopIteration:
            eval_status["error"] = "Google Sheet is empty."
            eval_status["running"] = False
            return

        rows = list(reader)

        # Filter to valid rows (team name at column K = index 10)
        valid_rows = []
        for row in rows:
            if not any(cell.strip() for cell in row):
                continue
            if len(row) < 51:
                row.extend([""] * (51 - len(row)))
            team_name = row[10].strip()
            if team_name:
                valid_rows.append(row)

        eval_status["total"] = len(valid_rows)
        eval_status["message"] = f"Found {len(valid_rows)} submissions. Starting evaluations..."

        for idx, row in enumerate(valid_rows):
            team_name = row[10].strip()
            eval_status["message"] = f"Evaluating {team_name}... ({idx + 1}/{len(valid_rows)})"

            try:
                docs_link = row[8].strip()
                project_content = _build_project_content(row, team_name)

                with ThreadPoolExecutor(max_workers=2) as pool:
                    ba_future = pool.submit(BA_main, project_content)
                    ai_se_future = pool.submit(AI_SE_main, project_content)
                    ba_output = ba_future.result()
                    ai_se_output = ai_se_future.result()

                final_verdict = HeadJudge_main(project_content, ba_output, ai_se_output)

                try:
                    save_evaluation_to_db(final_verdict, docs_link, team_name)
                except Exception as db_err:
                    print(f"[DB WARNING] Failed to save {team_name}: {db_err}")

                eval_status["completed_teams"].append(team_name)

            except Exception as e:
                print(f"[-] Error evaluating {team_name}: {e}")
                eval_status["completed_teams"].append(f"{team_name} (ERROR)")

            eval_status["progress"] = idx + 1

        eval_status["message"] = f"All {len(valid_rows)} evaluations complete!"
        eval_status["running"] = False

    except Exception as e:
        eval_status["error"] = str(e)
        eval_status["message"] = f"Error: {str(e)}"
        eval_status["running"] = False


def _build_project_content(row, team_name):
    """Build the structured content string from a sheet row, enriched with fetched link content."""
    github_link = row[6].strip()
    docs_link = row[8].strip()

    content = f"""
### GENERAL INFORMATION
- TEAM NAME: {team_name}
- GDGOC CHAPTERS: {row[9].strip()}
- GDGOC MEMBER STATUS: {row[2].strip()}
- GOOGLE TECH + AI REQUIREMENT MET: {row[3].strip()}
- GOOGLE AI TECH REQUIREMENT MET: {row[4].strip()}

### LINKS
- GITHUB/PROTOTYPE LINK: {github_link}
- VIDEO LINK: {row[7].strip()}
- DOCUMENTATION LINK: {docs_link}

### PRODUCT & IMPACT
- REAL-WORLD PROBLEM SOLVED: {row[31].strip()}
- SUCCESS MEASUREMENT: {row[37].strip()}
- UNIQUE APPROACH: {row[42].strip()}
- GROWTH POTENTIAL: {row[43].strip()}

### USER-CENTRIC DESIGN
- USER VALIDATION PROCESS: {row[34].strip()}
- KEY INSIGHTS FROM USER FEEDBACK: {row[35].strip()}
- CHANGES MADE BASED ON USER FEEDBACK: {row[36].strip()}

### TECHNICAL IMPLEMENTATION
- GOOGLE AI TECHNOLOGY IMPLEMENTED: {row[39].strip()}
- HOW AI MAKES THE SOLUTION SMARTER: {row[40].strip()}
- WHAT IS LOST WITHOUT AI: {row[41].strip()}
- ANALYTICS POWERED BY GOOGLE: {row[38].strip()}
- FULL TECH STACK & REASONING: {row[44].strip()}
- SOLUTION ARCHITECTURE: {row[45].strip()}
- SIGNIFICANT TECHNICAL CHALLENGE: {row[46].strip()}
- TECHNICAL TRADE-OFFS MADE: {row[47].strip()}

### FUTURE & SCALABILITY
- FUTURE STEPS & EXPANSION PLAN: {row[48].strip()}
- SCALABILITY & ARCHITECTURAL ADAPTATION: {row[49].strip()}
"""

    if github_link and "github.com" in github_link:
        fetched = get_github_readme(github_link)
        if fetched:
            content += f"\n\n### GITHUB README (fetched)\n{fetched[:3000]}"

    if docs_link:
        if "presentation" in docs_link:
            fetched = get_google_slides_text(docs_link)
            if fetched:
                content += f"\n\n### SLIDE DECK CONTENT (fetched)\n{fetched[:3000]}"
        elif "document" in docs_link:
            fetched = get_public_gdoc_text(docs_link)
            if fetched and not fetched.startswith("Error"):
                content += f"\n\n### DOCUMENTATION CONTENT (fetched)\n{fetched[:3000]}"

    return content
