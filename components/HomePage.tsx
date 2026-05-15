'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Captions,
  ChevronRight,
  Disc3,
  Download,
  ExternalLink,
  Gamepad2,
  Github,
  Languages,
  Mail,
  Mic,
  Mic2,
  Music2,
  Pause,
  Play,
  Send,
  ShoppingCart,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tv,
  Video,
  Volume2,
  VolumeX,
  WandSparkles,
  Wrench,
  Youtube
} from 'lucide-react'
import type { BackgroundMusicTrack, HomeData, Service, ToolItem } from '@/lib/types'
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/youtube'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  data: HomeData
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId?: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void
            onStateChange?: (event: { data: number; target: YouTubePlayer }) => void
          }
        }
      ) => YouTubePlayer
      PlayerState?: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

type YouTubePlayer = {
  loadVideoById: (videoId: string) => void
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  setVolume: (volume: number) => void
  mute: () => void
  unMute: () => void
}

const nav = [
  ['Home', '#home'],
  ['Music', '#works'],
  ['MV', '#works'],
  ['Tools', '#tools'],
  ['Store', '#store'],
  ['Commission', '#commission'],
  ['About', '#about'],
  ['Contact', '#contact']
]

const languages = [
  ['zh', '繁中'],
  ['en', 'EN'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['es', 'ES'],
  ['fr', 'FR'],
  ['de', 'DE'],
  ['pt', 'PT'],
  ['th', 'ไทย'],
  ['vi', 'VI'],
  ['id', 'ID'],
  ['ms', 'MS'],
  ['ru', 'RU'],
  ['ar', 'AR']
] as const

type LanguageCode = (typeof languages)[number][0]

const copy: Record<LanguageCode, Record<string, string>> = {
  zh: {
    latestWorks: '最新作品',
    worksTitle: '音樂影片、AI 歌曲與動漫世界',
    viewAll: '看全部',
    watchYoutube: '在 YouTube 上觀看',
    featuredTool: '精選工具',
    downloadNow: '立即下載',
    viewItch: '在 itch.io 查看',
    learnMore: '了解更多',
    commission: '委託 / 服務',
    servicesTitle: '夢幻般的項目製作支持',
    tools: '工具 & Apps',
    toolsTitle: '創作軟體與實驗工具',
    store: '商店 / 下載',
    storeTitle: '下載檔案由外部平台提供',
    about: '關於',
    aboutTitle: '個人動漫 AI 創作工作室',
    contact: '聯絡',
    stayUpdated: '接收更新',
    subscribeHint: '接收最新 MV、音樂與工具資訊',
    subscribe: '訂閱',
    emailPlaceholder: '輸入你的 Email',
    musicPlayer: '背景音樂',
    play: '播放',
    pause: '暫停',
    next: '下一首',
    mute: '靜音',
    unmute: '開啟聲音',
    language: '語言',
    autoplayHint: '若瀏覽器阻擋自動播放，請點播放。'
  },
  en: {
    latestWorks: 'Latest Works',
    worksTitle: 'Music videos, AI songs, and anime worlds',
    viewAll: 'View All',
    watchYoutube: 'Watch on YouTube',
    featuredTool: 'Featured Tool',
    downloadNow: 'Download Now',
    viewItch: 'View on itch.io',
    learnMore: 'Learn More',
    commission: 'Commission / Services',
    servicesTitle: 'Production support for dreamlike projects',
    tools: 'Tools & Apps',
    toolsTitle: 'Creative software and experiments',
    store: 'Store / Downloads',
    storeTitle: 'Downloads live outside Vercel',
    about: 'About',
    aboutTitle: 'A personal anime AI studio',
    contact: 'Contact',
    stayUpdated: 'Stay Updated',
    subscribeHint: 'Get the latest MV, music, and tool updates',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Enter your email',
    musicPlayer: 'Background Music',
    play: 'Play',
    pause: 'Pause',
    next: 'Next',
    mute: 'Mute',
    unmute: 'Unmute',
    language: 'Language',
    autoplayHint: 'If autoplay is blocked, tap play.'
  },
  ja: {
    latestWorks: '最新作品',
    worksTitle: '音楽映像、AI楽曲、アニメの世界',
    viewAll: 'すべて見る',
    watchYoutube: 'YouTubeで見る',
    featuredTool: '注目ツール',
    downloadNow: '今すぐダウンロード',
    viewItch: 'itch.ioで見る',
    learnMore: '詳しく見る',
    commission: '依頼 / サービス',
    servicesTitle: '夢のような制作をサポート',
    tools: 'ツール & Apps',
    toolsTitle: '創作ソフトと実験ツール',
    store: 'ストア / ダウンロード',
    storeTitle: 'ダウンロードは外部サイトで提供',
    about: '概要',
    aboutTitle: '個人アニメAIスタジオ',
    contact: '連絡先',
    stayUpdated: '更新を受け取る',
    subscribeHint: '最新MV・音楽・ツール情報を受け取る',
    subscribe: '登録',
    emailPlaceholder: 'メールを入力',
    musicPlayer: 'BGM',
    play: '再生',
    pause: '停止',
    next: '次へ',
    mute: 'ミュート',
    unmute: '音声オン',
    language: '言語',
    autoplayHint: '自動再生が止まる場合は再生を押してください。'
  },
  ko: {}, es: {}, fr: {}, de: {}, pt: {}, th: {}, vi: {}, id: {}, ms: {}, ru: {}, ar: {}
} as Record<LanguageCode, Record<string, string>>

const englishFallback = copy.en

function text(lang: LanguageCode, key: string) {
  return copy[lang]?.[key] || englishFallback[key] || key
}

const iconMap = {
  captions: Captions,
  mic: Mic,
  mic2: Mic2,
  music: Music2,
  video: Video,
  gamepad: Gamepad2,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  tools: Wrench,
  store: ShoppingCart
}

function iconFor(key?: string) {
  return iconMap[(key || '').toLowerCase() as keyof typeof iconMap] || Sparkles
}

function MotionSection({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function MouseGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-60 mix-blend-screen md:block"
      style={{
        background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(57,231,255,.16), rgba(255,100,216,.08) 38%, transparent 68%)`
      }}
    />
  )
}

function Navbar({ data, lang, setLang }: Props & { lang: LanguageCode; setLang: (lang: LanguageCode) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const settings = data.siteSettings

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all ${scrolled ? 'border-b border-white/10 bg-[#050b22]/75 shadow-neon backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-lg font-bold tracking-wide text-white">
          <Sparkles className="h-6 w-6 text-cosmic-pink" />
          <span className="hidden sm:inline">UchanAIMusic Studio</span>
          <span className="sm:hidden">UchanAI</span>
        </a>
        <div className="hidden items-center gap-2 lg:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-100/[.82] transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguagePicker lang={lang} setLang={setLang} />
          <a aria-label="YouTube" href={settings.youtubeUrl} target="_blank" className="rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-cosmic-cyan">
            <Youtube className="h-5 w-5" />
          </a>
          {settings.twitterUrl ? (
            <a aria-label="X / Twitter" href={settings.twitterUrl} target="_blank" className="rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-cosmic-pink">
              <ExternalLink className="h-5 w-5" />
            </a>
          ) : null}
          <a aria-label="Email" href={`mailto:${settings.email}`} className="rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-white">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  )
}

function LanguagePicker({ lang, setLang }: { lang: LanguageCode; setLang: (lang: LanguageCode) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs font-bold text-blue-100 backdrop-blur">
      <Languages className="h-4 w-4 text-cosmic-cyan" />
      <span className="sr-only">{text(lang, 'language')}</span>
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value as LanguageCode)}
        className="bg-transparent text-blue-100 outline-none"
        aria-label={text(lang, 'language')}
      >
        {languages.map(([code, label]) => (
          <option key={code} value={code} className="bg-cosmic-ink text-white">
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Hero({ data }: Props) {
  const { hero, siteSettings } = data
  return (
    <section id="home" className="star-scroll relative min-h-[760px] overflow-hidden pt-24 md:min-h-[820px]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,22,.12),rgba(3,8,22,.68)_55%,rgba(3,8,22,.32))]" />
      <div className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-cyan/60 to-transparent neon-line" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-8 md:grid-cols-[.98fr_1.02fr] lg:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }} className="relative order-2 md:order-1">
          <div className="floaty relative mx-auto aspect-square max-w-[520px] overflow-hidden rounded-full border border-cosmic-cyan/30 bg-cosmic-glass shadow-neon">
            <Image src={hero.heroImageUrl || '/images/UchanAIMusic(2).png'} alt="UchanAIMusic avatar" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,.18),transparent_34%),linear-gradient(180deg,transparent,rgba(3,8,22,.24))]" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }} className="order-1 md:order-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cosmic-cyan/30 bg-white/[.08] px-4 py-2 text-sm text-cosmic-cyan shadow-neon backdrop-blur">
            <Disc3 className="h-4 w-4 animate-spin [animation-duration:8s]" />
            Anime Sci-Fi AI Music Studio
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-normal text-white md:text-7xl">
            <span className="bg-gradient-to-r from-white via-pink-200 to-cosmic-cyan bg-clip-text text-transparent">{hero.title}</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 md:text-2xl">{hero.subtitle}</p>
          <div className="mt-6 space-y-2 border-l border-cosmic-cyan/40 pl-5 text-blue-100/80">
            <p>{hero.japaneseLine}</p>
            <p className="text-sm text-blue-200/70">{hero.englishLine}</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={hero.buttonUrl || siteSettings.youtubeUrl} target="_blank" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic-violet to-cosmic-pink px-7 py-3 font-bold text-white shadow-neon transition hover:-translate-y-1 hover:shadow-pink">
              <Play className="h-5 w-5 fill-white" />
              {hero.buttonText}
            </a>
            <a href="#works" className="inline-flex items-center gap-2 rounded-full border border-cosmic-cyan/40 bg-white/5 px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-white/[.12] hover:shadow-neon">
              Explore Works <ChevronRight className="h-5 w-5" />
            </a>
          </div>
          <WaveBars />
        </motion.div>
      </div>
      <QuickLinks data={data} />
    </section>
  )
}

function WaveBars() {
  return (
    <div className="mt-10 flex h-16 items-end gap-2 opacity-80" aria-hidden>
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          className="wave-bar w-1 rounded-full bg-gradient-to-t from-cosmic-violet via-cosmic-cyan to-cosmic-pink"
          style={{ height: `${22 + (index % 7) * 7}px`, animationDelay: `${index * .06}s` }}
        />
      ))}
    </div>
  )
}

function QuickLinks({ data }: Props) {
  const items = [
    ['YouTube', 'Channel', Youtube, data.siteSettings.youtubeUrl],
    ['Music', 'Streaming', Music2, '#works'],
    ['MV', 'Portfolio', Tv, '#works'],
    ['Tools', 'AI Subtitle Studio', Wrench, '#tools'],
    ['Store', 'Downloads', ShoppingCart, '#store'],
    ['Contact', 'Get in Touch', Mail, '#contact']
  ] as const

  return (
    <div className="relative z-20 mx-auto max-w-6xl px-4 pb-12">
      <div className="glass-panel aurora-border grid grid-cols-2 gap-px rounded-2xl p-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(([title, sub, Icon, href]) => (
          <a key={title} href={href || '#'} target={href?.startsWith('http') ? '_blank' : undefined} className="group flex items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-white/10">
            <Icon className="h-6 w-6 text-cosmic-cyan transition group-hover:text-cosmic-pink" />
            <span>
              <span className="block font-bold">{title}</span>
              <span className="text-xs text-blue-200/[.68]">{sub}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function WorkImage({ url, title }: { url?: string; title: string }) {
  const [src, setSrc] = useState(getYouTubeThumbnail(url) || '/images/UchanAIMusic Studio.png')
  return <img src={src} alt={title} onError={() => setSrc(getYouTubeThumbnail(url, 'hqdefault') || '/images/UchanAIMusic Studio.png')} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
}

function LatestWorks({ data, lang }: Props & { lang: LanguageCode }) {
  return (
    <MotionSection id="works" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <SectionTitle kicker={text(lang, 'latestWorks')} title={text(lang, 'worksTitle')} action={{ label: text(lang, 'viewAll'), href: data.siteSettings.youtubeUrl || '#' }} />
      <div className="grid gap-5 md:grid-cols-3">
        {data.works.slice(0, 6).map((work) => (
          <a key={work.title} href={work.youtubeUrl} target="_blank" className="tilt-card group glass-panel aurora-border overflow-hidden rounded-2xl">
            <div className="relative aspect-video overflow-hidden">
              <WorkImage url={work.youtubeUrl} title={work.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-ink/[.88] via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-cosmic-ink/[.55] text-white shadow-neon backdrop-blur">
                <Play className="ml-1 h-7 w-7 fill-white" />
              </span>
            </div>
            <div className="p-5">
              <p className="font-bold text-white">{work.title}</p>
              <p className="mt-1 text-sm text-blue-200/70">{work.type || work.category}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cosmic-cyan">
                {text(lang, 'watchYoutube')} <ExternalLink className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </MotionSection>
  )
}

function SectionTitle({ kicker, title, action }: { kicker: string; title: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.22em] text-cosmic-pink"><Star className="h-4 w-4 fill-cosmic-pink" />{kicker}</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">{title}</h2>
      </div>
      {action ? (
        <a href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined} className="rounded-full border border-cosmic-cyan/30 px-5 py-2 text-sm font-bold text-blue-100 transition hover:bg-white/10 hover:text-white">
          {action.label}
        </a>
      ) : null}
    </div>
  )
}

function SubtitleStudio({ data, lang }: Props & { lang: LanguageCode }) {
  const studio = data.subtitleStudio
  return (
    <MotionSection id="subtitle-studio" className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="glass-panel aurora-border grid gap-8 overflow-hidden rounded-3xl p-7 md:grid-cols-[1fr_.95fr] md:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.22em] text-cosmic-cyan">{text(lang, 'featuredTool')}</p>
          <h2 className="mt-3 text-4xl font-black text-white">{studio.title}</h2>
          <p className="mt-3 text-lg text-blue-100/[.78]">{studio.subtitle}</p>
          <ul className="mt-7 grid gap-3 text-blue-100/[.82] sm:grid-cols-2">
            {studio.features?.map((feature) => (
              <li key={feature} className="flex items-start gap-3"><Sparkles className="mt-1 h-4 w-4 shrink-0 text-cosmic-pink" />{feature}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={studio.downloadUrl} target={studio.downloadUrl?.startsWith('http') ? '_blank' : undefined} className="rounded-xl bg-gradient-to-r from-cosmic-violet to-cosmic-pink px-5 py-3 font-bold text-white shadow-neon transition hover:-translate-y-1">
              {text(lang, 'downloadNow')}
            </a>
            <a href={studio.itchUrl} target="_blank" className="rounded-xl border border-cosmic-cyan/35 px-5 py-3 font-bold text-white transition hover:bg-white/10">{text(lang, 'viewItch')}</a>
            <a href={studio.learnMoreUrl} className="rounded-xl border border-white/15 px-5 py-3 font-bold text-white transition hover:bg-white/10">{text(lang, 'learnMore')}</a>
          </div>
        </div>
        <div className="relative min-h-[310px] overflow-hidden rounded-2xl border border-cosmic-cyan/[.24] bg-[#070d2c] p-5">
          <div className="absolute inset-0 bg-[url('/images/UchanAIMusic%20Studio.png')] bg-cover bg-center opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-violet/[.28] via-transparent to-cosmic-cyan/[.24]" />
          <div className="relative ml-auto mt-10 max-w-sm rounded-2xl border border-cosmic-cyan/[.28] bg-cosmic-ink/[.68] p-4 shadow-neon backdrop-blur">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cosmic-pink" />
              <span className="h-3 w-3 rounded-full bg-cosmic-cyan" />
              <span className="h-3 w-3 rounded-full bg-cosmic-violet" />
            </div>
            <WaveBars />
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

function ToolsAndServices({ data, lang }: Props & { lang: LanguageCode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:px-8">
      <MotionSection id="commission" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'commission')} title={text(lang, 'servicesTitle')} />
        <div className="grid gap-3">
          {data.services.map((service) => <ServiceRow key={service.serviceName} service={service} />)}
        </div>
      </MotionSection>
      <MotionSection id="tools" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'tools')} title={text(lang, 'toolsTitle')} />
        <div className="grid gap-4">
          {data.tools.map((tool) => <ToolCard key={tool.toolName} tool={tool} />)}
        </div>
      </MotionSection>
    </div>
  )
}

function ServiceRow({ service }: { service: Service }) {
  const Icon = iconFor(service.icon)
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-cosmic-pink" />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-bold text-white">{service.serviceName}</p>
        <p className="text-sm leading-6 text-blue-200/[.72]">{service.description}</p>
      </div>
      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-cosmic-cyan" />
    </div>
  )
}

function ToolCard({ tool }: { tool: ToolItem }) {
  const Icon = iconFor(tool.icon)
  return (
    <div className="tilt-card flex items-center gap-5 rounded-2xl border border-cosmic-cyan/20 bg-white/[.04] p-5">
      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-cosmic-cyan/[.34] bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-violet/30 shadow-neon">
        <Icon className="h-10 w-10 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xl font-black text-white">{tool.toolName}</p>
        <p className="mt-1 text-sm text-blue-200/70">{tool.description}</p>
      </div>
      <a href={tool.buttonUrl || '#'} className="hidden rounded-xl border border-cosmic-pink/[.36] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex">
        {tool.buttonText || tool.status}
      </a>
    </div>
  )
}

function StoreAboutContact({ data, lang }: Props & { lang: LanguageCode }) {
  const contact = data.contact
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_.9fr] lg:px-8">
      <MotionSection id="store" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'store')} title={text(lang, 'storeTitle')} />
        <div className="grid gap-4">
          {data.products.map((product) => (
            <a key={product.productName} href={product.url} target="_blank" className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:border-cosmic-cyan/45 hover:bg-white/[.07]">
              <Download className="mt-1 h-6 w-6 text-cosmic-cyan" />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">{product.productName}</span>
                <span className="mt-1 block text-sm text-blue-200/70">{product.description}</span>
                <span className="mt-3 inline-flex rounded-full border border-cosmic-pink/30 px-3 py-1 text-xs text-cosmic-pink">{product.platform} · {product.status}</span>
              </span>
            </a>
          ))}
        </div>
      </MotionSection>
      <MotionSection id="about" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'about')} title={text(lang, 'aboutTitle')} />
        <div className="space-y-5 text-blue-100/80">
          <p>{data.about.zh}</p>
          <p>{data.about.en}</p>
        </div>
        <div id="contact" className="mt-8 rounded-2xl border border-cosmic-cyan/[.18] bg-white/[.04] p-5">
          <p className="font-bold text-white">{text(lang, 'contact')}</p>
          <div className="mt-4 grid gap-3 text-sm text-blue-100/75">
            <a className="flex items-center gap-3 hover:text-white" href={`mailto:${contact.email}`}><Mail className="h-4 w-4 text-cosmic-cyan" />{contact.email}</a>
            <a className="flex items-center gap-3 hover:text-white" href={contact.youtubeUrl} target="_blank"><Youtube className="h-4 w-4 text-cosmic-pink" />YouTube</a>
            {contact.itchUrl ? <a className="flex items-center gap-3 hover:text-white" href={contact.itchUrl} target="_blank"><ExternalLink className="h-4 w-4 text-cosmic-cyan" />itch.io</a> : null}
          </div>
        </div>
      </MotionSection>
    </div>
  )
}

function Subscribe({ data, lang }: Props & { lang: LanguageCode }) {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="glass-panel aurora-border grid gap-6 rounded-3xl p-7 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-cosmic-cyan/[.24] bg-cosmic-violet/20 shadow-neon">
            <Music2 className="h-10 w-10 text-cosmic-cyan" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{text(lang, 'stayUpdated')}</p>
            <p className="mt-1 text-blue-200/70">{text(lang, 'subscribeHint')}</p>
          </div>
        </div>
        <form className="flex gap-3" onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder={text(lang, 'emailPlaceholder')} className="min-w-0 flex-1 rounded-xl border border-cosmic-cyan/[.24] bg-cosmic-ink/70 px-4 py-3 text-white outline-none transition placeholder:text-blue-200/40 focus:border-cosmic-cyan" />
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cosmic-violet to-cosmic-pink px-5 py-3 font-bold text-white shadow-neon transition hover:-translate-y-1">
            <Send className="h-4 w-4" /> {text(lang, 'subscribe')}
          </button>
        </form>
      </div>
    </MotionSection>
  )
}

function Footer({ data }: Props) {
  const settings = data.siteSettings
  const links = useMemo(() => nav.slice(0, 6), [])

  return (
    <footer className="border-t border-white/10 bg-cosmic-ink/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/UchanAIMusic(2).png" alt="UchanAIMusic" width={64} height={64} className="rounded-full border border-cosmic-cyan/30" />
            <div>
              <p className="font-black text-white">UchanAIMusic Studio</p>
              <p className="text-sm text-blue-200/[.66]">AIと音楽、アニメ、テクノロジーの力で。</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3 text-blue-100">
            <a href={settings.youtubeUrl} target="_blank" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            <a href={`mailto:${settings.email}`} aria-label="Email"><Mail className="h-5 w-5" /></a>
            <a href="https://github.com/oscar994257-stack/uchanaimusic-studio" target="_blank" aria-label="GitHub"><Github className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">Site Map</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-100/[.72]">
            {links.map(([label, href]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">Contact</p>
          <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 text-sm text-blue-100/[.72] hover:text-white"><Mail className="h-4 w-4" />{settings.email}</a>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">Follow</p>
          <a href={settings.youtubeUrl} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-100/[.72] hover:text-white"><Youtube className="h-4 w-4" />YouTube</a>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-blue-200/[.52]">© 2026 UchanAIMusic Studio. All Rights Reserved.</div>
    </footer>
  )
}

function BackgroundMusicPlayer({ tracks, lang }: { tracks: BackgroundMusicTrack[]; lang: LanguageCode }) {
  const audioTracks = tracks.filter((track) => track.audioUrl)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(50)
  const [blocked, setBlocked] = useState(false)

  const current = audioTracks[index]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current?.audioUrl) return

    audio.volume = volume / 100
    audio.muted = muted
    audio.src = current.audioUrl

    audio
      .play()
      .then(() => {
        setPlaying(true)
        setBlocked(false)
      })
      .catch(() => {
        setPlaying(false)
        setBlocked(true)
      })
  }, [current?.audioUrl])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  if (!current) return null

  const play = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setPlaying(true)
      setBlocked(false)
    } catch {
      setBlocked(true)
    }
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const next = () => {
    setIndex((value) => (value + 1) % audioTracks.length)
    setPlaying(true)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-cosmic-cyan/25 bg-cosmic-ink/85 p-3 text-white shadow-neon backdrop-blur-xl md:left-auto md:mx-0 md:w-[420px]">
      <audio ref={audioRef} onEnded={next} preload="auto" />
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cosmic-pink/30 bg-white/[.06]">
          <Music2 className="h-5 w-5 text-cosmic-cyan" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-cosmic-pink">{text(lang, 'musicPlayer')}</p>
          <p className="truncate text-sm font-bold">{current.trackTitle}</p>
          {blocked ? <p className="mt-1 text-xs text-blue-200/65">{text(lang, 'autoplayHint')}</p> : null}
        </div>
        <button onClick={playing ? pause : play} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-cosmic-violet to-cosmic-pink shadow-neon" aria-label={playing ? text(lang, 'pause') : text(lang, 'play')}>
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5 fill-white" />}
        </button>
        <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.06] text-cosmic-cyan transition hover:bg-white/10" aria-label={text(lang, 'next')}>
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={() => setMuted((value) => !value)} className="text-blue-100 transition hover:text-white" aria-label={muted ? text(lang, 'unmute') : text(lang, 'mute')}>
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="h-1 flex-1 accent-cosmic-cyan"
          aria-label="Volume"
        />
        <span className="w-10 text-right text-xs text-blue-200/70">{volume}%</span>
      </div>
    </div>
  )
}

export default function HomePage({ data }: Props) {
  const [lang, setLang] = useState<LanguageCode>('zh')

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MouseGlow />
      <Navbar data={data} lang={lang} setLang={setLang} />
      <Hero data={data} />
      <LatestWorks data={data} lang={lang} />
      <SubtitleStudio data={data} lang={lang} />
      <ToolsAndServices data={data} lang={lang} />
      <StoreAboutContact data={data} lang={lang} />
      <Subscribe data={data} lang={lang} />
      <BackgroundMusicPlayer tracks={data.backgroundMusic} lang={lang} />
      <Footer data={data} />
    </main>
  )
}
