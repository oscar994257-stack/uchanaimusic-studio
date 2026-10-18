import 'server-only'
import { unstable_cache } from 'next/cache'

const targets: Record<string, string> = { zh: 'zh-TW', 'zh-CN': 'zh-CN', en: 'en', ja: 'ja', ko: 'ko' }
const fields = new Set(['title', 'subtitle', 'japaneseLine', 'englishLine', 'buttonText', 'description', 'type', 'category', 'serviceName', 'toolName', 'productName', 'status', 'caption', 'features', 'zh', 'en'])
const brand = /UchanAIMusic(?: Studio)?|Uchan Voice Lab|PanelBeat-Studio/g
const translateBatch = unstable_cache(async (texts: string[], lang: string) => {
  const protectedTexts = texts.map(value => value.replace(brand, match => ({ 'UchanAIMusic Studio': 'UCHANBRANDSTUDIO', UchanAIMusic: 'UCHANBRAND', 'Uchan Voice Lab': 'UCHANVOICELAB', 'PanelBeat-Studio': 'PANELBEATSTUDIO' })[match] || match))
  const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': process.env.GOOGLE_TRANSLATE_API_KEY! },
    body: JSON.stringify({ q: protectedTexts, target: targets[lang], format: 'text' }), cache: 'no-store', signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('Translation provider unavailable')
  const result = await response.json()
  const translations = result.data?.translations as { translatedText: string }[] | undefined
  if (translations?.length !== texts.length) throw new Error('Incomplete translation')
  return translations.map(item => item.translatedText.replaceAll('UCHANBRANDSTUDIO', 'UchanAIMusic Studio').replaceAll('UCHANBRAND', 'UchanAIMusic').replaceAll('UCHANVOICELAB', 'Uchan Voice Lab').replaceAll('PANELBEATSTUDIO', 'PanelBeat-Studio'))
}, ['cms-translation-v1'], { revalidate: 86400 })

export async function translateContent<T extends object>(source: T, lang: string) {
  if (!targets[lang]) return { data: source, mode: 'original' }
  if (!process.env.GOOGLE_TRANSLATE_API_KEY) return { data: source, mode: 'original' }
  const data = structuredClone(source)
  const tasks: { object: Record<string, unknown>; key: string; text: string }[] = []
  function visit(value: unknown, path = '') {
    if (!value || typeof value !== 'object') return
    for (const [key, entry] of Object.entries(value)) {
      if (key.endsWith('I18n') || path === 'siteSettings' || key === 'trackTitle' || entry === 'UchanAIMusic Studio') continue
      if (typeof entry === 'string' && fields.has(key) && entry.trim()) {
        const manual = (value as Record<string, unknown>)[`${key}I18n`] as Record<string, string> | undefined
        const languageKey = lang === 'zh-CN' ? 'zhCN' : lang
        if (manual?.[languageKey]) { (value as Record<string, unknown>)[key] = manual[languageKey]; continue }
        tasks.push({ object: value as Record<string, unknown>, key, text: entry })
      } else if (key === 'features' && Array.isArray(entry)) {
        entry.forEach((item, index) => { if (typeof item === 'string') tasks.push({ object: entry as unknown as Record<string, unknown>, key: String(index), text: item }) })
      } else visit(entry, key)
    }
  }
  visit(data)
  const unique = [...new Set(tasks.map(task => task.text))]
  // Only server-selected CMS content is translated. Public requests cannot submit arbitrary paid text.
  if (unique.reduce((sum, value) => sum + value.length, 0) > 60000) return { data: source, mode: 'original' }
  const translations = new Map<string, string>()
  for (let index = 0; index < unique.length; index += 40) {
    const batch = unique.slice(index, index + 40)
    const result = await translateBatch(batch, lang)
    batch.forEach((original, item) => translations.set(original, result[item]))
  }
  for (const task of tasks) task.object[task.key] = translations.get(task.text) || task.text
  return { data, mode: 'automatic' }
}
