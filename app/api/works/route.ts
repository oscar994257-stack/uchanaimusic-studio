import { NextRequest, NextResponse } from 'next/server'
import { client, publishedWorksQuery } from '@/lib/sanity'
import { translateContent } from '@/lib/translate-content'
import type { Work } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  if (!['zh', 'zh-CN', 'en', 'ja', 'ko'].includes(lang)) return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
  try {
    const works = await client.withConfig({ useCdn: false, perspective: 'published' }).fetch<Work[]>(publishedWorksQuery, {}, { cache: 'no-store' })
    let result = { data: { works }, mode: 'original' }
    try { result = await translateContent({ works }, lang) } catch { /* Keep current published text if translation is unavailable. */ }
    return NextResponse.json({ works: result.data.works, mode: result.mode }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    // A failed read must not replace the gallery with fallback/demo works.
    return NextResponse.json({ error: 'Works temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
