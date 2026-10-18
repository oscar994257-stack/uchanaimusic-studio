import { NextRequest, NextResponse } from 'next/server'
import { readVisitorStats, recordVisitor, statsEnabled, visitorIdentity } from '@/lib/visitor-stats'

export const dynamic = 'force-dynamic'
const cookieName = 'uchan_visitor'

export async function GET() {
  if (!statsEnabled()) return NextResponse.json({ configured: false }, { headers: { 'Cache-Control': 'no-store' } })
  try { return NextResponse.json({ configured: true, ...await readVisitorStats() }, { headers: { 'Cache-Control': 'no-store' } }) }
  catch { return NextResponse.json({ configured: false }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
}

// Best-effort process-local abuse control; Vercel Firewall can enforce durable limits.
const recent = new Map<string, number>()
export async function POST(request: NextRequest) {
  if (!statsEnabled()) return NextResponse.json({ configured: false })
  if (request.headers.get('origin') !== request.nextUrl.origin || request.headers.get('sec-fetch-site') === 'cross-site') return new NextResponse(null, { status: 403 })
  if (/bot|crawler|spider|headless/i.test(request.headers.get('user-agent') || '')) return new NextResponse(null, { status: 204 })
  const identity = visitorIdentity(request.cookies.get(cookieName)?.value)
  if ((recent.get(identity.id) || 0) > Date.now() - 60000) return new NextResponse(null, { status: 204 })
  if (recent.size > 5000) recent.clear()
  recent.set(identity.id, Date.now())
  try {
    await recordVisitor(identity.id)
    const response = NextResponse.json({ recorded: true })
    response.cookies.set(cookieName, identity.cookie, { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: 31536000 })
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch { recent.delete(identity.id); return NextResponse.json({ recorded: false }, { status: 503 }) }
}
