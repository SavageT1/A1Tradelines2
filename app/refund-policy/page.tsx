import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Refund Policy & Money-Back Guarantee',
  description:
    'A1 Tradelines offers a 100% money-back guarantee if your purchased tradeline does not post to your credit report. Read the full refund policy and terms.',
  alternates: { canonical: '/refund-policy' },
}

export default function Page() {
  return (
    <LegalPage
      content={{
        title: 'Refund policy & guarantee',
        updated: 'January 2026',
        intro:
          'Our promise is simple: if a tradeline you purchase does not post to your credit report, you get 100% of your money back. This page explains how the guarantee works and how to request a refund.',
        sections: [
          { heading: 'The 100% money-back guarantee', body: ['If a tradeline you purchase does not post to your credit report within the reporting window shown on the listing, you are entitled to a full refund of the purchase price for that tradeline.'] },
          { heading: 'What "posting" means', body: ['A tradeline is considered posted when the authorized-user account appears on your credit report at the bureau(s) indicated on the listing. Reporting windows are estimates based on the account\u2019s statement date.'] },
          { heading: 'How to request a refund', body: ['Contact us by phone or email within the claim window described in your purchase agreement.', 'You may be asked to provide a current copy of your credit report so we can confirm the account did not post. We will process approved refunds to your original payment method.'] },
          { heading: 'What is not covered', body: ['The guarantee covers non-posting only. It does not guarantee a specific credit score, loan approval, or any particular outcome, and it does not apply where account information provided by the buyer was inaccurate.'] },
          { heading: 'Questions', body: ['If you have any questions about this policy, contact us before you purchase and we will walk you through the details.'] },
        ],
      }}
    />
  )
}
