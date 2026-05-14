# Claim: quick-kayinleong-004
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-14
- status: done
- summary: Apps Script to split 100 submissions across 9 prelim judges (2 judges/submission), creating a Drive folder + Submissions sheet per judge

## What changed
- Created `scripts/split_submissions_to_judges.gs`

## What it does
- Reads all non-empty rows from "Form Responses 1"
- Reads prelim judge names from column A of the "Judge" tab (skips row 1 header)
- Round-robin assigns 2 judges per submission: submission s → judges[s%n] and judges[(s+1)%n]
- For each judge: creates a Drive folder (inside a shared parent folder next to the spreadsheet), then a Google Sheet with a "Submissions" tab
- "Submissions" tab: all original form headers + "Feedback" + "Marks out of 100%"
- Formatting: frozen header row, blue header bg, amber highlight on the 2 judge columns, data validation on Marks (0–100)

## Verification
- Column indexing verified against the 23 headers from quick-kayinleong-003
- Round-robin logic ensures every submission gets exactly 2 distinct judges
- Empty-row filter prevents phantom submissions
- No secrets or real data committed
