import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

export default function TermsOfService() {
  return (
    <div>
      <SEOHead
        title="Terms of Service | A1 Tradelines"
        description="Read the A1 Tradelines Terms of Service for website use, authorized user tradeline inquiries, limitations, and no-guarantee disclosures."
        canonical="https://a1tradelines.com/terms-of-service"
        keywords="A1 Tradelines terms, terms of service, tradeline terms"
      />
      <PageHero
        title="Terms of Service"
        subtitle="Website terms, service limitations, and important disclosures"
        backgroundImage={HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-8 sm:p-12 space-y-8 text-white/60 leading-relaxed">
              <p className="text-sm text-white/40">Last updated: May 26, 2026</p>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Use of This Website</h2>
                <p>
                  By using this website, you agree to use it only for lawful purposes and in a manner that does not interfere with the operation, security, or availability of the website. Website content is provided for general informational purposes and does not create a client relationship by itself.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Authorized User Tradeline Services</h2>
                <p>
                  A1 Tradelines provides information, consultation, and matching support related to authorized user tradelines. Service availability, pricing, reporting schedules, account availability, and posting timelines may vary based on third-party banks, cardholders, vendors, credit bureaus, and reporting cycles.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">No Credit Outcome Guarantees</h2>
                <p>
                  A1 Tradelines does not guarantee credit score increases, credit approval, funding approval, loan approval, mortgage approval, business credit approval, interest rates, credit limits, or any specific financial outcome. Credit results vary by individual credit profile, bureau reporting, scoring model, lender criteria, timing, and other factors outside our control.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">No Credit Repair Representation</h2>
                <p>
                  A1 Tradelines is not a law firm and does not provide legal advice. Unless separately stated in a written agreement, A1 Tradelines does not act as a credit repair organization and does not remove negative items, dispute credit report information, or promise to improve credit scores.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Client Responsibility</h2>
                <p>
                  You are responsible for providing accurate information, reviewing all service terms before purchase, understanding that credit reporting timelines vary, and consulting qualified legal, financial, tax, or credit professionals before making financial decisions.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Contact</h2>
                <p>
                  Questions about these Terms may be sent to info@a1tradelines.com or by contacting A1 Tradelines at (908) 767-5309.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
