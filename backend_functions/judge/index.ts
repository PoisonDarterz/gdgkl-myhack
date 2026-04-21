import { supabase } from '../_shared/supabaseClient.ts'
import { runBAEvaluation, runAISEEvaluation } from '../_shared/gemini.ts'
import { headJudgeMain } from '../_shared/headJudge.ts'
import { getPublicGsheetCsv, buildProjectContent, parseCsv } from '../_shared/utils.ts'

interface JudgeRequest {
  sheet_url: string
  team_name?: string
}

async function saveEvaluationToDb(
  finalVerdictJson: string,
  docUrl: string,
  teamName: string
): Promise<void> {
  const data = JSON.parse(finalVerdictJson)

  const { data: evalData, error: evalError } = await supabase
    .from('evaluations')
    .insert({
      doc_url: docUrl,
      project_title: teamName,
      head_judge_verdict: data.head_judge_verdict ?? 'N/A',
      final_score: data.final_weighted_total ?? 0,
      summary: data.executive_summary ?? '',
      calculation_breakdown: data.calculation_breakdown ?? {},
    })
    .select('id')
    .single()

  if (evalError || !evalData) throw new Error(`Failed to insert evaluation: ${evalError?.message}`)
  const evaluationId = evalData.id

  const ba = data.ba_evaluation ?? {}
  await supabase.from('ba_findings').insert({
    evaluation_id: evaluationId,
    verdict: ba.verdict ?? 'N/A',
    consensus_summary: ba.consensus_summary ?? '',
    fact_check_verdict: ba.fact_check ?? 'N/A',
    scores: ba.scores ?? {},
    total_raw: ba.total_raw ?? 0,
    weighted_final: ba.weighted_final ?? 0,
    strengths: ba.strengths ?? [],
    risks: ba.risks ?? [],
  })

  const aiSe = data.ai_se_evaluation ?? {}
  await supabase.from('ai_se_findings').insert({
    evaluation_id: evaluationId,
    verdict: aiSe.verdict ?? 'N/A',
    consensus_summary: aiSe.consensus_summary ?? '',
    conflict_resolved: aiSe.conflict_resolved ?? 'N/A',
    scores: aiSe.scores ?? {},
    total_raw: aiSe.total_raw ?? 0,
    weighted_final: aiSe.weighted_final ?? 0,
    strengths: aiSe.strengths ?? [],
    vulnerabilities: aiSe.vulnerabilities ?? [],
  })

  const categoryScores = data.per_category_weighted_scores ?? {}
  const categoryEntries = Object.entries(categoryScores).map(([catName, details]: [string, any]) => ({
    evaluation_id: evaluationId,
    category_name: catName,
    ba_score: details.ba_score ?? 0,
    ai_se_score: details.ai_se_score ?? 0,
    ba_weight: details.ba_weight ?? '0%',
    ai_se_weight: details.ai_se_weight ?? '0%',
    dominant_judge: details.dominant_judge ?? 'N/A',
    weighted_score: details.weighted_score ?? 0,
    max_score: details.max ?? 0,
  }))
  if (categoryEntries.length > 0) {
    await supabase.from('category_scores').insert(categoryEntries)
  }

  const insights: Record<string, unknown>[] = []
  for (const s of ba.strengths ?? []) {
    insights.push({ evaluation_id: evaluationId, agent_type: 'BA', point_type: 'strength', content: s })
  }
  for (const r of ba.risks ?? []) {
    insights.push({ evaluation_id: evaluationId, agent_type: 'BA', point_type: 'risk', content: r })
  }
  for (const s of aiSe.strengths ?? []) {
    insights.push({ evaluation_id: evaluationId, agent_type: 'AI SE', point_type: 'strength', content: s })
  }
  for (const v of aiSe.vulnerabilities ?? []) {
    insights.push({ evaluation_id: evaluationId, agent_type: 'AI SE', point_type: 'vulnerability', content: v })
  }
  if (insights.length > 0) {
    await supabase.from('qualitative_insights').insert(insights)
  }
}

