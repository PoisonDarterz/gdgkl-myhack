'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/src/lib/supabase/client'

// ─── Types ───────────────────────────────────────────────────────────────────

type RowStatus = 'pending' | 'running' | 'done' | 'error'

interface TeamRow {
  index: number
  teamName: string
  github: string
  docs: string
  status: RowStatus
  score: number | null
  evaluation: EvaluationDetail | null
}

interface EvaluationDetail {
  id: string
  project_title: string
  head_judge_verdict: string
  final_score: number
  summary: string
  calculation_breakdown: Record<string, unknown>
  ba_findings: BAFinding[]
  ai_se_findings: AISEFinding[]
  category_scores: CategoryScore[]
  qualitative_insights: QualitativeInsight[]
}

interface BAFinding {
  id: string
  verdict: string
  consensus_summary: string
  fact_check_verdict: string
  scores: Record<string, number>
  total_raw: number
  weighted_final: number
  strengths: string[]
  risks: string[]
}

interface AISEFinding {
  id: string
  verdict: string
  consensus_summary: string
  conflict_resolved: string
  scores: Record<string, number>
  total_raw: number
  weighted_final: number
  strengths: string[]
  vulnerabilities: string[]
}

interface CategoryScore {
  id: string
  category_name: string
  ba_score: number
  ai_se_score: number
  ba_weight: string
  ai_se_weight: string
  dominant_judge: string
  weighted_score: number
  max_score: number
}

interface QualitativeInsight {
  id: string
  agent_type: string
  point_type: string
  content: string
}

// ─── CSV Parser ──────────────────────────────────────────────────────────────

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        row.push(cell)
        cell = ''
      } else if (ch === '\r' && next === '\n') {
        row.push(cell)
        cell = ''
        rows.push(row)
        row = []
        i++
      } else if (ch === '\n' || ch === '\r') {
        row.push(cell)
        cell = ''
        rows.push(row)
        row = []
      } else {
        cell += ch
      }
    }
  }

  // Last cell/row
  row.push(cell)
  if (row.some((c) => c.trim())) rows.push(row)

  return rows
}

// ─── Helper: extract sheet ID from URL ───────────────────────────────────────

