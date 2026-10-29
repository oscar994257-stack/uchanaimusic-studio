export type AdVideoState = 'idle' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error'

export function adAdvanceDelay({ count, paused, visible, videoState, endedAt, now }: { count: number; paused: boolean; visible: boolean; videoState: AdVideoState; endedAt: number | null; now: number }): number | null {
  if (count < 2 || paused || !visible) return null
  if (['playing', 'paused', 'buffering'].includes(videoState)) return null
  if (videoState === 'ended') return endedAt === null ? null : Math.max(0, 10000 - (now - endedAt))
  return 5000
}
