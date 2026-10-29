export interface AdYouTubePlayer {
  destroy(): void
  getIframe(): HTMLIFrameElement
}
export interface AdYouTubeAPI {
  Player: new (element: HTMLElement, options: {
    width: string; height: string; host: string; videoId: string
    playerVars: Record<string, string | number>
    events: { onReady(event: { target: AdYouTubePlayer }): void; onStateChange(event: { data: number }): void; onError(): void }
  }) => AdYouTubePlayer
}
type YouTubeWindow = Window & { YT?: AdYouTubeAPI; onYouTubeIframeAPIReady?: () => void }
let pending: Promise<AdYouTubeAPI> | undefined

export function loadAdYouTubeAPI() {
  const target = window as YouTubeWindow
  if (target.YT?.Player) return Promise.resolve(target.YT)
  if (pending) return pending
  pending = new Promise<AdYouTubeAPI>((resolve, reject) => {
    const previous = target.onYouTubeIframeAPIReady
    const done = () => {
      try { previous?.() } finally {
        window.clearTimeout(timeout)
        if (target.YT?.Player) resolve(target.YT)
        else reject(new Error('YouTube player API unavailable'))
      }
    }
    const timeout = window.setTimeout(() => reject(new Error('YouTube player API timed out')), 12000)
    target.onYouTubeIframeAPIReady = done
    let script = document.getElementById('uchan-ad-youtube-api') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'uchan-ad-youtube-api'
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => { window.clearTimeout(timeout); reject(new Error('YouTube player API failed')) }
      document.head.appendChild(script)
    }
  })
  pending = pending.catch(error => {
    pending = undefined
    document.getElementById('uchan-ad-youtube-api')?.remove()
    throw error
  })
  return pending
}
