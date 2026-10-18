import 'server-only'
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { unstable_cache } from 'next/cache'
import { client } from './sanity'

export function taipeiDay(time = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(time)
}

const writer = () => client.withConfig({ token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false })
export const statsEnabled = () => !!(process.env.SANITY_API_WRITE_TOKEN && (process.env.VISITOR_COOKIE_SECRET?.length || 0) >= 32)
const sign = (value: string) => createHmac('sha256', process.env.VISITOR_COOKIE_SECRET!).update(value).digest('hex')

export function visitorIdentity(cookie?: string) {
  const [id, signature] = (cookie || '').split('.')
  const expected = id && /^[a-f0-9-]{36}$/.test(id) ? sign(id) : ''
  if (expected && signature && /^[a-f0-9]{64}$/.test(signature) && timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return { id, cookie: `${id}.${signature}` }
  const next = randomUUID()
  return { id: next, cookie: `${next}.${sign(next)}` }
}

export async function recordVisitor(id: string) {
  const db = writer()
  const now = new Date()
  const day = taipeiDay(now)
  const identifier = sign(id)
  // Stable document IDs make repeat requests idempotent, including parallel requests.
  await db.transaction()
    .createIfNotExists({ _id: 'traffic-settings', _type: 'trafficSettings', startedAt: now.toISOString() })
    .createIfNotExists({ _id: `traffic-visitor.${identifier}`, _type: 'trafficVisitor', visitor: identifier })
    .createIfNotExists({ _id: `traffic-day.${day}.${identifier}`, _type: 'trafficDay', day, visitor: identifier })
    .commit({ visibility: 'sync' })
}

export const readVisitorStats = unstable_cache(async () => {
  const now = new Date()
  const today = taipeiDay(now)
  const week = taipeiDay(new Date(now.getTime() - 6 * 86400000))
  const month = taipeiDay(new Date(now.getTime() - 27 * 86400000))
  const result = await writer().fetch(`{
    "startedAt": *[_id == "traffic-settings"][0].startedAt,
    "today": count(*[_type == "trafficDay" && day == $today]),
    "week": count(array::unique(*[_type == "trafficDay" && day >= $week && day <= $today].visitor)),
    "month": count(array::unique(*[_type == "trafficDay" && day >= $month && day <= $today].visitor)),
    "total": count(*[_type == "trafficVisitor"])
  }`, { today, week, month })
  return { ...result, updatedAt: now.toISOString(), timezone: 'Asia/Taipei' }
}, ['public-visitor-statistics-v1'], { revalidate: 3600 })
