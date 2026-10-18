'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play, Sparkles } from 'lucide-react'
import type { Advertisement, Work } from '@/lib/types'
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/youtube'
import { safeHttpsUrl, ui } from '@/lib/site-copy'

function useCurrentTime() {
  const [now, setNow] = useState(0)
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 60000); return () => window.clearInterval(timer) }, [])
  return now
}

export function PortalPreview({ lang }: { lang: string }) {
  return (
    <section className="portal-preview content-shell" aria-labelledby="portal-title">
      <div className="portal-art" aria-hidden="true"><div className="portal-orbit" /><div className="portal-door" /><span>U / WORLD 01</span></div>
      <div className="portal-copy">
        <p className="eyebrow">{ui(lang, 'portal')}</p>
        <h2 id="portal-title">{ui(lang, 'portalTitle')}</h2>
        <p className="portal-description">{ui(lang, 'portalText')}</p>
        <span className="status-pill"><span />{ui(lang, 'preview')}</span>
      </div>
      <div className="coming-soon" aria-label={ui(lang, 'coming')}><span>THE NEXT DIMENSION</span>{ui(lang, 'coming')}<i>— UchanAIMusic Studio —</i></div>
    </section>
  )
}

function Thumbnail({ work }: { work: Work }) {
  const [quality, setQuality] = useState<'maxresdefault' | 'hqdefault'>('maxresdefault')
  const [failed, setFailed] = useState(false)
  return failed ? <div className="thumbnail-empty"><Play aria-hidden="true" /></div> : (
    <img src={getYouTubeThumbnail(work.youtubeUrl, quality) || '/images/UchanAIMusic Studio.png'} alt={work.title} loading="lazy" onError={() => quality === 'maxresdefault' ? setQuality('hqdefault') : setFailed(true)} onLoad={event => { if (quality === 'maxresdefault' && event.currentTarget.naturalWidth < 200) setQuality('hqdefault') }} />
  )
}

