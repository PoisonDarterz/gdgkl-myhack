import postgres from 'npm:postgres'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  const dbUrl = Deno.env.get('SUPABASE_DB_URL')
  if (!dbUrl) {
    return new Response(
      JSON.stringify({ error: 'SUPABASE_DB_URL secret not set.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  }

  let sql: ReturnType<typeof postgres> | null = null
  try {
    sql = postgres(dbUrl, { ssl: 'require', max: 1 })

    // TRUNCATE evaluations CASCADE clears all child tables via FK cascade:
    // ba_findings, ai_se_findings, category_scores, qualitative_insights
    await sql.unsafe(`
      TRUNCATE TABLE
        evaluations,
        evaluation_jobs
      CASCADE
    `)

    return new Response(
      JSON.stringify({
        status: 'ok',
        message: 'All tables cleared: evaluations, ba_findings, ai_se_findings, category_scores, qualitative_insights, evaluation_jobs.',
      }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any)?.message ?? JSON.stringify(err)
    return new Response(JSON.stringify({ error: `Reset error: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } finally {
    await sql?.end()
  }
})