async function runSheetEval(sheetUrl: string, jobId: string, teamNameFilter?: string): Promise<void> {
  const updateJob = async (fields: Record<string, unknown>) => {
    await supabase
      .from('evaluation_jobs')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', jobId)
  }

  try {
    console.log(`[judge] Job ${jobId} started. Fetching sheet: ${sheetUrl}`)
    await updateJob({ message: 'Fetching Google Sheet...' })
    const csvData = await getPublicGsheetCsv(sheetUrl)

    if (csvData.startsWith('Error')) {
      console.error(`[judge] Failed to fetch sheet: ${csvData}`)
      await updateJob({ running: false, error_detail: csvData })
      return
    }

    const allRows = parseCsv(csvData)
    if (allRows.length < 2) {
      console.error('[judge] Sheet is empty.')
      await updateJob({ running: false, error_detail: 'Google Sheet is empty.' })
      return
    }

    // Skip header row, filter valid rows (team name at column K = index 10)
    const validRows = allRows.slice(1).filter((row) => {
      if (!row.some((cell) => cell.trim())) return false
      while (row.length < 51) row.push('')
      if ((row[10] ?? '').trim().length === 0) return false
      if (teamNameFilter) {
        return (row[10] ?? '').trim().toLowerCase() === teamNameFilter.toLowerCase()
      }
      return true
    })

    const teamNames = validRows.map((r) => (r[10] ?? '').trim())
    console.log(`[judge] Found ${validRows.length} teams to evaluate:`)
    teamNames.forEach((name, i) => console.log(`  ${i + 1}. ${name}`))

    await updateJob({
      total: validRows.length,
      message: `Found ${validRows.length} submissions. Starting evaluations...`,
    })

    const completedTeams: string[] = []

    for (let idx = 0; idx < validRows.length; idx++) {
      const row = validRows[idx]
      const teamName = (row[10] ?? '').trim()
      const position = `[${idx + 1}/${validRows.length}]`

      console.log(`\n${position} ▶ Starting: ${teamName}`)
      await updateJob({ message: `Evaluating ${teamName}... (${idx + 1}/${validRows.length})` })

      const teamStart = Date.now()
      try {
        const docsLink = (row[8] ?? '').trim()
        const projectContent = await buildProjectContent(row, teamName)

        console.log(`${position} Running BA + AI SE in parallel for: ${teamName}`)
        const [baOutput, aiSeOutput] = await Promise.all([
          runBAEvaluation(projectContent),
          runAISEEvaluation(projectContent),
        ])

        console.log(`${position} Running HeadJudge for: ${teamName}`)
        const finalVerdict = headJudgeMain(baOutput, aiSeOutput)

        try {
          await saveEvaluationToDb(finalVerdict, docsLink, teamName)
          const elapsed = ((Date.now() - teamStart) / 1000).toFixed(1)
          console.log(`${position} ✓ Saved: ${teamName} (${elapsed}s)`)
        } catch (dbErr) {
          const msg = dbErr instanceof Error ? dbErr.message : JSON.stringify(dbErr)
          console.warn(`${position} ⚠ DB save failed for ${teamName}: ${msg}`)
        }

        completedTeams.push(teamName)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error(`${position} ✗ Error evaluating ${teamName}: ${msg}`)
        completedTeams.push(`${teamName} (ERROR)`)
      }

      await updateJob({ progress: idx + 1, completed_teams: completedTeams })
    }

    const errors = completedTeams.filter((t) => t.endsWith('(ERROR)')).length
    console.log(`\n[judge] ✓ All done. ${validRows.length - errors}/${validRows.length} succeeded, ${errors} errors.`)

    await updateJob({
      running: false,
      message: `All ${validRows.length} evaluations complete!`,
      completed_teams: completedTeams,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : (e as any)?.message ?? String(e)
    console.error(`[judge] Fatal error: ${msg}`)
    await updateJob({ running: false, error_detail: msg, message: `Error: ${msg}` })
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, x-client-info',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  try {
    const body: JudgeRequest = await req.json()
    if (!body.sheet_url) {
      return new Response(JSON.stringify({ error: 'sheet_url is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    // Check if already running
    const { data: latestJob } = await supabase
      .from('evaluation_jobs')
      .select('running')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (latestJob?.running) {
      return new Response(
        JSON.stringify({ error: 'An evaluation is already running. Please wait.' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      )
    }

    // Create a new job record
    const startMessage = body.team_name
      ? `Starting evaluation for team: ${body.team_name}...`
      : 'Starting evaluation...'
    const { data: newJob, error: insertError } = await supabase
      .from('evaluation_jobs')
      .insert({
        running: true,
        message: startMessage,
        progress: 0,
        total: 0,
        completed_teams: [],
        error_detail: null,
      })
      .select('id')
      .single()

    if (insertError || !newJob) {
      throw new Error(`Failed to create job record: ${insertError?.message}`)
    }

    // Run evaluation in background — does not block the response
    EdgeRuntime.waitUntil(runSheetEval(body.sheet_url, newJob.id, body.team_name))

    return new Response(
      JSON.stringify({
        status: 'started',
        job_id: newJob.id,
        message: 'Evaluation started. Poll GET /status for progress.',
      }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
