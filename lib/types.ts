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

export type LocalizedValue = Partial<Record<string, string>>

export type Hero = {
  title?: string
  titleI18n?: LocalizedValue
  subtitle?: string
  subtitleI18n?: LocalizedValue
  japaneseLine?: string
  shortLineI18n?: LocalizedValue
  englishLine?: string
  supportLineI18n?: LocalizedValue
  buttonText?: string
  buttonTextI18n?: LocalizedValue
  buttonUrl?: string
  heroImageUrl?: string
}

export type Work = {
  title: string
  titleI18n?: LocalizedValue
  type?: string
  typeI18n?: LocalizedValue
  category?: string
  categoryI18n?: LocalizedValue
  description?: string
  descriptionI18n?: LocalizedValue
  youtubeUrl?: string
  featured?: boolean
  order?: number
  publishedAt?: string
}

export type SubtitleStudio = {
  title?: string
  titleI18n?: LocalizedValue
  subtitle?: string
  subtitleI18n?: LocalizedValue
  features?: string[]
  downloadUrl?: string
  itchUrl?: string
  learnMoreUrl?: string
}

export type ToolItem = {
  toolName: string
  toolNameI18n?: LocalizedValue
  description?: string
  descriptionI18n?: LocalizedValue
  status?: string
  statusI18n?: LocalizedValue
  icon?: string
  buttonText?: string
  buttonTextI18n?: LocalizedValue
  buttonUrl?: string
}

export type Service = {
  serviceName: string
  serviceNameI18n?: LocalizedValue
  description?: string
  descriptionI18n?: LocalizedValue
  icon?: string
  order?: number
}

export type Product = {
  productName: string
  productNameI18n?: LocalizedValue
  description?: string
  descriptionI18n?: LocalizedValue
  platform?: string
  url?: string
  status?: string
  statusI18n?: LocalizedValue
}

export type About = {
  zh?: string
  en?: string
  bodyI18n?: LocalizedValue
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
