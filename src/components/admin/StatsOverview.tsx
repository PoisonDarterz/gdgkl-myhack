import type { EvaluationWithDetails } from '@/src/types/admin';

export function StatsOverview({ evaluations }: { evaluations: EvaluationWithDetails[] }) {
  const total = evaluations.length;
  const avgScore = total > 0 ? (evaluations.reduce((sum, e) => sum + e.final_score, 0) / total).toFixed(1) : '0';

  const verdictCounts: Record<string, number> = {};
  evaluations.forEach((e) => {
    const v = e.head_judge_verdict;
    verdictCounts[v] = (verdictCounts[v] || 0) + 1;
  });

  const getVerdictLabel = (val: string) => val.replace(/_/g, ' ');

  const getVerdictEmoji = (val: string) => {
    if (val === 'First Class') return '🏆';
    if (val === '2nd Class') return '🥈';
    if (val === 'HONORABLE_MENTION') return '🏅';
    return '❌';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-[140px] flex flex-col items-center justify-center p-6 bg-white border border-black/10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="text-2xl mb-2">📊</div>
        <div className="text-3xl font-extrabold text-black mb-1">{total}</div>
        <div className="text-[10px] font-mono uppercase text-gray-500 font-bold tracking-widest">Total Projects</div>
      </div>
      <div className="flex-1 min-w-[140px] flex flex-col items-center justify-center p-6 bg-white border border-black/10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="text-2xl mb-2">🎯</div>
        <div className="text-3xl font-extrabold text-black mb-1">{avgScore}</div>
        <div className="text-[10px] font-mono uppercase text-gray-500 font-bold tracking-widest">Avg Score</div>
      </div>
      {Object.entries(verdictCounts).map(([verdict, count]) => (
        <div key={verdict} className="flex-1 min-w-[140px] flex flex-col items-center justify-center p-6 bg-white border-l-4 border-l-black border-y border-r border-y-black/10 border-r-black/10 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">{getVerdictEmoji(verdict)}</div>
          <div className="text-3xl font-extrabold text-black mb-1">{count}</div>
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold tracking-widest text-center">{getVerdictLabel(verdict)}</div>
        </div>
      ))}
    </div>
  );
}
