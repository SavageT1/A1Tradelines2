import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

const faqs = [
  { question: "Can tradelines help with business funding?", answer: "Authorized user tradelines may affect some personal credit profile factors if they report, but A1 Tradelines does not guarantee business funding, credit card approval, loan terms, or underwriting decisions." },
  { question: "Do business lenders count authorized user tradelines?", answer: "Some lenders may review authorized user accounts differently, and some may discount or ignore them. Underwriting criteria vary by lender and product." },
  { question: "What should I focus on before business funding?", answer: "Review your full credit profile, utilization, age of accounts, derogatory items, income or revenue documentation, business structure, and lender requirements. Tradelines are not a substitute for a complete funding strategy." },
];

export default function TradelinesBusinessFunding() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Tradelines and Business Funding", url: "https://a1tradelines.com/can-tradelines-help-business-funding" },
  ])];

  return (
    <div>
      <SEOHead title="Can Tradelines Help Business Funding? | A1 Tradelines" description="Learn how authorized user tradelines may relate to personal credit factors used in business funding reviews, plus lender limitations and no-guarantee disclosures." canonical="https://a1tradelines.com/can-tradelines-help-business-funding" keywords="can tradelines help business funding, tradelines for business credit, authorized user tradelines business funding" schema={schema} />
      <PageHero title="Can Tradelines Help Business Funding?" subtitle="Understand how personal credit profile factors may be reviewed and why funding is never guaranteed" backgroundImage={HERO_IMAGE} />
      <section className="site-section"><div className="site-container-narrow">
        <SectionReveal><div className="content-card"><h2 className="section-title text-left">Tradelines Are Not a Business Funding Guarantee</h2><p className="text-white/70 mb-4">Some business funding products consider personal credit profile factors. If an authorized user tradeline reports, it may affect certain profile factors, but lenders use their own underwriting rules.</p><p className="text-white/70">A1 Tradelines does not guarantee business credit approval, funding, credit card approvals, limits, terms, or lender decisions.</p></div></SectionReveal>
        <SectionReveal><div className="content-card mt-8"><h2 className="section-title text-left">What Lenders May Review</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{["Personal credit profile", "Utilization", "Payment history", "Derogatory items", "Business age and structure", "Revenue and documentation"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><p className="font-bold text-white">{item}</p><p className="text-white/65 text-sm mt-1">This can matter in business funding reviews, depending on the lender.</p></div>)}</div></div></SectionReveal>
        <SectionReveal><div className="content-card text-center mt-8"><h2 className="section-title">Compare Profile-Fit Options</h2><p className="section-subtitle mb-6">Review inventory and ask A1 for education before making a purchase decision.</p><div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link><Link href="/tradeline-assessment" className="cta-secondary">Request Assessment</Link></div></div></SectionReveal>
      </div></section>
    </div>
  );
}
