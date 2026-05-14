# Implementation Plan: Database Integration & Frontend Dashboard

This plan outlines the steps to connect the AI-Judge-KitaHack backend to Supabase and build a React-based frontend dashboard for visualizing the results.

## Phase 1: Database Integration (Backend)

### 1.1 Supabase Configuration
- **Install Dependencies:** `pip install supabase`
- **Utility Creation:** Create `backend/db_connector.py` to initialize the Supabase client using credentials from `.env`.
- **Data Mapping:** Create a function `save_to_supabase(ba_json, ai_se_json, doc_url, project_title)` that maps the specific agent outputs:
    1. **Evaluations Table:** Create a master record for the project and retrieve the `evaluation_id`.
    2. **BA Findings:** Map `ba_final_verdict`, `consensus_summary`, `fact_check_final_verdict`, `conflict_resolved`, and `weighted_final`.
    3. **AI SE Findings:** Map `ai_se_final_verdict`, `consensus_summary`, `conflict_resolved`, and `weighted_final`.
    4. **Category Scores:** Flatten and insert the `scores` objects from both agents (e.g., `problem_sdg`, `ai_innovation`, `scalability`, `architecture`).
    5. **Qualitative Insights:** Iterate through and store lists from `top_3_strategic_strengths`, `critical_market_risks` (BA), and `critical_vulnerabilities` (AI SE).

### 1.2 Integration into Workflow
- **Update `gsheet_processor.py`:** Call `save_to_supabase` immediately after the `HeadJudge` agents return their respective JSON objects for each row.
- **Update `main.py`:** Add logic to ensure single-document evaluations are persisted to the database.

## Phase 2: API Layer (Optional but Recommended)

To allow the frontend to trigger judging and fetch data:
- **FastAPI Server:** Create a small `server.py` using FastAPI.
    - `POST /judge`: Accepts a Google Sheet URL and runs the `process_gsheet_submissions` in a background task.
    - `GET /evaluations`: Fetches all data from Supabase (or the frontend can call Supabase directly).

## Phase 3: Frontend Dashboard Development

### 3.1 Setup
- **Framework:** React with Vite (TypeScript).
- **Styling:** Vanilla CSS for a clean, professional look.
- **State Management:** React Hooks (useState, useEffect).

### 3.2 Components
- **Input Section:** 
    - Text field for Google Sheet URL.
    - "Start Evaluation" button with loading state.
- **Stats Overview:** Top cards showing total projects, average score, and verdict distribution.
- **Results Table:**
    - Columns: Team Name, Final Score, Verdict, BA Score, AI SE Score.
    - Filter Toggles: Checkboxes to show/hide specific columns (BA, AI SE, Comments, etc.).
    - Search: Filter by team name.
- **Detailed Modal:** Click a row to see the full breakdown (Category scores, Strengths, Risks, Executive Summary).

### 3.3 Visual Aesthetic
- **Color Palette:** Professional dark/light mode support (primary: deep blue/teal).
- **Interactive Elements:** Hover effects on table rows, smooth transitions for filters.

## Timeline
1. **Day 1:** DB Connector implementation and backend integration.
2. **Day 2:** Data verification and error handling for DB inserts.
3. **Day 3:** Frontend scaffolding and Supabase data fetching.
4. **Day 4:** Table filters, styling, and final testing.

---
*Note: Ensure the Supabase tables in `db.sql` are already created in your project dashboard before starting Phase 1.*
