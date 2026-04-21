import os
import sys

# Add backend to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend', 'BusinessAnalysis'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend', 'AISoftwareEngineer'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend', 'HeadJudge'))

from backend.BusinessAnalysis.CEO_main import CEO_main
from backend.AISoftwareEngineer.CTO_main import CTO_main
from backend.HeadJudge.HeadJudge_main import HeadJudge_main
from backend.utils import get_public_gdoc_text
from backend.gsheet_processor import process_gsheet_submissions
from backend.db_connector import save_evaluation_to_db

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

def main():
    # Setup logging to result.txt in the workspace root
    workspace_root = os.path.dirname(os.path.abspath(__file__))
    log_file = os.path.join(workspace_root, "result.txt")
    
    # Initialize logger
    logger = DualLogger(log_file)
    sys.stdout = logger
    sys.stderr = logger

    print("\n" + "="*60)
    print("      --- KitaHack AI: Triple-Agent Judging System ---")
    print("="*60)

    print("\nSelect Submission Source:")
    print("1. Single Google Doc URL")
    print("2. Google Sheet URL (Batch Processing)")
    
    choice = input("\nEnter choice (1 or 2): ").strip()

    if choice == '1':
        doc_url = input("\nEnter the Public Google Doc URL: ").strip()
        if not doc_url:
            print("Error: No URL provided.")
            return

        print("\n[*] Fetching document content...")
        project_content = get_public_gdoc_text(doc_url)

        if project_content.startswith("Error"):
            print(f"[-] {project_content}")
            return
        
        print("[+] Content fetched successfully.")
        
        # Phase 1: Run BA Evaluation
        ba_output = CEO_main(project_content)

        # Phase 2: Run AI SE Evaluation
        ai_se_output = CTO_main(project_content)

        # Phase 3: Run Head Judge (Final Verdict)
        final_verdict = HeadJudge_main(project_content, ba_output, ai_se_output)

        # Phase 4: Save to Supabase
        try:
            save_evaluation_to_db(final_verdict, doc_url, "Single Doc")
        except Exception as db_err:
            print(f"[DB WARNING] Failed to save to database: {str(db_err)}")
            print("[DB WARNING] Results were printed above but not saved to DB.")

    elif choice == '2':
        sheet_url = input("\nEnter the Public Google Sheet URL: ").strip()
        if not sheet_url:
            print("Error: No URL provided.")
            return
        
        process_gsheet_submissions(sheet_url)

    else:
        print("Invalid choice.")

    print("\n" + "="*60)
    print("      --- All Evaluations Complete ---")
    print("="*60)

if __name__ == "__main__":
    main()