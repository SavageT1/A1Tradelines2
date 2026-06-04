import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

const faqs = [
  { question: "What tradelines are for sale?", answer: "A1 Tradelines displays available authorized user tradeline options from current inventory. Inventory can change by bank, age, limit, cycles, posting date, availability, and price." },
  { question: "Are tradelines for sale guaranteed to post?", answer: "No. Posting depends on bank reporting, bureau processing, account status, and third-party factors outside A1 Tradelines' control." },
  { question: "How do I choose from available tradelines?", answer: "Compare age, credit limit, bank, reported balance, cycles, statement date, estimated posting date, price, and profile fit before choosing." },
];

export default function TradelinesForSale() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Tradelines for Sale", url: "https://a1tradelines.com/tradelines-for-sale" },
  ])];

  return (
    <div>
      <SEOHead title="Tradelines for Sale | Authorized User Tradeline Inventory" description="Compare authorized user tradelines for sale by bank, age, credit limit, price, cycles, statement date, and estimated posting date. No credit outcome is guaranteed." canonical="https://a1tradelines.com/tradelines-for-sale" keywords="tradelines for sale, authorized user tradelines for sale, buy tradelines, tradeline inventory" schema={schema} />
      <PageHero title="Tradelines for Sale" subtitle="Browse authorized user tradeline inventory with clear factors, timing, and no-guarantee disclosures" backgroundImage={HERO_IMAGE} />
      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal><div className="content-card"><h2 className="section-title text-left">Current Authorized User Tradeline Options</h2><p className="text-white/70 mb-4">A1 Tradelines helps buyers review available authorized user tradelines by bank, account age, credit limit, reporting term, estimated posting date, and price.</p><p className="text-white/70">Inventory should be compared against your credit profile, timeline, and goals. A1 does not guarantee credit score increases, approvals, or funding outcomes.</p></div></SectionReveal>
          <SectionReveal><div className="content-card mt-8"><h2 className="section-title text-left">What to Compare</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{["Bank", "Credit limit", "Account age", "Reported balance", "Statement date", "Posting date", "Cycles", "Available spots"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><p className="font-bold text-white">{item}</p><p className="text-white/65 text-sm mt-1">Use this factor to evaluate timing, profile fit, and inventory quality.</p></div>)}</div></div></SectionReveal>
          <SectionReveal><div className="content-card text-center mt-8"><h2 className="section-title">See Live Inventory</h2><p className="section-subtitle mb-6">View current tradelines for sale or request help comparing options.</p><div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link><Link href="/contact" className="cta-secondary">Request Help</Link></div></div></SectionReveal>
        </div>
      </section>
    </div>
  );
}
