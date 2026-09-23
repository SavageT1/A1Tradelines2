import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How A1 Tradelines collects, uses, and protects your personal information. Read our privacy policy to understand your data and your choices.',
  alternates: { canonical: '/privacy-policy' },
}

export default function Page() {
  return (
    <LegalPage
      content={{
        title: 'Privacy policy',
        updated: 'January 2026',
        intro:
          'Your privacy matters. This policy explains what information we collect, how we use it, and the choices you have. We only ask for the information we need to help you.',
        sections: [
          { heading: 'Information we collect', body: ['We collect the information you provide when you contact us or place an order, such as your name, email, phone number, and details needed to complete an authorized-user enrollment.', 'We may also collect basic technical data such as pages visited, using standard web analytics.'] },
          { heading: 'How we use your information', body: ['We use your information to respond to inquiries, process purchases, complete tradeline enrollments, provide support, and comply with legal obligations. We do not sell your personal information.'] },
          { heading: 'How we protect it', body: ['We use reasonable administrative and technical safeguards to protect your information and limit access to those who need it to serve you.'] },
          { heading: 'Sharing', body: ['We share information only as needed to complete your order (for example, with the account provider facilitating enrollment) or as required by law. We do not sell or rent your data to third parties for marketing.'] },
          { heading: 'Your choices', body: ['You may request access to or deletion of your personal information, and you can opt out of marketing messages at any time by contacting us.'] },
          { heading: 'Contact', body: ['If you have privacy questions, reach out using the phone number or email listed in the site footer.'] },
        ],
      }}
    />
  )
}
