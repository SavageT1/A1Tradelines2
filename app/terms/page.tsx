import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions for using A1 Tradelines and purchasing authorized-user tradelines, including disclaimers and your responsibilities.',
  alternates: { canonical: '/terms' },
}

export default function Page() {
  return (
    <LegalPage
      content={{
        title: 'Terms of service',
        updated: 'January 2026',
        intro:
          'These terms govern your use of A1 Tradelines and any purchase you make. By using our site or buying a tradeline, you agree to these terms.',
        sections: [
          { heading: 'Our service', body: ['A1 Tradelines facilitates the purchase of authorized-user tradelines. We are not a credit repair organization, a lender, or a financial advisor, and we do not provide legal or financial advice.'] },
          { heading: 'No guaranteed outcome', body: ['Being added as an authorized user may affect a credit profile, but results vary by individual. We do not promise any specific credit score increase or approval for any loan or credit product.'] },
          { heading: 'Your responsibilities', body: ['You agree to provide accurate information and to use tradelines lawfully. You must never misrepresent your identity or financial situation on any credit or loan application.'] },
          { heading: 'Purchases and refunds', body: ['Prices are shown in the live inventory. Reserving a tradeline is free; no payment is collected until a specialist confirms availability and fit. Our posting guarantee applies as described in the Refund Policy. Please review it before purchasing.'] },
          { heading: 'Limitation of liability', body: ['To the extent permitted by law, A1 Tradelines is not liable for indirect or consequential damages arising from use of the service. Our total liability for any claim is limited to the amount you paid for the applicable tradeline.'] },
          { heading: 'Changes to these terms', body: ['We may update these terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the updated terms.'] },
        ],
      }}
    />
  )
}
