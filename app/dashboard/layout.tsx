import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-mono">
      <Sidebar userEmail={user.email ?? ''} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-black/10 px-6 py-4 flex items-center gap-3 shrink-0">
          <span className="text-lg font-extrabold tracking-tight">AI Judge Dashboard</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold hidden md:inline">
            Triple-Agent Internal Tool
          </span>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
