export type SiteSettings = {
  siteName?: string
  seoTitle?: string
  seoDescription?: string
  youtubeUrl?: string
  itchUrl?: string
  email?: string
  twitterUrl?: string
  discordUrl?: string
}

export type Hero = {
  title?: string
  subtitle?: string
  japaneseLine?: string
  englishLine?: string
  buttonText?: string
  buttonUrl?: string
  heroImageUrl?: string
}

export type Work = {
  title: string
  type?: string
  category?: string
  description?: string
  youtubeUrl?: string
  featured?: boolean
  order?: number
  publishedAt?: string
}

export type SubtitleStudio = {
  title?: string
  subtitle?: string
  features?: string[]
  downloadUrl?: string
  itchUrl?: string
  learnMoreUrl?: string
}

export type ToolItem = {
  toolName: string
  description?: string
  status?: string
  icon?: string
  buttonText?: string
  buttonUrl?: string
}

export type Service = {
  serviceName: string
  description?: string
  icon?: string
  order?: number
}

export type Product = {
  productName: string
  description?: string
  platform?: string
  url?: string
  status?: string
}

export type About = {
  zh?: string
  en?: string
}

export type Contact = {
  email?: string
  youtubeUrl?: string
  itchUrl?: string
  twitterUrl?: string
  discordUrl?: string
}

export type BackgroundMusicTrack = {
  trackTitle: string
  audioUrl?: string
  youtubeUrl?: string
  enabled?: boolean
  order?: number
}

export type HomeData = {
  siteSettings: SiteSettings
  hero: Hero
  works: Work[]
  subtitleStudio: SubtitleStudio
  tools: ToolItem[]
  services: Service[]
  products: Product[]
  about: About
  contact: Contact
  backgroundMusic: BackgroundMusicTrack[]
}
