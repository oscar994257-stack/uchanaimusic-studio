'use client'

import { useEffect, useRef, useState } from 'react'
import { loadAdYouTubeAPI, type AdYouTubePlayer as Player } from '@/lib/ad-youtube-api'
import type { AdVideoState } from '@/lib/ad-playback'
import { adCopy } from '@/lib/ad-copy'

export function AdYouTubePlayer({ videoId, title, lang, onState }: { videoId: string; title: string; lang: string; onState: (state: AdVideoState) => void }) {
  const host = useRef<HTMLDivElement>(null)
  const callback = useRef(onState)
  callback.current = onState
  const latestTitle = useRef(title)
  latestTitle.current = title
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const text = adCopy(lang)
  useEffect(() => {
    let cancelled = false
    let player: Player | undefined
    setStatus('loading')
    const fail = () => { if (!cancelled) { setStatus('error'); callback.current('error') } }
    void loadAdYouTubeAPI().then(api => {
      if (cancelled || !host.current) return
      const element = document.createElement('div')
      host.current.replaceChildren(element)
      player = new api.Player(element, {
        width: '100%', height: '100%', host: 'https://www.youtube-nocookie.com', videoId,
        playerVars: { autoplay: 0, controls: 1, fs: 1, playsinline: 1, rel: 0, enablejsapi: 1, origin: window.location.origin },
        events: {
          onReady: event => {
            if (cancelled) return
            const iframe = event.target.getIframe()
            iframe.title = latestTitle.current
            iframe.allowFullscreen = true
            iframe.referrerPolicy = 'strict-origin-when-cross-origin'
            iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
            setStatus('ready')
            // Deliberately do not call playVideo: all ad playback is manual.
          },
          onStateChange: event => {
            if (cancelled) return
            const states: Record<number, AdVideoState> = { [-1]: 'idle', 0: 'ended', 1: 'playing', 2: 'paused', 3: 'buffering', 5: 'idle' }
            const state = states[event.data]
            if (state) callback.current(state)
          },
          onError: fail,
        },
      })
    }).catch(fail)
    return () => { cancelled = true; player?.destroy() }
  }, [videoId])
  useEffect(() => { const iframe = host.current?.querySelector('iframe'); if (iframe) iframe.title = title }, [title])
  return <div className="ad-youtube-player">
    <div ref={host} className="ad-youtube-host" />
    {status === 'loading' && <p className="ad-video-message" role="status">{text.loading}</p>}
    {status === 'error' && <div className="ad-video-message"><p>{text.unavailable}</p><a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">{text.open} ↗</a></div>}
  </div>
}
