'use client'

import imageUrlBuilder from '@sanity/image-url'
import { Card, Stack, Text } from '@sanity/ui'
import { type ObjectInputProps, useClient, useFormValue } from 'sanity'
import { useEffect, useState } from 'react'
import { safeHttpsUrl } from '../../lib/site-copy'
import { getYouTubeThumbnail } from '../../lib/youtube'
import { AD_TEXT_LIMITS, displayAdText } from '../../lib/ad-text'
import { FitAdLine } from '../../components/FitAdLine'

export function AdvertisementInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: '2026-05-15' })
  const title = useFormValue(['title']) as string | undefined
  const advertiser = useFormValue(['advertiserName']) as string | undefined
  const description = useFormValue(['description']) as string | undefined
  const mediaType = useFormValue(['mediaType']) as string | undefined
  const youtubeUrl = useFormValue(['youtubeUrl']) as string | undefined
  const targetUrl = safeHttpsUrl(useFormValue(['targetUrl']) as string | undefined)
  const enabled = useFormValue(['enabled']) as boolean | undefined
  const startsAt = useFormValue(['startsAt']) as string | undefined
  const endsAt = useFormValue(['endsAt']) as string | undefined
  const [now, setNow] = useState(0)
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 15000); return () => window.clearInterval(timer) }, [])
  const image = useFormValue(['image']) as { asset?: { _ref?: string }; alt?: string } | undefined
  const imageUrl = image?.asset?._ref ? imageUrlBuilder(client).image(image).width(960).fit('max').url() : ''
  const previewUrl = mediaType === 'youtube' ? getYouTubeThumbnail(youtubeUrl) : imageUrl
  return <Stack space={4}>
    <Card padding={4} radius={2} border>
      <Stack space={3}>
        <Text weight="semibold">廣告草稿預覽（不會直接刊登）</Text>
        <Text size={1}>共四個版位：01 示範、02–04 合作。每則選「單張圖片」或「YouTube 影片」。圖片下依序顯示標題 20 字一行、廣告商 24 字一行、內文每行 24 字最多三行；空格不計，標點和 emoji 計入。換行不算字數，但占一行。</Text>
        <Text size={1}>兩則以上每 5 秒換下一則，保留手動切換。影片不會自動播放；播放、暫停及緩衝期間保留該則，結束 10 秒後才切換。刊期內啟用後按 Publish，官網收到發布事件立即重讀；連線備援每 15 秒檢查。第一次使用新版請重新整理官網。</Text>
        <Text size={1}>{!enabled ? '尚未啟用：Publish 後也不會顯示。請到「刊登設定」開啟啟用。' : !startsAt || !endsAt ? '請完成刊登開始與結束時間。' : !now ? '正在確認刊期…' : Date.parse(startsAt) > now ? '已啟用，但尚未到刊登時間。' : Date.parse(endsAt) <= now ? '刊期已結束，官網會自動隱藏。' : '已啟用且在刊期內。儲存草稿後，仍需按 Publish 才會更新官網。'}</Text>
        <div style={{ maxWidth: 480, margin: '0 auto', width: '100%', containerType: 'inline-size', borderRadius: 14, overflow: 'hidden', background: '#151b30', color: '#ede6fa' }}>
          {previewUrl ? <img src={previewUrl} alt={image?.alt || title || '廣告素材預覽'} style={{ display: 'block', width: '100%', aspectRatio: '16/9', objectFit: 'contain', background: '#080c19' }} /> : <div style={{ padding: '48px 20px', textAlign: 'center', color: '#bcb0d5' }}>{mediaType === 'youtube' ? '貼上 YouTube 網址後顯示縮圖' : '上傳一張 16:9 廣告圖片'}</div>}
          <div style={{ padding: 20 }}>
            <strong style={{ fontSize: 'clamp(12px, calc((100cqw - 40px) / 20), 20px)', display: 'block', whiteSpace: 'pre', lineHeight: 1.6 }}><FitAdLine>{displayAdText(title || '廣告標題', AD_TEXT_LIMITS.title)[0]}</FitAdLine></strong>
            <p style={{ fontSize: 'clamp(10px, calc((100cqw - 40px) / 24), 16px)', color: '#a7d9e2', whiteSpace: 'pre', marginTop: 6, lineHeight: 1.7 }}><FitAdLine>{displayAdText(advertiser || '廣告商名稱（請填寫）', AD_TEXT_LIMITS.advertiser)[0]}</FitAdLine></p>
            <p style={{ fontSize: 'clamp(10px, calc((100cqw - 40px) / 24), 16px)', lineHeight: 1.8, marginTop: 12, minHeight: '5.4em' }}>{displayAdText(description || '', AD_TEXT_LIMITS.body).map((line, index) => <FitAdLine key={index}>{line || '\u00a0'}</FitAdLine>)}</p>
            {mediaType === 'youtube' && <p style={{ fontSize: 11, color: '#a2b2ca', marginTop: 12 }}>YouTube 縮圖預覽；官網由訪客自行按播放。</p>}
          </div>
          {targetUrl && <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, textAlign: 'center', color: '#9ddce7', fontSize: 13, borderTop: '1px solid #ffffff20' }}>了解更多 ↗</a>}
        </div>
      </Stack>
    </Card>
    {props.renderDefault(props)}
  </Stack>
}
