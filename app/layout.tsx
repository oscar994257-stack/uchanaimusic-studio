import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uchanaimusic-studio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'UchanAIMusic Studio｜AI Music, Anime MV & Creative Tools',
  description: 'A dreamlike anime sci-fi studio for AI music, anime MV, subtitle tools, and creative apps.',
  openGraph: {
    title: 'UchanAIMusic Studio',
    description: 'AI Music, Anime MV & Creative Tools',
    url: siteUrl,
    siteName: 'UchanAIMusic Studio',
    images: ['/images/UchanAIMusic Studio.png']
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
