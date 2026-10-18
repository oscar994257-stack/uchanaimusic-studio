import type { PrimaryLanguage } from './site-copy'

export const termsVersion = '2026-10-19-draft-1'
type Clause = { title: string; body: string }
const clauses: Record<PrimaryLanguage, Clause[]> = {
  zh: [
    { title: '01 / 報價與製作範圍', body: 'AI Anime MV 製作 NT$3,000 起；最終金額、幣別、片長、角色、分鏡、交件格式、修改次數與時程均以個別報價單及雙方書面確認為準。先確認前 30 秒預覽，再進入完整製作。額外需求須另行報價。' },
    { title: '02 / 素材、技術限制與授權', body: '委託人應提供音樂、正確歌詞、角色及參考素材，並確保有權使用。服務不含精準對嘴、高強度戰鬥、複雜舞蹈或大量角色同步演出。商用範圍、署名、作品集展示、原始檔及第三方素材限制須另行書面約定；AI 生成內容不保證取得排他性著作權。' },
    { title: '03 / 付款與費用', body: '付款平台、訂金與尾款比例、到期日、稅費、匯差及平台手續費由報價單明列；未完成確認前不要求付款。官網不收集信用卡資料，請在雙方約定的可信付款平台完成交易，並保留帳單及付款證明。' },
    { title: '04 / 修改、取消與退款', body: '修改以確認的預覽與報價範圍為限。若取消，依已完成且可證明的工作、已發生成本與尚未履行部分協議結算，不採一律不退款。延遲、未交付、重大不符約定及不可抗力的處理方式，應在接案前確認；適用法律的強制權利不因本條款而排除。' },
    { title: '05 / 廣告刊登與續約', body: '甲方為廣告委託人，乙方為 UchanAIMusic Studio。廣告須先審核內容，再書面確認版位、素材、價格、排期與付款。每次刊登最長一個月，可協議續約；同一合作自首次開始起最長三個月。到期自動下架、不自動扣款。甲方可申請提前取消；已刊登期間費用不退，未履行部分依書面取消規則及適用法律結算。' },
    { title: '06 / 廣告責任與提前終止補償', body: '廣告須標示合作身分，不接受違法、侵權、詐騙或誤導內容；不保證點擊、觀看或成交數。若非因甲方違約、法令要求或不可抗力，乙方在甲方不同意的情況下提前終止刊登，應退還未刊登期間已付費用，並另支付同額補償，合計為未刊登期間廣告費的兩倍。以已付本期刊登費按未履行日數比例計算；協議終止、補刊或其他方案須另經甲方書面同意。此為待雙方確認的草案，違約金仍受適用法律及法院審酌。' },
    { title: '07 / 多語版本與訂單成立', body: '此為同一套合作條件的五語對照草案。正式簽約前須填寫雙方身分、報價單編號、日期、準據法、爭議處理方式及優先適用語言，並經雙方確認；不得僅憑瀏覽、翻譯或付款按鈕視為已簽約。電子紀錄及簽署應保存，跨國效力需依適用法律評估。' },
  ],
  'zh-CN': [
    { title: '01 / 报价与制作范围', body: 'AI Anime MV 制作 NT$3,000 起；最终金额、币种、片长、角色、分镜、交付格式、修改次数和时间表以单独报价及双方书面确认为准。先确认前 30 秒预览，再进行完整制作。额外需求另行报价。' },
    { title: '02 / 素材、技术限制与授权', body: '委托人应提供音乐、准确歌词、角色和参考素材，并确保有权使用。不含精准对口型、高强度战斗、复杂舞蹈或大量角色同步表演。商用范围、署名、作品集展示、源文件及第三方素材限制须另行书面约定；AI 生成内容不保证获得排他性著作权。' },
    { title: '03 / 付款与费用', body: '付款平台、定金与尾款比例、到期日、税费、汇差及平台手续费须在报价中列明。确认前不要求付款。官网不收集信用卡信息；请在双方约定的可信平台交易并保存凭证。' },
    { title: '04 / 修改、取消与退款', body: '修改以确认的预览和报价范围为限。取消时，按照有证据的已完成工作、实际成本及未履行部分协商结算，不采用一律不退款。延期、未交付、严重不符约定及不可抗力的处理应在接单前确认；不排除适用法律规定的强制性权利。' },
    { title: '05 / 广告刊登与续约', body: '甲方为广告委托人，乙方为 UchanAIMusic Studio。内容审核后，书面确认版位、素材、价格、排期和付款。每次最长一个月，可协商续约；同一合作从首次开始起最长三个月。到期自动下架，不自动扣款。甲方可提前取消；已刊登期间费用不退，未履行部分依书面取消规则及适用法律结算。' },
    { title: '06 / 广告责任与提前终止补偿', body: '广告须标注合作身份，不接受违法、侵权、诈骗或误导内容；不保证点击、观看或成交数。除甲方违约、法律要求或不可抗力外，乙方未经甲方同意提前终止的，应退还未刊登期间已付款项并支付同额补偿，合计为未刊登期间广告费的两倍。以本期已付费用按未履行天数比例计算。协商终止、补刊或替代方案须甲方书面同意。本条为待确认草案；违约金受适用法律及法院裁量约束。' },
    { title: '07 / 多语版本与订单成立', body: '本页为同一套条件的五语对照草案。正式签约前须填写双方身份、报价编号、日期、适用法律、争议处理及优先语言，并经双方确认。浏览、翻译或付款按钮本身不构成签约。保存电子记录及签署；跨国效力须依适用法律评估。' },
  ],
  en: [
    { title: '01 / Quote and scope', body: 'AI Anime MV production starts at NT$3,000. The final price, currency, duration, characters, shots, deliverables, revision allowance and schedule require an individual written quote accepted by both parties. A 30-second preview is approved before full production. Additional requests require a new quote.' },
    { title: '02 / Materials, limitations and rights', body: 'The client supplies music, accurate lyrics, character references and other materials and must have permission to use them. Precise lip-sync, intense combat, complex choreography and large synchronized casts are excluded. Commercial use, credit, portfolio display, source files and third-party restrictions require written agreement. Exclusive copyright in AI-generated material is not guaranteed.' },
    { title: '03 / Payment and charges', body: 'The quote specifies the provider, deposit and balance, due dates, taxes, exchange costs and processing fees. Payment is requested only after agreement. This site does not collect card details. Use the trusted provider agreed by both parties and retain invoices and payment records.' },
    { title: '04 / Changes, cancellation and refunds', body: 'Revisions follow the approved preview and quoted scope. Cancellation is settled against documented completed work, incurred costs and unperformed work; no blanket no-refund rule applies. Delay, non-delivery, material non-conformity and force majeure arrangements must be agreed in advance. Mandatory rights under applicable law remain unaffected.' },
    { title: '05 / Advertising duration and renewal', body: 'Party A is the advertiser and Party B is UchanAIMusic Studio. Content approval and written confirmation of placement, materials, price, dates and payment precede publication. Each booking lasts at most one month; agreed renewals may extend a campaign to at most three months from its first start. Ads expire without automatic billing. Party A may cancel early: fees for time already delivered are non-refundable; unperformed time is settled under the written cancellation policy and applicable law.' },
    { title: '06 / Advertising responsibility and early termination', body: 'Ads must disclose the paid collaboration. Illegal, infringing, fraudulent or misleading materials are excluded; clicks, views and sales are not guaranteed. Unless caused by Party A’s breach, a legal requirement or force majeure, if Party B terminates early without Party A’s agreement, it refunds prepaid unused time and pays an equal amount as compensation: twice the fee for the unused period in total. The basis is the current booking’s prepaid fee prorated by unperformed days. Any agreed termination, replacement placement or alternative requires Party A’s written consent. This draft requires agreement; damages remain subject to applicable law and judicial review.' },
    { title: '07 / Languages and formation', body: 'These five language versions are a draft of the same conditions. Before signing, both parties must confirm their identities, quote reference, date, governing law, dispute procedure and controlling language. Viewing this page, a translation or a payment button alone does not form a signed contract. Keep electronic records and signatures; cross-border enforceability depends on applicable law.' },
  ],
  ja: [
    { title: '01 / 見積もりと制作範囲', body: 'AI Anime MV制作はNT$3,000から。最終金額・通貨・尺・キャラクター・カット数・納品形式・修正回数・日程は、個別見積もりと双方の書面確認に従います。冒頭30秒のプレビュー承認後に全編を制作します。追加要望は別途見積もりとなります。' },
    { title: '02 / 素材・制限・権利', body: '依頼者は音楽、正確な歌詞、キャラクター等の参考素材を用意し、利用権限を確保します。精密なリップシンク、激しい戦闘、複雑なダンス、多人数の同期演技は含みません。商用利用、クレジット、実績公開、元データ、第三者素材の制限は書面で定めます。AI生成物の排他的著作権は保証しません。' },
    { title: '03 / 支払いと費用', body: '決済サービス、着手金と残金、期限、税金、為替差額、手数料を見積もりに明記します。合意前の支払いは求めません。本サイトはカード情報を収集しません。双方が合意した信頼できる決済サービスを利用し、請求書と支払い記録を保存してください。' },
    { title: '04 / 修正・取消・返金', body: '修正は承認済みプレビューと見積もりの範囲内です。取消時は、証明できる完成済み作業、発生済み費用、未履行部分に基づき精算し、一律返金不可とはしません。遅延、未納品、重大な不適合、不可抗力の扱いは事前に確認します。適用法の強行的権利を排除しません。' },
    { title: '05 / 広告期間と更新', body: '甲は広告依頼者、乙は UchanAIMusic Studioです。審査後、掲載枠・素材・料金・期間・支払いを書面確認します。1回は最長1か月、合意による更新を含め初回開始から最長3か月です。満了時に自動終了し、自動課金はありません。甲は早期解約を申し出られます。掲載済み期間の料金は返金せず、未履行分は書面の取消規定と適用法に従い精算します。' },
    { title: '06 / 広告責任と早期終了の補償', body: '有料提携を明示し、違法・権利侵害・詐欺・誤認を招く素材は受け付けません。クリック、閲覧、成約は保証しません。甲の違反、法令要求、不可抗力を除き、甲の同意なく乙が早期終了する場合、未掲載期間の前払料金を返金し、同額を補償として追加支払いします。合計は未掲載期間料金の2倍です。当期前払額を未履行日数で按分します。合意解約、代替掲載等には甲の書面同意が必要です。本条は要合意の草案であり、適用法と裁判所の判断に従います。' },
    { title: '07 / 言語と契約成立', body: '本ページは同一条件の5言語対照草案です。正式契約では当事者情報、見積番号、日付、準拠法、紛争解決、優先言語を記載し双方で確認します。閲覧、翻訳、決済ボタンだけで署名済み契約とはみなしません。電子記録と署名を保存し、国際的な効力は適用法により判断します。' },
  ],
  ko: [
    { title: '01 / 견적 및 제작 범위', body: 'AI Anime MV 제작은 NT$3,000부터 시작합니다. 최종 금액, 통화, 길이, 캐릭터, 장면, 납품 형식, 수정 횟수와 일정은 개별 견적 및 양측의 서면 확인에 따릅니다. 앞부분 30초 미리보기를 승인한 후 전체 제작을 진행합니다. 추가 요청은 별도 견적이 필요합니다.' },
    { title: '02 / 자료, 제한 및 권리', body: '의뢰인은 음악, 정확한 가사, 캐릭터 등 참고 자료와 적법한 사용 권한을 확보합니다. 정밀한 립싱크, 격렬한 전투, 복잡한 안무, 다수 캐릭터의 동시 연기는 포함하지 않습니다. 상업적 사용, 크레딧, 포트폴리오 공개, 원본 파일 및 제삼자 자료 제한은 서면으로 합의합니다. AI 생성물의 배타적 저작권을 보장하지 않습니다.' },
    { title: '03 / 결제 및 비용', body: '결제 서비스, 계약금과 잔금, 기한, 세금, 환전 비용과 수수료를 견적서에 명시합니다. 합의 전 결제를 요구하지 않습니다. 본 사이트는 카드 정보를 수집하지 않습니다. 양측이 합의한 신뢰할 수 있는 결제 서비스를 이용하고 청구서와 결제 기록을 보관하세요.' },
    { title: '04 / 수정, 취소 및 환불', body: '수정은 승인된 미리보기와 견적 범위에 따릅니다. 취소 시 입증 가능한 완료 작업, 발생 비용과 미이행 부분을 기준으로 정산하며 일률적인 환불 불가 규정을 적용하지 않습니다. 지연, 미납품, 중대한 불일치와 불가항력 처리 방식은 사전에 합의합니다. 적용 법률의 강행적 권리를 배제하지 않습니다.' },
    { title: '05 / 광고 기간 및 갱신', body: '갑은 광고 의뢰인, 을은 UchanAIMusic Studio입니다. 검토 후 위치, 자료, 가격, 기간과 결제를 서면으로 확인합니다. 1회 최대 1개월이며 합의된 갱신을 포함해 최초 시작일부터 최대 3개월입니다. 만료 시 자동 종료되며 자동 결제하지 않습니다. 갑은 조기 취소를 요청할 수 있습니다. 이미 게재한 기간의 비용은 환불하지 않으며 미이행 부분은 서면 취소 정책과 적용 법률에 따라 정산합니다.' },
    { title: '06 / 광고 책임 및 조기 종료 보상', body: '유료 협업을 명시하고 불법, 권리 침해, 사기 또는 오해를 부르는 광고는 받지 않습니다. 클릭, 조회수, 매출은 보장하지 않습니다. 갑의 위반, 법률 요구 또는 불가항력이 아닌 사유로 을이 갑의 동의 없이 조기 종료하면 미게재 기간의 선불 비용을 환불하고 같은 금액을 추가 보상합니다. 합계는 미게재 기간 비용의 2배입니다. 현재 게재 건의 선불 비용을 미이행 일수에 비례해 계산합니다. 합의 해지, 대체 게재 등은 갑의 서면 동의가 필요합니다. 본 조항은 합의가 필요한 초안이며 적용 법률과 법원의 판단에 따릅니다.' },
    { title: '07 / 언어 및 계약 성립', body: '이 페이지는 동일 조건의 5개 언어 대조 초안입니다. 정식 계약 전에 당사자 정보, 견적 번호, 날짜, 준거법, 분쟁 처리 및 우선 언어를 기재하고 양측이 확인해야 합니다. 페이지 열람, 번역 또는 결제 버튼만으로 서명된 계약이 성립하지 않습니다. 전자 기록과 서명을 보존하며 국가 간 효력은 적용 법률에 따라 판단합니다.' },
  ],
}

export function collaborationTerms(lang: string) { return clauses[lang as PrimaryLanguage] || clauses.en }