function extractSheetId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: RowStatus }) {
  const styles: Record<RowStatus, string> = {
    pending: 'bg-gray-100 text-gray-500 border-gray-200',
    running: 'bg-blue-50 text-blue-600 border-blue-200',
    done: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-600 border-red-200',
  }
  const labels: Record<RowStatus, string> = {
    pending: 'Pending',
    running: 'Running...',
    done: 'Done',
    error: 'Error',
  }
  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border ${styles[status]}`}>
      {status === 'running' && (
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-1" />
      )}
      {labels[status]}
    </span>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  evaluation,
  onClose,
}: {
  evaluation: EvaluationDetail
  onClose: () => void
}) {
  const ba = evaluation.ba_findings?.[0]
  const aiSe = evaluation.ai_se_findings?.[0]

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-3xl bg-white border border-black/10 rounded-2xl shadow-xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <div>
            <h2 className="text-lg font-extrabold">{evaluation.project_title}</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-0.5">
              Evaluation Details
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-black/10 hover:bg-gray-50 text-gray-400 hover:text-black transition-all font-bold text-lg"
            aria-label="Close"
          >
            x
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Score + Verdict */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px] bg-gray-50 border border-black/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-extrabold">{evaluation.final_score?.toFixed(1) ?? 'N/A'}</div>
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-1">Final Score</div>
            </div>
            <div className="flex-1 min-w-[200px] bg-gray-50 border border-black/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Head Judge Verdict</div>
              <div className="text-sm font-bold">{evaluation.head_judge_verdict || 'N/A'}</div>
            </div>
          </div>

          {/* Executive Summary */}
          {evaluation.summary && (
            <div className="bg-gray-50 border border-black/10 rounded-xl p-4">
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Executive Summary</div>
              <p className="text-sm text-gray-700 leading-relaxed">{evaluation.summary}</p>
            </div>
          )}

          {/* BA Findings */}
          {ba && (
            <div className="border border-black/10 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-black/10">
                <span className="text-xs uppercase tracking-widest font-bold">BA Findings</span>
                <span className="ml-3 text-xs text-gray-500">Score: {ba.weighted_final?.toFixed(1)} | Verdict: {ba.verdict}</span>
              </div>
              <div className="p-4 space-y-3">
                {ba.consensus_summary && (
                  <p className="text-sm text-gray-600">{ba.consensus_summary}</p>
                )}
                {ba.strengths?.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Strengths</div>
                    <ul className="space-y-1">
                      {ba.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-green-500 mt-0.5">+</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {ba.risks?.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Risks</div>
                    <ul className="space-y-1">
                      {ba.risks.map((r, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-red-400 mt-0.5">-</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI SE Findings */}
          {aiSe && (
            <div className="border border-black/10 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-black/10">
                <span className="text-xs uppercase tracking-widest font-bold">AI SE Findings</span>
                <span className="ml-3 text-xs text-gray-500">Score: {aiSe.weighted_final?.toFixed(1)} | Verdict: {aiSe.verdict}</span>
              </div>
              <div className="p-4 space-y-3">
                {aiSe.consensus_summary && (
                  <p className="text-sm text-gray-600">{aiSe.consensus_summary}</p>
                )}
                {aiSe.strengths?.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Strengths</div>
                    <ul className="space-y-1">
                      {aiSe.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-green-500 mt-0.5">+</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {aiSe.vulnerabilities?.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Vulnerabilities</div>
                    <ul className="space-y-1">
                      {aiSe.vulnerabilities.map((v, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-orange-400 mt-0.5">!</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Category Scores */}
          {evaluation.category_scores?.length > 0 && (
            <div className="border border-black/10 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-black/10">
                <span className="text-xs uppercase tracking-widest font-bold">Category Scores</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left px-4 py-2 font-bold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-500 uppercase tracking-wider">BA</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-500 uppercase tracking-wider">AI SE</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-500 uppercase tracking-wider">Weighted</th>
                      <th className="text-right px-4 py-2 font-bold text-gray-500 uppercase tracking-wider">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluation.category_scores.map((cat) => (
                      <tr key={cat.id} className="border-b border-black/5 hover:bg-gray-50">
                        <td className="px-4 py-2 font-bold">{cat.category_name}</td>
                        <td className="px-4 py-2 text-right">{cat.ba_score}</td>
                        <td className="px-4 py-2 text-right">{cat.ai_se_score}</td>
                        <td className="px-4 py-2 text-right font-bold">{cat.weighted_score?.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right text-gray-400">{cat.max_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function JudgePage() {
  const [sheetUrl, setSheetUrl] = useState('')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<TeamRow[]>([])
  const [runningAll, setRunningAll] = useState(false)
  const [runProgress, setRunProgress] = useState<{ current: number; total: number } | null>(null)
  const [selectedEval, setSelectedEval] = useState<EvaluationDetail | null>(null)
  const [resetState, setResetState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [resetMsg, setResetMsg] = useState<string | null>(null)
  const [csvState, setCsvState] = useState<'idle' | 'loading'>('idle')

  // ── Load Sheet ──────────────────────────────────────────────────────────────

  const handleLoadSheet = useCallback(async () => {
    if (!sheetUrl.trim()) {
      setLoadError('Please enter a Google Sheet URL.')
      return
    }

    const sheetId = extractSheetId(sheetUrl.trim())
    if (!sheetId) {
      setLoadError('Invalid Google Sheet URL. Could not extract sheet ID.')
      return
    }

    setLoadError(null)
    setLoading(true)
    setRows([])

    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
      const res = await fetch(csvUrl)
      if (!res.ok) {
        setLoadError(`Failed to fetch sheet (HTTP ${res.status}). Ensure the sheet is set to "Anyone with the link can view".`)
        setLoading(false)
        return
      }

      const text = await res.text()
      if (text.startsWith('Error')) {
        setLoadError(text)
        setLoading(false)
        return
      }

      const allRows = parseCsv(text)
      if (allRows.length < 2) {
        setLoadError('Sheet appears to be empty or has no data rows.')
        setLoading(false)
        return
      }

      // Skip header row, filter rows with a team name at col 10
      const teamRows: TeamRow[] = []
      allRows.slice(1).forEach((row, idx) => {
        while (row.length < 51) row.push('')
        const teamName = (row[10] ?? '').trim()
        if (!teamName) return

        teamRows.push({
          index: idx + 1,
          teamName,
          github: (row[6] ?? '').trim(),
          docs: (row[8] ?? '').trim(),
          status: 'pending',
          score: null,
          evaluation: null,
        })
      })

      if (teamRows.length === 0) {
        setLoadError('No valid team rows found. Ensure team names are in column K (index 10).')
        setLoading(false)
        return
      }

      setRows(teamRows)
    } catch (err) {
      setLoadError(`Fetch error: ${err instanceof Error ? err.message : String(err)}`)
    }

    setLoading(false)
  }, [sheetUrl])

  // ── Run single team ─────────────────────────────────────────────────────────

  const runTeam = useCallback(async (teamName: string): Promise<void> => {
    const supabase = createClient()

    // Update status to running
    setRows((prev) =>
      prev.map((r) => (r.teamName === teamName ? { ...r, status: 'running' } : r))
    )

    try {
      // Invoke the judge edge function
      const { data: invokeData, error: invokeError } = await supabase.functions.invoke('judge', {
        body: { sheet_url: sheetUrl.trim(), team_name: teamName },
      })

      if (invokeError) {
        throw new Error(invokeError.message)
      }

      const jobId: string | undefined = invokeData?.job_id

      // Poll evaluation_jobs until running: false
      let attempts = 0
      const maxAttempts = 120 // 4 min at 2s intervals
      while (attempts < maxAttempts) {
        await new Promise((res) => setTimeout(res, 2000))
        attempts++

        if (jobId) {
          const { data: job } = await supabase
            .from('evaluation_jobs')
            .select('running, error_detail, completed_teams')
            .eq('id', jobId)
            .single()

          if (job && !job.running) {
            const hasError = (job.completed_teams ?? []).some((t: string) =>
              t.toLowerCase().includes('error')
            )
            if (job.error_detail || hasError) {
              throw new Error(job.error_detail ?? 'Evaluation failed with an error.')
            }
            break
          }
        } else {
          // No job_id, wait a bit longer then fetch result
          if (attempts >= 10) break
        }
      }

      // Fetch evaluation result from DB
      const { data: evalData, error: evalError } = await supabase
        .from('evaluations')
        .select('*, ba_findings(*), ai_se_findings(*), category_scores(*), qualitative_insights(*)')
        .eq('project_title', teamName)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (evalError || !evalData) {
        throw new Error(evalError?.message ?? 'Could not fetch evaluation result.')
      }

      setRows((prev) =>
        prev.map((r) =>
          r.teamName === teamName
            ? { ...r, status: 'done', score: evalData.final_score ?? null, evaluation: evalData as EvaluationDetail }
            : r
        )
      )
    } catch (err) {
      console.error(`Error evaluating ${teamName}:`, err)
      setRows((prev) =>
        prev.map((r) => (r.teamName === teamName ? { ...r, status: 'error' } : r))
      )
    }
  }, [sheetUrl])

  // ── Run All ─────────────────────────────────────────────────────────────────

  const handleRunAll = useCallback(async () => {
    if (runningAll || rows.length === 0) return

    const pendingRows = rows.filter((r) => r.status === 'pending' || r.status === 'error')
    if (pendingRows.length === 0) return

    setRunningAll(true)
    setRunProgress({ current: 0, total: pendingRows.length })

    for (let i = 0; i < pendingRows.length; i++) {
      setRunProgress({ current: i + 1, total: pendingRows.length })
      await runTeam(pendingRows[i].teamName)
    }

    setRunningAll(false)
    setRunProgress(null)
  }, [runningAll, rows, runTeam])

  // ── Reset DB ────────────────────────────────────────────────────────────────

  const handleResetDb = useCallback(async () => {
    if (!window.confirm('This will permanently delete all evaluations and jobs. Are you sure?')) return
    setResetState('loading')
    setResetMsg(null)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.functions.invoke('reset-db', { method: 'POST' })
      if (error) throw new Error(error.message)
      setResetState('done')
      setResetMsg(data?.message ?? 'Database cleared.')
      setRows([])
    } catch (err) {
      setResetState('error')
      setResetMsg(err instanceof Error ? err.message : String(err))
    }
  }, [])

  // ── Download CSV ────────────────────────────────────────────────────────────

  const handleDownloadCsv = useCallback(async () => {
    setCsvState('loading')
    try {
      const supabase = createClient()
      const { data, error } = await supabase.functions.invoke('download-csv', {
        method: 'GET',
      })
      if (error) throw new Error(error.message)
      const blob = new Blob([data instanceof Blob ? await data.text() : String(data)], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'all_submissions.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert(`CSV download failed: ${err instanceof Error ? err.message : String(err)}`)
    }
    setCsvState('idle')
  }, [])

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black p-6 md:p-10 font-mono max-w-[1440px] mx-auto">

      {/* Action Toolbar */}
      <section className="bg-white border border-black/10 rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard/results"
          className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-700 transition-all text-xs uppercase tracking-widest"
        >
          Results
        </Link>
        <button
          onClick={handleDownloadCsv}
          disabled={csvState === 'loading'}
          className="px-5 py-2.5 bg-white border border-black/20 text-black font-bold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 text-xs uppercase tracking-widest flex items-center gap-2"
        >
          {csvState === 'loading' ? (
            <><span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />Downloading...</>
          ) : 'Download CSV'}
        </button>
        <button
          onClick={handleResetDb}
          disabled={resetState === 'loading'}
          className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-700 font-bold rounded-xl hover:bg-red-100 transition-all disabled:opacity-50 text-xs uppercase tracking-widest flex items-center gap-2 ml-auto"
        >
          {resetState === 'loading' ? (
            <><span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />Resetting...</>
          ) : 'Reset DB'}
        </button>
        {resetMsg && (
          <p className={`w-full text-xs font-bold ${resetState === 'error' ? 'text-red-600' : 'text-green-700'}`}>
            {resetMsg}
          </p>
        )}
      </section>

      {/* Sheet Input */}
      <section className="bg-white border border-black/10 rounded-2xl shadow-sm p-6 md:p-8 mb-6">
        <h2 className="text-base font-bold mb-1">Load Google Sheet</h2>
        <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">
          Paste a public Google Sheet URL to load team submissions
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="url"
            placeholder="https://docs.google.com/spreadsheets/d/..."
            value={sheetUrl}
            onChange={(e) => { setSheetUrl(e.target.value); setLoadError(null) }}
            disabled={loading || runningAll}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all text-sm disabled:opacity-60"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLoadSheet() }}
          />
          <button
            onClick={handleLoadSheet}
            disabled={loading || runningAll || !sheetUrl.trim()}
            className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:hover:bg-black whitespace-nowrap text-xs uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              'Load Sheet'
            )}
          </button>
        </div>

        {loadError && (
          <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold">
            {loadError}
          </div>
        )}
      </section>

      {/* Run Controls + Table */}
      {rows.length > 0 && (
        <>
          {/* Run Controls */}
          <section className="bg-white border border-black/10 rounded-2xl shadow-sm p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleRunAll}
                disabled={runningAll || rows.every((r) => r.status === 'done')}
                className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:hover:bg-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                {runningAll ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  'Run All'
                )}
              </button>
              {runProgress && (
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Evaluating team {runProgress.current} of {runProgress.total}...
                </span>
              )}
            </div>
            <div className="flex gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
              <span>{rows.filter((r) => r.status === 'done').length} done</span>
              <span>/</span>
              <span>{rows.length} total</span>
            </div>
          </section>

          {/* Sheet Visualizer Table */}
          <section className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between">
              <h2 className="text-base font-bold">Submissions ({rows.length})</h2>
              {runningAll && runProgress && (
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(runProgress.current / runProgress.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-black/10 bg-gray-50">
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider w-10">#</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">Team Name</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">GitHub</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">Docs</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="text-right px-4 py-3 font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.teamName} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{row.index}</td>
                      <td className="px-4 py-3 font-bold">{row.teamName}</td>
                      <td className="px-4 py-3">
                        {row.github ? (
                          <a
                            href={row.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate max-w-[160px] inline-block"
                          >
                            GitHub
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {row.docs ? (
                          <a
                            href={row.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate max-w-[160px] inline-block"
                          >
                            Docs
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3 text-right font-bold">
                        {row.score !== null ? (
                          <span className="text-sm">{row.score.toFixed(1)}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {row.status === 'done' && row.evaluation && (
                            <button
                              onClick={() => setSelectedEval(row.evaluation)}
                              className="px-3 py-1.5 bg-white border border-black/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                            >
                              View Details
                            </button>
                          )}
                          {row.status === 'pending' && (
                            <button
                              onClick={() => runTeam(row.teamName)}
                              disabled={runningAll}
                              className="px-3 py-1.5 bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                              Run
                            </button>
                          )}
                          {row.status === 'error' && (
                            <button
                              onClick={() => runTeam(row.teamName)}
                              disabled={runningAll}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                              Retry
                            </button>
                          )}
                          {row.status === 'running' && (
                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">
                              Running...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Empty state */}
      {!loading && rows.length === 0 && !loadError && (
        <div className="bg-white border border-black/10 rounded-2xl shadow-sm p-12 text-center">
          <div className="text-4xl mb-4">--</div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            Enter a Google Sheet URL above to load team submissions
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEval && (
        <DetailModal
          evaluation={selectedEval}
          onClose={() => setSelectedEval(null)}
        />
      )}
    </div>
  )
}
