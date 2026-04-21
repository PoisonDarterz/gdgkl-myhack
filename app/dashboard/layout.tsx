import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'

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

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-mono">
      <nav className="bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-extrabold tracking-tight">AI Judge Dashboard</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold hidden md:inline">
            Triple-Agent Internal Tool
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 hidden md:inline">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-gray-800 transition-all"
            >
              Sign Out
            </button>
          </form>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
