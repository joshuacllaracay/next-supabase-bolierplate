"use client"

import Link from 'next/link'
import { ModeToggle } from './modes'
import { UserDropdown } from './user-dropdown'
import { User } from '@supabase/supabase-js'

export function AuthHeader({ user }: { user: User | null }) {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            YTrimmer
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <UserDropdown user={user} />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
