import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

export default function Disclaimer() {
  return (
    <div>
      <SEOHead
        title="Disclaimer | A1 Tradelines"
        description="Important A1 Tradelines disclaimers about authorized user tradelines, credit reporting, no credit outcome guarantees, and third-party factors."
        canonical="https://a1tradelines.com/disclaimer"
        keywords="A1 Tradelines disclaimer, tradeline disclaimer, no guarantee"
      />
      <PageHero
        title="Disclaimer"
        subtitle="Important limitations and no-guarantee disclosures"
        backgroundImage={HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-8 sm:p-12 space-y-8 text-white/60 leading-relaxed">
              <p className="text-sm text-white/40">Last updated: May 26, 2026</p>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">No Guaranteed Credit Results</h2>
                <p>
                  Authorized user tradelines may affect credit profiles differently. A1 Tradelines does not guarantee credit score increases, credit approval, funding approval, mortgage approval, business credit approval, interest rates, credit limits, or any specific credit or financial result.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Third-Party Reporting Factors</h2>
                <p>
                  Reporting depends on third-party banks, vendors, cardholders, credit bureaus, reporting schedules, scoring models, and the consumer's existing credit file. These factors are outside A1 Tradelines' control.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Educational Information Only</h2>
                <p>
                  Website content is for educational and informational purposes only. It should not be treated as legal, tax, lending, credit repair, or financial advice. You should consult qualified professionals before making credit or financial decisions.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Authorized User Tradelines</h2>
                <p>
                  A1 Tradelines focuses on authorized user tradeline information and matching support. We do not sell CPNs, synthetic identities, fake credit profiles, banking credentials, or identity-related services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Contact</h2>
                <p>
                  Questions about this Disclaimer may be sent to info@a1tradelines.com or by contacting A1 Tradelines at (908) 767-5309.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
