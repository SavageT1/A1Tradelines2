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
      { heading: 'How authorized user status works', body: 'The primary account holder keeps full control of the card \u2014 you never receive it, never see the number, and never spend on it. You are added as an authorized user for reporting purposes, so the account\u2019s age, credit limit, payment history, and utilization may appear on your credit file at the bureaus that receive the reporting.' },
      { heading: 'How reporting reaches your file', body: 'Card issuers report to the bureaus on their own schedules, usually tied to the account\u2019s statement date. After you are added, the tradeline typically appears on your report within one to two reporting cycles. Every A1 listing shows the expected posting window up front so you can plan around it.' },
      { heading: 'Authorized user vs. joint account vs. co-signer', body: 'An authorized user is not responsible for the debt and cannot make changes to the account. A joint account holder shares full responsibility, and a co-signer guarantees someone else\u2019s debt. Authorized-user status is the lightest relationship \u2014 reporting only, no liability, no card in your hands.' },
      { heading: 'What matters when choosing one', body: 'Age, credit limit, utilization, and clean payment history tend to matter most. Older tradelines with high limits, low utilization, and no missed payments are typically the most valuable. Our inventory shows all four on every listing so you can compare side by side.' },
      { heading: 'Can a tradeline ever hurt?', body: 'Honestly, yes \u2014 which is why transparency matters. If an account\u2019s balance spikes, its utilization rises on your file too. That is exactly why we show current utilization on every listing and why we encourage you to ask questions before you buy. A well-chosen tradeline from a stable account is a very different product from a mystery listing.' },
      { heading: 'How long it stays on your report', body: 'Authorized-user status is temporary by design. The tradeline generally reports for the duration of the agreed term, and the account holder or issuer can remove the user afterward. We explain the expected reporting window for each listing before any payment is collected.' },
      { heading: 'Red flags when shopping anywhere', body: 'Be cautious of sellers who will not show the account\u2019s age, limit, and utilization before payment, who promise a specific score increase, or who rush you to pay before answering questions. Legitimate tradeline companies put details in writing and keep expectations realistic.' },
      { heading: 'What it will not do', body: 'It does not remove negative items, it is not credit repair, it does not guarantee approval for any loan, and it never involves misrepresenting your identity. We keep expectations honest because that is how trust is built in this industry.' },
    ],
    bullets: [
      'Established tradelines with real payment history',
      'You never receive or use the physical card',
      'Age and limit clearly listed on each tradeline',
      'reporting dates shown on every listing available',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Do I get to use the credit card?', answer: 'No. You are added as an authorized user for reporting purposes only. You never receive the card, see the number, or spend on the account.' },
      { question: 'How long does the tradeline stay on my report?', answer: 'Reporting windows vary by tradeline. We explain the expected duration for each listing before you buy, and authorized-user status is temporary by design.' },
      { question: 'Can it be removed later?', answer: 'Yes. The account holder or issuer can remove the authorized user after the agreed period, at which point the tradeline stops reporting.' },
      { question: 'Will the account\u2019s balance affect my file?', answer: 'It can. The tradeline\u2019s utilization factors into your overall utilization ratio, which is why we display current utilization on every listing and recommend low-utilization tradelines.' },
      { question: 'Which credit bureaus will it report to?', answer: 'That depends on the issuer and the tradeline. We list the reporting bureaus on every listing so you know exactly where to expect it.' },
      { question: 'How fast will it post?', answer: 'Usually within one to two reporting cycles after you are added, tied to the account\u2019s statement date. Each listing shows its expected posting window.' },
      { question: 'Is this the same as a joint account?', answer: 'No. A joint account holder shares responsibility for the debt. An authorized user has no liability and no spending access \u2014 reporting only.' },
      { question: 'Can a tradeline lower my score?', answer: 'It is possible if the account\u2019s utilization rises or its payment pattern changes, which is why we show live details on every listing and encourage you to choose stable, low-utilization accounts.' },
    ],
  },
  'best-tradelines-for-credit-utilization': {
    slug: 'best-tradelines-for-credit-utilization',
    metaTitle: 'Best Tradelines for Credit Utilization — Lower Your Ratio the Smart Way',
    metaDescription:
      'Looking for tradelines to help credit utilization? Learn how high-limit, low-utilization authorized-user tradelines work, what to compare, and shop transparent listings with our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Tradelines for utilization',
    title: 'The best tradelines',
    highlight: 'for credit utilization.',
    intro:
      'Credit utilization \u2014 how much of your available credit you are using \u2014 is one of the largest factors in a credit profile. The right authorized-user tradeline can add a large credit limit with a tiny balance, which may bring your overall utilization ratio down. Here is how to choose wisely.',
    sections: [
      { heading: 'What credit utilization actually is', body: 'Utilization is your total reported balances divided by your total credit limits, expressed as a percentage. It is measured both per-card and across all of your accounts combined. Lower is generally better, and many people aim to keep overall utilization under 30%, with under 10% considered strong.' },
      { heading: 'How a tradeline affects your ratio', body: 'When an authorized-user tradeline posts to your file, its credit limit and its balance join the math. A tradeline with a $30,000 limit and a $300 balance adds $29,700 of available credit to your totals \u2014 which can pull a high overall ratio down meaningfully, depending on the rest of your profile.' },
      { heading: 'What to look for: high limit, low balance', body: 'The ideal utilization tradeline pairs a large credit limit with a near-zero balance. Look for utilization under 10%, and under 5% is even better. A $25,000 limit at 2% utilization does far more for your ratio than a $5,000 limit at 0% \u2014 the size of the limit is doing the heavy lifting.' },
      { heading: 'Why the limit matters more than you think', body: 'Utilization is a ratio, so the denominator matters enormously. Adding one large-limit tradeline can outweigh several small ones. That said, balance the limit against price: the best value is the largest stable limit with the lowest utilization that fits your budget.' },
      { heading: 'Age and utilization together', body: 'The strongest tradelines combine all three: years of history, a high limit, and low utilization. An aged, high-limit, low-utilization tradeline is the trifecta buyers ask for most \u2014 and exactly what our inventory lets you filter for.' },
      { heading: 'What will not help your ratio', body: 'A high-limit card that is nearly maxed out can actually raise your utilization \u2014 the opposite of what you want. And a tiny limit helps little no matter how low its balance is. Always check both numbers, which is why we display limit and utilization on every single listing.' },
      { heading: 'Timing and realistic expectations', body: 'A tradeline affects your ratio only after it posts, which follows the account\u2019s statement cycle \u2014 usually one to two cycles. Utilization is also just one factor among many; it will not erase late payments or collections. We keep it honest: the right tradeline is a tool, not a magic fix.' },
      { heading: 'How to compare listings on A1', body: 'Every A1 listing shows the credit limit, current utilization, account age, and reporting bureaus up front. Sort by limit, filter by utilization, and reserve the one that fits \u2014 a specialist confirms the current figures with you before any payment is collected.' },
    ],
    bullets: [
      'High-limit tradelines with low reported utilization',
      'Limit and utilization shown on every listing',
      'Filter and compare side by side',
      'reporting dates shown on every listing',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'What is a good credit utilization ratio?', answer: 'Under 30% overall is a common guideline, and under 10% is generally considered strong. Lower is usually better, as long as the accounts stay open and in good standing.' },
      { question: 'How do tradelines affect my utilization?', answer: 'The tradeline\u2019s limit and balance are factored into your overall utilization ratio once it posts. A large limit with a tiny balance can bring a high ratio down.' },
      { question: 'Should I pick the highest limit or the lowest utilization?', answer: 'Ideally both \u2014 a large limit with utilization under 10%. If you must choose, a bigger limit usually moves the ratio more, but avoid tradelines with high balances.' },
      { question: 'How fast will my utilization change?', answer: 'Only after the tradeline posts, which typically takes one to two statement cycles. Each listing shows its expected posting window.' },
      { question: 'Can the tradeline\u2019s balance change after I buy?', answer: 'Yes, account balances move. That is why we show current utilization on every listing and recommend stable, low-utilization accounts. Ask us about any listing before you buy.' },
      { question: 'Will this guarantee a higher credit score?', answer: 'No. Utilization is one factor among many, and we never promise a specific score change. The right tradeline is a tool for your ratio, not a guarantee.' },
      { question: 'Is this credit repair?', answer: 'No. We do not remove negative items or offer credit repair services. These are authorized-user tradelines only, and expectations are kept realistic.' },
      { question: 'How long will the tradeline report?', answer: 'Reporting windows vary by tradeline. We explain the expected duration for each listing before you buy.' },
    ],
  },
  'buy-tradelines': {
    slug: 'buy-tradelines',
    metaTitle: 'Buy Tradelines Online — How to Buy Seasoned Tradelines | A1 Tradelines',
    metaDescription:
      'How to buy tradelines online the safe way: what to compare, how pricing works, and what happens after you buy. Seasoned authorized-user tradelines with our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Buy tradelines',
    title: 'How to buy tradelines',
    highlight: 'the right way.',
    intro:
      'Buying a tradeline should feel straightforward: you compare real listings, you understand exactly what you are getting, and a specialist confirms everything before any payment is collected. Here is the full process and what to watch for.',
    sections: [
      { heading: 'How buying works, step by step', body: 'Browse the inventory and compare tradelines by age, credit limit, utilization, and reporting bureaus. Reserve the one that fits your goal for free \u2014 no payment yet. A specialist then confirms the tradeline is available and walks you through the details, and only then is payment collected.' },
      { heading: 'What to compare before you buy', body: 'Age, credit limit, utilization, payment history, reporting bureaus, and the expected posting window. Every A1 listing shows all of these up front. If a seller hides any of them until after you pay, that is a red flag \u2014 walk away.' },
      { heading: 'Understanding pricing', body: 'Older tradelines with higher limits and lower utilization generally cost more, because they carry more weight. Every price is listed clearly \u2014 no mystery fees, no upsells sprung on you later. The price you see is the price.' },
      { heading: 'Our posting guarantee', body: 'If your purchased tradeline does not post to your credit report, you are covered by reassignment or refund under the terms of your purchase agreement. We put that in writing because it is the only fair way to sell this product.' },
      { heading: 'What happens after you buy', body: 'You are added as an authorized user and the tradeline posts on the account\u2019s normal reporting cycle \u2014 usually within one to two statement cycles. We tell you the expected window for your specific tradeline before you pay, so there are no surprises.' },
      { heading: 'Buying safely anywhere', body: 'Never pay a seller who will not show account details first. Never trust promises of a specific score increase. And never misrepresent anything on a loan application \u2014 tradelines are a legal authorized-user practice, not a shortcut around honest applications.' },
    ],
    bullets: [
      'Reserve for free \u2014 pay only after confirmation',
      'Age, limit, utilization on every listing',
      'Clear pricing with no hidden fees',
      'Expected posting window shared up front',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'Do I have to pay before I know the details?', answer: 'No. You reserve for free, a specialist confirms the tradeline\u2019s details and availability with you, and payment is only collected after that.' },
      { question: 'How long until the tradeline posts?', answer: 'Usually within one to two statement cycles after you are added. Each listing shows its expected posting window before you buy.' },
      { question: 'Can I choose which bureaus it reports to?', answer: 'Reporting bureaus depend on the issuer and the tradeline. We list them on every listing so you can choose accordingly.' },
      { question: 'What if the tradeline I want is not available?', answer: 'Availability changes. If your pick is taken, we will show you the closest comparable options \u2014 same goal, honest alternatives, no pressure.' },
      { question: 'Is my personal information safe?', answer: 'Your information is handled securely and used only to complete your purchase. We never sell your data.' },
      { question: 'Will buying guarantee a score increase?', answer: 'No, and anyone who promises one is not being honest. Scores depend on your full profile. We show you exactly what you are buying and keep expectations realistic.' },
    ],
  },
  'seasoned-tradelines': {
    slug: 'seasoned-tradelines',
    metaTitle: 'Seasoned Tradelines — What Seasoning Means & How to Verify It | A1 Tradelines',
    metaDescription:
      'What does \u201cseasoned\u201d mean for tradelines? Learn how seasoning works, why account age matters, and how to verify claims \u2014 plus seasoned tradelines with our posting guarantee: reassignment or refund per the purchase agreement.',
    eyebrow: 'Seasoned tradelines',
    title: 'Seasoned tradelines,',
    highlight: 'fully explained.',
    intro:
      '\u201cSeasoned\u201d is the industry\u2019s word for aged \u2014 a tradeline with years of established history behind it. Because account age is a real factor in a credit profile, seasoned tradelines are the most sought-after listings we sell. Here is what the word actually means and how to make sure you are getting the real thing.',
    sections: [
      { heading: 'What \u201cseasoned\u201d means', body: 'A seasoned tradeline is a credit account with significant age \u2014 typically several years or more of open, maintained history. \u201cSeasoned\u201d and \u201caged\u201d mean the same thing; seasoning is simply the industry term for that accumulated history.' },
      { heading: 'Why seasoning matters', body: 'Length of credit history is a genuine factor in how a profile is evaluated. A tradeline seasoned for ten years carries more weight than one opened ten months ago, all else being equal. That is why seasoned tradelines are priced higher \u2014 the history is the product.' },
      { heading: 'How to verify seasoning claims', body: 'Ask for the exact age in years, not vague words like \u201cvery old.\u201d Every A1 listing states the tradeline\u2019s age precisely, alongside its limit, utilization, and payment history. If a seller cannot or will not give you the number, do not buy from them.' },
      { heading: 'Seasoned vs. new tradelines', body: 'Newer tradelines cost less and can still help, but they bring little history with them. If your goal involves the age factor \u2014 which is most buyers\u2019 goal \u2014 seasoned is worth the premium. Match the tradeline to what your profile actually needs.' },
      { heading: 'What seasoning cannot do', body: 'Seasoning does not erase late payments, collections, or other negative items, and it does not guarantee any loan approval. It is one factor in a larger picture. Honest sellers say this up front; we do.' },
      { heading: 'How A1 lists seasoning', body: 'Age in years on every listing. No \u201ccontact for details,\u201d no mystery. Compare seasoned tradelines side by side \u2014 age against limit, utilization, and price \u2014 and reserve the one that fits before any payment is collected.' },
    ],
    bullets: [
      'Exact age in years on every listing',
      'Tradelines seasoned several to 15+ years',
      'Limit and utilization shown alongside age',
      'Compare seasoned options side by side',
      'Posting guarantee: reassignment or refund',
    ],
    faqs: [
      { question: 'What counts as a seasoned tradeline?', answer: 'Generally an account with several or more years of history. We list the exact age of each tradeline so there is no guesswork.' },
      { question: 'Are seasoned tradelines always better?', answer: 'For goals tied to account age, usually yes. But age, limit, utilization, and price all matter \u2014 the best choice depends on your specific situation.' },
      { question: 'Why do seasoned tradelines cost more?', answer: 'Because the history is the product. Years of clean, maintained history are scarce, and demand for them is high.' },
      { question: 'Can a lender tell the tradeline is seasoned?', answer: 'The account\u2019s age appears on your report like any other account detail. There is nothing hidden about it \u2014 it is simply the account\u2019s real history.' },
      { question: 'Does seasoning guarantee results?', answer: 'No. Seasoning is one factor among many, and we never promise a specific outcome. What we promise is transparency about exactly what you are buying.' },
      { question: 'How is this different from your aged tradelines?', answer: 'It is the same concept \u2014 \u201cseasoned\u201d and \u201caged\u201d both mean established history. Our aged tradelines page lists current inventory; this page explains what to look for.' },
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
