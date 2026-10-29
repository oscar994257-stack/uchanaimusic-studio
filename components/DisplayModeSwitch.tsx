import { Monitor, Smartphone } from 'lucide-react'

const labels: Record<string, { desktop: string; mobile: string; hint: string; notice: string }> = {
  zh: { desktop: '電腦版', mobile: '手機版', hint: '完整電腦版，可自行雙指縮放與拖曳查看', notice: '想看完整排版？點「電腦版」，可自行雙指縮放 ↗' },
  'zh-CN': { desktop: '电脑版', mobile: '手机版', hint: '完整电脑版，可自行双指缩放和拖动查看', notice: '想看完整排版？点「电脑版」，可自行双指缩放 ↗' },
  en: { desktop: 'Desktop', mobile: 'Mobile', hint: 'Full desktop layout; pinch to zoom and pan', notice: 'See the full layout: open Desktop and pinch to zoom ↗' },
  ja: { desktop: 'PC版', mobile: 'モバイル版', hint: 'PC版を表示し、ピンチ操作で拡大・移動できます', notice: '全体を見るには「PC版」へ。指で拡大できます ↗' },
  ko: { desktop: 'PC 버전', mobile: '모바일 버전', hint: '전체 PC 화면을 손가락으로 확대하고 이동할 수 있습니다', notice: '전체 화면은 「PC 버전」에서 손가락으로 확대하세요 ↗' },
}

export function DisplayModeNotice({ desktopMode, lang }: { desktopMode: boolean; lang: string }) {
  if (desktopMode) return null
  const text = labels[lang] || labels.en
  return <div className="mobile-display-notice"><a href="?view=desktop">{text.notice}</a></div>
}

export function DisplayModeSwitch({ desktopMode, lang }: { desktopMode: boolean; lang: string }) {
  const text = labels[lang] || labels.en
  const Icon = desktopMode ? Smartphone : Monitor
  // A full navigation lets the browser read the new viewport before laying out
  // the page, rather than simulating a desktop layout with CSS transforms.
  return <a className="display-mode-switch" href={desktopMode ? '?view=mobile' : '?view=desktop'} title={desktopMode ? text.mobile : text.hint}>
    <Icon size={14} aria-hidden="true" />{desktopMode ? text.mobile : text.desktop}
  </a>
}
