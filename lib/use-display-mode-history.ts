'use client'

import { useEffect } from 'react'

export function useDisplayModeHistory(desktopMode: boolean) {
  useEffect(() => {
    let reloading = false
    const reload = () => {
      if (reloading) return
      reloading = true
      window.location.reload()
    }
    const onPageShow = (event: PageTransitionEvent) => {
      // Some mobile browsers restore a frozen document and its old viewport.
      // Reload only BFCache restores, not ordinary initial page loads.
      if (event.persisted) reload()
    }
    const onPopState = () => {
      // A same-document restore can be handled by Next's router without reading
      // the server viewport again. Cross-mode history must load a new document.
      const requestedDesktop = new URLSearchParams(window.location.search).get('view') === 'desktop'
      if (requestedDesktop !== desktopMode) reload()
    }
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('popstate', onPopState)
    }
  }, [desktopMode])
}
