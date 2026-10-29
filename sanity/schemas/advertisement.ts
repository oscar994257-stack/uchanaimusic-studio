import { defineField, defineType } from 'sanity'
import { calendarMonthsAfter } from '../../lib/ad-period'
import { AD_TEXT_LIMITS, adCharacters, validateAdText } from '../../lib/ad-text'
import { extractYouTubeId } from '../../lib/youtube'
import { AdvertisementInput } from '../components/AdvertisementInput'
import { AdAdvertiserInput, AdBodyInput, AdTitleInput } from '../components/AdTextInput'

export default defineType({
  name: 'advertisement', title: '廣告合作 / Partner Placements', type: 'document',
  components: { input: AdvertisementInput },
  groups: [{ name: 'content', title: '廣告內容', default: true }, { name: 'schedule', title: '刊登設定' }],
  initialValue: () => {
    const start = new Date().toISOString()
    return { placement: 'showcase', slot: 1, mediaType: 'image', enabled: false, startsAt: start, campaignStartedAt: start, endsAt: new Date(calendarMonthsAfter(start, 1)).toISOString() }
  },
  fields: [
    defineField({ name: 'mediaType', title: '廣告素材類型', group: 'content', type: 'string', initialValue: 'image', options: { layout: 'radio', list: [{ title: '單張圖片', value: 'image' }, { title: 'YouTube 影片（站內手動播放）', value: 'youtube' }] }, validation: rule => rule.custom(value => !value || ['image', 'youtube'].includes(value) || '請選圖片或 YouTube 影片') }),
    defineField({ name: 'image', title: '廣告圖片（只放一張）', group: 'content', type: 'image', hidden: ({ document }) => document?.mediaType === 'youtube', description: '建議 1200 × 675（16:9）。完整顯示，不裁掉素材。', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: '圖片替代文字', type: 'string' })], validation: rule => rule.custom((value, context) => context.document?.mediaType === 'youtube' || !!value?.asset?._ref || '請上傳一張圖片') }),
    defineField({ name: 'youtubeUrl', title: 'YouTube 影片網址', group: 'content', type: 'url', hidden: ({ document }) => document?.mediaType !== 'youtube', description: '只支援 YouTube 站內播放；不自動播放。使用者自行播放、暫停、全螢幕；影片結束 10 秒後才換下一則。', validation: rule => rule.uri({ scheme: ['https'] }).custom((value, context) => context.document?.mediaType !== 'youtube' || /^[A-Za-z0-9_-]{11}$/.test(extractYouTubeId(value) || '') || '請貼上有效的 YouTube 影片網址') }),
    defineField({ name: 'title', title: '第一行：廣告標題（最多 20 字）', group: 'content', type: 'string', components: { input: AdTitleInput }, validation: rule => rule.required().custom(value => validateAdText(value, AD_TEXT_LIMITS.title)) }),
    defineField({ name: 'advertiserName', title: '第二行：廣告商名稱（最多 24 字）', group: 'content', type: 'string', description: '舊廣告請補填這一欄，再按 Publish。', components: { input: AdAdvertiserInput }, validation: rule => rule.required().custom(value => validateAdText(value, AD_TEXT_LIMITS.advertiser)) }),
    defineField({ name: 'description', title: '第三行起：廣告內文（每行 24 字，最多 3 行）', group: 'content', type: 'text', rows: 3, description: '空格不計字數，標點及 emoji 計入；每滿 24 字自動另起一行。可按 Enter 換行（換行不算字數，但占一行），最多三行、72 字；超過限制無法 Publish。', components: { input: AdBodyInput }, validation: rule => rule.custom(value => validateAdText(value, AD_TEXT_LIMITS.body)) }),
    defineField({ name: 'targetUrl', group: 'content', title: '了解更多：連結網址（選填 HTTPS）', type: 'url', description: '填寫後自動顯示可點擊的連結；只有 YouTube 類型會嵌入站內播放器。', validation: rule => rule.uri({ scheme: ['https'] }) }),
    defineField({ name: 'caption', group: 'content', title: '獨立跑馬燈（選填，最多 100 字）', type: 'text', rows: 2, description: '這一欄顯示在作品區下方的跑馬燈，不是圖片下方的廣告內文。', validation: rule => rule.custom(value => !value || adCharacters(value).length <= 100 || '最多 100 字，含空格、標點及 emoji') }),
    defineField({ name: 'placement', group: 'schedule', title: '刊登區域', type: 'string', options: { list: [{ title: '作品旁四個廣告版位', value: 'showcase' }] }, initialValue: 'showcase', validation: rule => rule.required().custom(value => value === 'showcase' || '舊版位已停用，請改為作品旁廣告區並選 1–4') }),
    defineField({ name: 'slot', group: 'schedule', title: '廣告版位（共四個）', type: 'number', initialValue: 1, options: { list: [{ title: '01｜示範廣告', value: 1 }, { title: '02｜廣告合作', value: 2 }, { title: '03｜廣告合作', value: 3 }, { title: '04｜廣告合作', value: 4 }] }, validation: rule => rule.required().integer().min(1).max(4).custom(async (value, context) => {
      const doc = context.document
      if (!value || doc?.enabled !== true || !doc.startsAt || !doc.endsAt) return true
      const id = String(doc._id || '').replace(/^drafts\./, '')
      try {
        const occupied = await context.getClient({ apiVersion: '2026-05-15' }).withConfig({ useCdn: false, perspective: 'published' }).fetch<string[]>('*[_type == "advertisement" && placement == "showcase" && enabled == true && slot == $slot && _id != $id && dateTime(startsAt) < dateTime($end) && dateTime(endsAt) > dateTime($start)]._id', { slot: value, id, start: doc.startsAt, end: doc.endsAt })
        return occupied.length === 0 || '這個版位在相同刊期已有廣告，請改選其他版位或先停用原廣告。'
      } catch { return '暫時無法確認版位，請連線後再試。' }
    }) }),
    defineField({ name: 'startsAt', group: 'schedule', title: '本次刊登開始', type: 'datetime', validation: rule => rule.required() }),
    defineField({ name: 'endsAt', group: 'schedule', title: '本次刊登結束（最多一個月）', type: 'datetime', validation: rule => rule.required().custom((value, context) => {
      const start = Date.parse(String(context.document?.startsAt || '')); const end = Date.parse(value || '')
      if (!Number.isFinite(start) || !Number.isFinite(end)) return true
      return end > start && end <= calendarMonthsAfter(start, 1) || '結束必須晚於開始，且每次刊登最多一個月'
    }) }),
    defineField({ name: 'campaignStartedAt', group: 'schedule', title: '此合作首次開始（續刊時保留）', type: 'datetime', description: '同一合作累計最長三個月。', validation: rule => rule.required().custom((value, context) => !value || !context.document?.endsAt || Date.parse(String(context.document.startsAt)) >= Date.parse(value) && Date.parse(String(context.document.endsAt)) <= calendarMonthsAfter(value, 3) || '本次區間必須在首次開始後三個月內') }),
    defineField({ name: 'enabled', group: 'schedule', title: '啟用這則廣告', type: 'boolean', initialValue: false, description: '啟用且在刊期內的已發布廣告才會出現在官網。' }),
  ],
  preview: { select: { title: 'title', media: 'image', slot: 'slot', advertiser: 'advertiserName' }, prepare: ({ title, media, slot, advertiser }) => ({ title, media, subtitle: `${slot === 1 ? '示範 01' : `版位 ${slot || '—'}`} · ${advertiser || '請補廣告商名稱'}` }) },
})
