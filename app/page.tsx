import HomePage from '@/components/HomePage'
import { getHomeData } from '@/lib/sanity'
import type { Viewport } from 'next'

export const revalidate = 60

type PageProps = { searchParams: Promise<{ view?: string | string[] }> }

export async function generateViewport({ searchParams }: PageProps): Promise<Viewport> {
  const { view } = await searchParams
  // Omit initial-scale in desktop mode so mobile browsers fit the full 1280px
  // layout to the screen naturally. Do not restrict pinch zoom.
  return view === 'desktop'
    ? { width: 1280, initialScale: undefined, userScalable: true }
    : { width: 'device-width', initialScale: 1, userScalable: true }
}

export default async function Page({ searchParams }: PageProps) {
  const { view } = await searchParams
  const data = await getHomeData()
  return <HomePage data={data} desktopMode={view === 'desktop'} />
}
