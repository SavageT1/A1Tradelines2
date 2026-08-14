import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const faqs = [
  { question: "Are authorized user tradelines legal?", answer: "Authorized user accounts are a standard banking feature. However, clients should understand the risks, lender-specific treatment, product terms, and limitations before purchasing. A1 Tradelines does not provide legal advice." },
  { question: "Does A1 Tradelines support CPNs?", answer: "No. A1 Tradelines does not support CPNs, synthetic identities, fake profiles, identity manipulation, or fraudulent applications." },
  { question: "Are results guaranteed?", answer: "No. A1 Tradelines does not guarantee score increases, approvals, funding, loan terms, or any specific credit outcome." },
];

export default function AreTradelinesLegal() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Are Tradelines Legal", url: "https://a1tradelines.com/are-tradelines-legal" },
  ])];

  return (
    <div>
      <SEOHead title="Are Tradelines Legal? | Authorized User Tradeline Education" description="Learn about authorized user tradelines, legal-risk considerations, CPN warnings, lender treatment, and no-guarantee disclosures from A1 Tradelines." canonical="https://a1tradelines.com/are-tradelines-legal" keywords="are tradelines legal, authorized user tradelines legal, CPN tradelines, buy tradelines legal" schema={schema} />
      <PageHero title="Are Tradelines Legal?" subtitle="A practical, compliance-safe overview of authorized user tradelines, limitations, and red flags to avoid" backgroundImage={HERO_IMAGE} />
      <section className="site-section"><div className="site-container-narrow">
        <SectionReveal><div className="content-card"><h2 className="section-title text-left">Authorized User Accounts Are a Standard Banking Feature</h2><p className="text-white/70 mb-4">Credit card issuers commonly allow primary cardholders to add authorized users. If the account reports, it may appear on the authorized user's credit file. How that account is treated can vary by bank, bureau, scoring model, and lender.</p><p className="text-white/70">A1 Tradelines provides education and matching support. We do not provide legal, tax, mortgage, credit repair, lending, or financial advice.</p></div></SectionReveal>
        <SectionReveal><div className="content-card mt-8"><h2 className="section-title text-left">Red Flags to Avoid</h2><div className="space-y-4">{["Guaranteed score increases", "Guaranteed mortgage, auto, or business funding approval", "CPNs or synthetic identities", "Fake credit profiles", "Shortcuts that bypass normal lender review", "Requests for sensitive logins through unsecured forms"].map((item) => <div key={item} className="border-l-2 border-red-400/60 pl-4"><p className="font-bold text-white">{item}</p><p className="text-white/65 text-sm">A1 Tradelines avoids this type of claim or practice.</p></div>)}</div></div></SectionReveal>
        <SectionReveal><div className="content-card text-center mt-8"><h2 className="section-title">Compare Options Safely</h2><p className="section-subtitle mb-6">Review current authorized user tradeline inventory with clear no-guarantee expectations.</p><div className="cta-row"><Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link><Link href="/disclaimer" className="cta-secondary">Read Disclaimer</Link></div></div></SectionReveal>
      </div></section>
    </div>
  );
}
