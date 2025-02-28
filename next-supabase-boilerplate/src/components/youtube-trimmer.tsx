"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

function getYouTubeVideoId(url: string) {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1)
    }
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      const videoId = urlObj.searchParams.get('v')
      if (videoId) return videoId
    }
    return null
  } catch {
    return null
  }
}

export function YoutubeTrimmer() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [error, setError] = useState<string | null>(null)
  const videoId = getYouTubeVideoId(youtubeUrl)

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url)
    setError(null)
    if (url && !getYouTubeVideoId(url)) {
      setError('Please enter a valid YouTube URL')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement trimming logic
    console.log('Trimming video:', { youtubeUrl, startTime, endTime })
  }

  return (
    <div className="space-y-8">
      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube Video URL</Label>
              <Input
                id="youtube-url"
                type="text"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={`w-full ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            {videoId && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time (HH:MM:SS)</Label>
                <Input
                  id="start-time"
                  type="text"
                  placeholder="00:00:00"
                  pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time (HH:MM:SS)</Label>
                <Input
                  id="end-time"
                  type="text"
                  placeholder="00:00:00"
                  pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              disabled={!videoId || !startTime || !endTime}
            >
              Trim Video
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
