import type { EvaluationWithDetails } from '@/src/types/admin';

interface ResultsTableProps {
  evaluations: EvaluationWithDetails[];
  filter: string;
  searchTerm: string;
  onRowClick: (e: EvaluationWithDetails) => void;
}

export function ResultsTable({ evaluations, filter, searchTerm, onRowClick }: ResultsTableProps) {
  const filtered = evaluations.filter((e) => {
    if (searchTerm) {
      if (!e.project_title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
    }
    if (filter === 'head_judge') return e.head_judge_verdict !== 'N/A';
    if (filter === 'ceo_only') return e.ceo_findings?.length > 0;
    if (filter === 'cto_only') return e.cto_findings?.length > 0;
    return true;
  });

  if (filtered.length === 0) {
    return <div className="text-center py-20 text-gray-500 font-mono">No evaluations found.</div>;
  }

  const getBadgeClass = (verdict: string) => {
    switch (verdict) {
      case 'First Class': return 'bg-green-100 text-green-700 border-green-200';
      case '2nd Class': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'HONORABLE_MENTION': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'ELIMINATED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full overflow-x-auto border border-black/10 rounded-xl bg-white shadow-sm scrollbar-hide">
      <table className="w-full text-left text-sm border-collapse min-w-[700px]">
        <thead className="bg-gray-50 text-gray-500 font-mono text-xs uppercase tracking-wider border-b border-black/10">
          <tr>
            <th className="p-4 font-semibold text-center w-12">#</th>
            <th className="p-4 font-semibold">Project Title</th>
            <th className="p-4 font-semibold text-center">Score</th>
            <th className="p-4 font-semibold">Verdict</th>
            <th className="p-4 font-semibold hidden md:table-cell">Summary</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {filtered.map((e, idx) => (
            <tr 
              key={e.id} 
              onClick={() => onRowClick(e)}
              className="hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <td className="p-4 text-center font-mono text-gray-400 group-hover:text-black">{idx + 1}</td>
              <td className="p-4 font-bold text-black">{e.project_title || 'Unknown Project'}</td>
              <td className="p-4 text-center font-mono font-bold text-lg">{e.final_score}</td>
              <td className="p-4 line-clamp-1 truncate w-max">
                <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${getBadgeClass(e.head_judge_verdict)}`}>
                  {e.head_judge_verdict.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="p-4 text-gray-500 text-xs hidden md:table-cell max-w-[200px] lg:max-w-sm truncate">
                {e.summary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
