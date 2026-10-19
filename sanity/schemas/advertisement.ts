import { defineField, defineType } from 'sanity'
import { calendarMonthsAfter } from '../../lib/ad-period'
import { AdvertisementInput } from '../components/AdvertisementInput'

export default defineType({
  name: 'advertisement', title: '廣告合作 / Partner Placements', type: 'document',
  components: { input: AdvertisementInput },
  groups: [{ name: 'content', title: '廣告內容', default: true }, { name: 'schedule', title: '刊登設定' }],
  initialValue: () => {
    const start = new Date().toISOString()
    return { placement: 'showcase', slot: 1, enabled: false, startsAt: start, campaignStartedAt: start, endsAt: new Date(calendarMonthsAfter(start, 1)).toISOString() }
  },
  fields: [
    defineField({ name: 'title', title: '廣告標題 / 合作名稱', group: 'content', type: 'string', description: '顯示在圖片下方，建議簡短清楚。', validation: rule => rule.required().max(60) }),
    defineField({ name: 'description', title: '廣告說明', group: 'content', type: 'text', rows: 3, description: '顯示在主視覺下方，建議 1–2 句；最多 160 字。', validation: rule => rule.custom(value => !value || Array.from(value).length <= 160 || '最多 160 字，含標點') }),
    defineField({ name: 'placement', group: 'schedule', title: '版位區域', type: 'string', options: { list: [{ title: '作品右側輪播（1–5）', value: 'showcase' }, { title: '委託方案旁（6）', value: 'commission' }] }, initialValue: 'showcase', validation: rule => rule.required() }),
    defineField({ name: 'slot', group: 'schedule', title: '版位編號', type: 'number', initialValue: 1, validation: rule => rule.required().integer().min(1).max(6).custom((value, context) => context.document?.placement === 'commission' ? value === 6 || '委託方案版位請設為 6' : (value || 0) <= 5 || '輪播版位請選 1–5') }),
    defineField({ name: 'image', title: '廣告主視覺圖片', group: 'content', type: 'image', description: '可上傳或從素材庫選取。建議 1200 × 900（4:3），重要文字留在中央；既有直式圖也可使用，官網完整顯示、不裁掉素材。', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: '圖片替代文字', type: 'string', description: '簡單描述畫面，供無法載入圖片或使用螢幕閱讀器時使用。' })], validation: rule => rule.required() }),
    defineField({ name: 'caption', group: 'content', title: '跑馬燈 / 廣告說明（含標點最多 100 字）', type: 'text', rows: 3, validation: rule => rule.custom(value => !value || Array.from(value).length <= 100 || '最多 100 字，含標點') }),
    defineField({ name: 'targetUrl', group: 'content', title: '點擊網址（HTTPS）', type: 'url', validation: rule => rule.uri({ scheme: ['https'] }) }),
    defineField({ name: 'startsAt', group: 'schedule', title: '本次刊登開始', type: 'datetime', validation: rule => rule.required() }),
    defineField({ name: 'endsAt', group: 'schedule', title: '本次刊登結束（最多一個月）', type: 'datetime', validation: rule => rule.required().custom((value, context) => {
      const start = Date.parse(String(context.document?.startsAt || '')); const end = Date.parse(value || '')
      if (!Number.isFinite(start) || !Number.isFinite(end)) return true
      return end > start && end <= calendarMonthsAfter(start, 1) || '結束必須晚於開始，且每次刊登最多一個月'
    }) }),
    defineField({ name: 'campaignStartedAt', group: 'schedule', title: '此合作首次開始（續約時保留）', type: 'datetime', description: '同一合作累計刊登最長三個月。', validation: rule => rule.required().custom((value, context) => {
      if (!value || !context.document?.endsAt) return true
      return Date.parse(String(context.document.startsAt)) >= Date.parse(value) && Date.parse(String(context.document.endsAt)) <= calendarMonthsAfter(value, 3) || '本次區間必須在首次開始後三個月內'
    }) }),
    defineField({ name: 'enabled', group: 'schedule', title: '啟用（確認合約與付款後才開啟）', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', media: 'image', slot: 'slot' }, prepare: ({ title, media, slot }) => ({ title, media, subtitle: `Placement ${slot || '—'}` }) },
})
