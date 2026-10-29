'use client'

import { useLayoutEffect, useRef } from 'react'

/** Grapheme counts and rendered widths differ, especially with full-color emoji. */
export function FitAdLine({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    let disposed = false
    const fit = () => {
      if (disposed || !element.clientWidth) return
      element.style.fontSize = ''
      for (let attempt = 0; attempt < 3 && element.scrollWidth > element.clientWidth; attempt++) {
        const size = parseFloat(getComputedStyle(element).fontSize)
        element.style.fontSize = `${Math.max(1, Math.floor(size * element.clientWidth / element.scrollWidth * 100) / 100)}px`
      }
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    void document.fonts.ready.then(fit)
    document.fonts.addEventListener('loadingdone', fit)
    return () => { disposed = true; observer.disconnect(); document.fonts.removeEventListener('loadingdone', fit) }
  }, [children])
  return <span ref={ref} className={className} style={{ display: 'block', whiteSpace: 'pre', width: '100%', minWidth: 0 }}>{children}</span>
}
