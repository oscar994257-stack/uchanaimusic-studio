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
  ['navHome', '#home'],
  ['navMusic', '#works'],
  ['navMv', '#works'],
  ['navTools', '#tools'],
  ['navStore', '#store'],
  ['navCommission', '#commission'],
  ['navAbout', '#about'],
  ['navContact', '#contact']
] as const

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
    navHome: '首頁',
    navMusic: '音樂',
    navMv: 'MV',
    navTools: '工具',
    navStore: '商店',
    navCommission: '委託',
    navAbout: '關於',
    navContact: '接觸',
    heroBadge: 'Anime Sci-Fi AI 音樂工作室',
    exploreWorks: '探索作品',
    quickYoutubeSub: '頻道',
    quickMusicSub: '串流媒體',
    quickMvSub: '資料夾',
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
  },
  es: {
    latestWorks: 'Trabajos recientes',
    navHome: 'Inicio',
    navMusic: 'Música',
    navMv: 'MV',
    navTools: 'Herramientas',
    navStore: 'Tienda',
    navCommission: 'Comisiones',
    navAbout: 'Acerca de',
    navContact: 'Contacto',
    heroBadge: 'Estudio AI Music Anime Sci-Fi',
    exploreWorks: 'Explorar obras',
    quickYoutubeSub: 'Canal',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portafolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Descargas',
    quickContactSub: 'Contacto',
    footerTagline: 'Creando mundos de ensueño con AI, música, anime y tecnología.',
    siteMap: 'Mapa del sitio',
    follow: 'Seguir',
    worksTitle: 'Videos musicales, canciones AI y mundos anime',
    viewAll: 'Ver todo',
    watchYoutube: 'Ver en YouTube',
    featuredTool: 'Herramienta destacada',
    downloadNow: 'Descargar ahora',
    viewItch: 'Ver en itch.io',
    learnMore: 'Más información',
    commission: 'Comisiones / Servicios',
    servicesTitle: 'Apoyo de producción para proyectos de ensueño',
    tools: 'Herramientas y Apps',
    toolsTitle: 'Software creativo y herramientas experimentales',
    store: 'Tienda / Descargas',
    storeTitle: 'Las descargas se alojan en plataformas externas',
    about: 'Acerca de',
    aboutTitle: 'Un estudio personal de anime e IA',
    contact: 'Contacto',
    stayUpdated: 'Recibe novedades',
    subscribeHint: 'Recibe novedades de MV, música y herramientas',
    subscribe: 'Suscribirse',
    emailPlaceholder: 'Introduce tu email',
    musicPlayer: 'Música de fondo',
    play: 'Reproducir',
    pause: 'Pausar',
    next: 'Siguiente',
    mute: 'Silenciar',
    unmute: 'Activar sonido',
    language: 'Idioma',
    autoplayHint: 'Si el navegador bloquea la reproducción automática, pulsa reproducir.',
    playPrompt: 'Haz clic para reproducir la música de fondo.',
    nowPlaying: 'La música de fondo se está reproduciendo',
    showPlaylist: 'Mostrar lista',
    hidePlaylist: 'Ocultar lista'
  },
  fr: {
    latestWorks: 'Dernières créations',
    navHome: 'Accueil',
    navMusic: 'Musique',
    navMv: 'MV',
    navTools: 'Outils',
    navStore: 'Boutique',
    navCommission: 'Commandes',
    navAbout: 'À propos',
    navContact: 'Contact',
    heroBadge: 'Studio AI Music Anime Sci-Fi',
    exploreWorks: 'Explorer les œuvres',
    quickYoutubeSub: 'Chaîne',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Téléchargements',
    quickContactSub: 'Contact',
    footerTagline: 'Créer des mondes oniriques avec l’IA, la musique, l’anime et la technologie.',
    siteMap: 'Plan du site',
    follow: 'Suivre',
    worksTitle: 'Clips musicaux, chansons IA et mondes anime',
    viewAll: 'Tout voir',
    watchYoutube: 'Voir sur YouTube',
    featuredTool: 'Outil en vedette',
    downloadNow: 'Télécharger',
    viewItch: 'Voir sur itch.io',
    learnMore: 'En savoir plus',
    commission: 'Commandes / Services',
    servicesTitle: 'Support de production pour projets oniriques',
    tools: 'Outils & Apps',
    toolsTitle: 'Logiciels créatifs et outils expérimentaux',
    store: 'Boutique / Téléchargements',
    storeTitle: 'Les téléchargements sont hébergés ailleurs',
    about: 'À propos',
    aboutTitle: 'Un studio personnel anime et IA',
    contact: 'Contact',
    stayUpdated: 'Rester informé',
    subscribeHint: 'Recevez les nouveautés MV, musique et outils',
    subscribe: 'S’abonner',
    emailPlaceholder: 'Entrez votre email',
    musicPlayer: 'Musique de fond',
    play: 'Lire',
    pause: 'Pause',
    next: 'Suivant',
    mute: 'Muet',
    unmute: 'Activer le son',
    language: 'Langue',
    autoplayHint: 'Si la lecture automatique est bloquée, cliquez sur lecture.',
    playPrompt: 'Cliquez pour lancer la musique de fond.',
    nowPlaying: 'La musique de fond est en cours de lecture',
    showPlaylist: 'Afficher la playlist',
    hidePlaylist: 'Masquer la playlist'
  },
  de: {
    latestWorks: 'Neueste Werke',
    navHome: 'Start',
    navMusic: 'Musik',
    navMv: 'MV',
    navTools: 'Tools',
    navStore: 'Store',
    navCommission: 'Aufträge',
    navAbout: 'Über',
    navContact: 'Kontakt',
    heroBadge: 'Anime Sci-Fi AI Musikstudio',
    exploreWorks: 'Werke ansehen',
    quickYoutubeSub: 'Kanal',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Downloads',
    quickContactSub: 'Kontakt',
    footerTagline: 'Traumhafte Welten mit AI, Musik, Anime und Technologie erschaffen.',
    siteMap: 'Sitemap',
    follow: 'Folgen',
    worksTitle: 'Musikvideos, AI-Songs und Anime-Welten',
    viewAll: 'Alle ansehen',
    watchYoutube: 'Auf YouTube ansehen',
    featuredTool: 'Empfohlenes Tool',
    downloadNow: 'Jetzt herunterladen',
    viewItch: 'Auf itch.io ansehen',
    learnMore: 'Mehr erfahren',
    commission: 'Aufträge / Services',
    servicesTitle: 'Produktionssupport für traumhafte Projekte',
    tools: 'Tools & Apps',
    toolsTitle: 'Kreativsoftware und experimentelle Tools',
    store: 'Store / Downloads',
    storeTitle: 'Downloads werden extern bereitgestellt',
    about: 'Über',
    aboutTitle: 'Ein persönliches Anime-AI-Studio',
    contact: 'Kontakt',
    stayUpdated: 'Updates erhalten',
    subscribeHint: 'Erhalte neue MV-, Musik- und Tool-Updates',
    subscribe: 'Abonnieren',
    emailPlaceholder: 'E-Mail eingeben',
    musicPlayer: 'Hintergrundmusik',
    play: 'Abspielen',
    pause: 'Pause',
    next: 'Weiter',
    mute: 'Stumm',
    unmute: 'Ton an',
    language: 'Sprache',
    autoplayHint: 'Wenn Autoplay blockiert wird, bitte Play drücken.',
    playPrompt: 'Klicken, um die Hintergrundmusik abzuspielen.',
    nowPlaying: 'Hintergrundmusik läuft',
    showPlaylist: 'Playlist anzeigen',
    hidePlaylist: 'Playlist ausblenden'
  },
  pt: {
    latestWorks: 'Últimos trabalhos',
    navHome: 'Início',
    navMusic: 'Música',
    navMv: 'MV',
    navTools: 'Ferramentas',
    navStore: 'Loja',
    navCommission: 'Comissões',
    navAbout: 'Sobre',
    navContact: 'Contato',
    heroBadge: 'Estúdio AI Music Anime Sci-Fi',
    exploreWorks: 'Explorar obras',
    quickYoutubeSub: 'Canal',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfólio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Downloads',
    quickContactSub: 'Contato',
    footerTagline: 'Criando mundos oníricos com AI, música, anime e tecnologia.',
    siteMap: 'Mapa do site',
    follow: 'Seguir',
    worksTitle: 'Videoclipes, músicas AI e mundos anime',
    viewAll: 'Ver tudo',
    watchYoutube: 'Ver no YouTube',
    featuredTool: 'Ferramenta em destaque',
    downloadNow: 'Baixar agora',
    viewItch: 'Ver no itch.io',
    learnMore: 'Saiba mais',
    commission: 'Comissões / Serviços',
    servicesTitle: 'Suporte de produção para projetos oníricos',
    tools: 'Ferramentas & Apps',
    toolsTitle: 'Software criativo e ferramentas experimentais',
    store: 'Loja / Downloads',
    storeTitle: 'Downloads hospedados em plataformas externas',
    about: 'Sobre',
    aboutTitle: 'Um estúdio pessoal de anime e AI',
    contact: 'Contato',
    stayUpdated: 'Receber novidades',
    subscribeHint: 'Receba novidades de MV, música e ferramentas',
    subscribe: 'Inscrever-se',
    emailPlaceholder: 'Digite seu email',
    musicPlayer: 'Música de fundo',
    play: 'Reproduzir',
    pause: 'Pausar',
    next: 'Próxima',
    mute: 'Silenciar',
    unmute: 'Ativar som',
    language: 'Idioma',
    autoplayHint: 'Se a reprodução automática for bloqueada, toque em reproduzir.',
    playPrompt: 'Clique para tocar a música de fundo.',
    nowPlaying: 'Música de fundo tocando',
    showPlaylist: 'Mostrar playlist',
    hidePlaylist: 'Ocultar playlist'
  },
  th: {
    latestWorks: 'ผลงานล่าสุด',
    navHome: 'หน้าแรก',
    navMusic: 'เพลง',
    navMv: 'MV',
    navTools: 'เครื่องมือ',
    navStore: 'ร้านค้า',
    navCommission: 'คอมมิชชัน',
    navAbout: 'เกี่ยวกับ',
    navContact: 'ติดต่อ',
    heroBadge: 'สตูดิโอ AI Music Anime Sci-Fi',
    exploreWorks: 'ดูผลงาน',
    quickYoutubeSub: 'ช่อง',
    quickMusicSub: 'สตรีมมิง',
    quickMvSub: 'พอร์ตโฟลิโอ',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'ดาวน์โหลด',
    quickContactSub: 'ติดต่อเรา',
    footerTagline: 'สร้างโลกในฝันด้วย AI เพลง อนิเมะ และเทคโนโลยี',
    siteMap: 'แผนผังเว็บไซต์',
    follow: 'ติดตาม',
    worksTitle: 'มิวสิกวิดีโอ เพลง AI และโลกอนิเมะ',
    viewAll: 'ดูทั้งหมด',
    watchYoutube: 'ดูบน YouTube',
    featuredTool: 'เครื่องมือแนะนำ',
    downloadNow: 'ดาวน์โหลด',
    viewItch: 'ดูบน itch.io',
    learnMore: 'เรียนรู้เพิ่มเติม',
    commission: 'คอมมิชชัน / บริการ',
    servicesTitle: 'สนับสนุนการผลิตโปรเจกต์ในฝัน',
    tools: 'เครื่องมือ & แอป',
    toolsTitle: 'ซอฟต์แวร์สร้างสรรค์และเครื่องมือทดลอง',
    store: 'ร้านค้า / ดาวน์โหลด',
    storeTitle: 'ไฟล์ดาวน์โหลดอยู่บนแพลตฟอร์มภายนอก',
    about: 'เกี่ยวกับ',
    aboutTitle: 'สตูดิโออนิเมะ AI ส่วนตัว',
    contact: 'ติดต่อ',
    stayUpdated: 'รับข่าวสาร',
    subscribeHint: 'รับข่าว MV เพลง และเครื่องมือล่าสุด',
    subscribe: 'สมัครรับข่าว',
    emailPlaceholder: 'กรอกอีเมลของคุณ',
    musicPlayer: 'เพลงพื้นหลัง',
    play: 'เล่น',
    pause: 'หยุดชั่วคราว',
    next: 'เพลงถัดไป',
    mute: 'ปิดเสียง',
    unmute: 'เปิดเสียง',
    language: 'ภาษา',
    autoplayHint: 'หากเบราว์เซอร์บล็อกการเล่นอัตโนมัติ ให้กดเล่น',
    playPrompt: 'คลิกเพื่อเล่นเพลงพื้นหลัง',
    nowPlaying: 'กำลังเล่นเพลงพื้นหลัง',
    showPlaylist: 'แสดงเพลย์ลิสต์',
    hidePlaylist: 'ซ่อนเพลย์ลิสต์'
  },
  vi: {
    latestWorks: 'Tác phẩm mới nhất',
    navHome: 'Trang chủ',
    navMusic: 'Âm nhạc',
    navMv: 'MV',
    navTools: 'Công cụ',
    navStore: 'Cửa hàng',
    navCommission: 'Đặt hàng',
    navAbout: 'Giới thiệu',
    navContact: 'Liên hệ',
    heroBadge: 'Studio AI Music Anime Sci-Fi',
    exploreWorks: 'Khám phá tác phẩm',
    quickYoutubeSub: 'Kênh',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Tải xuống',
    quickContactSub: 'Liên hệ',
    footerTagline: 'Tạo nên thế giới mộng ảo bằng AI, âm nhạc, anime và công nghệ.',
    siteMap: 'Sơ đồ trang',
    follow: 'Theo dõi',
    worksTitle: 'MV âm nhạc, bài hát AI và thế giới anime',
    viewAll: 'Xem tất cả',
    watchYoutube: 'Xem trên YouTube',
    featuredTool: 'Công cụ nổi bật',
    downloadNow: 'Tải xuống',
    viewItch: 'Xem trên itch.io',
    learnMore: 'Tìm hiểu thêm',
    commission: 'Đặt hàng / Dịch vụ',
    servicesTitle: 'Hỗ trợ sản xuất cho dự án mộng ảo',
    tools: 'Công cụ & Apps',
    toolsTitle: 'Phần mềm sáng tạo và công cụ thử nghiệm',
    store: 'Cửa hàng / Tải xuống',
    storeTitle: 'Tệp tải xuống được lưu trên nền tảng ngoài',
    about: 'Giới thiệu',
    aboutTitle: 'Studio anime AI cá nhân',
    contact: 'Liên hệ',
    stayUpdated: 'Nhận cập nhật',
    subscribeHint: 'Nhận tin mới về MV, âm nhạc và công cụ',
    subscribe: 'Đăng ký',
    emailPlaceholder: 'Nhập email của bạn',
    musicPlayer: 'Nhạc nền',
    play: 'Phát',
    pause: 'Tạm dừng',
    next: 'Bài tiếp',
    mute: 'Tắt tiếng',
    unmute: 'Bật tiếng',
    language: 'Ngôn ngữ',
    autoplayHint: 'Nếu trình duyệt chặn tự phát, hãy nhấn phát.',
    playPrompt: 'Nhấn để phát nhạc nền.',
    nowPlaying: 'Đang phát nhạc nền',
    showPlaylist: 'Hiện danh sách phát',
    hidePlaylist: 'Ẩn danh sách phát'
  },
  id: {
    latestWorks: 'Karya terbaru',
    navHome: 'Beranda',
    navMusic: 'Musik',
    navMv: 'MV',
    navTools: 'Alat',
    navStore: 'Toko',
    navCommission: 'Komisi',
    navAbout: 'Tentang',
    navContact: 'Kontak',
    heroBadge: 'Studio AI Music Anime Sci-Fi',
    exploreWorks: 'Jelajahi karya',
    quickYoutubeSub: 'Kanal',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portofolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Unduhan',
    quickContactSub: 'Hubungi',
    footerTagline: 'Menciptakan dunia impian dengan AI, musik, anime, dan teknologi.',
    siteMap: 'Peta situs',
    follow: 'Ikuti',
    worksTitle: 'Video musik, lagu AI, dan dunia anime',
    viewAll: 'Lihat semua',
    watchYoutube: 'Tonton di YouTube',
    featuredTool: 'Alat unggulan',
    downloadNow: 'Unduh sekarang',
    viewItch: 'Lihat di itch.io',
    learnMore: 'Pelajari lagi',
    commission: 'Komisi / Layanan',
    servicesTitle: 'Dukungan produksi untuk proyek impian',
    tools: 'Alat & Apps',
    toolsTitle: 'Perangkat kreatif dan alat eksperimen',
    store: 'Toko / Unduhan',
    storeTitle: 'Unduhan disediakan di platform eksternal',
    about: 'Tentang',
    aboutTitle: 'Studio anime AI pribadi',
    contact: 'Kontak',
    stayUpdated: 'Dapatkan kabar',
    subscribeHint: 'Dapatkan info MV, musik, dan alat terbaru',
    subscribe: 'Berlangganan',
    emailPlaceholder: 'Masukkan email',
    musicPlayer: 'Musik latar',
    play: 'Putar',
    pause: 'Jeda',
    next: 'Berikutnya',
    mute: 'Bisukan',
    unmute: 'Nyalakan suara',
    language: 'Bahasa',
    autoplayHint: 'Jika autoplay diblokir, tekan play.',
    playPrompt: 'Klik untuk memutar musik latar.',
    nowPlaying: 'Musik latar sedang diputar',
    showPlaylist: 'Tampilkan playlist',
    hidePlaylist: 'Sembunyikan playlist'
  },
  ms: {
    latestWorks: 'Karya terkini',
    navHome: 'Laman utama',
    navMusic: 'Muzik',
    navMv: 'MV',
    navTools: 'Alat',
    navStore: 'Kedai',
    navCommission: 'Tempahan',
    navAbout: 'Tentang',
    navContact: 'Hubungi',
    heroBadge: 'Studio AI Music Anime Sci-Fi',
    exploreWorks: 'Teroka karya',
    quickYoutubeSub: 'Saluran',
    quickMusicSub: 'Streaming',
    quickMvSub: 'Portfolio',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Muat turun',
    quickContactSub: 'Hubungi',
    footerTagline: 'Mencipta dunia impian dengan AI, muzik, anime dan teknologi.',
    siteMap: 'Peta laman',
    follow: 'Ikuti',
    worksTitle: 'Video muzik, lagu AI dan dunia anime',
    viewAll: 'Lihat semua',
    watchYoutube: 'Tonton di YouTube',
    featuredTool: 'Alat pilihan',
    downloadNow: 'Muat turun',
    viewItch: 'Lihat di itch.io',
    learnMore: 'Ketahui lanjut',
    commission: 'Tempahan / Servis',
    servicesTitle: 'Sokongan produksi untuk projek impian',
    tools: 'Alat & Apps',
    toolsTitle: 'Perisian kreatif dan alat eksperimen',
    store: 'Kedai / Muat turun',
    storeTitle: 'Muat turun disediakan di platform luar',
    about: 'Tentang',
    aboutTitle: 'Studio anime AI peribadi',
    contact: 'Hubungi',
    stayUpdated: 'Terima kemas kini',
    subscribeHint: 'Terima kemas kini MV, muzik dan alat terbaru',
    subscribe: 'Langgan',
    emailPlaceholder: 'Masukkan email anda',
    musicPlayer: 'Muzik latar',
    play: 'Main',
    pause: 'Jeda',
    next: 'Seterusnya',
    mute: 'Senyap',
    unmute: 'Buka suara',
    language: 'Bahasa',
    autoplayHint: 'Jika autoplay disekat, tekan play.',
    playPrompt: 'Klik untuk memainkan muzik latar.',
    nowPlaying: 'Muzik latar sedang dimainkan',
    showPlaylist: 'Tunjuk senarai main',
    hidePlaylist: 'Sembunyi senarai main'
  },
  ru: {
    latestWorks: 'Новые работы',
    navHome: 'Главная',
    navMusic: 'Музыка',
    navMv: 'MV',
    navTools: 'Инструменты',
    navStore: 'Магазин',
    navCommission: 'Заказы',
    navAbout: 'О проекте',
    navContact: 'Контакты',
    heroBadge: 'Anime Sci-Fi AI музыкальная студия',
    exploreWorks: 'Смотреть работы',
    quickYoutubeSub: 'Канал',
    quickMusicSub: 'Стриминг',
    quickMvSub: 'Портфолио',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'Загрузки',
    quickContactSub: 'Связаться',
    footerTagline: 'Создаем мечтательные миры с AI, музыкой, аниме и технологиями.',
    siteMap: 'Карта сайта',
    follow: 'Подписаться',
    worksTitle: 'Музыкальные видео, AI-песни и аниме-миры',
    viewAll: 'Смотреть все',
    watchYoutube: 'Смотреть на YouTube',
    featuredTool: 'Избранный инструмент',
    downloadNow: 'Скачать',
    viewItch: 'Открыть на itch.io',
    learnMore: 'Подробнее',
    commission: 'Заказы / Услуги',
    servicesTitle: 'Поддержка производства для мечтательных проектов',
    tools: 'Инструменты & Apps',
    toolsTitle: 'Креативное ПО и экспериментальные инструменты',
    store: 'Магазин / Загрузки',
    storeTitle: 'Файлы размещены на внешних платформах',
    about: 'О проекте',
    aboutTitle: 'Личная anime AI студия',
    contact: 'Контакты',
    stayUpdated: 'Получать новости',
    subscribeHint: 'Получайте новости о MV, музыке и инструментах',
    subscribe: 'Подписаться',
    emailPlaceholder: 'Введите email',
    musicPlayer: 'Фоновая музыка',
    play: 'Воспроизвести',
    pause: 'Пауза',
    next: 'Далее',
    mute: 'Без звука',
    unmute: 'Включить звук',
    language: 'Язык',
    autoplayHint: 'Если автозапуск заблокирован, нажмите Play.',
    playPrompt: 'Нажмите, чтобы включить фоновую музыку.',
    nowPlaying: 'Фоновая музыка играет',
    showPlaylist: 'Показать плейлист',
    hidePlaylist: 'Скрыть плейлист'
  },
  ar: {
    latestWorks: 'أحدث الأعمال',
    navHome: 'الرئيسية',
    navMusic: 'الموسيقى',
    navMv: 'MV',
    navTools: 'الأدوات',
    navStore: 'المتجر',
    navCommission: 'طلبات',
    navAbout: 'حول',
    navContact: 'تواصل',
    heroBadge: 'استوديو AI Music Anime Sci-Fi',
    exploreWorks: 'استكشف الأعمال',
    quickYoutubeSub: 'القناة',
    quickMusicSub: 'البث',
    quickMvSub: 'الأعمال',
    quickToolsSub: 'AI Subtitle Studio',
    quickStoreSub: 'تنزيلات',
    quickContactSub: 'تواصل معنا',
    footerTagline: 'نصنع عوالم حالمة بالذكاء الاصطناعي والموسيقى والأنمي والتقنية.',
    siteMap: 'خريطة الموقع',
    follow: 'تابع',
    worksTitle: 'فيديوهات موسيقية وأغان AI وعوالم أنمي',
    viewAll: 'عرض الكل',
    watchYoutube: 'شاهد على YouTube',
    featuredTool: 'أداة مميزة',
    downloadNow: 'تنزيل الآن',
    viewItch: 'عرض على itch.io',
    learnMore: 'اعرف المزيد',
    commission: 'طلبات / خدمات',
    servicesTitle: 'دعم إنتاج لمشاريع حالمة',
    tools: 'أدوات وتطبيقات',
    toolsTitle: 'برامج إبداعية وأدوات تجريبية',
    store: 'المتجر / التنزيلات',
    storeTitle: 'التنزيلات متاحة عبر منصات خارجية',
    about: 'حول',
    aboutTitle: 'استوديو أنمي AI شخصي',
    contact: 'تواصل',
    stayUpdated: 'تابع التحديثات',
    subscribeHint: 'احصل على آخر أخبار MV والموسيقى والأدوات',
    subscribe: 'اشتراك',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    musicPlayer: 'موسيقى الخلفية',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    next: 'التالي',
    mute: 'كتم',
    unmute: 'إلغاء الكتم',
    language: 'اللغة',
    autoplayHint: 'إذا تم حظر التشغيل التلقائي، اضغط تشغيل.',
    playPrompt: 'انقر لتشغيل موسيقى الخلفية.',
    nowPlaying: 'موسيقى الخلفية قيد التشغيل',
    showPlaylist: 'إظهار قائمة التشغيل',
    hidePlaylist: 'إخفاء قائمة التشغيل'
  }
} as Record<LanguageCode, Record<string, string>>

