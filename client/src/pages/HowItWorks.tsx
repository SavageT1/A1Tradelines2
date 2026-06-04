import { Link } from "wouter";
import { CheckCircle, Search, ShieldCheck, CalendarDays, FileCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const steps = [
  {
    icon: Search,
    title: "Review your profile goals",
    copy: "Start with your timeline, budget, current profile factors, and what you are trying to prepare for. A1 does not promise score increases or approvals, but we can help you compare relevant profile factors.",
  },
  {
    icon: FileCheck,
    title: "Compare live tradeline inventory",
    copy: "Look at available authorized user tradelines by bank, age, credit limit, price, cycles, statement date, posting date, and available spots.",
  },
  {
    icon: ShieldCheck,
    title: "Choose based on fit, not hype",
    copy: "The best choice is not always the cheapest, oldest, or highest-limit option. We compare age, utilization, timing, bank diversity, and risk so the choice is easier to understand.",
  },
  {
    icon: CalendarDays,
    title: "Track reporting timing",
    copy: "Authorized user tradelines usually depend on issuer statement dates and bureau processing. Posting is not guaranteed, but clear timing helps set realistic expectations.",
  },
  {
    icon: CheckCircle,
    title: "Review next steps",
    copy: "After the expected posting window, review your credit reports and talk with A1 if you need help understanding what reported, what did not, and what options may be available under your purchase terms.",
  },
];

const faqs = [
  {
    question: "What is the first step before buying a tradeline?",
    answer: "The first step is understanding your current credit profile, goal, timeline, and budget. A tradeline should be compared against your actual profile factors, not purchased only because it has a high limit or low price.",
  },
  {
    question: "Does A1 Tradelines guarantee results?",
    answer: "No. A1 Tradelines does not guarantee credit score increases, lender approvals, funding, posting, or any specific outcome. Tradeline treatment varies by bureau, bank, scoring model, lender, and individual profile.",
  },
  {
    question: "Can I browse inventory before contacting A1?",
    answer: "Yes. You can view available tradeline options on the Buy Tradelines page, then contact A1 if you want help comparing profile fit and timing.",
  },
];

export default function HowItWorks() {
  const schema = [
    generateServiceSchema(),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      { name: "How It Works", url: "https://a1tradelines.com/how-it-works" },
    ]),
  ];

  return (
    <div>
      <SEOHead
        title="How Authorized User Tradelines Work | A1 Tradelines"
        description="Learn how A1 Tradelines helps clients compare authorized user tradelines by account age, credit limit, bank, timing, pricing, and profile fit. No credit outcome is guaranteed."
        canonical="https://a1tradelines.com/how-it-works"
        keywords="how do tradelines work, authorized user tradelines, buy tradelines, tradeline reporting, tradeline posting date"
        schema={schema}
      />
      <PageHero
        title="How It Works"
        subtitle="A clear, compliance-safe process for comparing authorized user tradelines by profile fit, timing, and inventory quality"
        backgroundImage={HERO_IMAGE}
      />

      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="section-kicker">Process</span>
              <h2 className="section-title">Strategy First. No False Promises.</h2>
              <p className="section-subtitle">
                A1 Tradelines helps you understand what factors may matter before you choose an authorized user tradeline. We do not guarantee credit score increases, approvals, or funding.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <SectionReveal key={step.title} delay={index * 0.05}>
                  <div className="content-card flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="text-neon text-xs font-bold uppercase tracking-widest mb-2">Step {index + 1}</p>
                      <h3 className="text-left text-white mb-2">{step.title}</h3>
                      <p className="text-white/70 text-sm sm:text-base">{step.copy}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal>
            <div className="mt-12 content-card text-center">
              <h2 className="section-title">Ready to Compare Options?</h2>
              <p className="section-subtitle mb-6">
                View current inventory or request help comparing tradelines by age, limit, timing, bank, and budget.
              </p>
              <div className="cta-row">
                <Link href="/buy-tradelines" className="cta-primary">Browse Tradelines</Link>
                <Link href="/contact" className="cta-secondary">Request Help</Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
