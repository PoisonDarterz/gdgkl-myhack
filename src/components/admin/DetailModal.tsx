import type { EvaluationWithDetails } from '@/src/types/admin';

export function DetailModal({ evaluation, onClose }: { evaluation: EvaluationWithDetails, onClose: () => void }) {
  const ceo = evaluation.ceo_findings?.[0];
  const cto = evaluation.cto_findings?.[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-black/10 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-6 md:p-8">
          <div className="border-b border-black/10 pb-6 mb-6 pr-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">{evaluation.project_title}</h2>
            <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
              <span className="bg-black text-white px-3 py-1 rounded-md font-bold">
                SCORE: {evaluation.final_score}
              </span>
              <span className="text-black font-semibold border border-black/20 px-3 py-1 rounded-md tracking-wider">
                {evaluation.head_judge_verdict.replace(/_/g, ' ')}
              </span>
              {evaluation.doc_url && (
                <a href={evaluation.doc_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  View Document ↗
                </a>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-mono text-gray-500 text-sm font-bold uppercase tracking-widest mb-3">Executive Summary</h3>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-sm leading-relaxed text-gray-700">
              {evaluation.summary}
            </div>
          </div>

          {evaluation.category_scores && evaluation.category_scores.length > 0 && (
            <div className="mb-8">
              <h3 className="font-mono text-gray-500 text-sm font-bold uppercase tracking-widest mb-3">Category Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluation.category_scores.map(cat => (
                  <div key={cat.id} className="bg-white border text-sm border-gray-200 p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between font-bold mb-2">
                      <span className="capitalize">{cat.category_name}</span>
                      <span>{cat.weighted_score} / {cat.max_score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-3 overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${(cat.weighted_score / cat.max_score) * 100}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>CEO ({cat.ceo_score}): {cat.ceo_weight}</span>
                      <span>CTO ({cat.cto_score}): {cat.cto_weight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ceo && (
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm border-l-4 border-l-blue-500">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">👔 CEO Agent</h4>
                <div className="text-sm bg-gray-50 p-3 rounded-lg mb-4">
                  {ceo.consensus_summary}
                </div>
                <div className="mb-4">
                  <h5 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Strengths</h5>
                  <ul className="text-sm space-y-2">
                    {ceo.strengths?.map((s, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✅</span> {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Risks</h5>
                  <ul className="text-sm space-y-2">
                    {ceo.risks?.map((r, i) => <li key={i} className="flex gap-2"><span className="text-orange-500">⚠️</span> {r}</li>)}
                  </ul>
                </div>
              </div>
            )}
            
            {cto && (
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm border-l-4 border-l-purple-500">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">💻 CTO Agent</h4>
                <div className="text-sm bg-gray-50 p-3 rounded-lg mb-4">
                  {cto.consensus_summary}
                </div>
                <div className="mb-4">
                  <h5 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Strengths</h5>
                  <ul className="text-sm space-y-2">
                    {cto.strengths?.map((s, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✅</span> {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Vulnerabilities</h5>
                  <ul className="text-sm space-y-2">
                    {cto.vulnerabilities?.map((v, i) => <li key={i} className="flex gap-2"><span className="text-red-500">🔓</span> {v}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
