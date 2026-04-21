import postgres from 'npm:postgres'

const SETUP_SQL = `
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_url TEXT,
    project_title TEXT,
    head_judge_verdict TEXT,
    final_score NUMERIC,
    summary TEXT,
    calculation_breakdown JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS ba_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    verdict TEXT,
    consensus_summary TEXT,
    fact_check_verdict TEXT,
    scores JSONB,
    total_raw NUMERIC,
    weighted_final NUMERIC,
    strengths JSONB,
    risks JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS ai_se_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    verdict TEXT,
    consensus_summary TEXT,
    conflict_resolved TEXT,
    scores JSONB,
    total_raw NUMERIC,
    weighted_final NUMERIC,
    strengths JSONB,
    vulnerabilities JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS category_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    category_name TEXT,
    ba_score NUMERIC,
    ai_se_score NUMERIC,
    ba_weight TEXT,
    ai_se_weight TEXT,
    dominant_judge TEXT,
    weighted_score NUMERIC,
    max_score NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS qualitative_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    agent_type TEXT,
    point_type TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS evaluation_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    running BOOLEAN DEFAULT false,
    message TEXT DEFAULT '',
    progress INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    completed_teams JSONB DEFAULT '[]',
    error_detail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
`

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

  const dbUrl = Deno.env.get('SUPABASE_DB_URL')
  if (!dbUrl) {
    return new Response(
      JSON.stringify({ error: 'SUPABASE_DB_URL secret not set. Add it in Supabase Dashboard → Edge Functions → Secrets.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  }

  let sql: ReturnType<typeof postgres> | null = null
  try {
    sql = postgres(dbUrl, { ssl: 'require', max: 1 })
    await sql.unsafe(SETUP_SQL)
    return new Response(
      JSON.stringify({ status: 'ok', message: 'All tables created (or already existed).' }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any)?.message ?? JSON.stringify(err)
    return new Response(JSON.stringify({ error: `DB setup error: ${msg}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } finally {
    await sql?.end()
  }
})
