/*
 * FAQ.tsx - Frequently Asked Questions
 * Expanded for SEO/AEO, buyer education, and safer authorized user tradeline disclosures.
 */
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateFAQSchema } from "@/lib/seo";

const ABOUT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const FAQ_ITEMS = [
  {
    question: "What is a tradeline?",
    answer: "A tradeline is an account record that may appear on a credit report, such as a credit card, auto loan, mortgage, or other reported account. It can show details like account age, limit or balance, payment history, and account status. A1 Tradelines focuses on authorized user credit card tradelines, not primary loan accounts.",
  },
  {
    question: "What is an authorized user tradeline?",
    answer: "An authorized user tradeline is a credit card account that may appear on a person's credit report after they are added as an authorized user. If it reports, the account may show account age, credit limit, balance, and payment history. Reporting and scoring treatment can vary by bank, credit bureau, scoring model, lender, and individual profile.",
  },
  {
    question: "How do tradelines work?",
    answer: "A cardholder account reports to the credit bureaus under its normal reporting schedule. When an authorized user is added, the account may also report to the authorized user's credit file. If it reports, the account data may affect profile factors such as age of accounts, utilization, available credit, and payment history, depending on the scoring model and the person's full credit file.",
  },
  {
    question: "Do authorized user tradelines guarantee a credit score increase?",
    answer: "No. A1 Tradelines does not guarantee credit score increases, approvals, funding, loan terms, mortgage approval, business credit approval, or any specific credit outcome. Tradeline impact depends on the full credit profile, bureau reporting, lender criteria, and scoring model used.",
  },
  {
    question: "Do tradelines still work?",
    answer: "Authorized user accounts can still be considered by some scoring models and lenders, but treatment is not universal. Some lenders may discount, ignore, manually review, or remove the benefit of authorized user accounts during underwriting. That is why A1 focuses on education, profile fit, and no-guarantee disclosures instead of promising a result.",
  },
  {
    question: "How long does it take for a tradeline to post?",
    answer: "Many authorized user tradelines are expected to report within one to two billing cycles, but timing is not guaranteed. Posting depends on the card issuer's statement date, reporting schedule, bureau processing, account status, and other third-party factors outside A1 Tradelines' control.",
  },
  {
    question: "How long does a tradeline stay on my credit report?",
    answer: "The visible reporting period depends on the agreement, cardholder account, bank reporting cycle, and credit bureau processing. Some tradelines may report for a limited cycle window. Exact duration and post-removal treatment are not guaranteed.",
  },
  {
    question: "How much do tradelines cost?",
    answer: "Pricing depends on the available inventory and factors such as bank, account age, credit limit, statement date, posting date, cycles, and available spots. Higher-limit or older accounts often cost more. Review the live inventory page or contact A1 Tradelines to compare current options.",
  },
  {
    question: "How many tradelines should I buy?",
    answer: "There is no one-size-fits-all answer. The right number depends on your credit profile, existing open accounts, account age, utilization, derogatory items, goals, timeline, and budget. Buying more tradelines does not automatically create a better outcome. A1 can help you compare options based on profile fit.",
  },
  {
    question: "What is better: tradeline age or credit limit?",
    answer: "Both can matter for different reasons. Account age may affect average age and history-related profile factors, while credit limit and reported balance may affect utilization-related factors. The better choice depends on your current profile and goal. A high-limit tradeline is not always the best fit if age, timing, or bank diversity matters more.",
  },
  {
    question: "What is a seasoned tradeline?",
    answer: "A seasoned tradeline generally refers to an account with established age and positive payment history. Older accounts may be more desirable to some buyers, but age alone does not guarantee any score, approval, or funding result.",
  },
  {
    question: "What is credit utilization and why does it matter?",
    answer: "Credit utilization compares reported revolving balances to reported revolving limits. Lower utilization can be a positive profile factor in many scoring models. An authorized user tradeline may affect available revolving credit if it reports, but the result depends on the full file and how the scoring model treats the account.",
  },
  {
    question: "Are authorized user tradelines legal?",
    answer: "Authorized user accounts are a standard banking feature. However, every client should understand the risks, limitations, lender-specific treatment, and product terms before purchasing. A1 Tradelines provides education and matching support, not legal, tax, credit repair, mortgage, lending, or financial advice.",
  },
  {
    question: "Can tradelines hurt my credit?",
    answer: "Any credit-reporting activity can carry risk. Potential issues may include delayed reporting, non-posting, different bureau treatment, underwriting review, account removal, or changes in the cardholder account. A1 works to evaluate inventory quality factors, but no credit outcome or reporting outcome is guaranteed.",
  },
  {
    question: "Can tradelines help with mortgage, auto loan, or business funding approval?",
    answer: "Tradelines may affect some credit profile factors if they report, but A1 Tradelines does not guarantee mortgage approval, auto loan approval, business funding, credit card approval, loan terms, or underwriting decisions. Lenders use their own criteria and may review authorized user accounts differently.",
  },
  {
    question: "Can I choose which bank the tradeline is from?",
    answer: "Available inventory may include different banks, credit limits, ages, prices, statement dates, posting dates, and cycles. You can review available options, and A1 Tradelines can help evaluate which factors may fit your profile and timeline.",
  },
  {
    question: "What quality standards do you look for?",
    answer: "We focus on factors such as clean payment history, low reported balance, account age, credit limit, bank diversity, available spots, statement date, posting date, and reporting timing. These factors can matter, but they still do not guarantee any particular score or approval outcome.",
  },
  {
    question: "What if the tradeline does not post?",
    answer: "Posting policies depend on the product terms, vendor rules, bank behavior, and bureau reporting. A1 Tradelines can review the situation and explain available options under the applicable purchase terms, but no credit score, approval, or posting outcome is guaranteed.",
  },
  {
    question: "Do you accept CPNs or synthetic identities?",
    answer: "No. A1 Tradelines does not support CPNs, synthetic identities, fake credit profiles, identity manipulation, or fraudulent applications. Clients should use accurate, lawful identity information only.",
  },
  {
    question: "Will I receive a physical card or spending access?",
    answer: "No. Authorized user tradeline services are for reporting purposes only. Clients should not expect card access, account spending access, online login access, or the ability to make charges.",
  },
  {
    question: "What information should I avoid sending through a website form?",
    answer: "Do not send Social Security numbers, government ID numbers, credit monitoring logins, banking logins, card numbers, or other sensitive identity information through general website forms. Sensitive information should only be handled through secure approved processes if required.",
  },
  {
    question: "Are cheap tradelines worth it?",
    answer: "A lower price does not automatically mean a tradeline is a good fit. Cheap options may have lower limits, less age, fewer cycles, less favorable timing, or limited profile value. The best option depends on your profile, goals, budget, and reporting timeline.",
  },
  {
    question: "How do I choose the best tradeline for my credit profile?",
    answer: "Start by reviewing account age, credit limit, reported balance, statement date, posting date, bank, price, cycles, and available spots. Then compare those factors to your current credit profile and goal. A1 Tradelines can help you avoid choosing based only on price or limit.",
  },
  {
    question: "How is A1 Tradelines different?",
    answer: "A1 Tradelines emphasizes strategy-first matching, education, live inventory, transparent limitations, and safer handling of sensitive information. We focus on authorized user tradelines and do not offer CPNs, synthetic identities, fake credit profiles, or guaranteed credit outcomes.",
  },
  {
    question: "How do I get started?",
    answer: "You can browse available tradelines or request a consultation. A1 Tradelines will help review your goals, timeline, budget, and profile factors before discussing available authorized user tradeline options.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const schema = generateFAQSchema(FAQ_ITEMS);

  return (
    <div>
      <SEOHead
        title="FAQ | Authorized User Tradeline Questions | A1 Tradelines"
        description="Answers to common buyer questions about authorized user tradelines, pricing, reporting timelines, credit utilization, profile matching, risks, legality, CPNs, and no-guarantee disclosures."
        canonical="https://a1tradelines.com/faq"
        keywords="authorized user tradelines FAQ, how do tradelines work, buy tradelines, tradeline pricing, tradelines for sale, credit utilization, A1 Tradelines"
        schema={schema}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about authorized user tradelines, cost, reporting, risk, profile matching, and compliance-safe expectations"
        backgroundImage={ABOUT_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="mb-10 rounded-2xl border border-neon/20 bg-neon/10 p-5 sm:p-6 text-center">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A1 Tradelines provides authorized user tradeline education and matching support. We do not guarantee credit score increases, lender approvals, funding, or any specific credit outcome.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.02}>
                <div className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${openIndex === i ? "border-neon/20" : ""}`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${openIndex === i ? "text-neon" : "text-white/40"}`} />
                      <span className={`font-semibold text-sm sm:text-base transition-colors ${openIndex === i ? "text-white" : "text-white/80"}`}>
                        {item.question}
                      </span>
                    </div>
                    <div className={`transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-colors ${openIndex === i ? "text-neon" : "text-white/40"}`} />
                    </div>
                  </button>

                  {openIndex === i && (
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-13 sm:pl-14">
                        <p className="text-sm text-white/70 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="mt-16 text-center">
              <p className="text-white/70 mb-4">Still have questions?</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-neon text-black px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-neon/20 hover:bg-neon/90 transition-all"
              >
                Contact Our Team
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
