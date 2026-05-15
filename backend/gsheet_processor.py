import csv
import io
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils import get_public_gsheet_csv, get_github_readme, get_google_slides_text, get_public_gdoc_text
from BusinessAnalysis.BA_main import BA_main
from AISoftwareEngineer.AI_SE_main import AI_SE_main
from HeadJudge.HeadJudge_main import HeadJudge_main
from db_connector import save_evaluation_to_db

def process_gsheet_submissions(sheet_url):
    """Processes Google Sheet submissions row by row."""
    print(f"\n[*] Fetching Google Sheet content from: {sheet_url}")
    csv_data = get_public_gsheet_csv(sheet_url)

    if csv_data.startswith("Error"):
        print(f"[-] {csv_data}")
        return

    # Use io.StringIO to treat the string as a file for csv.reader
    f = io.StringIO(csv_data)
    reader = csv.reader(f)
    
    # Skip header
    try:
        header = next(reader)
    except StopIteration:
        print("[-] Error: Google Sheet is empty.")
        return

    print("[+] Google Sheet fetched successfully. Starting batch evaluation...")

    results = []
    
    # Column Indices (0-indexed)
    # G=6 (GitHub), H=7 (Video), I=8 (Docs), K=10 (Team Name)
    
    for row_idx, row in enumerate(reader, start=2):
        # Skip truly empty rows (all columns are empty or whitespace)
        if not any(cell.strip() for cell in row):
            continue

        # Pad row if it's shorter than expected to prevent IndexError
        if len(row) < 51:
            row.extend([""] * (51 - len(row)))
            
        # Basic Info (Column K = index 10)
        team_name = row[10].strip()
        
        # Skip if team name is missing - usually indicates an incomplete or spacer row
        if not team_name:
            continue

        # Extraction logic with safety
        github_link = row[6].strip()
        video_link = row[7].strip()
        docs_link = row[8].strip()
        gdgoc_members = row[2].strip()
        google_dev_tech_ai = row[3].strip()
        google_ai_tech_check = row[4].strip()
        gdgoc_chapters = row[9].strip()

        # Detailed Project Info
        problem_solving = row[31].strip()
        user_validation = row[34].strip()
        user_feedback_insights = row[35].strip()
        changes_from_feedback = row[36].strip()
        success_measurement = row[37].strip()
        analytics_tech = row[38].strip()
        ai_tech_implemented = row[39].strip()
        ai_impact = row[40].strip()
        loss_without_ai = row[41].strip()
        unique_approach = row[42].strip()
        growth_potential = row[43].strip()
        tech_stack_reasoning = row[44].strip()
        architecture_overview = row[45].strip()
        technical_challenge = row[46].strip()
        technical_tradeoffs = row[47].strip()
        future_steps = row[48].strip()
        scalability_architecture = row[49].strip()

        print("\n" + "="*60)
        print(f"  PROJECT: {team_name}")
        print(f"  ROW: {row_idx}")
        print("="*60)

        # Construct project content for the agents
        project_content = f"""
### GENERAL INFORMATION
- TEAM NAME: {team_name}
- GDGOC CHAPTERS: {gdgoc_chapters}
- GDGOC MEMBER STATUS: {gdgoc_members}
- GOOGLE TECH + AI REQUIREMENT MET: {google_dev_tech_ai}
- GOOGLE AI TECH REQUIREMENT MET: {google_ai_tech_check}

### LINKS
- GITHUB/PROTOTYPE LINK: {github_link}
- VIDEO LINK: {video_link}
- DOCUMENTATION LINK: {docs_link}

### PRODUCT & IMPACT
- REAL-WORLD PROBLEM SOLVED: {problem_solving}
- SUCCESS MEASUREMENT: {success_measurement}
- UNIQUE APPROACH: {unique_approach}
- GROWTH POTENTIAL: {growth_potential}

### USER-CENTRIC DESIGN
- USER VALIDATION PROCESS: {user_validation}
- KEY INSIGHTS FROM USER FEEDBACK: {user_feedback_insights}
- CHANGES MADE BASED ON USER FEEDBACK: {changes_from_feedback}

### TECHNICAL IMPLEMENTATION
- GOOGLE AI TECHNOLOGY IMPLEMENTED: {ai_tech_implemented}
- HOW AI MAKES THE SOLUTION SMARTER: {ai_impact}
- WHAT IS LOST WITHOUT AI: {loss_without_ai}
- ANALYTICS POWERED BY GOOGLE: {analytics_tech}
- FULL TECH STACK & REASONING: {tech_stack_reasoning}
- SOLUTION ARCHITECTURE: {architecture_overview}
- SIGNIFICANT TECHNICAL CHALLENGE: {technical_challenge}
- TECHNICAL TRADE-OFFS MADE: {technical_tradeoffs}

### FUTURE & SCALABILITY
- FUTURE STEPS & EXPANSION PLAN: {future_steps}
- SCALABILITY & ARCHITECTURAL ADAPTATION: {scalability_architecture}
"""

        # Optionally enrich with fetched content from links
        github_content = ""
        doc_content = ""

        if github_link and "github.com" in github_link:
            fetched = get_github_readme(github_link)
            if fetched:
                github_content = f"\n\n### GITHUB README (fetched)\n{fetched[:3000]}"

        if docs_link:
            if "presentation" in docs_link:
                fetched = get_google_slides_text(docs_link)
                if fetched:
                    doc_content = f"\n\n### SLIDE DECK CONTENT (fetched)\n{fetched[:3000]}"
            elif "document" in docs_link:
                fetched = get_public_gdoc_text(docs_link)
                if fetched and not fetched.startswith("Error"):
                    doc_content = f"\n\n### DOCUMENTATION CONTENT (fetched)\n{fetched[:3000]}"

        project_content += github_content + doc_content

        print(f"[*] Evaluating {team_name}...")

        try:
            # Phase 1: Run BA Evaluation
            ba_output = BA_main(project_content)

            # Phase 2: Run AI SE Evaluation
            ai_se_output = AI_SE_main(project_content)

            # Phase 3: Run Head Judge (Final Verdict)
            final_verdict = HeadJudge_main(project_content, ba_output, ai_se_output)

            # Phase 4: Save to Supabase (isolated so DB errors don't break the batch)
            try:
                save_evaluation_to_db(final_verdict, docs_link, team_name)
            except Exception as db_err:
                print(f"[DB WARNING] Failed to save {team_name} to database: {str(db_err)}")
                print("[DB WARNING] Continuing to next team...")
            
            results.append({
                "team": team_name,
                "row": row_idx,
                "verdict": final_verdict
            })
            
            print(f"[+] Completed evaluation for {team_name}")
            
        except Exception as e:
            print(f"[-] Error evaluating {team_name} at row {row_idx}: {str(e)}")
            continue

    print("\n" + "="*60)
    print("      --- Batch Evaluation Summary ---")
    print("="*60)
    for res in results:
        print(f"Team: {res['team']} (Row {res['row']})")
        # You might want to extract just the score/verdict here for the summary
        print(f"Status: Evaluated")
    
    print("\n[+] Batch processing complete.")

if __name__ == "__main__":
    # Test with the provided sheet
    test_url = "https://docs.google.com/spreadsheets/d/16Lx00lTsyYMQtLo-z3bUKMB3MtuDKravWZ9jpJAZCDg/edit?usp=sharing"
    process_gsheet_submissions(test_url)
