/*
 * HowToBoostCreditScore.tsx — SEO landing page targeting "how to boost credit score fast"
 */
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle, ArrowRight, Zap, Target, Clock } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import InlineContactForm from "@/components/InlineContactForm";
import { generateFAQSchema, generateOrganizationSchema } from "@/lib/seo";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/contact-hero-GATXTizuF7kKCUe38nynTh.webp";

const FAST_METHODS = [
  {
    icon: Zap,
    rank: "#1 Fastest",
    title: "Add a Seasoned Tradeline",
    timeline: "15–45 days",
    impact: "30–150+ points",
    body: "Adding an authorized user tradeline with a high limit, perfect payment history, and $0 balance can impact three FICO factors simultaneously — the fastest legal method available.",
    highlight: true,
  },
  {
    icon: TrendingUp,
    rank: "#2",
    title: "Pay Down Revolving Balances",
    timeline: "1 billing cycle",
    impact: "Up to 100+ points",
    body: "Reducing your credit card balances below 10% of your total limit is the single fastest DIY action. Utilization is re-calculated every month.",
    highlight: false,
  },
  {
    icon: Target,
    rank: "#3",
    title: "Dispute Inaccurate Items",
    timeline: "30–45 days",
    impact: "Varies",
    body: "Incorrect negative items — late payments you didn't make, accounts you don't recognize — can be disputed with the credit bureaus. Successful removals can produce large score jumps.",
    highlight: false,
  },
  {
    icon: Clock,
    rank: "#4",
    title: "Become an Authorized User (Family/Friend)",
    timeline: "1–2 billing cycles",
    impact: "Moderate",
    body: "If a family member has a long-standing, high-limit card, getting added as an authorized user is free — but requires trust and their willingness.",
    highlight: false,
  },
];

const FAQS = [
  {
    question: "How fast can I realistically boost my credit score?",
    answer: "With a tradeline, most clients see their score move within 15–45 days of the account posting. Paying down balances can change your score within a single billing cycle. Disputes typically take 30–45 days.",
  },
  {
    question: "What credit score do I need to qualify for a mortgage or auto loan?",
    answer: "Most conventional mortgages require a 620+ score. FHA loans start at 580. Auto loans become significantly cheaper above 700. Business funding typically requires 700+. Our strategists tailor a plan to your specific funding goal.",
  },
  {
    question: "Will applying for new credit hurt my score?",
    answer: "Hard inquiries drop your score by 5–10 points temporarily. If you're planning to boost your score before a major application, avoid opening new accounts for at least 90 days beforehand.",
  },
  {
    question: "How much can a tradeline boost my score?",
    answer: "It depends on your starting profile. Clients with thin credit files or high utilization see the biggest jumps — often 80–150+ points. Those with already-strong profiles see smaller but still meaningful increases.",
  },
  {
    question: "Is paying someone to add me as an authorized user legal?",
    answer: "Yes. Authorized user accounts are a legally recognized banking practice under the Equal Credit Opportunity Act. A1 Tradelines has been facilitating these arrangements for over 16 years.",
  },
];

export default function HowToBoostCreditScore() {
  const schemas = [generateOrganizationSchema(), generateFAQSchema(FAQS)];

  return (
    <div>
      <SEOHead
        title="How to Boost Your Credit Score Fast (700+ in 30 Days) | A1 Tradelines"
        description="Proven methods to boost your credit score fast — including authorized user tradelines, balance paydown, and dispute strategies. See real results in 30 days or less."
        ogTitle="How to Boost Your Credit Score Fast | A1 Tradelines"
        ogDescription="Proven methods to boost your credit score fast. See results in as little as 30 days with verified tradelines."
        canonical="https://a1tradelines.com/how-to-boost-credit-score-fast"
        keywords="how to boost credit score fast, increase credit score quickly, raise credit score 100 points, credit score improvement, tradelines credit boost"
        schema={schemas}
      />

      <PageHero
        title="How to Boost Your Credit Score Fast"
        subtitle="Proven methods ranked by speed — including the #1 fastest legal strategy most people don't know about"
        backgroundImage={HERO}
      />

      {/* Intro */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-8 sm:p-10 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
                The Truth About "Fast" Credit Improvement
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Most advice tells you to "pay on time and wait." That works — but it takes years, not weeks. If you need a 700+ score for a mortgage, auto loan, or business funding in the next 30–90 days, you need a different approach.
                </p>
                <p>
                  Below are the four fastest ways to boost your credit score, ranked by typical time-to-result. The first method — adding a seasoned tradeline — is the one used by credit professionals for over two decades.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Methods */}
      <section className="py-6 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {FAST_METHODS.map((method, i) => (
              <SectionReveal key={method.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className={`glass-panel rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row gap-6 ${
                    method.highlight ? "neon-border-glow border-neon/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 sm:w-64 shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${method.highlight ? "bg-neon/20" : "bg-white/5"}`}>
                      <method.icon className={`w-6 h-6 ${method.highlight ? "text-neon" : "text-white/40"}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${method.highlight ? "text-neon" : "text-white/30"}`}>
                        {method.rank}
                      </span>
                      <h3 className="font-display font-extrabold text-lg leading-tight mt-0.5">{method.title}</h3>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-white/60 text-sm leading-relaxed">{method.body}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-white/50">
                        <Clock className="w-3.5 h-3.5 text-neon/60" /> {method.timeline}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-white/50">
                        <TrendingUp className="w-3.5 h-3.5 text-neon/60" /> {method.impact}
                      </span>
                    </div>
                    {method.highlight && (
                      <Link
                        href="/buy-tradelines"
                        className="inline-flex items-center gap-1.5 text-neon text-sm font-bold hover:underline"
                      >
                        Browse Available Tradelines <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Things to avoid */}
      <section className="py-16 sm:py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold mb-8">
              What <span className="text-red-400">Not</span> to Do When Boosting Your Score Fast
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Open multiple new credit cards — hard inquiries and new accounts lower your average age",
              "Close old credit cards — removes credit history and raises utilization",
              "Miss a single payment — payment history is 35% of your score",
              "Apply for financing right before you need it — give your score 30–60 days after changes to update",
              "Use credit repair companies that promise overnight miracles — they often use illegal tactics",
              "Ignore your credit report — errors affect 1 in 5 consumers and go unnoticed",
            ].map((tip, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 glass-panel rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/60">{tip}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-display font-extrabold text-center mb-10">Common Questions</h2>
          </SectionReveal>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="glass-panel rounded-xl p-6">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy-tradelines"
                className="inline-flex items-center justify-center gap-2 bg-neon text-black px-8 py-4 rounded-xl font-bold shadow-lg shadow-neon/25 hover:bg-neon/90 transition-all"
              >
                Simulate My Score Increase <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form */}
      <InlineContactForm
        heading="Stop Waiting. Start Boosting."
        subheading="Tell us your score goal and timeline — we'll build a plan to get you there."
        defaultSubject="Credit Score Boost Inquiry"
      />
    </div>
  );
}
