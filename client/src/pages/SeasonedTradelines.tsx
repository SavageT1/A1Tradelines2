import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const faqs = [
  { question: "What is a seasoned tradeline?", answer: "A seasoned tradeline is generally an account with established age and positive payment history. Older accounts may be attractive, but age alone does not guarantee a credit score increase or approval." },
  { question: "Are seasoned tradelines better than newer tradelines?", answer: "Not always. Age is one factor, but profile fit also depends on credit limit, reported balance, bank, timing, cycles, and your current credit file." },
  { question: "Can I buy seasoned authorized user tradelines?", answer: "You can compare available authorized user tradelines by account age in A1's inventory. Availability changes and outcomes are not guaranteed." },
];

export default function SeasonedTradelines() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Seasoned Tradelines", url: "https://a1tradelines.com/seasoned-tradelines" },
  ])];

  return (
    <div>
      <SEOHead title="Seasoned Tradelines | Account Age and Authorized User Tradelines" description="Learn what seasoned tradelines are, how account age may matter, and how to compare authorized user tradelines by age, limit, balance, timing, and profile fit." canonical="https://a1tradelines.com/seasoned-tradelines" keywords="seasoned tradelines, aged tradelines, authorized user tradelines, account age, buy seasoned tradelines" schema={schema} />
      <PageHero title="Seasoned Tradelines" subtitle="Understand why account age can matter and why it should never be the only factor you compare" backgroundImage={HERO_IMAGE} />
      <section className="site-section"><div className="site-container-narrow">
        <SectionReveal><div className="content-card"><h2 className="section-title text-left">What Makes a Tradeline Seasoned?</h2><p className="text-white/70 mb-4">A seasoned tradeline usually refers to an account with established age and positive payment history. Buyers often look at seasoned authorized user tradelines because account age may affect some credit profile factors if the account reports.</p><p className="text-white/70">However, seasoned does not mean guaranteed. Credit bureau reporting, scoring model treatment, lender review, and your full profile all matter.</p></div></SectionReveal>
        <SectionReveal><div className="content-card mt-8"><h2 className="section-title text-left">Age Is Only One Factor</h2><div className="space-y-4">{["Credit limit and utilization", "Reported balance", "Statement and posting date", "Bank and category", "Cycles and available spots", "Total price and budget"].map((item) => <div key={item} className="border-l-2 border-neon/40 pl-4"><p className="font-bold text-white">{item}</p><p className="text-white/65 text-sm">Compare this alongside account age before choosing a tradeline.</p></div>)}</div></div></SectionReveal>
        <SectionReveal><div className="content-card text-center mt-8"><h2 className="section-title">Compare Available Account Ages</h2><p className="section-subtitle mb-6">Filter live inventory by account age and other profile-fit factors.</p><div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link><Link href="/tradeline-buyers-guide" className="cta-secondary">Read Buyer Guide</Link></div></div></SectionReveal>
      </div></section>
    </div>
  );
}
