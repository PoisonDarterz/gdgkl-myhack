import { TableViewer } from '@/components/dashboard/TableViewer'

export default function QualitativeInsightsPage() {
  return (
    <TableViewer
      table="qualitative_insights"
      title="Qualitative Insights"
      columns={['id', 'evaluation_id', 'agent_type', 'point_type', 'content', 'created_at']}
      orderBy="created_at"
    />
  )
}
