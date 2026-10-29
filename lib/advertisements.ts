import type { Advertisement } from './types'
import { extractYouTubeId } from './youtube'

export function isAdvertisementActive(ad: Advertisement, now: number) {
  const mediaReady = ad.mediaType === 'youtube' ? /^[A-Za-z0-9_-]{11}$/.test(extractYouTubeId(ad.youtubeUrl) || '') : !!ad.imageUrl
  return mediaReady && Date.parse(ad.startsAt) <= now && Date.parse(ad.endsAt) > now
}

export function showcaseAdvertisements(ads: Advertisement[], now: number) {
  const occupied = new Set<number>()
  return ads.filter(ad => {
    if (ad.placement !== 'showcase' || !Number.isInteger(ad.slot) || ad.slot < 1 || ad.slot > 4 || !isAdvertisementActive(ad, now) || occupied.has(ad.slot)) return false
    occupied.add(ad.slot)
    return true
  }).sort((a, b) => a.slot - b.slot)
}
