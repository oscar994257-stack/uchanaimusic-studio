export const AD_TEXT_LIMITS = {
  title: { columns: 20, rows: 1 },
  advertiser: { columns: 24, rows: 1 },
  body: { columns: 24, rows: 3 },
} as const

export function adCharacters(value: string) {
  if (typeof Intl.Segmenter === 'function') return Array.from(new Intl.Segmenter('zh-Hant', { granularity: 'grapheme' }).segment(value), item => item.segment)
  return Array.from(value.normalize('NFC'))
}

export function adTextLines(value = '', columns = 24) {
  return value.replace(/\r\n?/g, '\n').split('\n').flatMap(line => {
    const characters = adCharacters(line)
    if (!characters.length) return ['']
    return Array.from({ length: Math.ceil(characters.length / columns) }, (_, index) => characters.slice(index * columns, (index + 1) * columns).join(''))
  })
}

export function validateAdText(value: string | undefined, limit: { columns: number; rows: number }) {
  if (!value) return true
  const paragraphs = value.replace(/\r\n?/g, '\n').split('\n')
  if (limit.rows === 1 && (paragraphs.length > 1 || adCharacters(value).length > limit.columns)) return `限 1 行、最多 ${limit.columns} 字，含空格、標點與 emoji。`
  const lines = adTextLines(value, limit.columns)
  return lines.length <= limit.rows || `每行最多 ${limit.columns} 字、最多 ${limit.rows} 行；目前為 ${lines.length} 行。含空格、標點與 emoji。`
}

export function displayAdText(value: string | undefined, limit: { columns: number; rows: number }) {
  const lines = adTextLines(value, limit.columns)
  if (lines.length <= limit.rows) return lines
  const visible = lines.slice(0, limit.rows)
  visible[visible.length - 1] = adCharacters(visible[visible.length - 1]).slice(0, limit.columns - 1).join('') + '…'
  return visible
}
