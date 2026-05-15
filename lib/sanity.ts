import { createClient } from 'next-sanity'
import { fallbackData } from '@/src/data/fallback'
import type { HomeData } from './types'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-15'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q1mcui2q'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true
})

const homeQuery = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0]{
    title, subtitle, japaneseLine, englishLine, buttonText, buttonUrl,
    "heroImageUrl": heroImage.asset->url
  },
  "works": *[_type == "work"] | order(coalesce(order, 999) asc, publishedAt desc) {
    title, type, category, description, youtubeUrl, featured, order, publishedAt
  },
  "subtitleStudio": *[_type == "subtitleStudio"][0],
  "tools": *[_type == "tool"] | order(_createdAt asc) {
    toolName, description, status, icon, buttonText, buttonUrl
  },
  "services": *[_type == "service"] | order(coalesce(order, 999) asc) {
    serviceName, description, icon, order
  },
  "products": *[_type == "product"] | order(_createdAt asc) {
    productName, description, platform, url, status
  },
  "about": *[_type == "about"][0],
  "contact": *[_type == "contact"][0]
}`

function mergeData(data?: Partial<HomeData> | null): HomeData {
  return {
    siteSettings: { ...fallbackData.siteSettings, ...(data?.siteSettings || {}) },
    hero: { ...fallbackData.hero, ...(data?.hero || {}) },
    works: data?.works?.length ? data.works : fallbackData.works,
    subtitleStudio: { ...fallbackData.subtitleStudio, ...(data?.subtitleStudio || {}) },
    tools: data?.tools?.length ? data.tools : fallbackData.tools,
    services: data?.services?.length ? data.services : fallbackData.services,
    products: data?.products?.length ? data.products : fallbackData.products,
    about: { ...fallbackData.about, ...(data?.about || {}) },
    contact: { ...fallbackData.contact, ...(data?.contact || {}) }
  }
}

export async function getHomeData(): Promise<HomeData> {
  try {
    const data = await client.fetch<Partial<HomeData>>(homeQuery, {}, { next: { revalidate: 60 } })
    return mergeData(data)
  } catch {
    return fallbackData
  }
}
