/*
 * FAQ.tsx — Frequently Asked Questions
 * Neon Pulse Design: accordion-style FAQ with smooth animations.
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
    answer: "An authorized user tradeline is a credit account that you are added to as an authorized user. When added, the account's history — including its credit limit, age, and payment history — is reported on your credit report. This can positively impact your credit score by improving your utilization ratio, average account age, and credit mix.",
  },
  {
    question: "How much can a tradeline increase my credit score?",
    answer: "The impact varies depending on your current credit profile. Clients typically see increases of 30 to 150+ points. The biggest factors are your current utilization ratio, average account age, and overall credit history. Our Credit Score Simulator can give you a personalized estimate before you purchase.",
  },
  {
    question: "How long does it take for a tradeline to appear on my credit report?",
    answer: "Most tradelines appear on your credit report within 1-2 billing cycles, which is typically 15-45 days. The exact timing depends on the bank's reporting schedule. We monitor the process and keep you updated throughout.",
  },
  {
    question: "Is buying tradelines legal?",
    answer: "Yes, authorized user tradelines are completely legal. Being added as an authorized user to someone's credit card account is a standard banking practice that has been in use for decades. It's the same process parents use to help their children build credit.",
  },
  {
    question: "What guarantee do you offer on tradelines?",
    answer: "Every tradeline in our inventory comes with a 100% perfect payment history and $0 balance guarantee. We stand behind the quality and accuracy of every tradeline we provide. If a tradeline fails to post to your credit report, we offer a money-back guarantee or a replacement tradeline at no additional cost. Learn more about what tradelines are and how they work in our Learning Center.",
  },
  {
    question: "How long does the tradeline stay on my report?",
    answer: "Tradelines typically remain on your credit report for the duration of the agreement period, which is usually 1-2 billing cycles after posting. The specific duration depends on the package you select. Even after removal, the positive impact on your credit history can have lasting benefits.",
  },
  {
    question: "What information do you need from me?",
    answer: "We need your full legal name, date of birth, and Social Security number to add you as an authorized user. This information is handled with bank-level security and is only used for the purpose of adding you to the tradeline account.",
  },
  {
    question: "What if the tradeline doesn't post to my credit report?",
    answer: "We offer a money-back guarantee if a tradeline fails to post to your credit report. While this is rare (our posting rate is over 99%), we stand behind our service and will either replace the tradeline or provide a full refund.",
  },
  {
    question: "Can I choose which bank the tradeline is from?",
    answer: "Yes, you can browse our inventory and select tradelines from specific banks. We carry tradelines from major banks including Chase, American Express, Citi, Bank of America, Capital One, and more. Our strategists can also recommend the best bank mix for your specific goals.",
  },
  {
    question: "How is A1 Tradelines different from other tradeline companies?",
    answer: "We take a strategy-first approach. Before recommending any tradeline, we analyze your complete credit profile and understand your funding goals. We also offer our proprietary Credit Score Simulator, ongoing support, and a money-back guarantee. We're not just selling tradelines — we're building credit strategies.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment options for qualifying clients. Contact our team to discuss payment arrangements that work for your budget. We want to make credit improvement accessible to everyone.",
  },
  {
    question: "Will the tradeline affect the primary cardholder's credit?",
    answer: "No. As an authorized user, your activity does not affect the primary cardholder's credit score or account. You will not have access to the physical card or the ability to make charges on the account.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy. You can browse our tradeline inventory, use our Credit Score Simulator to simulate your score increase, or schedule a free consultation with one of our credit strategists. We'll help you find the right tradeline strategy for your goals.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const schema = generateFAQSchema(FAQ_ITEMS);

  return (
    <div>
      <SEOHead
        title="FAQ — Frequently Asked Questions About Tradelines"
        description="Get answers to common questions about tradelines, credit profile improvement, authorized user accounts, and how A1 Tradelines can help you."
        canonical="https://a1tradelines.com/faq"
        keywords="tradelines FAQ, authorized user questions, credit improvement, tradeline cost, how tradelines work"
        schema={schema}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about tradelines and our services"
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

          {/* Bottom CTA */}
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
