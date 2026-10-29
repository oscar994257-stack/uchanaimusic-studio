'use client'

import Image from 'next/image'
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
import { CommissionPartner, FeaturedCinema, PortalPreview } from './Showcase'
import { CollaborationTerms } from './CollaborationTerms'
import { ui } from '@/lib/site-copy'
import { usePublishedWorks } from '@/lib/use-published-works'
import { DisplayModeSwitch } from './DisplayModeSwitch'

type Props = {
  data: HomeData
}

const nav = [
  ['navHome', '#home'],
  ['navMusic', '#works'],
  ['navTools', '#tools'],
  ['navStore', '#store'],
  ['navCommission', '#commission'],
  ['navAbout', '#about'],
  ['navContact', '#contact']
] as const

const languages = [
  ['zh', '繁中'],
  ['zh-CN', '简中'],
  ['en', 'EN'],
  ['ja', '日本語'],
  ['ko', '한국어']
] as const

type LanguageCode = (typeof languages)[number][0]

const copy: Record<string, Record<string, string>> = {
  zh: {
    latestWorks: '最新作品',
    navHome: '首頁',
    navMusic: '作品',
    navMv: 'MV',
    navTools: '工具',
    navStore: '商店',
    navCommission: '委託',
    navAbout: '關於',
    navContact: '聯絡',
    heroBadge: 'Anime Sci-Fi AI 音樂工作室',
    exploreWorks: '探索作品',
    quickYoutubeSub: '頻道',
    quickMusicSub: '精選音樂',
    quickMvSub: '動畫影像',
    quickToolsSub: 'AI字幕工作室',
    quickStoreSub: '下載',
    quickContactSub: '聯絡我們',
    footerTagline: '以 AI、音樂、動漫與科技創造夢幻世界。',
    siteMap: '網站地圖',
    follow: '追蹤',
    worksTitle: '音樂影片、AI 歌曲與動漫世界',
    viewAll: '看全部',
    watchYoutube: '在 YouTube 上觀看',
    featuredTool: '精選工具',
    downloadNow: '立即下載',
    viewItch: '在 itch.io 查看',
    learnMore: '了解更多',
    commission: '委託 / 服務',
    servicesTitle: '讓你的音樂，擁有專屬畫面',
    tools: '工具 & Apps',
    toolsTitle: '為創作者而製作的工具',
    store: '商店 / 下載',
    storeTitle: '作品與工具的下載入口',
    about: '關於',
    aboutTitle: '個人動漫 AI 創作工作室',
    contact: '聯絡',
    stayUpdated: '追蹤新作品',
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
    autoplayHint: '自動播放被瀏覽器暫停，請點擊播放。',
    playPrompt: '點擊播放背景音樂',
    nowPlaying: '正在播放背景音樂',
    showPlaylist: '顯示播放清單',
    hidePlaylist: '收合播放清單'
  },
  en: {
    latestWorks: 'Latest Works',
    navHome: 'Home',
    navMusic: 'Music',
    navMv: 'MV',
    navTools: 'Tools',
    navStore: 'Store',
    navCommission: 'Commission',
    navAbout: 'About',
    navContact: 'Contact',
    heroBadge: 'Anime Sci-Fi AI Music Studio',
    exploreWorks: 'Explore Works',
    quickYoutubeSub: 'Channel',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Downloads',
    quickContactSub: 'Get in Touch',
    footerTagline: 'Creating dreamlike worlds with AI, music, anime, and technology.',
    siteMap: 'Site Map',
    follow: 'Follow',
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
    autoplayHint: 'If autoplay is blocked, tap play.',
    playPrompt: 'Click to play background music',
    nowPlaying: 'Background music is playing',
    showPlaylist: 'Show playlist',
    hidePlaylist: 'Hide playlist'
  },
  ja: {
    latestWorks: '最新作品',
    navHome: 'ホーム',
    navMusic: '音楽',
    navMv: 'MV',
    navTools: 'ツール',
    navStore: 'ストア',
    navCommission: '依頼',
    navAbout: '概要',
    navContact: '連絡',
    heroBadge: 'Anime Sci-Fi AI音楽スタジオ',
    exploreWorks: '作品を見る',
    quickYoutubeSub: 'チャンネル',
    quickMusicSub: '配信',
    quickMvSub: 'ポートフォリオ',
    quickToolsSub: 'AI字幕スタジオ',
    quickStoreSub: 'ダウンロード',
    quickContactSub: 'お問い合わせ',
    footerTagline: 'AI、音楽、アニメ、テクノロジーで夢の世界を創る。',
    siteMap: 'サイトマップ',
    follow: 'フォロー',
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
    autoplayHint: '自動再生が止まる場合は再生を押してください。',
    playPrompt: 'クリックしてBGMを再生',
    nowPlaying: 'BGMを再生中',
    showPlaylist: 'プレイリストを表示',
    hidePlaylist: 'プレイリストを閉じる'
  },
  ko: {
    latestWorks: '최신 작품',
    navHome: '홈',
    navMusic: '음악',
    navMv: 'MV',
    navTools: '도구',
    navStore: '스토어',
    navCommission: '의뢰',
    navAbout: '소개',
    navContact: '문의',
    heroBadge: 'Anime Sci-Fi AI 음악 스튜디오',
    exploreWorks: '작품 보기',
    quickYoutubeSub: '채널',
    quickMusicSub: '스트리밍',
    quickMvSub: '포트폴리오',
    quickToolsSub: 'AI 자막 스튜디오',
    quickStoreSub: '다운로드',
    quickContactSub: '문의하기',
    footerTagline: 'AI, 음악, 애니메이션, 기술로 꿈같은 세계를 만듭니다.',
    siteMap: '사이트맵',
    follow: '팔로우',
    worksTitle: '뮤직비디오, AI 음악, 애니메이션 세계',
    viewAll: '전체 보기',
    watchYoutube: 'YouTube에서 보기',
    featuredTool: '추천 도구',
    downloadNow: '지금 다운로드',
    viewItch: 'itch.io에서 보기',
    learnMore: '더 알아보기',
    commission: '의뢰 / 서비스',
    servicesTitle: '몽환적인 프로젝트 제작 지원',
    tools: '도구 & 앱',
    toolsTitle: '창작 소프트웨어와 실험 도구',
    store: '스토어 / 다운로드',
    storeTitle: '다운로드는 외부 플랫폼에서 제공됩니다',
    about: '소개',
    aboutTitle: '개인 애니메이션 AI 스튜디오',
    contact: '문의',
    stayUpdated: '업데이트 받기',
    subscribeHint: '최신 MV, 음악, 도구 소식을 받아보세요',
    subscribe: '구독',
    emailPlaceholder: '이메일을 입력하세요',
    musicPlayer: '배경 음악',
    play: '재생',
    pause: '일시정지',
    next: '다음 곡',
    mute: '음소거',
    unmute: '음소거 해제',
    language: '언어',
    autoplayHint: '자동 재생이 일시 중지되었습니다. 재생을 눌러주세요.',
    playPrompt: '배경 음악을 재생하려면 클릭하세요.',
    nowPlaying: '배경 음악 재생 중',
    showPlaylist: '재생 목록 보기',
    hidePlaylist: '재생 목록 닫기'
  }
} as Record<string, Record<string, string>>

