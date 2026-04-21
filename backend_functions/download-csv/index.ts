import { supabase } from '../_shared/supabaseClient.ts'

function groupByEvalId<T extends { evaluation_id: string }>(
  rows: T[]
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  for (const row of rows) {
    const eid = row.evaluation_id
    if (!grouped[eid]) grouped[eid] = []
    grouped[eid].push(row)
  }
  return grouped
}

function escapeCsvField(value: unknown): string {
  const str = value == null ? '' : String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toCsvRow(fields: unknown[]): string {
  return fields.map(escapeCsvField).join(',')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, x-client-info',
      },
    })
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  try {
    const { data: evals, error: evalsError } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false })

    if (evalsError) throw new Error(evalsError.message ?? JSON.stringify(evalsError))

    if (!evals || evals.length === 0) {
      return new Response(JSON.stringify({ error: 'No evaluations found to download.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const evalIds = evals.map((e) => e.id)

    const [baRes, aiSeRes, catRes] = await Promise.all([
      supabase.from('ba_findings').select('*').in('evaluation_id', evalIds),
      supabase.from('ai_se_findings').select('*').in('evaluation_id', evalIds),
      supabase.from('category_scores').select('*').in('evaluation_id', evalIds),
    ])

    const baMap = groupByEvalId(baRes.data ?? [])
    const aiSeMap = groupByEvalId(aiSeRes.data ?? [])
    const catMap = groupByEvalId(catRes.data ?? [])

    const headers = [
      'Project Title', 'Final Score', 'Head Judge Verdict',
      'BA Verdict', 'BA Total Raw', 'BA Weighted Final',
      'AI SE Verdict', 'AI SE Total Raw', 'AI SE Weighted Final',
      'Executive Summary',
      'BA Strengths', 'BA Risks',
      'AI SE Strengths', 'AI SE Vulnerabilities',
      'Category Scores',
      'Documentation Link', 'Created At',
    ]

    const csvLines: string[] = [toCsvRow(headers)]

    for (const e of evals) {
      const eid = e.id
      const baList = baMap[eid] ?? [{}]
      const aiSeList = aiSeMap[eid] ?? [{}]
      const cats = catMap[eid] ?? []

      const ba: Record<string, unknown> = baList[0] ?? {}
      const aiSe: Record<string, unknown> = aiSeList[0] ?? {}

      const baStrengths = ((ba.strengths as string[]) ?? []).join('; ')
      const baRisks = ((ba.risks as string[]) ?? []).join('; ')
      const aiSeStrengths = ((aiSe.strengths as string[]) ?? []).join('; ')
      const aiSeVulns = ((aiSe.vulnerabilities as string[]) ?? []).join('; ')
      const catSummary = cats
        .map((c: Record<string, unknown>) => `${c.category_name ?? 'N/A'}: ${c.weighted_score ?? 0}/${c.max_score ?? 0}`)
        .join('; ')

      csvLines.push(
        toCsvRow([
          e.project_title ?? '',
          e.final_score ?? '',
          e.head_judge_verdict ?? '',
          ba.verdict ?? '',
          ba.total_raw ?? '',
          ba.weighted_final ?? '',
          aiSe.verdict ?? '',
          aiSe.total_raw ?? '',
          aiSe.weighted_final ?? '',
          e.summary ?? '',
          baStrengths,
          baRisks,
          aiSeStrengths,
          aiSeVulns,
          catSummary,
          e.doc_url ?? '',
          e.created_at ?? '',
        ])
      )
    }

    const csvContent = csvLines.join('\n')

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=all_submissions.csv',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any)?.message ?? JSON.stringify(err)
    return new Response(JSON.stringify({ error: `Error generating CSV: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
