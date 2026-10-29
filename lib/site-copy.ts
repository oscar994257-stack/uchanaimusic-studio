export type PrimaryLanguage = 'zh' | 'zh-CN' | 'en' | 'ja' | 'ko'

const phrases = {
  zh: {
    cinema: '精選作品', cinemaTitle: '讓音樂，成為看得見的故事。', cinemaHint: '五段聲音與影像的旅程，在這裡開始。', playHere: '站內播放', selected: '播放中', details: '作品介紹', videoEmpty: '新的故事，正在醞釀。',
    portal: '下一站・沉浸式創作空間', portalTitle: 'UchanAIMusic 3D 互動式官網', portalText: '未來，走進一個可以探索的音樂世界。以第三人稱漫遊空間，在場景中播放作品、發現故事。', preview: '開發預告', coming: 'Coming Soon',
    adVisit: '了解更多', ad: '免費廣告合作', adTitle: '開放免費廣告版位', adHint: '四個版位・圖片或 YouTube', adBanner: '目前開放免費廣告合作版位，歡迎遊戲、品牌、音樂與各類創作者洽詢，聯絡 UchanAIMusic Studio，一起讓作品被更多人看見。', adPause: '暫停輪播', adResume: '繼續輪播', adContact: '洽詢廣告合作',
    adPolicyTitle: '開放免費廣告版位', adPolicy: '目前開放免費廣告合作版位，歡迎品牌與創作者洽詢。若未來調整為收費制，將另行公告，並於刊登或續刊前確認費用；已確認的免費刊登期間不追溯收費。',
    visitors: '足跡', visitorsTitle: '謝謝你，來到這個世界。', today: '今日', week: '近 7 日', month: '近 28 日', total: '累計訪客', statsPending: '訪客統計準備中', since: '統計起始', updated: '更新時間', statsNote: '台灣時間 UTC+8・每小時更新。同一瀏覽器每日計一次；近 7 / 28 日為期間內不重複瀏覽器，累計以瀏覽器識別碼計算。', statsPrivacy: '使用第一方匿名識別 Cookie 統計，不儲存原始 IP。清除 Cookie 或更換瀏覽器會視為新的訪客。',
    terms: '合作條款', termsTitle: '把期待說清楚，讓創作更安心。', quote: '洽詢報價', payment: '前往約定的付款平台', termsHint: '請先取得個別報價與雙方書面確認，再依約付款。此頁為合作條款草案，不代表訂單已成立。',
    translation: '部分後台內容尚未有此語言的翻譯，先顯示原文。', translating: '正在載入翻譯…', translated: '後台內容由自動翻譯提供；合作條款以雙方確認版本為準。', paymentPending: '收款方式將在報價確認後提供。', contact: '聯絡創作者', close: '關閉', previous: '上一支作品', next: '下一支作品', more: '展開完整介紹', less: '收合介紹',
  },
  'zh-CN': {
    cinema: '精选作品', cinemaTitle: '让音乐，成为看得见的故事。', cinemaHint: '五段声音与影像的旅程，在这里开始。', playHere: '站内播放', selected: '播放中', details: '作品介绍', videoEmpty: '新的故事，正在酝酿。',
    portal: '下一站・沉浸式创作空间', portalTitle: 'UchanAIMusic 3D 互动式官网', portalText: '未来，走进一个可以探索的音乐世界。以第三人称漫游空间，在场景中播放作品、发现故事。', preview: '开发预告', coming: 'Coming Soon',
    adVisit: '了解更多', ad: '免费广告合作', adTitle: '开放免费广告位', adHint: '四个版位・图片或 YouTube', adBanner: '目前开放免费广告合作位，欢迎游戏、品牌、音乐与各类创作者咨询，联系 UchanAIMusic Studio，一起让作品被更多人看见。', adPause: '暂停轮播', adResume: '继续轮播', adContact: '咨询广告合作',
    adPolicyTitle: '开放免费广告位', adPolicy: '目前开放免费广告合作位，欢迎品牌与创作者咨询。若未来调整为收费制，将另行公告，并在刊登或续刊前确认费用；已确认的免费刊登期间不追溯收费。',
    visitors: '足迹', visitorsTitle: '谢谢你，来到这个世界。', today: '今日', week: '近 7 日', month: '近 28 日', total: '累计访客', statsPending: '访客统计准备中', since: '统计起始', updated: '更新时间', statsNote: '台湾时间 UTC+8・每小时更新。同一浏览器每日计一次；近 7 / 28 日为期间内不重复浏览器，累计以浏览器识别码计算。', statsPrivacy: '使用第一方匿名标识 Cookie 统计，不保存原始 IP。清除 Cookie 或更换浏览器会视为新访客。',
    terms: '合作条款', termsTitle: '把期待说清楚，让创作更安心。', quote: '咨询报价', payment: '前往约定的付款平台', termsHint: '请先取得单独报价与双方书面确认，再依约付款。本页为合作条款草案，不代表订单已经成立。',
    translation: '部分后台内容尚无此语言的翻译，暂时显示原文。', translating: '正在加载翻译…', translated: '后台内容由自动翻译提供；合作条款以双方确认版本为准。', paymentPending: '收款方式将在报价确认后提供。', contact: '联系创作者', close: '关闭', previous: '上一部作品', next: '下一部作品', more: '展开完整介绍', less: '收起介绍',
  },
  en: {
    cinema: 'Selected works', cinemaTitle: 'Music you can see. Stories you can feel.', cinemaHint: 'Five journeys through sound and imagination. Watch them here.', playHere: 'Play here', selected: 'Now selected', details: 'Behind the work', videoEmpty: 'A new story is taking shape.',
    portal: 'NEXT CHAPTER · AN IMMERSIVE CREATIVE SPACE', portalTitle: 'UchanAIMusic 3D Interactive Website', portalText: 'A music world you can step into. Explore in third person, discover stories and play featured works inside the scene.', preview: 'In development', coming: 'Coming Soon',
    adVisit: 'Learn more', ad: 'Free partner placements', adTitle: 'Free ad placements available', adHint: '4 placements · Image / YouTube', adBanner: 'Free advertising placements are currently available. Games, brands, musicians and creators are welcome to contact UchanAIMusic Studio. Let’s help more people discover your work.', adPause: 'Pause carousel', adResume: 'Resume carousel', adContact: 'Enquire about advertising',
    adPolicyTitle: 'Free ad placements available', adPolicy: 'Free advertising placements are currently open to brands and creators. Any move to paid placements will be announced separately, with fees agreed before publication or renewal. Confirmed free periods will not be charged retroactively.',
    visitors: 'FOOTPRINTS', visitorsTitle: 'Thank you for visiting this world.', today: 'Today', week: 'Last 7 days', month: 'Last 28 days', total: 'All-time visitors', statsPending: 'Visitor statistics are being prepared', since: 'Tracking since', updated: 'Updated', statsNote: 'Taiwan time UTC+8 · refreshed hourly. One browser is counted once per day; 7 / 28-day totals are distinct browsers within each period. All-time totals use browser identifiers.', statsPrivacy: 'Anonymous first-party cookies are used. Raw IP addresses are not stored. Clearing cookies or using another browser creates a new visitor identity.',
    terms: 'Working together', termsTitle: 'Clear expectations. Room for imagination.', quote: 'Request a quote', payment: 'Open the agreed payment provider', termsHint: 'Obtain an individual quote and written agreement before payment. These are draft collaboration terms, not confirmation of an order.',
    translation: 'Some CMS content has no translation in this language yet. Its original text is shown.', translating: 'Loading translations…', translated: 'CMS content is machine-translated. Collaboration terms follow the version agreed by both parties.', paymentPending: 'Payment instructions will follow the agreed quote.', contact: 'Contact the creator', close: 'Close', previous: 'Previous work', next: 'Next work', more: 'Read the full story', less: 'Show less',
  },
  ja: {
    cinema: '代表作品', cinemaTitle: '音楽を、目に見える物語へ。', cinemaHint: '音と想像が紡ぐ五つの旅を、この場所で。', playHere: 'サイト内で再生', selected: '選択中', details: '作品について', videoEmpty: '新しい物語を準備しています。',
    portal: '次の章・没入型クリエイティブ空間', portalTitle: 'UchanAIMusic 3D インタラクティブサイト', portalText: '音楽の世界を歩く、新しい体験へ。三人称視点で空間を探索し、シーンの中で作品や物語に出会えます。', preview: '開発予告', coming: 'Coming Soon',
    adVisit: '詳しく見る', ad: '無料広告・パートナー枠', adTitle: '無料広告枠を受付中', adHint: '4枠・画像 / YouTube', adBanner: '無料広告枠を受付中。ゲーム、ブランド、音楽、さまざまなクリエイターの皆さま、UchanAIMusic Studio へお気軽にお問い合わせください。作品をもっと多くの人に届けましょう。', adPause: 'スライドを停止', adResume: 'スライドを再開', adContact: '広告掲載のお問い合わせ',
    adPolicyTitle: '無料広告枠を受付中', adPolicy: '現在、ブランドやクリエイター向けの無料広告枠を受け付けています。有料化する場合は別途お知らせし、掲載・更新前に料金を確認します。確定済みの無料掲載期間に遡って請求することはありません。',
    visitors: '足跡', visitorsTitle: 'この世界を訪れてくれて、ありがとう。', today: '本日', week: '直近7日', month: '直近28日', total: '累計訪問者', statsPending: '訪問統計を準備中', since: '集計開始', updated: '更新日時', statsNote: '台湾時間 UTC+8・1時間ごとに更新。同一ブラウザーは1日1回、7日・28日は各期間の重複を除くブラウザー数。累計はブラウザーIDを使用します。', statsPrivacy: '匿名のファーストパーティCookieを使用し、生のIPは保存しません。Cookieの削除や別のブラウザーの利用は新規訪問者として数えます。',
    terms: 'ご依頼・提携条件', termsTitle: '期待を共有して、安心できる創作へ。', quote: '見積もりを相談', payment: '合意済みの決済サービスへ', termsHint: 'お支払い前に個別の見積もりと双方の書面確認が必要です。本ページは条件の草案であり、注文成立を示すものではありません。',
    translation: '一部のCMSコンテンツは未翻訳のため原文を表示しています。', translating: '翻訳を読み込み中…', translated: 'CMSコンテンツは機械翻訳です。提携条件は双方が確認した版に従います。', paymentPending: '決済方法は見積もりの合意後にご案内します。', contact: '制作者に連絡', close: '閉じる', previous: '前の作品', next: '次の作品', more: '紹介をすべて読む', less: '紹介を閉じる',
  },
  ko: {
    cinema: '대표 작품', cinemaTitle: '음악을, 눈에 보이는 이야기로.', cinemaHint: '소리와 상상으로 떠나는 다섯 번의 여행을 이곳에서 만나세요.', playHere: '사이트에서 재생', selected: '선택됨', details: '작품 소개', videoEmpty: '새로운 이야기를 준비하고 있습니다.',
    portal: '다음 장 · 몰입형 창작 공간', portalTitle: 'UchanAIMusic 3D 인터랙티브 웹사이트', portalText: '직접 걸어 들어가는 음악의 세계. 3인칭 시점으로 공간을 탐험하며 장면 속에서 작품을 재생하고 이야기를 발견하세요.', preview: '개발 예고', coming: 'Coming Soon',
    adVisit: '자세히 보기', ad: '무료 파트너 광고', adTitle: '무료 광고 공간 신청 가능', adHint: '광고 4개 · 이미지 / YouTube', adBanner: '현재 무료 광고 공간을 모집합니다. 게임, 브랜드, 음악 및 다양한 창작자 여러분, UchanAIMusic Studio로 문의해 주세요. 더 많은 사람에게 작품을 알려 보세요.', adPause: '슬라이드 일시 정지', adResume: '슬라이드 다시 재생', adContact: '광고 문의',
    adPolicyTitle: '무료 광고 공간 신청 가능', adPolicy: '현재 브랜드와 창작자를 위한 무료 광고 공간을 운영합니다. 유료로 전환할 경우 별도로 공지하고 게재 또는 갱신 전에 요금을 합의합니다. 확정된 무료 게재 기간에는 소급 청구하지 않습니다.',
    visitors: '발자취', visitorsTitle: '이 세계를 찾아주셔서 감사합니다.', today: '오늘', week: '최근 7일', month: '최근 28일', total: '누적 방문자', statsPending: '방문 통계를 준비 중입니다', since: '집계 시작', updated: '갱신 시간', statsNote: '대만 시간 UTC+8 · 매시간 갱신. 같은 브라우저는 하루 한 번, 7일과 28일은 기간 내 중복 없는 브라우저 수입니다. 누적은 브라우저 식별자로 집계합니다.', statsPrivacy: '익명의 자사 쿠키를 사용하며 원본 IP는 저장하지 않습니다. 쿠키를 지우거나 다른 브라우저를 사용하면 새 방문자로 집계됩니다.',
    terms: '의뢰 및 협업 조건', termsTitle: '기대는 명확하게, 상상은 자유롭게.', quote: '견적 문의', payment: '합의된 결제 서비스 열기', termsHint: '결제 전에 개별 견적과 양측의 서면 확인이 필요합니다. 이 페이지는 협업 조건 초안이며 주문 성립을 뜻하지 않습니다.',
    translation: '일부 CMS 콘텐츠는 번역이 없어 원문으로 표시됩니다.', translating: '번역을 불러오는 중…', translated: 'CMS 콘텐츠는 기계 번역입니다. 협업 조건은 양측이 확인한 버전을 따릅니다.', paymentPending: '결제 방법은 견적 합의 후 안내합니다.', contact: '창작자에게 연락', close: '닫기', previous: '이전 작품', next: '다음 작품', more: '전체 소개 보기', less: '접기',
  },
}

export function ui(lang: string, key: keyof typeof phrases.en): string {
  return (phrases[lang as PrimaryLanguage] || phrases.en)[key]
}

export function safeHttpsUrl(value?: string): string | undefined {
  try { const url = new URL(value || ''); return url.protocol === 'https:' ? url.toString() : undefined } catch { return undefined }
}
