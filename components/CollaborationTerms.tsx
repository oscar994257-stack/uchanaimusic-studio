import { collaborationTerms, termsVersion } from '@/lib/collaboration-terms'
import { safeHttpsUrl, ui } from '@/lib/site-copy'

export function CollaborationTerms({ lang, email, paymentUrl }: { lang: string; email: string; paymentUrl?: string }) {
  const payment = safeHttpsUrl(paymentUrl)
  return <section id="collaboration-terms" className="content-shell section-space collaboration-terms" aria-labelledby="terms-title"><div className="section-heading"><div><p className="eyebrow">{ui(lang, 'terms')} / {termsVersion}</p><h2 id="terms-title">{ui(lang, 'termsTitle')}</h2><p>{ui(lang, 'termsHint')}</p></div></div><div className="terms-list">{collaborationTerms(lang).map(clause => <details key={clause.title}><summary>{clause.title}</summary><p>{clause.body}</p></details>)}</div><div className="terms-actions"><a className="primary-action" href={`mailto:${email}?subject=Commission%20enquiry`}>{ui(lang, 'quote')}</a>{payment ? <a className="secondary-action" href={payment} target="_blank" rel="noopener noreferrer">{ui(lang, 'payment')}</a> : <p>{ui(lang, 'paymentPending')}</p>}</div></section>
}
