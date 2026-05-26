/*
 * FAQ.tsx - Frequently Asked Questions
 * Safer authorized user tradeline FAQ content.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateFAQSchema } from "@/lib/seo";

const ABOUT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const FAQ_ITEMS = [
  {
    question: "What is an authorized user tradeline?",
    answer: "An authorized user tradeline is a credit card account that may appear on a person's credit report after they are added as an authorized user. If it reports, the account may show details such as account age, credit limit, balance, and payment history. Reporting and scoring treatment can vary by bank, credit bureau, scoring model, lender, and individual profile.",
  },
  {
    question: "Do authorized user tradelines guarantee a credit score increase?",
    answer: "No. A1 Tradelines does not guarantee credit score increases, approvals, funding, loan terms, mortgage approval, business credit approval, or any specific credit outcome. Tradeline impact depends on the full credit profile, bureau reporting, lender criteria, and scoring model used.",
  },
  {
    question: "How long does it take for a tradeline to appear on a credit report?",
    answer: "Many authorized user tradelines are expected to report within one to two billing cycles, but timing is not guaranteed. Posting depends on the card issuer's reporting schedule, bureau processing, account status, and other third-party factors outside A1 Tradelines' control.",
  },
  {
    question: "Is buying authorized user tradelines allowed?",
    answer: "Authorized user accounts are a standard banking feature. However, every client should understand the risks, limitations, and lender-specific treatment before purchasing. A1 Tradelines provides education and matching support, not legal or financial advice.",
  },
  {
    question: "What quality standards do you look for?",
    answer: "We focus on factors such as clean payment history, low reported balance, account age, credit limit, bank diversity, available spots, and reporting timing. These factors can matter, but they still do not guarantee any particular score or approval outcome.",
  },
  {
    question: "How long does a tradeline stay on my report?",
    answer: "The visible reporting period depends on the agreement, cardholder account, bank reporting cycle, and credit bureau processing. Some tradelines may report for a limited cycle window. Exact duration and post-removal treatment are not guaranteed.",
  },
  {
    question: "What information should I avoid sending through a website form?",
    answer: "Do not send Social Security numbers, government ID numbers, credit monitoring logins, banking logins, or other sensitive identity information through general website forms. Sensitive information should only be handled through secure approved processes if required.",
  },
  {
    question: "What if the tradeline does not post?",
    answer: "Posting policies depend on the product terms, vendor rules, bank behavior, and bureau reporting. A1 Tradelines can review the situation and explain available options under the applicable purchase terms, but no credit score or approval outcome is guaranteed.",
  },
  {
    question: "Can I choose which bank the tradeline is from?",
    answer: "Available inventory may include different banks, credit limits, ages, prices, and reporting dates. You can review available options, and A1 Tradelines can help evaluate which factors may fit your profile and timeline.",
  },
  {
    question: "How is A1 Tradelines different?",
    answer: "A1 Tradelines emphasizes strategy-first matching, education, and transparent limitations. We focus on authorized user tradelines and do not offer CPNs, synthetic identities, fake credit profiles, or guaranteed credit outcomes.",
  },
  {
    question: "Do you offer payment options?",
    answer: "Payment options may vary by product, availability, and qualification. Contact A1 Tradelines to review current options before purchasing.",
  },
  {
    question: "Will I receive a physical card?",
    answer: "No. Authorized user tradeline services are for reporting purposes only. Clients should not expect card access, account spending access, or the ability to make charges.",
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
        description="Answers to common questions about authorized user tradelines, reporting timelines, profile matching, limitations, and no-guarantee disclosures."
        canonical="https://a1tradelines.com/faq"
        keywords="authorized user tradelines FAQ, tradeline questions, credit profile, tradeline reporting, A1 Tradelines"
        schema={schema}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about authorized user tradelines, reporting, limitations, and profile-based matching"
        backgroundImage={ABOUT_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.03}>
                <motion.div
                  className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "border-neon/20" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${openIndex === i ? "text-neon" : "text-white/20"}`} />
                      <span className={`font-medium text-sm sm:text-base transition-colors ${openIndex === i ? "text-white" : "text-white/70"}`}>
                        {item.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-colors ${openIndex === i ? "text-neon" : "text-white/20"}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-13 sm:pl-14">
                          <p className="text-sm text-white/50 leading-relaxed">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="mt-16 text-center">
              <p className="text-white/40 mb-4">Still have questions?</p>
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
