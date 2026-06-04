import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const terms = [
  {
    term: "Authorized User",
    definition: "A person added to another cardholder's credit card account. The account may report to the authorized user's credit file, but card access or spending access is not part of A1's service.",
  },
  {
    term: "Authorized User Tradeline",
    definition: "A credit card account that may appear on a credit report after someone is added as an authorized user. Reporting and scoring treatment can vary.",
  },
  {
    term: "Credit Limit",
    definition: "The maximum approved revolving limit on a credit card account. If reported, it may affect available revolving credit and utilization-related profile factors.",
  },
  {
    term: "Credit Utilization",
    definition: "The relationship between reported revolving balances and reported revolving limits. Lower utilization can be a positive profile factor in many scoring models.",
  },
  {
    term: "Posting Date",
    definition: "The estimated date or window when a tradeline may appear on a credit report after issuer reporting and bureau processing. Posting is not guaranteed.",
  },
  {
    term: "Statement Date",
    definition: "The date an issuer closes a billing cycle and may report account information to credit bureaus. Reporting timing can vary by issuer and account.",
  },
  {
    term: "Seasoned Tradeline",
    definition: "A tradeline with established account age and payment history. Older accounts may be desirable, but age alone does not guarantee results.",
  },
  {
    term: "Primary Tradeline",
    definition: "An account where the person is the primary account holder or borrower. A1 Tradelines does not sell primary tradelines.",
  },
  {
    term: "CPN",
    definition: "A term often used online to refer to a credit profile number. A1 Tradelines does not support CPNs, synthetic identities, fake profiles, or identity manipulation.",
  },
  {
    term: "Non-Posting",
    definition: "A situation where an authorized user tradeline does not appear on a credit report as expected. Non-posting can happen for reasons outside A1's control, including bank and bureau behavior.",
  },
];

export default function TradelineGlossary() {
  const schema = generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Tradeline Glossary", url: "https://a1tradelines.com/tradeline-glossary" },
  ]);

  return (
    <div>
      <SEOHead
        title="Tradeline Glossary | Authorized User Tradeline Terms"
        description="Understand common tradeline terms including authorized user, credit utilization, posting date, statement date, seasoned tradeline, primary tradeline, CPN, and non-posting."
        canonical="https://a1tradelines.com/tradeline-glossary"
        keywords="tradeline glossary, authorized user meaning, credit utilization, posting date, statement date, seasoned tradeline, primary tradeline, CPN"
        schema={schema}
      />
      <PageHero
        title="Tradeline Glossary"
        subtitle="Plain-English definitions for common authorized user tradeline and credit reporting terms"
        backgroundImage={HERO_IMAGE}
      />

      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="section-kicker">Definitions</span>
              <h2 className="section-title">Understand the Terms Before You Buy</h2>
              <p className="section-subtitle">
                This glossary is educational only and does not provide legal, lending, credit repair, or financial advice.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4">
            {terms.map((item, index) => (
              <SectionReveal key={item.term} delay={index * 0.03}>
                <div className="content-card">
                  <h3 className="text-left text-white mb-2">{item.term}</h3>
                  <p className="text-white/70 text-sm sm:text-base">{item.definition}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="mt-12 content-card text-center">
              <h2 className="section-title">Need Help Comparing Options?</h2>
              <p className="section-subtitle mb-6">
                Browse live tradeline inventory or contact A1 for profile-based matching support.
              </p>
              <div className="cta-row">
                <Link href="/buy-tradelines" className="cta-primary">Browse Tradelines</Link>
                <Link href="/contact" className="cta-secondary">Contact A1</Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
