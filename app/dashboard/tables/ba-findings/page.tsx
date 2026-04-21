import { TableViewer } from '@/components/dashboard/TableViewer'

export default function BAFindingsPage() {
  return (
    <TableViewer
      table="ba_findings"
      title="BA Findings"
      columns={['id', 'evaluation_id', 'verdict', 'consensus_summary', 'fact_check_verdict', 'total_raw', 'weighted_final', 'created_at']}
      orderBy="created_at"
    />
  )
}
