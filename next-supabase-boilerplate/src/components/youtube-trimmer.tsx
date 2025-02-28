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

function parseTimeInput(input: string): number | null {
  // Handle empty input
  if (!input.trim()) return null

  try {
    // Handle HH:MM:SS or MM:SS or SS format
    if (input.includes(':')) {
      const parts = input.split(':')
      if (parts.length === 3) {
        // HH:MM:SS format
        const hours = parseInt(parts[0])
        const minutes = parseInt(parts[1])
        const seconds = parseInt(parts[2])
        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && 
            minutes < 60 && seconds < 60) {
          return hours * 3600 + minutes * 60 + seconds
        }
      } else if (parts.length === 2) {
        // MM:SS format
        const minutes = parseInt(parts[0])
        const seconds = parseInt(parts[1])
        if (!isNaN(minutes) && !isNaN(seconds) && seconds < 60) {
          return minutes * 60 + seconds
        }
      }
      return null
    }

    // Handle seconds only
    const seconds = parseInt(input)
    return !isNaN(seconds) ? seconds : null
  } catch {
    return null
  }
}

function formatTime(seconds: number | null): string {
  if (seconds === null) return ''
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  } else if (minutes > 0) {
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
  return secs.toString()
}

export function YoutubeTrimmer() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)
  const [timeError, setTimeError] = useState<string | null>(null)
  const videoId = getYouTubeVideoId(youtubeUrl)

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url)
    setUrlError(null)
    if (url && !getYouTubeVideoId(url)) {
      setUrlError('Please enter a valid YouTube URL')
    }
  }

  const handleTimeChange = (value: string, isStart: boolean) => {
    const timeValue = parseTimeInput(value)
    const otherTimeValue = parseTimeInput(isStart ? endTime : startTime)
    
    if (isStart) {
      setStartTime(value)
    } else {
      setEndTime(value)
    }

    setTimeError(null)

    if (value && timeValue === null) {
      setTimeError('Please enter a valid time (e.g., 45, 1:30, or 1:30:00)')
      return
    }

    if (timeValue !== null && otherTimeValue !== null) {
      if (isStart && timeValue >= otherTimeValue) {
        setTimeError('Start time must be less than end time')
      } else if (!isStart && timeValue <= otherTimeValue) {
        setTimeError('End time must be greater than start time')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const startSeconds = parseTimeInput(startTime)
    const endSeconds = parseTimeInput(endTime)
    console.log('Trimming video:', { 
      youtubeUrl, 
      startTime: startSeconds,
      endTime: endSeconds,
      formattedStartTime: formatTime(startSeconds),
      formattedEndTime: formatTime(endSeconds)
    })
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
                className={`w-full ${urlError ? 'border-red-500' : ''}`}
              />
              {urlError && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{urlError}</AlertDescription>
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

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="text"
                    placeholder="45, 1:30, or 1:30:00"
                    value={startTime}
                    onChange={(e) => handleTimeChange(e.target.value, true)}
                  />
                  {parseTimeInput(startTime) !== null && (
                    <p className="text-sm text-muted-foreground">
                      {formatTime(parseTimeInput(startTime))}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="text"
                    placeholder="45, 1:30, or 1:30:00"
                    value={endTime}
                    onChange={(e) => handleTimeChange(e.target.value, false)}
                  />
                  {parseTimeInput(endTime) !== null && (
                    <p className="text-sm text-muted-foreground">
                      {formatTime(parseTimeInput(endTime))}
                    </p>
                  )}
                </div>
              </div>
              {timeError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{timeError}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              disabled={!videoId || !parseTimeInput(startTime) || !parseTimeInput(endTime) || !!timeError}
            >
              Trim Video
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
