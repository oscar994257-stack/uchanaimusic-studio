'use client'

import { useState } from 'react'
import { RotateCw, Smartphone, X } from 'lucide-react'

const copy: Record<string, { title: string; detail: string; dismiss: string }> = {
  zh: { title: '橫放手機，觀看效果更佳', detail: '橫向瀏覽可並排觀看影片與合作廣告。', dismiss: '繼續直向瀏覽' },
  'zh-CN': { title: '横放手机，观看效果更佳', detail: '横向浏览可并排观看影片与合作广告。', dismiss: '继续竖向浏览' },
  en: { title: 'Turn your phone for a better view', detail: 'Landscape places films and partners side by side.', dismiss: 'Continue in portrait' },
  ja: { title: 'スマートフォンを横向きにすると快適です', detail: '横向きでは動画と広告を並べて表示します。', dismiss: '縦向きで続ける' },
  ko: { title: '휴대폰을 가로로 돌려 보세요', detail: '가로 모드에서는 영상과 광고가 나란히 표시됩니다.', dismiss: '세로 모드로 계속 보기' },
}

export function MobileOrientationHint({ lang }: { lang: string }) {
  const [dismissed, setDismissed] = useState(false)
  const text = copy[lang] || copy.en
  if (dismissed) return null
  return <aside className="mobile-orientation-hint" aria-label={text.title}>
    <div className="orientation-symbol" aria-hidden="true"><Smartphone size={28} /><RotateCw size={16} /></div>
    <div><p>{text.title}</p><span>{text.detail}</span><button onClick={() => setDismissed(true)}>{text.dismiss}</button></div>
    <button className="orientation-close" onClick={() => setDismissed(true)} aria-label={text.dismiss}><X size={18} /></button>
  </aside>
}
