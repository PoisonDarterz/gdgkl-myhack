'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'

export function SignOutButton({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      title={collapsed ? 'Sign Out' : undefined}
      className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all ${
        collapsed ? 'justify-center' : ''
      }`}
    >
      <span className="text-base leading-none">⏏</span>
      {!collapsed && <span>Sign Out</span>}
    </button>
  )
}
