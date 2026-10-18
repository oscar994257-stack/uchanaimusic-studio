'use client'

import { useEffect, useState } from 'react'
import type { Work } from './types'

export function usePublishedWorks(initialWorks: Work[], lang: string) {
  const [latest, setLatest] = useState<{ lang: string; works: Work[] } | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    let inFlight = false
    const refresh = async () => {
      if (document.hidden || inFlight) return
      inFlight = true
      try {
        const response = await fetch(`/api/works?lang=${encodeURIComponent(lang)}`, { cache: 'no-store', signal: controller.signal })
        if (!response.ok) return
        const result = await response.json()
        if (!controller.signal.aborted && Array.isArray(result.works)) {
          setLatest(previous => previous?.lang === lang && JSON.stringify(previous.works) === JSON.stringify(result.works) ? previous : { lang, works: result.works })
        }
      } catch { /* Keep the last successful gallery during connection failures. */ }
      finally { inFlight = false }
    }
    void refresh()
    const timer = window.setInterval(refresh, 15000)
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    window.addEventListener('online', refresh)
    return () => {
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('online', refresh)
    }
  }, [lang])
  return latest?.lang === lang ? latest.works : initialWorks
}