const englishFallback = copy.en

function text(lang: LanguageCode, key: string) {
  if (lang === 'zh-CN') return simplifiedUI[key] || copy.en[key] || key
  return copy[lang]?.[key] || englishFallback[key] || key
}

const simplifiedUI: Record<string, string> = {
  latestWorks: '精选作品', navHome: '首页', navMusic: '音乐', navMv: 'MV', navTools: '工具', navStore: '商店', navCommission: '委托', navAbout: '关于', navContact: '联系', heroBadge: 'Anime Sci-Fi AI 音乐工作室', exploreWorks: '探索作品', quickYoutubeSub: '频道', quickMusicSub: '音乐作品', quickMvSub: '动画影像', quickToolsSub: '字幕创作工具', quickStoreSub: '下载', quickContactSub: '联系创作者', footerTagline: '以 AI、音乐与动画，创造想象中的世界。', siteMap: '网站地图', follow: '关注', worksTitle: '音乐、影像与想象', viewAll: '查看全部', watchYoutube: '在 YouTube 观看', featuredTool: '精选工具', downloadNow: '立即下载', viewItch: '在 itch.io 查看', learnMore: '了解更多', commission: '委托 / 服务', servicesTitle: '让你的音乐拥有专属画面', tools: '创作工具', toolsTitle: '为创作者而制作的工具', store: '商店 / 下载', storeTitle: '作品与工具的下载入口', about: '关于工作室', aboutTitle: '音乐与想象的个人创作空间', contact: '联系', stayUpdated: '持续关注', subscribeHint: '在 YouTube 关注新作品', subscribe: '订阅', emailPlaceholder: '电子邮箱', musicPlayer: '背景音乐', play: '播放', pause: '暂停', next: '下一首', mute: '静音', unmute: '取消静音', language: '语言', autoplayHint: '点击播放背景音乐', playPrompt: '点击播放背景音乐', nowPlaying: '正在播放背景音乐', showPlaylist: '显示播放列表', hidePlaylist: '隐藏播放列表',
}

