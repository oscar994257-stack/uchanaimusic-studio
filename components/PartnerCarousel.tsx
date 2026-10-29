'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { Advertisement } from '@/lib/types'
import { showcaseAdvertisements } from '@/lib/advertisements'
import { AD_TEXT_LIMITS, displayAdText } from '@/lib/ad-text'
import { adAdvanceDelay, type AdVideoState } from '@/lib/ad-playback'
import { extractYouTubeId } from '@/lib/youtube'
import { safeHttpsUrl, ui } from '@/lib/site-copy'
import { adCopy, adPlacementCopy } from '@/lib/ad-copy'
import { AdYouTubePlayer } from './AdYouTubePlayer'
import { FitAdLine } from './FitAdLine'

export function PartnerCarousel({ ads, lang, email }: { ads: Advertisement[]; lang: string; email: string }) {
  const [now, setNow] = useState(0)
  const [selection, setSelection] = useState({ id: '', revision: 0 })
  const [paused, setPaused] = useState(false)
  const [marqueePaused, setMarqueePaused] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [visible, setVisible] = useState(true)
  const [video, setVideo] = useState<{ key: string; state: AdVideoState; endedAt: number | null }>({ key: '', state: 'idle', endedAt: null })
  const slots = showcaseAdvertisements(ads, now)
  const currentIndex = Math.max(0, slots.findIndex(ad => ad._id === selection.id))
  const selected = slots[currentIndex]
  const videoId = selected?.mediaType === 'youtube' ? extractYouTubeId(selected.youtubeUrl) : null
  const mediaKey = selected ? `${selected._id}:${selected.mediaType || 'image'}:${videoId || selected.imageUrl}:${selection.revision}` : ''
  const currentVideo = video.key === mediaKey ? video : { state: 'idle' as const, endedAt: null }
  const text = adCopy(lang)
  const labels = adPlacementCopy(lang)
  const placements = [1, 2, 3, 4].map(slot => ({ slot, ad: slots.find(ad => ad.slot === slot) }))
  const availableCount = placements.filter(item => item.slot !== 1 && !item.ad).length
  const target = safeHttpsUrl(selected?.targetUrl)
  const advance = useRef(() => {})
  const selectAd = (id: string) => { if (id !== selected?._id) setSelection(value => ({ id, revision: value.revision + 1 })) }
  advance.current = () => { const next = slots[(currentIndex + 1) % slots.length]; if (next) selectAd(next._id) }

  useEffect(() => {
    // A removed/expired selection falls back to the first ad with a fresh player.
    if (selected && selected._id !== selection.id) setSelection(value => ({ id: selected._id, revision: value.revision + 1 }))
  }, [selected?._id, selection.id])

  useEffect(() => {
    setNow(Date.now())
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPaused(true); setMarqueePaused(true) }
    const visibility = () => setVisible(!document.hidden)
    visibility()
    const clock = window.setInterval(() => setNow(Date.now()), 5000)
    document.addEventListener('visibilitychange', visibility)
    return () => { window.clearInterval(clock); document.removeEventListener('visibilitychange', visibility) }
  }, [])

  useEffect(() => {
    const delay = adAdvanceDelay({ count: slots.length, paused: paused || keyboardFocus, visible, videoState: currentVideo.state, endedAt: currentVideo.endedAt, now: Date.now() })
    if (delay === null) return
    const timer = window.setTimeout(() => advance.current(), delay)
    return () => window.clearTimeout(timer)
  }, [mediaKey, slots.length, paused, keyboardFocus, visible, currentVideo.state, currentVideo.endedAt])

  const choose = (offset: number) => { const ad = slots[(currentIndex + offset + slots.length) % slots.length]; if (ad) selectAd(ad._id) }
  const status = !slots.length ? labels.empty : slots.length < 2 ? text.single : paused || keyboardFocus ? text.paused : ['playing', 'paused', 'buffering'].includes(currentVideo.state) ? text.watching : currentVideo.state === 'ended' ? text.ended : text.auto
  const lines = displayAdText(selected?.description || '', AD_TEXT_LIMITS.body)
  const portrait = selected?.imageUrl ? <img src={selected.imageUrl} alt={selected.imageAlt || selected.title} loading="lazy" /> : <div className="ad-placeholder"><span className="ad-coordinate">PARTNER SPACE / 01—04</span><div className="ad-sigil" aria-hidden="true">✦</div><p>{ui(lang, 'adTitle')}</p></div>
  return <>
    <aside className="partner-showcase" aria-label={ui(lang, 'ad')}
      onFocusCapture={event => { if (event.target instanceof HTMLElement && event.target.tagName !== 'IFRAME') setKeyboardFocus(event.target.matches(':focus-visible')) }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false) }}>
      <div className="partner-header"><span className="ad-position">{labels.placement} <strong>{selected?.slot || '—'} / 4</strong>{selected?.slot === 1 ? ` · ${text.demo}` : ''}</span><span>{ui(lang, 'adHint')}</span></div>
      {videoId ? <div className="partner-portrait is-video"><AdYouTubePlayer key={mediaKey} videoId={videoId} title={selected.title} lang={lang} onState={state => {
        setVideo({ key: mediaKey, state, endedAt: state === 'ended' ? Date.now() : null })
        if (state === 'playing') window.dispatchEvent(new Event('uchan:video-start'))
      }} /></div> : target ? <a className="partner-portrait" href={target} target="_blank" rel="noopener noreferrer sponsored">{portrait}</a> : <div className="partner-portrait">{portrait}</div>}
      {selected && <div className="partner-copy">
        <p className="partner-title"><FitAdLine>{displayAdText(selected.title, AD_TEXT_LIMITS.title)[0]}</FitAdLine></p>
        <p className="partner-advertiser"><FitAdLine>{displayAdText(selected.advertiserName || text.partner, AD_TEXT_LIMITS.advertiser)[0]}</FitAdLine></p>
        <p className="partner-description">{lines.map((line, index) => <FitAdLine className="ad-text-line" key={index}>{line || '\u00a0'}</FitAdLine>)}</p>
        <p className="ad-video-hint">{videoId ? text.videoHint : '\u00a0'}</p>
      </div>}
      <a className="partner-contact" href={target || `mailto:${email}?subject=Advertising%20collaboration`} target={target ? '_blank' : undefined} rel={target ? 'noopener noreferrer sponsored' : undefined}>{ui(lang, target ? 'adVisit' : 'adContact')}<ChevronRight size={15} /></a>
      <div className="ad-controls">
        <div className="ad-navigation"><button onClick={() => choose(-1)} aria-label={text.previous} disabled={slots.length < 2}><ChevronLeft size={18} /></button>
          <div className="ad-dots" role="group" aria-label={ui(lang, 'adHint')}>{placements.map(({ slot, ad }) => ad ? <button key={slot} onClick={() => selectAd(ad._id)} aria-label={`${labels.placement} ${slot} / 4 · ${slot === 1 ? text.demo : labels.shown}`} aria-pressed={selected?._id === ad._id} className={selected?._id === ad._id ? 'active' : ''}><span>{slot}</span><small>{slot === 1 ? text.demo : labels.shown}</small></button> : slot === 1 ? <span key={slot} className="ad-slot-reserved" aria-label={labels.reserved} title={labels.reserved}><span>1</span><small>{text.demo}</small></span> : <a key={slot} className="ad-slot-open" href={`mailto:${email}?subject=${encodeURIComponent(`Advertising collaboration - Placement ${slot}`)}`} aria-label={`${labels.placement} ${slot} / 4 · ${labels.open} · ${ui(lang, 'adContact')}`}><span>{slot}</span><small>{labels.open}</small></a>)}</div>
          <button onClick={() => choose(1)} aria-label={text.next} disabled={slots.length < 2}><ChevronRight size={18} /></button>
          <button onClick={() => setPaused(value => !value)} aria-label={ui(lang, paused ? 'adResume' : 'adPause')} aria-pressed={paused} disabled={slots.length < 2}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
        </div><p className="ad-occupancy">{labels.occupied} <strong>{slots.length} / 4</strong><span> · {labels.available} <strong>{availableCount}</strong></span></p><p className="ad-rotation-status">{status}</p>
      </div>
    </aside>
    <div className={`ad-marquee ${marqueePaused ? 'paused' : ''}`} aria-label={labels.note}><span>{labels.note}</span><p>{ui(lang, 'adBanner')}</p><button className="ad-marquee-toggle" onClick={() => setMarqueePaused(value => !value)} aria-label={marqueePaused ? labels.resumeNote : labels.pauseNote} aria-pressed={marqueePaused}>{marqueePaused ? <Play size={16} /> : <Pause size={16} />}</button></div>
  </>
}
