import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Refund Policy & Posting Guarantee',
  description:
    'If your purchased tradeline does not post to your credit report, you are covered by reassignment or refund under your purchase agreement. Read the full policy and terms.',
  alternates: { canonical: '/refund-policy' },
}

export default function Page() {
  return (
    <LegalPage
      content={{
        title: 'Refund policy & guarantee',
        updated: 'January 2026',
        intro:
          'Our promise is simple: if a tradeline you purchase does not post to your credit report, you are covered by reassignment or refund under your purchase agreement. This page explains how the guarantee works and how to make a claim.',
        sections: [
          { heading: 'The posting guarantee', body: ['If a tradeline you purchase does not post to your credit report within the reporting window shown on the listing, you are entitled to reassignment to a comparable tradeline or a refund of the purchase price for that tradeline, per the terms of your purchase agreement.'] },
          { heading: 'What "posting" means', body: ['A tradeline is considered posted when the authorized-user account appears on your credit report at the bureau(s) indicated on the listing. Reporting windows are estimates based on the account\u2019s statement date.'] },
          { heading: 'How to make a claim', body: ['Contact us by phone or email within the claim window described in your purchase agreement.', 'You may be asked to provide a current copy of your credit report so we can confirm the account did not post. Approved claims are resolved by reassignment or by refund to your original payment method.'] },
          { heading: 'What is not covered', body: ['The guarantee covers non-posting only. It does not guarantee a specific credit score, loan approval, or any particular outcome, and it does not apply where account information provided by the buyer was inaccurate.'] },
          { heading: 'Questions', body: ['If you have any questions about this policy, contact us before you purchase and we will walk you through the details.'] },
        ],
      }}
    />
  )
}