function localized(value: { [key: string]: string | undefined } | undefined, lang: LanguageCode, fallback = '') {
  const key = lang === 'zh-CN' ? 'zhCN' : lang
  return value?.[key] || fallback || value?.zh || value?.en || ''
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
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    let frame = 0
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { glowRef.current?.style.setProperty('--glow-x', `${event.clientX}px`); glowRef.current?.style.setProperty('--glow-y', `${event.clientY}px`) })
    }
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-60 mix-blend-screen md:block"
      style={{
        background: 'radial-gradient(320px circle at var(--glow-x, -400px) var(--glow-y, -400px), rgba(57,231,255,.10), rgba(255,100,216,.05) 38%, transparent 68%)'
      }}
    />
  )
}

function Navbar({ data, lang, setLang, desktopMode }: Props & { lang: LanguageCode; setLang: (lang: LanguageCode) => void; desktopMode: boolean }) {
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
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-4 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-lg font-bold tracking-wide text-white">
          <Sparkles className="h-6 w-6 text-cosmic-pink" />
          <span className="desktop-brand-full hidden sm:inline">UchanAIMusic Studio</span>
          <span className="desktop-brand-short sm:hidden">UchanAI</span>
        </a>
        <div className="desktop-navbar-links hidden items-center gap-2 lg:flex">
          {nav.map(([labelKey, href]) => (
            <a key={labelKey} href={href} className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-100/[.82] transition hover:bg-white/10 hover:text-white">
              {text(lang, labelKey)}
            </a>
          ))}
          <DisplayModeSwitch desktopMode={desktopMode} lang={lang} />
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
        <div className="mobile-nav"><DisplayModeSwitch desktopMode={desktopMode} lang={lang} />{nav.map(([key, href]) => <a href={href} key={key}>{text(lang, key)}</a>)}</div>
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

function Hero({ data, lang }: Props & { lang: LanguageCode }) {
  const { hero, siteSettings } = data
  return (
    <section id="home" className="star-scroll relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,22,.12),rgba(3,8,22,.68)_55%,rgba(3,8,22,.32))]" />
      <div className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-cyan/60 to-transparent neon-line" />
      <div className="hero-layout relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-8 md:grid-cols-[.98fr_1.02fr] lg:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }} className="hero-portrait relative order-2 md:order-1">
          <div className="floaty relative mx-auto aspect-square max-w-[360px] overflow-hidden rounded-full border border-cosmic-cyan/30 bg-cosmic-glass shadow-neon">
            <Image src={hero.heroImageUrl || '/images/UchanAIMusic(2).png'} alt="UchanAIMusic avatar" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,.18),transparent_34%),linear-gradient(180deg,transparent,rgba(3,8,22,.24))]" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }} className="hero-copy order-1 md:order-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cosmic-cyan/30 bg-white/[.08] px-4 py-2 text-sm text-cosmic-cyan shadow-neon backdrop-blur">
            <Disc3 className="h-4 w-4 animate-spin [animation-duration:8s]" />
            {text(lang, 'heroBadge')}
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-normal text-white md:text-7xl">
            <span className="bg-gradient-to-r from-white via-pink-200 to-cosmic-cyan bg-clip-text text-transparent">UchanAIMusic Studio</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 md:text-2xl">{localized(hero.subtitleI18n, lang, hero.subtitle)}</p>
          <div className="mt-6 space-y-2 border-l border-cosmic-cyan/40 pl-5 text-blue-100/80">
            <p>{localized(hero.shortLineI18n, lang, hero.japaneseLine)}</p>
            <p className="text-sm text-blue-200/70">{localized(hero.supportLineI18n, lang, hero.englishLine)}</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#works" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic-violet to-cosmic-pink px-7 py-3 font-bold text-white shadow-neon transition hover:-translate-y-1 hover:shadow-pink">
              <Play className="h-5 w-5 fill-white" />
              {ui(lang, 'playHere')}
            </a>
            <a href="#commission" className="inline-flex items-center gap-2 rounded-full border border-cosmic-cyan/40 bg-white/5 px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-white/[.12] hover:shadow-neon">
              {ui(lang, 'quote')} <ChevronRight className="h-5 w-5" />
            </a>
          </div>
          <WaveBars />
        </motion.div>
      </div>
      <QuickLinks data={data} lang={lang} />
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