const englishFallback = copy.en

function text(lang: LanguageCode, key: string) {
  return copy[lang]?.[key] || englishFallback[key] || key
}

function localized(value: { [key: string]: string | undefined } | undefined, lang: LanguageCode, fallback = '') {
  return value?.[lang] || value?.zh || value?.en || fallback
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
          {nav.map(([labelKey, href]) => (
            <a key={labelKey} href={href} className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-100/[.82] transition hover:bg-white/10 hover:text-white">
              {text(lang, labelKey)}
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

function Hero({ data, lang }: Props & { lang: LanguageCode }) {
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
            {text(lang, 'heroBadge')}
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-normal text-white md:text-7xl">
            <span className="bg-gradient-to-r from-white via-pink-200 to-cosmic-cyan bg-clip-text text-transparent">{localized(hero.titleI18n, lang, hero.title)}</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 md:text-2xl">{localized(hero.subtitleI18n, lang, hero.subtitle)}</p>
          <div className="mt-6 space-y-2 border-l border-cosmic-cyan/40 pl-5 text-blue-100/80">
            <p>{localized(hero.shortLineI18n, lang, hero.japaneseLine)}</p>
            <p className="text-sm text-blue-200/70">{localized(hero.supportLineI18n, lang, hero.englishLine)}</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={hero.buttonUrl || siteSettings.youtubeUrl} target="_blank" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic-violet to-cosmic-pink px-7 py-3 font-bold text-white shadow-neon transition hover:-translate-y-1 hover:shadow-pink">
              <Play className="h-5 w-5 fill-white" />
              {localized(hero.buttonTextI18n, lang, hero.buttonText)}
            </a>
            <a href="#works" className="inline-flex items-center gap-2 rounded-full border border-cosmic-cyan/40 bg-white/5 px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-white/[.12] hover:shadow-neon">
              {text(lang, 'exploreWorks')} <ChevronRight className="h-5 w-5" />
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
      <div className="glass-panel aurora-border grid grid-cols-2 gap-px rounded-2xl p-2 sm:grid-cols-3 lg:grid-cols-6">
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
              <p className="font-bold text-white">{localized(work.titleI18n, lang, work.title)}</p>
              <p className="mt-1 text-sm text-blue-200/70">{localized(work.typeI18n, lang, work.type) || localized(work.categoryI18n, lang, work.category)}</p>
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
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:px-8">
      <MotionSection id="commission" className="glass-panel aurora-border rounded-3xl p-7">
        <SectionTitle kicker={text(lang, 'commission')} title={text(lang, 'servicesTitle')} />
        <div className="grid gap-3">
          {data.services.map((service) => <ServiceRow key={service.serviceName} service={service} lang={lang} />)}
        </div>
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
        <p className="text-sm leading-6 text-blue-200/[.72]">{localized(service.descriptionI18n, lang, service.description)}</p>
      </div>
      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-cosmic-cyan" />
    </div>
  )
}

function ToolCard({ tool, lang }: { tool: ToolItem; lang: LanguageCode }) {
  const Icon = iconFor(tool.icon)
  return (
    <div className="tilt-card flex items-center gap-5 rounded-2xl border border-cosmic-cyan/20 bg-white/[.04] p-5">
      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-cosmic-cyan/[.34] bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-violet/30 shadow-neon">
        <Icon className="h-10 w-10 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xl font-black text-white">{localized(tool.toolNameI18n, lang, tool.toolName)}</p>
        <p className="mt-1 text-sm text-blue-200/70">{localized(tool.descriptionI18n, lang, tool.description)}</p>
      </div>
      <a href={tool.buttonUrl || '#'} className="hidden rounded-xl border border-cosmic-pink/[.36] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex">
        {localized(tool.buttonTextI18n, lang, tool.buttonText) || localized(tool.statusI18n, lang, tool.status)}
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

function Footer({ data, lang }: Props & { lang: LanguageCode }) {
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
          onPointerMove={(event) => {
            if (event.buttons === 1) syncVolume(event.currentTarget.value)
          }}
          onPointerUp={(event) => syncVolume(event.currentTarget.value)}
          className="h-1 flex-1 accent-cosmic-cyan"
          aria-label="Volume"
        />
        <span className="w-10 text-right text-xs text-blue-200/70">{volume}%</span>
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

export default function HomePage({ data }: Props) {
  const [lang, setLang] = useState<LanguageCode>('zh')

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MouseGlow />
      <Navbar data={data} lang={lang} setLang={setLang} />
      <Hero data={data} lang={lang} />
      <LatestWorks data={data} lang={lang} />
      <SubtitleStudio data={data} lang={lang} />
      <ToolsAndServices data={data} lang={lang} />
      <StoreAboutContact data={data} lang={lang} />
      <Subscribe data={data} lang={lang} />
      <BackgroundMusicPlayer tracks={data.backgroundMusic} lang={lang} />
      <Footer data={data} lang={lang} />
    </main>
  )
}
