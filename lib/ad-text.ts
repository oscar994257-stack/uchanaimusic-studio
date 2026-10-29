export const AD_TEXT_LIMITS = {
  title: { columns: 20, rows: 1 },
  advertiser: { columns: 24, rows: 1 },
  body: { columns: 24, rows: 3 },
} as const

export function adCharacters(value: string) {
  if (typeof Intl.Segmenter === 'function') return Array.from(new Intl.Segmenter('zh-Hant', { granularity: 'grapheme' }).segment(value), item => item.segment)
  return Array.from(value.normalize('NFC'))
}

export function adTextLength(value: string) {
  return adCharacters(value).filter(character => /\S/u.test(character)).length
}

export function adTextLines(value = '', columns = 24) {
  return value.replace(/\r\n?/g, '\n').split('\n').flatMap(line => {
    const lines: string[] = []
    let current = ''
    let count = 0
    for (const character of adCharacters(line)) {
      const counted = /\S/u.test(character)
      if (counted && count === columns) { lines.push(current); current = ''; count = 0 }
      current += character
      if (counted) count++
    }
    lines.push(current)
    return lines
  })
}

export function validateAdText(value: string | undefined, limit: { columns: number; rows: number }) {
  if (!value) return true
  const paragraphs = value.replace(/\r\n?/g, '\n').split('\n')
  if (limit.rows === 1 && (paragraphs.length > 1 || adTextLength(value) > limit.columns)) return `限 1 行、最多 ${limit.columns} 字；空格不計，標點與 emoji 計入。`
  const lines = adTextLines(value, limit.columns)
  return lines.length <= limit.rows || `每行最多 ${limit.columns} 字、最多 ${limit.rows} 行；目前為 ${lines.length} 行。空格不計，標點與 emoji 計入。`
}

export function displayAdText(value: string | undefined, limit: { columns: number; rows: number }) {
  const lines = adTextLines(value, limit.columns)
  if (lines.length <= limit.rows) return lines
  const visible = lines.slice(0, limit.rows)
  visible[visible.length - 1] = adTextLines(visible[visible.length - 1], limit.columns - 1)[0].trimEnd() + '…'
  return visible
}
