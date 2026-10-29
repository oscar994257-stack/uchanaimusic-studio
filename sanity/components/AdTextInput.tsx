'use client'

import { Stack, Text } from '@sanity/ui'
import type { StringInputProps, TextInputProps } from 'sanity'
import { AD_TEXT_LIMITS, adTextLength, adTextLines, validateAdText } from '../../lib/ad-text'

function Counter({ value, limit }: { value?: string; limit: { columns: number; rows: number } }) {
  const lines = adTextLines(value, limit.columns)
  const validation = validateAdText(value, limit)
  return <Text size={1} muted={validation === true} style={validation === true ? undefined : { color: '#e85d75' }}>{validation === true ? `${lines.map((line, index) => `第 ${index + 1} 行 ${adTextLength(line)}/${limit.columns} 字`).join(' · ')}；最多 ${limit.rows} 行（空格不計，標點、emoji 計入；換行占一行）` : validation}</Text>
}

export function AdTitleInput(props: StringInputProps) {
  return <Stack space={3}>{props.renderDefault(props)}<Counter value={props.value} limit={AD_TEXT_LIMITS.title} /></Stack>
}
export function AdAdvertiserInput(props: StringInputProps) {
  return <Stack space={3}>{props.renderDefault(props)}<Counter value={props.value} limit={AD_TEXT_LIMITS.advertiser} /></Stack>
}
export function AdBodyInput(props: TextInputProps) {
  return <Stack space={3}>{props.renderDefault(props)}<Counter value={props.value} limit={AD_TEXT_LIMITS.body} /></Stack>
}
