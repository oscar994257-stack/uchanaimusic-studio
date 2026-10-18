'use client'

import { useState } from 'react'
import { useFormValue, type StringInputProps } from 'sanity'
import { Card, Stack, Text } from '@sanity/ui'
import { getYouTubeThumbnail } from '../../lib/youtube'

export function YouTubeThumbnailInput(_props: StringInputProps) {
  const youtubeUrl = useFormValue(['youtubeUrl']) as string | undefined
  const thumbnail = getYouTubeThumbnail(youtubeUrl)
  return thumbnail ? <Thumbnail key={thumbnail} url={youtubeUrl!} /> : (
    <Card padding={3} border radius={2}>
      <Text size={1}>貼上 YouTube 網址後，這裡會自動顯示影片縮圖，無需上傳。</Text>
    </Card>
  )
}

function Thumbnail({ url }: { url: string }) {
  const [quality, setQuality] = useState<'maxresdefault' | 'hqdefault'>('maxresdefault')
  const [unavailable, setUnavailable] = useState(false)
  const fallback = () => quality === 'maxresdefault' ? setQuality('hqdefault') : setUnavailable(true)

  return (
    <Stack space={3}>
      {unavailable ? <Text size={1}>目前無法載入縮圖，請確認影片網址及公開狀態。</Text> : (
        <img
          src={getYouTubeThumbnail(url, quality)!}
          alt="YouTube 影片縮圖"
          style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 8 }}
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth < 200) fallback()
          }}
          onError={fallback}
        />
      )}
      <Text size={1}>縮圖依 YouTube 網址自動產生。</Text>
    </Stack>
  )
}
