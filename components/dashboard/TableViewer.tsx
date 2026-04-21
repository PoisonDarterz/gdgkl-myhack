'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'

interface TableViewerProps {
  table: string
  title: string
  columns: string[]
  orderBy?: string
}

type Row = Record<string, unknown>

function CellValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <span className="text-gray-300">—</span>
  if (typeof value === 'object') {
    const str = JSON.stringify(value)
    return (
      <span className="text-gray-500 max-w-[200px] block truncate" title={str}>
        {str}
      </span>
    )
  }
  const str = String(value)
  if (str.length > 80) {
    return <span className="max-w-[240px] block truncate" title={str}>{str}</span>
  }
  return <span>{str}</span>
}

export function TableViewer({ table, title, columns, orderBy = 'created_at' }: TableViewerProps) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const supabase = createClient()
        let query = supabase.from(table).select('*')
        if (columns.includes(orderBy)) {
          query = query.order(orderBy, { ascending: false })
        }
        const { data, error: dbError } = await query
        if (dbError) throw new Error(dbError.message)
        setRows(data ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
      setLoading(false)
    }
    load()
  }, [table, orderBy])

  const filtered = search.trim()
    ? rows.filter((row) =>
        Object.values(row).some((v) =>
          String(v ?? '').toLowerCase().includes(search.toLowerCase())
        )
      )
    : rows

  return (
    <div className="p-6 md:p-10 font-mono max-w-[1400px] mx-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-extrabold">{title}</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-0.5">
            {loading ? '…' : `${filtered.length} of ${rows.length} rows`}
          </p>
        </div>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-xs font-mono w-60"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 text-sm font-bold">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-3">--</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">No rows found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="bg-gray-50 border-b border-black/10">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr key={i} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                      {columns.map((col) => (
                        <td key={col} className="px-4 py-3 align-top">
                          <CellValue value={row[col]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
