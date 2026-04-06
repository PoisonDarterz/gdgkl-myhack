import re
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env.local file
# Load environment variables from the root .env.local file
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local')
load_dotenv(dotenv_path)

def get_public_gdoc_text(url):
    """Extracts text from a public Google Doc via the export endpoint."""
    doc_id_match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
    if not doc_id_match:
        return "Error: Invalid URL format."

    doc_id = doc_id_match.group(1)
    # Using the txt export format to avoid formatting overhead
    export_url = f"https://docs.google.com/document/d/{doc_id}/export?format=txt"

    try:
        response = requests.get(export_url)
        if response.status_code == 200:
            return response.text
        return f"Error: Status {response.status_code}. Verify the Doc is set to 'Anyone with the link can view'."
    except Exception as e:
        return f"Error: {str(e)}"
def get_public_gsheet_csv(url):
    """Extracts CSV data from a public Google Sheet."""
    sheet_id = extract_gsheet_id(url)
    if not sheet_id:
        return "Error: Invalid Google Sheet URL format."

    # Export as CSV
    export_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"

    try:
        response = requests.get(export_url)
        if response.status_code == 200:
            return response.text
        return f"Error: Status {response.status_code}. Verify the Sheet is set to 'Anyone with the link can view'."
    except Exception as e:
        return f"Error: {str(e)}"

def extract_gsheet_id(url):
    """Helper to extract Google Sheet ID from URL."""
    match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
    return match.group(1) if match else None
