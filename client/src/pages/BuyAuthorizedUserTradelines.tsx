import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

const faqs = [
  { question: "Where can I buy authorized user tradelines?", answer: "You can compare live authorized user tradeline inventory through A1 Tradelines by bank, account age, credit limit, price, cycles, statement date, and estimated posting date. No credit outcome is guaranteed." },
  { question: "What should I check before buying?", answer: "Review account age, credit limit, reported balance, bank, cycles, statement date, posting date, available spots, price, and whether the tradeline fits your profile and timeline." },
  { question: "Does buying a tradeline guarantee approval?", answer: "No. A1 Tradelines does not guarantee score increases, lender approvals, funding, loan terms, mortgage approval, or business credit approval." },
];

export default function BuyAuthorizedUserTradelines() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Buy Authorized User Tradelines", url: "https://a1tradelines.com/buy-authorized-user-tradelines" },
  ])];

  return (
    <div>
      <SEOHead
        title="Buy Authorized User Tradelines | A1 Tradelines"
        description="Compare authorized user tradelines by bank, account age, credit limit, posting timeline, cycles, available spots, and price. No credit outcome is guaranteed."
        canonical="https://a1tradelines.com/buy-authorized-user-tradelines"
        keywords="buy authorized user tradelines, authorized user tradelines for sale, buy tradelines, tradeline inventory"
        schema={schema}
      />
      <PageHero title="Buy Authorized User Tradelines" subtitle="Compare live inventory with clearer pricing, timing, and profile-fit education before choosing" backgroundImage={HERO_IMAGE} />
      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal>
            <div className="content-card mb-8">
              <h2 className="section-title text-left">A Safer Way to Compare Tradelines</h2>
              <p className="text-white/70 mb-4">A1 Tradelines helps clients compare authorized user tradelines using practical factors: account age, credit limit, bank, reported balance, statement date, estimated posting date, cycles, price, and availability.</p>
              <p className="text-white/70">The goal is not to promise a score increase. The goal is to help you understand the inventory and choose based on profile fit, timing, and risk awareness.</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {["Account age and history", "Credit limit and utilization", "Statement and posting timing", "Cycles and available spots", "Bank and category", "Total price versus fit"].map((item) => (
              <SectionReveal key={item}><div className="content-card"><h3 className="text-left text-white">{item}</h3><p className="text-white/70 text-sm mt-2">Review this factor before selecting an authorized user tradeline. No single factor guarantees an outcome.</p></div></SectionReveal>
            ))}
          </div>
          <SectionReveal>
            <div className="content-card text-center">
              <h2 className="section-title">View Current Authorized User Tradelines</h2>
              <p className="section-subtitle mb-6">Browse live inventory or ask for profile-based matching support.</p>
              <div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link><Link href="/tradeline-assessment" className="cta-secondary">Get Matched</Link></div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
