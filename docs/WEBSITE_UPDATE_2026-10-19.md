# Website update — 2026-10-19

## Follow-up: Works publishing sync

The public gallery now checks `/api/works` every 15 seconds while visible, and immediately on focus, returning to the tab, or reconnecting. The route reads Sanity's published perspective directly with the CDN and Next/browser response caches disabled. Failed reads keep the last successful gallery; empty successful results clear it. Draft edits remain private until Publish.

Both initial rendering and live checks select the newest five work documents by `_createdAt`, with `_id` as a stable tie breaker. Old hidden `order`/`publishedAt` fields no longer prevent new works from appearing. Unpublishing or deleting a work removes it; changing an existing document's YouTube URL resets its player and thumbnail without automatically playing the replacement. Text changes update its title and introduction. No GitHub push or Vercel deployment is needed for future CMS-only changes.

## Public website

- Keep the five currently published YouTube works. No CMS work is deleted by this update.
- Show one selected film, five thumbnail choices and an introduction spanning both columns.
- Load the official privacy-enhanced YouTube embed after a deliberate play click. Native controls include playback, volume and fullscreen; embedding still depends on the video's permissions and YouTube availability.
- Pause background audio when a featured video starts. Keep the existing background player position and playlist.
- Add a lightweight 3D website teaser at the top. This is a preview, not a functioning 3D world.
- Add five portrait ad reservations with an eight-second carousel, manual navigation, pause control and a 100-character marquee. Add placement six beside commission offers.
- Make navigation, typography, descriptions, spacing and mobile layout easier to read.
- Offer Traditional Chinese, Simplified Chinese, English, Japanese and Korean. Keep the brand name fixed.
- Publish five parallel versions of draft collaboration conditions. They are not a signed agreement.
- Hide the inactive email form following the user's latest direction. Use real YouTube and contact links instead. No email list or notification service is enabled in this release.

## Ads in Sanity

Use **廣告合作 / Partner Placements**. Select showcase slots 1–5 or commission slot 6; upload an image, add a caption and optional HTTPS destination, and set the first campaign start plus the current start/end dates.

Each current booking is capped at one calendar month and the entire campaign at three calendar months. A January 31 start ends no later than February's last day, not March 3. Enabled defaults to false; activate only after an actual commercial agreement and payment confirmation. Expired ads disappear on the next data refresh; open pages also check expiration every minute. No arbitrary ad JavaScript is executed.

## Visitor statistics — server configuration required

Set these **server-only** Vercel environment variables, then redeploy:

1. `SANITY_API_WRITE_TOKEN`: a token permitted to create the site's statistics records in this project/dataset. Do not put it into any `NEXT_PUBLIC_` variable.
2. `VISITOR_COOKIE_SECRET`: at least 32 random characters; keep stable between deployments.

`POST /api/visitors` records a signed first-party browser identity. Stable daily and lifetime record IDs avoid duplicate writes. `GET /api/visitors` exposes only aggregate statistics, not the cookie or token. Sanity stores keyed hashes, dates and its normal metadata, never raw IP addresses or subscriber emails.

Today uses Asia/Taipei. The last 7 and 28 days include today and count distinct browser identifiers within each window. All-time totals count lifetime identifiers. These are browser-based estimates, not verified people; different devices, deleted cookies and automated traffic can affect them.

The server snapshot refreshes hourly on requests; open tabs refresh hourly. This is not a guarantee of an exact clock-time background cron. The first successful collection establishes the real starting date. No previous traffic can be reconstructed. Without configuration, the site displays a pending state and dashes, never invented counts. Configure persistent abuse limits in Vercel Firewall if needed; the application limiter alone is process-local.

## Translation — service configuration required

1. Enable Google Cloud Translation Basic for the owner's Google Cloud project.
2. Set a restricted server-only `GOOGLE_TRANSLATE_API_KEY` in Vercel; restrict API access and set provider quotas/budget alerts.
3. Redeploy and test all five languages with real CMS content.

`GET /api/content?lang=en` reads only server-selected public CMS fields; callers cannot submit arbitrary text for paid translation. Official provider results are cached for 24 hours per source text and language. Editing the source text changes the cache key. Supported target languages are limited to the five visible choices. Links and metadata are not sent for translation; brand tokens are protected and the main brand heading is fixed.

Manual CMS translation fields take priority. Simplified Chinese uses schema key `zhCN`. Without a service key or on provider failure, the site retains original content and explicitly says so. Fixed interface copy and collaboration clauses already have the five languages without an API. Machine translation does not certify a contract's legal meaning.

## Payment and terms

Site Settings now accepts an optional HTTPS payment URL. Until configured, the site offers contact/quote actions only. It never collects card numbers and does not claim to process payment or sign a contract.

For overseas individual commissions, consider PayPal invoices first, subject to account eligibility, fees and transaction protection conditions. For Taiwan domestic payments, consider an eligible ECPay seller account. ECPay foreign-card acceptance is subject to merchant qualification; an ordinary personal account must not be assumed to support it.

The draft preserves NT$3,000 as the existing starting price and requires a written quote for actual currency, amount, scope, revisions, deliverables, timing, tax, fees and rights. Advertising is booked for at most one month at a time, renewable to at most three months, with automatic expiry and no automatic billing.

The proposed early termination formula: if the studio ends advertising early without the advertiser's agreement, other than specified breach/legal/force-majeure cases, refund prepaid unused time and add an equal compensation amount. Total = twice the prorated fee for unused time. This is a proposal for written confirmation; it is not a guarantee against judicial reduction or overriding law. For client cancellation, completed time is non-refundable; unused time follows an agreed written cancellation policy and applicable mandatory rights, rather than a universal no-refund promise.

A final contract still needs legal identities, quote reference, date, governing law, dispute procedure, controlling language and both parties' agreement. Electronic form can be legally valid; translating a document into five languages alone does not ensure enforceability in every country.

## Deferred newsletter

Before restoring an email subscription form: choose a provider, verify a sender domain, use private subscriber storage, implement double opt-in, record consent, provide unsubscribe links, test suppression after opt-out and add authenticated, deduplicated update triggers for both CMS publishing and code deployments. Vercel's free Hobby cron is daily, not hourly. No newsletter backend has been enabled, and the public form is intentionally absent.

## Primary references

- YouTube embed controls: https://developers.google.com/youtube/player_parameters
- Google Translation: https://docs.cloud.google.com/translate/docs/basic/translating-text
- PayPal Taiwan invoices: https://www.paypal.com/tw/business/accept-payments/invoice?locale.x=zh_TW
- ECPay payments: https://www.ecpay.com.tw/Business/payment_standard
- ECPay qualification/fees: https://www.ecpay.com.tw/Business/payment_fees?type=s
- Electronic Signatures Act: https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=J0080037
- Civil Code Article 252: https://mojlaw.moj.gov.tw/LawContentExtentHistory.aspx?LSID=FL001351&LawNo=252&media=print
- Vercel cron limits: https://vercel.com/docs/cron-jobs/usage-and-pricing
- Resend broadcast unsubscribe support: https://resend.com/docs/api-reference/broadcasts/create-broadcast
