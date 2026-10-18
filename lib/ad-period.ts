export function calendarMonthsAfter(value: string | number, months: number): number {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return NaN
  const day = date.getUTCDate()
  date.setUTCDate(1)
  date.setUTCMonth(date.getUTCMonth() + months)
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
  date.setUTCDate(Math.min(day, lastDay))
  return date.getTime()
}
