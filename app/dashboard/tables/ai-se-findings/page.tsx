import { TableViewer } from '@/components/dashboard/TableViewer'

export default function AISEFindingsPage() {
  return (
    <TableViewer
      table="ai_se_findings"
      title="AI SE Findings"
      columns={['id', 'evaluation_id', 'verdict', 'consensus_summary', 'conflict_resolved', 'total_raw', 'weighted_final', 'created_at']}
      orderBy="created_at"
    />
  )
}
