const requirements = {
  zh: {
    title: '廣告投放前，請準備',
    copy: '文案資料', lines: ['標題：20 字內，1 行。', '廣告商名稱：24 字內，1 行。', '內文：每行 24 字內，最多 3 行。'], count: '空格不計字數；標點、emoji 計入。',
    media: '素材（二選一）', assets: ['單張圖片：建議 1200 × 675 px（16:9）。', 'YouTube 影片：提供影片網址，並確認允許嵌入播放。'],
    schedule: '連結與刊期', details: ['選填：希望訪客點擊後開啟的 HTTPS 網址。', '希望開始的日期與刊登期間；每次最長一個月。'],
    disclosureTitle: 'YouTube 宣傳標示', disclosure: '本站目前提供免費廣告展示。是否勾選「含付費宣傳」，由影片上傳者依 YouTube 規定及實際贊助、置入或商業合作情況判斷；免費產品或服務交換也可能需要揭露。單純將既有作品放在本站展示，通常不需要因此額外勾選。', source: 'YouTube 官方說明',
  },
  'zh-CN': {
    title: '投放广告前，请准备',
    copy: '文案资料', lines: ['标题：20 字以内，1 行。', '广告商名称：24 字以内，1 行。', '正文：每行 24 字以内，最多 3 行。'], count: '空格不计字数；标点、emoji 计入。',
    media: '素材（二选一）', assets: ['单张图片：建议 1200 × 675 px（16:9）。', 'YouTube 视频：提供视频网址，并确认允许嵌入播放。'],
    schedule: '链接与刊期', details: ['选填：希望访客点击后打开的 HTTPS 网址。', '希望开始的日期与刊登期间；每次最长一个月。'],
    disclosureTitle: 'YouTube 宣传标示', disclosure: '本站目前提供免费广告展示。是否勾选“含付费宣传”，由视频上传者依 YouTube 规定及实际赞助、植入或商业合作情况判断；免费产品或服务交换也可能需要披露。单纯将已有作品放在本站展示，通常不需要因此额外勾选。', source: 'YouTube 官方说明',
  },
  en: {
    title: 'Prepare your advertisement',
    copy: 'Text', lines: ['Title: up to 20 characters, 1 line.', 'Advertiser: up to 24 characters, 1 line.', 'Body: up to 24 characters per line, 3 lines.'], count: 'Spaces do not count. Punctuation and emoji do.',
    media: 'Media · choose one', assets: ['One image: recommended 1200 × 675 px (16:9).', 'YouTube video: send its URL and make sure embedding is enabled.'],
    schedule: 'Link & dates', details: ['Optional: an HTTPS destination link for visitors.', 'Preferred start date and duration; up to one month per booking.'],
    disclosureTitle: 'YouTube promotion disclosure', disclosure: 'Placements here are currently free. Uploaders must follow YouTube’s disclosure rules for sponsorships, product placements and commercial relationships, including exchanges of free products or services. Simply displaying an existing work here generally does not require an additional paid-promotion declaration.', source: 'YouTube guidance',
  },
  ja: {
    title: '広告掲載前にご用意ください',
    copy: '広告文', lines: ['タイトル：20文字以内・1行。', '広告主名：24文字以内・1行。', '本文：1行24文字以内・最大3行。'], count: '空白は文字数に含みません。句読点・絵文字は含みます。',
    media: '素材（どちらか1つ）', assets: ['画像1枚：推奨1200 × 675 px（16:9）。', 'YouTube動画：URLをご用意のうえ、埋め込み再生を許可してください。'],
    schedule: 'リンク・掲載期間', details: ['任意：クリック後に開くHTTPSのURL。', '希望開始日と掲載期間。1回の掲載は最長1か月です。'],
    disclosureTitle: 'YouTubeのプロモーション表示', disclosure: '現在、当サイトへの広告掲載は無料です。有料プロモーションの申告は、投稿者がYouTubeの規定と実際のスポンサー、商品紹介、商業的関係に応じて判断してください。無償の商品・サービスとの交換も開示の対象となる場合があります。既存作品を当サイトに表示するだけで、通常は追加申告は必要ありません。', source: 'YouTube公式ヘルプ',
  },
  ko: {
    title: '광고 게재 전 준비해 주세요',
    copy: '광고 문구', lines: ['제목: 20자 이내, 1줄.', '광고주 이름: 24자 이내, 1줄.', '본문: 줄당 24자 이내, 최대 3줄.'], count: '공백은 제외하며 문장 부호와 이모지는 포함합니다.',
    media: '소재 · 둘 중 하나', assets: ['이미지 1장: 권장 1200 × 675 px (16:9).', 'YouTube 영상: URL을 준비하고 임베드 재생을 허용해 주세요.'],
    schedule: '링크 및 일정', details: ['선택: 방문자가 클릭하면 열릴 HTTPS 링크.', '희망 시작일과 게재 기간. 1회 최대 1개월입니다.'],
    disclosureTitle: 'YouTube 프로모션 공개', disclosure: '현재 이 사이트의 광고 게재는 무료입니다. 업로더는 YouTube 규정과 실제 후원, 제품 배치 및 상업적 관계에 따라 유료 프로모션을 신고해야 합니다. 무료 제품이나 서비스 교환도 공개 대상일 수 있습니다. 기존 작품을 이 사이트에 표시하는 것만으로는 일반적으로 추가 신고가 필요하지 않습니다.', source: 'YouTube 공식 안내',
  },
}

export function AdvertisementRequirements({ lang }: { lang: string }) {
  const text = requirements[lang as keyof typeof requirements] || requirements.en
  return <div className="ad-requirements">
    <h3>{text.title}</h3>
    <div className="ad-requirements-grid">
      <div><h4>{text.copy}</h4><ul>{text.lines.map(line => <li key={line}>{line}</li>)}</ul><p>{text.count}</p></div>
      <div><h4>{text.media}</h4><ul>{text.assets.map(line => <li key={line}>{line}</li>)}</ul></div>
      <div><h4>{text.schedule}</h4><ul>{text.details.map(line => <li key={line}>{line}</li>)}</ul></div>
    </div>
    <div className="ad-disclosure"><h4>{text.disclosureTitle}</h4><p>{text.disclosure} <a href="https://support.google.com/youtube/answer/17596007" target="_blank" rel="noopener noreferrer">{text.source} ↗</a></p></div>
  </div>
}
