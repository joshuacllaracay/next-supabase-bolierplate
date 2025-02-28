"use client"

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { User } from '@supabase/supabase-js'
import { AuthHeader } from '@/components/auth-header'
import { YoutubeTrimmer } from '@/components/youtube-trimmer'

export default function YTrimmerStart() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = supabaseBrowser()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Full session data:', session)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <AuthHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
              Trim Your YouTube Video
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Enter your YouTube URL, set the start and end times, and get your trimmed video in seconds.
            </p>
          </div>
          <YoutubeTrimmer />
        </div>
      </div>
    </>
  )
}
