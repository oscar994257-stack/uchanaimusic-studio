'use client'

import imageUrlBuilder from '@sanity/image-url'
import { Card, Stack, Text } from '@sanity/ui'
import { type ObjectInputProps, useClient, useFormValue } from 'sanity'

export function AdvertisementInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: '2026-05-15' })
  const title = useFormValue(['title']) as string | undefined
  const description = useFormValue(['description']) as string | undefined
  const caption = useFormValue(['caption']) as string | undefined
  const image = useFormValue(['image']) as { asset?: { _ref?: string }; alt?: string } | undefined
  const imageUrl = image?.asset?._ref ? imageUrlBuilder(client).image(image).width(720).fit('max').url() : ''
  return <Stack space={4}>
    <Card padding={4} radius={2} border>
      <Stack space={3}>
        <Text weight="semibold">素材預覽（草稿不會刊登到官網）</Text>
        <Text size={1}>先填「廣告內容」並上傳圖片，即可在這裡檢查；要上線時，再設定「刊登設定」、開啟啟用並按 Publish。官網更新可能需約一分鐘，請重新整理查看。</Text>
        <div style={{ maxWidth: 360, margin: '0 auto', width: '100%', borderRadius: 14, overflow: 'hidden', background: '#151b30', color: '#ede6fa' }}>
          {imageUrl ? <img src={imageUrl} alt={image?.alt || title || '廣告素材預覽'} style={{ display: 'block', width: '100%', height: 240, objectFit: 'contain' }} /> : <div style={{ padding: '48px 20px', textAlign: 'center', color: '#bcb0d5' }}>上傳廣告主視覺</div>}
          <div style={{ padding: 18 }}><strong>{title || '廣告標題'}</strong><p style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{description || '這裡顯示廣告說明。'}</p></div>
        </div>
        {caption && <Text size={1}>跑馬燈預覽：{Array.from(caption).slice(0, 100).join('')}</Text>}
      </Stack>
    </Card>
    {props.renderDefault(props)}
  </Stack>
}
