import { TableViewer } from '@/components/dashboard/TableViewer'

export default function CategoryScoresPage() {
  return (
    <TableViewer
      table="category_scores"
      title="Category Scores"
      columns={['id', 'evaluation_id', 'category_name', 'ba_score', 'ai_se_score', 'ba_weight', 'ai_se_weight', 'dominant_judge', 'weighted_score', 'max_score', 'created_at']}
      orderBy="created_at"
    />
  )
}
