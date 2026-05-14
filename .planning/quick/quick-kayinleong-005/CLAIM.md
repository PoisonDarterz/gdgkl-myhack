# Claim: quick-kayinleong-005
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-14
- status: done
- summary: Apps Script to split Final round submissions across Final judges (col B of Judge tab), reading from "Form Response for Finals" tab

## What changed
- Created `scripts/split_final_submissions_to_judges.gs`

## What it does
- Reads all non-empty rows from "Form Response for Finals"
- Reads Final judge names from column B (index 1) of the "Judge" tab, skipping row 1 ("Final" header)
- Round-robin assigns 2 judges per submission: submission s → judges[s%n] and judges[(s+1)%n]
- For each judge: creates a Drive folder inside "MyHack 2025 – Final Judge Folders", then a Google Sheet with a "Submissions" tab
- Headers: all original columns + "Feedback" + "Marks out of 100%" (validated 0–100)
- Formatting: green header (distinct from Prelim's blue), amber on judge columns, frozen row, auto-resize

## Verification
- Column B reading verified against Judge tab screenshot (Low Wei Chung, Doddi Priyambodoa, Cradle Funds, Dr Lau)
- Logic mirrors split_submissions_to_judges.gs; only differs in source sheet name, judge column, folder/file naming, and header colour
- No secrets or real data committed
