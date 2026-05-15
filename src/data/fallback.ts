import type { HomeData } from '@/lib/types'

export const fallbackData: HomeData = {
  siteSettings: {
    siteName: 'UchanAIMusic Studio｜AI Music, Anime MV & Creative Tools',
    seoTitle: 'UchanAIMusic Studio｜AI Music, Anime MV & Creative Tools',
    seoDescription: 'A dreamlike anime sci-fi studio for AI music, anime MV, subtitle tools, and creative apps.',
    youtubeUrl: 'https://www.youtube.com/@UchanAIMusic',
    itchUrl: 'https://uchanaimusic.itch.io',
    email: 'oscar994257@gmail.com',
    twitterUrl: '',
    discordUrl: ''
  },
  hero: {
    title: 'UchanAIMusic Studio',
    subtitle: 'AI Music, Anime MV & Creative Tools',
    japaneseLine: '音楽とAIで、夢をカタチに。',
    englishLine: 'Turning music and AI into dreamlike worlds.',
    buttonText: 'Watch MV',
    buttonUrl: 'https://www.youtube.com/@UchanAIMusic',
    heroImageUrl: '/images/UchanAIMusic(2).png'
  },
  works: [
    {
      title: '死後駅 / Shigo Eki',
      type: 'AI Anime MV',
      category: 'Music Video',
      description: 'A cinematic anime music video from the UchanAIMusic world.',
      youtubeUrl: 'https://www.youtube.com/@UchanAIMusic',
      featured: true,
      order: 1
    },
    {
      title: 'Eternal Echoes',
      type: 'Original Song',
      category: 'AI Music',
      description: 'Dreamlike vocals, neon ambience, and cosmic emotion.',
      youtubeUrl: 'https://www.youtube.com/@UchanAIMusic',
      featured: true,
      order: 2
    },
    {
      title: 'Starlight Memory',
      type: 'AI Music Video',
      category: 'Anime MV',
      description: 'A starry visual journey built for music and motion.',
      youtubeUrl: 'https://www.youtube.com/@UchanAIMusic',
      featured: true,
      order: 3
    }
  ],
  subtitleStudio: {
    title: 'UchanAIMusic Subtitle Studio',
    subtitle: 'AIで、字幕をもっと自由に。',
    features: [
      'AI subtitle generation',
      'Lyrics timeline sync',
      'Drag-to-adjust subtitle timing',
      'Subtitle style customization',
      'MP4 export',
      'Designed for AI Music / MV / PV creators'
    ],
    downloadUrl: '#store',
    itchUrl: 'https://uchanaimusic.itch.io',
    learnMoreUrl: '#subtitle-studio'
  },
  tools: [
    {
      toolName: 'UchanAIMusic Subtitle Studio',
      description: 'AI字幕生成ツール',
      status: 'Available',
      icon: 'captions',
      buttonText: 'More Info',
      buttonUrl: '#subtitle-studio'
    },
    {
      toolName: 'Uchan Voice Lab',
      description: 'AIボイス・歌声生成ツール',
      status: 'Coming Soon',
      icon: 'mic',
      buttonText: 'Coming Soon',
      buttonUrl: '#tools'
    }
  ],
  services: [
    { serviceName: 'AI Music Production', description: '作曲・編曲・BGM制作', icon: 'music', order: 1 },
    { serviceName: 'Anime MV Production', description: 'AI映像・MV制作', icon: 'video', order: 2 },
    { serviceName: 'Game BGM Production', description: 'Loopable themes and scene music', icon: 'gamepad', order: 3 },
    { serviceName: 'Vocal / Voice Editing', description: 'ボーカル制作・編集', icon: 'mic2', order: 4 },
    { serviceName: 'Mixing & Mastering', description: 'ミックス・マスタリング', icon: 'sliders', order: 5 },
    { serviceName: 'Subtitle / Lyrics Sync', description: '字幕・歌詞タイミング調整', icon: 'captions', order: 6 },
    { serviceName: 'Custom Requests', description: 'その他ご相談ください', icon: 'sparkles', order: 7 }
  ],
  products: [
    {
      productName: 'UchanAIMusic Subtitle Studio',
      description: 'Subtitle creation and timing tools for AI Music / MV / PV creators.',
      platform: 'itch.io',
      url: 'https://uchanaimusic.itch.io',
      status: 'Available'
    },
    {
      productName: 'Project Releases',
      description: 'Future app builds and open releases will be linked here.',
      platform: 'GitHub Release',
      url: 'https://github.com/oscar994257-stack/uchanaimusic-studio/releases',
      status: 'Coming Soon'
    }
  ],
  about: {
    zh: 'UchanAIMusic Studio 是一個結合 AI 音樂、Anime MV、字幕工具與夢幻視覺創作的個人創作工作室。',
    en: 'UchanAIMusic Studio is a creative project focused on AI music, anime-style music videos, subtitle tools, and dreamlike digital worlds.'
  },
  contact: {
    email: 'oscar994257@gmail.com',
    youtubeUrl: 'https://www.youtube.com/@UchanAIMusic',
    itchUrl: 'https://uchanaimusic.itch.io',
    twitterUrl: '',
    discordUrl: ''
  },
  backgroundMusic: []
}
