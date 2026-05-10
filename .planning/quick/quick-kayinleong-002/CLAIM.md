# Claim: quick-kayinleong-002
- owner: kayinleong
- session: claude-code
- branch: dev
- started: 2026-05-10
- status: in-progress
- summary: Fix deployment_readiness category weight in headJudge.ts (BA/SE weights were swapped)

## What will change
- `backend_functions/_shared/headJudge.ts` line 7: change `deployment_readiness` from `[0.70, 0.30]` to `[0.30, 0.70]`

## What has changed
<!-- filled after work completes -->

## Verification
<!-- filled after verification -->
