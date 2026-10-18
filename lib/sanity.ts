import { createClient } from 'next-sanity'
import { fallbackData } from '@/src/data/fallback'
import type { HomeData } from './types'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-15'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = 'qlmcui2q'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
})

export const publishedWorksQuery = `*[_type == "work"] | order(_createdAt desc, _id asc) [0...5] {
  _id, title, titleI18n, type, typeI18n, category, categoryI18n, description, descriptionI18n, youtubeUrl
}`

const homeQuery = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0]{
    title, titleI18n, subtitle, subtitleI18n, japaneseLine, shortLineI18n, englishLine, supportLineI18n, buttonText, buttonTextI18n, buttonUrl,
    "heroImageUrl": heroImage.asset->url
  },
  "works": ${publishedWorksQuery},
  "subtitleStudio": *[_type == "subtitleStudio"][0]{
    title, titleI18n, subtitle, subtitleI18n, features, downloadUrl, itchUrl, learnMoreUrl
  },
  "tools": *[_type == "tool"] | order(_createdAt asc) {
    toolName, toolNameI18n, description, descriptionI18n, status, statusI18n, icon, buttonText, buttonTextI18n, buttonUrl
  },
  "services": *[_type == "service"] | order(coalesce(order, 999) asc) {
    serviceName, serviceNameI18n, description, descriptionI18n, icon, order
  },
  "products": *[_type == "product"] | order(_createdAt asc) {
    productName, productNameI18n, description, descriptionI18n, platform, url, status, statusI18n
  },
  "about": *[_type == "about"][0]{zh, en, bodyI18n},
  "contact": *[_type == "contact"][0],
  "advertisements": *[_type == "advertisement" && enabled == true && dateTime(startsAt) <= dateTime(now()) && dateTime(endsAt) > dateTime(now())] | order(slot asc, _updatedAt desc) {
    _id, title, placement, slot, caption, targetUrl, startsAt, endsAt, "imageUrl": image.asset->url
  }
  ,
  "backgroundMusic": *[_type == "backgroundMusic" && enabled == true] | order(coalesce(order, 999) asc) {
    trackTitle,
    "audioUrl": audioFile.asset->url,
    youtubeUrl,
    enabled,
    order
  }
}`

function mergeData(data?: Partial<HomeData> | null): HomeData {
  return {
    advertisements: data?.advertisements || [],
    siteSettings: { ...fallbackData.siteSettings, ...(data?.siteSettings || {}) },
    hero: { ...fallbackData.hero, ...(data?.hero || {}) },
    works: Array.isArray(data?.works) ? data.works : fallbackData.works,
    subtitleStudio: { ...fallbackData.subtitleStudio, ...(data?.subtitleStudio || {}) },
    tools: data?.tools?.length ? data.tools : fallbackData.tools,
    services: data?.services?.length ? data.services : fallbackData.services,
    products: data?.products?.length ? data.products : fallbackData.products,
    about: { ...fallbackData.about, ...(data?.about || {}) },
    contact: { ...fallbackData.contact, ...(data?.contact || {}) },
    backgroundMusic: data?.backgroundMusic?.length ? data.backgroundMusic : fallbackData.backgroundMusic
  }
}

export async function getHomeData(fresh = false): Promise<HomeData> {
  try {
    const data = await client.withConfig({ useCdn: !fresh, perspective: 'published' }).fetch<Partial<HomeData>>(homeQuery, {}, fresh ? { cache: 'no-store' } : { next: { revalidate: 60 } })
    return mergeData(data)
  } catch {
    return fallbackData
  }
}