function QuickLinks({ data, lang }: Props & { lang: LanguageCode }) {
  const items = [
    ['YouTube', 'quickYoutubeSub', Youtube, data.siteSettings.youtubeUrl],
    [text(lang, 'navMusic'), 'quickMusicSub', Music2, '#works'],
    [text(lang, 'navMv'), 'quickMvSub', Tv, '#works'],
    [text(lang, 'navTools'), 'quickToolsSub', Wrench, '#tools'],
    [text(lang, 'navStore'), 'quickStoreSub', ShoppingCart, '#store'],
    [text(lang, 'navContact'), 'quickContactSub', Mail, '#contact']
  ] as const

  return (
    <div className="relative z-20 mx-auto max-w-6xl px-4 pb-12">
      <div className="quick-links-layout glass-panel aurora-border grid grid-cols-2 gap-px rounded-2xl p-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(([title, subKey, Icon, href]) => (
          <a key={title} href={href || '#'} target={href?.startsWith('http') ? '_blank' : undefined} className="group flex items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-white/10">
            <Icon className="h-6 w-6 text-cosmic-cyan transition group-hover:text-cosmic-pink" />
            <span>
              <span className="block font-bold">{title}</span>
              <span className="text-xs text-blue-200/[.68]">{text(lang, subKey)}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
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
      <div className="subtitle-layout glass-panel aurora-border grid gap-8 overflow-hidden rounded-3xl p-7 md:grid-cols-[1fr_.95fr] md:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.22em] text-cosmic-cyan">{text(lang, 'featuredTool')}</p>
          <h2 className="mt-3 text-4xl font-black text-white">{localized(studio.titleI18n, lang, studio.title)}</h2>
          <p className="mt-3 text-lg text-blue-100/[.78]">{localized(studio.subtitleI18n, lang, studio.subtitle)}</p>
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
    <div className="services-layout mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:px-8">
      <MotionSection id="commission" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'commission')} title={text(lang, 'servicesTitle')} />
        <div className="grid gap-3">
          {data.services.map((service) => <ServiceRow key={service.serviceName} service={service} lang={lang} />)}
        </div>
        <a href="#collaboration-terms" className="terms-link">{ui(lang, 'terms')} <ChevronRight size={16} /></a>
        <CommissionPartner ads={data.advertisements} lang={lang} email={data.siteSettings.email || 'oscar994257@gmail.com'} />
      </MotionSection>
      <MotionSection id="tools" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'tools')} title={text(lang, 'toolsTitle')} />
        <div className="grid gap-4">
          {data.tools.map((tool) => <ToolCard key={tool.toolName} tool={tool} lang={lang} />)}
        </div>
      </MotionSection>
    </div>
  )
}

