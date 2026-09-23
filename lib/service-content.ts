import type { ServiceContent } from '@/components/service-page'

export const serviceContent: Record<string, ServiceContent & { metaTitle: string; metaDescription: string }> = {
  tradelines: {
    slug: 'tradelines',
    metaTitle: 'Buy Tradelines Online — Seasoned Authorized-User Tradelines',
    metaDescription:
      'Buy seasoned tradelines from A1 Tradelines. Compare account age, credit limit, utilization, and reporting dates shown on every listing, with our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Buy tradelines',
    title: 'Buy tradelines',
    highlight: 'the transparent way.',
    intro:
      'A1 Tradelines is a straightforward marketplace for seasoned authorized-user tradelines. Every listing shows the age, limit, utilization, and bureau reporting up front, so you always know exactly what you are buying.',
    sections: [
      { heading: 'What a tradeline is', body: 'A tradeline is a credit account on a credit report. When you are added as an authorized user to a seasoned account, that account\u2019s history may appear on your report, which is what buyers are paying for.' },
      { heading: 'Why buy from A1', body: 'We list clear pricing, real tradeline details, and expected posting windows. There are no mystery fees and no promises of a specific score change \u2014 just transparent information so you can decide with confidence.' },
      { heading: 'How buying works', body: 'Browse the inventory, pick the tradeline that fits your goal, and reserve it for free. A specialist confirms availability and walks you through every step before any payment is collected.' },
    ],
    bullets: [
      'Seasoned authorized-user tradelines with verified details',
      'Age, credit limit, and utilization on every listing',
      'reporting dates shown on every listing',
      'Clear posting-window expectations',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Is buying a tradeline legal?', answer: 'Being added as an authorized user is a common, legal banking practice. A1 Tradelines does not offer credit repair, and we never encourage misrepresenting your identity on any application.' },
      { question: 'Will a tradeline guarantee a higher score?', answer: 'No. Scores depend on your full credit profile. We do not promise a specific increase, and we are transparent about that up front.' },
      { question: 'What if the tradeline does not post?', answer: 'If your purchased tradeline does not post to your credit report, you are covered by reassignment or refund under the terms of your purchase agreement.' },
    ],
  },
  'authorized-user-tradelines': {
    slug: 'authorized-user-tradelines',
    metaTitle: 'Authorized User Tradelines — How They Work & What to Buy',
    metaDescription:
      'Learn how authorized user tradelines work and buy seasoned tradelines from A1 Tradelines. Transparent details, reporting dates shown on every listing, and our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Authorized user tradelines',
    title: 'Authorized user tradelines,',
    highlight: 'explained.',
    intro:
      'An authorized user tradeline adds you to an established credit card account so its history can appear on your credit report. Here is exactly how it works and what to look for before you buy.',
    sections: [
      { heading: 'How authorized user status works', body: 'The primary account holder keeps full control of the card. You are added as an authorized user, so the account\u2019s age, limit, and payment history may report to the bureaus on your file.' },
      { heading: 'What matters when choosing one', body: 'Age, credit limit, and low utilization tend to matter most. Older tradelines with high limits and clean payment history are typically the most valuable.' },
      { heading: 'What it will not do', body: 'It does not remove negative items, it is not credit repair, and it does not guarantee approval for any loan. We keep expectations honest.' },
    ],
    bullets: [
      'Established tradelines with real payment history',
      'You never receive or use the physical card',
      'Age and limit clearly listed on each tradeline',
      'reporting dates shown on every listing available',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Do I get to use the credit card?', answer: 'No. You are added as an authorized user for reporting purposes only. You never receive or spend on the account.' },
      { question: 'How long does the tradeline stay on my report?', answer: 'Reporting windows vary by tradeline. We explain the expected duration for each listing before you buy.' },
      { question: 'Can it be removed later?', answer: 'Yes. Authorized-user status is temporary by design, and the account holder or issuer can remove the user after the agreed period.' },
    ],
  },
  'aged-tradelines': {
    slug: 'aged-tradelines',
    metaTitle: 'Aged Tradelines for Sale — Seasoned High-Limit Tradelines',
    metaDescription:
      'Shop aged and seasoned tradelines from A1 Tradelines. Older tradelines with high limits and low utilization, reporting dates shown on every listing, and our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Aged tradelines',
    title: 'Aged, seasoned tradelines',
    highlight: 'you can compare.',
    intro:
      'Aged tradelines are tradelines with years of established history. Because account age is a meaningful factor on a credit report, seasoned tradelines are among the most sought-after listings we offer.',
    sections: [
      { heading: 'Why account age matters', body: 'Length of credit history is a real factor in how a profile is evaluated. Older, well-maintained tradelines generally carry more weight than newer ones.' },
      { heading: 'How we describe age', body: 'Every listing states the tradeline\u2019s age in years, its credit limit, and its typical utilization, so you can compare seasoned tradelines side by side.' },
      { heading: 'Choosing the right one', body: 'Match the tradeline to your goal and budget. Our team can help you weigh age against limit and price without any pressure.' },
    ],
    bullets: [
      'Tradelines ranging from several to 15+ years old',
      'High-limit, low-utilization options',
      'Clear age and limit on every listing',
      'reporting dates shown on every listing',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'What counts as an aged tradeline?', answer: 'Generally a tradeline with several or more years of history. We list the exact age of each tradeline so there is no guesswork.' },
      { question: 'Are older tradelines always better?', answer: 'Not always. Age, limit, utilization, and price all matter. The best choice depends on your specific goal, which we are happy to talk through.' },
      { question: 'Do aged tradelines cost more?', answer: 'Typically, older tradelines with higher limits are priced higher. Every price is shown clearly before you buy.' },
    ],
  },
  'tradelines-for-mortgage': {
    slug: 'tradelines-for-mortgage',
    metaTitle: 'Tradelines for a Mortgage — Prepare Your Credit Profile',
    metaDescription:
      'Considering tradelines before a mortgage application? A1 Tradelines explains realistic expectations and offers seasoned tradelines backed by our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Tradelines for a mortgage',
    title: 'Preparing for a mortgage',
    highlight: 'with clear expectations.',
    intro:
      'If you are planning to apply for a mortgage, timing and honesty matter. Here is a transparent look at how seasoned tradelines fit into mortgage preparation and what they cannot do.',
    sections: [
      { heading: 'Plan your timing', body: 'Tradelines post on a schedule tied to statement dates. If you are preparing for a mortgage, give tradelines time to report well before you apply.' },
      { heading: 'Be honest with your lender', body: 'Never misrepresent your finances on a loan application. Tradelines are a legal authorized-user practice, not a way to deceive an underwriter.' },
      { heading: 'Set realistic expectations', body: 'A tradeline may support a profile, but mortgage approval depends on income, debt, down payment, and many other factors we do not control.' },
    ],
    bullets: [
      'Seasoned, high-limit tradelines',
      'Clear posting windows so you can plan timing',
      'reporting dates shown on every listing',
      'Honest guidance, no overpromises',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Will a tradeline get me approved for a mortgage?', answer: 'No one can promise that. Approval depends on your full financial picture. A tradeline is one part of a profile, not a guarantee.' },
      { question: 'When should I buy before applying?', answer: 'Give the tradeline enough time to post before you apply. We share the expected posting window for each listing so you can plan.' },
      { question: 'Is this credit repair?', answer: 'No. We do not remove negative items or offer credit repair. These are authorized-user tradelines only.' },
    ],
  },
  'tradelines-for-auto-loans': {
    slug: 'tradelines-for-auto-loans',
    metaTitle: 'Tradelines for Auto Loans — What to Know Before You Buy',
    metaDescription:
      'A transparent guide to tradelines before an auto loan, plus seasoned tradelines from A1 Tradelines with reporting dates shown on every listing backed by our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Tradelines for auto loans',
    title: 'Getting ready for an auto loan',
    highlight: 'the honest way.',
    intro:
      'Shopping for a car soon? Learn how seasoned tradelines fit into preparing your credit profile for an auto loan, and what realistic expectations look like.',
    sections: [
      { heading: 'Timing your purchase', body: 'Auto shopping often moves fast. Buy early enough that the tradeline can post before you sit down at the dealership or apply with a lender.' },
      { heading: 'What a tradeline contributes', body: 'A seasoned tradeline may add history and available credit to a profile. It is one input among many that lenders consider.' },
      { heading: 'What we will not claim', body: 'We do not promise a rate, an approval, or a specific score. We give you clear information and let you make the call.' },
    ],
    bullets: [
      'Seasoned tradelines with clear details',
      'Posting windows to help you plan around shopping',
      'reporting dates shown on every listing',
      'No pressure and no inflated promises',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Can a tradeline lower my auto loan rate?', answer: 'We cannot promise that. Rates depend on the lender, your income, and your overall profile. A tradeline is only one factor.' },
      { question: 'How soon should I buy?', answer: 'Buy early enough for the tradeline to post before you apply. Each listing shows an expected posting window.' },
      { question: 'Do you work with dealerships?', answer: 'No. We simply provide authorized-user tradelines. Any loan decision is entirely up to the lender.' },
    ],
  },
  'how-tradelines-work': {
    slug: 'how-tradelines-work',
    metaTitle: 'How Tradelines Work — A Plain-English Guide',
    metaDescription:
      'A clear, honest explanation of how authorized-user tradelines work, when they post, and what they can and cannot do, from the team at A1 Tradelines.',
    eyebrow: 'How tradelines work',
    title: 'How tradelines actually',
    highlight: 'work.',
    intro:
      'No jargon and no hype. This is a plain-English walkthrough of what a tradeline is, how it reports, and what to realistically expect once you buy one.',
    sections: [
      { heading: 'The basics', body: 'A tradeline is any account listed on a credit report. When you are added as an authorized user to a seasoned card, that account\u2019s history may report on your file.' },
      { heading: 'When it posts', body: 'Tradelines report around their statement date, so a tradeline typically appears within a week or two of purchase. Every listing shows its own expected window.' },
      { heading: 'What it can and cannot do', body: 'It may add age and available credit to a profile. It cannot remove negative items, guarantee a score, or approve a loan. We are upfront about the limits.' },
    ],
    bullets: [
      'Simple explanation of authorized-user reporting',
      'Expected posting windows on every listing',
      'Honest limits, no score promises',
      'reporting dates shown on every listing',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'How fast does a tradeline show up?', answer: 'Usually within one to two weeks, tied to the tradeline\u2019s statement date. Each listing shows the expected window.' },
      { question: 'Does the primary cardholder see my information?', answer: 'You are simply added as an authorized user. You do not gain access to their account and they do not gain access to your finances.' },
      { question: 'Is a tradeline permanent?', answer: 'No. Authorized-user tradelines are temporary and can be removed after the agreed reporting period.' },
    ],
  },
}
