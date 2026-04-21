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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      return new Response(JSON.stringify({ evaluations: [] }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const evalIds = evals.map((e) => e.id)

    const [baRes, aiSeRes, catRes, insRes] = await Promise.all([
      supabase.from('ba_findings').select('*').in('evaluation_id', evalIds),
      supabase.from('ai_se_findings').select('*').in('evaluation_id', evalIds),
      supabase.from('category_scores').select('*').in('evaluation_id', evalIds),
      supabase.from('qualitative_insights').select('*').in('evaluation_id', evalIds),
    ])

    const baMap = groupByEvalId(baRes.data ?? [])
    const aiSeMap = groupByEvalId(aiSeRes.data ?? [])
    const catMap = groupByEvalId(catRes.data ?? [])
    const insMap = groupByEvalId(insRes.data ?? [])

    const combined = evals.map((e) => ({
      ...e,
      ba_findings: baMap[e.id] ?? [],
      ai_se_findings: aiSeMap[e.id] ?? [],
      category_scores: catMap[e.id] ?? [],
      qualitative_insights: insMap[e.id] ?? [],
    }))

    return new Response(JSON.stringify({ evaluations: combined }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any)?.message ?? JSON.stringify(err)
    return new Response(JSON.stringify({ error: `Error fetching results: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