function ServiceRow({ service, lang }: { service: Service; lang: LanguageCode }) {
  const Icon = iconFor(service.icon)
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-cosmic-pink" />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-bold text-white">{localized(service.serviceNameI18n, lang, service.serviceName)}</p>
        <p className="max-h-48 overflow-y-auto whitespace-pre-line break-words pr-2 text-sm leading-6 text-blue-200/[.72] [overflow-wrap:anywhere] [scrollbar-color:rgba(57,231,255,.45)_rgba(255,255,255,.08)] [scrollbar-width:thin] md:max-h-64">
          {localized(service.descriptionI18n, lang, service.description)}
        </p>
      </div>
      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-cosmic-cyan" />
    </div>
  )
}

function ToolCard({ tool, lang }: { tool: ToolItem; lang: LanguageCode }) {
  const Icon = iconFor(tool.icon)
  const description = localized(tool.descriptionI18n, lang, tool.description)
  return (
    <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-cosmic-cyan/20 bg-white/[.04] p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cosmic-cyan/[.34] bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-violet/30">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold text-white">{localized(tool.toolNameI18n, lang, tool.toolName)}</p>
        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-blue-200/70">{description.length > 180 ? description.slice(0, 180) + '…' : description}</p>
        {description.length > 180 && <details className="mt-3 text-sm text-blue-200/70"><summary className="text-cosmic-cyan">{ui(lang, 'more')}</summary><p className="mt-3 max-h-80 overflow-y-auto whitespace-pre-line break-words leading-7">{description}</p></details>}
      </div>
      {tool.buttonUrl && <a href={tool.buttonUrl} target={tool.buttonUrl.startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex rounded-xl border border-cosmic-pink/[.36] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10">{localized(tool.buttonTextI18n, lang, tool.buttonText) || text(lang, 'learnMore')}</a>}
    </div>
  )
}

function StoreAboutContact({ data, lang }: Props & { lang: LanguageCode }) {
  const contact = data.contact
  return (
    <div className="store-layout mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_.9fr] lg:px-8">
      <MotionSection id="store" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'store')} title={text(lang, 'storeTitle')} />
        <div className="grid gap-4">
          {data.products.map((product) => (
            <a key={product.productName} href={product.url} target="_blank" className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:border-cosmic-cyan/45 hover:bg-white/[.07]">
              <Download className="mt-1 h-6 w-6 text-cosmic-cyan" />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">{localized(product.productNameI18n, lang, product.productName)}</span>
                <span className="mt-1 block text-sm text-blue-200/70">{localized(product.descriptionI18n, lang, product.description)}</span>
                <span className="mt-3 inline-flex rounded-full border border-cosmic-pink/30 px-3 py-1 text-xs text-cosmic-pink">{product.platform} · {localized(product.statusI18n, lang, product.status)}</span>
              </span>
            </a>
          ))}
        </div>
      </MotionSection>
      <MotionSection id="about" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'about')} title={text(lang, 'aboutTitle')} />
        <div className="space-y-5 text-blue-100/80">
          <p>{localized(data.about.bodyI18n, lang, lang === 'en' ? data.about.en : data.about.zh)}</p>
          {lang === 'zh' && data.about.en ? <p>{data.about.en}</p> : null}
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

