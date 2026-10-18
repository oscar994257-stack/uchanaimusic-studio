'use client'

import { useEffect, useState } from 'react'
import { ui } from '@/lib/site-copy'

type Stats = { configured: boolean; today?: number; week?: number; month?: number; total?: number; startedAt?: string; updatedAt?: string }

export function VisitorStats({ lang }: { lang: string }) {
  const [stats, setStats] = useState<Stats>({ configured: false })
  useEffect(() => {
    const controller = new AbortController()
    const refresh = () => fetch('/api/visitors', { signal: controller.signal }).then(response => response.ok ? response.json() : null).then(data => { if (data) setStats(data) }).catch(() => {})
    fetch('/api/visitors', { method: 'POST', signal: controller.signal }).finally(refresh).catch(() => {})
    const timer = window.setInterval(refresh, 3600000)
    return () => { controller.abort(); window.clearInterval(timer) }
  }, [])
  const locale = lang === 'zh' ? 'zh-TW' : lang
  const date = (value?: string) => value ? new Intl.DateTimeFormat(locale, { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '—'
  return (
    <section className="visitor-section content-shell" aria-labelledby="visitors-title">
      <div><p className="eyebrow">{ui(lang, 'visitors')}</p><h2 id="visitors-title">{ui(lang, 'visitorsTitle')}</h2></div>
      <dl className="visitor-grid">{(['today', 'week', 'month', 'total'] as const).map(key => <div key={key}><dt>{ui(lang, key)}</dt><dd>{stats.configured && typeof stats[key] === 'number' ? new Intl.NumberFormat(locale).format(stats[key]!) : '—'}</dd></div>)}</dl>
      <div className="visitor-notes">{stats.configured ? <p>{ui(lang, 'since')} {date(stats.startedAt)} · {ui(lang, 'updated')} {date(stats.updatedAt)}</p> : <p>{ui(lang, 'statsPending')}</p>}<p>{ui(lang, 'statsNote')}</p><details><summary>Cookie / Privacy</summary><p>{ui(lang, 'statsPrivacy')}</p></details></div>
    </section>
  )
}