function VideoPlayer({ work, lang, active, start }: { work: Work; lang: string; active: boolean; start: () => void }) {
  const id = extractYouTubeId(work.youtubeUrl)
  return (
    <div className="cinema-screen">
      {active && id ? (
        <iframe title={work.title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&controls=1&fs=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <button onClick={start} className="cinema-poster" aria-label={`${ui(lang, 'playHere')} · ${work.title}`} disabled={!id}>
          <Thumbnail key={work.youtubeUrl} work={work} />
          <span className="poster-shade" />
          <span className="poster-play"><Play aria-hidden="true" fill="currentColor" /></span>
          <span className="poster-label">{ui(lang, 'playHere')}</span>
        </button>
      )}
    </div>
  )
}

export function FeaturedCinema({ works, ads = [], lang, email }: { works: Work[]; ads?: Advertisement[]; lang: string; email: string }) {
  const available = works.filter(work => /^[A-Za-z0-9_-]{11}$/.test(extractYouTubeId(work.youtubeUrl) || '')).slice(0, 5)
  const [selectedId, setSelectedId] = useState('')
  const [playingId, setPlayingId] = useState('')
  const currentIndex = Math.max(0, available.findIndex(work => (work._id || work.youtubeUrl) === selectedId))
  const work = available[currentIndex]
  const select = (index: number, autoPlay = false) => {
    const chosen = available[(index + available.length) % available.length]
    const id = chosen?._id || chosen?.youtubeUrl || ''
    setSelectedId(id)
    setPlayingId(autoPlay ? id : '')
    if (autoPlay) window.dispatchEvent(new Event('uchan:video-start'))
  }
  const start = () => {
    setPlayingId(work._id || work.youtubeUrl || '')
    window.dispatchEvent(new Event('uchan:video-start'))
  }
  return (
    <section id="works" className="content-shell section-space" aria-labelledby="works-title">
      <div className="section-heading"><div><p className="eyebrow">01 / {ui(lang, 'cinema')}</p><h2 id="works-title">{ui(lang, 'cinemaTitle')}</h2><p>{ui(lang, 'cinemaHint')}</p></div><span className="section-index">{String(available.length).padStart(2, '0')} FILMS</span></div>
      <div className="cinema-layout">
        <div className="cinema-main">
          {work ? <>
            <VideoPlayer key={work.youtubeUrl} work={work} lang={lang} active={playingId === (work._id || work.youtubeUrl)} start={start} />
            <div className="film-heading"><div><p className="eyebrow">{work.type || work.category || 'AI ANIME MV'}</p><h3>{work.title}</h3></div><div className="film-navigation"><button onClick={() => select(currentIndex - 1)} aria-label={ui(lang, 'previous')} disabled={available.length < 2}><ChevronLeft /></button><span>{currentIndex + 1} / {available.length}</span><button onClick={() => select(currentIndex + 1)} aria-label={ui(lang, 'next')} disabled={available.length < 2}><ChevronRight /></button></div></div>
            <div className="film-strip" role="group" aria-label={ui(lang, 'cinema')}>
              {available.map((item, index) => <button key={item._id || item.youtubeUrl} className={index === currentIndex ? 'film-choice is-selected' : 'film-choice'} onClick={() => select(index, true)} aria-pressed={index === currentIndex} aria-label={`${index + 1}. ${item.title}`}><Thumbnail key={item.youtubeUrl} work={item} /><span className="film-number">0{index + 1}</span><span className="film-choice-title">{item.title}</span></button>)}
            </div>
          </> : <div className="cinema-empty"><Sparkles /><p>{ui(lang, 'videoEmpty')}</p></div>}
        </div>
        <PartnerCarousel ads={ads} lang={lang} email={email} />
        {work && <div className="film-description" key={work._id || work.youtubeUrl}><p className="eyebrow">{ui(lang, 'details')}</p><p className="film-description-text">{work.description}</p><a href={safeHttpsUrl(work.youtubeUrl)} target="_blank" rel="noopener noreferrer">YouTube <ExternalLink size={14} /></a></div>}
      </div>
    </section>
  )
}

function PartnerCarousel({ ads, lang, email }: { ads: Advertisement[]; lang: string; email: string }) {
  const now = useCurrentTime()
  const slots = Array.from({ length: 5 }, (_, index) => ads.find(ad => ad.placement === 'showcase' && ad.slot === index + 1 && Date.parse(ad.startsAt) <= now && Date.parse(ad.endsAt) > now))
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const region = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (paused || reduced.matches) return
    const timer = window.setInterval(() => { if (!region.current?.contains(document.activeElement)) setIndex(value => (value + 1) % 5) }, 8000)
    return () => window.clearInterval(timer)
  }, [paused])
  const selected = slots[index]
  const target = safeHttpsUrl(selected?.targetUrl)
  const portrait = <>{selected?.imageUrl ? <img src={selected.imageUrl} alt={selected.title} loading="lazy" /> : <div className="ad-placeholder"><span className="ad-coordinate">PARTNER SPACE / 0{index + 1}</span><div className="ad-sigil" aria-hidden="true">✦</div><p>{ui(lang, 'adTitle')}</p><span className="coming-mini">Coming Soon</span><span className="ad-footnote">{ui(lang, 'adHint')}</span></div>}</>
  return (
    <><aside className="partner-showcase" ref={region} aria-label={ui(lang, 'ad')}>
      <div className="partner-header"><span>{selected ? 'AD / ' + selected.title : ui(lang, 'ad')}</span><button onClick={() => setPaused(value => !value)} aria-label={ui(lang, paused ? 'adResume' : 'adPause')}>{paused ? <Play size={15} /> : <Pause size={15} />}</button></div>
      {target ? <a className="partner-portrait" href={target} target="_blank" rel="noopener noreferrer sponsored">{portrait}</a> : <div className="partner-portrait">{portrait}</div>}
      <div className="ad-dots" role="group" aria-label={ui(lang, 'adHint')}>{slots.map((_, item) => <button key={item} onClick={() => setIndex(item)} aria-label={`${ui(lang, 'ad')} ${item + 1}`} aria-pressed={index === item} className={index === item ? 'active' : ''} />)}</div>
      <a className="partner-contact" href={`mailto:${email}?subject=Advertising%20collaboration`}>{ui(lang, 'adContact')}<ChevronRight size={15} /></a>
    </aside><div className={`ad-marquee ${paused ? 'paused' : ''}`}><span>PARTNER NOTE</span><p>{Array.from(selected?.caption || ui(lang, 'adBanner')).slice(0, 100).join('')}</p></div></>
  )
}

export function CommissionPartner({ ads = [], lang, email }: { ads?: Advertisement[]; lang: string; email: string }) {
  const now = useCurrentTime()
  const ad = ads.find(item => item.placement === 'commission' && Date.parse(item.startsAt) <= now && Date.parse(item.endsAt) > now)
  const href = safeHttpsUrl(ad?.targetUrl) || `mailto:${email}?subject=Advertising%20collaboration`
  return <a className="commission-partner" href={href} target={ad ? '_blank' : undefined} rel={ad ? 'noopener noreferrer sponsored' : undefined}>{ad?.imageUrl && <img src={ad.imageUrl} alt={ad.title} loading="lazy" />}<div><p className="eyebrow">{ui(lang, 'ad')} / 06</p><h3>{ad?.title || ui(lang, 'commissionAd')}</h3><p>{ad?.caption || ui(lang, 'commissionAdText')}</p></div><span className="coming-mini">{ad ? 'AD' : 'Coming Soon'}</span></a>
}
