import { NextRequest, NextResponse } from 'next/server'
import { getHomeData } from '@/lib/sanity'
import { translateContent } from '@/lib/translate-content'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  if (!['zh', 'zh-CN', 'en', 'ja', 'ko'].includes(lang)) return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
  const source = await getHomeData()
  try { return NextResponse.json(await translateContent(source, lang), { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' } }) }
  catch { return NextResponse.json({ data: source, mode: 'original' }, { headers: { 'Cache-Control': 'no-store' } }) }
}
