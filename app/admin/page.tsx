'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/src/lib/supabaseClient';
import type { EvaluationWithDetails, FilterMode } from '@/src/types/admin';
import { AdminAuth } from '@/src/components/admin/AdminAuth';
import { StatsOverview } from '@/src/components/admin/StatsOverview';
import { ResultsTable } from '@/src/components/admin/ResultsTable';
import { DetailModal } from '@/src/components/admin/DetailModal';

const API_BASE = 'http://localhost:8000';

interface EvalStatus {
  running: boolean;
  message: string;
  progress: number;
  total: number;
  completed_teams: string[];
  error: string | null;
}

export default function AdminPage() {
  const [evaluations, setEvaluations] = useState<EvaluationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<EvaluationWithDetails | null>(null);

  const [sheetUrl, setSheetUrl] = useState('');
  const [evalStatus, setEvalStatus] = useState<EvalStatus | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchEvaluations();
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function fetchEvaluations() {
    setLoading(true);
    try {
      const { data: evals, error: evalErr } = await supabase
        .from('evaluations')
        .select('*')
        .order('created_at', { ascending: false });

      if (evalErr) throw evalErr;
      if (!evals || evals.length === 0) {
        setEvaluations([]);
        setLoading(false);
        return;
      }

      const evalIds = evals.map((e) => e.id);

      const [ceoRes, ctoRes, catRes, insRes] = await Promise.all([
        supabase.from('ceo_findings').select('*').in('evaluation_id', evalIds),
        supabase.from('cto_findings').select('*').in('evaluation_id', evalIds),
        supabase.from('category_scores').select('*').in('evaluation_id', evalIds),
        supabase.from('qualitative_insights').select('*').in('evaluation_id', evalIds),
      ]);

      const ceoMap = groupBy(ceoRes.data || [], 'evaluation_id');
      const ctoMap = groupBy(ctoRes.data || [], 'evaluation_id');
      const catMap = groupBy(catRes.data || [], 'evaluation_id');
      const insMap = groupBy(insRes.data || [], 'evaluation_id');

      const combined: EvaluationWithDetails[] = evals.map((e) => ({
        ...e,
        ceo_findings: ceoMap[e.id] || [],
        cto_findings: ctoMap[e.id] || [],
        category_scores: catMap[e.id] || [],
        qualitative_insights: insMap[e.id] || [],
      }));

      setEvaluations(combined);
    } catch (err) {
      console.error('Error fetching evaluations:', err);
    }
    setLoading(false);
  }

  function groupBy<T extends Record<string, unknown>>(arr: T[], key: string): Record<string, T[]> {
    return arr.reduce((acc, item) => {
      const k = item[key] as string;
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }

  async function handleStartEvaluation() {
    if (!sheetUrl.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/judge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet_url: sheetUrl.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || 'Failed to start evaluation.');
        setSubmitting(false);
        return;
      }

      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API_BASE}/status`);
          const status: EvalStatus = await statusRes.json();
          setEvalStatus(status);

          if (!status.running) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = null;
            setSubmitting(false);
            fetchEvaluations();
          }
        } catch {
          // Keep polling
        }
      }, 3000);

      setEvalStatus({
        running: true,
        message: 'Starting evaluation...',
        progress: 0,
        total: 0,
        completed_teams: [],
        error: null,
      });
    } catch (err) {
      alert('Could not connect to the API server. Make sure the backend is running on port 8000.');
      setSubmitting(false);
    }
  }

  const handleDownloadCSV = () => {
    window.location.href = `${API_BASE}/download-csv`;
  };

  const filterButtons: { label: string; value: FilterMode; icon: string }[] = [
    { label: 'All', value: 'all', icon: '🔍' },
    { label: 'Head Judge', value: 'head_judge', icon: '⚖️' },
    { label: 'CEO Judge', value: 'ceo_only', icon: '👔' },
    { label: 'CTO Judge', value: 'cto_only', icon: '💻' }
  ];

  return (
    <AdminAuth>
      <div className="min-h-[90vh] bg-[#F5F5F5] text-black p-6 md:p-12 font-sans max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-3 font-sans pb-1">
              <span className="text-4xl">⚖️</span>
              AI Judge Dashboard
            </h1>
            <p className="text-gray-500 font-mono tracking-widest text-sm mt-1 uppercase font-bold">Triple-Agent Internal Tool</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchEvaluations}
              className="px-4 py-2 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow-md transition-all font-mono text-xs uppercase font-bold"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 transition-all font-mono text-xs uppercase font-bold flex items-center gap-2"
            >
              📥 Download CSV
            </button>
          </div>
        </header>

        <section className="bg-white border border-black/10 p-6 md:p-8 rounded-2xl shadow-sm mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/5 to-black/0 -translate-x-full group-hover:duration-1000 group-hover:transition-transform group-hover:translate-x-full pointer-events-none" />
          <h2 className="text-lg font-bold mb-2">📄 Submit Google Sheet for Evaluation</h2>
          <p className="text-sm text-gray-500 mb-4 font-mono">Paste your public Google Sheet URL below to begin evaluating submissions.</p>
          
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="url"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              disabled={submitting}
            />
            <button
              onClick={handleStartEvaluation}
              disabled={submitting || !sheetUrl.trim()}
              className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:hover:bg-black whitespace-nowrap flex items-center justify-center gap-2 font-mono tracking-widest"
            >
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Evaluating...</>
              ) : (
                <>🚀 START</>
              )}
            </button>
          </div>

          {evalStatus && (evalStatus.running || evalStatus.error) && (
            <div className={`mt-6 p-5 rounded-xl border ${evalStatus.error ? 'border-red-200 bg-red-50' : 'border-black/10 bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm font-mono">
                  {evalStatus.error ? `❌ ${evalStatus.error}` : `⏳ ${evalStatus.message}`}
                </span>
                {evalStatus.total > 0 && <span className="font-mono text-sm font-bold text-gray-500">{evalStatus.progress} / {evalStatus.total}</span>}
              </div>
              {evalStatus.total > 0 && (
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-black transition-all duration-300" style={{ width: `${(evalStatus.progress / evalStatus.total) * 100}%` }} />
                </div>
              )}
              {evalStatus.completed_teams.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {evalStatus.completed_teams.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-white border border-black/10 rounded-md text-xs font-mono font-bold">
                      {t.includes('ERROR') ? '❌' : '✅'} {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {evalStatus && !evalStatus.running && !evalStatus.error && evalStatus.completed_teams.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 font-semibold rounded-xl text-sm flex items-center gap-2 font-mono">
              ✅ Evaluation complete! The results are visible below.
            </div>
          )}
        </section>

        <StatsOverview evaluations={evaluations} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-2 border rounded-lg font-mono tracking-widest text-[10px] font-bold uppercase transition-colors ${filter === btn.value ? 'bg-black text-white border-black' : 'bg-white border-black/20 text-gray-600 hover:bg-gray-50'}`}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-sm font-mono"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin" />
            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest font-bold">Loading evaluations...</p>
          </div>
        ) : (
          <ResultsTable
            evaluations={evaluations}
            filter={filter}
            searchTerm={searchTerm}
            onRowClick={setSelected}
          />
        )}

        {selected && <DetailModal evaluation={selected} onClose={() => setSelected(null)} />}
      </div>
    </AdminAuth>
  );
}
