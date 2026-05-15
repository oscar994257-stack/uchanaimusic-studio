export function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v')

      const [prefix, id] = parsed.pathname.split('/').filter(Boolean)
      if (['shorts', 'embed', 'live'].includes(prefix)) return id || null
    }
  } catch {
    const match = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{6,})/)
    return match?.[1] || null
  }

  return null
}

export function getYouTubeThumbnail(url?: string | null, quality: 'maxresdefault' | 'hqdefault' = 'maxresdefault') {
  const videoId = extractYouTubeId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : null
}