function Footer({ data, lang }: Props & { lang: LanguageCode }) {
  const settings = data.siteSettings
  const links = useMemo(() => nav.slice(0, 6), [])

  return (
    <footer className="border-t border-white/10 bg-cosmic-ink/60">
      <div className="footer-layout mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/UchanAIMusic(2).png" alt="UchanAIMusic" width={64} height={64} className="rounded-full border border-cosmic-cyan/30" />
            <div>
              <p className="font-black text-white">UchanAIMusic Studio</p>
              <p className="text-sm text-blue-200/[.66]">{text(lang, 'footerTagline')}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3 text-blue-100">
            <a href={settings.youtubeUrl} target="_blank" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            <a href={`mailto:${settings.email}`} aria-label="Email"><Mail className="h-5 w-5" /></a>
            <a href="https://github.com/oscar994257-stack/uchanaimusic-studio" target="_blank" aria-label="GitHub"><Github className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">{text(lang, 'siteMap')}</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-100/[.72]">
            {links.map(([labelKey, href]) => <a key={labelKey} href={href} className="hover:text-white">{text(lang, labelKey)}</a>)}
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">{text(lang, 'contact')}</p>
          <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 text-sm text-blue-100/[.72] hover:text-white"><Mail className="h-4 w-4" />{settings.email}</a>
        </div>
        <div>
          <p className="mb-4 font-bold uppercase tracking-wide text-cosmic-pink">{text(lang, 'follow')}</p>
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
  const volumeInputRef = useRef<HTMLInputElement | null>(null)
  const volumeLabelRef = useRef<HTMLSpanElement | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(50)
  const [blocked, setBlocked] = useState(false)
  const [showList, setShowList] = useState(false)

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

  useEffect(() => {
    const pauseForVideo = () => { audioRef.current?.pause(); setPlaying(false) }
    window.addEventListener('uchan:video-start', pauseForVideo)
    return () => window.removeEventListener('uchan:video-start', pauseForVideo)
  }, [])

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

  const selectTrack = (trackIndex: number) => {
    setIndex(trackIndex)
    setShowList(false)
    setPlaying(true)
  }

  const syncVolume = (value: string | number) => {
    const nextVolume = Math.max(0, Math.min(100, Number(value)))
    setVolume(nextVolume)
    if (audioRef.current) audioRef.current.volume = nextVolume / 100
    if (volumeLabelRef.current) volumeLabelRef.current.textContent = `${nextVolume}%`
  }

  return (
    <div className="background-music-player fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-cosmic-cyan/25 bg-cosmic-ink/85 p-3 text-white shadow-neon backdrop-blur-xl md:left-auto md:mx-0 md:w-[420px]">
      <audio ref={audioRef} onEnded={next} preload="auto" />
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cosmic-pink/30 bg-white/[.06]">
          <Music2 className="h-5 w-5 text-cosmic-cyan" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-cosmic-pink">{text(lang, 'musicPlayer')}</p>
          <p className="truncate text-sm font-bold">{current.trackTitle}</p>
          <button onClick={() => (playing ? undefined : play())} className="mt-1 text-left text-xs font-semibold text-cosmic-cyan transition hover:text-white">
            {playing ? text(lang, 'nowPlaying') : blocked ? text(lang, 'autoplayHint') : text(lang, 'playPrompt')}
          </button>
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
          ref={volumeInputRef}
          type="range"
          min="0"
          max="100"
          value={volume}
          onInput={(event) => syncVolume(event.currentTarget.value)}
          onChange={(event) => syncVolume(event.currentTarget.value)}
          onClick={(event) => syncVolume(event.currentTarget.value)}
          onMouseMove={(event) => {
            if (event.buttons === 1) syncVolume(event.currentTarget.value)
          }}
          onPointerMove={(event) => {
            if (event.buttons === 1) syncVolume(event.currentTarget.value)
          }}
          onPointerUp={(event) => syncVolume(event.currentTarget.value)}
          onTouchMove={(event) => syncVolume(event.currentTarget.value)}
          onTouchEnd={(event) => syncVolume(event.currentTarget.value)}
          className="h-1 flex-1 accent-cosmic-cyan"
          aria-label="Volume"
        />
        <span ref={volumeLabelRef} className="w-10 text-right text-xs text-blue-200/70">{volume}%</span>
      </div>
      {audioTracks.length > 1 ? (
        <div className="mt-3">
          <button onClick={() => setShowList((value) => !value)} className="w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-left text-xs font-bold text-blue-100 transition hover:bg-white/10">
            {showList ? text(lang, 'hidePlaylist') : text(lang, 'showPlaylist')} · {audioTracks.length}
          </button>
          {showList ? (
            <div className="mt-2 max-h-44 overflow-y-auto rounded-xl border border-white/10 bg-cosmic-ink/70 p-1">
              {audioTracks.map((track, trackIndex) => (
                <button
                  key={`${track.trackTitle}-${trackIndex}`}
                  onClick={() => selectTrack(trackIndex)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${trackIndex === index ? 'bg-cosmic-violet/35 text-white' : 'text-blue-100/75 hover:bg-white/[.07] hover:text-white'}`}
                >
                  <Music2 className="h-4 w-4 shrink-0 text-cosmic-cyan" />
                  <span className="truncate">{track.trackTitle}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default function HomePage({ data: sourceData, desktopMode = false }: Props & { desktopMode?: boolean }) {
  const [lang, setLang] = useState<LanguageCode>('zh')
  const [translation, setTranslation] = useState<{ lang: string; data: HomeData; mode: string } | null>(null)
  const [loadingTranslation, setLoadingTranslation] = useState(false)
  const data = translation?.lang === lang ? translation.data : sourceData
  const publishedWorks = usePublishedWorks(data.works, lang)

  useEffect(() => {
    try { const saved = localStorage.getItem('uchan-language'); if (languages.some(([code]) => code === saved)) setLang(saved as LanguageCode) } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('uchan-language', lang) } catch {}
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : lang === 'zh-CN' ? 'zh-Hans' : lang
    const controller = new AbortController()
    setLoadingTranslation(true)
    fetch(`/api/content?lang=${encodeURIComponent(lang)}`, { signal: controller.signal }).then(response => response.json()).then(result => { if (!controller.signal.aborted) { setTranslation({ lang, data: result.data || sourceData, mode: result.mode || 'original' }); setLoadingTranslation(false) } }).catch(() => { if (!controller.signal.aborted) { setTranslation({ lang, data: sourceData, mode: 'original' }); setLoadingTranslation(false) } })
    return () => controller.abort()
  }, [lang, sourceData])

  return (
    <main className={`${desktopMode ? 'desktop-view-page ' : ''}relative min-h-screen overflow-hidden`}>
      <MouseGlow />
      <Navbar data={data} lang={lang} setLang={setLang} desktopMode={desktopMode} />
      <PortalPreview lang={lang} />
      {lang !== 'zh' && <p className="translation-status content-shell" role="status">{ui(lang, loadingTranslation ? 'translating' : translation?.mode === 'automatic' ? 'translated' : 'translation')}</p>}
      <Hero data={data} lang={lang} />
      <FeaturedCinema works={publishedWorks} ads={data.advertisements} lang={lang} email={data.siteSettings.email || 'oscar994257@gmail.com'} />
      <SubtitleStudio data={data} lang={lang} />
      <ToolsAndServices data={data} lang={lang} />
      <StoreAboutContact data={data} lang={lang} />
      <CollaborationTerms lang={lang} email={data.siteSettings.email || 'oscar994257@gmail.com'} paymentUrl={data.siteSettings.paymentUrl} />
      <section className="follow-section content-shell"><div><p className="eyebrow">KEEP CREATING · KEEP IN TOUCH</p><h2>{text(lang, 'stayUpdated')}</h2></div><div className="terms-actions"><a className="primary-action" href={data.siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube size={18} />YouTube</a><a className="secondary-action" href={`mailto:${data.siteSettings.email}`}>{ui(lang, 'contact')}</a></div></section>
      <BackgroundMusicPlayer tracks={data.backgroundMusic} lang={lang} />
      <Footer data={data} lang={lang} />
    </main>
  )
}
