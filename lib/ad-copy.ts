const copy = {
  zh: { previous: '上一則廣告', next: '下一則廣告', partner: '廣告合作夥伴', demo: '示範', single: '單則廣告固定展示', auto: '每 5 秒切換，可手動選擇', paused: '已暫停自動切換', watching: '觀看中，保留這則廣告', ended: '影片已結束，10 秒後切換', loading: '載入 YouTube 播放器…', unavailable: '影片暫時無法播放', open: '到 YouTube 觀看', videoHint: '請自行按播放；播放中不換則，結束後等候 10 秒。' },
  'zh-CN': { previous: '上一则广告', next: '下一则广告', partner: '广告合作伙伴', demo: '示范', single: '单则广告固定展示', auto: '每 5 秒切换，可手动选择', paused: '已暂停自动切换', watching: '观看中，保留这则广告', ended: '影片已结束，10 秒后切换', loading: '加载 YouTube 播放器…', unavailable: '影片暂时无法播放', open: '到 YouTube 观看', videoHint: '请自行按播放；播放中不换则，结束后等待 10 秒。' },
  en: { previous: 'Previous advertisement', next: 'Next advertisement', partner: 'Advertising partner', demo: 'Demo', single: 'One advertisement on display', auto: 'Changes every 5 seconds · select manually', paused: 'Automatic rotation paused', watching: 'Watching · keeping this advertisement', ended: 'Video ended · changes after 10 seconds', loading: 'Loading the YouTube player…', unavailable: 'Video unavailable', open: 'Watch on YouTube', videoHint: 'Press play yourself. Rotation pauses while viewing and resumes 10 seconds after the video ends.' },
  ja: { previous: '前の広告', next: '次の広告', partner: '広告パートナー', demo: '見本', single: '広告1件を固定表示', auto: '5秒ごとに切替・手動選択可', paused: '自動切替を停止中', watching: '視聴中はこの広告を保持', ended: '再生終了・10秒後に切替', loading: 'YouTubeを読み込み中…', unavailable: '動画を再生できません', open: 'YouTubeで見る', videoHint: '再生は手動です。視聴中は切り替えず、終了10秒後に次の広告へ進みます。' },
  ko: { previous: '이전 광고', next: '다음 광고', partner: '광고 파트너', demo: '예시', single: '광고 1개 고정 표시', auto: '5초마다 전환 · 직접 선택 가능', paused: '자동 전환 일시 정지', watching: '시청 중에는 현재 광고 유지', ended: '영상 종료 · 10초 후 전환', loading: 'YouTube 로딩 중…', unavailable: '영상을 재생할 수 없습니다', open: 'YouTube에서 보기', videoHint: '직접 재생하세요. 시청 중에는 전환하지 않으며 종료 10초 후 다음 광고로 이동합니다.' },
}
export function adCopy(lang: string) { return copy[lang as keyof typeof copy] || copy.en }

const placementCopy = {
  zh: { placement: '版位', occupied: '已使用', available: '可洽詢空位', open: '空位', shown: '刊登中', reserved: '示範預留', empty: '開放廣告合作，歡迎洽詢', note: '合作訊息', pauseNote: '暫停跑馬燈', resumeNote: '繼續跑馬燈' },
  'zh-CN': { placement: '版位', occupied: '已使用', available: '可咨询空位', open: '空位', shown: '刊登中', reserved: '示范预留', empty: '开放广告合作，欢迎咨询', note: '合作消息', pauseNote: '暂停跑马灯', resumeNote: '继续跑马灯' },
  en: { placement: 'Placement', occupied: 'In use', available: 'Open partner slots', open: 'Open', shown: 'Live', reserved: 'Demo reserved', empty: 'Partner placements available · get in touch', note: 'Partner note', pauseNote: 'Pause scrolling message', resumeNote: 'Resume scrolling message' },
  ja: { placement: '広告枠', occupied: '掲載中', available: '募集中の枠', open: '空き', shown: '掲載中', reserved: '見本用', empty: '広告掲載を受付中・お問い合わせください', note: '提携のお知らせ', pauseNote: 'テロップを停止', resumeNote: 'テロップを再開' },
  ko: { placement: '광고 공간', occupied: '사용 중', available: '신청 가능 공간', open: '빈자리', shown: '게재 중', reserved: '예시 전용', empty: '광고 파트너를 모집합니다 · 문의해 주세요', note: '파트너 소식', pauseNote: '흐르는 문구 일시 정지', resumeNote: '흐르는 문구 다시 재생' },
}
export function adPlacementCopy(lang: string) { return placementCopy[lang as keyof typeof placementCopy] || placementCopy.en }
