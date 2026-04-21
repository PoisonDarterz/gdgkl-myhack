'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'

interface Evaluation {
  id: string
  project_title: string
  head_judge_verdict: string
  final_score: number | null
  summary: string
  doc_url: string
  created_at: string
  ba_findings: { verdict: string; weighted_final: number }[]
  ai_se_findings: { verdict: string; weighted_final: number }[]
  category_scores: { category_name: string; weighted_score: number; max_score: number }[]
  qualitative_insights: { agent_type: string; point_type: string; content: string }[]
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-gray-300">—</span>
  const color = score >= 70 ? 'text-green-700 bg-green-50 border-green-200' : score >= 50 ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-red-700 bg-red-50 border-red-200'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-lg border font-extrabold text-sm ${color}`}>
      {score.toFixed(1)}
    </span>
  )
}

function EvalCard({ evaluation }: { evaluation: Evaluation }) {
  const [open, setOpen] = useState(false)
  const ba = evaluation.ba_findings?.[0]
  const aiSe = evaluation.ai_se_findings?.[0]

  return (
    <div className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <ScoreBadge score={evaluation.final_score} />
          <div className="min-w-0">
            <p className="font-extrabold text-sm truncate">{evaluation.project_title || 'Untitled'}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
              {evaluation.head_judge_verdict || 'No verdict'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] text-gray-400 font-bold hidden md:inline">
            {new Date(evaluation.created_at).toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">{open ? '▾' : '▸'}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-black/10 p-6 space-y-4">
          {evaluation.summary && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed">{evaluation.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {ba && (
              <div className="border border-black/10 rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">BA</p>
                <p className="text-sm font-bold">{ba.weighted_final?.toFixed(1)} pts</p>
                <p className="text-[10px] text-gray-500">{ba.verdict}</p>
              </div>
            )}
            {aiSe && (
              <div className="border border-black/10 rounded-xl p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">AI SE</p>
                <p className="text-sm font-bold">{aiSe.weighted_final?.toFixed(1)} pts</p>
                <p className="text-[10px] text-gray-500">{aiSe.verdict}</p>
              </div>
            )}
          </div>

          {evaluation.category_scores?.length > 0 && (
            <div className="border border-black/10 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-black/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category Scores</span>
              </div>
              <div className="divide-y divide-black/5">
                {evaluation.category_scores.map((cat) => (
                  <div key={cat.category_name} className="flex items-center justify-between px-4 py-2 text-xs">
                    <span className="font-bold">{cat.category_name}</span>
                    <span className="text-gray-500">{cat.weighted_score?.toFixed(2)} / {cat.max_score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {evaluation.doc_url && (
            <a
              href={evaluation.doc_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              View Docs ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function ResultsPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      setLoading(true)
      setError(null)
      try {
        const supabase = createClient()
        const { data, error: fnError } = await supabase.functions.invoke('results', { method: 'GET' })
        if (fnError) throw new Error(fnError.message)
        setEvaluations(data?.evaluations ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
      setLoading(false)
    }
    fetchResults()
  }, [])

  const avg = evaluations.length > 0
    ? evaluations.reduce((sum, e) => sum + (e.final_score ?? 0), 0) / evaluations.length
    : null

  return (
    <div className="p-6 md:p-10 font-mono max-w-[1200px] mx-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-extrabold">Results</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-0.5">
            All stored evaluations
          </p>
        </div>
        {evaluations.length > 0 && (
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-extrabold">{evaluations.length}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Teams</p>
            </div>
            {avg !== null && (
              <div className="text-center">
                <p className="text-2xl font-extrabold">{avg.toFixed(1)}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg Score</p>
              </div>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 text-sm font-bold">
          {error}
        </div>
      )}

      {!loading && !error && evaluations.length === 0 && (
        <div className="bg-white border border-black/10 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">--</p>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            No evaluations found. Run some judges first.
          </p>
        </div>
      )}

      {!loading && evaluations.length > 0 && (
        <div className="space-y-3">
          {evaluations.map((ev) => (
            <EvalCard key={ev.id} evaluation={ev} />
          ))}
        </div>
      )}
    </div>
  )
}
