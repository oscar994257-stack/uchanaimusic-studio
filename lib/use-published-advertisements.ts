'use client'

import { useEffect, useState } from 'react'
import type { Advertisement } from './types'
import { client } from './sanity'

export function usePublishedAdvertisements(initialAdvertisements: Advertisement[], lang: string) {
  const [latest, setLatest] = useState<{ lang: string; advertisements: Advertisement[] } | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    let inFlight = false
    let queued = false
    const refresh = async () => {
      if (controller.signal.aborted || document.hidden) return
      if (inFlight) { queued = true; return }
      inFlight = true
      try {
        const response = await fetch(`/api/advertisements?lang=${encodeURIComponent(lang)}`, { cache: 'no-store', signal: controller.signal })
        if (!response.ok) return
        const result = await response.json()
        if (!controller.signal.aborted && Array.isArray(result.advertisements)) {
          setLatest(previous => previous?.lang === lang && JSON.stringify(previous.advertisements) === JSON.stringify(result.advertisements) ? previous : { lang, advertisements: result.advertisements })
        }
      } catch { /* Keep the last successful advertisement list during connection failures. */ }
      finally { inFlight = false; if (queued && !controller.signal.aborted) { queued = false; void refresh() } }
    }
    void refresh()
    const timer = window.setInterval(refresh, 15000)
    // Published mutations trigger an immediate fresh read. Polling remains as a
    // fallback if a visitor's network blocks the live event stream.
    const subscription = client.listen('*[_type == "advertisement" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]', {}, { includeResult: false, events: ['mutation'], visibility: 'query' }).subscribe({ next: () => { void refresh() }, error: () => {} })
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    window.addEventListener('online', refresh)
    return () => {
      controller.abort()
      subscription.unsubscribe()
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('online', refresh)
    }
  }, [lang])
  return latest?.lang === lang ? latest.advertisements : initialAdvertisements
}
