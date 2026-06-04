import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const faqs = [
  { question: "How long do tradelines take to post?", answer: "Many authorized user tradelines are expected to report within one to two billing cycles, but timing is not guaranteed. It depends on the bank, statement date, account status, bureau processing, and vendor terms." },
  { question: "What is a statement date?", answer: "A statement date is when a credit card billing cycle closes. Issuers may report account data near or after that cycle, but timing can vary." },
  { question: "What if a tradeline does not post?", answer: "A1 Tradelines can review the situation and explain available options under the applicable purchase terms, but posting and credit outcomes are not guaranteed." },
];

export default function TradelinePostingTimeline() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Tradeline Posting Timeline", url: "https://a1tradelines.com/how-long-do-tradelines-take-to-post" },
  ])];

  return (
    <div>
      <SEOHead title="How Long Do Tradelines Take to Post? | Reporting Timeline" description="Learn how tradeline posting timelines work, including statement dates, estimated reporting dates, bureau processing, and non-posting limitations." canonical="https://a1tradelines.com/how-long-do-tradelines-take-to-post" keywords="how long do tradelines take to post, tradeline posting date, tradeline reporting timeline, authorized user tradelines" schema={schema} />
      <PageHero title="How Long Do Tradelines Take to Post?" subtitle="Understand statement dates, estimated reporting windows, bureau processing, and why posting is never guaranteed" backgroundImage={HERO_IMAGE} />
      <section className="site-section"><div className="site-container-narrow">
        <SectionReveal><div className="content-card"><h2 className="section-title text-left">Typical Posting Window</h2><p className="text-white/70 mb-4">Many authorized user tradelines are expected to report within one to two billing cycles. The exact timeline depends on the card issuer, statement date, bureau processing, account status, and the terms connected to the selected tradeline.</p><p className="text-white/70">A listed target reporting date is an estimate, not a guarantee.</p></div></SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {["Purchase deadline", "Statement date", "Target posting date"].map((item, i) => <SectionReveal key={item} delay={i * 0.04}><div className="content-card h-full"><p className="text-neon text-xs font-bold uppercase tracking-widest mb-2">Step {i + 1}</p><h3 className="text-left text-white">{item}</h3><p className="text-white/65 text-sm mt-2">This timing factor helps set expectations but does not guarantee reporting.</p></div></SectionReveal>)}
        </div>
        <SectionReveal><div className="content-card mt-8 text-center"><h2 className="section-title">Need a Timeline-Focused Option?</h2><p className="section-subtitle mb-6">Compare inventory by statement date, target posting date, cycles, and availability.</p><div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">View Inventory</Link><Link href="/non-posting-policy" className="cta-secondary">Read Non-Posting Policy</Link></div></div></SectionReveal>
      </div></section>
    </div>
  );
}
