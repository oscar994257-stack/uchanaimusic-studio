import { NextRequest, NextResponse } from 'next/server'
import { client, publishedAdvertisementsQuery } from '@/lib/sanity'
import type { Advertisement } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  if (!['zh', 'zh-CN', 'en', 'ja', 'ko'].includes(lang)) return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
  try {
    const advertisements = await client.withConfig({ useCdn: false, perspective: 'published' }).fetch<Advertisement[]>(publishedAdvertisementsQuery, {}, { cache: 'no-store' })
    // Keep advertiser-approved copy unchanged so brands and line limits survive.
    return NextResponse.json({ advertisements, mode: 'original' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Advertisements temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
