import { TableViewer } from '@/components/dashboard/TableViewer'

export default function EvaluationsPage() {
  return (
    <TableViewer
      table="evaluations"
      title="Evaluations"
      columns={['id', 'project_title', 'final_score', 'head_judge_verdict', 'summary', 'doc_url', 'created_at']}
      orderBy="created_at"
    />
  )
}
