"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserCircle2, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from "@/lib/supabase/browser"
import { User } from '@supabase/supabase-js'

interface UserDropdownProps {
  user: User | null
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter()
  
  const handleSignOut = async () => {
    const supabase = supabaseBrowser()
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:opacity-80">
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-2 p-2">
          {user?.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt="Profile" 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <UserCircle2 className="h-8 w-8" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.user_metadata?.full_name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 dark:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
