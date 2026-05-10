# Claim: quick-kayinleong-002
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-10
- status: done
- summary: Fix deployment_readiness category weight in headJudge.ts (BA/SE weights were swapped)

## What will change
- `backend_functions/_shared/headJudge.ts` line 7: change `deployment_readiness` from `[0.70, 0.30]` to `[0.30, 0.70]`

## What has changed
- `backend_functions/_shared/headJudge.ts:7`: `deployment_readiness` weight changed from `[0.70, 0.30]` to `[0.30, 0.70]` (BA=30%, SE=70%)

## Verification
- Diff confirms only the one weight tuple changed; all other 8 category weights remain untouched
- No other code paths affected — `CATEGORY_WEIGHTS` is only read in the `headJudgeMain` loop
- Regression surface: final score calculation changes for any team where BA and SE gave different scores on `deployment_readiness`; the weighting now correctly favours the SE judge for this technical category
- status: done
