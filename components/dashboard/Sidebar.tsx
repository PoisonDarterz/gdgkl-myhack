'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from './SignOutButton'

const NAV_ITEMS = [
  { label: 'Judge', href: '/dashboard/judge', icon: '⚖' },
  { label: 'Results', href: '/dashboard/results', icon: '📊' },
]

const TABLE_ITEMS = [
  { label: 'Evaluations', href: '/dashboard/tables/evaluations', icon: '📋' },
  { label: 'BA Findings', href: '/dashboard/tables/ba-findings', icon: '📁' },
  { label: 'AI SE Findings', href: '/dashboard/tables/ai-se-findings', icon: '🤖' },
  { label: 'Category Scores', href: '/dashboard/tables/category-scores', icon: '🏆' },
  { label: 'Qualitative', href: '/dashboard/tables/qualitative-insights', icon: '💡' },
  { label: 'Eval Jobs', href: '/dashboard/tables/evaluation-jobs', icon: '⚙' },
]

export function Sidebar({ userEmail }: { userEmail: string }) {
  const [collapsed, setCollapsed] = useState(false)
  const [tablesOpen, setTablesOpen] = useState(true)
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className={`flex flex-col bg-white border-r border-black/10 min-h-screen shrink-0 transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-52'
      }`}
    >
      {/* Toggle */}
      <div
        className={`flex items-center border-b border-black/10 px-3 py-4 ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        {!collapsed && (
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
            Dashboard
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-black/10 hover:bg-gray-50 text-gray-500 transition-all"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              isActive(item.href)
                ? 'bg-black text-white'
                : 'text-gray-500 hover:bg-gray-50 hover:text-black'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="text-sm leading-none">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}

        {/* Tables section */}
        <div className="pt-3">
          {!collapsed ? (
            <button
              onClick={() => setTablesOpen((o) => !o)}
              className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span>DB Tables</span>
              <span>{tablesOpen ? '▾' : '▸'}</span>
            </button>
          ) : (
            <div className="border-t border-black/10 my-2" />
          )}

          {(collapsed || tablesOpen) &&
            TABLE_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  isActive(item.href)
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <span className="text-sm leading-none">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-black/10 px-2 py-3">
        {!collapsed && (
          <p className="text-[10px] text-gray-400 font-bold truncate px-2 mb-2">
            {userEmail}
          </p>
        )}
        <SignOutButton collapsed={collapsed} />
      </div>
    </aside>
  )
}
