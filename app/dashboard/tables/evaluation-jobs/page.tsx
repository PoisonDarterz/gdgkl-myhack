import { TableViewer } from '@/components/dashboard/TableViewer'

export default function EvaluationJobsPage() {
  return (
    <TableViewer
      table="evaluation_jobs"
      title="Evaluation Jobs"
      columns={['id', 'running', 'message', 'progress', 'total', 'completed_teams', 'error_detail', 'created_at']}
      orderBy="created_at"
    />
  )
}
