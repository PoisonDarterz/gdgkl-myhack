# Implementation Plan: Download All Submissions as CSV

This document outlines the steps to implement a feature that allows users to download all submission data from the database as a CSV file.

## 1. Backend Implementation (FastAPI)

### Objective:
Create a new endpoint `/download-csv` in `backend/server.py` that fetches all evaluation data and returns it as a formatted CSV file.

### Steps:
1.  **Add Endpoint:**
    Define a new GET route `@app.get("/download-csv")`.
2.  **Fetch Data:**
    Reuse the logic from `get_results()` to fetch data from `evaluations`, `ceo_findings`, `cto_findings`, and `category_scores`.
3.  **Process Data for CSV:**
    Since CSV is a flat format, nested data needs to be flattened.
    *   **Evaluation Columns:** `id`, `project_title`, `final_score`, `head_judge_verdict`, `summary`, `doc_url`, `created_at`.
    *   **CEO Findings Columns:** `ceo_verdict`, `ceo_total_raw`, `ceo_weighted_final`.
    *   **CTO Findings Columns:** `cto_verdict`, `cto_total_raw`, `cto_weighted_final`.
    *   **Category Scores Columns:** Flattened into `Category_Name_Score` columns if possible, or a string summary of category scores.
    *   **Insights:** Join strengths and risks into single comma-separated text fields.
4.  **Generate CSV:**
    Use Python's `csv` module and `io.StringIO` to generate the CSV content.
5.  **Return StreamingResponse:**
    Return the CSV content using `fastapi.responses.StreamingResponse` with the appropriate headers:
    *   `media_type="text/csv"`
    *   `headers={"Content-Disposition": "attachment; filename=all_submissions.csv"}`

---

## 2. Frontend Implementation (React/TypeScript)

### Objective:
Add a "Download CSV" button to the dashboard that triggers the backend download.

### Steps:
1.  **Button Placement:**
    Add a new button in the `header-right` div (next to the theme toggle/refresh buttons) in `frontend/src/App.tsx`.
    ```tsx
    <button className="download-btn" onClick={handleDownloadCSV} title="Download CSV">
      📥 Download CSV
    </button>
    ```
2.  **Implementation of `handleDownloadCSV`:**
    ```tsx
    const handleDownloadCSV = () => {
      window.location.href = `${API_BASE}/download-csv`;
    };
    ```
3.  **Styling:**
    Add styling for `.download-btn` in `frontend/src/index.css` to match the existing dashboard aesthetic (modern, clean, maybe a green or blue accent).

---

## 3. Data Schema for CSV

The CSV should include the following columns at minimum:

| Column Name | Source Table |
| :--- | :--- |
| Project Title | `evaluations.project_title` |
| Final Score | `evaluations.final_score` |
| Head Judge Verdict | `evaluations.head_judge_verdict` |
| CEO Verdict | `ceo_findings.verdict` |
| CEO Weighted Score | `ceo_findings.weighted_final` |
| CTO Verdict | `cto_findings.verdict` |
| CTO Weighted Score | `cto_findings.weighted_final` |
| Executive Summary | `evaluations.summary` |
| CEO Strengths | `ceo_findings.strengths` (joined string) |
| CEO Risks | `ceo_findings.risks` (joined string) |
| CTO Strengths | `cto_findings.strengths` (joined string) |
| CTO Vulnerabilities | `cto_findings.vulnerabilities` (joined string) |
| Documentation Link | `evaluations.doc_url` |
| Created At | `evaluations.created_at` |

---

## 4. Testing Plan

1.  **Backend Test:**
    *   Call `GET http://localhost:8000/download-csv` directly in a browser or using `curl`.
    *   Verify the response header `Content-Type` is `text/csv`.
    *   Check if the CSV file is downloaded and can be opened in Excel/Google Sheets.
2.  **Frontend Test:**
    *   Click the "Download CSV" button on the dashboard.
    *   Verify the download starts immediately.
    *   Verify data matches the results table.
